"use client"

import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SplitHeroPanelProps {
  side: "left" | "right"
  isHovered: boolean
  isLocked: boolean
  onHover: () => void
  onHoverEnd: () => void
  children: React.ReactNode
}

export const SplitHeroPanel = forwardRef<HTMLDivElement, SplitHeroPanelProps>(({
  side,
  isHovered,
  isLocked,
  onHover,
  onHoverEnd,
  children,
}, ref) => {
  const isLeft = side === "left"

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden pointer-events-auto panel-container",
        !isLocked && "cursor-pointer"
      )}
      onMouseEnter={!isLocked ? onHover : undefined}
      onMouseLeave={!isLocked ? onHoverEnd : undefined}
    >
      {/* Background overlay for dimming/focus */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500 z-10 panel-overlay",
          isHovered ? "bg-black/0" : "bg-black/20"
        )}
      />

      {/* Corner Brackets */}
      <div
        className={cn(
          "panel-bracket absolute w-8 h-8 lg:w-12 lg:h-12 border-t-2 z-20 transition-colors duration-300 border-white/15",
          isLeft ? "top-0 left-0 border-l-2" : "top-0 right-0 border-r-2",
        )}
      />
      <div
        className={cn(
          "panel-bracket absolute w-8 h-8 lg:w-12 lg:h-12 border-b-2 z-20 transition-colors duration-300 border-white/15",
          isLeft ? "bottom-[5vh] left-0 border-l-2" : "bottom-[5vh] right-0 border-r-2",
        )}
      />

      {/* Content Container */}
      <div className="relative h-full w-full z-20">{children}</div>
    </div>
  )
})
SplitHeroPanel.displayName = "SplitHeroPanel"
