# InkDown

InkDown is an advanced, privacy-first, purely client-side Markdown editor built to deliver a professional word-processor-like experience natively inside your browser. By decoupling Markdown editing from standard web paradigms and merging it into a highly configurable desktop-like interface, InkDown produces beautiful continuous outputs ready for direct native PDF and HTML exports.

![InkDown Interface](./public/demo.png)

## Core Philosophy
- **Local-First & Private:** Everything processes client-side. There are absolutely zero servers storing your document keystrokes or layout structures. Documents auto-save seamlessly to `localStorage`.
- **Pixel-Perfect PDF Exports:** The application leverages CSS print media queries and custom Tailwind hooks to eject standard UI canvases, rendering your markdown inside perfect physical page bounds (A4, Letter, etc.), letting browser engines do the heavy lifting for high-fidelity PDF delivery.
- **Component Based Configurations:** Rather than maintaining massive markdown headers, everything is customized interactively. Fonts, typographies, syntax highlighting themes, global color schemes, and markdown feature-flags are stored in local Zustand stores and applied instantaneously to your preview layouts.

## Core Features

### Advanced Markdown Pipeline
At the core of InkDown is a hyper-optimized unified AST parsing pipeline extending far beyond standard Markdown structures.
- **Syntax Highlighting**: Real-time multi-language parsing generated internally via **Shiki** with customizable themes (matching the editor's theme).
- **Math Block Targeting**: LaTeX compilation native via **KaTeX** matching (`$` and `$$` boundaries).
- **GitHub Callouts & Alerts**: Translates standard `> [!WARNING]` blockquote styles into beautiful, colored CSS components.
- **Automated Mermaid Flowcharts**: Direct compilation of Mermaid graph text natively into scalable, interactive SVG diagrams.

### Professional Quality-of-Life (QoL)
- **Fluid Importing**: Drag-and-drop or URL-fetch directly into the editor for instant `.md`/`.txt` document imports via the integrated Import Dialog.
- **Theme-Aware UI**: A fully responsive, modern interface with a premium, theme-aware Design System—including our custom, dynamic GitHub star badge.
- **Robust Keyboard Bindings**: `Ctrl+S` (Save), `Ctrl+Z` (Undo/Redo), `Ctrl+\` (Toggle sidebar), `Ctrl+Shift+F` (Focus Mode), and `Alt+1/2/3` for switching between layout views.
- **Intelligent Structure Processing**: Automated dynamic Table of Contents (ToC) injections and Header numbering based on document heading hierarchy.
- **Full Custom Presets**: Download and share your serialized configuration blobs, ensuring your styles stay consistent across sessions.

## Technology Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Directory, Turbopack)
- **UI & Layout Structure**: [React 19](https://reactjs.org), [Tailwind CSS v4](https://tailwindcss.com/)
- **Component Library**: shadcn/ui featuring headless @base-ui primitives alongside robust `react-resizable-panels`.
- **State Management**: `zustand` featuring multi-store chunking with browser-persistent state synchronization.
- **Markdown Architecture**: [CodeMirror 6](https://codemirror.net/) editing paired with a [unified.js](https://unifiedjs.com/) (`remark`/`rehype`) pipeline featuring custom `unist-util-visit` parsers.

## Quickstart Guide

### Pre-requisites
Make sure you have `pnpm` and Node.js installed (> v18.x.x recommended).

### Install & Launch
Run the following commands:
```bash
# Clone the repository
git clone https://github.com/DhavalDudheliya/InkDown.git
cd inkdown

# Native dependency resolution
pnpm install

# Start the NextJS 16 dev server using Turbopack
pnpm dev
```
Navigate to `http://localhost:3000/editor` to access the full editor UI.

## Deployment Process

Deploying InkDown is completely self-contained since its entire processing architecture operates inside standard browser APIs (`window.print()`, `URL.createObjectURL()`, `localStorage`).
Deploy as a static web application to Vercel, Netlify, or Cloudflare Pages instantly using standard Next.js building rules.

```bash
pnpm run build
pnpm run start
```

## Available Scripts

- `pnpm dev` - Starts the development server using Turbopack
- `pnpm build` - Creates an optimized production build
- `pnpm start` - Starts the Next.js production server
- `pnpm lint` - Runs Biome/ESLint checks across all files

## Future Roadmap

- **IndexedDB Mapping**: Expanding preset and document storage mechanisms for larger data profiles.
- **Multi-Document Tabbing**: Enabling a concurrent editing experience without overwriting active storages.
- **Real-time Collaboration**: Investigating CRDT-based local-first synchronization.

Enjoy exploring the frontier of lightweight web typography with InkDown!
