import { Metadata } from "next"

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://inkdownn.vercel.app"),
  title: {
    template: "%s | InkDown",
    default: "InkDown - Markdown to PDF Converter",
  },
  description: "Convert your Markdown text and files into beautiful, high-quality PDFs instantly with InkDown.",
  generator: "Next.js",
  applicationName: "InkDown",
  keywords: ["Markdown", "PDF", "Converter", "Export", "Next.js", "React"],
  authors: [{ name: "Dhaval Dudheliya" }],
  creator: "Dhaval Dudheliya",
  publisher: "Dhaval Dudheliya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "InkDown - Markdown to PDF Converter",
    description: "Convert your Markdown text and files into beautiful, high-quality PDFs instantly.",
    url: "https://inkdownn.vercel.app",
    siteName: "InkDown",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InkDown - Markdown to PDF Converter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InkDown",
    description: "Convert your Markdown text and files into beautiful, high-quality PDFs instantly.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
}
