"use client"

import { cn } from "@/lib/utils"
import { useDocumentStore } from "@/stores"
import { Cloud, CloudFog, CloudLightning, Loader2 } from "lucide-react"
import type { EditorStats } from "./markdown-editor"

interface EditorStatusBarProps {
  stats: EditorStats
  className?: string
}

export function EditorStatusBar({ stats, className }: EditorStatusBarProps) {
  const isDirty = useDocumentStore((s) => s.isDirty)

  return (
    <div
      className={cn(
        "flex h-6 shrink-0 items-center justify-between border-t border-border bg-muted/30 px-3 text-[11px] text-muted-foreground",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          {isDirty ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Cloud className="h-3 w-3 text-green-500/80" />
              Saved locally
            </>
          )}
        </span>
        <span className="h-3 w-px bg-border" />
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
