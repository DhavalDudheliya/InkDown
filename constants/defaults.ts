import type { CodeBlockConfig } from "@/types/code-block"
import type {
  BodyTextConfig,
  HeaderFooterSettings,
  PageLayout,
} from "@/types/style"

export const DEFAULT_PAGE_LAYOUT: PageLayout = {
  size: "a4",
  orientation: "portrait",
  margins: { top: 25.4, right: 25.4, bottom: 25.4, left: 25.4 },
  marginPreset: "normal",
  maxContentWidth: 0,
  twoColumn: false,
}

export const DEFAULT_HEADER_FOOTER: HeaderFooterSettings = {
  header: {
    left: { type: "none" },
    center: { type: "none" },
    right: { type: "none" },
    dividerEnabled: false,
    dividerColor: "#e2e8f0",
    dividerThickness: 1,
    showOnFirstPage: true,
  },
  footer: {
    left: { type: "none" },
    center: { type: "pageNumber" },
    right: { type: "none" },
    dividerEnabled: false,
    dividerColor: "#e2e8f0",
    dividerThickness: 1,
    showOnFirstPage: true,
  },
  pageNumberFormat: "arabic",
}

export const DEFAULT_CODE_BLOCK: CodeBlockConfig = {
  theme: "catppuccin-mocha",
  lineNumbers: true,
  languageBadge: true,
  fileNameLabel: false,
  padding: 16,
  borderRadius: 8,
  border: true,
  wordWrap: false,
  highlightLines: "",
  fontSize: 14,
  fontFamily: "JetBrains Mono",
}

export const DEFAULT_BODY_TEXT: BodyTextConfig = {
  paragraphSpacing: 16,
  textAlignment: "left",
  firstLineIndent: false,
}

export const DEFAULT_THEME_NAME = "modern-purple" as const
