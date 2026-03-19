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
      <div className="flex flex-col gap-6">
        {/* Cover Page */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">Cover Page</Label>
            <Switch
              checked={docStruct.coverPage.enabled}
              onCheckedChange={(enabled) =>
                setDocStruct({
                  coverPage: { ...docStruct.coverPage, enabled },
                })
              }
            />
          </div>

          {docStruct.coverPage.enabled && (
            <div className="flex flex-col gap-2 rounded-md bg-muted/40 p-2">
              <div className="flex flex-col gap-1">
                <Label className="text-[10px] text-muted-foreground uppercase">
                  Title
                </Label>
                <Input
                  value={docStruct.coverPage.title}
                  onChange={(e) =>
                    setDocStruct({
                      coverPage: { ...docStruct.coverPage, title: e.target.value },
                    })
                  }
                  placeholder="Document Title"
                  className="h-7 text-xs"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-[10px] text-muted-foreground uppercase">
                  Subtitle
                </Label>
                <Input
                  value={docStruct.coverPage.subtitle}
                  onChange={(e) =>
                    setDocStruct({
                      coverPage: { ...docStruct.coverPage, subtitle: e.target.value },
                    })
                  }
                  placeholder="Subtitle or Description"
                  className="h-7 text-xs"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-[10px] text-muted-foreground uppercase">
                  Author
                </Label>
                <Input
                  value={docStruct.coverPage.author}
                  onChange={(e) =>
                    setDocStruct({
                      coverPage: { ...docStruct.coverPage, author: e.target.value },
                    })
                  }
                  placeholder="Author Name"
                  className="h-7 text-xs"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-[10px] text-muted-foreground uppercase">
                  Date
                </Label>
                <Input
                  value={docStruct.coverPage.date}
                  onChange={(e) =>
                    setDocStruct({
                      coverPage: { ...docStruct.coverPage, date: e.target.value },
                    })
                  }
                  placeholder="YYYY-MM-DD or Custom"
                  className="h-7 text-xs"
                />
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-border" />

        {/* Table of Contents */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">Table of Contents</Label>
            <Switch
              checked={docStruct.toc.enabled}
              onCheckedChange={(enabled) =>
                setDocStruct({
                  toc: { ...docStruct.toc, enabled },
                })
              }
            />
          </div>

          {docStruct.toc.enabled && (
            <div className="flex flex-col gap-2 rounded-md bg-muted/40 p-2">
              <div className="flex flex-col gap-1">
                <Label className="text-[10px] text-muted-foreground uppercase">
                  TOC Title
                </Label>
                <Input
                  value={docStruct.toc.title}
                  onChange={(e) =>
                    setDocStruct({
                      toc: { ...docStruct.toc, title: e.target.value },
                    })
                  }
                  placeholder="Table of Contents"
                  className="h-7 text-xs"
                />
              </div>
              <SliderField
                label="Max Heading Depth"
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

        <div className="h-px bg-border" />

        {/* Section Numbering */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">Section Numbering</Label>
            <Switch
              checked={docStruct.sectionNumbering.enabled}
              onCheckedChange={(enabled) =>
                setDocStruct({
                  sectionNumbering: { ...docStruct.sectionNumbering, enabled },
                })
              }
            />
          </div>

          {docStruct.sectionNumbering.enabled && (
            <div className="flex flex-col gap-2 rounded-md bg-muted/40 p-2">
              <SliderField
                label="Max Depthing"
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
