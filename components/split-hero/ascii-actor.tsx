"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type HeroAsciiMode = "full" | "reduced" | "paused"

interface HeroStateEventDetail {
  asciiMode?: HeroAsciiMode
  isWarping?: boolean
}

interface AsciiActorTuning {
  desktopHeightScale: number
  mobileHeightScale: number
  desktopMaxWidthScale: number
  mobileMaxWidthScale: number
  desktopHorizontalAnchor: "left" | "right" | "center"
  desktopXOffset: number
  mobileXOffsetMode: "center"
  desktopYAlign: number
  mobileYAlign: number
  sampleDensity: number
  brightnessThreshold: number
  squareScale: number
  alphaMultiplier: number
  maxAlpha: number
}

interface AsciiActorProps {
  className?: string
  videoSrc: string
  tuning: AsciiActorTuning
}

export function AsciiActor({ className, videoSrc, tuning }: AsciiActorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const renderLoopRunningRef = useRef(false)
  const asciiModeRef = useRef<HeroAsciiMode>("full")

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const video = videoRef.current

    if (!container || !canvas || !video) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const offscreenCanvas = document.createElement("canvas")
    const offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true })

    if (!offscreenCtx) return

    let lastRenderTime = 0
    let lastVideoTime = -1

    const syncCanvasSize = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.max(1, Math.round(rect.width))
      const height = Math.max(1, Math.round(rect.height))

      if (canvas.width === width && canvas.height === height) {
        return
      }

      canvas.width = width
      canvas.height = height
      offscreenCanvas.width = width
      offscreenCanvas.height = height

      ctx.imageSmoothingEnabled = false
      offscreenCtx.imageSmoothingEnabled = true
    }

    const getFrameInterval = () => {
      return asciiModeRef.current === "full" ? 1000 / 18 : 1000 / 10
    }

    const getSampleDensity = () => {
      return asciiModeRef.current === "full"
        ? tuning.sampleDensity
        : Math.max(84, Math.floor(tuning.sampleDensity * 0.68))
    }

    const stopRenderLoop = () => {
      renderLoopRunningRef.current = false

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }

    const scheduleNextFrame = () => {
      if (!renderLoopRunningRef.current) {
        return
      }

      animationFrameRef.current = requestAnimationFrame(renderFrame)
    }

    const startRenderLoop = () => {
      if (renderLoopRunningRef.current || asciiModeRef.current === "paused") {
        return
      }

      renderLoopRunningRef.current = true
      scheduleNextFrame()
    }

    const applyAsciiMode = (mode: HeroAsciiMode) => {
      if (asciiModeRef.current === mode) {
        return
      }

      asciiModeRef.current = mode

      if (mode === "paused") {
        stopRenderLoop()
        video.pause()
        return
      }

      lastRenderTime = 0
      lastVideoTime = -1
      void video.play().catch(() => {})
      startRenderLoop()
    }

    const resizeObserver = new ResizeObserver(syncCanvasSize)
    resizeObserver.observe(container)
    syncCanvasSize()

    const keepLoopSeamless = () => {
      if (video.duration && video.currentTime >= video.duration - 0.05) {
        video.currentTime = 0.001
        void video.play().catch(() => {})
      }
    }

    video.addEventListener("timeupdate", keepLoopSeamless)

    const renderFrame = (now: number) => {
      const width = canvas.width
      const height = canvas.height

      if (!width || !height) {
        scheduleNextFrame()
        return
      }

      if (now - lastRenderTime < getFrameInterval()) {
        scheduleNextFrame()
        return
      }

      if (video.readyState < 2) {
        scheduleNextFrame()
        return
      }

      if (video.currentTime === lastVideoTime && asciiModeRef.current === "full") {
        scheduleNextFrame()
        return
      }

      lastRenderTime = now
      lastVideoTime = video.currentTime

      const isMobileViewport = window.innerWidth < 1024
      const heightScale = isMobileViewport ? tuning.mobileHeightScale : tuning.desktopHeightScale
      const maxWidthScale = isMobileViewport ? tuning.mobileMaxWidthScale : tuning.desktopMaxWidthScale
      const yAlign = isMobileViewport ? tuning.mobileYAlign : tuning.desktopYAlign

      ctx.clearRect(0, 0, width, height)
      offscreenCtx.clearRect(0, 0, width, height)

      const videoAspect = video.videoWidth ? video.videoWidth / video.videoHeight : 16 / 9
      let figureHeight = height * heightScale
      let figureWidth = figureHeight * videoAspect
      const maxWidth = width * maxWidthScale

      if (figureWidth > maxWidth) {
        figureWidth = maxWidth
        figureHeight = figureWidth / videoAspect
      }

      const drawX =
        tuning.mobileXOffsetMode === "center" && isMobileViewport
          ? (width - figureWidth) / 2
          : tuning.desktopHorizontalAnchor === "right"
            ? width - figureWidth + width * tuning.desktopXOffset
            : tuning.desktopHorizontalAnchor === "center"
              ? (width - figureWidth) / 2 + width * tuning.desktopXOffset
              : width * tuning.desktopXOffset
      const drawY = (height - figureHeight) * yAlign

      offscreenCtx.drawImage(video, drawX, drawY, figureWidth, figureHeight)

      const imageData = offscreenCtx.getImageData(0, 0, width, height)
      const pixels = imageData.data
      const step = Math.max(2, Math.floor(width / getSampleDensity()))

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4
          const brightness =
            (pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114) / 255

          if (brightness < tuning.brightnessThreshold) continue

          const size = Math.max(1, brightness * step * tuning.squareScale)
          const alpha = Math.min(tuning.maxAlpha, brightness * tuning.alphaMultiplier)

          ctx.fillStyle = `rgba(226, 226, 226, ${alpha})`
          ctx.fillRect(x - size / 2, y - size / 2, size, size)
        }
      }

      scheduleNextFrame()
    }

    const handleHeroState = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return
      }

      const detail = event.detail as HeroStateEventDetail
      if (detail.asciiMode) {
        applyAsciiMode(detail.asciiMode)
      }
    }

    const handleWarpState = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return
      }

      const detail = event.detail as HeroStateEventDetail
      if (typeof detail.isWarping === "boolean") {
        if (detail.isWarping) {
          applyAsciiMode("paused")
        } else if (asciiModeRef.current === "paused") {
          applyAsciiMode("full")
        }
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopRenderLoop()
        video.pause()
        return
      }

      if (asciiModeRef.current !== "paused") {
        void video.play().catch(() => {})
        startRenderLoop()
      }
    }

    window.addEventListener("mozaic-hero-state", handleHeroState)
    window.addEventListener("mozaic-warp-state", handleWarpState)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    void video.play().catch(() => {})
    startRenderLoop()

    return () => {
      window.removeEventListener("mozaic-hero-state", handleHeroState)
      window.removeEventListener("mozaic-warp-state", handleWarpState)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      resizeObserver.disconnect()
      video.removeEventListener("timeupdate", keepLoopSeamless)
      stopRenderLoop()
    }
  }, [tuning, videoSrc])

  return (
    <div ref={containerRef} aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <video
        ref={videoRef}
        src={videoSrc}
        className="hidden"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full mix-blend-screen" />
    </div>
  )
}
