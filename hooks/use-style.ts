import { useStyleStore } from "@/stores"

export function useStyle() {
  const activeTheme = useStyleStore((s) => s.activeTheme)
  const fonts = useStyleStore((s) => s.fonts)
  const headings = useStyleStore((s) => s.headings)
  const colors = useStyleStore((s) => s.colors)
  const bodyText = useStyleStore((s) => s.bodyText)
  const codeBlock = useStyleStore((s) => s.codeBlock)
  const headerFooter = useStyleStore((s) => s.headerFooter)

  const applyTheme = useStyleStore((s) => s.applyTheme)
  const setFont = useStyleStore((s) => s.setFont)
  const setHeading = useStyleStore((s) => s.setHeading)
  const setColor = useStyleStore((s) => s.setColor)
  const setHeadingColor = useStyleStore((s) => s.setHeadingColor)
  const setBodyText = useStyleStore((s) => s.setBodyText)
  const setCodeBlock = useStyleStore((s) => s.setCodeBlock)
  const setHeaderFooter = useStyleStore((s) => s.setHeaderFooter)
  const resetToDefaults = useStyleStore((s) => s.resetToDefaults)

  return {
    activeTheme,
    fonts,
    headings,
    colors,
    bodyText,
    codeBlock,
    headerFooter,
    applyTheme,
    setFont,
    setHeading,
    setColor,
    setHeadingColor,
    setBodyText,
    setCodeBlock,
    setHeaderFooter,
    resetToDefaults,
  }
}
