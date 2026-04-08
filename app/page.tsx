import { Metadata } from "next"
import { EditorPage } from "@/components/editor"

export const metadata: Metadata = {
  title: "InkDown",
  description: "Convert your Markdown instantly to PDF with InkDown.",
}

export default function Page() {
  return <EditorPage />
}
