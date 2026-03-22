import { create } from "zustand"

interface DocumentState {
  content: string
  fileName: string
  undoStack: string[]
  redoStack: string[]
  isDirty: boolean
}

interface DocumentActions {
  setContent: (content: string) => void
  setFileName: (fileName: string) => void
  pushUndo: () => void
  undo: () => void
  redo: () => void
  loadDocument: (fileName: string, content: string) => void
  clearDocument: () => void
  setDirty: (isDirty: boolean) => void
}

const DEFAULT_CONTENT = `# Welcome to InkDown

Start writing your Markdown here. Use the Style Settings in the sidebar to customize every aspect of your PDF.

## Style Settings

| Category | Features | Customization |
| :--- | :--- | :--- |
| **Professional Themes** | Instantly apply curated styles | Clean Slate, Elegant Serif, etc. |
| **Advanced Typography** | 50+ Google Fonts | Sizes, Line Heights, Letter Gaps |
| **Enhanced Code Blocks** | 15+ Shiki Syntax Themes | Line Numbers, Language Badges |
| **Document Structure** | Table of Contents & Cover Page | Section Numbering, TOC Depth |
| **Dynamic Headers** | Custom Page Headers & Footers | Page Numbers, Dates, Dividers |
| **Special Content** | Images & Alerts | Callout Styles, Image Rounding |

## High-Performance Features

- **One-Click Export** – Generate high-quality, print-ready, vector-based PDFs instantly.
- **Style Presets** – Instantly apply expertly crafted themes to your entire document.
- **Real-Time Preview** – Experience what your final document will look like as you type.
- **Beautiful Mathematics** – Full support for KaTeX equations and scientific notation.
- **GFM Support** – Markdown tables, lists, and task lists with professional styling.

## Code Blocks

InkDown renders code blocks with full syntax highlighting. Toggle line numbers, language badges, and styling in the sidebar.

\`\`\`javascript
// Example of a beautiful code block in InkDown
async function exportToPDF(markdown, options) {
  const html = await parseMarkdown(markdown)
  const styled = applyStyles(html, options)

  return await generatePDF(styled, {
    format: "A4",
    margin: "8mm",
    printBackground: true
  })
}
\`\`\`

## Images & Media

Custom image styles including corner rounding and drop shadows can be applied instantly via the sidebar.

![InkDown Demo Image](/demo.png)

## Blockquotes & Callouts

> "The difference between a good document and a great one is not the content — it is the presentation." — *InkDown Design Team*

> [!NOTE]
> Use specialized callouts for tips, warnings, and important notes (like this one) in your documents.
`

export const useDocumentStore = create<DocumentState & DocumentActions>(
  (set, get) => ({
    content: DEFAULT_CONTENT,
    fileName: "Untitled",
    undoStack: [],
    redoStack: [],
    isDirty: false,

    setContent: (content) => {
      set({ content, isDirty: true })
    },

    setFileName: (fileName) => {
      set({ fileName })
    },

    pushUndo: () => {
      const { content, undoStack } = get()
      const newStack = [...undoStack, content].slice(-50)
      set({ undoStack: newStack, redoStack: [] })
    },

    undo: () => {
      const { undoStack, content } = get()
      if (undoStack.length === 0) return

      const previous = undoStack[undoStack.length - 1]
      const newUndoStack = undoStack.slice(0, -1)

      set((state) => ({
        content: previous,
        undoStack: newUndoStack,
        redoStack: [...state.redoStack, content],
      }))
    },

    redo: () => {
      const { redoStack, content } = get()
      if (redoStack.length === 0) return

      const next = redoStack[redoStack.length - 1]
      const newRedoStack = redoStack.slice(0, -1)

      set((state) => ({
        content: next,
        redoStack: newRedoStack,
        undoStack: [...state.undoStack, content],
      }))
    },

    loadDocument: (fileName, content) => {
      set({
        fileName,
        content,
        undoStack: [],
        redoStack: [],
        isDirty: false,
      })
    },

    clearDocument: () => {
      set({
        content: "",
        fileName: "Untitled",
        undoStack: [],
        redoStack: [],
        isDirty: false,
      })
    },

    setDirty: (isDirty) => {
      set({ isDirty })
    },
  })
)
