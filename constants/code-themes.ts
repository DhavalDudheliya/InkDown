export interface CodeTheme {
  id: string
  displayName: string
  isDark: boolean
}

export const CODE_THEMES: CodeTheme[] = [
  { id: "catppuccin-mocha", displayName: "Catppuccin Mocha", isDark: true },
  { id: "catppuccin-latte", displayName: "Catppuccin Latte", isDark: false },
  { id: "github-dark", displayName: "GitHub Dark", isDark: true },
  { id: "github-light", displayName: "GitHub Light", isDark: false },
  { id: "one-dark-pro", displayName: "One Dark Pro", isDark: true },
  { id: "dracula", displayName: "Dracula", isDark: true },
  { id: "monokai", displayName: "Monokai", isDark: true },
  { id: "solarized-dark", displayName: "Solarized Dark", isDark: true },
  { id: "solarized-light", displayName: "Solarized Light", isDark: false },
  { id: "dark-plus", displayName: "VS Code Dark+", isDark: true },
  { id: "light-plus", displayName: "VS Code Light+", isDark: false },
  { id: "nord", displayName: "Nord", isDark: true },
  { id: "tokyo-night", displayName: "Tokyo Night", isDark: true },
  { id: "ayu-dark", displayName: "Ayu Dark", isDark: true },
  { id: "rose-pine", displayName: "Rosé Pine", isDark: true },
  { id: "vitesse-dark", displayName: "Vitesse Dark", isDark: true },
  { id: "vitesse-light", displayName: "Vitesse Light", isDark: false },
  { id: "min-dark", displayName: "Min Dark", isDark: true },
  { id: "min-light", displayName: "Min Light", isDark: false },
]
