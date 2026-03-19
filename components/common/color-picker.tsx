"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ColorPickerProps {
  label?: string
  value: string
  onChange: (color: string) => void
  className?: string
}

export function ColorPicker({
  label,
  value,
  onChange,
  className,
}: ColorPickerProps) {
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleHexChange = useCallback(
    (hex: string) => {
      setLocalValue(hex)
      if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
        onChange(hex)
      }
    },
    [onChange]
  )

  const handleNativeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const hex = e.target.value
      setLocalValue(hex)
      onChange(hex)
    },
    [onChange]
  )

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && (
        <Label className="min-w-0 shrink-0 text-xs text-muted-foreground">
          {label}
        </Label>
      )}
      <Popover>
        <PopoverTrigger
          className="h-7 w-7 shrink-0 cursor-pointer rounded-md border border-border shadow-sm transition-shadow hover:shadow-md"
          style={{ backgroundColor: value }}
          aria-label={`Color: ${value}`}
        />
        <PopoverContent className="w-56 p-3" align="start">
          <div className="flex flex-col gap-3">
            {/* Native color picker */}
            <input
              ref={inputRef}
              type="color"
              value={localValue}
              onChange={handleNativeChange}
              className="h-32 w-full cursor-pointer rounded-md border-0"
            />

            {/* Hex input */}
            <div className="flex items-center gap-2">
              <Label className="text-xs">Hex</Label>
              <Input
                value={localValue}
                onChange={(e) => handleHexChange(e.target.value)}
                className="h-7 font-mono text-xs"
                placeholder="#000000"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <span className="font-mono text-xs text-muted-foreground">
        {value}
      </span>
    </div>
  )
}
