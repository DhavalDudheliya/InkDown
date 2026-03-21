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
import type { CalloutStyleTheme } from "@/types/style"

export function SpecialContentPanel() {
  const specialContent = useStyleStore((s) => s.specialContent)
  const setSpecialContent = useStyleStore((s) => s.setSpecialContent)

  const updateImages = (updates: Partial<typeof specialContent.images>) => {
    setSpecialContent({ images: { ...specialContent.images, ...updates } })
  }

  const updateCallouts = (updates: Partial<typeof specialContent.callouts>) => {
    setSpecialContent({ callouts: { ...specialContent.callouts, ...updates } })
  }

  return (
    <CollapsibleSection title="Images & Callouts">
      <div className="flex flex-col gap-3">
        
        {/* Images */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary/80">Images</Label>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <Label className="text-[11px] font-medium text-foreground/80 tracking-tight italic">Center Alignment</Label>
              <Switch
                checked={specialContent.images.centerAlignment}
                onCheckedChange={(centerAlignment) => updateImages({ centerAlignment })}
                className="scale-75 origin-right"
              />
            </div>
            <div className="flex items-center justify-between px-1">
              <Label className="text-[11px] font-medium text-foreground/80 tracking-tight italic">Drop Shadow</Label>
              <Switch
                checked={specialContent.images.shadow}
                onCheckedChange={(shadow) => updateImages({ shadow })}
                className="scale-75 origin-right"
              />
            </div>
            <div className="h-px bg-border/20 my-1" />
            <SliderField
              label="Corner Rounding"
              value={specialContent.images.borderRadius}
              onChange={(borderRadius) => updateImages({ borderRadius })}
              min={0}
              max={32}
              unit="px"
            />
          </div>
        </div>

        {/* Callouts */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary/80">Alerts & Callouts</Label>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 px-1">
              <Label className="text-[10px] font-semibold text-muted-foreground">
                Visual Theme
              </Label>
              <Select
                value={specialContent.callouts.theme}
                onValueChange={(v) => updateCallouts({ theme: v as CalloutStyleTheme })}
              >
                <SelectTrigger className="h-7 w-full text-xs bg-muted/50">
                  <SelectValue>
                    {specialContent.callouts.theme === "modern" ? "Modern (Soft)" : 
                     specialContent.callouts.theme === "classic" ? "Classic (Border)" : 
                     "Minimal (Text)"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern" className="text-xs">Modern (Soft)</SelectItem>
                  <SelectItem value="classic" className="text-xs">Classic (Border)</SelectItem>
                  <SelectItem value="minimal" className="text-xs">Minimal (Text)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-px bg-border/20 my-1" />
            
            <SliderField
              label="Text Size"
              value={specialContent.callouts.fontSize}
              onChange={(fontSize) => updateCallouts({ fontSize })}
              min={10}
              max={24}
              unit="px"
            />
          </div>
        </div>

      </div>
    </CollapsibleSection>
  )
}
