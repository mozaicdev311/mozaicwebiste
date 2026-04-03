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
    <span className="text-white/90 text-[10px] font-mono tracking-[0.2em] font-bold uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
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
      setDelayedBoot(false)
    }
    return () => clearTimeout(timeout)
  }, [isBooted, delayedBoot])

  const scrambledText = useScrambleText("Built as one.", delayedBoot)
  return (
    <span className="block text-[#00FF00]/90 mt-3 italic font-normal font-mono text-[20px] tracking-normal">
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
  const BASE_VW = {
    stuText: -22,
    sysText: 22,
    stuActor: -26,
    sysActor: 26,
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
      
      // Timeline Baseline (Z=0 is the glass)
      // TL handles the big spatial fade-outs
      gsap.set(tlStudioText.current, { z: 0, opacity: 1 })
      gsap.set(tlSystemsText.current, { z: 0, opacity: 1 })
      gsap.set(tlStudioActor.current, { z: 0, opacity: 1 }) 
      gsap.set(tlSystemsActor.current, { z: 0, opacity: 1 }) 
      // Deep Space Baseline (Waiting behind the scenes)
      gsap.set(tlPayload.current, { z: -3500, autoAlpha: 0 })
      gsap.set(tlMatrixRain.current, { z: -1500, autoAlpha: 0 })

      // Hover Baseline (Setting the X coordinates safely here)
      // HV handles the local interaction opacities
      gsap.set(hvStudioText.current, { x: `${BASE_VW.stuText}vw`, scale: 1, opacity: 1 })
      gsap.set(hvSystemsText.current, { x: `${BASE_VW.sysText}vw`, scale: 1, opacity: 1 })
      gsap.set(hvStudioActor.current, { x: `${BASE_VW.stuActor}vw`, scale: 1, opacity: 0.5 })
      gsap.set(hvSystemsActor.current, { x: `${BASE_VW.sysActor}vw`, scale: 1, opacity: 0.4 })

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

      // 4. THE APPLE-GRADE LOCKED STATE TIMELINE
      // This timeline is completely decoupled from the scroll wheel's exact position.
      // It plays start-to-finish to give the transition time to breathe.
      const tl = gsap.timeline({
        paused: true,
        onStart: () => {
          isWarpingRef.current = true
          window.dispatchEvent(new CustomEvent("mozaic-warp-state", { detail: { isWarping: true } }))
          
          if (hitAreasRef.current) hitAreasRef.current.style.pointerEvents = "none"
          
          // Gracefully reset the HOVER nodes to baseline immediately when transition starts
          gsap.to(hvStudioText.current, { x: `${BASE_VW.stuText}vw`, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" })
          gsap.to(hvSystemsText.current, { x: `${BASE_VW.sysText}vw`, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" })
          gsap.to(hvStudioActor.current, { x: `${BASE_VW.stuActor}vw`, scale: 1, opacity: 0.5, duration: 0.4, ease: "power2.out" })
          gsap.to(hvSystemsActor.current, { x: `${BASE_VW.sysActor}vw`, scale: 1, opacity: 0.4, duration: 0.4, ease: "power2.out" })
        },
        onComplete: () => {
          isWarpingRef.current = false
          window.dispatchEvent(new CustomEvent("mozaic-warp-state", { detail: { isWarping: false } }))
          bootStateRef.current = true
          setIsBooted(true)
        },
        onReverseComplete: () => {
          isWarpingRef.current = false
          window.dispatchEvent(new CustomEvent("mozaic-warp-state", { detail: { isWarping: false } }))
          bootStateRef.current = false
          setIsBooted(false)
          if (hitAreasRef.current) hitAreasRef.current.style.pointerEvents = "auto"
        }
      })

      // -- THE CHOREOGRAPHY (Real Time Durations, No Scrub) --
      
      // Phase 1: Foreground vanishes (Duration: 0.8s)
      tl.to([tlStudioText.current, tlSystemsText.current], { 
        z: 2500, 
        scale: 1.5, 
        autoAlpha: 0, 
        duration: 0.8, 
        ease: "power2.in" 
      }, 0)

      // Phase 2: Actors drift back to make room (Duration: 1.2s, starts slightly after Phase 1 begins)
      // Note on Math: The hover wrappers (hv*) already sit at -26vw / +26vw. 
      // By moving the timeline wrappers (tl*) by -12vw, their final screen position is -38vw.
      // This perfectly frames the payload without pushing them off-screen.
      tl.to(tlStudioActor.current, { 
        z: -400, 
        x: "-12vw", 
        rotationY: 25, // Turn inward to frame the payload
        opacity: 0.35, 
        duration: 1.2, 
        ease: "power3.inOut" 
      }, 0.2)
      
      tl.to(tlSystemsActor.current, { 
        z: -400, 
        x: "12vw", 
        rotationY: -25, // Turn inward to frame the payload
        opacity: 0.35, 
        duration: 1.2, 
        ease: "power3.inOut" 
      }, 0.2)

      // Phase 3: The Payload Emerges (Duration: 1.4s)
      // Starts deeper, fades in quickly, settles slowly into the center.
      tl.fromTo(tlPayload.current, 
        { z: -800, scale: 0.85, autoAlpha: 0 },
        { z: 0, scale: 1, autoAlpha: 1, duration: 1.4, ease: "power3.out" }, 
        0.4
      )
      
      // The Matrix Rain organically blooms into existence instead of flying forward
      tl.fromTo(tlMatrixRain.current,
        { scale: 1.1, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.6, ease: "power2.out" }, 
        0.3
      )

      // -- THE SCROLL TRIGGERS --
      
      // 1. The Pin: This locks the screen in place so the user has "runway" to scroll 
      // without the page moving while the animation plays.
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // 2 screens of scroll buffer
        pin: pinRef.current,
      })

      // 2. The Trigger: Fires the locked state transition
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top -50px", // The exact moment they scroll down
        end: "+=200%",
        onEnter: () => tl.play(),        // Scroll down -> Play forward start-to-finish
        onLeaveBack: () => tl.reverse(), // Scroll back up -> Reverse start-to-finish
      })

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
    gsap.to(hvStudioActor.current, { x: "-18vw", scale: 1.05, opacity: 0.8, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvStudioText.current, { x: "-18vw", scale: 1.05, opacity: 1, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvSystemsActor.current, { x: "32vw", scale: 0.95, opacity: 0.15, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvSystemsText.current, { x: "32vw", scale: 0.95, opacity: 0.3, duration: hoverDuration, ease: hoverEase })
  }
  
  const hoverRight = () => {
    if (isWarpingRef.current) return
    gsap.to(hvSystemsActor.current, { x: "18vw", scale: 1.05, opacity: 0.8, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvSystemsText.current, { x: "18vw", scale: 1.05, opacity: 1, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvStudioActor.current, { x: "-32vw", scale: 0.95, opacity: 0.15, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvStudioText.current, { x: "-32vw", scale: 0.95, opacity: 0.3, duration: hoverDuration, ease: hoverEase })
  }
  
  const resetHover = () => {
    if (isWarpingRef.current) return
    gsap.to(hvStudioActor.current, { x: `${BASE_VW.stuActor}vw`, scale: 1, opacity: 0.5, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvStudioText.current, { x: `${BASE_VW.stuText}vw`, scale: 1, opacity: 1, duration: hoverDuration, ease: hoverEase })
    gsap.to(hvSystemsActor.current, { x: `${BASE_VW.sysActor}vw`, scale: 1, opacity: 0.4, duration: hoverDuration, ease: hoverEase })
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
          <div className="w-1/2 h-full cursor-pointer" onMouseEnter={hoverLeft} onMouseLeave={resetHover} />
          <div className="w-1/2 h-full cursor-pointer" onMouseEnter={hoverRight} onMouseLeave={resetHover} />
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
                  <div className="w-[120%] h-[90%] bg-black/60 blur-[100px] rounded-[100%]" />
                  <div className="absolute w-[90%] h-[70%] bg-black/80 blur-[60px] rounded-[100%]" />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center" style={{ WebkitFontSmoothing: "antialiased" }}>
                  <div className="flex items-center justify-center gap-4 w-full mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00FF00]/40 max-w-[80px]" />
                    <BootScrambleEyebrow isBooted={isBooted} />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00FF00]/40 max-w-[80px]" />
                  </div>

                  <h1 className="text-[48px] xl:text-[68px] leading-[1.05] font-medium tracking-tight text-white font-serif mb-8 text-balance drop-shadow-xl">
                    Brand, product, and intelligent systems.
                    <BootScrambleSubHeadline isBooted={isBooted} />
                  </h1>

                  <p className="text-[15px] leading-[1.6] font-mono text-white/50 mb-14 max-w-[600px] tracking-wide text-balance">
                    One operating team. Led by founders. Backed by specialists. We build complete digital systems.
                  </p>

                  <div className="flex items-center justify-center gap-6 w-full">
                    <Link href="/contact" className="group relative px-10 py-5 bg-[#00FF00] text-black font-mono text-[13px] font-bold tracking-[0.1em] overflow-hidden active:scale-[0.98] transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)]">
                      <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                      <span className="relative z-10">START A PROJECT</span>
                    </Link>
                    
                    <Link href="#work" className="group relative px-10 py-5 border border-white/20 text-white font-mono text-[13px] tracking-[0.1em] overflow-hidden active:scale-[0.98] transition-all duration-500">
                      <span className="relative z-10">VIEW WORK</span>
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
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
                <div ref={prlxStudioText} className="w-full h-full drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] text-left" style={{ WebkitFontSmoothing: "antialiased" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#00FF00] text-[10px] font-mono tracking-[0.3em] font-bold">── 01</span>
                    <span className="text-white text-[10px] font-mono tracking-widest uppercase">Studio</span>
                  </div>
                  <h2 className="text-[48px] xl:text-[56px] leading-[1.05] font-medium tracking-tight text-white mb-6 text-balance font-serif">
                    Brand systems with signal.
                  </h2>
                  <p className="text-[14px] leading-[1.6] font-mono text-white/60 max-w-[380px]">
                    Identity, campaigns, film, and creative direction at global brand level.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div ref={tlSystemsText} className="absolute anchor-center z-[30] w-[35vw] max-w-[480px]" style={{ willChange: "transform, opacity" }}>
            <div ref={hvSystemsText} className="w-full h-full" style={{ willChange: "transform" }}>
              <div className="floater w-full h-full" style={{ willChange: "transform" }}>
                <div ref={prlxSystemsText} className="w-full h-full flex flex-col items-end text-right drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]" style={{ WebkitFontSmoothing: "antialiased" }}>
                  <div className="flex items-center justify-end gap-3 mb-4">
                    <span className="text-white text-[10px] font-mono tracking-widest uppercase">Product & Systems</span>
                    <span className="text-[#00FF00] text-[10px] font-mono tracking-[0.3em] font-bold">02 ──</span>
                  </div>
                  <h2 className="text-[48px] xl:text-[56px] leading-[1.05] font-medium tracking-tight text-white mb-6 text-balance font-serif">
                    Software that can carry the business.
                  </h2>
                  <p className="text-[14px] leading-[1.6] font-mono text-white/60 max-w-[380px]">
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