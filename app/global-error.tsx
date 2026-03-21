"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col items-center justify-center bg-background p-6 font-sans text-foreground antialiased">
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 rounded-full bg-destructive/20 blur-3xl animate-pulse" />
          </div>
          <AlertTriangle className="relative z-10 h-20 w-20 text-destructive" />
        </div>

        <div className="relative z-10 max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Critical System Error
          </h1>
          <p className="text-lg text-muted-foreground">
            A critical error occurred in the core engine. We recommend refreshing the application.
          </p>
          
          {error.digest && (
            <div className="mx-auto max-w-xs rounded-lg border border-destructive/20 bg-destructive/5 p-3 font-mono text-xs text-destructive/80">
              Diagnostic ID: {error.digest}
            </div>
          )}

          <div className="pt-8">
            <Button 
              onClick={() => reset()} 
              size="lg" 
              className="h-14 rounded-full px-12 text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 transition-all"
            >
              <RefreshCw className="mr-3 h-5 w-5" />
              Restore System
            </Button>
          </div>
        </div>

        {/* Technical background texture */}
        <div className="absolute inset-0 -z-10 grid grid-cols-[repeat(40,minmax(0,1fr))] grid-rows-[repeat(40,minmax(0,1fr))] opacity-[0.03]">
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="border-t border-l border-foreground" />
          ))}
        </div>
      </body>
    </html>
  )
}
