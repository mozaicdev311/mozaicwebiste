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
      // Base Desktop Setup - The Data Overload
      gsap.set('.panel-left-wrapper', { clipPath: 'inset(0 50% 0 0)' })
      gsap.set('.panel-right-wrapper', { clipPath: 'inset(0 0 0 50%)' })
      gsap.set('.canvas-left', { clipPath: 'inset(0 50% 0 0)' })
      gsap.set('.canvas-right', { clipPath: 'inset(0 0 0 50%)' })
      
      gsap.set('.hero-seam-main', { left: '50%' })
      gsap.set('.matrix-rain-container', { "--bleed-progress": "0%" })
      gsap.set('.s2-mobile-content', { opacity: 0 })

      // Handle hover interactions purely via GSAP CSS Variables
      let isLocked = false
      
      const onMouseEnterLeft = () => {
        if (isLocked) return
        gsap.to('.panel-left-wrapper', { clipPath: 'inset(0 42% 0 0)', duration: 0.5, ease: 'power3.out' })
        gsap.to('.panel-right-wrapper', { clipPath: 'inset(0 0 0 58%)', duration: 0.5, ease: 'power3.out' })
        gsap.to('.hero-seam-main', { left: '58%', duration: 0.5, ease: 'power3.out' })
        gsap.to('.canvas-left', { clipPath: 'inset(0 42% 0 0)', duration: 0.5, ease: 'power3.out' })
        gsap.to('.canvas-right', { clipPath: 'inset(0 0 0 58%)', duration: 0.5, ease: 'power3.out' })
        gsap.to('.panel-left-wrapper .panel-overlay', { backgroundColor: 'rgba(0,0,0,0)', duration: 0.4 })
        gsap.to('.panel-right-wrapper .panel-overlay', { backgroundColor: 'rgba(0,0,0,0.4)', duration: 0.4 })
        gsap.to('.panel-left-wrapper .panel-desc', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 })
      }

      const onMouseEnterRight = () => {
        if (isLocked) return
        gsap.to('.panel-left-wrapper', { clipPath: 'inset(0 58% 0 0)', duration: 0.5, ease: 'power3.out' })
        gsap.to('.panel-right-wrapper', { clipPath: 'inset(0 0 0 42%)', duration: 0.5, ease: 'power3.out' })
        gsap.to('.hero-seam-main', { left: '42%', duration: 0.5, ease: 'power3.out' })
        gsap.to('.canvas-left', { clipPath: 'inset(0 58% 0 0)', duration: 0.5, ease: 'power3.out' })
        gsap.to('.canvas-right', { clipPath: 'inset(0 0 0 42%)', duration: 0.5, ease: 'power3.out' })
        gsap.to('.panel-left-wrapper .panel-overlay', { backgroundColor: 'rgba(0,0,0,0.4)', duration: 0.4 })
        gsap.to('.panel-right-wrapper .panel-overlay', { backgroundColor: 'rgba(0,0,0,0)', duration: 0.4 })
        gsap.to('.panel-right-wrapper .panel-desc', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 })
      }

      const onMouseLeave = () => {
        if (isLocked) return
        gsap.to(['.panel-left-wrapper', '.canvas-left'], { clipPath: 'inset(0 50% 0 0)', duration: 0.5, ease: 'power3.out' })
        gsap.to(['.panel-right-wrapper', '.canvas-right'], { clipPath: 'inset(0 0 0 50%)', duration: 0.5, ease: 'power3.out' })
        gsap.to('.hero-seam-main', { left: '50%', duration: 0.5, ease: 'power3.out' })
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
              gsap.to(['.panel-left-wrapper', '.canvas-left'], { clipPath: 'inset(0 50% 0 0)', duration: 0.3 })
              gsap.to(['.panel-right-wrapper', '.canvas-right'], { clipPath: 'inset(0 0 0 50%)', duration: 0.3 })
              gsap.to('.hero-seam-main', { left: '50%', duration: 0.3 })
              gsap.to('.panel-desc', { opacity: 0, duration: 0.2 })
            } else if (p <= 0.05 && isLocked) {
              isLocked = false
              gsap.set('.panel-container', { cursor: 'pointer' })
            }

            // HUD Diagnostics (Data Overload)
            if (sysTextEl) {
              if (p < 0.1) sysTextEl.textContent = "SYSTEM.ACTIVE"
              else if (p >= 0.1 && p < 0.2) sysTextEl.textContent = "SURGE_DETECTED // MULTIPLYING"
              else if (p >= 0.2 && p < 0.4) sysTextEl.textContent = "DATA_OVERLOAD // CASCADE"
              else if (p >= 0.4 && p < 0.7) sysTextEl.textContent = "MATRIX_BLEED // UNIFYING"
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

      // === PHASE 1: THE MULTIPLICATION (0% - 20%) ===
      // Hide standard UI elements gracefully
      masterTl.to(".hero-panel-content, .panel-bracket, .scroll-indicator", { opacity: 0, duration: 0.1, ease: "power2.inOut" }, 0)
      
      // The Seam begins to glow and surge
      masterTl.to(".hero-seam-main", { 
        width: "6px", 
        backgroundColor: "rgba(255, 255, 255, 1)", 
        boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)", 
        duration: 0.1, 
        ease: "power2.in" 
      }, 0.05)


      // === PHASE 2: THE DATA OVERLOAD CRASH (20% - 50%) ===
      const overloadStart = 0.15
      
      // The panels violently glitch out and desaturate
      masterTl.to(['.panel-left-wrapper', '.panel-right-wrapper'], { 
        filter: 'grayscale(100%) brightness(0.6) contrast(150%)', 
        duration: 0.05 
      }, overloadStart)
      
      masterTl.to(['.panel-left-wrapper', '.panel-right-wrapper'], { 
        opacity: 0, 
        scale: 1.05, 
        duration: 0.2, 
        ease: "power3.in" 
      }, overloadStart + 0.1)

      // The 45 lines burst horizontally outwards
      masterTl.set(".overload-lines", { opacity: 1 }, overloadStart)
      
      const lines = gsap.utils.toArray('.overload-line')
      lines.forEach((line: any, i) => {
        // Calculate a random target between 0 and 100vw
        const targetLeft = gsap.utils.random(0, 100) + '%'
        
        // 1. Horizontal Spread (SURGE)
        masterTl.to(line, {
          left: targetLeft,
          scaleY: gsap.utils.random(0.3, 1),
          yPercent: gsap.utils.random(-20, 20),
          opacity: gsap.utils.random(0.5, 1),
          duration: 0.1,
          ease: "power3.out"
        }, overloadStart)
        
        // 2. GRAVITY COLLAPSE (Everything crashes DOWN)
        masterTl.to(line, {
          yPercent: 200, // Violent downward collapse
          scaleY: gsap.utils.random(2, 5), // Intense light speed stretch
          opacity: 0,
          duration: 0.15, // High speed
          ease: "power2.in"
        }, overloadStart + 0.12)
      })

      // Hide the main seam as it explodes
      masterTl.to(".hero-seam-main", { opacity: 0, scaleY: 2, duration: 0.1 }, overloadStart)

      // === PHASE 3: THE VACUUM & CASCADE (50% - 75%) ===
      // Tiny beat of pure black void before the rain enters
      const cascadeStart = 0.52
      
      masterTl.to(".corruption-layer", { opacity: 1, duration: 0.1, ease: "none" }, 0.45)
      
      // The rain "chases" the downward momentum
      masterTl.fromTo(".matrix-rain-container", 
        { "--bleed-progress": "-50%" }, 
        { "--bleed-progress": "100%", duration: 0.35, ease: "power1.inOut" }, 
        cascadeStart
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
