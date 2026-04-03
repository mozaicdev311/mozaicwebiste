"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

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
  
  // Performance Throttle State
  const isPausedRef = useRef(false)

  useEffect(() => {
    // -----------------------------------------------------
    // CPU THROTTLE: Listen for cinematic warp to freeze GPU
    // -----------------------------------------------------
    const handleWarpState = (e: any) => {
      isPausedRef.current = e.detail.isWarping;
      if (e.detail.isWarping && videoRef.current) {
        videoRef.current.pause();
      } else if (!e.detail.isWarping && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };
    window.addEventListener("mozaic-warp-state", handleWarpState);
    // -----------------------------------------------------

    const container = containerRef.current
    const canvas = canvasRef.current
    const video = videoRef.current

    if (!container || !canvas || !video) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const offscreenCanvas = document.createElement("canvas")
    const offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true })

    if (!offscreenCtx) return

    const syncCanvasSize = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.max(1, Math.round(rect.width))
      const height = Math.max(1, Math.round(rect.height))

      canvas.width = width
      canvas.height = height
      offscreenCanvas.width = width
      offscreenCanvas.height = height

      ctx.imageSmoothingEnabled = false
      offscreenCtx.imageSmoothingEnabled = true
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
    void video.play().catch(() => {})

    const renderFrame = () => {
      // -----------------------------------------------------
      // PERFORMANCE LOCK: Skip heavy calculations if warping
      // -----------------------------------------------------
      if (isPausedRef.current) {
        animationFrameRef.current = requestAnimationFrame(renderFrame)
        return
      }

      const width = canvas.width
      const height = canvas.height

      if (!width || !height) {
        animationFrameRef.current = requestAnimationFrame(renderFrame)
        return
      }

      const isMobileViewport = window.innerWidth < 1024
      const heightScale = isMobileViewport ? tuning.mobileHeightScale : tuning.desktopHeightScale
      const maxWidthScale = isMobileViewport ? tuning.mobileMaxWidthScale : tuning.desktopMaxWidthScale
      const yAlign = isMobileViewport ? tuning.mobileYAlign : tuning.desktopYAlign

      ctx.clearRect(0, 0, width, height)
      offscreenCtx.clearRect(0, 0, width, height)

      if (video.readyState >= 2) {
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
      }

      const imageData = offscreenCtx.getImageData(0, 0, width, height)
      const pixels = imageData.data
      const step = Math.max(2, Math.floor(width / tuning.sampleDensity))

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

      animationFrameRef.current = requestAnimationFrame(renderFrame)
    }

    animationFrameRef.current = requestAnimationFrame(renderFrame)

    return () => {
      window.removeEventListener("mozaic-warp-state", handleWarpState)
      resizeObserver.disconnect()
      video.removeEventListener("timeupdate", keepLoopSeamless)

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
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
