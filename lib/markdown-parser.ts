import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import rehypeParse from "rehype-parse"
import { visit } from "unist-util-visit"
import type { Root, Element } from "hast"
import type { Root as MdastRoot, Heading, Text, List, ListItem, Paragraph, PhrasingContent, Blockquote } from "mdast"
import GithubSlugger from "github-slugger"

import { highlightCode } from "./shiki-highlighter"
import type { DocumentStructureSettings, SpecialContentSettings } from "@/types/style"

/**
 * Parse Markdown content into styled HTML.
 *
 * Pipeline:
 *   Markdown → remark-parse → remark-gfm → remark-math
 *            → remark-rehype → rehype-katex → rehype-shiki → rehype-stringify → HTML
 */
export async function parseMarkdown(
  content: string,
  codeBlockConfig?: any,
  docStruct?: DocumentStructureSettings,
  specialContent?: SpecialContentSettings
): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCallouts, specialContent)
    .use(remarkDocumentStructure, docStruct)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeImages, specialContent)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypeShiki, { theme: codeBlockConfig?.theme || "catppuccin-mocha", codeBlock: codeBlockConfig })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return String(result)
}

/**
 * Custom remark plugin to handle Section Numbering and Table of Contents insertion.
 * Runs before remark-rehype converts mdast to hast.
 */
function remarkDocumentStructure(options?: DocumentStructureSettings) {
  return function (tree: MdastRoot) {
    if (!options) return

    const { toc, sectionNumbering } = options
    if (!toc.enabled && !sectionNumbering.enabled) return

    const slugger = new GithubSlugger()
    const headings: { depth: number; text: string; id: string; number: string }[] = []
    const counters = [0, 0, 0, 0, 0, 0] // Track counters for H1-H6

    // 1. Walk the tree to number sections and collect headings for TOC
    visit(tree, "heading", (node: Heading) => {
      const level = node.depth

      let numberStr = ""
      if (sectionNumbering.enabled && level <= sectionNumbering.maxDepth) {
        // Increment current level, reset child levels
        counters[level - 1]++
        for (let i = level; i < 6; i++) {
          counters[i] = 0
        }
        
        numberStr = counters.slice(0, level).join(".") + " "
        
        // Inject the number as bold text into the AST
        node.children.unshift(
          { type: "text", value: " " },
          { type: "strong", children: [{ type: "text", value: numberStr.trim() }] } as any
        )
      }

      // Extract raw text for TOC and IDs
      const rawText = extractMdastText(node).trim()
      
      // Clean up the text by removing the newly injected number if numbering is enabled,
      // so the slug matches the standard rehype-slug generation.
      const textWithoutNumber = sectionNumbering.enabled 
          ? rawText.replace(new RegExp(`^${numberStr.trim()} `), "") 
          : rawText

      const id = slugger.slug(textWithoutNumber)

      if (toc.enabled && level <= toc.maxDepth) {
        headings.push({
          depth: level,
          text: rawText, // Include the number in the TOC label
          id,
          number: numberStr,
        })
      }
    })

    // 2. Generate TOC AST and inject at the top
    if (toc.enabled && headings.length > 0) {
      const tocList = buildTocAst(headings)
      
      const tocTitleNode: Heading = {
        type: "heading",
        depth: 2,
        children: [{ type: "text", value: toc.title }],
      }

      // Wrap TOC in a div container for page breaking
      const tocContainer: any = {
        type: "div",
        data: {
          hName: "div",
          hProperties: { className: ["toc-container", "break-after-page"] },
        },
        children: [tocTitleNode, tocList],
      }

      // Prepend TOC title and list
      tree.children.unshift(tocContainer)
    }
  }
}

/**
 * Builds a flat bulleted list containing links for the Table of Contents.
 * Output resembles standard `<ol>`/`<ul>` structure but we use nested bullet lists for indenting.
 */
function buildTocAst(headings: { depth: number; text: string; id: string }[]): List {
  const rootList: List = { type: "list", ordered: false, spread: false, children: [] }
  
  // We'll flatten the TOC using HTML styling or basic indentation
  for (const h of headings) {
    const linkNode: PhrasingContent = {
      type: "link",
      url: `#${h.id}`,
      children: [{ type: "text", value: h.text }],
    }

    // Wrap the link in a paragraph inside a list item
    const listItem: ListItem = {
      type: "listItem",
      spread: false,
      children: [{ type: "paragraph", children: [linkNode] }],
    }
    
    // Simple approach: we just output a flat list and let CSS do the indentation via a custom className, 
    // or we nest them properly. Proper nesting in mdast is complex. Let's build a flat list where 
    // each paragraph has some custom HTML classes for padding.
    // Instead of raw HTML, since we want valid mdast, we'll just insert non-breaking spaces for depth.
    if (h.depth > 1) {
      const spaces = " ".repeat((h.depth - 1) * 4)
      ;(listItem.children[0] as Paragraph).children.unshift({ type: "text", value: spaces })
    }

    rootList.children.push(listItem)
  }

  return rootList
}

/**
 * Recursively extract text content from an mdast node.
 */
function extractMdastText(node: any): string {
  if (node.type === "text" && "value" in node) {
    return node.value ?? ""
  }
  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map(extractMdastText).join("")
  }
  return ""
}

