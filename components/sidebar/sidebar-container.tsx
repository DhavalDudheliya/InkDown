"use client"

import { Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarContainerProps {
  className?: string
}

export function SidebarContainer({ className }: SidebarContainerProps) {
  return (
    <div
      className={cn(
        "flex w-72 shrink-0 flex-col border-l border-border bg-background",
        className
      )}
    >
      {/* Sidebar header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Settings className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Style Settings</span>
      </div>

      {/* Sidebar content */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="px-4 text-xs text-muted-foreground">
            Theme, typography, color, code block, layout, and other styling
            panels will be added in Phases 4–9.
          </p>
        </div>
      </ScrollArea>
    </div>
  )
}
