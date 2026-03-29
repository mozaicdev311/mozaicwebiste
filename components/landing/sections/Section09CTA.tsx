import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Terminal, ArrowRight } from "lucide-react";
import { HashLink } from "@/components/hash-link";
import { ScrambleHeading, fadeUp } from "../ui/Shared";

export default function Section09CTA() {
  return (
    <section id="contact" className="relative scroll-mt-24 px-[5%] py-32 md:py-48 flex flex-col items-center justify-center border-y border-white/10 overflow-hidden bg-black">
      {/* Background Grid & Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />
      <motion.div 
        animate={{ y: ["-100%", "200%"] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }} 
        className="absolute inset-0 w-full h-[20%] bg-gradient-to-b from-transparent via-white/[0.05] to-transparent pointer-events-none" 
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="relative z-10 w-full max-w-[800px] border border-white/20 bg-black/50 backdrop-blur-md p-8 md:p-16"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/20 pb-6 mb-12">
          <div className="flex items-center gap-4">
            <Terminal size={20} className="text-white/50" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/50 uppercase">Secure_Channel_Open</span>
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white/20" />
            <div className="w-2 h-2 bg-white/20" />
            <div className="w-2 h-2 bg-white" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <span className="text-white/40 font-mono mt-2 md:mt-4">&gt;</span>
            <div className="relative flex-1">
              {/* Invisible placeholder to lock height perfectly */}
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] font-medium opacity-0 pointer-events-none select-none" aria-hidden="true">
                Tell us what you&apos;re building.
              </h2>
              {/* Actual animated text */}
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] font-medium text-white absolute top-0 left-0 w-full">
                <ScrambleHeading text="Tell us what you're building." />
              </h2>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <span className="text-white/40 font-mono mt-1">&gt;</span>
            <div className="relative flex-1">
              {/* Invisible placeholder to lock height perfectly */}
              <p className="text-[1.125rem] md:text-[1.25rem] max-w-[45ch] leading-relaxed opacity-0 pointer-events-none select-none" aria-hidden="true">
                Stage, constraints, timeline, and what is at stake. We&apos;ll tell you where to start. And what not to build yet.
              </p>
              {/* Actual animated text */}
              <p className="text-white/60 text-[1.125rem] md:text-[1.25rem] max-w-[45ch] leading-relaxed absolute top-0 left-0 w-full">
                <ScrambleHeading text="Stage, constraints, timeline, and what is at stake. We'll tell you where to start. And what not to build yet." />
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start md:items-center pt-8">
            <span className="text-white/40 font-mono mt-4 md:mt-0">&gt;</span>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 w-full">
              <Link href="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-[10px] md:text-[12px] uppercase tracking-[0.2em] bg-white text-black overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  INITIATE_PROTOCOL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-black/10"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                />
              </Link>
              <HashLink href="#work" className="inline-flex items-center justify-center px-8 py-4 font-mono text-[10px] md:text-[12px] uppercase tracking-[0.2em] border border-white/30 text-white hover:border-white transition-colors duration-300">
                VIEW_LOGS
              </HashLink>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
