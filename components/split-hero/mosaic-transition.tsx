"use client"

import { useEffect, useRef, forwardRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const MosaicTransitionOverlay = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const centerX = viewportWidth / 2
    const centerY = viewportHeight / 2
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)

    // Clear previous
    container.innerHTML = ""

    let currentY = 0
    while (currentY < viewportHeight) {
      let currentX = 0
      const baseHeight = [40, 60, 80][Math.floor(Math.random() * 3)]

      while (currentX < viewportWidth) {
        const tw = [40, 60, 80, 120][Math.floor(Math.random() * 4)]
        const th = baseHeight 

        const tile = document.createElement("div")
        tile.className = "mosaic-tile"
        tile.style.position = "absolute"
        tile.style.left = currentX + "px"
        tile.style.top = currentY + "px"
        tile.style.width = tw + "px"
        tile.style.height = th + "px"
        tile.style.backgroundColor = "#0A0A0A"
        tile.style.opacity = "0"
        tile.style.pointerEvents = "none"

        const tileCenterX = currentX + tw / 2
        const tileCenterY = currentY + th / 2
        const dist = Math.sqrt(
          Math.pow(tileCenterX - centerX, 2) + Math.pow(tileCenterY - centerY, 2)
        )
        const normalizedDist = dist / maxDistance
        
        const activationProgress = 0.25 + normalizedDist * 0.35
        tile.setAttribute("data-activation", activationProgress.toString())

        container.appendChild(tile)
        currentX += tw
      }
      currentY += baseHeight
    }
  }, [])

  return (
    <div
      ref={(node) => {
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          (ref as any).current = node
        }
        (containerRef as any).current = node
      }}
      className="absolute inset-0 z-40 pointer-events-none overflow-hidden"
    />
  )
})

MosaicTransitionOverlay.displayName = "MosaicTransitionOverlay"
