import { create } from "zustand"

export interface Preset {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  config: string // Serialized JSON of style settings
}

interface PresetState {
  presets: Preset[]
  activePresetId: string | null
}

interface PresetActions {
  savePreset: (name: string, description: string, config: string) => void
  loadPreset: (id: string) => Preset | undefined
  deletePreset: (id: string) => void
  updatePreset: (id: string, updates: Partial<Preset>) => void
  setActivePreset: (id: string | null) => void
  importPreset: (preset: Preset) => void
}

function generateId(): string {
  return `preset_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export const usePresetStore = create<PresetState & PresetActions>(
  (set, get) => ({
    presets: [],
    activePresetId: null,

    savePreset: (name, description, config) => {
      const now = new Date()
      const preset: Preset = {
        id: generateId(),
        name,
        description,
        createdAt: now,
        updatedAt: now,
        config,
      }

      set((state) => ({
        presets: [...state.presets, preset],
        activePresetId: preset.id,
      }))
    },

    loadPreset: (id) => {
      return get().presets.find((p) => p.id === id)
    },

    deletePreset: (id) => {
      set((state) => ({
        presets: state.presets.filter((p) => p.id !== id),
        activePresetId:
          state.activePresetId === id ? null : state.activePresetId,
      }))
    },

    updatePreset: (id, updates) => {
      set((state) => ({
        presets: state.presets.map((p) =>
          p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
        ),
      }))
    },

    setActivePreset: (id) => {
      set({ activePresetId: id })
    },

    importPreset: (preset) => {
      const newPreset: Preset = {
        ...preset,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      set((state) => ({
        presets: [...state.presets, newPreset],
      }))
    },
  })
)
