# MarkFlow PDF Studio — Complete Project Description

---

## Project Vision

A web-based application where users write or paste Markdown content and export it as a beautifully designed, professionally formatted PDF. The core differentiator is that the output looks like a designer made it — not a plain HTML print. Rich syntax-highlighted code blocks, custom typography, themed color systems, and full layout control are all first-class features.

---

## Application Layout

The interface has three zones: a top navigation bar, a central two-panel workspace, and a collapsible right sidebar for styling controls.

The top bar holds the app logo, file name input, undo/redo buttons, a preview toggle, and the primary Export PDF button. The two-panel workspace shows the Markdown editor on the left and a live rendered PDF preview on the right, updating in real time as the user types or changes settings. The right sidebar contains all the styling panels organized into collapsible sections.

---

## Input & Editor

Users can get content into the editor in six ways: typing or pasting Markdown directly, uploading a .md or .txt file via a file picker, dragging and dropping a file onto the editor, importing from a public URL, loading from a built-in template library, or opening a recent document from local history.

The editor itself is a full code editor (built on CodeMirror 6) with Markdown syntax highlighting, line numbers, a word and character count in the status bar, find and replace, multi-cursor editing, configurable tab size, Vim and Emacs key binding modes, and auto-save to the browser's local storage so work is never lost on a page refresh.

---

## Live Preview

The right panel shows a paginated, scrollable preview of exactly what the PDF will look like — including page breaks, headers, footers, margins, fonts, and code block colors. The preview updates on a short debounce as the user types. Users can toggle between a split view (editor + preview side by side) and a full-screen preview mode.

---

## Document Themes

The app ships with six built-in themes that set a coordinated design system across the entire document. Each theme defines heading colors, body font, accent colors, blockquote style, link color, and the default code block syntax theme.

The six themes are Modern Purple (deep violet headings, Catppuccin code blocks), Ocean Blue (navy headings, GitHub Dark code), Forest Green (teal headings, earthy code palette), Warm Amber (golden headings, warm dark code), Minimal Gray (neutral monochrome with clean sans-serif typography), and Corporate (dark navy with ruled dividers and a light code block style suited for business documents). Any theme can be further customized — themes are starting points, not locked constraints.

---

## Typography & Font Customization

Users get a full font picker with access to over 50 Google Fonts. Fonts can be set independently for three text roles: body text, headings, and monospace (used in code blocks and inline code). For each role the user sets font size, line height, letter spacing, and font weight.

Headings H1 through H6 are individually configurable — each can have its own font size, font weight, color, top and bottom spacing, and optional bottom border or underline decoration. The body text settings include paragraph spacing, text alignment (left or justified), and first-line indent toggle for a book-like style.

---

## Color Customization

Every color in the document can be changed using a hex and RGBA color picker. The customizable colors are: H1 through H6 heading colors (each independent), body text color, secondary text color (used for captions and footnotes), hyperlink color, visited link color, blockquote left-border accent color, blockquote background tint, table header background, table header text, alternating table row tint, inline code background, inline code text color, and the page background color (which can be a pure white, a warm off-white, or any custom color).

---

## Code Block System

Code blocks are the visual centrepiece of the app. Every fenced code block in the Markdown gets rendered with full syntax highlighting using Shiki, which uses the same tokenizer engine as VS Code and produces the highest fidelity syntax coloring available.

The app ships with fifteen or more syntax highlight themes including Catppuccin Mocha, Catppuccin Latte, GitHub Dark, GitHub Light, One Dark Pro, Dracula, Monokai, Solarized Dark, Solarized Light, VS Code Dark+, VS Code Light+, Nord, Tokyo Night, Ayu Dark, and Rose Pine. The user can set one global code theme or override it per language.

