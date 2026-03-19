"use client"

import { forwardRef, useEffect } from "react"
import mermaid from "mermaid"

import { cn } from "@/lib/utils"
import type { PageLayout, HeaderFooterSettings, HeaderFooterConfig, HeaderFooterSlotContent, DocumentStructureSettings } from "@/types/style"
import { PAGE_SIZES } from "@/constants/page-sizes"

interface PreviewPageProps {
  html: string
  pageLayout: PageLayout
  headerFooter: HeaderFooterSettings
  documentStructure: DocumentStructureSettings
  zoom: number
  pageNumber: number
  totalPages: number
  className?: string
}

/**
 * Renders a single styled "page" with correct dimensions, margins, and
 * background. The page is scaled according to the current zoom level.
 */
export const PreviewPage = forwardRef<HTMLDivElement, PreviewPageProps>(
  function PreviewPage(
    { html, pageLayout, headerFooter, documentStructure, zoom, pageNumber, totalPages, className },
    ref
  ) {
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

    useEffect(() => {
      mermaid.initialize({ startOnLoad: false, theme: "default" })
      mermaid.run({
        querySelector: ".mermaid",
        suppressErrors: true,
      }).catch(console.error)
    }, [html])

    const formatPageNumber = (num: number, format: HeaderFooterSettings["pageNumberFormat"]) => {
      if (format === "roman") {
        // Very basic roman numeral conversion for typical page numbers
        const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"]
        return roman[num - 1] || num.toString()
      }
      if (format === "alphabetical") {
        return String.fromCharCode(96 + num)
      }
      return num.toString()
    }

    const renderSlot = (slot: HeaderFooterSlotContent) => {
      switch (slot.type) {
        case "none":
          return null
        case "text":
          return <span>{slot.value}</span>
        case "title":
          return <span>Untitled Document</span> // Alternatively hook up to document name
        case "date":
          return <span>{new Date().toLocaleDateString()}</span>
        case "pageNumber":
          return <span>{formatPageNumber(pageNumber, headerFooter.pageNumberFormat)}</span>
        case "totalPages":
          return <span>Page {pageNumber} of {totalPages}</span>
        case "logo":
          // eslint-disable-next-line @next/next/no-img-element
          return <img src={slot.src || "https://placehold.co/100x40"} alt="Logo" className="h-6 object-contain" />
        default:
          return null
      }
    }

    const renderHeaderFooter = (
      config: HeaderFooterConfig,
      position: "header" | "footer",
      marginMm: number,
      paddingLeft: number,
      paddingRight: number
    ) => {
      if (!config.showOnFirstPage && pageNumber === 1) return null
      
      const isHeader = position === "header"
      
      return (
        <div
          className={cn(
            "absolute flex items-center justify-between text-[11px] text-muted-foreground",
            config.dividerEnabled && isHeader ? "border-b pb-2" : "",
            config.dividerEnabled && !isHeader ? "border-t pt-2" : ""
          )}
          style={{
            left: paddingLeft,
            right: paddingRight,
            // Position halfway into the margin
            [isHeader ? "top" : "bottom"]: Math.max((marginMm * MM_TO_PX) / 2 - 10, 0),
            ...(config.dividerEnabled && {
              borderColor: config.dividerColor,
              borderWidth: `${config.dividerThickness}px`,
            }),
          }}
        >
          <div className="flex-1 text-left">{renderSlot(config.left)}</div>
          <div className="flex-1 text-center justify-center flex">{renderSlot(config.center)}</div>
          <div className="flex-1 text-right flex justify-end">{renderSlot(config.right)}</div>
        </div>
      )
    }

    const paddingXSettings = pageLayout.margins.left * MM_TO_PX
    const paddingRightSettings = pageLayout.margins.right * MM_TO_PX

    return (
      <div
        className={cn("flex shrink-0 justify-center", className)}
        style={{ width: widthPx * scale, minHeight: heightPx * scale }}
      >
        <div
          ref={ref}
          data-page={pageNumber}
          className="relative origin-top-left bg-white shadow-lg ring-1 ring-black/5 dark:bg-zinc-50"
          style={{
            width: widthPx,
            minHeight: heightPx,
            transform: `scale(${scale})`,
            paddingTop: `${pageLayout.margins.top * MM_TO_PX}px`,
            paddingRight: `${paddingRightSettings}px`,
            paddingBottom: `${pageLayout.margins.bottom * MM_TO_PX}px`,
            paddingLeft: `${paddingXSettings}px`,
          }}
        >
          {/* Header */}
          {renderHeaderFooter(
            headerFooter.header, 
            "header", 
            pageLayout.margins.top, 
            paddingXSettings, 
            paddingRightSettings
          )}

          {/* Rendered HTML content with conditional Cover Page */}
          <div
            className={cn(
              "preview-content h-full text-black",
              // Support a two-column CSS layout if enabled
              pageLayout.twoColumn ? "columns-2 gap-8" : "",
            )}
            style={{
              maxWidth: pageLayout.maxContentWidth > 0 ? `${pageLayout.maxContentWidth * MM_TO_PX}px` : "none",
              margin: pageLayout.maxContentWidth > 0 ? "0 auto" : "0"
            }}
          >
            {documentStructure.coverPage.enabled && (
              <div 
                className="flex flex-col items-center justify-center text-center w-full mb-16 break-after-page"
                style={{ minHeight: heightPx * 0.7 }}
              >
                {documentStructure.coverPage.title && (
                  <h1 className="text-5xl font-bold mb-4">{documentStructure.coverPage.title}</h1>
                )}
                {documentStructure.coverPage.subtitle && (
                  <p className="text-2xl text-muted-foreground mb-12">{documentStructure.coverPage.subtitle}</p>
                )}
                {documentStructure.coverPage.author && (
                  <p className="text-xl font-medium mt-auto">{documentStructure.coverPage.author}</p>
                )}
                {documentStructure.coverPage.date && (
                  <p className="text-lg text-muted-foreground mt-2">{documentStructure.coverPage.date}</p>
                )}
              </div>
            )}
            
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>

          {/* Footer */}
          {renderHeaderFooter(
            headerFooter.footer, 
            "footer", 
            pageLayout.margins.bottom, 
            paddingXSettings, 
            paddingRightSettings
          )}
        </div>
      </div>
    )
  }
)
