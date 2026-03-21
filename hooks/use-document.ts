import { useDocumentStore } from "@/stores"

export function useDocument() {
  const content = useDocumentStore((s) => s.content)
  const fileName = useDocumentStore((s) => s.fileName)
  const isDirty = useDocumentStore((s) => s.isDirty)
  const setContent = useDocumentStore((s) => s.setContent)
  const setFileName = useDocumentStore((s) => s.setFileName)
  const pushUndo = useDocumentStore((s) => s.pushUndo)
  const undo = useDocumentStore((s) => s.undo)
  const redo = useDocumentStore((s) => s.redo)
  const loadDocument = useDocumentStore((s) => s.loadDocument)
  const clearDocument = useDocumentStore((s) => s.clearDocument)
  const undoStack = useDocumentStore((s) => s.undoStack)
  const redoStack = useDocumentStore((s) => s.redoStack)

  return {
    content,
    fileName,
    isDirty,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
    setContent,
    setFileName,
    pushUndo,
    undo,
    redo,
    loadDocument,
    clearDocument,
  }
}
