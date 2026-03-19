import { createHighlighter, type Highlighter, type BundledTheme } from "shiki"

let highlighterPromise: Promise<Highlighter> | null = null

/**
 * Returns (or creates) a singleton Shiki highlighter.
 * Lazy-loaded so the large WASM + themes bundle is only fetched once.
 */
async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [
        "catppuccin-mocha",
        "catppuccin-latte",
        "github-dark",
        "github-light",
        "one-dark-pro",
        "dracula",
        "monokai",
        "solarized-dark",
        "solarized-light",
        "dark-plus",
        "light-plus",
        "nord",
        "tokyo-night",
        "ayu-dark",
        "rose-pine",
        "vitesse-dark",
        "vitesse-light",
        "min-dark",
        "min-light",
      ],
      langs: [
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "html",
        "css",
        "json",
        "markdown",
        "python",
        "java",
        "c",
        "cpp",
        "csharp",
        "go",
        "rust",
        "ruby",
        "php",
        "swift",
        "kotlin",
        "sql",
        "bash",
        "shell",
        "yaml",
        "toml",
        "xml",
        "diff",
        "dockerfile",
        "graphql",
        "lua",
        "r",
        "scala",
        "dart",
        "elixir",
        "haskell",
      ],
    })
  }
  return highlighterPromise
}

/**
 * Highlight a code block using Shiki.
 *
 * @param code  - Raw source code
 * @param lang  - Language identifier (e.g. "typescript")
 * @param theme - Shiki theme name (e.g. "catppuccin-mocha")
 * @returns     - Highlighted HTML string
 */
export async function highlightCode(
  code: string,
  lang: string,
  theme: string
): Promise<string> {
  try {
    const highlighter = await getHighlighter()
    const loadedLangs = highlighter.getLoadedLanguages()

    // If language isn't bundled, fall back to plaintext
    const resolvedLang = loadedLangs.includes(lang) ? lang : "text"

    return highlighter.codeToHtml(code, {
      lang: resolvedLang,
      theme: theme as BundledTheme,
    })
  } catch {
    // Graceful fallback: return the code in a plain <pre>
    const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    return `<pre><code>${escaped}</code></pre>`
  }
}
