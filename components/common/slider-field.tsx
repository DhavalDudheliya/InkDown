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
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <div className="flex items-center gap-1">
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
            className="h-6 w-16 px-1.5 text-right font-mono text-xs"
          />
          {unit && (
            <span className="text-xs text-muted-foreground">{unit}</span>
          )}
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(val: number | readonly number[]) => onChange(Array.isArray(val) ? val[0] : val)}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}
