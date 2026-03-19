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
    } catch {
      // localStorage may be unavailable
    }
  }, [loadDocument])

  // Auto-save on interval
  useEffect(() => {
    if (!isDirty) return

    const timer = setInterval(() => {
      try {
        localStorage.setItem(AUTO_SAVE_KEY, content)
        localStorage.setItem(AUTO_SAVE_FILENAME_KEY, fileName)
      } catch {
        // localStorage may be full or unavailable
      }
    }, AUTO_SAVE_INTERVAL)

    return () => clearInterval(timer)
  }, [content, fileName, isDirty])
}

export function clearAutoSave() {
  try {
    localStorage.removeItem(AUTO_SAVE_KEY)
    localStorage.removeItem(AUTO_SAVE_FILENAME_KEY)
  } catch {
    // Ignore
  }
}
