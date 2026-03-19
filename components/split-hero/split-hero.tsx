"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { SharedBackground, SharedTopBar, SharedBottomBar } from "./shared-elements"
import { SplitHeroPanel } from "./split-hero-panel"
import { HeroPanelContent } from "./hero-panel-content"
import { HeroSeam } from "./hero-seam"
import { FallingPattern } from "@/components/ui/falling-pattern"
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

    // --- TIMELINE 1: SCRUBBED OVERLAP (0% to 50vh) ---
    // This timeline remains tied to the scroll wheel so the initial lock/overlap feels interactive.
    const tlScrub = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "top -50vh", // Only scrubs for the first 50vh of the container
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
            if (p < 0.2) systemTextRef.current.textContent = "SYSTEM.ACTIVE"
            else if (p >= 0.2 && p < 0.5) systemTextRef.current.textContent = "◉ SYNTHESIS.INIT"
            else if (p >= 0.5 && p < 0.9) systemTextRef.current.textContent = "◉ MERGING..."
            else systemTextRef.current.textContent = "SYSTEM.UNIFIED"
          }

          if (progressBarsRef.current) {
            const bars = Math.floor(p * 8)
            const children = progressBarsRef.current.children
            for (let i = 0; i < children.length; i++) {
              (children[i] as HTMLElement).style.opacity = i < bars ? "0.8" : "0.3"
            }
          }
        }
      }
    })

    // --- PHASE 3: SNAP & LOCK ---
    tlScrub.to(".hero-panel-content, .panel-bracket, .scroll-indicator", { opacity: 0, duration: 0.1, ease: "power2.inOut" }, 0)
    tlScrub.to(stickyRef.current, { x: 1, y: -1, duration: 0.02, ease: "none" }, 0.1)
    tlScrub.to(stickyRef.current, { x: -2, y: 1, duration: 0.02, ease: "none" }, 0.12)
    tlScrub.to(stickyRef.current, { x: 1, y: 0, duration: 0.02, ease: "none" }, 0.14)
    tlScrub.to(stickyRef.current, { x: 0, y: 0, duration: 0.04, ease: "power2.out" }, 0.16)

    tlScrub.to(".hero-seam", { opacity: 1.0, duration: 0.05, ease: "power1.in" }, 0.05)
    tlScrub.to(".hero-seam", { opacity: 0.85, duration: 0.05, ease: "power1.out" }, 0.1)
    tlScrub.to(".hero-seam", { opacity: 1.0, duration: 0.05, ease: "power1.in" }, 0.15)
    tlScrub.to(".hero-seam", { width: "2px", backgroundColor: "rgba(255, 255, 255, 0.8)", boxShadow: "0 0 20px rgba(255, 255, 255, 0.25)", duration: 0.1, ease: "power2.inOut" }, 0)

    // --- PHASE 4: OVERLAP & SEAM FRACTURE ---
    tlScrub.to(".canvas-left", { clipPath: "inset(0 25% 0 0)", duration: 0.4, ease: "none" }, 0.2)
    tlScrub.to(".canvas-right", { clipPath: "inset(0 0 0 25%)", duration: 0.4, ease: "none" }, 0.2)
    tlScrub.set(".canvas-right", { mixBlendMode: "screen" }, 0.3)
    tlScrub.to(".hero-seam", { opacity: 0, width: "0px", duration: 0.2, ease: "none" }, 0.4)

    const fractures = document.querySelectorAll('.fracture-line')
    fractures.forEach((frac, i) => {
      tlScrub.to(frac, { width: i % 2 === 0 ? "120px" : "80px", opacity: 0, duration: 0.2, ease: "power2.out" }, 0.2 + (i * 0.05))
    })

    // --- TIMELINE 2: TRIGGERED BLEED (Unstoppable Event) ---
    // This fires automatically once the user scrolls past the overlap phase.
    const tlBleed = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top -50vh", // Triggers precisely when the scrubbed timeline ends
        toggleActions: "play none none reverse", // Plays completely, reverses if you scroll all the way back up
      }
    })

    // --- PHASE 5: THE SYSTEM BLEED ---
    tlBleed.to(".corruption-layer", { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 0)
    tlBleed.fromTo(".matrix-rain-container", 
      { "--bleed-progress": "-30%" }, 
      { "--bleed-progress": "100%", duration: 1.5, ease: "power2.inOut" }, 
      0
    )

    // --- PHASE 6: SECTION 2 REVEAL ---
    tlBleed.to(".s2-label", { opacity: 1, duration: 0.4, ease: "power2.out" }, 1.0)
    tlBleed.fromTo(".s2-headline", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.1)
    tlBleed.fromTo(".s2-subheadline", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 1.3)
    tlBleed.fromTo(".s2-ctas", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 1.5)
    tlBleed.to(".s2-stats", { opacity: 1, duration: 0.4, ease: "power2.out" }, 1.7)

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
                />
              </div>
            </SplitHeroPanel>
          </div>
        </div>

        {/* Layer 1: The Corruption Layer (Darkens the canvases) */}
        <div className="corruption-layer absolute inset-0 z-[35] bg-black opacity-0 pointer-events-none" />

        {/* Layer 2: The Matrix Layer (The Top-Down System Bleed) */}
        {/* We use a custom CSS variable --bleed-progress (from 0 to 100) controlled by GSAP */}
        <div 
          className="matrix-rain-container absolute inset-0 z-[40] pointer-events-none overflow-hidden"
          style={{ 
            "--bleed-progress": "0%",
            maskImage: "linear-gradient(to bottom, black 0%, black var(--bleed-progress), transparent calc(var(--bleed-progress) + 30vh), transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black var(--bleed-progress), transparent calc(var(--bleed-progress) + 30vh), transparent 100%)"
          } as React.CSSProperties}
        >
          <FallingPattern color="rgba(255,255,255,0.4)" blurIntensity="1em" density={1} duration={150} className="dark bg-black/40 backdrop-blur-md" />
        </div>

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
