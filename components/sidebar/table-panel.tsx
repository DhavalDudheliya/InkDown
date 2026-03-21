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
import type { TableBorderStyle } from "@/types/style"

export function TablePanel() {
  const tableConfig = useStyleStore((s) => s.tableConfig)
  const setTableConfig = useStyleStore((s) => s.setTableConfig)

  const update = (updates: Partial<typeof tableConfig>) => {
    setTableConfig(updates)
  }

  return (
    <CollapsibleSection title="Tables">
      <div className="flex flex-col gap-3">
        
        {/* Style */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary/80">Table Style</Label>
          <div className="flex flex-col gap-3">
            
            <div className="flex flex-col gap-1.5 px-1">
              <Label className="text-[10px] font-semibold text-muted-foreground">
                Border Design
              </Label>
              <Select
                value={tableConfig.borderStyle}
                onValueChange={(v) => update({ borderStyle: v as TableBorderStyle })}
              >
                <SelectTrigger className="h-7 text-xs bg-muted/50 w-full">
                  <SelectValue>
                    {tableConfig.borderStyle === "none" ? "None" : 
                     tableConfig.borderStyle === "horizontal" ? "Horizontal Lines" : 
                     "Full Grid"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" className="text-xs">None</SelectItem>
                  <SelectItem value="horizontal" className="text-xs">Horizontal Lines</SelectItem>
                  <SelectItem value="grid" className="text-xs">Full Grid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-px bg-border/20 my-1" />

            <div className="flex items-center justify-between px-1">
              <Label className="text-[11px] font-medium text-foreground/80 tracking-tight italic">Bold Header Text</Label>
              <Switch
                checked={tableConfig.headerBold}
                onCheckedChange={(headerBold) => update({ headerBold })}
                className="scale-75 origin-right"
              />
            </div>
            
            <div className="flex items-center justify-between px-1">
              <Label className="text-[11px] font-medium text-foreground/80 tracking-tight italic">Striped Alternate Rows</Label>
              <Switch
                checked={tableConfig.stripedRows}
                onCheckedChange={(stripedRows) => update({ stripedRows })}
                className="scale-75 origin-right"
              />
            </div>

            <div className="h-px bg-border/20 my-1" />

            <SliderField
              label="Cell Spacing"
              value={tableConfig.cellPadding}
              onChange={(cellPadding) => update({ cellPadding })}
              min={0}
              max={24}
              unit="px"
            />
          </div>
        </div>

      </div>
    </CollapsibleSection>
  )
}
