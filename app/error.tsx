"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-destructive/10 blur-3xl" />
        </div>
        <AlertCircle className="relative z-10 h-16 w-16 text-destructive" />
      </div>

      <div className="relative z-10 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Something went wrong
        </h2>
        <p className="mx-auto max-w-[400px] text-muted-foreground sm:text-lg">
          We encountered an unexpected error. Don&apos;t worry, your work is likely safe.
        </p>
        
        {error.digest && (
          <p className="mx-auto max-w-sm rounded border border-border bg-muted/50 p-2 font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button onClick={() => reset()} size="lg" className="rounded-full px-8">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try again
        </Button>
        <Button onClick={() => window.location.href = "/"} variant="outline" size="lg" className="rounded-full px-8">
          Home
        </Button>
      </div>

      <div className="mt-20 flex flex-col items-center gap-1 opacity-10">
        <div className="h-px w-48 bg-foreground" />
      </div>
    </div>
  )
}
