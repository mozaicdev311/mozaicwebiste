"use client"

import { useState, useEffect } from "react"
import { SharedBackground, SharedTopBar, SharedBottomBar } from "./shared-elements"
import { SplitHeroPanel } from "./split-hero-panel"
import { StudioContent } from "./studio-content"
import { TechContent } from "./tech-content"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

type ViewState = "split" | "studio" | "tech"

import { cn } from "@/lib/utils"

export default function SplitHero() {
  const [viewState, setViewState] = useState<ViewState>("split")
  const [hoveredPanel, setHoveredPanel] = useState<"left" | "right" | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Calculate panel widths for desktop split view
  const getPanelWidth = (side: "left" | "right") => {
    // Mobile is handled by CSS (100% width always)
    if (isMobile) return "100%"

    // Expanded States - Logic to handle full width expansion
    if (viewState === "studio") return side === "left" ? "100%" : "0%"
    if (viewState === "tech") return side === "right" ? "100%" : "0%"

    // Split State (Default)
    // Subtract 1px to account for the 2px gap (1px from each side)
    if (hoveredPanel === null) return "calc(50% - 1px)"
    if (hoveredPanel === side) return "calc(60% - 1px)"
    return "calc(40% - 1px)"
  }

  const handleBack = () => {
    setViewState("split")
    setHoveredPanel(null)
  }

  return (
    <main className="relative h-screen overflow-hidden bg-black">
      {/* Shared Background Layer (Z-Index 0) */}
      <SharedBackground viewState={viewState} hoveredPanel={hoveredPanel} isMobile={isMobile} />

      {/* Shared UI Layer (Z-Index 50) */}
      <SharedTopBar />
      <SharedBottomBar />

      {/* Back Button (Visible only when expanded) */}
      {viewState !== "split" && (
        <div className="absolute top-24 left-4 lg:left-8 z-[60] animate-in fade-in duration-500">
          <Button
            variant="outline"
            onClick={handleBack}
            className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-black transition-colors gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO SPLIT
          </Button>
        </div>
      )}

      {/* Panels Container */}
      <div className={cn(
        "relative w-full h-screen flex flex-col lg:flex-row",
        viewState === "split" ? "gap-0.5" : "gap-0"
      )}>
        {/* Left Panel (STUDIO) */}
        <div
          className="relative transition-all duration-500 ease-out"
          style={{
            width: isMobile ? "100%" : getPanelWidth("left"),
            height: isMobile ? (viewState === "split" ? "50vh" : viewState === "studio" ? "100vh" : "0vh") : "100%",
            zIndex: viewState === "studio" ? 40 : 20,
          }}
        >
          <SplitHeroPanel
            side="left"
            accentColor="red"
            isExpanded={viewState === "studio"}
            isHidden={viewState === "tech"}
            onHover={() => setHoveredPanel("left")}
            onHoverEnd={() => setHoveredPanel(null)}
            onExpand={() => setViewState("studio")}
          >
            <StudioContent isExpanded={viewState === "studio"} onExpand={() => setViewState("studio")} />
          </SplitHeroPanel>
        </div>

        {/* Right Panel (TECH) */}
        <div
          className="relative transition-all duration-500 ease-out"
          style={{
            width: isMobile ? "100%" : getPanelWidth("right"),
            height: isMobile ? (viewState === "split" ? "50vh" : viewState === "tech" ? "100vh" : "0vh") : "100%",
            zIndex: viewState === "tech" ? 40 : 20,
          }}
        >
          <SplitHeroPanel
            side="right"
            accentColor="white"
            isExpanded={viewState === "tech"}
            isHidden={viewState === "studio"}
            onHover={() => setHoveredPanel("right")}
            onHoverEnd={() => setHoveredPanel(null)}
            onExpand={() => setViewState("tech")}
          >
            <TechContent isExpanded={viewState === "tech"} onExpand={() => setViewState("tech")} />
          </SplitHeroPanel>
        </div>
      </div>
    </main>
  )
}

