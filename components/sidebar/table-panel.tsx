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
      <div className="flex flex-col gap-6">
        
        {/* Style */}
        <div className="flex flex-col gap-3">
          <Label className="text-xs font-semibold">Appearance</Label>
          <div className="flex flex-col gap-2 rounded-md bg-muted/40 p-2">
            
            <div className="flex flex-col gap-1">
              <Label className="text-[10px] text-muted-foreground uppercase">
                Border Style
              </Label>
              <Select
                value={tableConfig.borderStyle}
                onValueChange={(v) => update({ borderStyle: v as TableBorderStyle })}
              >
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="horizontal">Horizontal Lines</SelectItem>
                  <SelectItem value="grid">Full Grid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-2" />

            <div className="flex items-center justify-between">
              <Label className="text-xs">Bold Header</Label>
              <Switch
                checked={tableConfig.headerBold}
                onCheckedChange={(headerBold) => update({ headerBold })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-xs">Striped Rows</Label>
              <Switch
                checked={tableConfig.stripedRows}
                onCheckedChange={(stripedRows) => update({ stripedRows })}
              />
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="flex flex-col gap-3">
          <Label className="text-xs font-semibold">Spacing</Label>
          <div className="flex flex-col gap-2 rounded-md bg-muted/40 p-2">
            <SliderField
              label="Cell Padding"
              value={tableConfig.cellPadding}
              onChange={(cellPadding) => update({ cellPadding })}
              min={0}
              max={32}
              unit="px"
            />
          </div>
        </div>

      </div>
    </CollapsibleSection>
  )
}
