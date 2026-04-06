"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { AsciiAtlasActor } from "@/components/split-hero/ascii-atlas-actor"
import { AsciiVitruvianActor } from "@/components/split-hero/ascii-vitruvian-actor"
import { FallingPattern } from "@/components/ui/falling-pattern"

export default function HeroC3ZPush() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // ---------------------------------------------------------------------------
  // THE Z-AXIS FLYTHROUGH PHYSICS
  // ---------------------------------------------------------------------------
  // Top Panel opens upward and backward
  const topRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 60])
  const topZ = useTransform(scrollYProgress, [0, 0.5], [0, 400])
  const topOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0])

  // Bottom Panel opens downward and backward
  const bottomRotateX = useTransform(scrollYProgress, [0, 0.5], [0, -60])
  const bottomZ = useTransform(scrollYProgress, [0, 0.5], [0, 400])
  const bottomOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0])

  // The Center Seam zooms past you
  const seamScale = useTransform(scrollYProgress, [0, 0.4], [1, 5])
  const seamOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0])

  // The Final Payload flies in from deep Z-space
  const unifiedZ = useTransform(scrollYProgress, [0.3, 0.7], [-1000, 0])
  const unifiedOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])

  return (
    <div ref={containerRef} className="relative w-full h-[250dvh] bg-black text-white font-sans selection:bg-[#00FF00] selection:text-black">
      
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col z-0 bg-black" style={{ perspective: "1200px" }}>
        
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

        {/* --- TOP 50%: STUDIO (FLYING AWAY & UP) --- */}
        <motion.div 
          className="absolute top-0 inset-x-0 h-[50dvh] overflow-hidden bg-black flex flex-col justify-end pb-6 px-6 origin-top z-10 border-b border-white/30"
          style={{ rotateX: topRotateX, z: topZ, opacity: topOpacity }}
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

        {/* --- THE CENTER SEAM --- */}
        <motion.div 
          className="absolute top-1/2 left-0 w-full h-[1px] bg-white/50 shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20"
          style={{ scaleY: seamScale, opacity: seamOpacity, y: "-50%" }}
        />

        {/* --- BOTTOM 50%: SYSTEMS (FLYING AWAY & DOWN) --- */}
        <motion.div 
          className="absolute bottom-0 inset-x-0 h-[50dvh] overflow-hidden bg-black flex flex-col justify-start pt-6 px-6 origin-bottom z-10"
          style={{ rotateX: bottomRotateX, z: bottomZ, opacity: bottomOpacity }}
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
          
          {/* Scroll Hint */}
          <motion.div style={{ opacity: bottomOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-90">
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/80 mb-2 whitespace-nowrap drop-shadow-md">SCROLL TO ENTER</span>
            <div className="w-px h-8 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
          </motion.div>
        </motion.div>

        {/* --- THE PAYLOAD FLOATING IN FROM DEEP SPACE --- */}
        <motion.div 
          className="absolute inset-0 z-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ z: unifiedZ, opacity: unifiedOpacity }}
        >
          {/* The Atmosphere (Falling Matrix Dust) inside the deep void */}
          <div
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            style={{
              maskImage: "radial-gradient(circle at center, black 0%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 80%)",
            }}
          >
            <FallingPattern
              color="rgba(255,255,255,0.15)"
              blurIntensity="2px"
              density={1}
              duration={180}
              className="bg-transparent"
            />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center pointer-events-auto">
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
            <div className="flex flex-col gap-3 w-full max-w-[300px]">
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
