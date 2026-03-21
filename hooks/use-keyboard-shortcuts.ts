import { useEffect } from "react"

import { useDocumentStore, useEditorStore } from "@/stores"

interface Shortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  description: string
  action: () => void
}

export function useKeyboardShortcuts() {
  const undo = useDocumentStore((s) => s.undo)
  const redo = useDocumentStore((s) => s.redo)
  const toggleFocusMode = useEditorStore((s) => s.toggleFocusMode)
  const toggleSidebar = useEditorStore((s) => s.toggleSidebar)
  const setViewMode = useEditorStore((s) => s.setViewMode)
  const viewMode = useEditorStore((s) => s.viewMode)

  useEffect(() => {
    const shortcuts: Shortcut[] = [
      {
        key: "z",
        ctrl: true,
        description: "Undo",
        action: undo,
      },
      {
        key: "z",
        ctrl: true,
        shift: true,
        description: "Redo",
        action: redo,
      },
      {
        key: "y",
        ctrl: true,
        description: "Redo",
        action: redo,
      },
      {
        key: "\\",
        ctrl: true,
        description: "Toggle sidebar",
        action: toggleSidebar,
      },
      {
        key: "f",
        ctrl: true,
        shift: true,
        description: "Toggle focus mode",
        action: toggleFocusMode,
      },
      {
        key: "1",
        alt: true,
        description: "Split view",
        action: () => setViewMode("split"),
      },
      {
        key: "2",
        alt: true,
        description: "Editor only",
        action: () => setViewMode("editor"),
      },
      {
        key: "3",
        alt: true,
        description: "Preview only",
        action: () => setViewMode("preview"),
      },
    ]

    function onKeyDown(e: KeyboardEvent) {
      if (e.defaultPrevented) return

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl
          ? e.ctrlKey || e.metaKey
          : !e.ctrlKey && !e.metaKey
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey
        const altMatch = shortcut.alt ? e.altKey : !e.altKey

        if (
          e.key.toLowerCase() === shortcut.key.toLowerCase() &&
          ctrlMatch &&
          shiftMatch &&
          altMatch
        ) {
          e.preventDefault()
          shortcut.action()
          return
        }
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [undo, redo, toggleFocusMode, toggleSidebar, setViewMode, viewMode])
}

export const SHORTCUT_LIST = [
  { keys: ["Ctrl", "Z"], description: "Undo" },
  { keys: ["Ctrl", "Shift", "Z"], description: "Redo" },
  { keys: ["Ctrl", "Y"], description: "Redo" },
  { keys: ["Ctrl", "\\"], description: "Toggle sidebar" },
  { keys: ["Ctrl", "Shift", "F"], description: "Toggle focus mode" },
  { keys: ["Alt", "1"], description: "Split view" },
  { keys: ["Alt", "2"], description: "Editor only" },
  { keys: ["Alt", "3"], description: "Preview only" },
]
