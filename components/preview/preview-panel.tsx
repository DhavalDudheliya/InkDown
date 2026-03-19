"use client"

import { cn } from "@/lib/utils"

interface PreviewPanelProps {
  className?: string
}

export function PreviewPanel({ className }: PreviewPanelProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center overflow-auto bg-muted/30 p-8",
        className
      )}
    >
      <div className="w-full max-w-[210mm] rounded-lg bg-white p-12 shadow-lg dark:bg-zinc-900">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Live Preview
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            The rendered PDF preview will appear here. This panel will be fully
            implemented in Phase 3 with real-time Markdown rendering,
            pagination, and zoom controls.
          </p>
        </div>
      </div>
    </div>
  )
}
