"use client"

import { useStyleStore } from "@/stores"
import { CollapsibleSection } from "@/components/common"
import { FontPicker, SliderField } from "@/components/common"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
            <div key={role} className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
              <Label className="mb-1 text-[11px] font-bold uppercase tracking-wider text-primary/80">{label} Font</Label>
              <FontPicker
                value={font.family}
                onChange={(family) => setFont(role, { family })}
              />
              <div className="flex flex-col gap-1">
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
                <SliderField
                  label="Letter Gap"
                  value={font.letterSpacing}
                  onChange={(letterSpacing) =>
                    setFont(role, { letterSpacing })
                  }
                  min={-0.1}
                  max={0.3}
                  step={0.01}
                  unit="em"
                />
                <div className="flex flex-col gap-1.5 p-1 w-full">
                  <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-tight">
                    Font Weight
                  </Label>
                  <Select
                    value={String(font.weight)}
                    onValueChange={(v) =>
                      setFont(role, { weight: Number(v) })
                    }
                  >
                    <SelectTrigger className="h-7 w-full text-[10px] bg-muted/50 px-2 justify-between">
                      <SelectValue>
                        {FONT_WEIGHTS.find(w => w.value === font.weight)?.label || font.weight}
                      </SelectValue>
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
        <div className="flex flex-col gap-3 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Heading Sizes</Label>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1">
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

        {/* Body text settings */}
        <div className="flex flex-col gap-3 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Body Layout</Label>
          <SliderField
            label="Para Spacing"
            value={bodyText.paragraphSpacing}
            onChange={(paragraphSpacing) =>
              setBodyText({ paragraphSpacing })
            }
            min={0}
            max={32}
            unit="px"
          />
          <div className="flex flex-col gap-3 pt-1">
            <div className="flex flex-col gap-1.5 px-1">
              <Label className="text-[10px] font-semibold text-muted-foreground">
                Text Alignment
              </Label>
              <Select
                value={bodyText.textAlignment}
                onValueChange={(v) =>
                  setBodyText({
                    textAlignment: v as "left" | "justify",
                  })
                }
              >
                <SelectTrigger className="h-7 w-full text-[10px] bg-muted/60 border-border/40">
                  <SelectValue>
                    {bodyText.textAlignment === "left" ? "Left Align" : "Justify Text"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left" className="text-xs">Left Align</SelectItem>
                  <SelectItem value="justify" className="text-xs">Justify Text</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-px bg-border/20 my-1 mx-1" />

            <label className="flex items-center justify-between px-1 cursor-pointer select-none group">
              <span className="text-[11px] font-medium text-foreground/80 italic tracking-tight">Indent first line</span>
              <Checkbox
                checked={bodyText.firstLineIndent}
                onCheckedChange={(checked) =>
                  setBodyText({ firstLineIndent: checked as boolean })
                }
              />
            </label>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
