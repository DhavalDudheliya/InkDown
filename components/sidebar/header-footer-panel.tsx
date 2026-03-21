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
      <div className="flex flex-col gap-1.5 rounded-lg border border-border/40 bg-muted/30 p-2.5">
        <div className="flex items-center justify-between gap-2">
          <Label className="text-[10px] font-bold text-primary/70 uppercase tracking-wider">
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
            <SelectTrigger className="h-6 w-32 text-[10px] bg-background">
              <SelectValue>
                {SLOT_TYPES.find(t => t.value === config.type)?.label || config.type}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {SLOT_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value} className="text-[10px] py-1">
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {config.type === "text" && (
          <Input
            value={config.value}
            onChange={(e) => updateSection(section, {
              [slot]: { type: "text", value: e.target.value }
            })}
            placeholder="Type text..."
            className="h-6 text-[10px] px-2 bg-background border-border/50"
          />
        )}
        {config.type === "logo" && (
          <Input
            value={config.src}
            onChange={(e) => updateSection(section, {
              [slot]: { type: "logo", src: e.target.value }
            })}
            placeholder="Image URL..."
            className="h-6 text-[10px] px-2 bg-background border-border/50"
          />
        )}
      </div>
    )
  }

  const renderSectionPanel = (section: "header" | "footer", title: string) => {
    const data = headerFooter[section]
    
    return (
      <div className="flex flex-col gap-2 rounded-xl border border-border/40 bg-muted/10 p-3">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-primary/80 mb-1">{title}</Label>
        
        <div className="flex flex-col gap-2 mb-2">
          {renderSlotConfig(section, "left", "left")}
          {renderSlotConfig(section, "center", "center")}
          {renderSlotConfig(section, "right", "right")}
        </div>

        <div className="flex flex-col gap-2.5 rounded-lg border border-border/30 bg-muted/20 p-2.5">
          <div className="flex items-center justify-between px-1">
            <Label className="text-[11px] font-medium text-foreground/80 italic">Show Page Divider</Label>
            <Switch
              checked={data.dividerEnabled}
              onCheckedChange={(dividerEnabled) => updateSection(section, { dividerEnabled })}
              className="scale-75 origin-right"
            />
          </div>
          
          {data.dividerEnabled && (
            <div className="flex flex-col gap-2 pl-1 border-l border-primary/20 ml-1">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-semibold text-muted-foreground">Line Color</Label>
                <ColorPicker
                  value={data.dividerColor}
                  onChange={(dividerColor) => updateSection(section, { dividerColor })}
                />
              </div>
              <SliderField
                label="Weight"
                value={data.dividerThickness}
                onChange={(dividerThickness) => updateSection(section, { dividerThickness })}
                min={1}
                max={5}
                unit="px"
              />
            </div>
          )}

          <div className="h-px bg-border/20 my-0.5" />

          <div className="flex items-center justify-between px-1">
            <Label className="text-[11px] font-medium text-foreground/80 italic">Visible on Page 1</Label>
            <Switch
              checked={data.showOnFirstPage}
              onCheckedChange={(showOnFirstPage) => updateSection(section, { showOnFirstPage })}
              className="scale-75 origin-right"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <CollapsibleSection title="Headers & Footers">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Global Settings</Label>
          <div className="flex flex-col gap-1.5 pt-1">
            <Label className="text-[10px] font-semibold text-muted-foreground">Page number format</Label>
            <Select
              value={headerFooter.pageNumberFormat}
              onValueChange={(v) => setHeaderFooter({ pageNumberFormat: v as PageNumberFormat })}
            >
              <SelectTrigger className="h-7 text-xs bg-muted/50 w-full">
                <SelectValue>
                  {headerFooter.pageNumberFormat === "arabic" ? "Arabic (1, 2, 3)" : 
                   headerFooter.pageNumberFormat === "roman" ? "Roman (i, ii, iii)" : 
                   "Alpha (a, b, c)"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arabic" className="text-xs">Arabic (1, 2, 3)</SelectItem>
                <SelectItem value="roman" className="text-xs">Roman (i, ii, iii)</SelectItem>
                <SelectItem value="alphabetical" className="text-xs">Alpha (a, b, c)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {renderSectionPanel("header", "Header layout")}
        {renderSectionPanel("footer", "Footer layout")}
      </div>
    </CollapsibleSection>
  )
}
