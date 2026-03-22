"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

const sizeMap = {
  sm: { icon: 20, text: "text-sm" },
  md: { icon: 24, text: "text-base" },
  lg: { icon: 32, text: "text-xl" },
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const { icon, text } = sizeMap[size]

  return (
    <div id="tour-logo" className={cn("flex items-center gap-2", className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Pen nib body */}
        <path
          d="M8 28L4 24L20 4L28 8L8 28Z"
          className="fill-primary"
          strokeLinejoin="round"
        />
        {/* Pen tip */}
        <path d="M4 24L3 29L8 28L4 24Z" className="fill-primary/80" />
        {/* Ink drop */}
        <circle cx="24" cy="24" r="4" className="fill-primary/60" />
        {/* Highlight line */}
        <path
          d="M12 22L22 8"
          className="stroke-primary-foreground/40"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <span
          className={cn("font-semibold tracking-tight text-foreground", text)}
        >
          InkDown
        </span>
      )}
    </div>
  )
}
