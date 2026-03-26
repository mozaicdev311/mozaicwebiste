"use client"

import { AsciiActor } from "./ascii-actor"

interface AsciiVitruvianActorProps {
  className?: string
  videoSrc?: string
}

export function AsciiVitruvianActor({
  className,
  videoSrc = "/media/hero/shared/vitruvian-ascii.mp4",
}: AsciiVitruvianActorProps) {
  return (
    <AsciiActor
      className={className}
      videoSrc={videoSrc}
      tuning={{
        desktopHeightScale: 1.155,
        mobileHeightScale: 1.06,
        desktopMaxWidthScale: 1.18,
        mobileMaxWidthScale: 1.34,
        desktopHorizontalAnchor: "center",
        desktopXOffset: 0.08,
        mobileXOffsetMode: "center",
        desktopYAlign: 0.5,
        mobileYAlign: 0.56,
        sampleDensity: 150,
        brightnessThreshold: 0.075,
        squareScale: 0.44,
        alphaMultiplier: 1.7,
        maxAlpha: 0.94,
      }}
    />
  )
}
