"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { useDocumentStore, useStyleStore } from "@/stores"
import { useDebounce } from "@/hooks/use-debounce"
import { parseMarkdown } from "@/lib/markdown-parser"
import { ScrollArea } from "@/components/ui/scroll-area"

import { PreviewPage } from "./preview-page"
import { PreviewToolbar, ZOOM_LEVELS } from "./preview-toolbar"

interface PreviewPanelProps {
  className?: string
}

export function PreviewPanel({ className }: PreviewPanelProps) {
  const content = useDocumentStore((s) => s.content)
  const pageLayout = useStyleStore((s) => s.pageLayout)
  const fonts = useStyleStore((s) => s.fonts)
  const colors = useStyleStore((s) => s.colors)
  const bodyText = useStyleStore((s) => s.bodyText)
  const headings = useStyleStore((s) => s.headings)
  const codeBlock = useStyleStore((s) => s.codeBlock)
  const headerFooter = useStyleStore((s) => s.headerFooter)
  const documentStructure = useStyleStore((s) => s.documentStructure)
  const specialContent = useStyleStore((s) => s.specialContent)
  const tableConfig = useStyleStore((s) => s.tableConfig)

  const debouncedContent = useDebounce(content, 300)
  const [html, setHtml] = useState("")
  const [zoom, setZoom] = useState(75)
  const [currentPage, setCurrentPage] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Parse markdown when content changes
  useEffect(() => {
    let cancelled = false
    parseMarkdown(debouncedContent, codeBlock.theme, documentStructure, specialContent).then((result) => {
      if (!cancelled) setHtml(result)
    })
    return () => {
      cancelled = true
    }
  }, [debouncedContent, codeBlock.theme, documentStructure, specialContent])

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setZoom((z) => {
      const idx = ZOOM_LEVELS.findIndex((l) => l > z)
      return idx >= 0 ? ZOOM_LEVELS[idx] : z
    })
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((z) => {
      const levels = [...ZOOM_LEVELS].reverse()
      const idx = levels.findIndex((l) => l < z)
      return idx >= 0 ? levels[idx] : z
    })
  }, [])

  const handleZoomFit = useCallback(() => {
    setZoom(75)
  }, [])

  // Build inline styles based on store state
  const previewStyles = buildPreviewStyles(fonts, colors, bodyText, headings, tableConfig)

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <PreviewToolbar
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomFit={handleZoomFit}
        currentPage={currentPage}
        totalPages={1}
        onPrevPage={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onNextPage={() => setCurrentPage((p) => p + 1)}
      />

      {/* Preview scroll area */}
      <div ref={scrollRef} className="flex-1 overflow-auto bg-muted/30">
        <div className="flex flex-col items-center gap-6 p-6">
          {/* Inject preview-specific CSS variables */}
          <style>{previewStyles}</style>

          <PreviewPage
            html={html}
            pageLayout={pageLayout}
            headerFooter={headerFooter}
            documentStructure={documentStructure}
            zoom={zoom}
            pageNumber={1}
            totalPages={1}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Generates CSS that styles the rendered Markdown HTML inside `.preview-content`.
 * All styles come from the Zustand stores so the preview updates live.
 */
function buildPreviewStyles(
  fonts: ReturnType<typeof useStyleStore.getState>["fonts"],
  colors: ReturnType<typeof useStyleStore.getState>["colors"],
  bodyText: ReturnType<typeof useStyleStore.getState>["bodyText"],
  headings: ReturnType<typeof useStyleStore.getState>["headings"],
  tableConfig: ReturnType<typeof useStyleStore.getState>["tableConfig"]
): string {
  const headingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const

  const headingCss = headingLevels
    .map((tag) => {
      const level = tag as keyof typeof headings
      const h = headings[level]
      const color = colors.headingColors[level] || colors.bodyTextColor
      return `
      .preview-content ${tag} {
        font-size: ${h.fontSize}px;
        font-weight: ${h.fontWeight};
        color: ${color};
        margin-top: ${h.spacingTop}px;
        margin-bottom: ${h.spacingBottom}px;
        line-height: 1.3;
        font-family: '${fonts.heading.family}', sans-serif;
        ${h.borderBottom ? `border-bottom: 1px solid ${color}20; padding-bottom: ${h.spacingBottom / 2}px;` : ""}
      }`
    })
    .join("\n")

  return `
    .preview-content {
      font-family: '${fonts.body.family}', sans-serif;
      font-size: ${fonts.body.size}px;
      font-weight: ${fonts.body.weight};
      line-height: ${fonts.body.lineHeight};
      letter-spacing: ${fonts.body.letterSpacing}em;
      color: ${colors.bodyTextColor};
      text-align: ${bodyText.textAlignment};
      ${bodyText.firstLineIndent ? "text-indent: 1.5em;" : ""}
    }

    ${headingCss}

    .preview-content p {
      margin-bottom: ${bodyText.paragraphSpacing}px;
    }

    .preview-content a {
      color: ${colors.linkColor};
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .preview-content blockquote {
      border-left: 3px solid ${colors.blockquoteBorderColor};
      background-color: ${colors.blockquoteBackgroundColor};
      padding: 12px 16px;
      margin: 16px 0;
      color: ${colors.secondaryTextColor};
      font-style: italic;
    }

    .preview-content blockquote p {
      margin-bottom: 0;
    }

    .preview-content code {
      font-family: '${fonts.monospace.family}', monospace;
      font-size: 0.875em;
      background-color: ${colors.inlineCodeBackground};
      color: ${colors.inlineCodeTextColor};
      padding: 2px 5px;
      border-radius: 4px;
    }

    .preview-content pre {
      background-color: ${colors.inlineCodeBackground};
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
      overflow-x: auto;
    }

    .preview-content pre code {
      background: none;
      padding: 0;
      font-size: ${fonts.monospace.size}px;
      line-height: ${fonts.monospace.lineHeight};
    }

    .preview-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 0.9em;
      ${tableConfig.borderStyle === "grid" ? `border: 1px solid ${colors.tableRowAlternateColor};` : ""}
    }

    .preview-content thead th {
      background-color: ${colors.tableHeaderBackground};
      color: ${colors.tableHeaderTextColor};
      font-weight: ${tableConfig.headerBold ? 600 : 400};
      padding: ${tableConfig.cellPadding}px;
      text-align: left;
      border-bottom: 2px solid ${colors.tableRowAlternateColor};
      ${tableConfig.borderStyle === "grid" ? `border-right: 1px solid ${colors.tableRowAlternateColor};` : ""}
    }

    .preview-content tbody td {
      padding: ${tableConfig.cellPadding}px;
      ${tableConfig.borderStyle !== "none" ? `border-bottom: 1px solid ${colors.tableRowAlternateColor}40;` : ""}
      ${tableConfig.borderStyle === "grid" ? `border-right: 1px solid ${colors.tableRowAlternateColor}40;` : ""}
    }

    .preview-content tbody tr:nth-child(even) {
      ${tableConfig.stripedRows ? `background-color: ${colors.tableRowAlternateColor};` : ""}
    }

    .preview-content img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin: 12px 0;
    }

    .preview-content ul, .preview-content ol {
      padding-left: 24px;
      margin-bottom: ${bodyText.paragraphSpacing}px;
    }

    .preview-content li {
      margin-bottom: 4px;
    }

    .preview-content li > ul,
    .preview-content li > ol {
      margin-bottom: 0;
    }

    .preview-content hr {
      border: none;
      border-top: 1px solid ${colors.secondaryTextColor}30;
      margin: 24px 0;
    }

    .preview-content .math-display {
      overflow-x: auto;
      margin: 16px 0;
    }

    .preview-content input[type="checkbox"] {
      margin-right: 8px;
    }
  `
}

