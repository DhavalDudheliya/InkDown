import { create } from "zustand"

import {
  DEFAULT_BODY_TEXT,
  DEFAULT_CODE_BLOCK,
  DEFAULT_HEADER_FOOTER,
  DEFAULT_PAGE_LAYOUT,
  DEFAULT_DOCUMENT_STRUCTURE,
  DEFAULT_SPECIAL_CONTENT,
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
  PageLayout,
  ThemeName,
  DocumentStructureSettings,
  SpecialContentSettings,
} from "@/types/style"

const defaultTheme = THEME_DEFINITIONS["modern-purple"]

interface StyleState {
  // Current theme
  activeTheme: ThemeName
  fonts: Record<FontRole, FontConfig>
  headings: Record<HeadingLevel, HeadingConfig>
  colors: ColorConfig
  bodyText: BodyTextConfig

  // Code block
  codeBlock: CodeBlockConfig

  // Page layout
  pageLayout: PageLayout

  // Header & footer
  headerFooter: HeaderFooterSettings

  // Document Structure
  documentStructure: DocumentStructureSettings

  // Special Content
  specialContent: SpecialContentSettings
}

interface StyleActions {
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

  // Page layout
  setPageLayout: (config: Partial<PageLayout>) => void

  // Header & footer
  setHeaderFooter: (config: Partial<HeaderFooterSettings>) => void

  // Document Structure
  setDocumentStructure: (config: Partial<DocumentStructureSettings>) => void

  // Special Content
  setSpecialContent: (config: Partial<SpecialContentSettings>) => void

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
    pageLayout: { ...DEFAULT_PAGE_LAYOUT },
    headerFooter: { ...DEFAULT_HEADER_FOOTER },
    documentStructure: { ...DEFAULT_DOCUMENT_STRUCTURE },
    specialContent: { ...DEFAULT_SPECIAL_CONTENT },
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

  setPageLayout: (config) => {
    set((state) => ({
      pageLayout: { ...state.pageLayout, ...config },
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

  resetToDefaults: () => {
    set(getInitialState())
  },
}))
