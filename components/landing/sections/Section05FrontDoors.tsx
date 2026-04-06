import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HashLink } from "@/components/hash-link";
import { HudLabel, InteractiveCard, CornerBrackets, fadeUp, staggerContainer } from "../ui/Shared";

export default function Section05FrontDoors() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 border-y border-white/10 overflow-hidden">
      {/* Massive background typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-white/[0.02] pointer-events-none select-none leading-none tracking-tighter">
        05
      </div>

      <HudLabel className="mb-8">ENTRY.VECTORS // 05</HudLabel>
      <motion.h2 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] font-medium mb-12 relative z-10"
      >
        Where do you start?
      </motion.h2>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
      >
        <HashLink href="#service-brand-product" className="block h-full">
          <InteractiveCard variants={fadeUp} className="p-8 md:p-16 border border-white/20 flex flex-col h-full hover:bg-white max-md:data-[active=true]:bg-white hover:text-black max-md:data-[active=true]:text-black transition-all duration-500 group cursor-pointer relative overflow-hidden">
            <CornerBrackets size="w-8 h-8" />
            <div className="absolute -right-10 -top-10 text-[150px] font-mono font-bold text-white/[0.03] group-hover:text-black/[0.05] max-md:group-data-[active=true]:text-black/[0.05] transition-colors pointer-events-none">01</div>
            
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-black/50 max-md:group-data-[active=true]:text-black/50 mb-16 transition-colors">Studio</div>
            <h3 className="text-[2rem] font-medium mb-6 leading-tight">Identity, campaigns, film, content, and brand systems with real signal.</h3>
            <p className="text-[1.125rem] text-white/50 group-hover:text-black/70 max-md:group-data-[active=true]:text-black/70 transition-colors mb-0">Creative direction at global brand level, inside a studio that ships what it designs.</p>
            <div className="mt-20 pt-8 border-t border-white/10 group-hover:border-black/10 max-md:group-data-[active=true]:border-black/10 font-mono text-[10px] tracking-[0.2em] flex items-center gap-3 uppercase">
              [ INITIATE_SEQUENCE ] <ArrowRight size={14} className="group-hover:translate-x-2 max-md:group-data-[active=true]:translate-x-2 transition-transform duration-300" />
            </div>
          </InteractiveCard>
        </HashLink>
        
        <HashLink href="#service-software" className="block h-full">
          <InteractiveCard variants={fadeUp} className="p-8 md:p-16 border border-white/20 flex flex-col h-full hover:bg-white max-md:data-[active=true]:bg-white hover:text-black max-md:data-[active=true]:text-black transition-all duration-500 group cursor-pointer relative overflow-hidden">
            <CornerBrackets size="w-8 h-8" />
            <div className="absolute -right-10 -top-10 text-[150px] font-mono font-bold text-white/[0.03] group-hover:text-black/[0.05] max-md:group-data-[active=true]:text-black/[0.05] transition-colors pointer-events-none">02</div>
            
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-black/50 max-md:group-data-[active=true]:text-black/50 mb-16 transition-colors">Product & Systems</div>
            <h3 className="text-[2rem] font-medium mb-6 leading-tight">Websites, software, platforms, automation, and intelligent systems built for real-world use.</h3>
            <p className="text-[1.125rem] text-white/50 group-hover:text-black/70 max-md:group-data-[active=true]:text-black/70 transition-colors mb-0">Engineering standards shaped in fintech, inside a studio that understands brand from day one.</p>
            <div className="mt-20 pt-8 border-t border-white/10 group-hover:border-black/10 max-md:group-data-[active=true]:border-black/10 font-mono text-[10px] tracking-[0.2em] flex items-center gap-3 uppercase">
              [ INITIATE_SEQUENCE ] <ArrowRight size={14} className="group-hover:translate-x-2 max-md:group-data-[active=true]:translate-x-2 transition-transform duration-300" />
            </div>
          </InteractiveCard>
        </HashLink>
      </motion.div>
    </section>
  );
}
