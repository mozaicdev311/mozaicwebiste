"use client"

import { cn } from "@/lib/utils"
import { AsciiAtlasActor } from "./ascii-atlas-actor"
import { AsciiVitruvianActor } from "./ascii-vitruvian-actor"

interface HeroActorsLayerProps {
  className?: string
}

export function HeroActorsLayer({ className }: HeroActorsLayerProps) {
  return (
    <div className={cn("hero-actors-layer absolute inset-0 z-[5] overflow-hidden pointer-events-none", className)}>
      {/* ATLAS ACTOR - Pushed far LEFT */}
      <div className="hero-actor-left absolute inset-y-0 left-0 flex items-center justify-start w-[50%] overflow-hidden">
        <div 
          className="relative h-[85vh] w-[85vh] opacity-80 mix-blend-screen"
          style={{ transform: 'translateX(-25%)' }} // Force pull it left
        >
          <AsciiAtlasActor className="hero-actor hero-actor-atlas absolute inset-0 w-full h-full object-contain object-left" />
        </div>
      </div>

      {/* VITRUVIAN ACTOR - Pushed far RIGHT */}
      <div className="hero-actor-right absolute inset-y-0 right-0 flex items-center justify-end w-[50%] overflow-hidden">
        <div 
          className="relative h-[85vh] w-[85vh] opacity-80 mix-blend-screen"
          style={{ transform: 'translateX(25%)' }} // Force pull it right
        >
          <AsciiVitruvianActor className="hero-actor hero-actor-vitruvian absolute inset-0 w-full h-full object-contain object-right" />
        </div>
      </div>
    </div>
  )
}
