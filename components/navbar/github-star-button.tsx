"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function GithubStarButton() {
  const [stars, setStars] = useState<number | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Fetch star count from GitHub API
    fetch("https://api.github.com/repos/DhavalDudheliya/InkDown")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count)
        }
      })
      .catch((err) => console.error("Error fetching GitHub stars:", err))
  }, [])

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k"
    }
    return count.toString()
  }

  // Determine which icon to use
  const iconSrc = mounted && resolvedTheme === "dark" ? "/github_dark.svg" : "/github_light.svg"

  return (
    <Tooltip>
      <TooltipTrigger
        render={(props) => (
          <a
            {...props}
            href="https://github.com/DhavalDudheliya/InkDown"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex h-6 items-center gap-2 rounded-full border border-primary/50 bg-primary/5 px-3 text-[13px] font-semibold shadow-xs transition-all cursor-pointer"
            )}
          >
            <div className="relative h-4 w-4">
              <Image
                src={iconSrc}
                alt="GitHub"
                fill
                className="object-contain transition-opacity"
                priority
              />
            </div>
            {stars !== null && (
              <span className="text-primary transition-colors group-hover:text-primary/80">
                {formatStars(stars)}
              </span>
            )}
          </a>
        )}
      />
      <TooltipContent
        side="top"
        sideOffset={8}
        className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-900 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
      >
        {stars !== null ? `${stars.toLocaleString()} stars` : "Star on GitHub"}
      </TooltipContent>
    </Tooltip>
  )
}
