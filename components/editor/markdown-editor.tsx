"use client"

import { useCallback, useEffect, useRef } from "react"
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
  rectangularSelection,
  crosshairCursor,
  highlightSpecialChars,
  dropCursor,
} from "@codemirror/view"
import { EditorState, Compartment } from "@codemirror/state"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands"
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search"
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldGutter,
  foldKeymap,
  indentOnInput,
} from "@codemirror/language"
import {
  closeBrackets,
  closeBracketsKeymap,
  autocompletion,
  completionKeymap,
} from "@codemirror/autocomplete"

import { cn } from "@/lib/utils"
import { useDocumentStore } from "@/stores"
import { useEditorStore } from "@/stores"

interface MarkdownEditorProps {
  className?: string
  onStats?: (stats: EditorStats) => void
}

export interface EditorStats {
  lines: number
  words: number
  characters: number
  cursorLine: number
  cursorColumn: number
}

function countWords(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

export function MarkdownEditor({ className, onStats }: MarkdownEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const lineNumbersCompartment = useRef(new Compartment())
  const wordWrapCompartment = useRef(new Compartment())
  const tabSizeCompartment = useRef(new Compartment())

  const content = useDocumentStore((s) => s.content)
  const setContent = useDocumentStore((s) => s.setContent)
  const pushUndo = useDocumentStore((s) => s.pushUndo)
  const showLineNumbers = useEditorStore((s) => s.showLineNumbers)
  const wordWrap = useEditorStore((s) => s.wordWrap)
  const tabSize = useEditorStore((s) => s.tabSize)

  // Track whether the update came from the store
  const isExternalUpdate = useRef(false)
  // Debounce timer for undo snapshots
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateStats = useCallback(
    (view: EditorView) => {
      if (!onStats) return
      const doc = view.state.doc
      const cursor = view.state.selection.main.head
      const line = doc.lineAt(cursor)
      onStats({
        lines: doc.lines,
        words: countWords(doc.toString()),
        characters: doc.length,
        cursorLine: line.number,
        cursorColumn: cursor - line.from + 1,
      })
    },
    [onStats]
  )

  // Initialize editor
  useEffect(() => {
    if (!containerRef.current || viewRef.current) return

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged && !isExternalUpdate.current) {
        const newContent = update.state.doc.toString()

        // Debounce undo snapshots (group rapid keystrokes)
        if (undoTimer.current) clearTimeout(undoTimer.current)
        undoTimer.current = setTimeout(() => {
          pushUndo()
        }, 500)

        setContent(newContent)
      }

      if (update.selectionSet || update.docChanged) {
        updateStats(update.view)
      }
    })

    const state = EditorState.create({
      doc: content,
      extensions: [
        // Line numbers (compartment for toggling)
        lineNumbersCompartment.current.of(showLineNumbers ? lineNumbers() : []),

        // Word wrap (compartment for toggling)
        wordWrapCompartment.current.of(wordWrap ? EditorView.lineWrapping : []),

        // Tab size (compartment for changing)
        tabSizeCompartment.current.of(EditorState.tabSize.of(tabSize)),

        // Core extensions
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),

        // Keymaps
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          indentWithTab,
        ]),

        // Markdown language
        markdown({ base: markdownLanguage }),

        // Update listener
        updateListener,

        // Theme
        EditorView.theme({
          "&": {
            height: "100%",
            fontSize: "14px",
          },
          ".cm-scroller": {
            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
            lineHeight: "1.7",
            padding: "12px 0",
          },
          ".cm-content": {
            padding: "0 16px",
            caretColor: "var(--color-primary)",
          },
          ".cm-line": {
            padding: "0 4px",
          },
          ".cm-gutters": {
            backgroundColor: "transparent",
            borderRight: "1px solid var(--color-border)",
            color: "var(--color-muted-foreground)",
            fontSize: "12px",
          },
          ".cm-activeLineGutter": {
            backgroundColor: "transparent",
            color: "var(--color-foreground)",
          },
          ".cm-activeLine": {
            backgroundColor:
              "color-mix(in oklch, var(--color-accent) 30%, transparent)",
          },
          "&.cm-focused .cm-cursor": {
            borderLeftColor: "var(--color-primary)",
          },
          "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor:
              "color-mix(in oklch, var(--color-primary) 20%, transparent)",
          },
          ".cm-foldPlaceholder": {
            backgroundColor: "var(--color-muted)",
            border: "1px solid var(--color-border)",
            color: "var(--color-muted-foreground)",
            borderRadius: "4px",
            padding: "0 4px",
          },
        }),
      ],
    })

    const view = new EditorView({
      state,
      parent: containerRef.current,
    })

    viewRef.current = view
    updateStats(view)

    return () => {
      view.destroy()
      viewRef.current = null
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync content from store (external changes like undo/redo/load)
  useEffect(() => {
    const view = viewRef.current
    if (!view) return

    const currentDoc = view.state.doc.toString()
    if (currentDoc !== content) {
      isExternalUpdate.current = true
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: content,
        },
      })
      isExternalUpdate.current = false
    }
  }, [content])

  // Toggle line numbers
  useEffect(() => {
    const view = viewRef.current
    if (!view) return

    view.dispatch({
      effects: lineNumbersCompartment.current.reconfigure(
        showLineNumbers ? lineNumbers() : []
      ),
    })
  }, [showLineNumbers])

  // Toggle word wrap
  useEffect(() => {
    const view = viewRef.current
    if (!view) return

    view.dispatch({
      effects: wordWrapCompartment.current.reconfigure(
        wordWrap ? EditorView.lineWrapping : []
      ),
    })
  }, [wordWrap])

  // Update tab size
  useEffect(() => {
    const view = viewRef.current
    if (!view) return

    view.dispatch({
      effects: tabSizeCompartment.current.reconfigure(
        EditorState.tabSize.of(tabSize)
      ),
    })
  }, [tabSize])

  return (
    <div
      id="tour-editor"
      ref={containerRef}
      className={cn("flex-1 overflow-hidden [&_.cm-editor]:h-full", className)}
    />
  )
}
