"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Pencil, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { useDocumentStore } from "@/stores"
import { Input } from "@/components/ui/input"

interface FileNameInputProps {
  className?: string
}

export function FileNameInput({ className }: FileNameInputProps) {
  const fileName = useDocumentStore((s) => s.fileName)
  const setFileName = useDocumentStore((s) => s.setFileName)
  const isDirty = useDocumentStore((s) => s.isDirty)
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(fileName)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalValue(fileName)
  }, [fileName])

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const handleSubmit = useCallback(() => {
    const trimmed = localValue.trim()
    if (trimmed) {
      setFileName(trimmed)
    } else {
      setLocalValue(fileName)
    }
    setIsEditing(false)
  }, [localValue, fileName, setFileName])

  if (isEditing) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <Input
          ref={inputRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit()
            if (e.key === "Escape") {
              setLocalValue(fileName)
              setIsEditing(false)
            }
          }}
          className="h-7 w-48 px-2 text-sm"
        />
        <button
          className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground"
          onClick={handleSubmit}
        >
          <Check className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }

  return (
    <button
      className={cn(
        "group flex items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted",
        className
      )}
      onClick={() => setIsEditing(true)}
    >
      <span className="max-w-48 truncate font-medium">{fileName}</span>
      {isDirty && (
        <span className="h-1.5 w-1.5 rounded-full bg-primary" title="Unsaved changes" />
      )}
      <Pencil className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  )
}
