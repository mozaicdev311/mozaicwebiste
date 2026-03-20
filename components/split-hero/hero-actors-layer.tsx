"use client"

import { cn } from "@/lib/utils"

interface HeroActorsLayerProps {
  className?: string
}

interface ActorVideoBasicProps {
  className: string
  desktopSrc: string
  mobileSrc: string
  objectPosition: string
}

function ActorVideoBasic({ className, desktopSrc, mobileSrc, objectPosition }: ActorVideoBasicProps) {
  return (
    <div className={cn("hero-actor pointer-events-none absolute inset-0", className)}>
      <video
        className="hidden h-full w-full object-contain mix-blend-screen lg:block"
        src={desktopSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ objectPosition }}
      />
      <video
        className="h-full w-full object-contain mix-blend-screen lg:hidden"
        src={mobileSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ objectPosition }}
      />
    </div>
  )
}

export function HeroActorsLayer({ className }: HeroActorsLayerProps) {
  return (
    <div className={cn("hero-actors-layer absolute inset-0 z-[15] overflow-hidden pointer-events-none", className)}>
      <div className="hero-actor-left absolute inset-0 flex items-center justify-start pl-[2vw] md:pl-[4vw]">
        <div className="relative h-[88vh] w-[40vw] min-w-[240px] max-w-[700px]">
          <ActorVideoBasic
            className="hero-actor-atlas"
            desktopSrc="/media/hero/desktop/atlas-desktop.webm"
            mobileSrc="/media/hero/mobile/atlas-mobile.webm"
            objectPosition="left center"
          />
        </div>
      </div>

      <div className="hero-actor-right absolute inset-0 flex items-center justify-end pr-[2vw] md:pr-[4vw]">
        <div className="relative h-[84vh] w-[36vw] min-w-[220px] max-w-[620px]">
          <ActorVideoBasic
            className="hero-actor-vitruvian"
            desktopSrc="/media/hero/desktop/vitruvian-desktop.webm"
            mobileSrc="/media/hero/mobile/vitruvian-mobile.webm"
            objectPosition="right center"
          />
        </div>
      </div>
    </div>
  )
}
