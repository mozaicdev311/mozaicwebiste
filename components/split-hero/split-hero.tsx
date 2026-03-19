"use client"

import { useRef } from "react"
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
  
  // HUD States
  const systemTextRef = useRef<HTMLSpanElement>(null)
  const progressBarsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    let mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      // Base Desktop Setup - The Mozaic Lock
      gsap.set(containerRef.current, {
        "--v1": "50%", "--v2": "50%", "--v3": "50%",
        "--v4": "50%", "--v5": "50%", "--v6": "50%"
      })

      const leftPolygon = "polygon(0% 0%, var(--v1) 0%, var(--v1) 16.666%, var(--v2) 16.666%, var(--v2) 33.333%, var(--v3) 33.333%, var(--v3) 50%, var(--v4) 50%, var(--v4) 66.666%, var(--v5) 66.666%, var(--v5) 83.333%, var(--v6) 83.333%, var(--v6) 100%, 0% 100%)"
      const rightPolygon = "polygon(100% 0%, var(--v1) 0%, var(--v1) 16.666%, var(--v2) 16.666%, var(--v2) 33.333%, var(--v3) 33.333%, var(--v3) 50%, var(--v4) 50%, var(--v4) 66.666%, var(--v5) 66.666%, var(--v5) 83.333%, var(--v6) 83.333%, var(--v6) 100%, 100% 100%)"

      gsap.set('.panel-left-wrapper', { clipPath: leftPolygon })
      gsap.set('.panel-right-wrapper', { clipPath: rightPolygon })
      gsap.set('.canvas-left', { clipPath: leftPolygon })
      gsap.set('.canvas-right', { clipPath: rightPolygon })
      
      gsap.set('.hero-seam', { left: '50%' })
      gsap.set('.matrix-rain-container', { "--bleed-progress": "0%" })
      gsap.set('.s2-mobile-content', { opacity: 0 })

      // Handle hover interactions purely via GSAP CSS Variables
      let isLocked = false
      
      const onMouseEnterLeft = () => {
        if (isLocked) return
        gsap.to(containerRef.current, {
          "--v1": "58%", "--v2": "58%", "--v3": "58%",
          "--v4": "58%", "--v5": "58%", "--v6": "58%",
          duration: 0.5, ease: 'power3.out'
        })
        gsap.to('.hero-seam', { left: '58%', duration: 0.5, ease: 'power3.out' })
        gsap.to('.panel-left-wrapper .panel-overlay', { backgroundColor: 'rgba(0,0,0,0)', duration: 0.4 })
        gsap.to('.panel-right-wrapper .panel-overlay', { backgroundColor: 'rgba(0,0,0,0.4)', duration: 0.4 })
        gsap.to('.panel-left-wrapper .panel-desc', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 })
      }

      const onMouseEnterRight = () => {
        if (isLocked) return
        gsap.to(containerRef.current, {
          "--v1": "42%", "--v2": "42%", "--v3": "42%",
          "--v4": "42%", "--v5": "42%", "--v6": "42%",
          duration: 0.5, ease: 'power3.out'
        })
        gsap.to('.hero-seam', { left: '42%', duration: 0.5, ease: 'power3.out' })
        gsap.to('.panel-left-wrapper .panel-overlay', { backgroundColor: 'rgba(0,0,0,0.4)', duration: 0.4 })
        gsap.to('.panel-right-wrapper .panel-overlay', { backgroundColor: 'rgba(0,0,0,0)', duration: 0.4 })
        gsap.to('.panel-right-wrapper .panel-desc', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 })
      }

      const onMouseLeave = () => {
        if (isLocked) return
        gsap.to(containerRef.current, {
          "--v1": "50%", "--v2": "50%", "--v3": "50%",
          "--v4": "50%", "--v5": "50%", "--v6": "50%",
          duration: 0.5, ease: 'power3.out'
        })
        gsap.to('.hero-seam', { left: '50%', duration: 0.5, ease: 'power3.out' })
        gsap.to('.panel-overlay', { backgroundColor: 'rgba(0,0,0,0.2)', duration: 0.4 })
        gsap.to('.panel-desc', { opacity: 0, y: 8, duration: 0.3, ease: 'power2.in' })
      }

      const leftPanelEl = document.querySelector('.panel-left-wrapper')
      const rightPanelEl = document.querySelector('.panel-right-wrapper')
      
      leftPanelEl?.addEventListener('mouseenter', onMouseEnterLeft)
      leftPanelEl?.addEventListener('mouseleave', onMouseLeave)
      rightPanelEl?.addEventListener('mouseenter', onMouseEnterRight)
      rightPanelEl?.addEventListener('mouseleave', onMouseLeave)

      // ==========================================
      // THE MASTER TIMELINE (0 - 150vh Scrollable)
      // ==========================================
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // Adds the physical "drag" weight with Lenis
          onUpdate: (self) => {
            const p = self.progress
            const sysTextEl = document.querySelector('.system-status-text')
            
            // Handle State Switching Manually
            if (p > 0.05 && !isLocked) {
              isLocked = true
              gsap.set('.panel-container', { cursor: 'default' })
              gsap.to(containerRef.current, {
                "--v1": "50%", "--v2": "50%", "--v3": "50%",
                "--v4": "50%", "--v5": "50%", "--v6": "50%",
                duration: 0.3
              })
              gsap.to('.hero-seam', { left: '50%', duration: 0.3 })
              gsap.to('.panel-desc', { opacity: 0, duration: 0.2 })
            } else if (p <= 0.05 && isLocked) {
              isLocked = false
              gsap.set('.panel-container', { cursor: 'pointer' })
            }

            // HUD Diagnostics (Engineered Precision)
            if (sysTextEl) {
              if (p < 0.1) sysTextEl.textContent = "SYSTEM.ACTIVE"
              else if (p >= 0.1 && p < 0.2) sysTextEl.textContent = "SYSTEM.SYNC_INIT"
              else if (p >= 0.2 && p < 0.4) sysTextEl.textContent = "WEAVING_MATRICES"
              else if (p >= 0.4 && p < 0.7) sysTextEl.textContent = "UNIFICATION_PHASE"
              else sysTextEl.textContent = "SYSTEM.UNIFIED"
            }

            const barsContainer = document.querySelector('.progress-bars')
            if (barsContainer) {
              const bars = Math.floor(p * 8)
              const children = barsContainer.children
              for (let i = 0; i < children.length; i++) {
                (children[i] as HTMLElement).style.opacity = i < bars ? "0.8" : "0.3"
              }
            }
          }
        }
      })

      // === PHASE 1: THE SLICING (0% - 20%) ===
      // Hide standard UI elements gracefully
      masterTl.to(".hero-panel-content, .panel-bracket, .scroll-indicator", { opacity: 0, duration: 0.1, ease: "power2.inOut" }, 0)
      
      // The Seam gracefully fades out to prepare for the weave
      masterTl.to(".hero-seam", { opacity: 0, duration: 0.1, ease: "power2.out" }, 0.05)


      // === PHASE 2: THE MOZAIC WEAVE (20% - 50%) ===
      const weaveStart = 0.15
      const weaveDuration = 0.25
      
      // Staggered interlocking of the 6 bands.
      // Left pushes right on bands 1, 3, 5. Right pushes left on bands 2, 4, 6.
      masterTl.to(containerRef.current, { "--v1": "100%", duration: weaveDuration, ease: "power3.inOut" }, weaveStart)
      masterTl.to(containerRef.current, { "--v2": "0%",   duration: weaveDuration, ease: "power3.inOut" }, weaveStart + 0.03)
      masterTl.to(containerRef.current, { "--v3": "100%", duration: weaveDuration, ease: "power3.inOut" }, weaveStart + 0.06)
      masterTl.to(containerRef.current, { "--v4": "0%",   duration: weaveDuration, ease: "power3.inOut" }, weaveStart + 0.09)
      masterTl.to(containerRef.current, { "--v5": "100%", duration: weaveDuration, ease: "power3.inOut" }, weaveStart + 0.12)
      masterTl.to(containerRef.current, { "--v6": "0%",   duration: weaveDuration, ease: "power3.inOut" }, weaveStart + 0.15)


      // === PHASE 3: THE BLEED (50% - 75%) ===
      const bleedStart = 0.5
      
      masterTl.to(".corruption-layer", { opacity: 1, duration: 0.2, ease: "none" }, bleedStart)
      
      // The rain is dragged down by the user
      masterTl.fromTo(".matrix-rain-container", 
        { "--bleed-progress": "-30%" }, 
        { "--bleed-progress": "100%", duration: 0.25, ease: "none" }, 
        bleedStart
      )

      // === PHASE 4: THE REBIRTH (75% - 100%) ===
      const rebirthStart = 0.75

      // Cinematic boot-up of Section 2 text
      masterTl.to(".s2-label", { opacity: 1, duration: 0.05, ease: "none" }, rebirthStart)
      
      masterTl.fromTo(".s2-headline", 
        { opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" }, 
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.15, ease: "power2.out" }, 
        rebirthStart + 0.02
      )
      
      masterTl.fromTo(".s2-subheadline", 
        { opacity: 0, y: 40, filter: "blur(5px)" }, 
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.1, ease: "power2.out" }, 
        rebirthStart + 0.08
      )
      
      masterTl.fromTo(".s2-ctas", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, 
        rebirthStart + 0.12
      )
      
      masterTl.to(".s2-stats", { opacity: 1, duration: 0.1, ease: "power2.out" }, rebirthStart + 0.15)

      return () => {
        leftPanelEl?.removeEventListener('mouseenter', onMouseEnterLeft)
        leftPanelEl?.removeEventListener('mouseleave', onMouseLeave)
        rightPanelEl?.removeEventListener('mouseenter', onMouseEnterRight)
        rightPanelEl?.removeEventListener('mouseleave', onMouseLeave)
      }
    })

    mm.add("(max-width: 1023px)", () => {
      // Mobile - simpler static configuration.
      gsap.set('.s2-mobile-content', { opacity: 1 })
      gsap.set('.matrix-rain-container', { "--bleed-progress": "100%" })
      gsap.set('.corruption-layer', { opacity: 0.6 })
      gsap.set('.hero-seam', { display: 'none' })
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="hero-scroll-container w-full h-[250vh] bg-[#0A0A0A]">
      <div ref={stickyRef} className="hero-sticky sticky top-0 w-full h-screen overflow-hidden">
        
        <SharedBackground isMobile={false} />
        <SharedTopBar />
        <SharedBottomBar />

        {/* The Seam */}
        <HeroSeam />

        {/* Desktop Panels */}
        <div className="panels-container relative w-full h-full flex flex-row z-20 hidden lg:flex">
          <div className="panel-left-wrapper absolute inset-0">
            <SplitHeroPanel side="left">
              <div className="hero-panel-content h-full">
                <HeroPanelContent
                  side="left"
                  marker="── 01"
                  title="Studio"
                  description="Brand systems with signal."
                  subDescription="Identity, campaigns, film, and creative direction at global brand level."
                />
              </div>
            </SplitHeroPanel>
          </div>

          <div className="panel-right-wrapper absolute inset-0">
            <SplitHeroPanel side="right">
              <div className="hero-panel-content h-full">
                <HeroPanelContent
                  side="right"
                  marker="02 ──"
                  title="Product & Systems"
                  description="Software that can carry the business."
                  subDescription="Platforms, intelligent systems, and architecture built for real-world use."
                />
              </div>
            </SplitHeroPanel>
          </div>
        </div>

        {/* Mobile View Structure */}
        <div className="s2-mobile-content absolute inset-0 z-30 flex flex-col items-center justify-center px-6 lg:hidden opacity-0">
          <h2 className="text-[32px] font-bold leading-[1.15] text-center text-white font-serif mb-4">
            Brand, product, and intelligent systems. <br />
            <span className="text-[#00FF66]">Built as one.</span>
          </h2>
          <div className="text-white/35 font-mono text-[10px] tracking-[0.2em] mt-12 animate-bounce">
            ↓ SCROLL TO EXPLORE
          </div>
        </div>

        {/* Layer 1: The Corruption Layer (Darkens the canvases) */}
        <div className="corruption-layer absolute inset-0 z-[35] bg-black opacity-0 pointer-events-none" />

        {/* Layer 2: The Matrix Layer (The Top-Down System Bleed) */}
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
        <div className="absolute inset-0 z-[45] items-center justify-center pointer-events-none hidden lg:flex">
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
        <div className="scroll-indicator hidden lg:block">
          <ScrollIndicator />
        </div>
      </div>
    </div>
  )
}
