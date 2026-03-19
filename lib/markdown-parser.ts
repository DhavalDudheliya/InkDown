import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"
import { visit } from "unist-util-visit"
import type { Root, Element } from "hast"

import { highlightCode } from "./shiki-highlighter"

/**
 * Parse Markdown content into styled HTML.
 *
 * Pipeline:
 *   Markdown → remark-parse → remark-gfm → remark-math
 *            → remark-rehype → rehype-katex → rehype-shiki → rehype-stringify → HTML
 */
export async function parseMarkdown(
  content: string,
  codeTheme: string = "catppuccin-mocha"
): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeShiki, { theme: codeTheme })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return String(result)
}

/**
 * Custom rehype plugin that runs Shiki on `<pre><code>` blocks.
 */
function rehypeShiki(options: { theme: string }) {
  return async function (tree: Root) {
    const nodesToProcess: { node: Element; parent: Element; index: number }[] =
      []

    // Collect all <pre><code> nodes
    visit(tree, "element", (node: Element, index: number | undefined, parent: Element | Root | undefined) => {
      if (
        node.tagName === "pre" &&
        node.children.length === 1 &&
        node.children[0].type === "element" &&
        node.children[0].tagName === "code"
      ) {
        if (parent && typeof index === "number") {
          nodesToProcess.push({
            node: node.children[0] as Element,
            parent: parent as Element,
            index,
          })
        }
      }
    })

    // Process each code block with Shiki
    for (const { node, parent, index } of nodesToProcess) {
      // Extract language from className (e.g. "language-typescript")
      const className = (node.properties?.className as string[]) ?? []
      const langClass = className.find((c) =>
        typeof c === "string" ? c.startsWith("language-") : false
      )
      const lang = langClass ? langClass.replace("language-", "") : "text"

      // Extract raw text content
      const code = extractText(node)

      try {
        const highlighted = await highlightCode(code, lang, options.theme)

        // Parse the highlighted HTML back into hast
        const parsed = await unified()
          .use(rehypeStringify)
          .use(function () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.compiler = function (tree: any) {
              return tree
            }
          })
          .process("")

        // Replace the <pre> node with raw HTML
        // We use a raw node to inject Shiki's output
        parent.children[index] = {
          type: "raw" as never,
          value: highlighted,
        } as never
      } catch {
        // On failure, keep the original <pre><code> block
      }
    }
  }
}

/**
 * Recursively extract text content from a hast node.
 */
function extractText(node: Element | { type: string; value?: string }): string {
  if (node.type === "text" && "value" in node) {
    return node.value ?? ""
  }
  if ("children" in node && Array.isArray(node.children)) {
    return node.children
      .map((child: Element | { type: string; value?: string }) =>
        extractText(child)
      )
      .join("")
  }
  return ""
}
