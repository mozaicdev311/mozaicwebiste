"use client"

import { forwardRef } from "react"
import Image from "next/image"
import Link from "next/link"
import NavMenu from "@/components/ui/menu-hover-effects"

export const SharedBackground = forwardRef<HTMLDivElement, { isMobile: boolean }>(
  ({ isMobile }, ref) => {
    return (
      <div ref={ref} className="absolute inset-0 z-0 pointer-events-none bg-black hero-canvases-container overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0)_28%,rgba(0,0,0,1)_72%)]" />

        <div
          className="canvas-left absolute inset-0"
          style={{
            opacity: isMobile ? 0.3 : 0.48,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_60%)]" />
        </div>

        <div
          className="canvas-right absolute inset-0"
          style={{
            opacity: isMobile ? 0.3 : 0.48,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_60%)]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "center center"
          }}
        />
      </div>
    )
  }
)
SharedBackground.displayName = "SharedBackground"

export const SharedTopBar = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div ref={ref} className="absolute top-0 left-0 right-0 z-50 pointer-events-none hero-topbar">
      <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between pointer-events-auto border-b border-white/20">
        <div className="flex gap-2 lg:gap-4 items-center relative z-[60]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fichier%201HD_New_Mozaic_Opt1-RK66SS2l1DT94G5RIbxu7IbwIHkQ4A.png"
            alt="MOZAIC"
            width={140}
            height={48}
            className="w-auto brightness-0 invert h-14"
          />
          <div className="h-3 lg:h-4 w-px bg-white/40"></div>
          <span className="text-white/60 text-[8px] lg:text-[10px] font-mono">EST. 2026</span>
        </div>

        <div className="flex items-center">
          <NavMenu />
        </div>
      </div>
    </div>
  )
})
SharedTopBar.displayName = "SharedTopBar"

export const SharedBottomBar = forwardRef<HTMLDivElement, {}>(
  ({}, ref) => {
    return (
      <div
        ref={ref}
        className="absolute left-0 right-0 z-50 border-t border-white/20 bg-black/40 backdrop-blur-sm pointer-events-none hero-bottombar"
        style={{ bottom: 0 }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/50 w-1/3">
            <span className="min-w-[120px] system-status-text">SYSTEM.ACTIVE</span>
            <div className="hidden lg:flex gap-1 h-3 items-end progress-bars">
              {Array.from({ length: 8 }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="w-1 bg-white/30 transition-opacity duration-200"
                    style={{ height: ((i % 3) + 1) * 4 + "px" }}
                  ></div>
                )
              })}
            </div>
            <span>V1.0.0</span>
          </div>

          <div className="flex items-center justify-end gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/50 w-1/3">
            <span className="hidden lg:inline">◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-[#00FF00]/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
            <span className="hidden lg:inline">FRAME: ∞</span>
          </div>
        </div>
      </div>
    )
  }
)
SharedBottomBar.displayName = "SharedBottomBar"
