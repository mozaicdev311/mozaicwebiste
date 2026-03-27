import React from "react";
import { motion } from "motion/react";
import { HudLabel, fadeUp } from "../ui/Shared";

const TerminalServices = () => {
  const services = [
    { id: "01", anchor: "service-brand-product", title: "Launch the brand and the product together.", desc: "Not two parallel tracks stitched together at the end. One team shaping identity, experience, and architecture from the same brief." },
    { id: "02", anchor: "service-software", title: "Ship software that can carry the business.", desc: "Websites, platforms, marketplaces, SaaS, and internal tools built for real use, not just launch day." },
    { id: "03", anchor: "service-growth", title: "Connect growth to product through intelligent systems.", desc: "Automation, acquisition, and implementation owned by the same team. No translation layer between strategy, code, and performance." },
    { id: "04", anchor: "service-strategy", title: "Decide what to build before the budget moves.", desc: "Roadmaps, sequencing, scope, and architecture grounded in what can actually ship." }
  ];

  const terminalLine = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  const terminalContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={terminalContainer}
      className="w-full max-w-5xl mx-auto border border-white/20 bg-[#050505] overflow-hidden font-mono text-sm md:text-base shadow-2xl relative"
    >
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 border border-white/20 hover:bg-white/40 transition-colors" />
          <div className="w-3 h-3 border border-white/20 hover:bg-white/40 transition-colors" />
          <div className="w-3 h-3 border border-white/20 hover:bg-white/40 transition-colors" />
        </div>
        <div className="text-white/30 text-[10px] tracking-widest uppercase">mozaic-sys-compiler</div>
      </div>
      
      {/* Terminal Body */}
      <div className="p-6 md:p-10 flex flex-col gap-3 text-white/80">
        <motion.div variants={terminalLine} className="flex gap-3 mb-4">
          <span className="text-white/40">&gt;</span>
          <span className="text-white">pnpm dlx mozaic@latest init --architecture</span>
        </motion.div>
        
        {services.map((service, i) => (
          <motion.div key={i} id={service.anchor} variants={terminalLine} className="flex scroll-mt-28 flex-col gap-1 mb-2">
            <div className="flex gap-3 items-start">
              <span className="text-emerald-500 mt-0.5">✔</span>
              <span className="text-white">Compiling Module {service.id}: {service.title}</span>
            </div>
            <div className="flex gap-3 items-start pl-6">
              <span className="text-white/30">↳</span>
              <span className="text-white/50 leading-relaxed">{service.desc}</span>
            </div>
          </motion.div>
        ))}

        <motion.div variants={terminalLine} className="mt-4 flex gap-3 items-start">
          <span className="text-blue-400 font-bold">i</span>
          <span className="text-blue-400">Updated 4 modules:</span>
        </motion.div>
        <motion.div variants={terminalLine} className="flex gap-3 items-start pl-6 text-white/50">
          <span>- identity_and_product.ts</span>
        </motion.div>
        <motion.div variants={terminalLine} className="flex gap-3 items-start pl-6 text-white/50">
          <span>- scalable_software.ts</span>
        </motion.div>
        <motion.div variants={terminalLine} className="flex gap-3 items-start pl-6 text-white/50">
          <span>- growth_systems.ts</span>
        </motion.div>
        <motion.div variants={terminalLine} className="flex gap-3 items-start pl-6 text-white/50 mb-4">
          <span>- strategic_roadmaps.ts</span>
        </motion.div>

        <motion.div variants={terminalLine} className="flex gap-3 items-start">
          <span className="text-white">Success! Architecture initialization completed.</span>
        </motion.div>
        <motion.div variants={terminalLine} className="flex gap-3 items-start text-white/50">
          <span>You may now deploy the system.</span>
        </motion.div>

        <motion.div variants={terminalLine} className="mt-6 flex gap-3 items-center">
          <span className="text-white/40">&gt;</span>
          <motion.div 
            animate={{ opacity: [1, 0] }} 
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-2.5 h-5 bg-white"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Section06Output() {
  return (
    <section id="services" className="relative scroll-mt-24 px-[5%] py-16 md:py-24 border-y border-white/10">
      <HudLabel className="mb-8">OUTPUT.MATRIX // 06</HudLabel>
      <motion.h2 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] font-medium mb-12"
      >
        What we help you shape.
      </motion.h2>
      
      <TerminalServices />
    </section>
  );
}
