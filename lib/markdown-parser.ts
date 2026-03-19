import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"

/**
 * Parse Markdown content into styled HTML.
 *
 * Pipeline:
 *   Markdown → remark-parse → remark-gfm → remark-math
 *            → remark-rehype → rehype-katex → rehype-stringify → HTML
 */
export async function parseMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return String(result)
}
