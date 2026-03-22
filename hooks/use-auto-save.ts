import { useEffect, useRef } from "react"

import { useDocumentStore } from "@/stores"

const AUTO_SAVE_KEY = "inkdown_autosave"
const AUTO_SAVE_FILENAME_KEY = "inkdown_autosave_filename"
const AUTO_SAVE_INTERVAL = 5000 // 5 seconds

export function useAutoSave() {
  const content = useDocumentStore((s) => s.content)
  const fileName = useDocumentStore((s) => s.fileName)
  const isDirty = useDocumentStore((s) => s.isDirty)
  const loadDocument = useDocumentStore((s) => s.loadDocument)
  const setDirty = useDocumentStore((s) => s.setDirty)
  const hasRestoredRef = useRef(false)

  // Restore on first mount
  useEffect(() => {
    if (hasRestoredRef.current) return
    hasRestoredRef.current = true

    try {
      const savedContent = localStorage.getItem(AUTO_SAVE_KEY)
      const savedFileName = localStorage.getItem(AUTO_SAVE_FILENAME_KEY)
      if (savedContent) {
        loadDocument(savedFileName || "Untitled", savedContent)
      }
    } catch (err) {
      console.error("Auto-save restoration failed:", err)
    }
  }, [loadDocument])

  // Auto-save when content changes (debounced)
  useEffect(() => {
    if (!isDirty) return

    const timer = setTimeout(() => {
      try {
        localStorage.setItem(AUTO_SAVE_KEY, content)
        localStorage.setItem(AUTO_SAVE_FILENAME_KEY, fileName)
        setDirty(false)
      } catch (err) {
        console.error("Auto-save failed (possibly quota exceeded):", err)
        // Keep isDirty as true so the user knows it's NOT saved
      }
    }, 1500) // Save after 1.5 seconds of inactivity

    return () => clearTimeout(timer)
  }, [content, fileName, isDirty, setDirty])
}

export function clearAutoSave() {
  try {
    localStorage.removeItem(AUTO_SAVE_KEY)
    localStorage.removeItem(AUTO_SAVE_FILENAME_KEY)
  } catch {
    // Ignore
  }
}
