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
      <div className="flex flex-col gap-6">
        
        {/* Images */}
        <div className="flex flex-col gap-3">
          <Label className="text-xs font-semibold">Images</Label>
          <div className="flex flex-col gap-2 rounded-md bg-muted/40 p-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Center Alignment</Label>
              <Switch
                checked={specialContent.images.centerAlignment}
                onCheckedChange={(centerAlignment) => updateImages({ centerAlignment })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Drop Shadow</Label>
              <Switch
                checked={specialContent.images.shadow}
                onCheckedChange={(shadow) => updateImages({ shadow })}
              />
            </div>
            <SliderField
              label="Border Radius"
              value={specialContent.images.borderRadius}
              onChange={(borderRadius) => updateImages({ borderRadius })}
              min={0}
              max={32}
              unit="px"
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Callouts */}
        <div className="flex flex-col gap-3">
          <Label className="text-xs font-semibold">Callouts (Alerts)</Label>
          <div className="flex flex-col gap-2 rounded-md bg-muted/40 p-2">
            <div className="flex flex-col gap-1">
              <Label className="text-[10px] text-muted-foreground uppercase">
                Visual Style
              </Label>
              <Select
                value={specialContent.callouts.theme}
                onValueChange={(v) => updateCallouts({ theme: v as CalloutStyleTheme })}
              >
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern (Soft background)</SelectItem>
                  <SelectItem value="classic">Classic (Left border only)</SelectItem>
                  <SelectItem value="minimal">Minimal (Icon and text)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <SliderField
              label="Font Size"
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
