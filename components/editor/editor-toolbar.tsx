"use client"

import { Columns2, PanelLeft, PanelRight, Focus } from "lucide-react"

import { cn } from "@/lib/utils"
import { useEditorStore } from "@/stores"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { ViewMode } from "@/stores/editor-store"

interface EditorToolbarProps {
  className?: string
}

const VIEW_MODE_ITEMS: {
  mode: ViewMode
  icon: React.ReactNode
  label: string
}[] = [
  {
    mode: "split",
    icon: <Columns2 className="h-4 w-4" />,
    label: "Split View",
  },
  {
    mode: "editor",
    icon: <PanelLeft className="h-4 w-4" />,
    label: "Editor Only",
  },
  {
    mode: "preview",
    icon: <PanelRight className="h-4 w-4" />,
    label: "Preview Only",
  },
]

export function EditorToolbar({ className }: EditorToolbarProps) {
  const viewMode = useEditorStore((s) => s.viewMode)
  const setViewMode = useEditorStore((s) => s.setViewMode)
  const focusMode = useEditorStore((s) => s.focusMode)
  const toggleFocusMode = useEditorStore((s) => s.toggleFocusMode)

  return (
    <div
      className={cn(
        "flex items-center gap-1 border-b border-border px-2 py-1",
        className
      )}
    >
      {/* Undo / Redo */}
      <div className="flex items-center gap-0.5">
        <span>Undo</span>
        <kbd className="ml-1.5 rounded border border-border px-1 py-0.5 text-[10px]">
          Ctrl+Z
        </kbd>

        <span>Redo</span>
        <kbd className="ml-1.5 rounded border border-border px-1 py-0.5 text-[10px]">
          Ctrl+Y
        </kbd>
      </div>

      {/* Divider */}
      <div className="mx-1 h-4 w-px bg-border" />

      {/* View mode toggle */}
      <div className="flex items-center gap-0.5 rounded-md bg-muted p-0.5">
        {VIEW_MODE_ITEMS.map((item) => (
          <Tooltip key={item.mode}>
            <TooltipTrigger
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-sm transition-colors",
                viewMode === item.mode
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setViewMode(item.mode)}
            >
              {item.icon}
            </TooltipTrigger>
            <TooltipContent side="bottom">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-1 h-4 w-px bg-border" />

      {/* Focus mode */}
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            focusMode && "text-primary"
          )}
          onClick={toggleFocusMode}
        >
          <Focus className="h-3.5 w-3.5" />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <span>Focus Mode</span>
          <kbd className="ml-1.5 rounded border border-border px-1 py-0.5 text-[10px]">
            Ctrl+Shift+F
          </kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
