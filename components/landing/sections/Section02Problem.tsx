import React from "react";
import { motion } from "motion/react";
import { Crosshair, HudLabel, fadeUp } from "../ui/Shared";

export default function Section02Problem() {
  return (
    <section className="relative px-[5%] py-24 md:py-32 border-y border-white/10 bg-black overflow-hidden group cursor-text">
      {/* Subtle Section Scanline */}
      <motion.div 
        animate={{ top: ["-10%", "110%"] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }} 
        className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-0" 
      />
      
      <Crosshair className="-top-3 -left-3" />
      <Crosshair className="-top-3 -right-3" />
      <Crosshair className="-bottom-3 -left-3" />
      <Crosshair className="-bottom-3 -right-3" />
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mx-auto max-w-[1400px] relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-16 gap-4">
          <HudLabel className="text-white/40">SYS.DIAGNOSTIC // 02</HudLabel>
          <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 animate-pulse" />
            STATUS: CRITICAL_FRAGMENTATION
          </div>
        </div>
        
        <h2 className="max-w-[12ch] text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.04em] font-medium mb-16 text-white selection:bg-white selection:text-black">
          Most companies don't need another agency.<br/>
          <span className="text-white/30">They need one system.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 pt-3 border-t border-white/10">
            [ ERROR_LOG ]
          </div>
          <div className="md:col-span-9">
            <p className="text-[1.5rem] md:text-[2rem] mb-10 max-w-[45ch] text-white/60 group-hover:text-white/90 transition-colors duration-700 leading-[1.3] selection:bg-white selection:text-black">
              When brand, product, and growth are shaped apart, they drift apart. No amount of coordination fixes an architecture problem.
            </p>
            <div className="text-[1.125rem] md:text-[1.25rem] text-white/50 font-mono tracking-tight flex items-start gap-3 selection:bg-white selection:text-black bg-white/[0.02] border border-white/10 p-4 md:p-6">
              <span className="text-emerald-500 mt-1 md:mt-0 leading-none">&gt;</span> 
              <span className="flex-1 leading-snug">
                One operating team. One brief. No translation layer.
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} 
                  className="inline-block w-3 h-5 bg-white/70 align-middle ml-2" 
                />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
