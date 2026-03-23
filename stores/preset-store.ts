import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { StyleState } from "./style-store"

export interface Preset {
  id: string
  name: string
  createdAt: number
  settings: Omit<StyleState, "activeTheme"> // optionally omit activeTheme, but it's safe to keep
}

interface PresetState {
  savedPresets: Preset[]
}

interface PresetActions {
  savePreset: (name: string, settings: StyleState) => void
  deletePreset: (id: string) => void
  importPreset: (json: string) => Preset | null
}

export const usePresetStore = create<PresetState & PresetActions>()(
  persist(
    (set) => ({
      savedPresets: [],

      savePreset: (name, settings) => {
        const newPreset: Preset = {
          id: crypto.randomUUID(),
          name,
          createdAt: Date.now(),
          settings,
        }
        set((state) => ({ savedPresets: [...state.savedPresets, newPreset] }))
      },

      deletePreset: (id) => {
        set((state) => ({
          savedPresets: state.savedPresets.filter((p) => p.id !== id),
        }))
      },

      importPreset: (json) => {
        try {
          const parsed = JSON.parse(json)
          // Basic validation (can be more robust in production)
          if (!parsed.name || !parsed.settings || !parsed.settings.colors) {
            return null
          }
          const preset: Preset = {
            id: crypto.randomUUID(),
            name: parsed.name,
            createdAt: Date.now(),
            settings: parsed.settings,
          }
          set((state) => ({ savedPresets: [...state.savedPresets, preset] }))
          return preset
        } catch {
          return null
        }
      },
    }),
    {
      name: "inkdown-presets",
    }
  )
)
