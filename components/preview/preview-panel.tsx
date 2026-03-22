"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { useDocumentStore, useStyleStore, useEditorStore } from "@/stores"
import { useDebounce } from "@/hooks/use-debounce"
import { parseMarkdown } from "@/lib/markdown-parser"
import { PreviewPage } from "./preview-page"
import { PreviewToolbar, ZOOM_LEVELS } from "./preview-toolbar"

interface PreviewPanelProps {
  className?: string
}

export function PreviewPanel({ className }: PreviewPanelProps) {
  const content = useDocumentStore((s) => s.content)
  const fonts = useStyleStore((s) => s.fonts)
  const colors = useStyleStore((s) => s.colors)
  const bodyText = useStyleStore((s) => s.bodyText)
  const headings = useStyleStore((s) => s.headings)
  const codeBlock = useStyleStore((s) => s.codeBlock)
  const headerFooter = useStyleStore((s) => s.headerFooter)
  const documentStructure = useStyleStore((s) => s.documentStructure)
  const specialContent = useStyleStore((s) => s.specialContent)
  const tableConfig = useStyleStore((s) => s.tableConfig)
  const sidebarOpen = useEditorStore((s) => s.sidebarOpen)

  const debouncedContent = useDebounce(content, 300)
  const [html, setHtml] = useState("")
  const [zoom, setZoom] = useState(100)
  const [prevSidebarOpen, setPrevSidebarOpen] = useState(sidebarOpen)
  const scrollRef = useRef<HTMLDivElement>(null)

  if (sidebarOpen !== prevSidebarOpen) {
    setPrevSidebarOpen(sidebarOpen)
    setZoom(sidebarOpen ? 75 : 100)
  }

  // Parse markdown when content changes
  useEffect(() => {
    let cancelled = false
    parseMarkdown(
      debouncedContent,
      codeBlock,
      documentStructure,
      specialContent
    ).then((result) => {
      if (!cancelled) setHtml(result)
    })
    return () => {
      cancelled = true
    }
  }, [debouncedContent, codeBlock, documentStructure, specialContent])

  // Load selected fonts from Google Fonts
  useEffect(() => {
    const families = new Set(
      [
        fonts.body.family,
        fonts.heading.family,
        fonts.monospace.family,
        codeBlock.fontFamily !== "default" ? codeBlock.fontFamily : null,
      ].filter(Boolean) as string[]
    )

    const familiesParam = Array.from(families)
      .map((f) => f.replace(/ /g, "+"))
      .map((f) => `family=${f}:wght@300;400;500;600;700;800;900`)
      .join("&")

    const linkId = "google-fonts-link"
    let link = document.getElementById(linkId) as HTMLLinkElement

    if (!link) {
      link = document.createElement("link")
      link.id = linkId
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }

    link.href = `https://fonts.googleapis.com/css2?${familiesParam}&display=swap`
  }, [fonts, codeBlock.fontFamily])

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
    if (!scrollRef.current) return
    const containerWidth = scrollRef.current.clientWidth - 48 // Subtract padding
    const pageWidth = 210 * 3.7795 // A4 width in px
    const fitZoom = Math.floor((containerWidth / pageWidth) * 100)
    // Clamp between our MIN and MAX zoom levels
    setZoom(Math.max(25, Math.min(200, fitZoom)))
  }, [])

  // Build inline styles based on store state
  const previewStyles = buildPreviewStyles(
    fonts,
    colors,
    bodyText,
    headings,
    tableConfig,
    codeBlock
  )

  return (
    <div
      id="tour-preview"
      className={cn(
        "flex h-full flex-col print:h-auto print:overflow-visible",
        className
      )}
    >
      <div className="print:hidden">
        <PreviewToolbar
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomFit={handleZoomFit}
        />
      </div>

      {/* Preview scroll area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto bg-muted/30 print:overflow-visible print:bg-white"
      >
        <div className="flex min-h-full min-w-full flex-col items-center justify-start p-6 print:block print:p-0">
          {/* Inject preview-specific CSS variables */}
          <style>{previewStyles}</style>

          <PreviewPage
            html={html}
            headerFooter={headerFooter}
            documentStructure={documentStructure}
            zoom={zoom}
            className="mx-auto"
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
  tableConfig: ReturnType<typeof useStyleStore.getState>["tableConfig"],
  codeBlock: ReturnType<typeof useStyleStore.getState>["codeBlock"]
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
    .preview-page-wrapper {
      background-color: ${colors.pageBackgroundColor} !important;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .preview-content {
      font-family: '${fonts.body.family}', sans-serif;
      font-size: ${fonts.body.size}px;
      font-weight: ${fonts.body.weight};
      line-height: ${fonts.body.lineHeight};
      letter-spacing: ${fonts.body.letterSpacing}em;
      color: ${colors.bodyTextColor};
      text-align: ${bodyText.textAlignment};
      ${bodyText.firstLineIndent ? "text-indent: 1.5em;" : ""}
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
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

    .preview-content .code-block-container {
      margin: 16px 0;
      border-radius: ${codeBlock.borderRadius}px;
      overflow: hidden;
      ${codeBlock.border ? `border: 1px solid ${colors.inlineCodeTextColor}20;` : ""}
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .preview-content .code-block-header {
      background-color: ${colors.inlineCodeBackground};
      color: ${colors.inlineCodeTextColor};
      padding: 6px 16px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid ${colors.inlineCodeTextColor}20;
      font-family: '${fonts.body.family}', sans-serif;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .preview-content pre {
      background-color: ${colors.inlineCodeBackground};
      border-radius: ${codeBlock.borderRadius}px;
      padding: ${codeBlock.padding}px;
      ${
        codeBlock.wordWrap
          ? `
        white-space: pre-wrap; 
        word-wrap: break-word;
        overflow-wrap: break-word;
        overflow-x: hidden;
      `
          : `
        white-space: pre;
        overflow-x: auto;
      `
      }
      max-width: 100%;
      ${codeBlock.border && !codeBlock.fileNameLabel ? `border: 1px solid ${colors.inlineCodeTextColor}20;` : ""}
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .preview-content pre code {
      background: none;
      padding: 0;
      font-family: '${codeBlock.fontFamily === "default" ? fonts.monospace.family : codeBlock.fontFamily}', monospace;
      font-size: ${codeBlock.fontSize}px;
      line-height: ${fonts.monospace.lineHeight};
      display: grid;
    }

    .preview-content pre.has-line-numbers {
      counter-reset: line;
    }

    .preview-content pre.has-line-numbers code .line::before {
      counter-increment: line;
      content: counter(line);
      display: inline-block;
      width: 2rem;
      text-align: left;
      color: ${colors.inlineCodeTextColor}60;
    }

    .preview-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 24px 0;
      font-size: 0.95em;
      border: 1px solid ${colors.tableBorderColor};
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .preview-content thead th {
      background-color: ${colors.tableHeaderBackground};
      color: ${colors.tableHeaderTextColor};
      font-weight: ${tableConfig.headerBold ? 700 : 500};
      padding: 12px 16px;
      text-align: left;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      border-bottom: 2px solid ${colors.tableBorderColor};
      border-right: 1px solid ${colors.tableBorderColor};
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .preview-content thead th:last-child {
      border-right: none;
    }

    .preview-content tbody td {
      padding: 12px 16px;
      vertical-align: top;
      border-bottom: 1px solid ${colors.tableBorderColor};
      border-right: 1px solid ${colors.tableBorderColor};
    }

    .preview-content tbody td:last-child {
      border-right: none;
    }

    .preview-content tbody tr:last-child td {
      border-bottom: none;
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

    .preview-content ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin-bottom: ${bodyText.paragraphSpacing}px;
    }

    .preview-content ol {
      list-style-type: decimal;
      padding-left: 1.5rem;
      margin-bottom: ${bodyText.paragraphSpacing}px;
    }

    .preview-content li {
      display: list-item;
      margin-bottom: 4px;
    }

    .preview-content li > ul,
    .preview-content li > ol {
      margin-top: 4px;
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

    /* Callout Styles */
    .ink-callout {
      margin: 1.5rem 0;
      padding: 1rem;
      border-radius: 8px;
      font-size: 0.95em;
      line-height: 1.6;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .ink-callout::before {
      display: block;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.75rem;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }

    /* Modern Theme (Soft Background) */
    .ink-callout-theme-modern {
      border: 1px solid transparent;
    }

    /* Classic Theme (Left Border) */
    .ink-callout-theme-classic {
      border-left-width: 4px;
      background-color: transparent !important;
      border-radius: 2px;
    }

    /* Minimal Theme (No decoration) */
    .ink-callout-theme-minimal {
      padding-left: 0;
      padding-right: 0;
      background: transparent !important;
      border: none;
    }

    /* Types */
    .ink-callout-note { background-color: #f0f9ff; color: #0369a1; border-color: #bae6fd; }
    .ink-callout-note::before { content: "Note"; }
    .ink-callout-note.ink-callout-theme-classic { border-left-color: #0369a1; background-color: #f0f9ff20 !important; }

    .ink-callout-tip { background-color: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
    .ink-callout-tip::before { content: "Tip"; }
    .ink-callout-tip.ink-callout-theme-classic { border-left-color: #15803d; background-color: #f0fdf420 !important; }

    .ink-callout-info { background-color: #f0f9ff; color: #0369a1; border-color: #bae6fd; }
    .ink-callout-info::before { content: "Info"; }
    .ink-callout-info.ink-callout-theme-classic { border-left-color: #0369a1; background-color: #f0f9ff20 !important; }

    .ink-callout-warning { background-color: #fffbeb; color: #a16207; border-color: #fef3c7; }
    .ink-callout-warning::before { content: "Warning"; }
    .ink-callout-warning.ink-callout-theme-classic { border-left-color: #a16207; background-color: #fffbeb20 !important; }

    .ink-callout-caution { background-color: #fef2f2; color: #b91c1c; border-color: #fee2e2; }
    .ink-callout-caution::before { content: "Caution"; }
    .ink-callout-caution.ink-callout-theme-classic { border-left-color: #b91c1c; background-color: #fef2f220 !important; }

    .ink-callout-important { background-color: #faf5ff; color: #7e22ce; border-color: #f3e8ff; }
    .ink-callout-important::before { content: "Important"; }
    .ink-callout-important.ink-callout-theme-classic { border-left-color: #7e22ce; background-color: #faf5ff20 !important; }
    .preview-content .toc-container {
      min-height: 280mm;
      display: block;
      width: 100%;
      break-after: page;
      page-break-after: always;
    }

    .preview-content .toc-container ul {
      margin-bottom: 2rem;
    }
  `
}
