"use client"

import { useCallback, useEffect, useState } from "react"
import { HexColorPicker } from "react-colorful"

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

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && (
        <Label className="min-w-0 shrink-0 text-xs text-muted-foreground">
          {label}
        </Label>
      )}
      <Popover>
        <PopoverTrigger
          className="h-7 w-7 shrink-0 cursor-pointer rounded-md border border-border/60 shadow-xs transition-all hover:ring-2 hover:ring-primary/20 hover:scale-105"
          style={{ backgroundColor: value }}
          aria-label={`Color: ${value}`}
        />
        <PopoverContent className="w-[200px] p-2.5 bg-card/98 border-border/50 shadow-xl backdrop-blur-sm" align="start">
          <div className="flex flex-col gap-3">
            {/* Direct color picker */}
            <div className="custom-color-picker overflow-hidden rounded-lg">
              <HexColorPicker 
                color={localValue} 
                onChange={onChange}
                style={{ width: '100%', height: '140px' }}
              />
            </div>

            {/* Hex input */}
            <div className="flex items-center gap-1.5 px-0.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-50 tracking-widest pt-0.5">Hex</span>
              <Input
                value={localValue}
                onChange={(e) => handleHexChange(e.target.value)}
                className="h-7 font-mono text-xs bg-muted/30 border-border/40 text-center"
                placeholder="#000000"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <span className="font-mono text-[10px] text-muted-foreground/80 tracking-tight">
        {value}
      </span>
    </div>
  )
}
