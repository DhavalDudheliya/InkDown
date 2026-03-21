// ── Theme Names ──────────────────────────────────────────────

export type ThemeName =
  "editorial-serif" | "clean-slate" | "forest-notebook" | "rose-gold" | "midnight-ink" | "catppuccin-mocha" | "obsidian-amber" | "nord-aurora"

// ── Font Configuration ───────────────────────────────────────

export interface FontConfig {
  family: string
  size: number // px
  lineHeight: number // unitless multiplier
  letterSpacing: number // em
  weight: number // 100–900
}

export type FontRole = "body" | "heading" | "monospace"

// ── Heading Configuration ────────────────────────────────────

export interface HeadingConfig {
  fontSize: number // px
  fontWeight: number
  color: string // hex
  spacingTop: number // px
  spacingBottom: number // px
  borderBottom: boolean
  underline: boolean
}

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type HeadingStyles = Record<HeadingLevel, HeadingConfig>

// ── Color Configuration ──────────────────────────────────────

export interface ColorConfig {
  headingColors: Record<HeadingLevel, string>
  bodyTextColor: string
  secondaryTextColor: string
  linkColor: string
  visitedLinkColor: string
  blockquoteBorderColor: string
  blockquoteBackgroundColor: string
  tableHeaderBackground: string
  tableHeaderTextColor: string
  tableRowAlternateColor: string
  tableBorderColor: string
  inlineCodeBackground: string
  inlineCodeTextColor: string
  pageBackgroundColor: string
}

// ── Header & Footer ─────────────────────────────────────────

export type HeaderFooterSlotContent =
  | { type: "none" }
  | { type: "text"; value: string }
  | { type: "title" }
  | { type: "date" }
  | { type: "pageNumber" }
  | { type: "totalPages" }
  | { type: "logo"; src: string }

export type PageNumberFormat = "arabic" | "roman" | "alphabetical"

export interface HeaderFooterConfig {
  left: HeaderFooterSlotContent
  center: HeaderFooterSlotContent
  right: HeaderFooterSlotContent
  dividerEnabled: boolean
  dividerColor: string
  dividerThickness: number // px
  showOnFirstPage: boolean
}

export interface HeaderFooterSettings {
  header: HeaderFooterConfig
  footer: HeaderFooterConfig
  pageNumberFormat: PageNumberFormat
}

// ── Body Text ────────────────────────────────────────────────

export type TextAlignment = "left" | "justify"

export interface BodyTextConfig {
  paragraphSpacing: number // px
  textAlignment: TextAlignment
  firstLineIndent: boolean
}

// ── Document Structure ───────────────────────────────────────

export interface TableOfContentsConfig {
  enabled: boolean
  title: string
  maxDepth: number // 1-6
}

export interface CoverPageConfig {
  enabled: boolean
  title: string
  subtitle: string
  author: string
  date: string
}

export interface SectionNumberingConfig {
  enabled: boolean
  maxDepth: number // 1-6
}

export interface DocumentStructureSettings {
  toc: TableOfContentsConfig
  coverPage: CoverPageConfig
  sectionNumbering: SectionNumberingConfig
}

// ── Special Content ──────────────────────────────────────────

export type CalloutStyleTheme = "modern" | "classic" | "minimal"

export interface SpecialContentSettings {
  images: {
    borderRadius: number
    shadow: boolean
    centerAlignment: boolean
  }
  callouts: {
    theme: CalloutStyleTheme
    fontSize: number
  }
}

// ── Tables ──────────────────────────────────────────

export type TableBorderStyle = "none" | "horizontal" | "grid"

export interface TableConfig {
  borderStyle: TableBorderStyle
  stripedRows: boolean
  cellPadding: number
  headerBold: boolean
}

// ── Full Document Theme ──────────────────────────────────────

export interface DocumentTheme {
  name: ThemeName
  displayName: string
  fonts: Record<FontRole, FontConfig>
  headings: HeadingStyles
  colors: ColorConfig
  bodyText: BodyTextConfig
  codeTheme: string // Shiki theme id
}
