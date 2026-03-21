"use client"

import { useCallback, useRef, useState } from "react"
import {
  Upload,
  FileText,
  Link2,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useDocumentStore } from "@/stores"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FileImportDialogProps {
  trigger?: React.ReactNode
  className?: string
}

export function FileImportDialog({ trigger, className }: FileImportDialogProps) {
  const [open, setOpen] = useState(false)
  const [urlValue, setUrlValue] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const loadDocument = useDocumentStore((s) => s.loadDocument)

  const handleFile = useCallback(
    async (file: File) => {
      setError(null)
      if (!file.name.endsWith(".md") && !file.name.endsWith(".txt") && !file.name.endsWith(".markdown")) {
        setError("Only .md, .txt, and .markdown files are supported.")
        return
      }

      try {
        const text = await file.text()
        const name = file.name.replace(/\.(md|txt|markdown)$/, "")
        loadDocument(name, text)
        setOpen(false)
      } catch {
        setError("Failed to read file.")
      }
    },
    [loadDocument]
  )

  const handleFilePicker = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleUrlImport = useCallback(async () => {
    setError(null)
    if (!urlValue.trim()) {
      setError("Please enter a URL.")
      return
    }

    try {
      const res = await fetch(urlValue.trim())
      if (!res.ok) throw new Error("Failed to fetch URL")
      const text = await res.text()
      const urlObj = new URL(urlValue.trim())
      const name = urlObj.pathname.split("/").pop()?.replace(/\.(md|txt|markdown)$/, "") || "Imported"
      loadDocument(name, text)
      setOpen(false)
    } catch {
      setError("Failed to import from URL. Make sure it's a publicly accessible raw Markdown file.")
    }
  }, [urlValue, loadDocument])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
          className
        )}
      >
        <Upload className="h-3.5 w-3.5" />
        Import
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Document</DialogTitle>
          <DialogDescription>
            Upload a Markdown file, drag and drop, or import from a URL.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="file" className="mt-2 w-full">
          <TabsList className="w-full">
            <TabsTrigger value="file" className="w-full">
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              File
            </TabsTrigger>
            <TabsTrigger value="url" className="w-full">
              <Link2 className="mr-1.5 h-3.5 w-3.5" />
              URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="mt-2">
            {/* Drop zone */}
            <div
              className={cn(
                "flex min-h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="mb-1 text-sm font-medium">
                Drag and drop a file here
              </p>
              <p className="mb-3 text-xs text-muted-foreground">
                Supports .md, .txt, and .markdown files
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.txt,.markdown"
                className="hidden"
                onChange={handleFilePicker}
              />
            </div>
          </TabsContent>

          <TabsContent value="url" className="mt-4">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Input
                  placeholder="https://raw.githubusercontent.com/..."
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleUrlImport()
                  }}
                />
                <Button onClick={handleUrlImport}>Import</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter a URL to a raw Markdown file. GitHub raw URLs work best.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Error */}
        {error && (
          <div className="mt-2 flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
            <X className="h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
