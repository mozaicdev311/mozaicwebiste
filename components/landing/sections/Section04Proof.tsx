import React from "react";
import { motion } from "motion/react";
import { HudLabel, InteractiveCard, DataBar, fadeUp, staggerContainer } from "../ui/Shared";

export default function Section04Proof() {
  return (
    <section id="work" className="relative px-[5%] py-16 md:py-24 border-y border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="lg:col-span-5 sticky top-40 self-start"
        >
          <HudLabel className="mb-8">EVIDENCE.LOG // 04</HudLabel>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] font-medium mb-8">
            MOZAIC is new.<br/>
            <span className="text-white/30">The standards aren't.</span>
          </h2>
          <p className="text-[1.25rem] text-white/50 max-w-[40ch]">
            A selection of MOZAIC builds and the founder work that set the bar behind them.
          </p>
          
          {/* Decorative Data Block */}
          <div className="mt-16 p-6 border border-white/10 bg-white/[0.02]">
            <DataBar label="SYS.INTEGRITY" value={98.4} />
            <DataBar label="CREATIVE.YIELD" value={100} />
            <DataBar label="TECH.DEBT" value={2.1} />
          </div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="lg:col-span-7 border-t border-white/20"
        >
          {[
            { label: "MOZAIC BUILD", title: "Natsnap", desc: "A two-sided marketplace for wildlife photography and nature travel. Role-based access, booking orchestration, payment flows, provider operations, and localization composed as one product system from day one." },
            { label: "MOZAIC BUILD", title: "PrepLingo", desc: "An AI-powered exam prep platform for French immigration tests. Real-time speech evaluation, rubric-based LLM scoring, queue-based AI workers, encrypted storage, and GDPR-compliant handling shaped into one evaluation system. Built for candidates who cannot afford guesswork." },
            { label: "FOUNDER EXPERIENCE", title: "Global Scale", desc: "From Back Market 360 creative and Soho retail launch work to Moët Hennessy maison content, Whatnot social creative, and Vice TV creative direction." }
          ].map((item, i) => (
            <InteractiveCard key={i} variants={fadeUp} className="group border-b border-white/20 py-12 relative overflow-hidden hover:bg-white max-md:data-[active=true]:bg-white hover:text-black max-md:data-[active=true]:text-black transition-all duration-500 px-4 md:px-8 -mx-4 md:-mx-8 cursor-crosshair">
              <div className="absolute left-0 top-0 h-full w-1 bg-white scale-y-0 group-hover:scale-y-100 max-md:group-data-[active=true]:scale-y-100 transition-transform origin-top duration-300" />
              
              <div className="flex justify-between items-start mb-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-black/50 max-md:group-data-[active=true]:text-black/50 transition-colors">
                  {item.label}
                </div>
                <div className="font-mono text-[10px] tracking-widest opacity-0 group-hover:opacity-100 max-md:group-data-[active=true]:opacity-100 transition-opacity text-black/40">
                  [ VERIFIED ]
                </div>
              </div>
              
              <div className="text-[2rem] font-medium mb-6 group-hover:translate-x-4 max-md:group-data-[active=true]:translate-x-4 transition-transform duration-500 flex items-center gap-4">
                {item.title}
              </div>
              
              <p className="text-[1.125rem] text-white/60 group-hover:text-black/80 max-md:group-data-[active=true]:text-black/80 transition-colors mb-0 leading-relaxed max-w-[60ch]">
                {item.desc}
              </p>
            </InteractiveCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