/**
 * Custom rehype plugin that runs Shiki on `<pre><code>` blocks.
 */
function rehypeShiki(options: { theme: string; codeBlock?: any }) {
  return async function (tree: Root) {
    const nodesToProcess: { node: Element; codeNode: Element; parent: Element; index: number }[] =
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
            node, // The <pre> element
            codeNode: node.children[0] as Element, // The <code> element
            parent: parent as Element,
            index,
          })
        }
      }
    })

    // Process each code block with Shiki
    for (const { node, codeNode, parent, index } of nodesToProcess) {
      // Extract language from className (e.g. "language-typescript")
      const className = (codeNode.properties?.className as string[]) ?? []
      const langClass = className.find((c) =>
        typeof c === "string" ? c.startsWith("language-") : false
      )
      const lang = langClass ? langClass.replace("language-", "") : "text"

      // Let client-side Mermaid handle mermaid blocks
      if (lang === "mermaid") {
        if (!parent.properties) parent.properties = {}
        const parentClassInfo = (parent.properties.className as string[]) || []
        parent.properties.className = [...parentClassInfo, "mermaid"]
        continue
      }

      // Extract raw text content
      const code = extractText(codeNode)

      try {
        const highlighted = await highlightCode(code, lang, options.theme)

        // Parse the highlighted HTML back into hast
        const parsed = unified()
          .use(rehypeParse, { fragment: true })
          .parse(highlighted) as Root

        // The parsed tree is a Root containing the <pre> element
        if (parsed.children.length > 0) {
          const preElement = parsed.children[0] as Element
          
          if (options.codeBlock) {
            // Setup parent container if we need decorations like filename label
            const container: Element = {
              type: "element",
              tagName: "div",
              properties: { className: ["code-block-container"] },
              children: []
            }
            
            // Add Line Numbers class to <pre>
            if (options.codeBlock.lineNumbers && preElement.properties) {
              const preClasses = (preElement.properties.className as string[]) || [];
              preElement.properties.className = [...preClasses, "has-line-numbers"];
            }

            // File Name Label
            if (options.codeBlock.fileNameLabel) {
              const header: Element = {
                type: "element",
                tagName: "div",
                properties: { className: ["code-block-header"] },
                children: [
                  { type: "text", value: lang === "text" ? "code" : lang }
                ]
              }
              // Adjust <pre> border-radius if header is present
              if (preElement.properties) {
                preElement.properties.style = (preElement.properties.style || "") + " border-top-left-radius: 0; border-top-right-radius: 0; margin-top: 0;";
              }
              container.children.push(header)
            }
            
            container.children.push(preElement)
            parent.children[index] = container as never
          } else {
            parent.children[index] = preElement as never
          }
        }
      } catch (err) {
        console.error("Shiki error:", err)
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
/**
 * Custom remark plugin to parse GitHub-flavored alerts in blockquotes
 * `> [!NOTE]` -> div.ink-callout
 */
function remarkCallouts(options?: SpecialContentSettings) {
  return function (tree: MdastRoot) {
    if (!options) return

    const theme = options.callouts.theme || "modern"

    visit(tree, "blockquote", (node: Blockquote) => {
      if (node.children.length > 0 && node.children[0].type === "paragraph") {
        const p = node.children[0]
        if (p.children.length > 0 && p.children[0].type === "text") {
          const textNode = p.children[0]
          const match = textNode.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)/i)
          
          if (match) {
            const type = match[1].toLowerCase()
            const remainingText = match[2]

            // Mutate text node to remove the bracket trigger
            if (remainingText) {
              textNode.value = remainingText
            } else {
              p.children.shift()
            }

            // Convert blockquote to html div
            // Injecting custom hast data so remark-rehype converts it to a div
            ;(node as any).data = {
              hName: "div",
              hProperties: {
                className: `ink-callout ink-callout-${type} ink-callout-theme-${theme}`,
                style: `font-size: ${options.callouts.fontSize}px;`,
                "data-callout": type,
              },
            }
            
            // Inject an icon or title if needed, maybe using standard CSS ::before content
          }
        }
      }
    })
  }
}

/**
 * Custom rehype plugin to apply image stylings
 */
function rehypeImages(options?: SpecialContentSettings) {
  return function (tree: Root) {
    if (!options) return

    visit(tree, "element", (node: Element, index: number | undefined, parent: Element | Root | undefined) => {
      if (node.tagName === "img") {
        const styles = []
        if (options.images.borderRadius > 0) {
          styles.push(`border-radius: ${options.images.borderRadius}px`)
        }
        if (options.images.shadow) {
          styles.push("box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)")
        }
        
        // Add styles directly to node
        if (!node.properties) node.properties = {}
        const existingStyle = (node.properties.style as string) || ""
        node.properties.style = `${existingStyle}; ${styles.join(";")}`

        // Center alignment requires wrapping or applying to parent paragraph if parent is just a P matching the image
        if (options.images.centerAlignment && parent && parent.type === "element" && parent.tagName === "p") {
          if (!parent.properties) parent.properties = {}
          const pStyle = (parent.properties.style as string) || ""
          parent.properties.style = `${pStyle}; text-align: center;`
        }
      }
    })
  }
}
