"use client"

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Link from "next/link"

import { AsciiAtlasActor } from "@/components/split-hero/ascii-atlas-actor"
import { AsciiVitruvianActor } from "@/components/split-hero/ascii-vitruvian-actor"
import { SharedTopBar, SharedBottomBar, SharedBackground } from "@/components/split-hero/shared-elements"
import { FallingPattern } from "@/components/ui/falling-pattern"
import { useScrambleText } from "@/components/landing/ui/Shared"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

function BootScrambleEyebrow({ isBooted }: { isBooted: boolean }) {
  const scrambledText = useScrambleText("SYSTEM.UNIFIED", isBooted)
  return (
    <span className="text-white/90 text-[10px] xl:text-[11px] font-mono tracking-[0.2em] font-bold uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
      {scrambledText}
    </span>
  )
}

function BootScrambleSubHeadline({ isBooted }: { isBooted: boolean }) {
  const [delayedBoot, setDelayedBoot] = useState(false)
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isBooted && !delayedBoot) {
      timeout = setTimeout(() => setDelayedBoot(true), 300)
    } else if (!isBooted && delayedBoot) {
      // Use setTimeout with 0 to schedule the state update after the effect body runs
      timeout = setTimeout(() => setDelayedBoot(false), 0)
    }
    return () => clearTimeout(timeout)
  }, [isBooted, delayedBoot])

  const scrambledText = useScrambleText("Built as one.", delayedBoot)
  return (
    <span className="block text-[#00FF00]/90 mt-4 italic font-normal font-serif text-[28px] xl:text-[32px] tracking-normal drop-shadow-[0_0_12px_rgba(0,255,0,0.4)]">
      {scrambledText}
    </span>
  )
}

