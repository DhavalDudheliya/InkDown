export type ExportFormat = "pdf" | "html" | "clipboard" | "print"

export type CompressionLevel = "low" | "medium" | "high"

export interface PdfMetadata {
  title: string
  author: string
  subject: string
  keywords: string
  creator: string
}

export interface ExportOptions {
  format: ExportFormat
  metadata: PdfMetadata
  password: string
  compressionLevel: CompressionLevel
}
