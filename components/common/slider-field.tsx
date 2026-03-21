"use client"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface SliderFieldProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit?: string
  className?: string
}

export function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  className,
}: SliderFieldProps) {
  return (
    <div className={cn("group flex flex-col gap-2 p-1", className)}>
      <div className="flex items-start justify-between gap-1.5 min-w-0">
        <Label className="mt-0.5 min-w-[32px] shrink-0 text-[11px] font-bold text-foreground/80 uppercase tracking-tight">
          {label}
        </Label>
        <div className="flex shrink-0 items-center gap-1 overflow-hidden rounded bg-muted/60 border border-border/40 px-1.5 py-0.5 shadow-xs">
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              const num = parseFloat(e.target.value)
              if (!isNaN(num) && num >= min && num <= max) {
                onChange(num)
              }
            }}
            min={min}
            max={max}
            step={step}
            className="h-4 w-10 border-none bg-transparent p-0 text-right font-mono text-[10px] transition-colors focus-visible:ring-0"
          />
          {unit && (
            <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-70">{unit}</span>
          )}
        </div>
      </div>
      <div className="px-1">
        <Slider
          value={[value]}
          onValueChange={(val: number | readonly number[]) => onChange(Array.isArray(val) ? val[0] : val)}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  )
}
