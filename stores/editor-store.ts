import { create } from "zustand"

export type ViewMode = "split" | "editor" | "preview"
export type KeyBindings = "default" | "vim" | "emacs"

interface EditorState {
  viewMode: ViewMode
  keyBindings: KeyBindings
  tabSize: number
  wordWrap: boolean
  showLineNumbers: boolean
  focusMode: boolean
  sidebarOpen: boolean
}

interface EditorActions {
  setViewMode: (mode: ViewMode) => void
  setKeyBindings: (bindings: KeyBindings) => void
  setTabSize: (size: number) => void
  setWordWrap: (wrap: boolean) => void
  setShowLineNumbers: (show: boolean) => void
  toggleFocusMode: () => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useEditorStore = create<EditorState & EditorActions>((set) => ({
  viewMode: "split",
  keyBindings: "default",
  tabSize: 2,
  wordWrap: true,
  showLineNumbers: true,
  focusMode: false,
  sidebarOpen: true,

  setViewMode: (viewMode) => set({ viewMode }),
  setKeyBindings: (keyBindings) => set({ keyBindings }),
  setTabSize: (tabSize) => set({ tabSize }),
  setWordWrap: (wordWrap) => set({ wordWrap }),
  setShowLineNumbers: (showLineNumbers) => set({ showLineNumbers }),
  toggleFocusMode: () =>
    set((state) => ({
      focusMode: !state.focusMode,
      sidebarOpen: state.focusMode ? state.sidebarOpen : false,
    })),
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}))
