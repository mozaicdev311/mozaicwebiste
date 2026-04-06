import React from "react";
import { motion } from "motion/react";
import { Activity, Cpu, Network } from "lucide-react";
import { HudLabel, ScrambleHeading, InteractiveCard, CornerBrackets, fadeUp, staggerContainer } from "../ui/Shared";
import { WaveformGraph, SystemScanGraph, NodeGraph } from "../ui/Graphs";

export default function Section03Archive() {
  return (
    <section id="archive" className="relative scroll-mt-24 px-[5%] py-16 md:py-24 border-y border-white/10">
      <HudLabel className="mb-8">ARCHIVE.RECORDS // 03</HudLabel>
      <motion.h2 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] font-medium mb-12 min-h-[3.15em] md:min-h-0"
      >
        <ScrambleHeading text="The work predates the name." />
      </motion.h2>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 p-[1px]"
      >
        <InteractiveCard variants={fadeUp} className="bg-black p-8 md:p-12 relative group hover:bg-white/[0.03] data-[active=true]:bg-white/[0.03] transition-colors duration-500 overflow-hidden">
          <CornerBrackets size="w-6 h-6" />
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-12 flex justify-between items-center">
            <span>[ 01 ]</span>
            <Activity size={14} className="group-hover:text-white group-data-[active=true]:text-white transition-colors" />
          </div>
          <WaveformGraph />
          <h3 className="text-[1.5rem] font-medium mb-4 text-white">Creative direction with genuine signal.</h3>
          <p className="text-[1rem] text-white/50 leading-relaxed">
            Senior art direction, creative production, and content execution for Back Market, Moët Hennessy, Whatnot, and Vice TV. Work shaped for global stages and real commercial stakes. That is the creative baseline at MOZAIC.
          </p>
        </InteractiveCard>
        
        <InteractiveCard variants={fadeUp} className="bg-black p-8 md:p-12 relative group hover:bg-white/[0.03] data-[active=true]:bg-white/[0.03] transition-colors duration-500 overflow-hidden">
          <CornerBrackets size="w-6 h-6" />
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-12 flex justify-between items-center">
            <span>[ 02 ]</span>
            <Cpu size={14} className="group-hover:text-white group-data-[active=true]:text-white transition-colors" />
          </div>
          <SystemScanGraph />
          <h3 className="text-[1.5rem] font-medium mb-4 text-white">Technical standards under genuine scrutiny.</h3>
          <p className="text-[1rem] text-white/50 leading-relaxed">
            Security-first engineering shaped in high-stakes environments. Our tech lead&apos;s baseline is fintech. Reliability and compliance that do not disappear because the project happens to be a website. That is the technical floor.
          </p>
        </InteractiveCard>
        
        <InteractiveCard variants={fadeUp} className="bg-black p-8 md:p-12 relative group hover:bg-white/[0.03] data-[active=true]:bg-white/[0.03] transition-colors duration-500 overflow-hidden">
          <CornerBrackets size="w-6 h-6" />
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-12 flex justify-between items-center">
            <span>[ 03 ]</span>
            <Network size={14} className="group-hover:text-white group-data-[active=true]:text-white transition-colors" />
          </div>
          <NodeGraph />
          <h3 className="text-[1.5rem] font-medium mb-4 text-white">Products and intelligent systems under actual constraints.</h3>
          <p className="text-[1rem] text-white/50 leading-relaxed">
            Not just for clients. We compose our own platforms and AI systems with our own stakes on the line. Recommendations come from execution, not theory. That is what keeps the work honest.
          </p>
        </InteractiveCard>
      </motion.div>
    </section>
  );
}
