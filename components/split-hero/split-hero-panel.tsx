"use client"

import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SplitHeroPanelProps {
  side: "left" | "right"
  children: React.ReactNode
  className?: string
}

export const SplitHeroPanel = forwardRef<HTMLDivElement, SplitHeroPanelProps>(({
  side,
  children,
  className
}, ref) => {
  const isLeft = side === "left"

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={cn(
        "panel-container relative h-full overflow-hidden pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        className
      )}
      data-side={side}
    >
      {/* Background overlay for dimming/focus */}
      <div className="panel-overlay absolute inset-0 z-10 bg-black/20" />

      {/* Corner Brackets */}
      <div
        className={cn(
          "panel-bracket absolute w-8 h-8 lg:w-12 lg:h-12 border-t-2 z-20 border-white/15",
          isLeft ? "top-0 left-0 border-l-2" : "top-0 right-0 border-r-2",
        )}
      />
      <div
        className={cn(
          "panel-bracket absolute w-8 h-8 lg:w-12 lg:h-12 border-b-2 z-20 border-white/15",
          isLeft ? "bottom-[5vh] left-0 border-l-2" : "bottom-[5vh] right-0 border-r-2",
        )}
      />

      {/* Content Container */}
      <div className="relative h-full w-full z-20">{children}</div>
    </div>
  )
})
SplitHeroPanel.displayName = "SplitHeroPanel"