Over 100 programming languages are supported for syntax highlighting. The code block UI options include line numbers (on/off), a language label badge in the top-right corner, an optional file name label in the top-left, configurable padding inside the block, border radius (from sharp to pill-style), a thin border or no border around the block, word wrap toggle for long lines, and line-range highlighting for marking specific lines in a different background color (useful for diffs and tutorials). The font size and font family for code blocks are set independently from the body text.

---

## Page Layout

Users can set the page size to A4, US Letter, A5, or Legal, and choose portrait or landscape orientation. Margins are set independently for top, right, bottom, and left, with common presets like Narrow, Normal, Wide, and Custom. The content column has a max-width control so text does not span the full page width on wider formats — useful for readability on Letter landscape.

An optional two-column layout splits the content into two equal columns after the cover page and table of contents. Page break behavior can be controlled with a special comment tag placed in the Markdown source.

---

## Headers & Footers

Both header and footer are independently configurable. Each has three zones — left, center, and right — where users can place any combination of: a logo image (uploaded), static text, the document title (auto-filled from the first H1), the current date, the current page number, and the total page count. Number format options include Arabic numerals, Roman numerals, and alphabetical. A divider line between the header/footer and the body can be toggled on and off and given a custom color and thickness. The first page can be set to show a different header or no header at all, which is standard for documents with a cover page.

---

## Document Structure Features

A table of contents can be auto-generated from the heading structure of the document. The TOC lists H1 through H3 headings by default (configurable depth), with dot leaders and right-aligned page numbers. Links inside the generated PDF are clickable and jump to the correct page. Section numbering (1, 1.1, 1.1.1 style) can be toggled on globally and applies to both the body headings and the TOC entries.

A cover page designer lets users set a title, subtitle, author name, date, and a cover image or background color. The cover page is styled separately from the body. An optional abstract or summary block can be placed between the cover and the TOC with its own background tint and typography.

---

## Images & Special Content

Inline images referenced in Markdown are fetched and embedded in the PDF. Alignment is controlled via a simple syntax convention or through the style panel. Users can set a global max-width for images and toggle rounded corners and a thin border. Figure captions render below images in a smaller, muted style.

LaTeX math expressions written in standard dollar-sign notation render as proper mathematical notation using KaTeX. Mermaid diagram code blocks (flowcharts, sequence diagrams, entity-relationship diagrams) render as actual vector diagrams inside the PDF. Callout blocks — note, tip, warning, and danger — render as tinted banner boxes with an icon prefix, following the GitHub-flavored callout convention.

---

## Tables

GitHub-Flavored Markdown tables render with full styling control. Options include striped alternating row backgrounds, a colored header row, visible or hidden cell borders, configurable cell padding, and font size. Column alignment declared in the Markdown (left, center, right) is preserved in the PDF output.

---

## Export Options

The primary export produces a standard PDF file downloaded directly to the user's machine. Additional export options include saving as a standalone HTML file (with all styles and fonts inlined), copying the rendered HTML to the clipboard, and printing directly from the browser.

PDF metadata fields — title, author, subject, keywords, and creator — are configurable and embedded in the PDF file properties. An optional password can be set to restrict opening or editing the PDF. A compression level selector (low, medium, high) trades off file size against image quality.

---

## Presets & Profiles

The entire style configuration — fonts, colors, layout, code theme, header/footer, page size — can be saved as a named preset. Users can create multiple presets for different use cases (a Resume preset, a Technical Report preset, a Blog Post preset). Presets can be exported as a JSON file, imported from JSON, or shared via a URL that encodes the configuration. A community gallery page lets users browse publicly shared presets and load them with one click.

---

## Additional Quality-of-Life Features

A keyboard shortcut panel lists all shortcuts for common actions. A focus mode hides the sidebar and collapses the editor to give a distraction-free writing experience. A dark mode for the application UI (separate from the PDF theme) is supported. An accessibility checker warns if heading hierarchy is skipped, if images lack alt text, or if color contrast in the chosen theme is too low. A print stylesheet ensures the preview looks correct across different operating system PDF renderers.