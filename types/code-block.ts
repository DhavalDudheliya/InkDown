export interface CodeBlockConfig {
  theme: string // Shiki theme id
  lineNumbers: boolean
  languageBadge: boolean
  fileNameLabel: boolean
  padding: number // px
  borderRadius: number // px
  border: boolean
  wordWrap: boolean
  highlightLines: string // e.g. "1-3,5,7-9"
  fontSize: number // px
  fontFamily: string
}

export interface CodeBlockLanguageOverride {
  language: string
  theme: string // override theme for this language
}
