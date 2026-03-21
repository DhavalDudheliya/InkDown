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
        {/* Visual appearance */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary/80">Visual Appearance</Label>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 px-1">
              <Label className="text-[10px] font-semibold text-muted-foreground">
                Syntax theme
              </Label>
              <Select
                value={codeBlock.theme}
                onValueChange={(v) => setCodeBlock({ theme: v as string })}
              >
                <SelectTrigger className="h-7 text-xs bg-muted/50 w-full">
                  <SelectValue>
                    {CODE_THEMES.find((t) => t.id === codeBlock.theme)?.displayName || codeBlock.theme}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {CODE_THEMES.map((t) => (
                    <SelectItem key={t.id} value={t.id} className="text-xs">
                      {t.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="h-px bg-border/20 my-1" />

            {/* Font family */}
            <div className="flex flex-col gap-1.5 px-1">
              <Label className="text-[10px] font-semibold text-muted-foreground">Font family</Label>
              <FontPicker
                value={codeBlock.fontFamily}
                onChange={(fontFamily) => setCodeBlock({ fontFamily })}
              />
            </div>

            <SliderField
              label="Text Size"
              value={codeBlock.fontSize}
              onChange={(fontSize) => setCodeBlock({ fontSize })}
              min={10}
              max={24}
              unit="px"
            />
          </div>
        </div>

        {/* Layout & Spacing */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary/80">Layout & Spacing</Label>
          <div className="flex flex-col gap-3">
            <SliderField
              label="Container Padding"
              value={codeBlock.padding}
              onChange={(padding) => setCodeBlock({ padding })}
              min={8}
              max={48}
              unit="px"
            />

            <SliderField
              label="Corner Weight"
              value={codeBlock.borderRadius}
              onChange={(borderRadius) => setCodeBlock({ borderRadius })}
              min={0}
              max={24}
              unit="px"
            />
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary/80">Features</Label>
          <div className="flex flex-col gap-3 pt-1">
            <ToggleRow
              label="show line numbers"
              checked={codeBlock.lineNumbers}
              onChange={(lineNumbers) => setCodeBlock({ lineNumbers })}
            />
            <ToggleRow
              label="language badge"
              checked={codeBlock.languageBadge}
              onChange={(languageBadge) => setCodeBlock({ languageBadge })}
            />
            <ToggleRow
              label="wrap long lines"
              checked={codeBlock.wordWrap}
              onChange={(wordWrap) => setCodeBlock({ wordWrap })}
            />
            <ToggleRow
              label="container border"
              checked={codeBlock.border}
              onChange={(border) => setCodeBlock({ border })}
            />
            <ToggleRow
              label="show file name"
              checked={codeBlock.fileNameLabel}
              onChange={(fileNameLabel) => setCodeBlock({ fileNameLabel })}
            />
          </div>
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
    <div className="flex items-center justify-between px-1">
      <Label className="text-[11px] font-medium text-foreground/80 tracking-tight italic">{label}</Label>
      <Switch 
        checked={checked} 
        onCheckedChange={onChange} 
        className="scale-75 origin-right"
      />
    </div>
  )
}
