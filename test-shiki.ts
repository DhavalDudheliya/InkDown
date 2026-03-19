import { highlightCode } from "./lib/shiki-highlighter"

async function main() {
  try {
    const start = Date.now()
    const html = await highlightCode("console.log('hello')", "javascript", "catppuccin-mocha")
    console.log("HTML:", html)
    console.log("Done in", Date.now() - start, "ms")
  } catch (err) {
    console.error("Error:", err)
  }
}
main()
