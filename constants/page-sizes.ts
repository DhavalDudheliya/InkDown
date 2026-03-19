import type { PageSize } from "@/types/style"

export interface PageDimensions {
  width: number // mm
  height: number // mm
  displayName: string
}

export const PAGE_SIZES: Record<PageSize, PageDimensions> = {
  a4: { width: 210, height: 297, displayName: "A4" },
  letter: { width: 215.9, height: 279.4, displayName: "US Letter" },
  a5: { width: 148, height: 210, displayName: "A5" },
  legal: { width: 215.9, height: 355.6, displayName: "Legal" },
}

export const MARGIN_PRESETS = {
  narrow: { top: 12.7, right: 12.7, bottom: 12.7, left: 12.7 },
  normal: { top: 25.4, right: 25.4, bottom: 25.4, left: 25.4 },
  wide: { top: 25.4, right: 50.8, bottom: 25.4, left: 50.8 },
} as const
