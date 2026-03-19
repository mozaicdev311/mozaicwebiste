"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface HeroSeamProps {
  position: string // "50%" or "58%" or "42%"
  isActive: boolean
  className?: string
}

export const HeroSeam = forwardRef<HTMLDivElement, HeroSeamProps>(
  ({ position, isActive, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute top-0 bottom-0 z-30 -translate-x-1/2", className)}
        style={{
          left: position,
          transition: isActive ? "none" : "left 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          ...(isActive ? {} : {
            width: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 0 6px rgba(255, 255, 255, 0.08)",
          })
        }}
      >
      </div>
    )
  }
)

HeroSeam.displayName = "HeroSeam"
