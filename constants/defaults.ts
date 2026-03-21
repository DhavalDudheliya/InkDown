import type { CodeBlockConfig } from "@/types/code-block"
import type {
  BodyTextConfig,
  HeaderFooterSettings,
  DocumentStructureSettings,
  SpecialContentSettings,
  TableConfig,
} from "@/types/style"

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

export const DEFAULT_DOCUMENT_STRUCTURE: DocumentStructureSettings = {
  toc: {
    enabled: false,
    title: "Table of Contents",
    maxDepth: 3,
  },
  coverPage: {
    enabled: false,
    title: "",
    subtitle: "",
    author: "",
    date: "",
  },
  sectionNumbering: {
    enabled: false,
    maxDepth: 3,
  },
}

export const DEFAULT_SPECIAL_CONTENT: SpecialContentSettings = {
  images: {
    borderRadius: 8,
    shadow: true,
    centerAlignment: true,
  },
  callouts: {
    theme: "modern",
    fontSize: 14,
  },
}

export const DEFAULT_TABLE_CONFIG: TableConfig = {
  borderStyle: "horizontal",
  stripedRows: false,
  cellPadding: 8,
  headerBold: true,
}
