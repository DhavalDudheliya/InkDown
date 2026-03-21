"use client"

import { cn } from "@/lib/utils"
import { useStyleStore } from "@/stores"
import { THEME_DEFINITIONS } from "@/constants"
import { CollapsibleSection } from "@/components/common"

import type { ThemeName } from "@/types/style"

export function ThemePanel() {
  const activeTheme = useStyleStore((s) => s.activeTheme)
  const applyTheme = useStyleStore((s) => s.applyTheme)

  const themes = Object.entries(THEME_DEFINITIONS) as [
    ThemeName,
    (typeof THEME_DEFINITIONS)[ThemeName],
  ][]

  return (
    <CollapsibleSection title="Themes" defaultOpen>
      <div className="grid grid-cols-2 gap-2">
        {themes.map(([key, theme]) => (
          <button
            key={key}
            className={cn(
              "group flex flex-col gap-1.5 rounded-lg border p-2.5 text-left transition-all hover:shadow-sm",
              activeTheme === key
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/40"
            )}
            onClick={() => applyTheme(key)}
          >
            {/* Color swatches */}
            <div className="flex gap-1">
              {[
                theme.colors.bodyTextColor,
                theme.colors.linkColor,
                theme.colors.headingColors.h1,
                theme.colors.blockquoteBorderColor,
              ].map((color, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Theme name */}
            <span className="text-[11px] font-medium leading-tight">
              {theme.displayName}
            </span>

            {/* Font preview */}
            <span
              className="truncate text-[10px] text-muted-foreground"
              style={{ fontFamily: theme.fonts.body.family }}
            >
              {theme.fonts.body.family}
            </span>

            {/* Active indicator */}
            {activeTheme === key && (
              <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>
    </CollapsibleSection>
  )
}
