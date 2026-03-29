"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Link from "next/link"
import { AsciiAtlasActor } from "@/components/split-hero/ascii-atlas-actor"
import { AsciiVitruvianActor } from "@/components/split-hero/ascii-vitruvian-actor"
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
  
  // HUD Refs
  const hudRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // ---------------------------------------------------------------------------
    // PRE-RENDER SETUP
    // ---------------------------------------------------------------------------
    
    // 1. The Payload: Set deep in Z-space, scaled down, completely hidden
    gsap.set(unifiedPayloadRef.current, {
      scale: 0.8, // Don't scale too small, it looks unnatural. 0.8 is subtle.
      autoAlpha: 0,
      z: -1000 // Deep space
    })

    // 2. The Matrix Rain: Hide it and reset the bleed progress mask
    gsap.set(matrixRainRef.current, { 
      autoAlpha: 0,
      "--bleed-progress": "0%" 
    })

    // 3. Corruption Layer: Completely invisible overlay
    gsap.set(corruptionLayerRef.current, { 
      autoAlpha: 0 
    })

    // Create the master timeline linked to the user's scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // 300vh of scrolling runway
        pin: pinRef.current,
        scrub: 1, // 1-second smoothing for buttery momentum
        snap: {
          snapTo: [0, 0.45, 1], // The Spring Lock: Start, Payload Reveal, Hold End
          duration: { min: 0.2, max: 0.8 },
          ease: "power1.inOut"
        }
      }
    })

    // ---------------------------------------------------------------------------
    // PHASE 1: THE HOOK (Flythrough - 0s to 3s)
    // ---------------------------------------------------------------------------
    
    // Instantly fade out scroll hint, but keep HUD alive longer for OS feel
    tl.to(scrollHintRef.current, { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 0)
    tl.to(hudRef.current, { autoAlpha: 0.2, duration: 2, ease: "power2.out" }, 0) // Dim HUD, don't kill it

    // Fly Atlas (Top Actor) towards and past the camera
    tl.to(topActorRef.current, {
      z: 1500, // Move way past the camera (Perspective is 1000)
      y: -300,
      x: -80,
      scale: 3,
      autoAlpha: 0, // Fade out as it passes lens
      filter: "blur(30px)", // Intense DOF
      duration: 3,
      ease: "power3.in" // Accelerates as it gets closer
    }, 0)

    // Fly Top Text
    tl.to(topTextRef.current, {
      z: 1500,
      y: -450,
      scale: 3,
      autoAlpha: 0,
      filter: "blur(20px)",
      duration: 3,
      ease: "power3.in"
    }, 0)

    // Fly Vitruvian (Bottom Actor) towards and past the camera
    tl.to(bottomActorRef.current, {
      z: 1500,
      y: 300,
      x: 80,
      scale: 3,
      autoAlpha: 0,
      filter: "blur(30px)",
      duration: 3,
      ease: "power3.in"
    }, 0)

    // Fly Bottom Text
    tl.to(bottomTextRef.current, {
      z: 1500,
      y: 450,
      scale: 3,
      autoAlpha: 0,
      filter: "blur(20px)",
      duration: 3,
      ease: "power3.in"
    }, 0)

    // ---------------------------------------------------------------------------
    // TRANSITION: CORRUPTION LAYER (1.5s to 2.5s)
    // ---------------------------------------------------------------------------
    // As the actors get close, the screen darkens slightly to mask the swap
    tl.to(corruptionLayerRef.current, {
      autoAlpha: 0.8,
      duration: 1,
      ease: "power1.inOut"
    }, 1.5)

    // ---------------------------------------------------------------------------
    // PHASE 2: THE REVEAL (Payload & Rain - 2s to 4s)
    // ---------------------------------------------------------------------------
    
    // Matrix Rain bleeds down from the top and fades in
    tl.to(matrixRainRef.current, {
      autoAlpha: 1,
      "--bleed-progress": "100%",
      duration: 2,
      ease: "power2.out"
    }, 2)

    // The Payload (CTAs/Text) floats in from deep space
    tl.to(unifiedPayloadRef.current, {
      scale: 1,
      autoAlpha: 1, // Visible and clickable
      z: 0, // Rests at normal screen depth
      duration: 2.5,
      ease: "back.out(1.2)" // Slight overshoot for impact
    }, 2)

    // ---------------------------------------------------------------------------
    // PHASE 3: THE HOLD & RELEASE (4s to 6.5s)
    // ---------------------------------------------------------------------------
    
    // Inject 2.5s of "dead space" into the timeline. 
    // This holds the screen pinned so the user can read and click the CTAs.
    tl.to({}, { duration: 2.5 })

  }, { scope: containerRef })

  return (
    // The Track: 400dvh gives us enough scrolling runway for the timeline
    <div ref={containerRef} className="relative w-full h-[400dvh] bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* 
        The Viewport Wrapper (Handles Overflow)
        CRITICAL FIX: overflow:hidden MUST be separated from preserve-3d, 
        otherwise Safari/Chrome flattens the Z-axis into a 2D block.
      */}
      <div 
        ref={pinRef}
        className="h-[100dvh] w-full overflow-hidden relative"
      >
        
        {/* HUD: GLOBAL MOZAIC FRAME (Outside 3D context) */}
        <div ref={hudRef} className="absolute inset-0 z-50 p-6 pointer-events-none mix-blend-screen">
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/30 m-6" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/30 m-6" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/30 m-6" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/30 m-6" />
          
          <div className="absolute top-0 inset-x-0 pt-16 flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 text-[9px] font-mono tracking-[0.4em] text-white/50 uppercase">
              <span className="opacity-70">OS.BOOT_SEQ</span>
              <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="opacity-70">SYS.LOCKED</span>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div 
          ref={scrollHintRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/80 mb-3 whitespace-nowrap drop-shadow-md">INITIATE BOOT</span>
          <div className="w-px h-10 bg-gradient-to-b from-white via-white/50 to-transparent animate-pulse" />
        </div>

        {/* 
          The 3D Scene (Handles Z-Space Depth)
          This inner div holds perspective and preserve-3d safely.
        */}
        <div 
          ref={sceneRef}
          className="absolute inset-0 w-full h-full"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >

          {/* TOP ACTOR (ATLAS) */}
          <div 
            ref={topActorRef}
            className="absolute top-[5%] inset-x-0 flex items-center justify-center mix-blend-screen scale-[1.1] pointer-events-none will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-[120vw] h-[120vw]">
              <AsciiAtlasActor className="w-full h-full object-contain" />
            </div>
          </div>

          {/* TOP TEXT (STUDIO) */}
          <div 
            ref={topTextRef}
            className="absolute top-[32%] left-6 w-full pointer-events-none will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white/40 text-[10px] font-mono tracking-[0.3em]">01 ──</span>
              <span className="text-white text-[10px] font-mono tracking-[0.2em] drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">STUDIO</span>
            </div>
            <h2 className="text-[28px] leading-[1.05] font-medium tracking-tight text-white max-w-[280px] drop-shadow-lg font-serif italic">
              Brand systems <br />with signal.
            </h2>
          </div>

          {/* BOTTOM ACTOR (VITRUVIAN) */}
          <div 
            ref={bottomActorRef}
            className="absolute top-[48%] inset-x-0 flex items-center justify-center mix-blend-screen scale-[0.85] pointer-events-none will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-[120vw] h-[120vw]">
              <AsciiVitruvianActor className="w-full h-full object-contain" />
            </div>
          </div>

          {/* BOTTOM TEXT (SYSTEMS) */}
          <div 
            ref={bottomTextRef}
            className="absolute top-[58%] left-6 w-full pointer-events-none will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white/40 text-[10px] font-mono tracking-[0.3em]">02 ──</span>
              <span className="text-white text-[10px] font-mono tracking-[0.2em] drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">PRODUCT & SYSTEMS</span>
            </div>
            <h2 className="text-[28px] leading-[1.05] font-medium tracking-tight text-white max-w-[280px] drop-shadow-lg font-serif italic">
              Software that carries <br />the business.
            </h2>
          </div>

          {/* CORRUPTION LAYER (Cinematic darkening transition) */}
          <div 
            ref={corruptionLayerRef}
            className="absolute inset-0 bg-black pointer-events-none will-change-[opacity]"
            style={{ transform: "translateZ(0px)" }} // Keeps it flat but inside 3D space
          />

          {/* 
            MATRIX RAIN (FallingPattern) 
            Restored matching the desktop aesthetic with the bleeding mask
          */}
          <div
            ref={matrixRainRef}
            className="absolute inset-0 pointer-events-none overflow-hidden will-change-[opacity]"
            style={{
              "--bleed-progress": "0%",
              maskImage: "linear-gradient(to bottom, black 0%, black var(--bleed-progress), transparent calc(var(--bleed-progress) + 30vh), transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black var(--bleed-progress), transparent calc(var(--bleed-progress) + 30vh), transparent 100%)",
              transform: "translateZ(0px)"
            } as React.CSSProperties}
          >
            <FallingPattern 
              color="rgba(255,255,255,0.4)" 
              blurIntensity="1em" 
              density={1} 
              duration={150} 
              className="bg-black/20 backdrop-blur-sm"
            />
          </div>

          {/* UNIFIED PAYLOAD (CTAs & Final Text) */}
          <div 
            ref={unifiedPayloadRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative z-10 w-full flex flex-col items-center pointer-events-auto">
              
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-4 w-full mb-10">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/30 max-w-[60px]" />
                <span className="text-white/80 text-[10px] font-mono tracking-[0.3em] font-bold uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  System.Unified
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/30 max-w-[60px]" />
              </div>

              {/* Headline */}
              <h1 className="text-[40px] leading-[1.05] font-medium tracking-tight text-white font-serif mb-6 text-balance max-w-[340px]">
                Brand, product, and intelligent systems.
                <span className="block text-white/50 mt-3 italic">Built as one.</span>
              </h1>

              {/* Subtext */}
              <p className="text-[14px] leading-[1.6] font-mono text-white/50 mb-12 max-w-[300px] tracking-wide text-balance">
                One operating team. Led by founders. Backed by specialists. We build complete digital systems.
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-4 w-full max-w-[300px]">
                <Link 
                  href="/contact" 
                  className="group relative w-full py-4 bg-white text-black font-mono text-[13px] font-bold tracking-[0.15em] overflow-hidden active:scale-[0.98] transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-neutral-200 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10">START A PROJECT</span>
                </Link>
                
                <Link 
                  href="#work" 
                  className="group relative w-full py-4 border border-white/20 text-white font-mono text-[13px] tracking-[0.15em] overflow-hidden active:scale-[0.98] active:bg-white/5 transition-all duration-500"
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
