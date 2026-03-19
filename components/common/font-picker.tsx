"use client"

import { useMemo, useState } from "react"

import { GOOGLE_FONTS } from "@/constants/fonts"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FontPickerProps {
  label?: string
  value: string
  onChange: (fontName: string) => void
  category?: "sans-serif" | "serif" | "monospace" | "display" | "handwriting"
  className?: string
}

export function FontPicker({
  label,
  value,
  onChange,
  category,
  className,
}: FontPickerProps) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const filteredFonts = useMemo(() => {
    let fonts = GOOGLE_FONTS
    if (category) {
      fonts = fonts.filter((f) => f.category === category)
    }
    if (search) {
      const lower = search.toLowerCase()
      fonts = fonts.filter((f) => f.name.toLowerCase().includes(lower))
    }
    return fonts
  }, [category, search])

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label className="text-xs text-muted-foreground">{label}</Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm shadow-sm transition-colors hover:bg-accent"
          style={{ fontFamily: value }}
        >
          <span className="truncate">{value}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="ml-2 shrink-0 opacity-50"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="start">
          <div className="border-b p-2">
            <Input
              placeholder="Search fonts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
          <ScrollArea className="h-64">
            <div className="p-1">
              {filteredFonts.map((font) => (
                <button
                  key={font.name}
                  className={cn(
                    "flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent",
                    value === font.name && "bg-accent font-medium"
                  )}
                  style={{ fontFamily: font.name }}
                  onClick={() => {
                    onChange(font.name)
                    setOpen(false)
                  }}
                >
                  <span className="truncate">{font.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {font.category}
                  </span>
                </button>
              ))}
              {filteredFonts.length === 0 && (
                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                  No fonts found
                </div>
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}
