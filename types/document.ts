export interface Document {
  id: string
  fileName: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface RecentDocument {
  id: string
  fileName: string
  preview: string
  updatedAt: Date
}

export interface TemplateDocument {
  id: string
  name: string
  description: string
  content: string
  category: TemplateCategory
}

export type TemplateCategory =
  | "report"
  | "resume"
  | "blog"
  | "documentation"
  | "letter"
  | "presentation"
