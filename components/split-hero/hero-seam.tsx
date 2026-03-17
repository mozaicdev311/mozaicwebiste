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
        {/* Fracture lines container */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none">
          <div className="fracture-line absolute h-px bg-white/60 left-0 origin-left" style={{ top: "-48px", transform: "rotate(12deg)", width: 0 }} />
          <div className="fracture-line absolute h-px bg-white/60 right-0 origin-right" style={{ top: "32px", transform: "rotate(-8deg)", width: 0 }} />
          <div className="fracture-line absolute h-px bg-white/60 left-0 origin-left" style={{ top: "80px", transform: "rotate(5deg)", width: 0 }} />
          <div className="fracture-line absolute h-px bg-white/60 right-0 origin-right" style={{ top: "-64px", transform: "rotate(-15deg)", width: 0 }} />
        </div>
      </div>
    )
  }
)

HeroSeam.displayName = "HeroSeam"
