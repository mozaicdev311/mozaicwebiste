"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { AsciiAtlasActor } from "@/components/split-hero/ascii-atlas-actor"
import { AsciiVitruvianActor } from "@/components/split-hero/ascii-vitruvian-actor"
import { FallingPattern } from "@/components/ui/falling-pattern"

export default function HeroC1Compression() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll over 200vh to give a smooth interactive "scrub"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // ---------------------------------------------------------------------------
  // ANIMATION CURVES
  // ---------------------------------------------------------------------------
  // Top Panel (Studio): Folds BACKWARD on its bottom hinge
  const topRotateX = useTransform(scrollYProgress, [0, 0.45], [0, 90])
  const topOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0])
  const topBlur = useTransform(scrollYProgress, [0, 0.45], ["blur(0px)", "blur(10px)"])

  // Bottom Panel (Systems): Folds BACKWARD on its top hinge
  const bottomRotateX = useTransform(scrollYProgress, [0, 0.45], [0, -90])
  const bottomOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0])
  const bottomBlur = useTransform(scrollYProgress, [0, 0.45], ["blur(0px)", "blur(10px)"])

  // The Center Singularity Seam: Glows, thins out, then explodes vertically
  const seamScaleY = useTransform(scrollYProgress, [0, 0.45, 0.55, 0.7], [1, 0.5, 500, 1000])
  const seamOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.6], [0.3, 1, 0])
  const seamColor = useTransform(scrollYProgress, [0.45, 0.55], ["rgba(255,255,255,0.3)", "rgba(255,255,255,1)"])

  // The Unified Payload: Fades in as the seam explodes
  const unifiedOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1])
  const unifiedScale = useTransform(scrollYProgress, [0.55, 0.7], [0.9, 1])
  const unifiedY = useTransform(scrollYProgress, [0.55, 0.7], [20, 0])

  return (
    <div ref={containerRef} className="relative w-full h-[250dvh] bg-black text-white font-sans selection:bg-[#00FF00] selection:text-black">
      
      {/* 
        THE STICKY VIEWPORT (100dvh)
        Everything happens inside this fixed frame as the user scrolls the 250dvh container.
      */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col z-0" style={{ perspective: "1000px" }}>
        
        {/* HUD: Top Bar */}
        <div className="absolute top-0 inset-x-0 z-50 px-6 py-6 flex items-start justify-between pointer-events-none mix-blend-difference">
          <div className="flex flex-col gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fichier%201HD_New_Mozaic_Opt1-RK66SS2l1DT94G5RIbxu7IbwIHkQ4A.png"
              alt="MOZAIC"
              width={100}
              height={32}
              className="w-auto h-7 brightness-0 invert"
            />
            <span className="text-[8px] font-mono text-white/50 tracking-widest mt-1">EST. 2026</span>
          </div>
          <div className="flex flex-col items-end gap-1 text-[8px] font-mono text-white/40 tracking-widest">
            <span>SYS.ACT</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1 h-1 bg-[#00FF00]/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>

        {/* --- TOP 50%: STUDIO (FOLDS INWARD) --- */}
        <motion.div 
          className="absolute top-0 inset-x-0 h-[50dvh] overflow-hidden bg-black flex flex-col justify-end pb-6 px-6 origin-bottom z-10"
          style={{ rotateX: topRotateX, opacity: topOpacity, filter: topBlur }}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen scale-[1.1] translate-y-4 pointer-events-none">
            <div className="relative w-[120vw] h-[120vw]">
              <AsciiAtlasActor className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-[1]" />
          <div className="relative z-10 w-full">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white/50 text-[10px] font-mono tracking-[0.2em]">01 ──</span>
              <span className="text-white text-[10px] font-mono tracking-widest">STUDIO</span>
            </div>
            <h2 className="text-[24px] leading-[1.1] font-medium tracking-tight text-white max-w-[280px]">
              Brand systems with signal.
            </h2>
          </div>
        </motion.div>

        {/* --- BOTTOM 50%: SYSTEMS (FOLDS INWARD) --- */}
        <motion.div 
          className="absolute bottom-0 inset-x-0 h-[50dvh] overflow-hidden bg-black flex flex-col justify-start pt-6 px-6 origin-top z-10"
          style={{ rotateX: bottomRotateX, opacity: bottomOpacity, filter: bottomBlur }}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-screen scale-[0.85] -translate-y-4 pointer-events-none">
            <div className="relative w-[120vw] h-[120vw]">
              <AsciiVitruvianActor className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-[1]" />
          <div className="relative z-10 w-full">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white/50 text-[10px] font-mono tracking-[0.2em]">02 ──</span>
              <span className="text-white text-[10px] font-mono tracking-widest">PRODUCT & SYSTEMS</span>
            </div>
            <h2 className="text-[24px] leading-[1.1] font-medium tracking-tight text-white max-w-[280px]">
              Software that can carry the business.
            </h2>
          </div>
          
          {/* Scroll Hint inside bottom panel */}
          <motion.div style={{ opacity: bottomOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-90">
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/80 mb-2 whitespace-nowrap drop-shadow-md">SCROLL TO COMPRESS</span>
            <div className="w-px h-8 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
          </motion.div>
        </motion.div>

        {/* --- THE CENTER SEAM (THE SINGULARITY) --- */}
        <motion.div 
          className="absolute top-1/2 left-0 w-full h-[1px] z-30 -translate-y-1/2"
          style={{ scaleY: seamScaleY, opacity: seamOpacity, backgroundColor: seamColor, boxShadow: "0 0 30px rgba(255,255,255,1)" }}
        />

        {/* --- THE UNIFIED PAYLOAD (REVEALED FROM THE SINGULARITY) --- */}
        <motion.div 
          className="absolute inset-0 z-0 flex flex-col items-center justify-center px-6 text-center bg-black"
          style={{ opacity: unifiedOpacity, scale: unifiedScale, y: unifiedY }}
        >
          {/* Falling Matrix Dust behind the text */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
            <FallingPattern color="rgba(255,255,255,0.2)" blurIntensity="2px" density={1} duration={180} />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 w-full mb-8 opacity-90">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00FF00]/40 max-w-[60px]"></div>
              <span className="text-[#00FF00] text-[10px] font-mono tracking-[0.2em] font-bold">SYSTEM.UNIFIED</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00FF00]/40 max-w-[60px]"></div>
            </div>

            {/* Main Headline */}
            <h1 className="text-[38px] sm:text-[44px] leading-[1.05] font-medium tracking-tight text-white font-serif mb-6 text-balance max-w-[340px]">
              Brand, product, and intelligent systems.
              <span className="block text-white/50 mt-2">Built as one.</span>
            </h1>

            {/* Description */}
            <p className="text-[14px] leading-[1.6] font-mono text-white/50 mb-12 max-w-[300px] tracking-wide text-balance">
              One operating team. Led by founders. Backed by specialists. We build complete digital systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 w-full max-w-[300px] pointer-events-auto">
              <Link href="/contact" className="relative w-full py-4 bg-[#00FF00] text-black font-mono text-[12px] font-bold tracking-[0.1em] overflow-hidden active:scale-[0.98]">
                <span className="relative z-10">START A PROJECT</span>
              </Link>
              <Link href="#work" className="relative w-full py-4 border border-white/20 text-white font-mono text-[12px] tracking-[0.1em] overflow-hidden active:scale-[0.98] active:bg-white/5">
                <span className="relative z-10">VIEW WORK</span>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
