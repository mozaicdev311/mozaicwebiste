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
  const sceneRef = useRef<HTMLDivElement>(null)
  
  // The Spatial Galaxy Layers (Full Screen Absolute Wrappers)
  const studioLayerRef = useRef<HTMLDivElement>(null)
  const systemsLayerRef = useRef<HTMLDivElement>(null)
  
  // The Texts
  const studioTextRef = useRef<HTMLDivElement>(null)
  const systemsTextRef = useRef<HTMLDivElement>(null)
  
  // The Content inside the layers for micro-parallax
  const studioActorRef = useRef<HTMLDivElement>(null)
  const systemsActorRef = useRef<HTMLDivElement>(null)
  
  // Interaction hit area wrapper
  const hitAreasRef = useRef<HTMLDivElement>(null)
  
  // Payload & Effects
  const matrixRainRef = useRef<HTMLDivElement>(null)
  const payloadRef = useRef<HTMLDivElement>(null)
  const volumetricShadowRef = useRef<HTMLDivElement>(null)
  
  // State
  const [isBooted, setIsBooted] = useState(false)
  const bootStateRef = useRef(false)
  const isLockedRef = useRef(false)
  
  // High-performance Parallax Data
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const rafId = useRef<number | null>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      // 1. Initial State Setup (The Galaxy Baseline)
      gsap.set([studioLayerRef.current, systemsLayerRef.current], { 
        z: 0, 
        scale: 1, 
        filter: "blur(0px) brightness(1)", 
        opacity: 1,
        transformOrigin: "center center",
        force3D: true
      })
      
      // Subpixel text anti-aliasing initialization
      gsap.set([studioTextRef.current, systemsTextRef.current], {
        rotation: 0.01,
        force3D: true
      })
      
      gsap.set(matrixRainRef.current, { autoAlpha: 0, scale: 1.1 })
      gsap.set(payloadRef.current, { autoAlpha: 0, z: -4000, scale: 0.8, rotation: 0.01, force3D: true })
      gsap.set(volumetricShadowRef.current, { autoAlpha: 0 })
      
      // 2. High-Performance Parallax (GSAP QuickSetter + RAF)
      const setSceneRotY = gsap.quickSetter(sceneRef.current, "rotationY", "deg")
      const setSceneRotX = gsap.quickSetter(sceneRef.current, "rotationX", "deg")
      const setStudioX = gsap.quickSetter(studioActorRef.current, "x", "px")
      const setStudioY = gsap.quickSetter(studioActorRef.current, "y", "px")
      const setSystemsX = gsap.quickSetter(systemsActorRef.current, "x", "px")
      const setSystemsY = gsap.quickSetter(systemsActorRef.current, "y", "px")

      const renderParallax = () => {
        if (!isLockedRef.current) {
          mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.1
          mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.1

          setSceneRotY(mouse.current.x * 2.5)
          setSceneRotX(-mouse.current.y * 2.5)
          
          setStudioX(mouse.current.x * -25)
          setStudioY(mouse.current.y * -25)
          setSystemsX(mouse.current.x * -25)
          setSystemsY(mouse.current.y * -25)
        } else {
          // Slowly ease back to 0 when locked
          mouse.current.x += (0 - mouse.current.x) * 0.1
          mouse.current.y += (0 - mouse.current.y) * 0.1
          
          setSceneRotY(mouse.current.x * 2.5)
          setSceneRotX(-mouse.current.y * 2.5)
          setStudioX(mouse.current.x * -25)
          setStudioY(mouse.current.y * -25)
          setSystemsX(mouse.current.x * -25)
          setSystemsY(mouse.current.y * -25)
        }
        rafId.current = requestAnimationFrame(renderParallax)
      }
      
      rafId.current = requestAnimationFrame(renderParallax)

      const handleMouseMove = (e: MouseEvent) => {
        if (isLockedRef.current) return
        
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 2 // -1 to 1
        const yPos = (clientY / window.innerHeight - 0.5) * 2
        
        // 20% central deadzone: ignore micro-movements near center
        if (Math.abs(xPos) < 0.2 && Math.abs(yPos) < 0.2) {
          mouse.current.targetX = 0
          mouse.current.targetY = 0
        } else {
          mouse.current.targetX = xPos
          mouse.current.targetY = yPos
        }
      }

      const handleMouseLeave = () => {
        if (isLockedRef.current) return
        mouse.current.targetX = 0
        mouse.current.targetY = 0
      }

      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseleave", handleMouseLeave)
      
      // 3. Magnetic Scroll (The Tunnel & Visual Handoff)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: pinRef.current,
          scrub: 1.5, // 1.5 seconds of smoothing for the scroll
          snap: {
            snapTo: [0, 1], // The magnetic frames: 0% or 100% of the timeline
            duration: { min: 0.8, max: 1.5 }, // How long the magnetic snap takes
            delay: 0.1, // Wait 100ms after user stops scrolling before snapping
            ease: "power3.inOut" // The cinematic curve of the snap
          },
          onUpdate: (self) => {
            const p = self.progress
            
            // Lock hover interactions the moment scroll begins
            if (p > 0.02 && !isLockedRef.current) {
              isLockedRef.current = true
              gsap.set(hitAreasRef.current, { display: "none" })
              
              // If they were mid-hover, snap them back to center baseline instantly before the vacuum pulls them
              gsap.to([studioLayerRef.current, systemsLayerRef.current], { 
                z: 0, 
                filter: "blur(0px) brightness(1)", 
                opacity: 1, 
                duration: 0.3, 
                ease: "power2.out" 
              })
            } else if (p <= 0.02 && isLockedRef.current) {
              isLockedRef.current = false
              gsap.set(hitAreasRef.current, { display: "flex" })
            }
            
            // Trigger decryption payload
            if (p >= 0.55 && !bootStateRef.current) {
              bootStateRef.current = true
              setIsBooted(true)
            } else if (p < 0.55 && bootStateRef.current) {
              bootStateRef.current = false
              setIsBooted(false)
            }
          }
        }
      })
      
      // A. Vacuum Flyby
      tl.to([studioLayerRef.current, systemsLayerRef.current], {
        z: 2000, 
        filter: "blur(0px) brightness(2)", // brightness instead of blur for performance
        duration: 1.5,
        ease: "power4.in"
      }, 0)
      
      // Fade text out so it doesn't clip uglily when crossing the camera plane
      tl.to([studioTextRef.current, systemsTextRef.current], {
        opacity: 0,
        duration: 1.2,
        ease: "power2.in"
      }, 0)
      
      // Fade actors out just before they hit the lens
      tl.to([studioActorRef.current, systemsActorRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in"
      }, 1.0)
      
      // B. The Teleport (Sleight of Hand at 1.4s)
      tl.set([studioActorRef.current, systemsActorRef.current], {
        z: -6000, // Relative to the layer which is at 2000, absolute Z is -4000
        opacity: 0
      }, 1.4)
      
      tl.set(studioActorRef.current, { xPercent: -50 }, 1.4)
      tl.set(systemsActorRef.current, { xPercent: 50 }, 1.4)
      
      // C. Payload Ignition (Overlaps the flyby, starting at 0.5s)
      tl.to(payloadRef.current, {
        z: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 1.5,
        ease: "power3.out"
      }, 0.5)
      
      // D. The Comeback Sweep (Starts at 1.5s)
      tl.to([studioActorRef.current, systemsActorRef.current], {
        opacity: 0.35, // ignite them
        duration: 0.2
      }, 1.5)
      
      tl.to(studioActorRef.current, {
        z: -2000, // Absolute 0
        xPercent: -15, 
        rotationY: 25, // Dramatic angle
        duration: 1.5,
        ease: "expo.out"
      }, 1.5)
      
      tl.to(systemsActorRef.current, {
        z: -2000, // Absolute 0
        xPercent: 15,
        rotationY: -25, // Dramatic angle
        duration: 1.5,
        ease: "expo.out"
      }, 1.5)
      
      // Environment
      tl.to(matrixRainRef.current, {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out"
      }, 0.5)
      
      tl.to(volumetricShadowRef.current, {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out"
      }, 0.8)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseleave", handleMouseLeave)
        if (rafId.current) cancelAnimationFrame(rafId.current)
      }
    })

    return () => mm.revert()
  }, { scope: containerRef })

  // ---------------------------------------------------------------------------
  // THE LENS FOCUS (Hover Mechanics)
  // ---------------------------------------------------------------------------
  const springEase = "elastic.out(1, 0.75)"
  
  const hoverLeft = () => {
    if (isLockedRef.current) return
    // Focus Studio (Pull)
    gsap.to(studioLayerRef.current, { 
      z: 300, 
      filter: "blur(0px) brightness(1)", 
      opacity: 1,
      duration: 1.2, 
      ease: springEase 
    })
    // Defocus Systems (Push)
    gsap.to(systemsLayerRef.current, { 
      z: -1500, 
      filter: "blur(8px) brightness(0.4)", // Static blur only on resting pushed state
      opacity: 0.3,
      duration: 1.2, 
      ease: springEase 
    })
  }
  
  const hoverRight = () => {
    if (isLockedRef.current) return
    // Focus Systems (Pull)
    gsap.to(systemsLayerRef.current, { 
      z: 300, 
      filter: "blur(0px) brightness(1)", 
      opacity: 1,
      duration: 1.2, 
      ease: springEase 
    })
    // Defocus Studio (Push)
    gsap.to(studioLayerRef.current, { 
      z: -1500, 
      filter: "blur(8px) brightness(0.4)", 
      opacity: 0.3,
      duration: 1.2, 
      ease: springEase 
    })
  }
  
  const resetHover = () => {
    if (isLockedRef.current) return
    // Return to the perfect mathematical baseline
    gsap.to([studioLayerRef.current, systemsLayerRef.current], { 
      z: 0, 
      filter: "blur(0px) brightness(1)", 
      opacity: 1,
      duration: 1.0, 
      ease: springEase 
    })
  }

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white font-sans hidden lg:block overflow-x-hidden">
      
      {/* 
        GPU Isolation & 3D Environment (Phase 1)
        contain: strict isolates GPU calculations.
        perspective: 1000px creates the heavy macro lens distortion.
      */}
      <div 
        ref={pinRef} 
        className="h-[100vh] w-full relative overflow-hidden" 
        style={{ perspective: "1000px", contain: "strict" }}
      >
        
        {/* HUD Bars (Always on top, unaffected by 3D space) */}
        <div className="absolute inset-0 z-[100] pointer-events-none flex flex-col justify-between mix-blend-screen">
          <SharedTopBar />
          <div className="flex-1" />
          <SharedBottomBar />
        </div>
        
        {/* Invisible Hit Areas for Hover Tracking */}
        <div ref={hitAreasRef} className="absolute inset-0 z-[90] flex">
          <div className="w-1/2 h-full cursor-pointer" onMouseEnter={hoverLeft} onMouseLeave={resetHover} />
          <div className="w-1/2 h-full cursor-pointer" onMouseEnter={hoverRight} onMouseLeave={resetHover} />
        </div>
        
        {/* The 3D Master Scene Container */}
        <div 
          ref={sceneRef} 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {/* Base Grid Environment */}
          <div className="absolute inset-0 z-0">
            <SharedBackground isMobile={false} />
          </div>
          
          {/* MATRIX RAIN (The Void underneath it all) */}
          <div 
            ref={matrixRainRef} 
            className="absolute inset-0 z-[5] overflow-hidden" 
            style={{ transform: "translateZ(-100px)", willChange: "transform" }}
          >
            <FallingPattern 
              color="rgba(255,255,255,0.25)" 
              blurIntensity="1.5em" 
              density={1.5} 
              duration={160}
              className="bg-transparent"
            />
          </div>
          
          {/* ========================================== */}
          {/* STUDIO LAYER (Full Screen Absolute)        */}
          {/* ========================================== */}
          <div 
            ref={studioLayerRef} 
            className="absolute inset-0 z-[20]" 
            style={{ transformStyle: "preserve-3d", willChange: "transform, filter, opacity", transform: "translateZ(0)" }}
          >
            <div 
              ref={studioActorRef} 
              className="absolute left-[8vw] top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] opacity-[0.35] mix-blend-screen pointer-events-none"
              style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
            >
              <AsciiAtlasActor className="w-full h-full object-contain" />
            </div>
            
            <div 
              ref={studioTextRef} 
              className="absolute left-[10vw] top-1/2 -translate-y-1/2 w-[35vw] max-w-[480px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
              style={{ willChange: "opacity, transform", WebkitFontSmoothing: "antialiased" }}
            >
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
          
          {/* ========================================== */}
          {/* SYSTEMS LAYER (Full Screen Absolute)       */}
          {/* ========================================== */}
          <div 
            ref={systemsLayerRef} 
            className="absolute inset-0 z-[20]" 
            style={{ transformStyle: "preserve-3d", willChange: "transform, filter, opacity", transform: "translateZ(0)" }}
          >
            <div 
              ref={systemsActorRef} 
              className="absolute right-[8vw] top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] opacity-[0.3] mix-blend-screen pointer-events-none"
              style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
            >
              <AsciiVitruvianActor className="w-full h-full object-contain" />
            </div>
            
            <div 
              ref={systemsTextRef} 
              className="absolute right-[10vw] top-1/2 -translate-y-1/2 w-[35vw] max-w-[480px] flex flex-col items-end text-right drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
              style={{ willChange: "opacity, transform", WebkitFontSmoothing: "antialiased" }}
            >
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
          
          {/* ========================================== */}
          {/* PAYLOAD LAYER (Z: -4000 initially)         */}
          {/* ========================================== */}
          <div 
            ref={payloadRef} 
            className="absolute inset-0 z-[50] flex flex-col items-center justify-center px-6 text-center" 
            style={{ transformStyle: "preserve-3d", willChange: "transform, opacity", transform: "translateZ(-4000px)" }}
          >
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(-1px)" }}>
              <div 
                ref={volumetricShadowRef} 
                className="w-[140%] h-[70%] bg-black/85 blur-[90px] rounded-[100%]" 
              />
            </div>

            <div className="relative z-10 w-full max-w-[800px] flex flex-col items-center pointer-events-auto" style={{ WebkitFontSmoothing: "antialiased" }}>
              
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
                <Link 
                  href="/contact" 
                  className="group relative px-10 py-5 bg-[#00FF00] text-black font-mono text-[13px] font-bold tracking-[0.1em] overflow-hidden active:scale-[0.98] transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)]"
                >
                  <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10">START A PROJECT</span>
                </Link>
                
                <Link 
                  href="#work" 
                  className="group relative px-10 py-5 border border-white/20 text-white font-mono text-[13px] tracking-[0.1em] overflow-hidden active:scale-[0.98] transition-all duration-500"
                >
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
    </div>
  )
}
