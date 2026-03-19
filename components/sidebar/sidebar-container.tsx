"use client"

import { Settings, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import { useStyleStore } from "@/stores"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ThemePanel } from "./theme-panel"
import { TypographyPanel } from "./typography-panel"
import { ColorPanel } from "./color-panel"
import { CodeBlockPanel } from "./code-block-panel"
import { PageLayoutPanel } from "./page-layout-panel"
import { HeaderFooterPanel } from "./header-footer-panel"

interface SidebarContainerProps {
  className?: string
}

export function SidebarContainer({ className }: SidebarContainerProps) {
  const resetToDefaults = useStyleStore((s) => s.resetToDefaults)

  return (
    <div
      className={cn(
        "flex w-72 shrink-0 flex-col border-l border-border bg-background",
        className
      )}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Style Settings</span>
        </div>
        <Tooltip>
          <TooltipTrigger
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={resetToDefaults}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </TooltipTrigger>
          <TooltipContent side="left">Reset to Defaults</TooltipContent>
        </Tooltip>
      </div>

      {/* Sidebar content */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-0 p-2">
          <ThemePanel />
          <PageLayoutPanel />
          <TypographyPanel />
          <ColorPanel />
          <HeaderFooterPanel />
          <CodeBlockPanel />
        </div>
      </ScrollArea>
    </div>
  )
}
