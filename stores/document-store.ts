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
}

const DEFAULT_CONTENT = `# Welcome to InkDown

Start writing your Markdown here. The live preview will update as you type.

## Features

- **Rich Markdown editing** with syntax highlighting
- **Live preview** that looks exactly like your final PDF
- **Code blocks** with beautiful syntax highlighting
- **Customizable themes**, typography, and colors
- **Export to PDF** with one click

## Example Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}! Welcome to InkDown.\`
}

console.log(greet("World"))
\`\`\`

## Table Example

| Feature | Status |
|---------|--------|
| Editor | ✅ Ready |
| Preview | ✅ Ready |
| Export | ✅ Ready |

> **Tip:** Use the sidebar to customize your document's appearance.

---

Happy writing! ✨
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
  })
)
