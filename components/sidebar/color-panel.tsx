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
      <div className="flex flex-col gap-4">
        {/* Headings */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-medium">Heading Colors</Label>
          {HEADING_LEVELS.map((level) => (
            <ColorField
              key={level}
              label={level.toUpperCase()}
              value={colors.headingColors[level]}
              onChange={(color) => setHeadingColor(level, color)}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Text */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-medium">Text</Label>
          <ColorField
            label="Body Text"
            value={colors.bodyTextColor}
            onChange={(c) => setColor("bodyTextColor", c)}
          />
          <ColorField
            label="Secondary Text"
            value={colors.secondaryTextColor}
            onChange={(c) => setColor("secondaryTextColor", c)}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Links */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-medium">Links</Label>
          <ColorField
            label="Link"
            value={colors.linkColor}
            onChange={(c) => setColor("linkColor", c)}
          />
          <ColorField
            label="Visited Link"
            value={colors.visitedLinkColor}
            onChange={(c) => setColor("visitedLinkColor", c)}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Blockquotes */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-medium">Blockquotes</Label>
          <ColorField
            label="Border"
            value={colors.blockquoteBorderColor}
            onChange={(c) => setColor("blockquoteBorderColor", c)}
          />
          <ColorField
            label="Background"
            value={colors.blockquoteBackgroundColor}
            onChange={(c) => setColor("blockquoteBackgroundColor", c)}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Tables */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-medium">Tables</Label>
          <ColorField
            label="Header Background"
            value={colors.tableHeaderBackground}
            onChange={(c) => setColor("tableHeaderBackground", c)}
          />
          <ColorField
            label="Header Text"
            value={colors.tableHeaderTextColor}
            onChange={(c) => setColor("tableHeaderTextColor", c)}
          />
          <ColorField
            label="Alternate Row"
            value={colors.tableRowAlternateColor}
            onChange={(c) => setColor("tableRowAlternateColor", c)}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Code */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-medium">Inline Code</Label>
          <ColorField
            label="Background"
            value={colors.inlineCodeBackground}
            onChange={(c) => setColor("inlineCodeBackground", c)}
          />
          <ColorField
            label="Text"
            value={colors.inlineCodeTextColor}
            onChange={(c) => setColor("inlineCodeTextColor", c)}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Page */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-medium">Page</Label>
          <ColorField
            label="Background"
            value={colors.pageBackgroundColor}
            onChange={(c) => setColor("pageBackgroundColor", c)}
          />
        </div>
      </div>
    </CollapsibleSection>
  )
}
