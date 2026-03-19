"use client"

import { cn } from "@/lib/utils"
import type { EditorStats } from "./markdown-editor"

interface EditorStatusBarProps {
  stats: EditorStats
  className?: string
}

export function EditorStatusBar({ stats, className }: EditorStatusBarProps) {
  return (
    <div
      className={cn(
        "flex h-6 shrink-0 items-center justify-between border-t border-border bg-muted/30 px-3 text-[11px] text-muted-foreground",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span>
          Ln {stats.cursorLine}, Col {stats.cursorColumn}
        </span>
        <span className="h-3 w-px bg-border" />
        <span>
          {stats.lines} {stats.lines === 1 ? "line" : "lines"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span>
          {stats.words} {stats.words === 1 ? "word" : "words"}
        </span>
        <span className="h-3 w-px bg-border" />
        <span>
          {stats.characters} {stats.characters === 1 ? "char" : "chars"}
        </span>
      </div>
    </div>
  )
}
