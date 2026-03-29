"use client"

import { AsciiActor } from "./ascii-actor"

interface AsciiAtlasActorProps {
  className?: string
  videoSrc?: string
}

export function AsciiAtlasActor({
  className,
  videoSrc = "/media/hero/shared/atlas-ascii.mp4",
}: AsciiAtlasActorProps) {
  return (
    <AsciiActor
      className={className}
      videoSrc={videoSrc}
      tuning={{
        desktopHeightScale: 1.18,
        mobileHeightScale: 1.1,
        desktopMaxWidthScale: 1.7,
        mobileMaxWidthScale: 1.44,
        desktopHorizontalAnchor: "left",
        desktopXOffset: -0.22,
        mobileXOffsetMode: "center",
        desktopYAlign: 0.5,
        mobileYAlign: 0.58,
        sampleDensity: 150,
        brightnessThreshold: 0.05,
        squareScale: 0.4,
        alphaMultiplier: 2.2,
        maxAlpha: 1.0,
      }}
    />
  )
}
