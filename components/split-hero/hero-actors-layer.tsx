"use client"

import { cn } from "@/lib/utils"
import { AsciiAtlasActor } from "./ascii-atlas-actor"
import { AsciiVitruvianActor } from "./ascii-vitruvian-actor"

interface HeroActorsLayerProps {
  className?: string
}

export function HeroActorsLayer({ className }: HeroActorsLayerProps) {
  return (
    <div className={cn("hero-actors-layer absolute inset-0 z-[15] overflow-hidden pointer-events-none", className)}>
      <div className="hero-actor-left absolute inset-0 flex items-center justify-start pl-[2vw] md:pl-[4vw]">
        <div className="relative h-[88vh] w-[40vw] min-w-[240px] max-w-[700px]">
          <AsciiAtlasActor className="hero-actor hero-actor-atlas absolute inset-0" />
        </div>
      </div>

      <div className="hero-actor-right absolute inset-0 flex items-center justify-end pr-[1vw] md:pr-[2vw]">
        <div className="relative h-[88vh] w-[44vw] min-w-[280px] max-w-[820px]">
          <AsciiVitruvianActor className="hero-actor hero-actor-vitruvian absolute inset-0" />
        </div>
      </div>
    </div>
  )
}
