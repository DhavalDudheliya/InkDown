"use client"

import { useStyleStore } from "@/stores"
import { CollapsibleSection, SliderField, FontPicker } from "@/components/common"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CODE_THEMES } from "@/constants/code-themes"

export function CodeBlockPanel() {
  const codeBlock = useStyleStore((s) => s.codeBlock)
  const setCodeBlock = useStyleStore((s) => s.setCodeBlock)

  return (
    <CollapsibleSection title="Code Blocks">
      <div className="flex flex-col gap-3">
        {/* Theme selector */}
        <div className="flex flex-col gap-1">
          <Label className="text-xs font-medium">Theme</Label>
          <Select
            value={codeBlock.theme}
            onValueChange={(v) => setCodeBlock({ theme: v as string })}
          >
            <SelectTrigger className="text-xs w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CODE_THEMES.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Font family */}
        <div className="flex flex-col gap-1">
          <Label className="text-xs font-medium">Font Family</Label>
          <FontPicker
            value={codeBlock.fontFamily}
            onChange={(fontFamily) => setCodeBlock({ fontFamily })}
          />
        </div>

        {/* Font size */}
        <SliderField
          label="Font Size"
          value={codeBlock.fontSize}
          onChange={(fontSize) => setCodeBlock({ fontSize })}
          min={10}
          max={24}
          unit="px"
        />

        {/* Padding */}
        <SliderField
          label="Padding"
          value={codeBlock.padding}
          onChange={(padding) => setCodeBlock({ padding })}
          min={8}
          max={48}
          unit="px"
        />

        {/* Border radius */}
        <SliderField
          label="Border Radius"
          value={codeBlock.borderRadius}
          onChange={(borderRadius) => setCodeBlock({ borderRadius })}
          min={0}
          max={24}
          unit="px"
        />

        {/* Toggles */}
        <div className="flex flex-col gap-2">
          <ToggleRow
            label="Line Numbers"
            checked={codeBlock.lineNumbers}
            onChange={(lineNumbers) => setCodeBlock({ lineNumbers })}
          />
          <ToggleRow
            label="Language Badge"
            checked={codeBlock.languageBadge}
            onChange={(languageBadge) => setCodeBlock({ languageBadge })}
          />
          <ToggleRow
            label="Word Wrap"
            checked={codeBlock.wordWrap}
            onChange={(wordWrap) => setCodeBlock({ wordWrap })}
          />
          <ToggleRow
            label="Border"
            checked={codeBlock.border}
            onChange={(border) => setCodeBlock({ border })}
          />
          <ToggleRow
            label="File Name Label"
            checked={codeBlock.fileNameLabel}
            onChange={(fileNameLabel) => setCodeBlock({ fileNameLabel })}
          />
        </div>
      </div>
    </CollapsibleSection>
  )
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
