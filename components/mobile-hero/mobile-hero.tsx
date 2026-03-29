"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { AsciiAtlasActor } from "@/components/split-hero/ascii-atlas-actor"
import { AsciiVitruvianActor } from "@/components/split-hero/ascii-vitruvian-actor"
import { FallingPattern } from "@/components/ui/falling-pattern"

export default function MobileHero() {
  return (
    <div className="relative w-full bg-black text-white font-sans selection:bg-[#00FF00] selection:text-black">
      
      {/* 
        =======================================================================
        LAYER 1: THE STICKY BACKGROUND (100dvh)
        This stays pinned to the back while the user scrolls.
        =======================================================================
      */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col z-0">
        
        {/* HUD: Top Bar */}
        <div className="absolute top-0 inset-x-0 z-20 px-6 py-6 flex items-start justify-between pointer-events-none">
          <div className="flex flex-col gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fichier%201HD_New_Mozaic_Opt1-RK66SS2l1DT94G5RIbxu7IbwIHkQ4A.png"
              alt="MOZAIC"
              width={100}
              height={32}
              className="w-auto h-7 brightness-0 invert"
            />
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[8px] font-mono text-white/50 tracking-widest">EST. 2026</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-[8px] font-mono text-white/40 tracking-widest">
            <span>SYS.ACT</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1 h-1 bg-[#00FF00]/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>

        {/* --- TOP 50%: STUDIO --- */}
        <div className="relative flex-1 w-full overflow-hidden bg-black flex flex-col justify-end pb-6 px-6">
          {/* Background Actor (Atlas for Studio) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen scale-[1.1] translate-y-4">
            <div className="relative w-[120vw] h-[120vw]">
              <AsciiAtlasActor className="w-full h-full object-contain" />
            </div>
          </div>
          {/* Top Gradient for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 to-transparent z-[1]" />
          
          {/* Content (Anchored Bottom-Left, resting on the seam) */}
          <div className="relative z-10 w-full">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white/50 text-[10px] font-mono tracking-[0.2em]">01 ──</span>
              <span className="text-white text-[10px] font-mono tracking-widest">STUDIO</span>
            </div>
            <h2 className="text-[24px] leading-[1.1] font-medium tracking-tight text-white max-w-[280px]">
              Brand systems with signal.
            </h2>
          </div>
        </div>

        {/* --- THE CENTER SEAM --- */}
        <div className="relative z-20 w-full h-[1px] bg-white/30 shadow-[0_0_15px_rgba(255,255,255,0.6)]" />

        {/* --- BOTTOM 50%: SYSTEMS --- */}
        <div className="relative flex-1 w-full overflow-hidden bg-black flex flex-col justify-start pt-6 px-6">
          {/* Background Actor (Vitruvian for Systems - Scaled Down) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-screen scale-[0.85] -translate-y-4">
            <div className="relative w-[120vw] h-[120vw]">
              <AsciiVitruvianActor className="w-full h-full object-contain" />
            </div>
          </div>
          {/* Bottom Gradient for text legibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/90 to-transparent z-[1]" />
          
          {/* Content (Anchored Top-Left, hanging from the seam) */}
          <div className="relative z-10 w-full">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white/50 text-[10px] font-mono tracking-[0.2em]">02 ──</span>
              <span className="text-white text-[10px] font-mono tracking-widest">PRODUCT & SYSTEMS</span>
            </div>
            <h2 className="text-[24px] leading-[1.1] font-medium tracking-tight text-white max-w-[280px]">
              Software that can carry the business.
            </h2>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-90">
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/80 mb-2 whitespace-nowrap drop-shadow-md">SCROLL TO SYNTHESIZE</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
        </div>

      </div>

      {/* 
        =======================================================================
        LAYER 2: THE UNIFIED CURTAIN (100dvh)
        This slides up over the sticky background when the user scrolls.
        =======================================================================
      */}
      <div className="relative h-[100dvh] w-full z-10 bg-black/80 backdrop-blur-xl border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Glass edge highlight */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute top-1 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF00]/10 to-transparent" />

        {/* The Atmosphere (Falling Matrix Dust) inside the curtain */}
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

        {/* The Payload (Centered Content) */}
        <div className="relative z-10 px-6 w-full flex flex-col items-center text-center">
          
          {/* Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-3 w-full mb-8 opacity-90"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00FF00]/40 max-w-[60px]"></div>
            <span className="text-[#00FF00] text-[10px] font-mono tracking-[0.2em] font-bold">SYSTEM.UNIFIED</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00FF00]/40 max-w-[60px]"></div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[38px] sm:text-[44px] leading-[1.05] font-medium tracking-tight text-white font-serif mb-6 text-balance max-w-[340px]"
          >
            Brand, product, and intelligent systems.
            <span className="block text-white/50 mt-2">Built as one.</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[14px] leading-[1.6] font-mono text-white/50 mb-12 max-w-[300px] tracking-wide text-balance"
          >
            One operating team. Led by founders. Backed by specialists. We build complete digital systems.
          </motion.p>

          {/* Mobile Optimized CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-3 w-full max-w-[300px]"
          >
            <Link 
              href="/contact" 
              className="relative w-full py-4 bg-[#00FF00] text-black font-mono text-[12px] font-bold tracking-[0.1em] text-center overflow-hidden transition-all duration-300 active:scale-[0.98]"
            >
              <span className="relative z-10">START A PROJECT</span>
              {/* Button corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black/40"></div>
            </Link>
            
            <Link 
              href="#work" 
              className="relative w-full py-4 border border-white/20 text-white font-mono text-[12px] tracking-[0.1em] text-center overflow-hidden transition-all duration-300 active:scale-[0.98] active:bg-white/5"
            >
              <span className="relative z-10">VIEW WORK</span>
              {/* Button corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>
            </Link>
          </motion.div>
          
        </div>
      </div>
      
    </div>
  )
}
