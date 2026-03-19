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
      pageLayout: s.pageLayout,
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

  const handleApplyPreset = (settings: any) => {
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
    <CollapsibleSection title="Presets & Profiles">
      <div className="flex flex-col gap-6">
        
        {/* Save Current */}
        <div className="flex flex-col gap-3">
          <Label className="text-xs font-semibold">Save Current Style</Label>
          <div className="flex gap-2">
            <Input
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              placeholder="My Custom Theme..."
              className="h-8 text-xs"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveToBrowser()
              }}
            />
            <Button size="sm" onClick={handleSaveToBrowser} disabled={!newPresetName.trim()}>
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Saved Presets */}
        {savedPresets.length > 0 && (
          <div className="flex flex-col gap-3">
            <Label className="text-xs font-semibold">Saved Layouts</Label>
            <div className="flex flex-col gap-2">
              {savedPresets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between rounded-md border bg-card px-3 py-2 text-sm shadow-sm"
                >
                  <button
                    className="flex-1 text-left font-medium hover:underline truncate"
                    onClick={() => handleApplyPreset(preset.settings)}
                  >
                    {preset.name}
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:bg-destructive/10"
                    onClick={() => deletePreset(preset.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Import / Export JSON */}
        <div className="flex flex-col gap-3 border-t pt-4">
          <Label className="text-xs font-semibold">Portable JSON</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={handleExportJson} className="w-full gap-2">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            
            <div className="relative w-full">
              <Button variant="outline" size="sm" className="w-full gap-2 relative z-0">
                <Upload className="h-3.5 w-3.5" />
                Import
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

      </div>
    </CollapsibleSection>
  )
}
