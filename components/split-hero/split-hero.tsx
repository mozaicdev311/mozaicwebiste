"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { SharedBackground, SharedTopBar, SharedBottomBar } from "./shared-elements"
import { SplitHeroPanel } from "./split-hero-panel"
import { HeroPanelContent } from "./hero-panel-content"
import { HeroSeam } from "./hero-seam"
import { MosaicTransitionOverlay } from "./mosaic-transition"
import { ScrollIndicator } from "./scroll-indicator"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function SplitHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  
  const [hoveredPanel, setHoveredPanel] = useState<"left" | "right" | null>(null)
  const [isLocked, setIsLocked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // HUD States
  const systemTextRef = useRef<HTMLSpanElement>(null)
  const progressBarsRef = useRef<HTMLDivElement>(null)
  const isLockedRef = useRef(false)
  const [isLockedForLayout, setIsLockedForLayout] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useGSAP(() => {
    if (isMobile) return // No scroll anims on mobile

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          
          if (p > 0 && !isLockedRef.current) {
            isLockedRef.current = true
            setIsLockedForLayout(true)
            setHoveredPanel(null)
          }
          if (p === 0 && isLockedRef.current) {
            isLockedRef.current = false
            setIsLockedForLayout(false)
          }

          // HUD Text Updates
          if (systemTextRef.current) {
            if (p < 0.05) systemTextRef.current.textContent = "SYSTEM.ACTIVE"
            else if (p >= 0.05 && p < 0.15) systemTextRef.current.textContent = "◉ SYNTHESIS.INIT"
            else if (p >= 0.15 && p < 0.3) systemTextRef.current.textContent = "◉ MERGING..."
            else if (p >= 0.3 && p < 0.7) systemTextRef.current.textContent = "◉ RECONFIGURING"
            else systemTextRef.current.textContent = "SYSTEM.UNIFIED"
          }

          if (progressBarsRef.current) {
            const bars = p < 0.3 ? 0 : p >= 0.7 ? 8 : Math.floor(((p - 0.3) / 0.4) * 8)
            const children = progressBarsRef.current.children
            for (let i = 0; i < children.length; i++) {
              (children[i] as HTMLElement).style.opacity = i < bars ? "0.8" : "0.3"
            }
          }
        }
      }
    })

    // --- PHASE 3: SNAP & LOCK (0% -> 5%) ---
    // Fade out text elements and scroll indicator
    tl.to(".hero-panel-content, .panel-bracket, .scroll-indicator", {
      opacity: 0,
      duration: 0.05,
      ease: "power2.inOut"
    }, 0)

    // Micro-shake at fracture moment
    tl.to(stickyRef.current, { x: 1, y: -1, duration: 0.005, ease: "none" }, 0.05)
    tl.to(stickyRef.current, { x: -2, y: 1, duration: 0.005, ease: "none" }, 0.055)
    tl.to(stickyRef.current, { x: 1, y: 0, duration: 0.005, ease: "none" }, 0.06)
    tl.to(stickyRef.current, { x: 0, y: 0, duration: 0.01, ease: "power2.out" }, 0.065)

    // Seam pulse
    tl.to(".hero-seam", { opacity: 1.0, duration: 0.015, ease: "power1.in" }, 0.03)
    tl.to(".hero-seam", { opacity: 0.85, duration: 0.01, ease: "power1.out" }, 0.045)
    tl.to(".hero-seam", { opacity: 1.0, duration: 0.005, ease: "power1.in" }, 0.05)

    // Seam Intensifies
    tl.to(".hero-seam", {
      width: "2px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.25)",
      duration: 0.05,
      ease: "power2.inOut"
    }, 0)

    // --- PHASE 4: OVERLAP & SEAM FRACTURE (5% -> 25%) ---
    // WebGL Canvas overlap
    tl.to(".canvas-left", {
      clipPath: "inset(0 25% 0 0)",
      duration: 0.20,
      ease: "none"
    }, 0.05)
    
    tl.to(".canvas-right", {
      clipPath: "inset(0 0 0 25%)",
      duration: 0.20,
      ease: "none"
    }, 0.05)

    // Apply mix-blend-mode to right canvas container
    tl.set(".canvas-right", { mixBlendMode: "screen" }, 0.10)

    // Seam Dissolves
    tl.to(".hero-seam", {
      opacity: 0,
      width: "0px",
      duration: 0.08,
      ease: "none"
    }, 0.12)

    // Fracture lines animation
    const fractures = document.querySelectorAll('.fracture-line')
    fractures.forEach((frac, i) => {
      tl.to(frac, {
        width: i % 2 === 0 ? "120px" : "80px",
        opacity: 0,
        duration: 0.07,
        ease: "power2.out"
      }, 0.05 + (i * 0.01))
    })

    // --- PHASE 5: MOSAIC DISSOLUTION (25% -> 70%) ---
    // Dim the entire canvases container
    tl.to(".hero-canvases-container", {
      filter: "brightness(0.4)",
      duration: 0.35,
      ease: "none"
    }, 0.25)

    // Stagger mosaic tiles based on calculated activation progress
    const tiles = document.querySelectorAll(".mosaic-tile")
    tiles.forEach(tile => {
      const startP = parseFloat(tile.getAttribute("data-activation") || "0.25")
      // Tile animation: opacity 0->1
      tl.to(tile, {
        opacity: 1,
        duration: 0.1, // 10% of total scroll
        ease: tile.getAttribute("data-easing") || "power1.inOut"
      }, startP)
      
      // Box shadow flash explicit tweens
      tl.to(tile, {
        boxShadow: "inset 0 0 3px rgba(255,255,255,0.5)",
        duration: 0.015,
        ease: "power1.in"
      }, startP)
      
      tl.to(tile, {
        boxShadow: "inset 0 0 0px rgba(255,255,255,0)",
        duration: 0.015,
        ease: "power1.out"
      }, startP + 0.015)
    })

    // --- PHASE 6: SECTION 2 REVEAL (65% -> 100%) ---
    tl.to(".s2-label", { opacity: 1, duration: 0.1, ease: "power2.out" }, 0.65)
    
    tl.fromTo(".s2-headline", 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.15, ease: "power3.out" }, 
      0.70
    )
    
    tl.fromTo(".s2-subheadline", 
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.12, ease: "power3.out" }, 
      0.78
    )
    
    tl.fromTo(".s2-ctas", 
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.10, ease: "power3.out" }, 
      0.85
    )
    
    tl.to(".s2-stats", { opacity: 1, duration: 0.1, ease: "power2.out" }, 0.90)

  }, { scope: containerRef })

  // Calculate panel widths based on hover state for Phase 1/2
  const getPanelWidth = (side: "left" | "right") => {
    if (isMobile) return "100%"
    if (isLocked) return "calc(50% - 0.5px)"
    if (hoveredPanel === null) return "calc(50% - 0.5px)"
    return hoveredPanel === side ? "calc(58% - 0.5px)" : "calc(42% - 0.5px)"
  }

  // Calculate seam position
  const getSeamPosition = () => {
    if (isMobile) return "50%"
    if (isLocked) return "50%"
    if (hoveredPanel === null) return "50%"
    return hoveredPanel === "left" ? "58%" : "42%"
  }

  if (isMobile) {
    // Mobile View: Fallback simplified layout
    return (
      <main className="relative h-screen overflow-hidden bg-[#0A0A0A]">
        <SharedBackground hoveredPanel={null} isMobile={true} isLocked={true} />
        <SharedTopBar />
        <SharedBottomBar />
        
        {/* Mobile immediately shows the headline overlapped */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6">
          <h2 className="text-[32px] font-bold leading-[1.15] text-center text-white font-serif mb-4">
            Brand, product, and intelligent systems. <br />
            <span className="text-[#00FF66]">Built as one.</span>
          </h2>
          <div className="text-white/35 font-mono text-[10px] tracking-[0.2em] mt-12 animate-bounce">
            ↓ SCROLL TO EXPLORE
          </div>
        </div>
      </main>
    )
  }

  return (
    <div ref={containerRef} className="hero-scroll-container w-full h-[250vh] bg-[#0A0A0A]">
      <div ref={stickyRef} className="hero-sticky sticky top-0 w-full h-screen overflow-hidden">
        
        <SharedBackground hoveredPanel={hoveredPanel} isMobile={false} isLocked={isLockedForLayout} />
        <SharedTopBar />
        <SharedBottomBar ref={progressBarsRef} />

        {/* The Seam */}
        <HeroSeam position={getSeamPosition()} isActive={isLockedForLayout} className="hero-seam" />

        {/* Fracture lines (invisible initially, generated for GSAP) */}
        {/* The fracture lines are now inside HeroSeam component */}

        {/* Panels */}
        <div className="panels-container relative w-full h-full flex flex-row z-20">
          <div className="relative h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ width: getPanelWidth("left") }}>
            <SplitHeroPanel
              side="left"
              isHovered={hoveredPanel === "left"}
              isLocked={isLockedForLayout}
              onHover={() => { if (!isLockedRef.current) setHoveredPanel("left") }}
              onHoverEnd={() => { if (!isLockedRef.current) setHoveredPanel(null) }}
            >
              <div className="hero-panel-content">
                <HeroPanelContent
                  side="left"
                  marker="── 01"
                  title="Studio"
                  description="Brand systems with signal."
                  subDescription="Identity, campaigns, film, and creative direction at global brand level."
                  isHovered={hoveredPanel === "left"}
                  scrollLocked={isLockedForLayout}
                />
              </div>
            </SplitHeroPanel>
          </div>

          <div className="relative h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ width: getPanelWidth("right") }}>
            <SplitHeroPanel
              side="right"
              isHovered={hoveredPanel === "right"}
              isLocked={isLockedForLayout}
              onHover={() => { if (!isLockedRef.current) setHoveredPanel("right") }}
              onHoverEnd={() => { if (!isLockedRef.current) setHoveredPanel(null) }}
            >
              <div className="hero-panel-content">
                <HeroPanelContent
                  side="right"
                  marker="02 ──"
                  title="Product & Systems"
                  description="Software that can carry the business."
                  subDescription="Platforms, intelligent systems, and architecture built for real-world use."
                  isHovered={hoveredPanel === "right"}
                  scrollLocked={isLockedForLayout}
                />
              </div>
            </SplitHeroPanel>
          </div>
        </div>

        {/* Tile Grid */}
        <MosaicTransitionOverlay />

        {/* Section 2 Content Revealed Above Tiles */}
        <div className="absolute inset-0 z-[45] flex items-center justify-center pointer-events-none">
          <div className="max-w-[720px] w-full px-6 text-center">
            <div className="s2-label opacity-0 text-white/40 font-mono text-[10px] tracking-[0.15em] mb-12">
              ── 002 · THE PROPOSITION
            </div>
            <h1 className="s2-headline opacity-0 text-white text-[36px] lg:text-[48px] font-bold leading-[1.15] font-serif mb-8">
              Brand, product, and intelligent systems.<br/>
              <span className="text-[#00FF66]">Built as one.</span>
            </h1>
            <p className="s2-subheadline opacity-0 text-white/65 font-mono text-[14px] lg:text-[15px] leading-[1.7] max-w-[640px] mx-auto mb-10">
              Creative direction shaped at Back Market, Moët Hennessy, Whatnot, and Vice TV. 
              Engineering standards from fintech. Product thinking from platforms we built and shipped ourselves. 
              One operating team. Led by founders. Backed by specialists.
            </p>
            <div className="s2-ctas opacity-0 flex items-center justify-center gap-4 mb-12 pointer-events-auto">
              <a href="#contact" className="px-6 py-3 bg-[#00FF66] text-black font-mono text-[12px] tracking-wider hover:brightness-110 transition-all">
                START A PROJECT
              </a>
              <a href="#work" className="px-6 py-3 border border-white text-white font-mono text-[12px] tracking-wider hover:bg-white hover:text-black transition-all">
                VIEW WORK
              </a>
            </div>
            <div className="s2-stats opacity-0 flex items-center justify-center gap-6 font-mono text-[11px] text-white/45">
              <span><span className="text-[#00FF66]">◉</span> 3-5X FASTER</span>
              <span><span className="text-[#00FF66]">◉</span> 40% LOWER COST</span>
              <span><span className="text-white">◉</span> END-TO-END</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <ScrollIndicator />
        </div>
      </div>
    </div>
  )
}
