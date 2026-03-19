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
          "hero-seam-container absolute inset-0 z-30 pointer-events-none",
          className
        )}
      >
        <div 
          className="hero-seam-main absolute top-0 bottom-0 w-[1px] bg-white/30" 
          style={{ 
            left: "50%", 
            transform: "translateX(-50%)", 
            boxShadow: "0 0 6px rgba(255, 255, 255, 0.08)" 
          }} 
        />
        
        {/* The Overload Burst (Hidden initially) */}
        <div className="overload-lines absolute inset-0 opacity-0 mix-blend-screen">
          {Array.from({ length: 45 }).map((_, i) => (
            <div 
              key={i} 
              className="overload-line absolute top-0 bottom-0 w-[1px] bg-white/80" 
              style={{ 
                left: "50%", 
                transform: "translateX(-50%) scaleY(1)" 
              }} 
            />
          ))}
        </div>
      </div>
    )
  }
)

HeroSeam.displayName = "HeroSeam"
