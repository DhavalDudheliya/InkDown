"use client"

import { Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ExportButtonProps {
  onClick?: () => void
  className?: string
}

export function ExportButton({ onClick, className }: ExportButtonProps) {
  return (
    <Button
      size="sm"
      className={cn("gap-1.5", className)}
      onClick={onClick}
    >
      <Download className="h-3.5 w-3.5" />
      Export PDF
    </Button>
  )
}
