"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { AsciiAtlasActor } from "@/components/split-hero/ascii-atlas-actor"
import { AsciiVitruvianActor } from "@/components/split-hero/ascii-vitruvian-actor"
import { FallingPattern } from "@/components/ui/falling-pattern"

export default function HeroC2Melt() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // ---------------------------------------------------------------------------
  // THE MELT PHYSICS
  // ---------------------------------------------------------------------------
  // As scroll progresses, the halves stretch vertically and blur heavily
  const meltBlur = useTransform(scrollYProgress, [0, 0.4, 0.6], ["blur(0px)", "blur(20px)", "blur(40px)"])
  const meltOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0])
  const topStretch = useTransform(scrollYProgress, [0, 0.6], [1, 2.5])
  const bottomStretch = useTransform(scrollYProgress, [0, 0.6], [1, 2.5])

  // The center seam "drips" away
  const seamOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // The final payload "solidifies" out of the blur
  const unifiedBlur = useTransform(scrollYProgress, [0.4, 0.7, 1], ["blur(40px)", "blur(10px)", "blur(0px)"])
  const unifiedOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1])
  const unifiedY = useTransform(scrollYProgress, [0.5, 1], [30, 0])

  return (
    <div ref={containerRef} className="relative w-full h-[250dvh] bg-black text-white font-sans selection:bg-[#00FF00] selection:text-black">
      
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col z-0 bg-black">
        
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

        {/* --- THE MELTING ELEMENTS --- */}
        <motion.div 
          className="absolute inset-0 z-10 flex flex-col pointer-events-none"
          style={{ filter: meltBlur, opacity: meltOpacity }}
        >
          {/* Top Half (Atlas) */}
          <motion.div 
            className="flex-1 w-full bg-black relative origin-top overflow-hidden"
            style={{ scaleY: topStretch }}
          >
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen scale-[1.1] translate-y-4">
              <div className="relative w-[120vw] h-[120vw]">
                <AsciiAtlasActor className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-[1]" />
            <div className="absolute bottom-6 left-6 z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-white/50 text-[10px] font-mono tracking-[0.2em]">01 ──</span>
                <span className="text-white text-[10px] font-mono tracking-widest">STUDIO</span>
              </div>
              <h2 className="text-[24px] leading-[1.1] font-medium tracking-tight text-white max-w-[280px]">
                Brand systems with signal.
              </h2>
            </div>
          </motion.div>

          {/* Bottom Half (Vitruvian) */}
          <motion.div 
            className="flex-1 w-full bg-black relative origin-bottom overflow-hidden"
            style={{ scaleY: bottomStretch }}
          >
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-screen scale-[0.85] -translate-y-4">
              <div className="relative w-[120vw] h-[120vw]">
                <AsciiVitruvianActor className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-[1]" />
            <div className="absolute top-6 left-6 z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-white/50 text-[10px] font-mono tracking-[0.2em]">02 ──</span>
                <span className="text-white text-[10px] font-mono tracking-widest">PRODUCT & SYSTEMS</span>
              </div>
              <h2 className="text-[24px] leading-[1.1] font-medium tracking-tight text-white max-w-[280px]">
                Software that can carry the business.
              </h2>
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-90">
              <span className="text-[10px] font-mono tracking-[0.2em] text-white/80 mb-2 whitespace-nowrap drop-shadow-md">SCROLL TO DISSOLVE</span>
              <div className="w-px h-8 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Center Seam */}
        <motion.div 
          className="absolute top-1/2 left-0 w-full h-[1px] bg-white/30 shadow-[0_0_15px_rgba(255,255,255,0.6)] z-20"
          style={{ opacity: seamOpacity }}
        />

        {/* --- THE SOLIDIFYING PAYLOAD --- */}
        <motion.div 
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: unifiedOpacity, filter: unifiedBlur, y: unifiedY }}
        >
          {/* Subtle noise/grid behind final text */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          <div className="relative z-10 w-full flex flex-col items-center pointer-events-auto">
            <div className="flex items-center justify-center gap-3 w-full mb-8 opacity-90">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00FF00]/40 max-w-[60px]"></div>
              <span className="text-[#00FF00] text-[10px] font-mono tracking-[0.2em] font-bold">SYSTEM.UNIFIED</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00FF00]/40 max-w-[60px]"></div>
            </div>

            <h1 className="text-[38px] sm:text-[44px] leading-[1.05] font-medium tracking-tight text-white font-serif mb-6 text-balance max-w-[340px]">
              Brand, product, and intelligent systems.
              <span className="block text-white/50 mt-2">Built as one.</span>
            </h1>

            <p className="text-[14px] leading-[1.6] font-mono text-white/50 mb-12 max-w-[300px] tracking-wide text-balance">
              One operating team. Led by founders. Backed by specialists. We build complete digital systems.
            </p>

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
