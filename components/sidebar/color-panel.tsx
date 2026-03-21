"use client"

import { useStyleStore } from "@/stores"
import { CollapsibleSection, ColorPicker } from "@/components/common"
import { Label } from "@/components/ui/label"

import type { HeadingLevel } from "@/types/style"

const HEADING_LEVELS: HeadingLevel[] = ["h1", "h2", "h3", "h4", "h5", "h6"]

interface ColorFieldProps {
  label: string
  value: string
  onChange: (color: string) => void
}

function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <ColorPicker value={value} onChange={onChange} />
    </div>
  )
}

export function ColorPanel() {
  const colors = useStyleStore((s) => s.colors)
  const setColor = useStyleStore((s) => s.setColor)
  const setHeadingColor = useStyleStore((s) => s.setHeadingColor)

  return (
    <CollapsibleSection title="Colors">
      <div className="flex flex-col gap-3">
        {/* Heading Colors Grid */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Heading Colors</Label>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1">
            {HEADING_LEVELS.map((level) => (
              <div key={level} className="flex flex-col gap-1.5 px-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{level}</span>
                <ColorPicker 
                  value={colors.headingColors[level]} 
                  onChange={(color) => setHeadingColor(level, color)} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Core Colors */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Global Text</Label>
          <div className="flex flex-col gap-2.5 pt-1">
            <ColorField
              label="Primary Body"
              value={colors.bodyTextColor}
              onChange={(c) => setColor("bodyTextColor", c)}
            />
            <ColorField
              label="Secondary / Muted"
              value={colors.secondaryTextColor}
              onChange={(c) => setColor("secondaryTextColor", c)}
            />
          </div>
        </div>

        {/* Elements */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Links & Quotes</Label>
          <div className="flex flex-col gap-2.5 pt-1">
            <ColorField
              label="Link Normal"
              value={colors.linkColor}
              onChange={(c) => setColor("linkColor", c)}
            />
            <ColorField
              label="Link Visited"
              value={colors.visitedLinkColor}
              onChange={(c) => setColor("visitedLinkColor", c)}
            />
            <div className="h-px bg-border/20 my-0.5" />
            <ColorField
              label="Quote Border"
              value={colors.blockquoteBorderColor}
              onChange={(c) => setColor("blockquoteBorderColor", c)}
            />
            <ColorField
              label="Quote Background"
              value={colors.blockquoteBackgroundColor}
              onChange={(c) => setColor("blockquoteBackgroundColor", c)}
            />
          </div>
        </div>

        {/* Components */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Interactive Components</Label>
          <div className="flex flex-col gap-2.5 pt-1">
            <div className="space-y-2">
              <span className="text-[10px] font-semibold text-muted-foreground">Tables</span>
              <ColorField
                label="Header BG"
                value={colors.tableHeaderBackground}
                onChange={(c) => setColor("tableHeaderBackground", c)}
              />
              <ColorField
                label="Header Text"
                value={colors.tableHeaderTextColor}
                onChange={(c) => setColor("tableHeaderTextColor", c)}
              />
              <ColorField
                label="Alt Row"
                value={colors.tableRowAlternateColor}
                onChange={(c) => setColor("tableRowAlternateColor", c)}
              />
            </div>
            
            <div className="h-px bg-border/20 my-0.5" />
            
            <div className="space-y-2">
              <span className="text-[10px] font-semibold text-muted-foreground">Code</span>
              <ColorField
                label="Code BG"
                value={colors.inlineCodeBackground}
                onChange={(c) => setColor("inlineCodeBackground", c)}
              />
              <ColorField
                label="Code Text"
                value={colors.inlineCodeTextColor}
                onChange={(c) => setColor("inlineCodeTextColor", c)}
              />
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Canvas</Label>
          <ColorField
            label="Page Background"
            value={colors.pageBackgroundColor}
            onChange={(c) => setColor("pageBackgroundColor", c)}
          />
        </div>
      </div>
    </CollapsibleSection>
  )
}