export default function DesktopHeroTest() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  
  // Master Scene
  const sceneRef = useRef<HTMLDivElement>(null)
  const hitAreasRef = useRef<HTMLDivElement>(null)
  
  // STRICT DOM OWNERSHIP (Layer 1: The Timeline)
  // These wrappers are ONLY touched by the ScrollTrigger timeline.
  const tlStudioText = useRef<HTMLDivElement>(null)
  const tlSystemsText = useRef<HTMLDivElement>(null)
  const tlStudioActor = useRef<HTMLDivElement>(null)
  const tlSystemsActor = useRef<HTMLDivElement>(null)
  const tlPayload = useRef<HTMLDivElement>(null)
  const tlMatrixRain = useRef<HTMLDivElement>(null)

  // STRICT DOM OWNERSHIP (Layer 2: The Hover Engine)
  // These wrappers are ONLY touched by the 70/30 hover functions.
  const hvStudioText = useRef<HTMLDivElement>(null)
  const hvSystemsText = useRef<HTMLDivElement>(null)
  const hvStudioActor = useRef<HTMLDivElement>(null)
  const hvSystemsActor = useRef<HTMLDivElement>(null)
  
  // STRICT DOM OWNERSHIP (Layer 3: The Parallax Engine)
  const prlxStudioText = useRef<HTMLDivElement>(null)
  const prlxSystemsText = useRef<HTMLDivElement>(null)
  const prlxStudioActor = useRef<HTMLDivElement>(null)
  const prlxSystemsActor = useRef<HTMLDivElement>(null)
  const prlxPayload = useRef<HTMLDivElement>(null)

  // State
  const [isBooted, setIsBooted] = useState(false)
  const bootStateRef = useRef(false)
  const isWarpingRef = useRef(false)

  // Optical Baselines (The perfect center points)
  // Audited math: Pushed slightly wider to prevent overlap with central payload
  const BASE_VW = {
    stuText: -24,
    sysText: 24,
    stuActor: -28,
    sysActor: 28,
  }

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      // 1. Initial State (Setting the stage strictly on Timeline nodes)
      gsap.set(".anchor-center", { 
        left: "50%", 
        top: "50%", 
        xPercent: -50, 
        yPercent: -50,
      })
      
      // Timeline Baseline (TL handles the big spatial fade-outs)
      // Avoided 'translateZ' to prevent Z-axis clipping through matrix grid.
      // Replaced with Cinematic Depth of Field (Scale + Blur).
      gsap.set(tlStudioText.current, { opacity: 1, scale: 1, filter: "blur(0px)" })
      gsap.set(tlSystemsText.current, { opacity: 1, scale: 1, filter: "blur(0px)" })
      gsap.set(tlStudioActor.current, { opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }) 
      gsap.set(tlSystemsActor.current, { opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }) 
      
      // Deep Space Baseline (Waiting behind the scenes)
      gsap.set(tlPayload.current, { autoAlpha: 0, scale: 1.25, filter: "blur(24px)" })
      gsap.set(tlMatrixRain.current, { autoAlpha: 0, scale: 1.1 })

      // Hover Baseline (Setting the X coordinates safely here)
      // HV handles the local interaction opacities
      gsap.set(hvStudioText.current, { x: `${BASE_VW.stuText}vw`, scale: 1, opacity: 1 })
      gsap.set(hvSystemsText.current, { x: `${BASE_VW.sysText}vw`, scale: 1, opacity: 1 })
      gsap.set(hvStudioActor.current, { x: `${BASE_VW.stuActor}vw`, scale: 1, opacity: 0.8 })
      gsap.set(hvSystemsActor.current, { x: `${BASE_VW.sysActor}vw`, scale: 1, opacity: 0.8 })

      // 2. Ambient Floating (The "Breathing" Space)
      gsap.to(".floater", {
        y: () => gsap.utils.random(-15, 15),
        x: () => gsap.utils.random(-10, 10),
        duration: () => gsap.utils.random(4, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1
      })

      // 3. Mouse Parallax Engine
      const quicks = {
        stuText: { x: gsap.quickTo(prlxStudioText.current, "x", { ease: "power3.out" }), y: gsap.quickTo(prlxStudioText.current, "y", { ease: "power3.out" }) },
        sysText: { x: gsap.quickTo(prlxSystemsText.current, "x", { ease: "power3.out" }), y: gsap.quickTo(prlxSystemsText.current, "y", { ease: "power3.out" }) },
        stuActor: { x: gsap.quickTo(prlxStudioActor.current, "x", { ease: "power3.out" }), y: gsap.quickTo(prlxStudioActor.current, "y", { ease: "power3.out" }) },
        sysActor: { x: gsap.quickTo(prlxSystemsActor.current, "x", { ease: "power3.out" }), y: gsap.quickTo(prlxSystemsActor.current, "y", { ease: "power3.out" }) },
        payload: { x: gsap.quickTo(prlxPayload.current, "x", { ease: "power3.out", duration: 1.2 }), y: gsap.quickTo(prlxPayload.current, "y", { ease: "power3.out", duration: 1.2 }) }
      }

      const onMouseMove = (e: MouseEvent) => {
        if (isWarpingRef.current) return
        const nx = (e.clientX / innerWidth - 0.5) * 2
        const ny = (e.clientY / innerHeight - 0.5) * 2
        quicks.stuText.x(nx * -45); quicks.stuText.y(ny * -45)
        quicks.sysText.x(nx * -30); quicks.sysText.y(ny * -30)
        quicks.stuActor.x(nx * -25); quicks.stuActor.y(ny * -25)
        quicks.sysActor.x(nx * -15); quicks.sysActor.y(ny * -15)
        quicks.payload.x(nx * 15); quicks.payload.y(ny * 15)
      }
      
      const onMouseLeave = () => {
        if (isWarpingRef.current) return
        Object.values(quicks).forEach(q => { q.x(0); q.y(0) })
      }

      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseleave", onMouseLeave)

      // 4. THE APPLE-GRADE MAGNETIC STORY TIMELINE
      // Fix: Removed "double-easing" (using ease: "none" in tweens) so the scrub maps linearly to the scroll wheel.
      // Trackpad Optimization: Trackpads have native OS-level momentum. A high scrub (like 1.2) creates a "molasses" 
      // double-inertia effect. Lowering to 0.5 keeps chunky mouse wheels smooth but makes trackpads feel 1:1 responsive.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Reduced from 300% to tighten the transition zone
          pin: pinRef.current,
          scrub: 0.5, // Reduced for Trackpad responsiveness
          fastScrollEnd: true, // If user flicks the trackpad hard, don't force a slow catch-up. Jump to end.
          snap: {
            snapTo: [0, 1], // Magnetically glides to State 1 or State 2
            duration: { min: 0.4, max: 0.8 }, // Faster snap so it doesn't feel sluggish after OS momentum stops
            delay: 0.1, // Wait just long enough for trackpad inertia to die
            ease: "power3.inOut" // Apple's standard spring feel (expo is sometimes too jarring for short snaps)
          },
          onUpdate: (self) => {
            const p = self.progress
            const isWarp = p > 0.05 && p < 0.95

            // State Edge Detection
            if (isWarp !== isWarpingRef.current) {
               isWarpingRef.current = isWarp
               window.dispatchEvent(new CustomEvent("mozaic-warp-state", { detail: { isWarping: isWarp } }))
               
               if (isWarp && hitAreasRef.current) {
                 hitAreasRef.current.style.pointerEvents = "none"
                 
                 // Gracefully reset the HOVER nodes to baseline immediately when transition starts
                 gsap.to(hvStudioText.current, { x: `${BASE_VW.stuText}vw`, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" })
                 gsap.to(hvSystemsText.current, { x: `${BASE_VW.sysText}vw`, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" })
                 // Boost actor hover-layer opacity during warp so they shine in State 2
                 gsap.to(hvStudioActor.current, { x: `${BASE_VW.stuActor}vw`, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" })
                 gsap.to(hvSystemsActor.current, { x: `${BASE_VW.sysActor}vw`, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" })
                 
               } else if (!isWarp && hitAreasRef.current) {
                 hitAreasRef.current.style.pointerEvents = "auto"
               }
            }
            
            // Trigger boot scramble exactly as payload hits peak opacity
            if (p >= 0.75 && !bootStateRef.current) {
              bootStateRef.current = true; setIsBooted(true)
            } else if (p < 0.75 && bootStateRef.current) {
              bootStateRef.current = false; setIsBooted(false)
            }
          }
        }
      })

      // -- THE CHOREOGRAPHY (Linear Timeline for Perfect Scrubbing) --
      // MUST use ease: "none" when tied to a scrubbed ScrollTrigger. 
      // This prevents "muddy" scroll behavior where tweens slow down arbitrarily.
      
      // Phase 1: Foreground vanishes with dramatic motion blur (0.0 to 0.4)
      tl.to([tlStudioText.current, tlSystemsText.current], { 
        scale: 2.2, 
        filter: "blur(20px)", 
        autoAlpha: 0, 
        duration: 0.4, 
        ease: "none" // CRITICAL FIX: Linear mapping to scroll
      }, 0)

      // Phase 2: Actors become out-of-focus background pillars (0.1 to 0.8)
      tl.to(tlStudioActor.current, { 
        x: "-8vw", 
        scale: 0.75, 
        rotationY: 35, 
        filter: "blur(0px)", 
        opacity: 0.9, 
        duration: 0.7, 
        ease: "none" 
      }, 0.1)
      
      tl.to(tlSystemsActor.current, { 
        x: "8vw", 
        scale: 0.75, 
        rotationY: -35, 
        filter: "blur(0px)", 
        opacity: 0.9, 
        duration: 0.7, 
        ease: "none" 
      }, 0.1)

      // Phase 3: The Payload Emerges (0.4 to 1.0)
      tl.to(tlPayload.current, { 
        scale: 1, 
        filter: "blur(0px)",
        autoAlpha: 1, 
        duration: 0.6, 
        ease: "none" 
      }, 0.4)
      
      tl.to(tlMatrixRain.current, { 
        scale: 1, 
        autoAlpha: 1, 
        duration: 0.6, 
        ease: "none" 
      }, 0.4)

      return () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseleave", onMouseLeave)
      }
    })

    return () => mm.revert()
  }, { scope: containerRef })

  // ---------------------------------------------------------------------------
  // THE 70/30 LENS FOCUS (Hover Engine - Layer 2)
  // ---------------------------------------------------------------------------
  const hoverDuration = 0.8 
  const hoverEase = "power3.out"
  
  const hoverLeft = () => {
    if (isWarpingRef.current) return
    // Animate the Hover Layer (X, Scale, Opacity) strictly on hv*
    gsap.to(hvStudioActor.current, { x: "-20vw", scale: 1.05, opacity: 1, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvStudioText.current, { x: "-18vw", scale: 1.05, opacity: 1, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvSystemsActor.current, { x: "36vw", scale: 0.95, opacity: 0.25, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvSystemsText.current, { x: "34vw", scale: 0.95, opacity: 0.3, duration: hoverDuration, ease: hoverEase })
  }
  
  const hoverRight = () => {
    if (isWarpingRef.current) return
    gsap.to(hvSystemsActor.current, { x: "20vw", scale: 1.05, opacity: 1, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvSystemsText.current, { x: "18vw", scale: 1.05, opacity: 1, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvStudioActor.current, { x: "-36vw", scale: 0.95, opacity: 0.25, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvStudioText.current, { x: "-34vw", scale: 0.95, opacity: 0.3, duration: hoverDuration, ease: hoverEase })
  }
  
  const resetHover = () => {
    if (isWarpingRef.current) return
    gsap.to(hvStudioActor.current, { x: `${BASE_VW.stuActor}vw`, scale: 1, opacity: 0.8, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvStudioText.current, { x: `${BASE_VW.stuText}vw`, scale: 1, opacity: 1, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvSystemsActor.current, { x: `${BASE_VW.sysActor}vw`, scale: 1, opacity: 0.8, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvSystemsText.current, { x: `${BASE_VW.sysText}vw`, scale: 1, opacity: 1, duration: hoverDuration, ease: hoverEase })
  }

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white font-sans hidden lg:block overflow-x-hidden">
      
      {/* 
        The Camera Lens (Perspective Reinstated for True Volumetric Push) 
        We use 2000px so items passing z: 2000 disappear physically behind the screen plane.
      */}
      <div 
        ref={pinRef} 
        className="h-[100vh] w-full relative overflow-hidden" 
        style={{ perspective: "2000px", contain: "paint layout" }}
      >
        <div className="absolute inset-0 z-[100] pointer-events-none flex flex-col justify-between mix-blend-screen">
          <SharedTopBar />
          <div className="flex-1" />
          <SharedBottomBar />
        </div>
        
        {/* Invisible Hit Areas */}
        <div ref={hitAreasRef} className="absolute inset-0 z-[90] flex">
          <div className="w-[35%] h-full cursor-pointer" onMouseEnter={hoverLeft} onMouseLeave={resetHover} />
          <div className="w-[30%] h-full cursor-pointer" onMouseEnter={resetHover} />
          <div className="w-[35%] h-full cursor-pointer" onMouseEnter={hoverRight} onMouseLeave={resetHover} />
        </div>
        
        {/* Master Scene */}
        <div ref={sceneRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
          
          <div className="absolute inset-0 z-0">
            <SharedBackground isMobile={false} />
          </div>
          
          {/* Matrix Rain (Deep Void - Z:5) */}
          <div ref={tlMatrixRain} className="absolute inset-0 anchor-center z-[5]" style={{ width: "100vw", height: "100vh", willChange: "transform, opacity" }}>
            <div 
              className="absolute inset-0" 
              style={{
                maskImage: "radial-gradient(circle at 50% 50%, black 10%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 10%, transparent 80%)",
                mixBlendMode: "screen"
              }}
            >
              <FallingPattern color="rgba(0, 255, 0, 0.4)" blurIntensity="1em" density={1} duration={120} className="bg-transparent" />
            </div>
            {/* Atmospheric glow behind the payload */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.03)_0%,transparent_50%)]" />
          </div>

          {/* ========================================== */}
          {/* THE RUSSIAN DOLL ARCHITECTURE                */}
          {/* Layer 1: Timeline (Z, Opacity)               */}
          {/* Layer 2: Hover (X, Scale)                    */}
          {/* Layer 3: Floater (Organic Y/X)               */}
          {/* Layer 4: Parallax (Mouse Gravity)            */}
          {/* ========================================== */}

          {/* Actors (Always Visible - Z:10) */}
          <div ref={tlStudioActor} className="absolute anchor-center z-[10] w-[40vw] h-[40vw]" style={{ willChange: "transform, opacity" }}>
            <div ref={hvStudioActor} className="w-full h-full" style={{ willChange: "transform" }}>
              <div className="floater w-full h-full" style={{ willChange: "transform" }}>
                <div ref={prlxStudioActor} className="w-full h-full" style={{ willChange: "transform" }}>
                  <AsciiAtlasActor className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>

          <div ref={tlSystemsActor} className="absolute anchor-center z-[10] w-[40vw] h-[40vw]" style={{ willChange: "transform, opacity" }}>
            <div ref={hvSystemsActor} className="w-full h-full" style={{ willChange: "transform" }}>
              <div className="floater w-full h-full" style={{ willChange: "transform" }}>
                <div ref={prlxSystemsActor} className="w-full h-full" style={{ willChange: "transform" }}>
                  <AsciiVitruvianActor className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Payload (Emerging Centerpiece - Z:20) */}
          <div ref={tlPayload} className="absolute anchor-center z-[20] w-[100vw] h-[100vh] flex flex-col items-center justify-center pointer-events-auto" style={{ willChange: "transform, opacity" }}>
            <div className="floater w-full h-full flex items-center justify-center" style={{ willChange: "transform" }}>
              <div ref={prlxPayload} className="w-full max-w-[800px] flex flex-col items-center text-center relative" style={{ willChange: "transform" }}>
                
                {/* Massive organic backdrop filter to ensure text readability without killing background */}
                {/* Tightly scoped to the payload so it doesn't bleed over and swallow the ASCII actors */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                  <div className="w-[100%] h-[70%] bg-black/70 blur-[80px] rounded-[100%]" />
                  <div className="absolute w-[80%] h-[50%] bg-black/90 blur-[40px] rounded-[100%]" />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center" style={{ WebkitFontSmoothing: "antialiased" }}>
                  <div className="flex items-center justify-center gap-4 w-full mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00FF00]/40 max-w-[120px]" />
                    <BootScrambleEyebrow isBooted={isBooted} />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00FF00]/40 max-w-[120px]" />
                  </div>

                  <h1 className="text-[52px] xl:text-[72px] leading-[1.05] font-medium tracking-tight text-white font-serif mb-8 text-balance drop-shadow-2xl">
                    Brand, product, and intelligent systems.
                    <BootScrambleSubHeadline isBooted={isBooted} />
                  </h1>

                  <p className="text-[16px] xl:text-[18px] leading-[1.6] font-mono text-white/50 mb-14 max-w-[640px] tracking-wide text-balance">
                    One operating team. Led by founders. Backed by specialists. We build complete digital systems.
                  </p>

                  <div className="flex items-center justify-center gap-6 w-full">
                    <Link href="/contact" className="group relative px-10 py-5 bg-[#00FF00] text-black font-mono text-[13px] font-bold tracking-[0.1em] overflow-hidden active:scale-[0.98] transition-all duration-500 hover:shadow-[0_0_24px_rgba(0,255,0,0.4)]">
                      <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                      <span className="relative z-10">START A PROJECT</span>
                    </Link>
                    
                    <Link href="#work" className="group relative px-10 py-5 border border-white/20 text-white font-mono text-[13px] tracking-[0.1em] overflow-hidden active:scale-[0.98] transition-all duration-500 hover:border-white/40 hover:bg-white/5">
                      <span className="relative z-10">VIEW WORK</span>
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Texts (Foreground Layer - Z:30) */}
          {/* Will fly past the 2000px perspective camera and disappear physically */}
          <div ref={tlStudioText} className="absolute anchor-center z-[30] w-[35vw] max-w-[480px]" style={{ willChange: "transform, opacity" }}>
            <div ref={hvStudioText} className="w-full h-full" style={{ willChange: "transform" }}>
              <div className="floater w-full h-full" style={{ willChange: "transform" }}>
                <div ref={prlxStudioText} className="w-full h-full drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)] text-left" style={{ WebkitFontSmoothing: "antialiased" }}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[#00FF00] text-[11px] font-mono tracking-[0.3em] font-bold">── 01</span>
                    <span className="text-white text-[11px] font-mono tracking-widest uppercase">Studio</span>
                  </div>
                  <h2 className="text-[52px] xl:text-[64px] leading-[1.05] font-medium tracking-tight text-white mb-6 text-balance font-serif">
                    Brand systems with signal.
                  </h2>
                  <p className="text-[15px] xl:text-[16px] leading-[1.6] font-mono text-white/60 max-w-[380px]">
                    Identity, campaigns, film, and creative direction at global brand level.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div ref={tlSystemsText} className="absolute anchor-center z-[30] w-[35vw] max-w-[480px]" style={{ willChange: "transform, opacity" }}>
            <div ref={hvSystemsText} className="w-full h-full" style={{ willChange: "transform" }}>
              <div className="floater w-full h-full" style={{ willChange: "transform" }}>
                <div ref={prlxSystemsText} className="w-full h-full flex flex-col items-end text-right drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]" style={{ WebkitFontSmoothing: "antialiased" }}>
                  <div className="flex items-center justify-end gap-3 mb-6">
                    <span className="text-white text-[11px] font-mono tracking-widest uppercase">Product & Systems</span>
                    <span className="text-[#00FF00] text-[11px] font-mono tracking-[0.3em] font-bold">02 ──</span>
                  </div>
                  <h2 className="text-[52px] xl:text-[64px] leading-[1.05] font-medium tracking-tight text-white mb-6 text-balance font-serif">
                    Software that can carry the business.
                  </h2>
                  <p className="text-[15px] xl:text-[16px] leading-[1.6] font-mono text-white/60 max-w-[380px]">
                    Platforms, intelligent systems, and architecture built for real-world use.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
