"use client"

import { forwardRef } from "react"

import { cn } from "@/lib/utils"
import type { PageLayout } from "@/types/style"
import { PAGE_SIZES } from "@/constants/page-sizes"

interface PreviewPageProps {
  html: string
  pageLayout: PageLayout
  zoom: number
  pageNumber: number
  className?: string
}

/**
 * Renders a single styled "page" with correct dimensions, margins, and
 * background. The page is scaled according to the current zoom level.
 */
export const PreviewPage = forwardRef<HTMLDivElement, PreviewPageProps>(
  function PreviewPage({ html, pageLayout, zoom, pageNumber, className }, ref) {
    const dimensions = PAGE_SIZES[pageLayout.size]
    const isLandscape = pageLayout.orientation === "landscape"

    // Physical dimensions in mm
    const widthMm = isLandscape ? dimensions.height : dimensions.width
    const heightMm = isLandscape ? dimensions.width : dimensions.height

    // Convert mm → px at 96 DPI (1mm ≈ 3.7795px)
    const MM_TO_PX = 3.7795
    const widthPx = widthMm * MM_TO_PX
    const heightPx = heightMm * MM_TO_PX

    const scale = zoom / 100

    return (
      <div
        className={cn("flex shrink-0 justify-center", className)}
        style={{ width: widthPx * scale, height: heightPx * scale }}
      >
        <div
          ref={ref}
          data-page={pageNumber}
          className="origin-top-left overflow-hidden bg-white shadow-lg ring-1 ring-black/5 dark:bg-zinc-50"
          style={{
            width: widthPx,
            height: heightPx,
            transform: `scale(${scale})`,
            paddingTop: `${pageLayout.margins.top * MM_TO_PX}px`,
            paddingRight: `${pageLayout.margins.right * MM_TO_PX}px`,
            paddingBottom: `${pageLayout.margins.bottom * MM_TO_PX}px`,
            paddingLeft: `${pageLayout.margins.left * MM_TO_PX}px`,
          }}
        >
          {/* Rendered HTML content */}
          <div
            className="preview-content h-full overflow-hidden text-black"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    )
  }
)
