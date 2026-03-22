"use client"

import {
  PanelRightClose,
  PanelRightOpen,
  Moon,
  Sun,
  Columns2,
  PanelLeft,
  PanelRight,
  Focus,
  Undo2,
  Redo2,
  HelpCircle,
} from "lucide-react"
import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { useDocumentStore, useEditorStore } from "@/stores"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Logo } from "@/components/common"
import { FileImportDialog } from "@/components/editor/file-import-dialog"

import { FileNameInput } from "./file-name-input"
import { ExportButton } from "./export-button"
import { GithubStarButton } from "./github-star-button"
import { useTour } from "@/hooks/use-tour"

import type { ViewMode } from "@/stores/editor-store"

interface NavbarProps {
  className?: string
}

const VIEW_MODE_ITEMS: {
  mode: ViewMode
  icon: React.ReactNode
  label: string
}[] = [
  {
    mode: "split",
    icon: <Columns2 className="h-3.5 w-3.5" />,
    label: "Split View",
  },
  {
    mode: "editor",
    icon: <PanelLeft className="h-3.5 w-3.5" />,
    label: "Editor Only",
  },
  {
    mode: "preview",
    icon: <PanelRight className="h-3.5 w-3.5" />,
    label: "Preview Only",
  },
]

// Reusable icon button with tooltip
function NavIconButton({
  onClick,
  disabled,
  active,
  tooltip,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  active?: boolean
  tooltip: string
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
          active && "text-primary"
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltip}</TooltipContent>
    </Tooltip>
  )
}

export function Navbar({ className }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    useCallback(() => () => {}, []),
    () => true,
    () => false
  )
  const undoStack = useDocumentStore((s) => s.undoStack)
  const redoStack = useDocumentStore((s) => s.redoStack)
  const undo = useDocumentStore((s) => s.undo)
  const redo = useDocumentStore((s) => s.redo)
  const viewMode = useEditorStore((s) => s.viewMode)
  const setViewMode = useEditorStore((s) => s.setViewMode)
  const sidebarOpen = useEditorStore((s) => s.sidebarOpen)
  const toggleSidebar = useEditorStore((s) => s.toggleSidebar)
  const focusMode = useEditorStore((s) => s.focusMode)
  const toggleFocusMode = useEditorStore((s) => s.toggleFocusMode)

  const { startTour } = useTour()

  return (
    <nav
      className={cn(
        "flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-3",
        className
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-2">
        <Logo size="sm" showText={!focusMode} />
        <div className="mx-1 h-5 w-px bg-border" />
        <FileNameInput />
      </div>

      {/* Center section */}
      <div className="flex items-center gap-1">
        <div id="tour-undo-redo" className="flex items-center gap-1">
          <NavIconButton
            onClick={undo}
            disabled={undoStack.length === 0}
            tooltip="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-4 w-4" />
          </NavIconButton>

          <NavIconButton
            onClick={redo}
            disabled={redoStack.length === 0}
            tooltip="Redo (Ctrl+Y)"
          >
            <Redo2 className="h-4 w-4" />
          </NavIconButton>
        </div>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* View mode toggle */}
        <div
          id="tour-view-modes"
          className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5"
        >
          {VIEW_MODE_ITEMS.map((item) => (
            <Tooltip key={item.mode}>
              <TooltipTrigger
                className={cn(
                  "flex h-7 items-center justify-center rounded-md px-2 text-xs font-medium transition-all",
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

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Focus mode */}
        <NavIconButton
          onClick={toggleFocusMode}
          active={focusMode}
          tooltip="Focus Mode (Ctrl+Shift+F)"
        >
          <Focus className="h-4 w-4" />
        </NavIconButton>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1.5">
        <GithubStarButton />

        {/* Dark mode toggle */}
        <div id="tour-theme-toggle" className="flex items-center">
          <NavIconButton
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            tooltip="Toggle Dark Mode"
          >
            {!mounted || resolvedTheme !== "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </NavIconButton>
        </div>

        {/* Sidebar toggle */}
        <div id="tour-sidebar-toggle" className="flex items-center">
          <NavIconButton
            onClick={toggleSidebar}
            tooltip="Toggle Sidebar (Ctrl+\\)"
          >
            {sidebarOpen ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
          </NavIconButton>
        </div>

        <div id="tour-help" className="flex items-center">
          <NavIconButton onClick={startTour} tooltip="Take a Tour">
            <HelpCircle className="h-4 w-4" />
          </NavIconButton>
        </div>

        <div className="mx-1 h-5 w-px bg-border" />

        <FileImportDialog />

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Export button */}
        <ExportButton />
      </div>
    </nav>
  )
}
