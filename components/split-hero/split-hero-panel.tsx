"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SplitHeroPanelProps {
  side: "left" | "right"
  accentColor: "red" | "blue" | "white"
  isExpanded: boolean
  isHidden: boolean
  onHover: () => void
  onHoverEnd: () => void
  onExpand: () => void
  children: React.ReactNode
}

export function SplitHeroPanel({
  side,
  accentColor,
  isExpanded,
  isHidden,
  onHover,
  onHoverEnd,
  onExpand,
  children,
}: SplitHeroPanelProps) {
  const isLeft = side === "left"
  
  let accentHex = "#FFFFFF"
  if (accentColor === "red") accentHex = "#FF0000"
  if (accentColor === "blue") accentHex = "#0000FF"
  // Default/White is #FFFFFF

  // Animation variants
  const variants = {
    initial: {
      x: isLeft ? "-100%" : "100%",
      opacity: 0,
    },
    animate: {
      x: isHidden ? (isLeft ? "-100%" : "100%") : "0%",
      opacity: isHidden ? 0 : 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // expo-out
      },
    },
  }

  return (
    <motion.div
      className={cn(
        "absolute top-0 bottom-0 h-full transition-all duration-500 ease-out overflow-hidden",
        isLeft ? "left-0" : "right-0",
        // Mobile styles
        "w-full h-[50vh] lg:h-full",
        isLeft ? "top-0" : "bottom-0 lg:top-0",
        // Expanded state handling
        isExpanded ? "w-full lg:w-full z-30" : "lg:w-1/2 z-20",
        // Hidden state handling (for mobile vertical stacking)
        isHidden && "pointer-events-none",
      )}
      initial="initial"
      animate="animate"
      variants={variants}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
    >
      {/* Background overlay for dimming/focus */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isExpanded ? "bg-black/0" : "bg-black/20 hover:bg-black/0",
        )}
      />

      {/* Corner Brackets */}
      <div
        className={cn(
          "absolute w-8 h-8 lg:w-12 lg:h-12 border-t-2 z-20 transition-colors duration-300",
          isLeft ? "top-0 left-0 border-l-2" : "top-0 right-0 border-r-2",
        )}
        style={{ borderColor: `${accentHex}4D` }} // 30% opacity
      />
      <div
        className={cn(
          "absolute w-8 h-8 lg:w-12 lg:h-12 border-b-2 z-20 transition-colors duration-300",
          isLeft ? "bottom-[5vh] left-0 border-l-2" : "bottom-[5vh] right-0 border-r-2",
        )}
        style={{ borderColor: `${accentHex}4D` }}
      />

      {/* Content Container */}
      <div className="relative h-full w-full">{children}</div>

      {/* Mobile Expand Button Overlay (only visible on mobile when not expanded) */}
      <div
        className="lg:hidden absolute inset-0 z-40 flex items-center justify-center bg-black/20"
        onClick={onExpand}
        style={{ display: isExpanded ? "none" : "flex" }}
      >
        <span className="sr-only">Tap to explore {side}</span>
      </div>
    </motion.div>
  )
}
