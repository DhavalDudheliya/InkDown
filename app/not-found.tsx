import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center">
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-bold leading-none text-muted/30 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        </div>
      </div>
      
      <div className="relative z-10 -mt-12 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h2>
        <p className="mx-auto max-w-[400px] text-muted-foreground sm:text-lg">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button size="lg" className="rounded-full px-8">
          <Link href="/editor">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Editor
          </Link>
        </Button>
        <Button variant="ghost" size="lg" className="rounded-full px-8">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="mt-20 flex gap-4 opacity-10">
        <div className="h-px w-24 bg-foreground" />
        <div className="h-px w-8 bg-foreground" />
        <div className="h-px w-24 bg-foreground" />
      </div>
    </div>
  )
}
