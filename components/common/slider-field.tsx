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
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <Label className="min-w-0 truncate text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </Label>
        <div className="flex shrink-0 items-center gap-1">
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
            className="h-6 w-14 px-1 text-right font-mono text-[10px]"
          />
          {unit && (
            <span className="text-[10px] text-muted-foreground shrink-0">{unit}</span>
          )}
        </div>
      </div>
      <div className="px-0.5 py-1">
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
