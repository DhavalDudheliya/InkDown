"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer group/checkbox relative flex size-4.5 items-center justify-center rounded border border-border/50 bg-muted/60 transition-all outline-none after:absolute after:-inset-4 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-checked:bg-primary data-checked:border-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 dark:data-unchecked:bg-muted/40",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="pointer-events-none flex items-center justify-center text-primary-foreground transition-transform data-unchecked:scale-50 data-unchecked:opacity-0 data-checked:scale-100 data-checked:opacity-100"
      >
        <Check className="size-3 stroke-[3.5]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
