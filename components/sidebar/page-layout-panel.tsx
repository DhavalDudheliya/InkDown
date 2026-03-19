"use client"

import { useStyleStore } from "@/stores"
import { CollapsibleSection, SliderField } from "@/components/common"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { MARGIN_PRESETS } from "@/constants/page-sizes"

import type { PageSize, Orientation, MarginPreset } from "@/types/style"

const PAGE_SIZES: { value: PageSize; label: string }[] = [
  { value: "a4", label: "A4 (210 × 297 mm)" },
  { value: "letter", label: "Letter (8.5 × 11 in)" },
  { value: "a5", label: "A5 (148 × 210 mm)" },
  { value: "legal", label: "Legal (8.5 × 14 in)" },
]

export function PageLayoutPanel() {
  const pageLayout = useStyleStore((s) => s.pageLayout)
  const setPageLayout = useStyleStore((s) => s.setPageLayout)

  const handleMarginPresetChange = (preset: MarginPreset) => {
    if (preset === "custom") {
      setPageLayout({ marginPreset: preset })
    } else {
      setPageLayout({
        marginPreset: preset,
        margins: { ...MARGIN_PRESETS[preset] },
      })
    }
  }

  const handleCustomMarginChange = (side: keyof typeof pageLayout.margins, value: string) => {
    const num = parseFloat(value) || 0
    setPageLayout({
      margins: { ...pageLayout.margins, [side]: num },
      marginPreset: "custom",
    })
  }

  return (
    <CollapsibleSection title="Page Layout">
      <div className="flex flex-col gap-4">
        {/* Size & Orientation */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label className="text-xs font-medium">Page Size</Label>
            <Select
              value={pageLayout.size}
              onValueChange={(v) => setPageLayout({ size: v as PageSize })}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZES.map((sz) => (
                  <SelectItem key={sz.value} value={sz.value}>
                    {sz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-xs font-medium">Orientation</Label>
            <div className="grid grid-cols-2 gap-1 rounded-md border border-input p-0.5">
              <button
                className={`flex h-6 items-center justify-center rounded-sm text-xs transition-colors ${
                  pageLayout.orientation === "portrait"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setPageLayout({ orientation: "portrait" })}
              >
                Portrait
              </button>
              <button
                className={`flex h-6 items-center justify-center rounded-sm text-xs transition-colors ${
                  pageLayout.orientation === "landscape"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setPageLayout({ orientation: "landscape" })}
              >
                Landscape
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Margins */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label className="text-xs font-medium">Margins</Label>
            <Select
              value={pageLayout.marginPreset}
              onValueChange={(v) => handleMarginPresetChange(v as MarginPreset)}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="narrow">Narrow</SelectItem>
                <SelectItem value="wide">Wide</SelectItem>
                <SelectItem value="custom">Custom...</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {pageLayout.marginPreset === "custom" && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              {(["top", "bottom", "left", "right"] as const).map((side) => (
                <div key={side} className="flex flex-col gap-1">
                  <Label className="text-[10px] text-muted-foreground capitalize">
                    {side} (mm)
                  </Label>
                  <Input
                    type="number"
                    value={pageLayout.margins[side]}
                    onChange={(e) => handleCustomMarginChange(side, e.target.value)}
                    className="h-7 text-xs"
                    min={0}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Content settings */}
        <div className="flex flex-col gap-3">
          <Label className="text-xs font-medium">Content Area</Label>
          <SliderField
            label="Max Width (0 = full)"
            value={pageLayout.maxContentWidth}
            onChange={(v) => setPageLayout({ maxContentWidth: v })}
            min={0}
            max={200}
            unit="mm"
          />
          
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Two Column Layout</Label>
            <Switch
              checked={pageLayout.twoColumn}
              onCheckedChange={(twoColumn) => setPageLayout({ twoColumn })}
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
