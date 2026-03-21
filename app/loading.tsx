import { Logo } from "@/components/common"

export default function Loading() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center">
      <div className="animate-in fade-in zoom-in duration-700 ease-out">
        <Logo size="lg" className="mb-4 animate-pulse opacity-80" />
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
        </div>
        <p className="mt-2 font-medium tracking-tight text-muted-foreground animate-in slide-in-from-bottom-2 fade-in duration-1000">
          Preparing your workspace...
        </p>
      </div>

      {/* Modern loading skeleton preview (subtle background) */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-20" />
    </div>
  )
}
