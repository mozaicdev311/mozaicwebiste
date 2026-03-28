"use client"

import { useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { SharedBackground, SharedTopBar, SharedBottomBar } from "./shared-elements"
import { SplitHeroPanel } from "./split-hero-panel"
import { HeroPanelContent } from "./hero-panel-content"
import { HeroSeam } from "./hero-seam"
import { HeroActorsLayer } from "./hero-actors-layer"
import { HashLink } from "@/components/hash-link"
import { FallingPattern } from "@/components/ui/falling-pattern"
import { ScrollIndicator } from "./scroll-indicator"

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface Phase4ActorProfile {
  minOpacity: number
  maxBlurPx: number
  minBrightness: number
}

interface ActorPhaseMotionProfile {
  phase2: { move: "converge"; scale: "shrink" }
  phase3: { move: "hold-center"; scale: "hold" }
  phase4: { move: "diverge"; scale: "grow" }
}

interface HeroVisualState {
  phase4ActorProfile: Phase4ActorProfile
  phase4LayerMode: "actors_above_effects"
  actorPhaseMotionProfile: ActorPhaseMotionProfile
}

const HERO_VISUAL_STATE: HeroVisualState = {
  phase4ActorProfile: {
    minOpacity: 0.75, // Significantly boosted from 0.48
    maxBlurPx: 0.35,
    minBrightness: 1.15, // Significantly boosted from 0.72
  },
  phase4LayerMode: "actors_above_effects",
  actorPhaseMotionProfile: {
    phase2: { move: "converge", scale: "shrink" },
    phase3: { move: "hold-center", scale: "hold" },
    phase4: { move: "diverge", scale: "grow" },
  },
}

export default function SplitHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(min-width: 1024px)", () => {
        const { phase4ActorProfile, phase4LayerMode, actorPhaseMotionProfile } = HERO_VISUAL_STATE

        // Base desktop split state
        gsap.set(".panel-left-wrapper", { clipPath: "inset(0 50% 0 0)" })
        gsap.set(".panel-right-wrapper", { clipPath: "inset(0 0 0 50%)" })
        gsap.set(".hero-seam-main", { x: "0vw" })
        gsap.set(".hero-actors-layer", { zIndex: 15 })

        // Actor baseline: split and clear
        gsap.set(".hero-actor-left", { xPercent: 0, scale: 1 })
        gsap.set(".hero-actor-right", { xPercent: 0, scale: 0.9 })
        gsap.set(".hero-actor", {
          opacity: 1, // Increased from 0.9
          filter: "grayscale(0%) brightness(1.3) contrast(1.1)", // Increased brightness
        })

        gsap.set(".matrix-rain-container", { "--bleed-progress": "0%" })
        gsap.set(".s2-mobile-content", { opacity: 0 })

        gsap.set(".panel-left-wrapper .panel-desc", { opacity: 0, y: 8 })
        gsap.set(".panel-right-wrapper .panel-desc", { opacity: 0, y: 8 })

        let isLocked = false

        const onMouseEnterLeft = () => {
          if (isLocked) return
          gsap.to(".panel-left-wrapper", { clipPath: "inset(0 42% 0 0)", duration: 0.5, ease: "power3.out" })
          gsap.to(".panel-right-wrapper", { clipPath: "inset(0 0 0 58%)", duration: 0.5, ease: "power3.out" })
          gsap.to(".hero-seam-main", { x: "8vw", duration: 0.5, ease: "power3.out" })
          gsap.to(".panel-left-wrapper .panel-overlay", { backgroundColor: "rgba(0,0,0,0)", duration: 0.4 })
          gsap.to(".panel-right-wrapper .panel-overlay", { backgroundColor: "rgba(0,0,0,0.6)", duration: 0.4 })
          gsap.to(".panel-left-wrapper .panel-desc", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.1 })
          
          // Move text blocks on hover to dodge the seam
          gsap.to(".panel-left-wrapper .hero-panel-content > div", { x: "-2vw", duration: 0.4, ease: "power2.out" })

          gsap.to(".hero-actor-atlas", { opacity: 0.98, duration: 0.35, ease: "power2.out" })
          gsap.to(".hero-actor-vitruvian", { opacity: 0.3, duration: 0.35, ease: "power2.out" })
        }

        const onMouseEnterRight = () => {
          if (isLocked) return
          gsap.to(".panel-left-wrapper", { clipPath: "inset(0 58% 0 0)", duration: 0.5, ease: "power3.out" })
          gsap.to(".panel-right-wrapper", { clipPath: "inset(0 0 0 42%)", duration: 0.5, ease: "power3.out" })
          gsap.to(".hero-seam-main", { x: "-8vw", duration: 0.5, ease: "power3.out" })
          gsap.to(".panel-left-wrapper .panel-overlay", { backgroundColor: "rgba(0,0,0,0.6)", duration: 0.4 })
          gsap.to(".panel-right-wrapper .panel-overlay", { backgroundColor: "rgba(0,0,0,0)", duration: 0.4 })
          gsap.to(".panel-right-wrapper .panel-desc", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.1 })

          // Move text blocks on hover to dodge the seam
          gsap.to(".panel-right-wrapper .hero-panel-content > div", { x: "2vw", duration: 0.4, ease: "power2.out" })

          gsap.to(".hero-actor-atlas", { opacity: 0.3, duration: 0.35, ease: "power2.out" })
          gsap.to(".hero-actor-vitruvian", { opacity: 0.98, duration: 0.35, ease: "power2.out" })
        }

        const onMouseLeave = () => {
          if (isLocked) return
          gsap.to(".panel-left-wrapper", { clipPath: "inset(0 50% 0 0)", duration: 0.5, ease: "power3.out" })
          gsap.to(".panel-right-wrapper", { clipPath: "inset(0 0 0 50%)", duration: 0.5, ease: "power3.out" })
          gsap.to(".hero-seam-main", { x: "0vw", duration: 0.5, ease: "power3.out" })
          gsap.to(".panel-overlay", { backgroundColor: "rgba(0,0,0,0.2)", duration: 0.4 })
          gsap.to(".panel-desc", { opacity: 0, y: 8, duration: 0.3, ease: "power2.in" })
          
          gsap.to(".panel-left-wrapper .hero-panel-content > div", { x: "0vw", duration: 0.4, ease: "power2.out" })
          gsap.to(".panel-right-wrapper .hero-panel-content > div", { x: "0vw", duration: 0.4, ease: "power2.out" })

          gsap.to(".hero-actor", { opacity: 1, filter: "grayscale(0%) brightness(1.3) contrast(1.1)", duration: 0.35, ease: "power2.out" })
        }

        const leftPanelEl = document.querySelector(".panel-left-wrapper")
        const rightPanelEl = document.querySelector(".panel-right-wrapper")

        leftPanelEl?.addEventListener("mouseenter", onMouseEnterLeft)
        leftPanelEl?.addEventListener("mouseleave", onMouseLeave)
        rightPanelEl?.addEventListener("mouseenter", onMouseEnterRight)
        rightPanelEl?.addEventListener("mouseleave", onMouseLeave)

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            onUpdate: (self) => {
              const p = self.progress
              const sysTextEl = containerRef.current?.querySelector(".system-status-text") as HTMLElement | null

              if (p > 0.05 && !isLocked) {
                isLocked = true
                gsap.set(".panel-container", { cursor: "default" })
                gsap.to(".panel-left-wrapper", { clipPath: "inset(0 50% 0 0)", duration: 0.3 })
                gsap.to(".panel-right-wrapper", { clipPath: "inset(0 0 0 50%)", duration: 0.3 })
                gsap.to(".hero-seam-main", { x: "0vw", duration: 0.3 })
                gsap.to(".panel-desc", { opacity: 0, duration: 0.2 })
              } else if (p <= 0.05 && isLocked) {
                isLocked = false
                gsap.set(".panel-container", { cursor: "pointer" })
              }

              if (sysTextEl) {
                if (p < 0.1) sysTextEl.textContent = "SYSTEM.ACTIVE"
                else if (p >= 0.1 && p < 0.2) sysTextEl.textContent = "SURGE_DETECTED // MULTIPLYING"
                else if (p >= 0.2 && p < 0.4) sysTextEl.textContent = "DATA_OVERLOAD // CASCADE"
                else if (p >= 0.4 && p < 0.7) sysTextEl.textContent = "MATRIX_BLEED // UNIFYING"
                else sysTextEl.textContent = "SYSTEM.UNIFIED"
              }

              const barsContainer = containerRef.current?.querySelector(".progress-bars") as HTMLElement | null
              if (barsContainer) {
                const bars = Math.floor(p * 8)
                const children = barsContainer.children
                for (let i = 0; i < children.length; i++) {
                  ;(children[i] as HTMLElement).style.opacity = i < bars ? "0.8" : "0.3"
                }
              }
            },
          },
        })

        // Phase 1: split identity, hide panel captions as scroll starts
        masterTl.to(".hero-panel-content, .panel-bracket, .scroll-indicator", { opacity: 0, duration: 0.1, ease: "power2.inOut" }, 0)
        masterTl.to(
          ".hero-seam-main",
          {
            width: "6px",
            backgroundColor: "rgba(255, 255, 255, 1)",
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
            duration: 0.1,
            ease: "power2.in",
          },
          0.05
        )

        // Phase 2: overload and destabilization
        const overloadStart = 0.15

        masterTl.to(
          [".panel-left-wrapper", ".panel-right-wrapper"],
          {
            filter: "grayscale(100%) brightness(0.6) contrast(150%)",
            duration: 0.05,
          },
          overloadStart
        )

        masterTl.to(
          [".panel-left-wrapper", ".panel-right-wrapper"],
          {
            opacity: 0,
            scale: 1.05,
            duration: 0.2,
            ease: "power3.in",
          },
          overloadStart + 0.1
        )

        masterTl.to(
          ".hero-actor",
          {
            filter: "grayscale(100%) brightness(1.2) contrast(1.4)", // Raised brightness and contrast for overload phase
            duration: 0.08,
          },
          overloadStart
        )

        // Phase 2 motion: converge + shrink
        if (actorPhaseMotionProfile.phase2.move === "converge") {
          masterTl.to(
            ".hero-actor-left",
            {
              xPercent: 10,
              rotation: -0.4,
              scale: actorPhaseMotionProfile.phase2.scale === "shrink" ? 0.88 : 0.96,
              duration: 0.14,
              ease: "power2.out",
            },
            overloadStart + 0.04
          )

          masterTl.to(
            ".hero-actor-right",
            {
              xPercent: -10,
              rotation: 0.4,
              scale: actorPhaseMotionProfile.phase2.scale === "shrink" ? 0.8 : 0.88,
              duration: 0.14,
              ease: "power2.out",
            },
            overloadStart + 0.04
          )
        }

        masterTl.set(".overload-lines", { opacity: 1 }, overloadStart)

        const lines = gsap.utils.toArray(".overload-line")
        lines.forEach((line: any) => {
          const targetX = gsap.utils.random(-50, 50) + "vw"

          masterTl.to(
            line,
            {
              x: targetX,
              scaleY: gsap.utils.random(0.3, 1),
              yPercent: gsap.utils.random(-20, 20),
              opacity: gsap.utils.random(0.5, 1),
              duration: 0.1,
              ease: "power3.out",
            },
            overloadStart
          )

          masterTl.to(
            line,
            {
              yPercent: 200,
              scaleY: gsap.utils.random(2, 5),
              opacity: 0,
              duration: 0.15,
              ease: "power2.in",
            },
            overloadStart + 0.12
          )
        })

        masterTl.to(".hero-seam-main", { opacity: 0, scaleY: 2, duration: 0.1 }, overloadStart)

        // Phase 3: cascade and convergence
        const cascadeStart = 0.52

        masterTl.to(".corruption-layer", { opacity: 1, duration: 0.1, ease: "none" }, 0.45)

        masterTl.fromTo(
          ".matrix-rain-container",
          { "--bleed-progress": "-50%" },
          { "--bleed-progress": "100%", duration: 0.35, ease: "power1.inOut" },
          cascadeStart
        )

        // Phase 3 motion: hold near center, avoid outward push
        if (actorPhaseMotionProfile.phase3.move === "hold-center") {
          masterTl.to(
            ".hero-actor-left",
            {
              xPercent: 8,
              scale: actorPhaseMotionProfile.phase3.scale === "hold" ? 0.9 : 0.95,
              rotation: 0,
              duration: 0.28,
              ease: "power2.inOut",
            },
            cascadeStart
          )

          masterTl.to(
            ".hero-actor-right",
            {
              xPercent: -8,
              scale: actorPhaseMotionProfile.phase3.scale === "hold" ? 0.82 : 0.88,
              rotation: 0,
              duration: 0.28,
              ease: "power2.inOut",
            },
            cascadeStart
          )
        }

        // Phase 4: unified copy foreground + ghost actors in background
        const rebirthStart = 0.75

        if (phase4LayerMode === "actors_above_effects") {
          masterTl.to(
            ".hero-actors-layer",
            {
              zIndex: 42,
              duration: 0.04,
              ease: "none",
            },
            rebirthStart
          )
        }

        masterTl.to(
          ".hero-actor",
          {
            opacity: phase4ActorProfile.minOpacity,
            filter: `grayscale(65%) brightness(${phase4ActorProfile.minBrightness}) contrast(1.18) blur(${phase4ActorProfile.maxBlurPx}px)`,
            duration: 0.2,
            ease: "power2.out",
          },
          rebirthStart
        )

        // Phase 4 motion: grow + diverge
        if (actorPhaseMotionProfile.phase4.move === "diverge") {
          masterTl.to(
            ".hero-actor-left",
            {
              xPercent: -16,
              scale: actorPhaseMotionProfile.phase4.scale === "grow" ? 1.02 : 0.95,
              duration: 0.22,
              ease: "power2.out",
            },
            rebirthStart + 0.01
          )

          masterTl.to(
            ".hero-actor-right",
            {
              xPercent: 16,
              scale: actorPhaseMotionProfile.phase4.scale === "grow" ? 0.92 : 0.86,
              duration: 0.22,
              ease: "power2.out",
            },
            rebirthStart + 0.01
          )
        }

        masterTl.to(".s2-label", { opacity: 1, duration: 0.05, ease: "none" }, rebirthStart)

        masterTl.fromTo(
          ".s2-headline",
          { opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.15, ease: "power2.out" },
          rebirthStart + 0.02
        )

        masterTl.fromTo(
          ".s2-subheadline",
          { opacity: 0, y: 40, filter: "blur(5px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.1, ease: "power2.out" },
          rebirthStart + 0.08
        )

        masterTl.fromTo(
          ".s2-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
          rebirthStart + 0.12
        )

        masterTl.to(".s2-stats", { opacity: 1, duration: 0.1, ease: "power2.out" }, rebirthStart + 0.15)

        return () => {
          leftPanelEl?.removeEventListener("mouseenter", onMouseEnterLeft)
          leftPanelEl?.removeEventListener("mouseleave", onMouseLeave)
          rightPanelEl?.removeEventListener("mouseenter", onMouseEnterRight)
          rightPanelEl?.removeEventListener("mouseleave", onMouseLeave)
        }
      })

      mm.add("(max-width: 1023px)", () => {
        gsap.set(".s2-mobile-content", { opacity: 1 })
        gsap.set(".matrix-rain-container", { "--bleed-progress": "100%" })
        gsap.set(".corruption-layer", { opacity: 0.6 })
        gsap.set(".hero-seam-container", { display: "none" })
        gsap.set(".hero-actor-left", { xPercent: 8, scale: 0.9 })
        gsap.set(".hero-actor-right", { xPercent: -8, scale: 0.82 })
        gsap.set(".hero-actor", {
          opacity: 0.75, // Increased for mobile
          filter: "grayscale(65%) brightness(1.15) contrast(1.15)", // Increased brightness for mobile
        })
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="hero-scroll-container w-full h-[350vh] bg-black">
      <div className="hero-sticky sticky top-0 w-full h-screen overflow-hidden">
        <SharedBackground isMobile={false} />
        <HeroActorsLayer />

        {/* Desktop panels (phase-1 framing only) */}
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

        {/* The seam lives above actors and panels */}
        <HeroSeam />

        <SharedTopBar />
        <SharedBottomBar />

        {/* Mobile view structure */}
        <div className="s2-mobile-content absolute inset-0 z-30 flex flex-col items-center justify-center px-6 lg:hidden opacity-0">
          <h2 className="text-[36px] font-medium leading-[1.1] text-center text-white font-serif mb-4 text-balance">
            Brand, product, and intelligent systems. Built as one.
          </h2>
          <div className="text-white/35 font-mono text-[10px] tracking-[0.2em] mt-12 animate-bounce">↓ SCROLL TO EXPLORE</div>
        </div>

        {/* Layer 1: Corruption */}
        <div className="corruption-layer absolute inset-0 z-[35] bg-black opacity-0 pointer-events-none" />

        {/* Layer 2: Falling shader */}
        <div
          className="matrix-rain-container absolute inset-0 z-[40] pointer-events-none overflow-hidden"
          style={{
            "--bleed-progress": "0%",
            maskImage:
              "linear-gradient(to bottom, black 0%, black var(--bleed-progress), transparent calc(var(--bleed-progress) + 30vh), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black var(--bleed-progress), transparent calc(var(--bleed-progress) + 30vh), transparent 100%)",
          } as React.CSSProperties}
        >
          <FallingPattern
            color="rgba(255,255,255,0.4)"
            blurIntensity="1em"
            density={1}
            duration={150}
            className="dark bg-black/40 backdrop-blur-md"
          />
        </div>

        {/* Unified final copy */}
        <div className="absolute inset-0 z-[45] items-center justify-center pointer-events-none hidden lg:flex">
          <div className="max-w-[720px] w-full px-6 text-center">
            <div className="s2-label opacity-0 text-white/40 font-mono text-[10px] tracking-[0.15em] mb-12">Founder-led studio</div>
            <h1 className="s2-headline opacity-0 text-white text-[42px] lg:text-[64px] font-medium leading-[1.1] font-serif tracking-tight mb-8 text-balance mx-auto">
              Brand, product, and intelligent systems. Built as one.
            </h1>
            <p className="s2-subheadline opacity-0 text-white/65 font-mono text-[14px] lg:text-[15px] leading-[1.7] max-w-[640px] mx-auto mb-10 text-balance">
              Creative direction at global brand level. Engineering shaped in fintech. Product thinking from platforms we composed and shipped
              ourselves. One operating team. Led by founders. Backed by specialists.
            </p>
            <div className="s2-ctas opacity-0 flex items-center justify-center gap-6 mb-12 pointer-events-auto">
              <Link 
                href="/contact" 
                className="group relative px-8 py-4 bg-[var(--mozaic-green)] text-black font-mono text-[12px] tracking-[0.1em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)]"
              >
                <span className="relative z-10 font-bold">START A PROJECT</span>
                <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
              </Link>
              <HashLink 
                href="#work" 
                className="group relative px-8 py-4 border border-white/30 text-white font-mono text-[12px] tracking-[0.1em] overflow-hidden transition-all duration-300 hover:border-white"
              >
                <span className="relative z-10">VIEW WORK</span>
                <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
              </HashLink>
            </div>
            <div className="s2-stats opacity-0 flex items-center justify-center gap-6 font-mono text-[11px] text-white/45">
              <span>ONE OPERATING TEAM</span>
              <span>FOUNDER-LED</span>
              <span>SPECIALIST-BACKED</span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator hidden lg:block">
          <ScrollIndicator />
        </div>
      </div>
    </div>
  )
}
