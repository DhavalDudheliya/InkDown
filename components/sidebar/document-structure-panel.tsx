"use client"

import { useStyleStore } from "@/stores"
import { CollapsibleSection, SliderField } from "@/components/common"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

export function DocumentStructurePanel() {
  const docStruct = useStyleStore((s) => s.documentStructure)
  const setDocStruct = useStyleStore((s) => s.setDocumentStructure)

  return (
    <CollapsibleSection title="Document Structure">
      <div className="flex flex-col gap-3">
        {/* Cover Page */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <div className="flex items-center justify-between mb-1 px-1">
            <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Cover Page</Label>
            <Switch
              checked={docStruct.coverPage.enabled}
              onCheckedChange={(enabled) =>
                setDocStruct({
                  coverPage: { ...docStruct.coverPage, enabled },
                })
              }
              className="scale-75 origin-right"
            />
          </div>

          {docStruct.coverPage.enabled && (
            <div className="flex flex-col gap-3 pt-2">
              <div className="grid grid-cols-1 gap-2.5">
                <div className="flex flex-col gap-1 px-1">
                  <Label className="text-[10px] font-semibold text-muted-foreground">
                    Main Title
                  </Label>
                  <Input
                    value={docStruct.coverPage.title}
                    onChange={(e) =>
                      setDocStruct({
                        coverPage: { ...docStruct.coverPage, title: e.target.value },
                      })
                    }
                    placeholder="Enter title..."
                    className="h-7 text-[10px] bg-background border-border/50 px-2"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <Label className="text-[10px] font-semibold text-muted-foreground">
                    Subtitle
                  </Label>
                  <Input
                    value={docStruct.coverPage.subtitle}
                    onChange={(e) =>
                      setDocStruct({
                        coverPage: { ...docStruct.coverPage, subtitle: e.target.value },
                      })
                    }
                    placeholder="Subtitle or description..."
                    className="h-7 text-[10px] bg-background border-border/50 px-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1 px-1">
                    <Label className="text-[10px] font-semibold text-muted-foreground">
                      Author
                    </Label>
                    <Input
                      value={docStruct.coverPage.author}
                      onChange={(e) =>
                        setDocStruct({
                          coverPage: { ...docStruct.coverPage, author: e.target.value },
                        })
                      }
                      placeholder="Name"
                      className="h-7 text-[10px] bg-background border-border/50 px-2"
                    />
                  </div>
                  <div className="flex flex-col gap-1 px-1">
                    <Label className="text-[10px] font-semibold text-muted-foreground">
                      Date
                    </Label>
                    <Input
                      value={docStruct.coverPage.date}
                      onChange={(e) =>
                        setDocStruct({
                          coverPage: { ...docStruct.coverPage, date: e.target.value },
                        })
                      }
                      placeholder="Date"
                      className="h-7 text-[10px] bg-background border-border/50 px-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table of Contents */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <div className="flex items-center justify-between mb-1 px-1">
            <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Table of Contents</Label>
            <Switch
              checked={docStruct.toc.enabled}
              onCheckedChange={(enabled) =>
                setDocStruct({
                  toc: { ...docStruct.toc, enabled },
                })
              }
              className="scale-75 origin-right"
            />
          </div>

          {docStruct.toc.enabled && (
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex flex-col gap-1 px-1">
                <Label className="text-[10px] font-semibold text-muted-foreground">
                  Section Header
                </Label>
                <Input
                  value={docStruct.toc.title}
                  onChange={(e) =>
                    setDocStruct({
                      toc: { ...docStruct.toc, title: e.target.value },
                    })
                  }
                  placeholder="Table of Contents"
                  className="h-7 text-[10px] bg-background border-border/50 px-2"
                />
              </div>
              <div className="h-px bg-border/20 my-0.5" />
              <SliderField
                label="Nesting Depth"
                value={docStruct.toc.maxDepth}
                onChange={(maxDepth) =>
                  setDocStruct({
                    toc: { ...docStruct.toc, maxDepth },
                  })
                }
                min={1}
                max={6}
                step={1}
              />
            </div>
          )}
        </div>

        {/* Section Numbering */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <div className="flex items-center justify-between mb-1 px-1">
            <Label className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Section Titles</Label>
            <Switch
              checked={docStruct.sectionNumbering.enabled}
              onCheckedChange={(enabled) =>
                setDocStruct({
                  sectionNumbering: { ...docStruct.sectionNumbering, enabled },
                })
              }
              className="scale-75 origin-right"
            />
          </div>

          {docStruct.sectionNumbering.enabled && (
            <div className="flex flex-col gap-3 pt-2">
              <SliderField
                label="Numbering Depth"
                value={docStruct.sectionNumbering.maxDepth}
                onChange={(maxDepth) =>
                  setDocStruct({
                    sectionNumbering: { ...docStruct.sectionNumbering, maxDepth },
                  })
                }
                min={1}
                max={6}
                step={1}
              />
            </div>
          )}
        </div>
      </div>
    </CollapsibleSection>
  )
}
