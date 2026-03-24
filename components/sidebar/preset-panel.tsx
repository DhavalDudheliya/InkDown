"use client"

import { useState } from "react"
import { Download, Upload, Save, Trash2 } from "lucide-react"

import { usePresetStore, useStyleStore } from "@/stores"
import { CollapsibleSection } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function PresetPanel() {
  const [newPresetName, setNewPresetName] = useState("")
  const savedPresets = usePresetStore((s) => s.savedPresets)
  const savePreset = usePresetStore((s) => s.savePreset)
  const deletePreset = usePresetStore((s) => s.deletePreset)
  const importPreset = usePresetStore((s) => s.importPreset)

  // Grab the exact current style state to save or export synchronously
  const getCurrentStyles = () => {
    const s = useStyleStore.getState()
    return {
      activeTheme: s.activeTheme,
      fonts: s.fonts,
      headings: s.headings,
      colors: s.colors,
      bodyText: s.bodyText,
      codeBlock: s.codeBlock,
      headerFooter: s.headerFooter,
      documentStructure: s.documentStructure,
      specialContent: s.specialContent,
      tableConfig: s.tableConfig,
    }
  }
  const loadSettings = useStyleStore((s) => s.loadSettings)

  const handleSaveToBrowser = () => {
    if (!newPresetName.trim()) return
    savePreset(newPresetName.trim(), getCurrentStyles())
    setNewPresetName("")
  }

  const handleApplyPreset = (settings: Parameters<typeof loadSettings>[0]) => {
    loadSettings(settings)
  }

  const handleExportJson = () => {
    const json = JSON.stringify(
      { name: "exported-preset", settings: getCurrentStyles() },
      null,
      2
    )
    const blob = new Blob([json], { type: "application/json;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "inkdown-preset.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      try {
        const preset = importPreset(result)
        if (preset) {
          handleApplyPreset(preset.settings)
        } else {
          alert("Invalid preset file format.")
        }
      } catch (err) {
        console.error("Failed to parse preset JSON", err)
      }
    }
    reader.readAsText(file)
    e.target.value = "" // reset input
  }

  return (
    <CollapsibleSection title="Styles & Presets">
      <div className="flex flex-col gap-3">
        {/* Save Current */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="mb-1 text-[11px] font-bold tracking-wider text-primary/80 uppercase">
            Save Configuration
          </Label>
          <div className="flex gap-2 pt-1">
            <Input
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              placeholder="e.g. My Modern Layout"
              className="h-8 border-border/50 bg-background text-[11px]"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveToBrowser()
              }}
            />
            <Button
              size="sm"
              onClick={handleSaveToBrowser}
              disabled={!newPresetName.trim()}
              className="h-8 w-8 p-0"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Saved Presets */}
        {savedPresets.length > 0 && (
          <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
            <Label className="mb-1 text-[11px] font-bold tracking-wider text-primary/80 uppercase">
              Saved Styles
            </Label>
            <div className="flex flex-col gap-1.5 pt-1">
              {savedPresets.map((preset) => (
                <div
                  key={preset.id}
                  className="group flex items-center justify-between rounded-md border border-border/30 bg-background/50 px-2.5 py-1.5 text-[11px] transition-colors hover:border-primary/30"
                >
                  <button
                    className="flex-1 truncate text-left font-medium hover:text-primary"
                    onClick={() => handleApplyPreset(preset.settings)}
                  >
                    {preset.name}
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                    onClick={() => deletePreset(preset.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portability */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
          <Label className="mb-1 text-[11px] font-bold tracking-wider text-primary/80 uppercase">
            Portability (JSON)
          </Label>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              className="h-8 gap-1.5 border-border/50 bg-background text-[10px]"
            >
              <Download className="h-3.5 w-3.5" />
              Store File
            </Button>

            <div className="relative w-full">
              <Button
                variant="outline"
                size="sm"
                className="relative z-0 h-8 w-full gap-1.5 border-border/50 bg-background text-[10px]"
              >
                <Upload className="h-3.5 w-3.5" />
                Load File
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              />
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
