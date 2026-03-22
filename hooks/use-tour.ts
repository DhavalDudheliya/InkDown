"use client"

import { useCallback } from "react"
import { driver } from "driver.js"
import "driver.js/dist/driver.css"

export function useTour() {
  const startTour = useCallback(() => {
    const driverObj = driver({
      showProgress: true,
      popoverClass: "inkdown-tour-popover",
      steps: [
        {
          popover: {
            title: "Welcome to InkDown",
            description:
              "InkDown is a modern, powerful markdown editor designed for speed and beauty. Let's take a quick look around!",
            side: "bottom",
            align: "start",
          },
        },
        {
          element: "#tour-file-name",
          popover: {
            title: "File Name",
            description: "Click here to rename your document. It's that easy!",
            side: "bottom",
            align: "start",
          },
        },
        {
          element: "#tour-editor",
          popover: {
            title: "Markdown Editor",
            description:
              "This is where the magic happens. Write your markdown here with full syntax highlighting, math support, and more.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#tour-preview",
          popover: {
            title: "Live Preview",
            description:
              "See your document rendered in real-time. What you see is exactly what you get when exporting.",
            side: "left",
            align: "start",
          },
        },
        {
          element: "#tour-undo-redo",
          popover: {
            title: "History",
            description:
              "Made a mistake? Use undo and redo to navigate through your changes.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#tour-view-modes",
          popover: {
            title: "View Modes",
            description:
              "Switch between split view, editor-only, or preview-only modes depending on your workflow.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#tour-theme-toggle",
          popover: {
            title: "Dark Mode",
            description:
              "Switch between light and dark modes to suit your preference.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#tour-sidebar-toggle",
          popover: {
            title: "Style Sidebar",
            description:
              "Open the sidebar to customize your document's typography, colors, and layout.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#tour-import",
          popover: {
            title: "Import Files",
            description:
              "Have an existing markdown file? Import it from your computer or a URL.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#tour-export",
          popover: {
            title: "Export Options",
            description:
              "Once you're happy with your work, export it as a high-quality PDF, HTML, or Markdown file.",
            side: "bottom",
            align: "end",
          },
        },
        {
          popover: {
            title: "You're All Set!",
            description:
              "You're now ready to use InkDown. If you ever need this tour again, just click the help icon in the navbar. Happy writing!",
            side: "bottom",
            align: "center",
          },
        },
      ],
    })

    driverObj.drive()
  }, [])

  return { startTour }
}
