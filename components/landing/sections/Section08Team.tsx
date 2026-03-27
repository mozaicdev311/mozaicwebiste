import React, { useState } from "react";
import { motion } from "motion/react";
import { Fingerprint, ArrowRight } from "lucide-react";
import { HashLink } from "@/components/hash-link";
import { HudLabel, ScrambleHeading, CornerBrackets, Barcode, fadeUp } from "../ui/Shared";

const PersonnelDossier = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const personnel = [
    { 
      id: "01", 
      name: "Oussama", 
      role: "Product, Systems & Business", 
      location: "Barcelona",
      coords: "41.3851° N, 2.1734° E",
      desc: "Sees past the brief to the system behind it. Not the website. Not the campaign. The operating layer. Co-founded Natsnap and led product through launch: a two-sided marketplace with real users, real payments, and product logic composed from architecture to go-to-market." 
    },
    { 
      id: "02", 
      name: "Tawfik", 
      role: "Creative Direction", 
      location: "Paris",
      coords: "48.8566° N, 2.3522° E",
      desc: "Senior art direction and creative production across campaigns, launches, social content, and brand systems for Back Market, Moët Hennessy, Whatnot, and Vice TV. The reason a MOZAIC product doesn't just work. It feels like something." 
    },
    { 
      id: "03", 
      name: "Med Amine", 
      role: "Tech Lead & Infrastructure", 
      location: "Montreal",
      coords: "45.5017° N, 73.5673° W",
      desc: "Professional baseline: fintech. Systems that process real money under real regulatory scrutiny. Built PrepLingo's AI pipeline: speech evaluation, LLM scoring, encrypted storage, GDPR compliance. For candidates who cannot afford a system that guesses. His minimum is most studios' ceiling." 
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      className="w-full border border-white/20 bg-black flex flex-col relative overflow-hidden mb-32"
    >
      <div className="flex flex-col md:flex-row w-full">
        {/* Left: Index */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/20 py-6 md:p-8 flex flex-col bg-white/[0.02] relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-2 px-6 md:px-0">
            <div className="w-2 h-2 bg-white/40 animate-pulse" />
            INDEX_DIR // FOUNDERS
          </div>
          
          <div className="relative w-full">
            {/* Right edge fade indicator for mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none md:hidden" />
            
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 px-6 md:px-0 no-scrollbar relative z-0">
              {personnel.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(i)}
                  className={`shrink-0 text-left font-mono text-sm md:text-base py-3 md:py-4 px-4 border-b-2 md:border-b-0 md:border-l-2 transition-all duration-300 relative overflow-hidden group whitespace-nowrap md:whitespace-normal ${
                    activeIndex === i 
                      ? "border-white text-black" 
                      : "border-transparent bg-white/10 text-white/50 hover:text-white hover:bg-white/20"
                  }`}
                >
                  {activeIndex === i && (
                    <motion.div 
                      layoutId="activeDossierBg" 
                      className="absolute inset-0 bg-white pointer-events-none" 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="flex justify-between items-center relative z-10 gap-4">
                    <span>[{p.id}] {p.name.toUpperCase()}</span>
                    {activeIndex === i && <span className="text-[10px] tracking-widest animate-pulse hidden md:inline">ACTIVE</span>}
                  </div>
                </button>
              ))}
              {/* Spacer to ensure the last item can be scrolled past the fade */}
              <div className="shrink-0 w-4 md:hidden" aria-hidden="true" />
            </div>
          </div>
          
          <div className="mt-auto pt-12 hidden md:block px-6 md:px-0">
             <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent mb-4" />
             <div className="font-mono text-[8px] text-white/30 tracking-widest">
               SYS.AUTH: VERIFIED<br/>
               ACCESS_LEVEL: MAXIMUM
             </div>
          </div>
        </div>

        {/* Right: Dossier */}
        <div className="w-full md:w-2/3 p-6 md:p-12 relative min-h-[450px] flex flex-col">
          <CornerBrackets size="w-8 h-8" />
          
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, filter: "blur(10px)", x: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full flex flex-col flex-1"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-10 border-b border-white/10 pb-6 gap-6">
              <div>
                <h3 className="text-[2.5rem] md:text-[3.5rem] font-medium leading-none mb-3 text-white">
                  {personnel[activeIndex].name}
                </h3>
                <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 bg-white/10 inline-block px-2 py-1">
                  ROLE // {personnel[activeIndex].role}
                </div>
              </div>
              <div className="text-left md:text-right font-mono text-[10px] text-white/40 flex flex-col items-start md:items-end gap-1">
                <Fingerprint size={32} className="mb-2 text-white/20 hidden md:block" />
                <span className="text-white/60">LOC: {personnel[activeIndex].location.toUpperCase()}</span>
                <span>{personnel[activeIndex].coords}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative">
              {/* Invisible placeholder of the longest text to perfectly lock the height across all screen sizes */}
              <p className="text-[1.125rem] md:text-[1.25rem] leading-relaxed max-w-[50ch] opacity-0 pointer-events-none select-none" aria-hidden="true">
                {personnel[2].desc}
              </p>
              {/* Actual animated text */}
              <p className="text-[1.125rem] md:text-[1.25rem] text-white/70 leading-relaxed max-w-[50ch] absolute top-0 left-0">
                <ScrambleHeading text={personnel[activeIndex].desc} />
              </p>
            </div>

            {/* Footer / Visuals */}
            <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <Barcode className="h-10 opacity-50 hidden md:flex" />
              <div className="font-mono text-[10px] tracking-widest text-emerald-500/70 uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500/70 rounded-full animate-pulse" />
                STATUS: CLEARANCE_GRANTED
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* IDEA 2: DATA RIBBON FOOTER */}
      <div className="w-full border-t border-white/20 bg-white/[0.02] p-4 md:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto opacity-70 hover:opacity-100 transition-opacity">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">ATTACHED_MODULES:</span>
          <div className="flex flex-wrap gap-3">
            {['Brand', 'UI/UX', 'Product', 'Dev', 'Motion', 'Content', 'Growth', 'Automation'].map((skill, i) => (
              <span key={i} className="font-mono text-[10px] uppercase tracking-widest text-white/80">[{skill}]</span>
            ))}
          </div>
        </div>
        <HashLink href="#team" className="flex-shrink-0 inline-flex items-center font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:text-emerald-400 transition-colors duration-300 group/btn">
          ACCESS_FULL_ROSTER <ArrowRight size={12} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </HashLink>
      </div>
    </motion.div>
  );
};

export default function Section08Team() {
  return (
    <section id="team" className="relative scroll-mt-24 px-[5%] py-16 md:py-24 border-y border-white/10">
      <HudLabel className="mb-8">PERSONNEL.FILES // 08</HudLabel>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] font-medium mb-10">
          Founder-led.<br/>
          <span className="text-white/30">Team-backed.</span>
        </h2>
        <div className="max-w-[800px] mb-24">
          <p className="text-[1.25rem] text-white/60 leading-relaxed">
            The founders stay close to the work: creative direction, business architecture, product logic, and technical systems. Around that core is a wider team across brand design, UI/UX, engineering, content, motion, growth, and automation, <span className="text-white border-b border-white/30 pb-1">tesselating</span> around what the build actually needs.
          </p>
        </div>
      </motion.div>

      <PersonnelDossier />
    </section>
  );
}
