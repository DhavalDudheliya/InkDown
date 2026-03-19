"use client"

import { cn } from "@/lib/utils"

interface KeyboardShortcutBadgeProps {
  keys: string[]
  className?: string
}

export function KeyboardShortcutBadge({
  keys,
  className,
}: KeyboardShortcutBadgeProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {keys.map((key, i) => (
        <span key={i}>
          {i > 0 && (
            <span className="mx-0.5 text-xs text-muted-foreground">+</span>
          )}
          <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground">
            {key}
          </kbd>
        </span>
      ))}
    </div>
  )
}
