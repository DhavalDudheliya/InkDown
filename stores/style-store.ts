import { create } from "zustand"

import {
  DEFAULT_BODY_TEXT,
  DEFAULT_CODE_BLOCK,
  DEFAULT_HEADER_FOOTER,
  DEFAULT_DOCUMENT_STRUCTURE,
  DEFAULT_SPECIAL_CONTENT,
  DEFAULT_TABLE_CONFIG,
  DEFAULT_THEME_NAME,
  THEME_DEFINITIONS,
} from "@/constants"
import type { CodeBlockConfig } from "@/types/code-block"
import type {
  BodyTextConfig,
  ColorConfig,
  DocumentTheme,
  FontConfig,
  FontRole,
  HeaderFooterSettings,
  HeadingConfig,
  HeadingLevel,
  ThemeName,
  DocumentStructureSettings,
  SpecialContentSettings,
  TableConfig,
} from "@/types/style"

const defaultTheme = THEME_DEFINITIONS[DEFAULT_THEME_NAME]

export interface StyleState {
  // Current theme
  activeTheme: ThemeName
  fonts: Record<FontRole, FontConfig>
  headings: Record<HeadingLevel, HeadingConfig>
  colors: ColorConfig
  bodyText: BodyTextConfig

  // Code block
  codeBlock: CodeBlockConfig

  // Header & footer
  headerFooter: HeaderFooterSettings

  // Document Structure
  documentStructure: DocumentStructureSettings

  // Special Content
  specialContent: SpecialContentSettings

  // Tables
  tableConfig: TableConfig
}

export interface StyleActions {
  // Theme
  applyTheme: (themeName: ThemeName) => void

  // Fonts
  setFont: (role: FontRole, config: Partial<FontConfig>) => void

  // Headings
  setHeading: (level: HeadingLevel, config: Partial<HeadingConfig>) => void

  // Colors
  setColor: <K extends keyof ColorConfig>(
    key: K,
    value: ColorConfig[K]
  ) => void
  setHeadingColor: (level: HeadingLevel, color: string) => void

  // Body text
  setBodyText: (config: Partial<BodyTextConfig>) => void

  // Code block
  setCodeBlock: (config: Partial<CodeBlockConfig>) => void

  // Header & footer
  setHeaderFooter: (config: Partial<HeaderFooterSettings>) => void

  // Document Structure
  setDocumentStructure: (config: Partial<DocumentStructureSettings>) => void

  // Special Content
  setSpecialContent: (config: Partial<SpecialContentSettings>) => void

  // Tables
  setTableConfig: (config: Partial<TableConfig>) => void

  // Presets
  loadSettings: (settings: Partial<StyleState>) => void

  // Reset
  resetToDefaults: () => void
}

function getInitialState(): StyleState {
  return {
    activeTheme: defaultTheme.name,
    fonts: { ...defaultTheme.fonts },
    headings: { ...defaultTheme.headings },
    colors: { ...defaultTheme.colors },
    bodyText: { ...DEFAULT_BODY_TEXT },
    codeBlock: { ...DEFAULT_CODE_BLOCK },
    headerFooter: { ...DEFAULT_HEADER_FOOTER },
    documentStructure: { ...DEFAULT_DOCUMENT_STRUCTURE },
    specialContent: { ...DEFAULT_SPECIAL_CONTENT },
    tableConfig: { ...DEFAULT_TABLE_CONFIG },
  }
}

export const useStyleStore = create<StyleState & StyleActions>((set) => ({
  ...getInitialState(),

  applyTheme: (themeName) => {
    const theme: DocumentTheme | undefined = THEME_DEFINITIONS[themeName]
    if (!theme) return

    set((state) => ({
      activeTheme: themeName,
      fonts: { ...theme.fonts },
      headings: { ...theme.headings },
      colors: { ...theme.colors },
      bodyText: { ...theme.bodyText },
      codeBlock: { ...state.codeBlock, theme: theme.codeTheme },
    }))
  },

  setFont: (role, config) => {
    set((state) => ({
      fonts: {
        ...state.fonts,
        [role]: { ...state.fonts[role], ...config },
      },
    }))
  },

  setHeading: (level, config) => {
    set((state) => ({
      headings: {
        ...state.headings,
        [level]: { ...state.headings[level], ...config },
      },
    }))
  },

  setColor: (key, value) => {
    set((state) => ({
      colors: { ...state.colors, [key]: value },
    }))
  },

  setHeadingColor: (level, color) => {
    set((state) => ({
      colors: {
        ...state.colors,
        headingColors: {
          ...state.colors.headingColors,
          [level]: color,
        },
      },
      headings: {
        ...state.headings,
        [level]: { ...state.headings[level], color },
      },
    }))
  },

  setBodyText: (config) => {
    set((state) => ({
      bodyText: { ...state.bodyText, ...config },
    }))
  },

  setCodeBlock: (config) => {
    set((state) => ({
      codeBlock: { ...state.codeBlock, ...config },
    }))
  },

  setHeaderFooter: (config) => {
    set((state) => ({
      headerFooter: { ...state.headerFooter, ...config },
    }))
  },

  setDocumentStructure: (config) => {
    set((state) => ({
      documentStructure: { ...state.documentStructure, ...config },
    }))
  },

  setSpecialContent: (config) => {
    set((state) => ({
      specialContent: { ...state.specialContent, ...config },
    }))
  },

  setTableConfig: (config) => {
    set((state) => ({
      tableConfig: { ...state.tableConfig, ...config },
    }))
  },

  loadSettings: (settings) => {
    set((state) => ({
      ...state,
      ...settings,
    }))
  },

  resetToDefaults: () => {
    set(getInitialState())
  },
}))
