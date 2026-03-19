"use client"

import { useAutoSave } from "@/hooks/use-auto-save"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

export function EditorPage() {
  useAutoSave()
  useKeyboardShortcuts()

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Navbar will be added in Phase 2 */}
      <div className="flex h-12 shrink-0 items-center border-b border-border px-4">
        <span className="text-sm font-medium text-muted-foreground">
          InkDown — Editor (Phase 2 will add full navbar)
        </span>
      </div>

      {/* Main workspace area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor + Preview panels will be added in Phase 2 & 3 */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 28L4 24L20 4L28 8L8 28Z"
                  className="fill-primary"
                />
                <path
                  d="M4 24L3 29L8 28L4 24Z"
                  className="fill-primary/80"
                />
                <circle cx="24" cy="24" r="4" className="fill-primary/60" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              InkDown
            </h1>
            <p className="max-w-sm text-center text-sm text-muted-foreground">
              Foundation is ready. Editor, preview, and styling sidebar
              components will be built in the next phases.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
