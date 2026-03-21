"use client"

import { useStyleStore } from "@/stores"
import { CollapsibleSection } from "@/components/common"
import { FontPicker, SliderField } from "@/components/common"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { FontRole, HeadingLevel } from "@/types/style"

const FONT_ROLES: { role: FontRole; label: string }[] = [
  { role: "body", label: "Body" },
  { role: "heading", label: "Headings" },
  { role: "monospace", label: "Monospace" },
]

const HEADING_LEVELS: { level: HeadingLevel; label: string }[] = [
  { level: "h1", label: "H1" },
  { level: "h2", label: "H2" },
  { level: "h3", label: "H3" },
  { level: "h4", label: "H4" },
  { level: "h5", label: "H5" },
  { level: "h6", label: "H6" },
]

const FONT_WEIGHTS = [
  { value: 300, label: "Light" },
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "Semibold" },
  { value: 700, label: "Bold" },
  { value: 800, label: "Extra Bold" },
]

export function TypographyPanel() {
  const fonts = useStyleStore((s) => s.fonts)
  const headings = useStyleStore((s) => s.headings)
  const bodyText = useStyleStore((s) => s.bodyText)
  const setFont = useStyleStore((s) => s.setFont)
  const setHeading = useStyleStore((s) => s.setHeading)
  const setBodyText = useStyleStore((s) => s.setBodyText)

  return (
    <CollapsibleSection title="Typography" defaultOpen>
      <div className="flex flex-col gap-4">
        {/* Font roles */}
        {FONT_ROLES.map(({ role, label }) => {
          const font = fonts[role]
          return (
            <div key={role} className="flex flex-col gap-3 pb-2">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label} Font</Label>
              <FontPicker
                value={font.family}
                onChange={(family) => setFont(role, { family })}
              />
              <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                <SliderField
                  label="Size"
                  value={font.size}
                  onChange={(size) => setFont(role, { size })}
                  min={8}
                  max={32}
                  unit="px"
                />
                <SliderField
                  label="Line Height"
                  value={font.lineHeight}
                  onChange={(lineHeight) => setFont(role, { lineHeight })}
                  min={1}
                  max={3}
                  step={0.1}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                <SliderField
                  label="Letter Spacing"
                  value={font.letterSpacing}
                  onChange={(letterSpacing) =>
                    setFont(role, { letterSpacing })
                  }
                  min={-0.1}
                  max={0.3}
                  step={0.01}
                  unit="em"
                />
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    Weight
                  </Label>
                  <Select
                    value={String(font.weight)}
                    onValueChange={(v) =>
                      setFont(role, { weight: Number(v) })
                    }
                  >
                    <SelectTrigger className="h-6 w-full text-[10px] font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_WEIGHTS.map((w) => (
                        <SelectItem key={w.value} value={String(w.value)} className="text-xs">
                          {w.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )
        })}

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Heading overrides */}
        <div className="flex flex-col gap-3">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Heading Sizes</Label>
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            {HEADING_LEVELS.map(({ level, label }) => (
              <SliderField
                key={level}
                label={label}
                value={headings[level].fontSize}
                onChange={(fontSize) => setHeading(level, { fontSize })}
                min={12}
                max={64}
                unit="px"
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Body text settings */}
        <div className="flex flex-col gap-3">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Body Text</Label>
          <SliderField
            label="Paragraph Spacing"
            value={bodyText.paragraphSpacing}
            onChange={(paragraphSpacing) =>
              setBodyText({ paragraphSpacing })
            }
            min={0}
            max={32}
            unit="px"
          />
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-muted-foreground">
                Alignment
              </Label>
              <Select
                value={bodyText.textAlignment}
                onValueChange={(v) =>
                  setBodyText({
                    textAlignment: v as "left" | "justify",
                  })
                }
              >
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="justify">Justify</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2 pb-0.5">
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={bodyText.firstLineIndent}
                  onChange={(e) =>
                    setBodyText({ firstLineIndent: e.target.checked })
                  }
                  className="rounded"
                />
                First line indent
              </label>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
