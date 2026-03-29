"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Link from "next/link"

import { AsciiAtlasActor } from "@/components/split-hero/ascii-atlas-actor"
import { AsciiVitruvianActor } from "@/components/split-hero/ascii-vitruvian-actor"
import { SharedTopBar, SharedBottomBar, SharedBackground } from "@/components/split-hero/shared-elements"
import { FallingPattern } from "@/components/ui/falling-pattern"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export default function HeroC5OSBoot() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  
  // Actor & Text Refs
  const topActorRef = useRef<HTMLDivElement>(null)
  const topTextRef = useRef<HTMLDivElement>(null)
  const bottomActorRef = useRef<HTMLDivElement>(null)
  const bottomTextRef = useRef<HTMLDivElement>(null)
  
  // Payload & Effects Refs
  const unifiedPayloadRef = useRef<HTMLDivElement>(null)
  const matrixRainRef = useRef<HTMLDivElement>(null)
  const corruptionLayerRef = useRef<HTMLDivElement>(null)
  const volumetricShadowRef = useRef<HTMLDivElement>(null)
  
  // Global HUD Refs
  const hudWrapperRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // ---------------------------------------------------------------------------
    // PRE-RENDER SETUP
    // ---------------------------------------------------------------------------
    
    // 1. The Payload: Set deep in Z-space, completely hidden. 
    gsap.set(unifiedPayloadRef.current, {
      autoAlpha: 0,
      z: -2500 // Start much deeper for the tunnel effect
    })

    // 2. The Matrix Rain: Condensation state
    gsap.set(matrixRainRef.current, { 
      autoAlpha: 0,
      scale: 1.15, // Starts slightly scaled up (un-condensed)
      clipPath: "inset(0% 0% 100% 0%)" // Hardware-accelerated mask hidden from bottom up
    })

    // 3. Corruption Layer & Shadow Shield: Completely invisible
    gsap.set([corruptionLayerRef.current, volumetricShadowRef.current], { 
      autoAlpha: 0 
    })

    // Create the master timeline linked to the user's scroll position
    // Symmetrical Math: 0% (0s), 50% (3s), 100% (6s)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // 300vh = 3 screen lengths
        pin: pinRef.current,
        // UI/UX FIX: Snappy scrub to remove floaty lag
        scrub: 0.8, 
        snap: {
          snapTo: [0, 0.5, 1],
          delay: 0.15, // Wait until thumb is completely done moving
          duration: { min: 0.3, max: 0.8 }, 
          ease: "power2.inOut" // Smooth, magnetic snap
        }
      }
    })

    // ---------------------------------------------------------------------------
    // OVERLAPPING PHASES (0s to 3s)
    // Phase 1 (Flythrough) runs 0s -> 2.5s
    // Phase 2 (Reveal) runs 0.5s -> 3s
    // ---------------------------------------------------------------------------
    
    // Instantly fade out scroll hint
    tl.to(scrollHintRef.current, { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, 0)
    
    // Dim the Global HUD
    tl.to(hudWrapperRef.current, { autoAlpha: 0.3, duration: 1, ease: "power2.out" }, 0) 

    // Z-PARALLAX & FOCAL ILLUSION: Replace heavy blurs with micro-blurs + opacity fade
    // This guarantees 60fps on mobile GPUs while keeping visceral depth

    tl.to(topTextRef.current, {
      z: 2200,
      y: -500,
      autoAlpha: 0,
      filter: "blur(4px)", // Micro-blur
      duration: 2.5,
      ease: "power3.in"
    }, 0)

    tl.to(topActorRef.current, {
      z: 1600,
      y: -400,
      x: -120,
      autoAlpha: 0, 
      filter: "blur(6px)", 
      duration: 2.5,
      ease: "power3.in" 
    }, 0)

    tl.to(bottomTextRef.current, {
      z: 2200,
      y: 500,
      autoAlpha: 0,
      filter: "blur(4px)",
      duration: 2.5,
      ease: "power3.in"
    }, 0)

    tl.to(bottomActorRef.current, {
      z: 1600,
      y: 400,
      x: 120,
      autoAlpha: 0,
      filter: "blur(6px)",
      duration: 2.5,
      ease: "power3.in"
    }, 0)

    // CORRUPTION LAYER masks the cross-fade
    tl.to(corruptionLayerRef.current, {
      autoAlpha: 0.85, 
      duration: 1.5,
      ease: "power2.inOut"
    }, 0.5)

    // REVEAL: Rain condenses onto the glass (0.5s to 3s)
    // Clip-path grows downwards like shooting lines of code
    tl.to(matrixRainRef.current, {
      autoAlpha: 1,
      scale: 1, // Condenses
      clipPath: "inset(0% 0% 0% 0%)", // Grows down to full screen
      duration: 2.5,
      ease: "power2.out"
    }, 0.5)

    // The Payload floats in from deep space, intersecting the flying actors
    tl.to(unifiedPayloadRef.current, {
      autoAlpha: 1, 
      z: 0, 
      duration: 2.5,
      ease: "power3.out" 
    }, 0.5)

    // Fade up volumetric shadow
    tl.to(volumetricShadowRef.current, {
      autoAlpha: 1,
      duration: 2,
      ease: "power2.out"
    }, 1)

    // Restore HUD
    tl.to(hudWrapperRef.current, { autoAlpha: 1, duration: 1, ease: "power2.out" }, 2) 

    // ---------------------------------------------------------------------------
    // PHASE 3: THE HOLD & RELEASE (3s to 6s)
    // ---------------------------------------------------------------------------
    // This perfectly spans the 50% -> 100% snap runway.
    tl.to({}, { duration: 3 })

  }, { scope: containerRef })

  return (
    // The Track: Height is managed dynamically by GSAP pinSpacing to prevent double-padding
    <div ref={containerRef} className="relative w-full bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* 
        The Viewport Wrapper (Handles Overflow)
        Strictly 2D box to prevent Webkit from flattening the 3D children.
      */}
      <div 
        ref={pinRef}
        className="h-[100dvh] w-full overflow-hidden relative"
      >
        
        {/* GLOBAL MOZAIC HUD (Top & Bottom Bars - Unified Aesthetic) */}
        <div ref={hudWrapperRef} className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-between mix-blend-screen">
          <SharedTopBar />
          <div className="flex-1" />
          <SharedBottomBar />
        </div>

        {/* Scroll Hint */}
        <div 
          ref={scrollHintRef}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none"
        >
          <span className="text-[9px] font-mono tracking-[0.25em] text-white/80 mb-3 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">INITIATE SYSTEM</span>
          <div className="w-px h-12 bg-gradient-to-b from-white via-white/50 to-transparent animate-pulse" />
        </div>

        {/* 
          The 3D Scene (Handles Z-Space Depth)
          This inner div holds perspective safely.
        */}
        <div 
          ref={sceneRef}
          className="absolute inset-0 w-full h-full"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >

          {/* SHARED MOZAIC BACKGROUND (Grid & Radials) */}
          <SharedBackground isMobile={true} />

          {/* TOP ACTOR (ATLAS) */}
          <div 
            ref={topActorRef}
            className="absolute top-[8%] inset-x-0 flex items-center justify-center mix-blend-screen scale-[1.15] pointer-events-none will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-[130vw] h-[130vw]">
              <AsciiAtlasActor className="w-full h-full object-contain" />
            </div>
          </div>

          {/* TOP TEXT (STUDIO) - UI FIX: Absolute container with responsive padding instead of left-X */}
          <div 
            ref={topTextRef}
            className="absolute top-[35%] inset-x-0 px-6 sm:px-8 pointer-events-none will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white/40 text-[9px] font-mono tracking-[0.3em]">01 ──</span>
              <span className="text-white text-[9px] font-mono tracking-[0.25em] drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">STUDIO</span>
            </div>
            <h2 className="text-[32px] leading-[1.05] font-medium tracking-tight text-white max-w-[280px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] font-serif italic">
              Brand systems <br />with signal.
            </h2>
          </div>

          {/* BOTTOM ACTOR (VITRUVIAN) */}
          <div 
            ref={bottomActorRef}
            className="absolute top-[45%] inset-x-0 flex items-center justify-center mix-blend-screen scale-[0.9] pointer-events-none will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-[130vw] h-[130vw]">
              <AsciiVitruvianActor className="w-full h-full object-contain" />
            </div>
          </div>

          {/* BOTTOM TEXT (SYSTEMS) - UI FIX: Responsive padding */}
          <div 
            ref={bottomTextRef}
            className="absolute top-[60%] inset-x-0 px-6 sm:px-8 pointer-events-none will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white/40 text-[9px] font-mono tracking-[0.3em]">02 ──</span>
              <span className="text-white text-[9px] font-mono tracking-[0.25em] drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">PRODUCT & SYSTEMS</span>
            </div>
            <h2 className="text-[32px] leading-[1.05] font-medium tracking-tight text-white max-w-[280px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] font-serif italic">
              Software that carries <br />the business.
            </h2>
          </div>

          {/* CORRUPTION LAYER (Cinematic darkening transition) */}
          <div 
            ref={corruptionLayerRef}
            className="absolute inset-0 bg-black pointer-events-none will-change-[opacity]"
            style={{ transform: "translateZ(0px)" }} 
          />

          {/* 
            MATRIX RAIN (FallingPattern) 
            UI FIX: Hardware-accelerated clip-path growth + Condensation scale
          */}
          <div
            ref={matrixRainRef}
            className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform"
            style={{ transform: "translateZ(0px)" }}
          >
            <FallingPattern 
              color="rgba(255,255,255,0.35)" 
              blurIntensity="1.5em" 
              density={1} 
              duration={120}
              className="bg-black/10 backdrop-blur-[2px]"
            />
          </div>

          {/* UNIFIED PAYLOAD (CTAs & Final Text) */}
          <div 
            ref={unifiedPayloadRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* VOLUMETRIC SHADOW SHIELD (Apple HIG Contrast Compliance) */}
            {/* UI FIX: Ultra-diffused, massive blurred ellipse instead of a hard radial gradient */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
              style={{ transform: "translateZ(-1px)" }} 
            >
              <div 
                ref={volumetricShadowRef}
                className="w-[180%] h-[60%] bg-black/80 blur-[60px] rounded-[100%] will-change-[opacity]" 
              />
            </div>

            <div className="relative z-10 w-full max-w-[280px] flex flex-col items-center pointer-events-auto mt-8">
              
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-4 w-full mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/40 max-w-[40px]" />
                <span className="text-white/90 text-[10px] font-mono tracking-[0.2em] font-bold uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                  System.Unified
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/40 max-w-[40px]" />
              </div>

              {/* Headline */}
              <h1 className="text-[36px] sm:text-[40px] leading-[1.05] font-medium tracking-tight text-white font-serif mb-5 text-balance">
                Brand, product, and intelligent systems.
                {/* UI FIX: mt-2 and 70% opacity for tighter optical bridging */}
                <span className="block text-white/70 mt-2 italic font-normal">Built as one.</span>
              </h1>

              {/* Subtext */}
              <p className="text-[13px] leading-[1.6] font-mono text-white/60 mb-10 max-w-[260px] tracking-wide text-balance">
                One operating team. Led by founders. Backed by specialists. We build complete digital systems.
              </p>

              {/* CTAs (Apple HIG: min-h-[44px], crisp typography) */}
              <div className="flex flex-col gap-3 w-full">
                <Link 
                  href="/contact" 
                  className="group relative w-full min-h-[44px] flex items-center justify-center bg-white text-black font-mono text-[12px] font-bold tracking-[0.1em] overflow-hidden active:scale-[0.98] transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-neutral-200 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10">START A PROJECT</span>
                </Link>
                
                <Link 
                  href="#work" 
                  className="group relative w-full min-h-[44px] flex items-center justify-center border border-white/20 text-white font-mono text-[12px] tracking-[0.1em] overflow-hidden active:scale-[0.98] active:bg-white/5 transition-all duration-500"
                >
                  <span className="relative z-10">VIEW WORK</span>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
