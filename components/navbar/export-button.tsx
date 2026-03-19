"use client"

import { Download, FileCode, FileText, Printer } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDocumentStore, useStyleStore } from "@/stores"
import { parseMarkdown } from "@/lib/markdown-parser"

interface ExportButtonProps {
  className?: string
}

export function ExportButton({ className }: ExportButtonProps) {
  const content = useDocumentStore((s) => s.content)
  const codeBlock = useStyleStore((s) => s.codeBlock)
  const documentStructure = useStyleStore((s) => s.documentStructure)
  const specialContent = useStyleStore((s) => s.specialContent)

  const handleExportPdf = async () => {
    try {
      // Dynamic import since html2pdf uses window object
      const html2pdf = (await import("html2pdf.js")).default

      const element = document.querySelector(".preview-content")
      const wrapper = element?.parentElement

      if (!wrapper) return

      const opt = {
        margin: 0,
        filename: "inkdown-export.pdf",
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          onclone: (document: Document) => {
            // Remove the tailwind classes that use color-mix(in oklab...) which crashes html2canvas
            const wrappers = document.querySelectorAll('.preview-page-wrapper');
            wrappers.forEach(wrap => {
              wrap.classList.remove("shadow-lg", "ring-1", "ring-black/5", "dark:bg-zinc-50");
              wrap.classList.add("bg-white");
              // Reset transform to ensure it is captured correctly at 100% scale
              (wrap as HTMLElement).style.transform = "none";
            });
          }
        },
        jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
      }

      // Generate PDF
      await html2pdf().set(opt).from(wrapper).save()
    } catch (error) {
      console.error("Failed to export PDF:", error)
    }
  }

  const handleExportMarkdown = () => {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "document.md"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportHtml = async () => {
    // Generate the raw HTML output (without CSS for now, or we can fetch CSS)
    const htmlOutput = await parseMarkdown(content, codeBlock, documentStructure, specialContent)
    
    // Minimal HTML wrapper for code viewing... (keeping this identical for now)
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Document</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; line-height: 1.6; }
    img { max-width: 100%; height: auto; }
    pre { padding: 1rem; border-radius: 8px; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #ddd; padding: 8px; }
  </style>
</head>
<body>
  ${htmlOutput}
</body>
</html>`

    const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "document.html"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ size: "sm" }), className)}>
        <Download className="mr-2 h-4 w-4" />
        Export
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPdf}>
          <FileText className="mr-2 h-4 w-4" />
          Save as PDF
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportHtml}>
          <FileCode className="mr-2 h-4 w-4" />
          Export as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportMarkdown}>
          <FileText className="mr-2 h-4 w-4" />
          Export as Markdown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
