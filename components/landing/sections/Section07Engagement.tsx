import React, { useState } from "react";
import { motion } from "motion/react";
import { Crosshair, HudLabel, fadeUp, staggerContainer } from "../ui/Shared";
import { SprintGraph, BuildGraph, PartnerGraph } from "../ui/Graphs";

interface ProtocolRowProps {
  index: string
  mode: string
  title: string
  desc: string
  GraphComponent: React.ComponentType<{ isHovered: boolean }>
}

const PROTOCOLS: ProtocolRowProps[] = [
  {
    index: "01",
    mode: "[ MODE: BURST_EXECUTION ]",
    title: "Sprint",
    desc: "The sharpest place to start. Strategy, audits, landing pages, product scoping, automation planning, and early system direction.",
    GraphComponent: SprintGraph,
  },
  {
    index: "02",
    mode: "[ MODE: SYSTEM_COMPILE ]",
    title: "Build",
    desc: "End-to-end delivery across brand, websites, products, platforms, and intelligent systems.",
    GraphComponent: BuildGraph,
  },
  {
    index: "03",
    mode: "[ MODE: CONTINUOUS_SYNC ]",
    title: "Partner",
    desc: "Ongoing creative, technical, product, and strategic support for teams that need a senior layer close to the work.",
    GraphComponent: PartnerGraph,
  },
]

function ProtocolRow({ index, mode, title, desc, GraphComponent }: ProtocolRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div 
      variants={fadeUp}
      className="group relative border-b border-white/10 py-10 md:py-16 cursor-crosshair flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Background */}
      <div className="absolute inset-0 bg-white/[0.03] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500 pointer-events-none" />
      
      {/* Crosshairs on hover */}
      <Crosshair className="opacity-0 group-hover:opacity-100 transition-opacity top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      <Crosshair className="opacity-0 group-hover:opacity-100 transition-opacity bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

      {/* Left: Text Info */}
      <div className="flex-1 relative z-10 pl-4 md:pl-8 border-l-2 border-transparent group-hover:border-white transition-colors duration-500">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
          <span className="bg-white/10 px-2 py-1 text-white/50 group-hover:bg-white group-hover:text-black transition-colors duration-300">PROTOCOL_{index}</span>
          <span className="text-white/40 group-hover:text-white transition-colors duration-300">{mode}</span>
        </div>
        <h3 className="text-[2.5rem] md:text-[3rem] font-medium mb-4 text-white group-hover:translate-x-2 transition-transform duration-500 leading-none">{title}</h3>
        <p className="text-[1.125rem] text-white/50 max-w-[45ch] leading-relaxed group-hover:text-white/80 transition-colors duration-300">{desc}</p>
      </div>

      {/* Right: Graph */}
      <div className="w-full md:w-[40%] h-32 md:h-40 relative z-10 border border-white/10 bg-black/50 p-6 group-hover:border-white/30 transition-colors duration-500 flex items-center justify-center">
         <div className="absolute top-2 left-2 font-mono text-[8px] text-white/20 group-hover:text-white/50 transition-colors">SYS.VIZ // {title.toUpperCase()}</div>
         <GraphComponent isHovered={isHovered} />
      </div>
    </motion.div>
  );
};

export default function Section07Engagement() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 border-y border-white/10">
      <HudLabel className="mb-8">ENGAGEMENT.MODELS // 07</HudLabel>
      <motion.h2 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] font-medium mb-16"
      >
        Three ways in.<br/>
        <span className="text-white/30">One standard.</span>
      </motion.h2>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="flex flex-col relative border-t border-white/10"
      >
        {PROTOCOLS.map((protocol) => (
          <ProtocolRow key={protocol.index} {...protocol} />
        ))}
      </motion.div>
    </section>
  );
}
