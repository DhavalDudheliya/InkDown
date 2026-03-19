"use client"

import { useStyleStore } from "@/stores"
import { CollapsibleSection, ColorPicker, SliderField } from "@/components/common"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type {
  HeaderFooterConfig,
  HeaderFooterSlotContent,
  PageNumberFormat,
} from "@/types/style"

const SLOT_TYPES = [
  { value: "none", label: "None" },
  { value: "text", label: "Custom Text" },
  { value: "title", label: "Document Title" },
  { value: "date", label: "Current Date" },
  { value: "pageNumber", label: "Page Number" },
  { value: "totalPages", label: "Page X of Y" },
  { value: "logo", label: "Logo Image" },
]

export function HeaderFooterPanel() {
  const headerFooter = useStyleStore((s) => s.headerFooter)
  const setHeaderFooter = useStyleStore((s) => s.setHeaderFooter)

  const updateSection = (
    section: "header" | "footer",
    updates: Partial<HeaderFooterConfig>
  ) => {
    setHeaderFooter({
      [section]: { ...headerFooter[section], ...updates },
    })
  }

  const renderSlotConfig = (
    section: "header" | "footer",
    slot: "left" | "center" | "right",
    label: string
  ) => {
    const config = headerFooter[section][slot]
    
    return (
      <div className="flex flex-col gap-1.5 rounded-md border border-border p-2">
        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </Label>
        <Select
          value={config.type}
          onValueChange={(type) => {
            const nextType = type as HeaderFooterSlotContent["type"]
            let newObj: HeaderFooterSlotContent = { type: nextType } as HeaderFooterSlotContent
            if (nextType === "text") newObj = { type: "text", value: "" }
            if (nextType === "logo") newObj = { type: "logo", src: "" }
            updateSection(section, { [slot]: newObj })
          }}
        >
          <SelectTrigger className="h-6 text-xs px-2 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SLOT_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value} className="text-xs py-1 min-h-[24px]">
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {config.type === "text" && (
          <Input
            value={config.value}
            onChange={(e) => updateSection(section, {
              [slot]: { type: "text", value: e.target.value }
            })}
            placeholder="Text..."
            className="h-6 text-xs px-2 mt-1"
          />
        )}
        {config.type === "logo" && (
          <Input
            value={config.src}
            onChange={(e) => updateSection(section, {
              [slot]: { type: "logo", src: e.target.value }
            })}
            placeholder="Image URL..."
            className="h-6 text-xs px-2 mt-1"
          />
        )}
      </div>
    )
  }

  const renderSectionPanel = (section: "header" | "footer", title: string) => {
    const data = headerFooter[section]
    
    return (
      <div className="flex flex-col gap-3">
        <Label className="text-xs font-semibold">{title}</Label>
        
        <div className="grid grid-cols-1 gap-2">
          {renderSlotConfig(section, "left", "Left Slot")}
          {renderSlotConfig(section, "center", "Center Slot")}
          {renderSlotConfig(section, "right", "Right Slot")}
        </div>

        <div className="flex flex-col gap-2 rounded-md bg-muted/40 p-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Show Divider Line</Label>
            <Switch
              checked={data.dividerEnabled}
              onCheckedChange={(dividerEnabled) => updateSection(section, { dividerEnabled })}
            />
          </div>
          
          {data.dividerEnabled && (
            <>
              <div className="flex items-center justify-between">
                <Label className="text-[10px] text-muted-foreground">Color</Label>
                <ColorPicker
                  value={data.dividerColor}
                  onChange={(dividerColor) => updateSection(section, { dividerColor })}
                />
              </div>
              <SliderField
                label="Thickness"
                value={data.dividerThickness}
                onChange={(dividerThickness) => updateSection(section, { dividerThickness })}
                min={1}
                max={5}
                unit="px"
              />
            </>
          )}

          <div className="flex items-center justify-between mt-1 pt-2 border-t border-border">
            <Label className="text-xs">Show on First Page</Label>
            <Switch
              checked={data.showOnFirstPage}
              onCheckedChange={(showOnFirstPage) => updateSection(section, { showOnFirstPage })}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <CollapsibleSection title="Headers & Footers">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Label className="text-xs font-medium">Page Number Format</Label>
          <Select
            value={headerFooter.pageNumberFormat}
            onValueChange={(v) => setHeaderFooter({ pageNumberFormat: v as PageNumberFormat })}
          >
            <SelectTrigger className="h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="arabic">1, 2, 3</SelectItem>
              <SelectItem value="roman">i, ii, iii</SelectItem>
              <SelectItem value="alphabetical">a, b, c</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-px bg-border" />

        {renderSectionPanel("header", "Header settings")}
        
        <div className="h-px bg-border" />
        
        {renderSectionPanel("footer", "Footer settings")}
      </div>
    </CollapsibleSection>
  )
}
