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
import { useScrambleText, Crosshair } from "@/components/landing/ui/Shared"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

type HoverSide = "left" | "right" | null
type HeroMode = "idle" | "transition" | "unified"
type HeroAsciiMode = "full" | "reduced" | "paused"

interface HeroStateDetail {
  mode: HeroMode
  isWarping: boolean
  isBooted: boolean
  isScrollActive: boolean
  asciiMode: HeroAsciiMode
}

const BASE_VW = {
  stuText: -24,
  sysText: 24,
  stuActor: -28,
  sysActor: 28,
}

function getAsciiMode(state: Omit<HeroStateDetail, "asciiMode">): HeroAsciiMode {
  if (state.isWarping) {
    return "paused"
  }

  if (state.isScrollActive) {
    return "reduced"
  }

  return state.mode === "idle" ? "full" : "reduced"
}

function BootScrambleEyebrow({ isBooted }: { isBooted: boolean }) {
  const scrambledText = useScrambleText("SYSTEM.UNIFIED", isBooted)
  return (
    <span className="text-white/90 font-mono text-[10px] tracking-[0.2em] font-bold uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
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
    <span className="block text-white/50 mt-4 font-mono text-[16px] xl:text-[18px] tracking-widest uppercase">
      {scrambledText}
      {isBooted && delayedBoot && (
        <span className="inline-block w-3 h-[1em] bg-white/70 align-middle ml-2 animate-pulse" />
      )}
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
  const [hoverSide, setHoverSide] = useState<HoverSide>(null)
  const bootStateRef = useRef(false)
  const heroStateRef = useRef<HeroStateDetail>({
    mode: "idle",
    isWarping: false,
    isBooted: false,
    isScrollActive: false,
    asciiMode: "full",
  })

  const applyHoverBaseline = (duration = 0.45) => {
    setHoverSide(null)
    gsap.to(hvStudioActor.current, {
      x: `${BASE_VW.stuActor}vw`,
      y: "4vh",
      scale: 1,
      opacity: 0.82,
      duration,
      ease: "power3.out",
      overwrite: "auto",
    })
    gsap.to(hvStudioText.current, {
      x: `${BASE_VW.stuText}vw`,
      scale: 1,
      opacity: 1,
      duration,
      ease: "power3.out",
      overwrite: "auto",
    })
    gsap.to(hvSystemsActor.current, {
      x: `${BASE_VW.sysActor}vw`,
      y: "4vh",
      scale: 1,
      opacity: 0.82,
      duration,
      ease: "power3.out",
      overwrite: "auto",
    })
    gsap.to(hvSystemsText.current, {
      x: `${BASE_VW.sysText}vw`,
      scale: 1,
      opacity: 1,
      duration,
      ease: "power3.out",
      overwrite: "auto",
    })
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

      gsap.set(tlStudioText.current, { opacity: 1, scale: 1, x: 0, yPercent: 0 })
      gsap.set(tlSystemsText.current, { opacity: 1, scale: 1, x: 0, yPercent: 0 })
      gsap.set(tlStudioActor.current, { opacity: 1, scale: 1, x: 0, y: 0, rotationY: 0 })
      gsap.set(tlSystemsActor.current, { opacity: 1, scale: 1, x: 0, y: 0, rotationY: 0 })

      gsap.set(tlPayload.current, { autoAlpha: 0, scale: 1.06, y: 84 })
      gsap.set(tlMatrixRain.current, { autoAlpha: 0, opacity: 0, scale: 1.03 })

      // Hover Baseline (Setting the X coordinates safely here)
      // HV handles the local interaction opacities
      gsap.set(hvStudioText.current, { x: `${BASE_VW.stuText}vw`, scale: 1, opacity: 1 })
      gsap.set(hvSystemsText.current, { x: `${BASE_VW.sysText}vw`, scale: 1, opacity: 1 })
      gsap.set(hvStudioActor.current, { x: `${BASE_VW.stuActor}vw`, y: "4vh", scale: 1, opacity: 0.82 })
      gsap.set(hvSystemsActor.current, { x: `${BASE_VW.sysActor}vw`, y: "4vh", scale: 1, opacity: 0.82 })

      const floaterTween = gsap.to(".floater", {
        y: () => gsap.utils.random(-15, 15),
        x: () => gsap.utils.random(-10, 10),
        duration: () => gsap.utils.random(4, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1,
      })

      // 3. Mouse Parallax Engine
      const quicks = {
        stuText: {
          x: gsap.quickTo(prlxStudioText.current, "x", { ease: "power3.out", duration: 0.35 }),
          y: gsap.quickTo(prlxStudioText.current, "y", { ease: "power3.out", duration: 0.35 }),
        },
        sysText: {
          x: gsap.quickTo(prlxSystemsText.current, "x", { ease: "power3.out", duration: 0.35 }),
          y: gsap.quickTo(prlxSystemsText.current, "y", { ease: "power3.out", duration: 0.35 }),
        },
        stuActor: {
          x: gsap.quickTo(prlxStudioActor.current, "x", { ease: "power3.out", duration: 0.45 }),
          y: gsap.quickTo(prlxStudioActor.current, "y", { ease: "power3.out", duration: 0.45 }),
        },
        sysActor: {
          x: gsap.quickTo(prlxSystemsActor.current, "x", { ease: "power3.out", duration: 0.45 }),
          y: gsap.quickTo(prlxSystemsActor.current, "y", { ease: "power3.out", duration: 0.45 }),
        },
        payload: {
          x: gsap.quickTo(prlxPayload.current, "x", { ease: "power3.out", duration: 0.9 }),
          y: gsap.quickTo(prlxPayload.current, "y", { ease: "power3.out", duration: 0.9 }),
        },
      }

      const resetParallax = () => {
        Object.values(quicks).forEach((quick) => {
          quick.x(0)
          quick.y(0)
        })
      }

      const syncHeroState = (patch: Partial<Omit<HeroStateDetail, "asciiMode">>) => {
        const previous = heroStateRef.current
        const draft = { ...previous, ...patch }
        const next: HeroStateDetail = {
          ...draft,
          asciiMode: getAsciiMode(draft),
        }

        if (
          next.mode === previous.mode &&
          next.isWarping === previous.isWarping &&
          next.isBooted === previous.isBooted &&
          next.isScrollActive === previous.isScrollActive &&
          next.asciiMode === previous.asciiMode
        ) {
          return
        }

        heroStateRef.current = next

        const allowPanelFocus = next.mode === "idle" && !next.isScrollActive
        if (hitAreasRef.current) {
          hitAreasRef.current.style.pointerEvents = allowPanelFocus ? "auto" : "none"
        }

        if (allowPanelFocus) {
          floaterTween.resume()
        } else {
          floaterTween.pause()
          applyHoverBaseline(next.mode === "transition" ? 0.22 : 0.35)
          resetParallax()
        }

        window.dispatchEvent(
          new CustomEvent("mozaic-hero-state", {
            detail: next,
          })
        )

        window.dispatchEvent(
          new CustomEvent("mozaic-warp-state", {
            detail: {
              isWarping: next.isWarping,
              isBooted: next.isBooted,
            },
          })
        )
      }

      syncHeroState({
        mode: "idle",
        isWarping: false,
        isBooted: false,
        isScrollActive: false,
      })

      let scrollReleaseTimeout: number | null = null

      const onScroll = () => {
        syncHeroState({ isScrollActive: true })

        if (scrollReleaseTimeout !== null) {
          window.clearTimeout(scrollReleaseTimeout)
        }

        scrollReleaseTimeout = window.setTimeout(() => {
          scrollReleaseTimeout = null
          syncHeroState({ isScrollActive: false })
        }, 140)
      }

      const interactionSurface = pinRef.current
      const onPointerMove = (event: PointerEvent) => {
        const currentState = heroStateRef.current
        if (currentState.mode !== "idle" || currentState.isScrollActive) {
          return
        }

        const nx = (event.clientX / window.innerWidth - 0.5) * 2
        const ny = (event.clientY / window.innerHeight - 0.5) * 2
        quicks.stuText.x(nx * -22)
        quicks.stuText.y(ny * -24)
        quicks.sysText.x(nx * -18)
        quicks.sysText.y(ny * -18)
        quicks.stuActor.x(nx * -14)
        quicks.stuActor.y(ny * -16)
        quicks.sysActor.x(nx * -10)
        quicks.sysActor.y(ny * -12)
        quicks.payload.x(nx * 10)
        quicks.payload.y(ny * 10)
      }

      const onPointerLeave = () => {
        if (heroStateRef.current.mode !== "idle") {
          return
        }

        resetParallax()
      }

      interactionSurface?.addEventListener("pointermove", onPointerMove)
      interactionSurface?.addEventListener("pointerleave", onPointerLeave)
      window.addEventListener("scroll", onScroll, { passive: true })

      // 4. APPLE-GRADE STORY TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=180%",
          pin: pinRef.current,
          scrub: 0.32,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            const isWarp = p > 0.05 && p < 0.95
            const isBootedNow = p >= 0.75
            const nextMode: HeroMode = isWarp ? "transition" : isBootedNow ? "unified" : "idle"

            syncHeroState({
              mode: nextMode,
              isWarping: isWarp,
              isBooted: isBootedNow,
            })

            if (isBootedNow && !bootStateRef.current) {
              bootStateRef.current = true
              setIsBooted(true)
            } else if (!isBootedNow && bootStateRef.current) {
              bootStateRef.current = false
              setIsBooted(false)
            }
          },
        },
      })

      // Linear choreography keeps scroll feeling directly mapped to motion.
      tl.to(
        tlStudioText.current,
        {
          x: "-5vw",
          yPercent: -4,
          scale: 1.08,
          autoAlpha: 0,
          duration: 0.32,
          ease: "none",
        },
        0
      )

      tl.to(
        tlSystemsText.current,
        {
          x: "5vw",
          yPercent: -4,
          scale: 1.08,
          autoAlpha: 0,
          duration: 0.32,
          ease: "none",
        },
        0
      )

      tl.to(
        tlStudioActor.current,
        {
          x: "-5vw",
          y: 28,
          scale: 0.84,
          rotationY: 26,
          opacity: 0.82,
          duration: 0.62,
          ease: "none",
        },
        0.08
      )

      tl.to(
        tlSystemsActor.current,
        {
          x: "5vw",
          y: 28,
          scale: 0.84,
          rotationY: -26,
          opacity: 0.82,
          duration: 0.62,
          ease: "none",
        },
        0.08
      )

      tl.to(
        tlPayload.current,
        {
          scale: 1,
          y: -76,
          autoAlpha: 1,
          duration: 0.44,
          ease: "none",
        },
        0.42
      )

      tl.to(
        tlMatrixRain.current,
        {
          scale: 1,
          autoAlpha: 1,
          opacity: 0.58,
          duration: 0.34,
          ease: "none",
        },
        0.38
      )

      // 5. The Flattening (Transition out of Hero)
      gsap.to(pinRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
        scale: 0.975,
        yPercent: -2,
        borderBottomColor: "rgba(255,255,255,0.16)",
        ease: "none",
      })

      gsap.to(tlMatrixRain.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0.16,
        ease: "none",
      })

      gsap.to(tlPayload.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -110,
        ease: "none",
      })

      return () => {
        if (scrollReleaseTimeout !== null) {
          window.clearTimeout(scrollReleaseTimeout)
        }

        window.removeEventListener("scroll", onScroll)
        interactionSurface?.removeEventListener("pointermove", onPointerMove)
        interactionSurface?.removeEventListener("pointerleave", onPointerLeave)

        window.dispatchEvent(
          new CustomEvent("mozaic-hero-state", {
            detail: {
              mode: "idle" as HeroMode,
              isWarping: false,
              isBooted: false,
              isScrollActive: false,
              asciiMode: "full" as HeroAsciiMode,
            },
          })
        )
      }
    })

    return () => mm.revert()
  }, { scope: containerRef })

  // ---------------------------------------------------------------------------
  // THE 70/30 LENS FOCUS (Hover Engine - Layer 2)
  // ---------------------------------------------------------------------------
  const hoverDuration = 0.6
  const hoverEase = "power3.out"

  const hoverLeft = () => {
    if (heroStateRef.current.mode !== "idle" || heroStateRef.current.isScrollActive) return

    setHoverSide("left")
    gsap.to(hvStudioActor.current, {
      x: "-21vw",
      scale: 1.03,
      opacity: 1,
      duration: hoverDuration,
      ease: hoverEase,
      overwrite: "auto",
    })
    gsap.to(hvStudioText.current, {
      x: "-19vw",
      scale: 1.03,
      opacity: 1,
      duration: hoverDuration,
      ease: hoverEase,
      overwrite: "auto",
    })
    gsap.to(hvSystemsActor.current, {
      x: "33vw",
      scale: 0.97,
      opacity: 0.34,
      duration: hoverDuration,
      ease: hoverEase,
      overwrite: "auto",
    })
    gsap.to(hvSystemsText.current, {
      x: "31vw",
      scale: 0.97,
      opacity: 0.45,
      duration: hoverDuration,
      ease: hoverEase,
      overwrite: "auto",
    })
  }

  const hoverRight = () => {
    if (heroStateRef.current.mode !== "idle" || heroStateRef.current.isScrollActive) return

    setHoverSide("right")
    gsap.to(hvSystemsActor.current, {
      x: "21vw",
      scale: 1.03,
      opacity: 1,
      duration: hoverDuration,
      ease: hoverEase,
      overwrite: "auto",
    })
    gsap.to(hvSystemsText.current, {
      x: "19vw",
      scale: 1.03,
      opacity: 1,
      duration: hoverDuration,
      ease: hoverEase,
      overwrite: "auto",
    })
    gsap.to(hvStudioActor.current, {
      x: "-33vw",
      scale: 0.97,
      opacity: 0.34,
      duration: hoverDuration,
      ease: hoverEase,
      overwrite: "auto",
    })
    gsap.to(hvStudioText.current, {
      x: "-31vw",
      scale: 0.97,
      opacity: 0.45,
      duration: hoverDuration,
      ease: hoverEase,
      overwrite: "auto",
    })
  }

  const resetHover = () => {
    if (heroStateRef.current.mode !== "idle" || heroStateRef.current.isScrollActive) return

    applyHoverBaseline(hoverDuration)
  }

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white font-sans hidden lg:block overflow-x-hidden">
      
      {/* 
        The Camera Lens (Perspective Reinstated for True Volumetric Push) 
        We use 2000px so items passing z: 2000 disappear physically behind the screen plane.
      */}
      <div
        ref={pinRef}
        className="h-[100vh] w-full relative overflow-hidden border-b border-transparent origin-bottom"
        style={{ perspective: "1800px", contain: "paint" }}
      >
        <div className="absolute inset-0 z-[100] pointer-events-none flex flex-col justify-between mix-blend-screen">
          <SharedTopBar />
          <div className="flex-1" />
          <SharedBottomBar />
        </div>
        
        {/* HUD Crosshairs identical to Section02Problem */}
        <Crosshair className="-top-3 -left-3 z-[110]" />
        <Crosshair className="-top-3 -right-3 z-[110]" />
        <Crosshair className="-bottom-3 -left-3 z-[110]" />
        <Crosshair className="-bottom-3 -right-3 z-[110]" />
        
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
              className="absolute inset-0 opacity-70"
              style={{
                maskImage: "radial-gradient(circle at 50% 50%, black 14%, transparent 78%)",
                WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 14%, transparent 78%)",
                mixBlendMode: "screen"
              }}
            >
              <FallingPattern color="rgba(0, 255, 0, 0.34)" blurIntensity="0.35em" density={1} duration={160} className="bg-transparent" />
            </div>
            {/* Atmospheric glow behind the payload */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.05)_0%,transparent_52%)]" />
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
                <div ref={prlxStudioActor} className="w-full h-full group relative" data-active={hoverSide === "left" ? "true" : undefined} style={{ willChange: "transform" }}>
                  <AsciiAtlasActor className="w-full h-full object-contain" />
                  <div className="laser-scan"></div>
                </div>
              </div>
            </div>
          </div>

          <div ref={tlSystemsActor} className="absolute anchor-center z-[10] w-[40vw] h-[40vw]" style={{ willChange: "transform, opacity" }}>
            <div ref={hvSystemsActor} className="w-full h-full" style={{ willChange: "transform" }}>
              <div className="floater w-full h-full" style={{ willChange: "transform" }}>
                <div ref={prlxSystemsActor} className="w-full h-full group relative" data-active={hoverSide === "right" ? "true" : undefined} style={{ willChange: "transform" }}>
                  <AsciiVitruvianActor className="w-full h-full object-contain" />
                  <div className="laser-scan"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Payload (Emerging Centerpiece - Z:20) */}
          <div ref={tlPayload} className="absolute anchor-center z-[20] w-[100vw] h-[100vh] flex flex-col items-center justify-center pointer-events-auto" style={{ willChange: "transform, opacity" }}>
            <div className="w-full h-full px-6 pt-24 pb-20 xl:px-8 xl:pt-28 xl:pb-24 flex items-center justify-center" style={{ willChange: "transform" }}>
              <div ref={prlxPayload} className="w-full max-w-[800px] flex flex-col items-center text-center relative" style={{ willChange: "transform" }}>
                
                {/* Calm atmospheric lens behind the unified payload */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                  <div className="h-[72%] w-[108%] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.74)_36%,rgba(0,0,0,0.28)_62%,transparent_78%)] opacity-95" />
                  <div className="absolute h-[46%] w-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.08)_0%,transparent_72%)] opacity-70" />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center" style={{ WebkitFontSmoothing: "antialiased" }}>
                  <div className="flex items-center justify-center gap-4 w-full mb-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00FF00]/40 max-w-[120px]" />
                    <BootScrambleEyebrow isBooted={isBooted} />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00FF00]/40 max-w-[120px]" />
                  </div>

                  <h1 className="text-[52px] xl:text-[72px] leading-[1.05] font-medium tracking-tight text-white font-serif mb-6 text-balance drop-shadow-2xl">
                    Brand, product, and intelligent systems.
                    <BootScrambleSubHeadline isBooted={isBooted} />
                  </h1>

                  <p className="text-[16px] xl:text-[18px] leading-[1.6] font-mono text-white/50 mb-10 max-w-[640px] tracking-wide text-balance">
                    One operating team. Led by founders. Backed by specialists. We build complete digital systems.
                  </p>

                  <div className="flex items-center justify-center gap-6 w-full">
                    <Link href="/contact" className="group px-10 py-5 bg-white/[0.05] border border-white/20 text-white font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-0 active:scale-[0.98]">
                      [ INITIATE_PROJECT ]
                    </Link>
                    
                    <Link href="#work" className="group px-10 py-5 bg-transparent border border-white/20 text-white font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-0 active:scale-[0.98]">
                      [ VIEW_ARCHIVE ]
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
              <div className="w-full h-full" style={{ willChange: "transform" }}>
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
              <div className="w-full h-full" style={{ willChange: "transform" }}>
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
