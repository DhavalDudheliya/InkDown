"use client"

import { useState } from "react"
import {
  Panel,
  Group,
  Separator,
} from "react-resizable-panels"

import { cn } from "@/lib/utils"
import { useEditorStore } from "@/stores"
import { useAutoSave } from "@/hooks/use-auto-save"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { Navbar } from "@/components/navbar"
import { PreviewPanel } from "@/components/preview"
import { SidebarContainer } from "@/components/sidebar"

import { MarkdownEditor, type EditorStats } from "./markdown-editor"
import { EditorStatusBar } from "./editor-status-bar"

export function EditorPage() {
  useAutoSave()
  useKeyboardShortcuts()

  const viewMode = useEditorStore((s) => s.viewMode)
  const sidebarOpen = useEditorStore((s) => s.sidebarOpen)
  const focusMode = useEditorStore((s) => s.focusMode)

  const [stats, setStats] = useState<EditorStats>({
    lines: 0,
    words: 0,
    characters: 0,
    cursorLine: 1,
    cursorColumn: 1,
  })

  const showEditor = viewMode === "split" || viewMode === "editor"
  const showPreview = viewMode === "split" || viewMode === "preview"

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Main workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor + Preview panels */}
        <Group orientation="horizontal" className="flex-1">
          {/* Editor panel */}
          {showEditor && (
            <Panel
              defaultSize={viewMode === "split" ? "50%" : "100%"}
              minSize="30%"
              id="editor-panel"
            >
              <div className="flex h-full flex-col">
                <MarkdownEditor
                  className="flex-1"
                  onStats={setStats}
                />
                <EditorStatusBar stats={stats} />
              </div>
            </Panel>
          )}

          {/* Resize handle */}
          {viewMode === "split" && (
            <Separator className="group relative w-px bg-border transition-colors hover:bg-primary data-[resize-handle-state=drag]:bg-primary">
              <div className="absolute inset-y-0 -left-1 -right-1 z-10" />
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                  "flex h-8 w-3 items-center justify-center rounded-sm",
                  "opacity-0 transition-opacity group-hover:opacity-100 group-data-[resize-handle-state=drag]:opacity-100"
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="h-0.5 w-0.5 rounded-full bg-muted-foreground" />
                  <div className="h-0.5 w-0.5 rounded-full bg-muted-foreground" />
                  <div className="h-0.5 w-0.5 rounded-full bg-muted-foreground" />
                </div>
              </div>
            </Separator>
          )}

          {/* Preview panel */}
          {showPreview && (
            <Panel
              defaultSize={viewMode === "split" ? "50%" : "100%"}
              minSize="30%"
              id="preview-panel"
            >
              <PreviewPanel />
            </Panel>
          )}
        </Group>

        {/* Right sidebar */}
        {sidebarOpen && !focusMode && <SidebarContainer />}
      </div>
    </div>
  )
}
