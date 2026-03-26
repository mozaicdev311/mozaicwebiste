"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AsciiAtlasActorProps {
  className?: string
  videoSrc?: string
}

export function AsciiAtlasActor({
  className,
  videoSrc = "/media/hero/shared/atlas-ascii.mp4",
}: AsciiAtlasActorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)

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

    offscreenCanvasRef.current = offscreenCanvas

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

    const renderFrame = (time: number) => {
      const width = canvas.width
      const height = canvas.height

      if (!width || !height) {
        animationFrameRef.current = requestAnimationFrame(renderFrame)
        return
      }

      const isMobileViewport = window.innerWidth < 1024
      ctx.clearRect(0, 0, width, height)

      if (video.readyState >= 2) {
        const videoAspect = video.videoWidth ? video.videoWidth / video.videoHeight : 16 / 9
        let figureHeight = isMobileViewport ? height * 1.1 : height * 1.18
        let figureWidth = figureHeight * videoAspect
        const maxWidth = isMobileViewport ? width * 1.44 : width * 1.7

        if (figureWidth > maxWidth) {
          figureWidth = maxWidth
          figureHeight = figureWidth / videoAspect
        }

        const drawX = isMobileViewport ? (width - figureWidth) / 2 : width * -0.22
        const drawY = isMobileViewport ? (height - figureHeight) * 0.58 : (height - figureHeight) / 2

        offscreenCtx.clearRect(0, 0, width, height)
        offscreenCtx.drawImage(video, drawX, drawY, figureWidth, figureHeight)
      }

      const imageData = offscreenCtx.getImageData(0, 0, width, height)
      const pixels = imageData.data
      const step = Math.max(2, Math.floor(width / 150))

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4
          const brightness =
            (pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114) / 255

          if (brightness < 0.08) continue

          const size = Math.max(1, brightness * step * 0.46)
          const alpha = Math.min(0.96, brightness * 1.8)

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.fillRect(x - size / 2, y - size / 2, size, size)
        }
      }

      animationFrameRef.current = requestAnimationFrame(renderFrame)
    }

    animationFrameRef.current = requestAnimationFrame(renderFrame)

    return () => {
      resizeObserver.disconnect()
      video.removeEventListener("timeupdate", keepLoopSeamless)

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [videoSrc])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("hero-actor hero-actor-atlas pointer-events-none absolute inset-0", className)}
    >
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
