"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface HeroSeamProps {
  className?: string
}

export const HeroSeam = forwardRef<HTMLDivElement, HeroSeamProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "hero-seam absolute top-0 bottom-0 z-30 w-[1px] bg-white/30",
          className
        )}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          boxShadow: "0 0 6px rgba(255, 255, 255, 0.08)"
        }}
      >
      </div>
    )
  }
)

HeroSeam.displayName = "HeroSeam"
