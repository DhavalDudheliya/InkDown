"use client"

import { ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PreviewToolbarProps {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomFit: () => void
  currentPage: number
  totalPages: number
  onPrevPage: () => void
  onNextPage: () => void
  className?: string
}

const ZOOM_LEVELS = [25, 50, 75, 100, 125, 150, 200]

export function PreviewToolbar({
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomFit,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  className,
}: PreviewToolbarProps) {
  return (
    <div
      className={cn(
        "flex h-9 shrink-0 items-center justify-between border-b border-border bg-muted/40 px-2",
        className
      )}
    >
      {/* Zoom controls */}
      <div className="flex items-center gap-0.5">
        <Tooltip>
          <TooltipTrigger
            className="inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
            onClick={onZoomOut}
            disabled={zoom <= ZOOM_LEVELS[0]}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Zoom Out</TooltipContent>
        </Tooltip>

        <span className="w-12 text-center text-xs text-muted-foreground tabular-nums">
          {zoom}%
        </span>

        <Tooltip>
          <TooltipTrigger
            className="inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
            onClick={onZoomIn}
            disabled={zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Zoom In</TooltipContent>
        </Tooltip>

        <div className="mx-1 h-4 w-px bg-border" />

        <Tooltip>
          <TooltipTrigger
            className="inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent"
            onClick={onZoomFit}
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Fit Width</TooltipContent>
        </Tooltip>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-0.5">
        <Tooltip>
          <TooltipTrigger
            className="inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
            onClick={onPrevPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Previous Page</TooltipContent>
        </Tooltip>

        <span className="text-xs text-muted-foreground tabular-nums">
          {currentPage} / {totalPages || 1}
        </span>

        <Tooltip>
          <TooltipTrigger
            className="inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
            onClick={onNextPage}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Next Page</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export { ZOOM_LEVELS }
