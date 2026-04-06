"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { AsciiAtlasActor } from "@/components/split-hero/ascii-atlas-actor"
import { AsciiVitruvianActor } from "@/components/split-hero/ascii-vitruvian-actor"
import { FallingPattern } from "@/components/ui/falling-pattern"

export default function HeroC4Flythrough() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll over 300vh to give a deep, smooth interactive "scrub"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // ---------------------------------------------------------------------------
  // THE Z-AXIS ELEMENT FLYTHROUGH (NO CARDS, NO CENTER LINE)
  // ---------------------------------------------------------------------------

  // 1. Top Elements (Studio Text) - Moves UP and FORWARD past the camera
  const topTextY = useTransform(scrollYProgress, [0, 0.4], [0, -300])
  const topTextZ = useTransform(scrollYProgress, [0, 0.4], [0, 800])
  const topTextOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0])
  const topTextBlur = useTransform(scrollYProgress, [0.2, 0.4], ["blur(0px)", "blur(20px)"]) // Simulates Depth of Field as it passes camera

  // 2. Top Actor (Atlas) - Moves UP, slightly LEFT, and FORWARD
  const topActorY = useTransform(scrollYProgress, [0, 0.45], [0, -150])
  const topActorX = useTransform(scrollYProgress, [0, 0.45], [0, -50])
  const topActorZ = useTransform(scrollYProgress, [0, 0.45], [-100, 600]) // Starts slightly back
  const topActorOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0.4, 0])
  const topActorBlur = useTransform(scrollYProgress, [0.25, 0.45], ["blur(0px)", "blur(30px)"])

  // 3. Bottom Elements (Systems Text) - Moves DOWN and FORWARD past the camera
  const bottomTextY = useTransform(scrollYProgress, [0, 0.4], [0, 300])
  const bottomTextZ = useTransform(scrollYProgress, [0, 0.4], [0, 800])
  const bottomTextOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0])
  const bottomTextBlur = useTransform(scrollYProgress, [0.2, 0.4], ["blur(0px)", "blur(20px)"])

  // 4. Bottom Actor (Vitruvian) - Moves DOWN, slightly RIGHT, and FORWARD
  const bottomActorY = useTransform(scrollYProgress, [0, 0.45], [0, 150])
  const bottomActorX = useTransform(scrollYProgress, [0, 0.45], [0, 50])
  const bottomActorZ = useTransform(scrollYProgress, [0, 0.45], [-100, 600])
  const bottomActorOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0.3, 0])
  const bottomActorBlur = useTransform(scrollYProgress, [0.25, 0.45], ["blur(0px)", "blur(30px)"])

  // 5. The Final Unified Payload - Flies in from the DEEP void (-1000 Z) to 0 Z
  const unifiedZ = useTransform(scrollYProgress, [0.3, 0.7], [-1500, 0])
  const unifiedOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const unifiedBlur = useTransform(scrollYProgress, [0.3, 0.6], ["blur(30px)", "blur(0px)"]) // Comes into focus

  // The Atmosphere (Falling Matrix Dust) - Fades in as we enter deep space
  const atmosphereOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])

  return (
    <div ref={containerRef} className="relative w-full h-[300dvh] bg-black text-white font-sans selection:bg-[#00FF00] selection:text-black">
      
      {/* 
        THE STICKY VIEWPORT (100dvh)
        The camera viewport. Perspective 1000px creates the 3D depth.
      */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col z-0 bg-black" style={{ perspective: "1000px" }}>
        
        {/* HUD: Top Bar (Fixed) */}
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

        {/* 
          ---------------------------------------------------------------------
          THE FLOATING ELEMENTS (Z-Space)
          ---------------------------------------------------------------------
        */}

        {/* 1. TOP ACTOR (ATLAS) */}
        <motion.div 
          className="absolute top-[5%] inset-x-0 z-0 flex items-center justify-center mix-blend-screen scale-[1.1] pointer-events-none"
          style={{ z: topActorZ, y: topActorY, x: topActorX, opacity: topActorOpacity, filter: topActorBlur }}
        >
          <div className="relative w-[120vw] h-[120vw]">
            <AsciiAtlasActor className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* 2. TOP TEXT (STUDIO) */}
        <motion.div 
          className="absolute top-[35%] left-6 z-10 w-full pointer-events-none"
          style={{ z: topTextZ, y: topTextY, opacity: topTextOpacity, filter: topTextBlur }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white/50 text-[10px] font-mono tracking-[0.2em]">01 ──</span>
            <span className="text-white text-[10px] font-mono tracking-widest drop-shadow-md">STUDIO</span>
          </div>
          <h2 className="text-[26px] leading-[1.1] font-medium tracking-tight text-white max-w-[280px] drop-shadow-lg">
            Brand systems with signal.
          </h2>
        </motion.div>

        {/* 3. BOTTOM ACTOR (VITRUVIAN) */}
        <motion.div 
          className="absolute top-[45%] inset-x-0 z-0 flex items-center justify-center mix-blend-screen scale-[0.85] pointer-events-none"
          style={{ z: bottomActorZ, y: bottomActorY, x: bottomActorX, opacity: bottomActorOpacity, filter: bottomActorBlur }}
        >
          <div className="relative w-[120vw] h-[120vw]">
            <AsciiVitruvianActor className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* 4. BOTTOM TEXT (SYSTEMS) */}
        <motion.div 
          className="absolute top-[55%] left-6 z-10 w-full pointer-events-none"
          style={{ z: bottomTextZ, y: bottomTextY, opacity: bottomTextOpacity, filter: bottomTextBlur }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white/50 text-[10px] font-mono tracking-[0.2em]">02 ──</span>
            <span className="text-white text-[10px] font-mono tracking-widest drop-shadow-md">PRODUCT & SYSTEMS</span>
          </div>
          <h2 className="text-[26px] leading-[1.1] font-medium tracking-tight text-white max-w-[280px] drop-shadow-lg">
            Software that can carry the business.
          </h2>
        </motion.div>
        
        {/* Scroll Hint (Fades out quickly) */}
        <motion.div 
          style={{ opacity: topTextOpacity }} 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/80 mb-2 whitespace-nowrap drop-shadow-md">SCROLL TO ENTER</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
        </motion.div>

        {/* 
          ---------------------------------------------------------------------
          THE UNIFIED PAYLOAD (Emerging from Deep Space)
          ---------------------------------------------------------------------
        */}
        <motion.div 
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
          style={{ z: unifiedZ, opacity: unifiedOpacity, filter: unifiedBlur }}
        >
          {/* The Atmosphere (Falling Matrix Dust) - Fades in */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            style={{
              opacity: atmosphereOpacity,
              maskImage: "radial-gradient(circle at center, black 0%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 80%)",
            }}
          >
            <FallingPattern color="rgba(255,255,255,0.15)" blurIntensity="2px" density={1} duration={180} />
          </motion.div>

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
