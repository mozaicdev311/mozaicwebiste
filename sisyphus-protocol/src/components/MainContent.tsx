import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";
import { ArrowRight, Terminal, Activity, Cpu, Database, Network, Fingerprint, Scan, Crosshair as CrosshairIcon } from "lucide-react";

// --- Custom Hooks & Utilities ---
const useScrambleText = (text: string, trigger: boolean = true) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }
    
    let iteration = 0;
    const maxIterations = text.length;
    const speedMultiplier = Math.max(1 / 3, text.length / 80); // Faster reveal for longer texts
    
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
      }
      
      iteration += speedMultiplier; 
    }, 30);
    
    return () => clearInterval(interval);
  }, [text, trigger]);
  
  return displayText;
};

// --- Reusable UI Components ---

const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const ScanlineOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-40 h-full w-full bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20" />
);

const CornerBrackets = ({ size = "w-4 h-4", color = "border-white/40" }) => (
  <>
    <div className={`absolute top-0 left-0 ${size} border-t border-l ${color}`} />
    <div className={`absolute top-0 right-0 ${size} border-t border-r ${color}`} />
    <div className={`absolute bottom-0 left-0 ${size} border-b border-l ${color}`} />
    <div className={`absolute bottom-0 right-0 ${size} border-b border-r ${color}`} />
  </>
);

const Crosshair = ({ className = "" }: { className?: string }) => (
  <div className={`absolute w-4 h-4 sm:w-6 sm:h-6 pointer-events-none z-10 ${className}`}>
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40 -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/40 -translate-x-1/2" />
  </div>
);

const HudLabel = ({ children, className = "", scramble = true }: { children: string, className?: string, scramble?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const text = useScrambleText(children, scramble && isInView);
  
  return (
    <div ref={ref} className={`font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 flex items-center gap-3 ${className}`}>
      <div className="w-1.5 h-1.5 bg-white/50 animate-pulse" />
      {text}
    </div>
  );
};

const ScrambleHeading = ({ text, className = "" }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const scrambled = useScrambleText(text, isInView);
  
  return <span ref={ref} className={className}>{scrambled}</span>;
}

const Barcode = ({ className = "" }: { className?: string }) => (
  <div className={`flex gap-[2px] h-8 opacity-30 ${className}`}>
    {[...Array(20)].map((_, i) => (
      <div key={i} className="bg-white h-full" style={{ width: `${Math.random() * 4 + 1}px` }} />
    ))}
  </div>
);

const DataBar = ({ label, value }: { label: string, value: number }) => (
  <div className="mb-3">
    <div className="flex justify-between font-mono text-[9px] text-white/40 mb-1 uppercase tracking-widest">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-0 h-full bg-white/60" 
      />
    </div>
  </div>
);

// --- Abstract SVGs ---
const RotatingWireframe = () => (
  <motion.div 
    animate={{ rotateZ: 360, rotateX: 360, rotateY: 360 }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    className="absolute right-[-20%] md:right-[-10%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-[0.03] pointer-events-none"
  >
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" />
      <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="white" strokeWidth="0.5" transform="rotate(45 50 50)" />
      <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="white" strokeWidth="0.5" transform="rotate(-45 50 50)" />
      <path d="M 5 50 L 95 50 M 50 5 L 50 95" stroke="white" strokeWidth="0.5" strokeDasharray="1 2" />
    </svg>
  </motion.div>
);

const WaveformGraph = () => (
  <svg viewBox="0 0 200 80" className="w-full h-20 opacity-50 mb-8 overflow-visible">
    {/* Background Grid */}
    <pattern id="grid1" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
    </pattern>
    <rect width="200" height="80" fill="url(#grid1)" />
    
    {/* Center Line */}
    <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
    
    {/* Animated Sine Waves */}
    <motion.path 
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      d="M 0 40 Q 25 10, 50 40 T 100 40 T 150 40 T 200 40" 
      fill="none" stroke="white" strokeWidth="1.5" 
    />
    <motion.path 
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.5 }}
      transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
      d="M 0 40 Q 35 70, 70 40 T 140 40 T 200 40" 
      fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 2"
    />
    
    {/* Scanning line */}
    <motion.line
      initial={{ x1: 0, x2: 0, opacity: 0 }}
      animate={{ x1: 200, x2: 200, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      y1="0" y2="80" stroke="rgba(255,255,255,0.5)" strokeWidth="1"
    />
  </svg>
);

const SystemScanGraph = () => {
  const blocks = Array.from({ length: 15 });
  return (
    <svg viewBox="0 0 200 80" className="w-full h-20 opacity-50 mb-8 overflow-visible">
      {/* Background Grid */}
      <pattern id="grid2" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      </pattern>
      <rect width="200" height="80" fill="url(#grid2)" />
      
      {/* Side Data Streams */}
      <g transform="translate(0, 40)">
        <line x1="0" y1="-10" x2="40" y2="-10" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="0" y1="0" x2="50" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="10" x2="40" y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        
        <line x1="160" y1="-10" x2="200" y2="-10" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="150" y1="0" x2="200" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="160" y1="10" x2="200" y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Moving data bits */}
        <motion.circle animate={{ cx: [0, 50] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} cy="0" r="1.5" fill="white" />
        <motion.circle animate={{ cx: [200, 150] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.7 }} cy="0" r="1.5" fill="white" />
      </g>

      {/* Central Processing Unit / Scrutiny Matrix */}
      <g transform="translate(65, 20)">
        {/* Frame */}
        <rect x="-5" y="-5" width="80" height="50" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        
        {/* Corner Accents */}
        <path d="M -5 3 L -5 -5 L 3 -5" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M 67 -5 L 75 -5 L 75 3" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M 75 37 L 75 45 L 67 45" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M 3 45 L -5 45 L -5 37" fill="none" stroke="white" strokeWidth="1.5" />

        {/* Memory Blocks */}
        {blocks.map((_, i) => {
          const row = Math.floor(i / 5);
          const col = i % 5;
          return (
            <motion.rect
              key={i}
              x={col * 14 + 2}
              y={row * 13 + 2}
              width="10"
              height="9"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
              animate={{
                fill: ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.05)"],
                stroke: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.1)"]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: (col * 0.1) + (row * 0.2) + Math.random() * 0.5
              }}
            />
          );
        })}

        {/* Sweeping Scanner Line */}
        <motion.line
          animate={{ x1: [-5, 75, -5], x2: [-5, 75, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          y1="-5" y2="45" stroke="rgba(255,255,255,0.9)" strokeWidth="1"
        />
        {/* Scanner Glow */}
        <motion.rect
          animate={{ x: [-5, 75, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          y="-5" width="2" height="50" fill="rgba(255,255,255,0.3)"
          style={{ filter: "blur(2px)" }}
        />
      </g>
    </svg>
  );
};

const NodeGraph = () => {
  const nodes = [
    {x: 20, y: 40}, {x: 60, y: 20}, {x: 100, y: 60}, 
    {x: 140, y: 30}, {x: 180, y: 50}, {x: 100, y: 25}, {x: 140, y: 60}
  ];
  return (
    <svg viewBox="0 0 200 80" className="w-full h-20 opacity-50 mb-8 overflow-visible">
      {/* Background Grid */}
      <pattern id="grid3" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      </pattern>
      <rect width="200" height="80" fill="url(#grid3)" />
      
      {/* Connections */}
      <motion.path 
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        d="M 20 40 L 60 20 L 100 60 L 140 30 L 180 50 M 60 20 L 100 25 L 140 60 M 100 60 L 140 60 M 20 40 L 100 25" 
        fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" 
      />
      
      {/* Data Pulses */}
      <motion.path
        animate={{ strokeDashoffset: [200, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        d="M 20 40 L 60 20 L 100 60 L 140 30 L 180 50" 
        fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="10 190"
      />
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={i}>
          <motion.circle 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            cx={node.x} cy={node.y} r="2.5" fill="white" 
          />
          <motion.circle 
            animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            cx={node.x} cy={node.y} r="2.5" fill="none" stroke="white" strokeWidth="0.5"
          />
        </g>
      ))}
    </svg>
  );
};

// --- Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const StorytellingBridge = ({ label }: { label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const scrambledText = useScrambleText(label, isInView);

  return (
    <div ref={ref} className="flex justify-center items-center h-24 md:h-32 relative z-20 my-4 md:my-8 group">
      {/* Vertical Line */}
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-[1px] h-full bg-gradient-to-b from-white/0 via-white/30 to-white/0 origin-top relative"
      >
        {/* Data Packet */}
        <motion.div
          animate={{ top: ["-10%", "110%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
          className="absolute left-1/2 -translate-x-1/2 w-[2px] h-6 bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]"
        />
      </motion.div>
      
      {/* Center Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
        animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(4px)" }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="absolute top-1/2 -translate-y-1/2 bg-black border border-white/20 flex items-center overflow-visible"
      >
        {/* Horizontal Ticks */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-4 h-[1px] bg-white/20" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-4 h-[1px] bg-white/20" />
        
        <div className="px-4 py-2 flex items-center gap-3 whitespace-nowrap relative z-10">
          <CornerBrackets size="w-1.5 h-1.5" color="border-white/40" />
          <div className="w-1.5 h-1.5 bg-white/70 animate-pulse" />
          <span className="font-mono text-[10px] text-white/70 tracking-[0.2em] uppercase">
            [ {scrambledText} ]
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const InteractiveCard = React.forwardRef(({ children, className = "", variants, ...props }: any, forwardedRef) => {
  return (
    <motion.div 
      ref={forwardedRef}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});
InteractiveCard.displayName = "InteractiveCard";

const TerminalServices = () => {
  const services = [
    { id: "01", title: "Launch the brand and the product together.", desc: "Not two parallel tracks stitched together at the end. One team shaping identity, experience, and architecture from the same brief." },
    { id: "02", title: "Ship software that can carry the business.", desc: "Websites, platforms, marketplaces, SaaS, and internal tools built for real use, not just launch day." },
    { id: "03", title: "Connect growth to product through intelligent systems.", desc: "Automation, acquisition, and implementation owned by the same team. No translation layer between strategy, code, and performance." },
    { id: "04", title: "Decide what to build before the budget moves.", desc: "Roadmaps, sequencing, scope, and architecture grounded in what can actually ship." }
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
          <motion.div key={i} variants={terminalLine} className="flex flex-col gap-1 mb-2">
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

const SprintGraph = ({ isHovered }: { isHovered: boolean }) => {
  const duration = isHovered ? 1.5 : 3;
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <clipPath id="sprintClip">
          <rect x="0" y="0" width="200" height="80" />
        </clipPath>
      </defs>
      <g clipPath="url(#sprintClip)">
        {/* Grid */}
        <pattern id="sprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
        <rect width="200" height="80" fill="url(#sprintGrid)" />

        {/* Timeline Base */}
        <line x1="20" y1="40" x2="180" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        
        {/* Milestones */}
        <rect x="50" y="38" width="4" height="4" fill="white" />
        <rect x="100" y="38" width="4" height="4" fill="white" />
        <rect x="150" y="38" width="4" height="4" fill="white" />

        {/* Playhead */}
        <motion.g
          animate={{ x: [20, 180, 20] }}
          transition={{ duration: duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1="0" y1="20" x2="0" y2="60" stroke="white" strokeWidth="1" />
          <polygon points="-3,20 3,20 0,25" fill="white" />
          <polygon points="-3,60 3,60 0,55" fill="white" />
        </motion.g>

        {/* Data Bars that grow as playhead moves */}
        <motion.rect x="50" y="25" width="30" fill="rgba(255,255,255,0.2)"
          animate={{ height: [0, 10, 0] }}
          transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
        />
        <motion.rect x="100" y="45" width="40" fill="rgba(255,255,255,0.2)"
          animate={{ height: [0, 15, 0] }}
          transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1], delay: 0.2 }}
        />
      </g>
    </svg>
  );
};

const BuildGraph = ({ isHovered }: { isHovered: boolean }) => {
  const duration = isHovered ? 2 : 4;
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <clipPath id="buildClip">
          <rect x="0" y="0" width="200" height="80" />
        </clipPath>
      </defs>
      <g clipPath="url(#buildClip)">
        {/* Base Platform */}
        <line x1="30" y1="65" x2="170" y2="65" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <line x1="40" y1="70" x2="160" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

        {/* Wireframe Structure */}
        <path d="M 50 65 L 50 25 L 150 25 L 150 65" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M 80 65 L 80 40 L 120 40 L 120 65" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />

        {/* Solid Build-up */}
        <motion.rect x="50" y="25" width="100" fill="rgba(255,255,255,0.1)"
          animate={{ height: [0, 40, 40, 0], y: [65, 25, 25, 65] }}
          transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
        />
        <motion.rect x="80" y="40" width="40" fill="rgba(255,255,255,0.3)"
          animate={{ height: [0, 25, 25, 0], y: [65, 40, 40, 65] }}
          transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.8, 1], delay: 0.2 }}
        />

        {/* Scanning Laser */}
        <motion.line x1="40" x2="160" stroke="white" strokeWidth="1"
          animate={{ y1: [65, 20, 65], y2: [65, 20, 65], opacity: [0, 1, 0] }}
          transition={{ duration: duration, repeat: Infinity, ease: "easeInOut" }}
        />
      </g>
    </svg>
  );
};

const PartnerGraph = ({ isHovered }: { isHovered: boolean }) => {
  const duration = isHovered ? 1.5 : 3;
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <clipPath id="partnerClip">
          <rect x="0" y="0" width="200" height="80" />
        </clipPath>
      </defs>
      <g clipPath="url(#partnerClip)">
        {/* Left Entity (Client) */}
        <rect x="20" y="20" width="40" height="40" rx="4" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <circle cx="40" cy="40" r="8" fill="rgba(255,255,255,0.1)" />
        
        {/* Right Entity (Mozaic) */}
        <rect x="140" y="20" width="40" height="40" rx="4" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <circle cx="160" cy="40" r="8" fill="rgba(255,255,255,0.1)" />

        {/* Connection Lines */}
        <line x1="60" y1="30" x2="140" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="60" y1="50" x2="140" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Data Packets Syncing */}
        <motion.circle r="2" fill="white"
          animate={{ cx: [60, 140], opacity: [0, 1, 0] }}
          transition={{ duration: duration * 0.5, repeat: Infinity, ease: "linear" }}
          cy="30"
        />
        <motion.circle r="2" fill="white"
          animate={{ cx: [140, 60], opacity: [0, 1, 0] }}
          transition={{ duration: duration * 0.5, repeat: Infinity, ease: "linear", delay: duration * 0.25 }}
          cy="50"
        />

        {/* Pulse Rings */}
        <motion.circle cx="40" cy="40" fill="none" stroke="white" strokeWidth="1"
          animate={{ r: [8, 20], opacity: [0.5, 0] }}
          transition={{ duration: duration, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle cx="160" cy="40" fill="none" stroke="white" strokeWidth="1"
          animate={{ r: [8, 20], opacity: [0.5, 0] }}
          transition={{ duration: duration, repeat: Infinity, ease: "easeOut", delay: duration * 0.5 }}
        />
      </g>
    </svg>
  );
};

const ProtocolRow = ({ index, mode, title, desc, GraphComponent }: any) => {
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
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-3">
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
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/20 p-6 md:p-8 flex flex-col bg-white/[0.02]">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-2">
            <div className="w-2 h-2 bg-white/40 animate-pulse" />
            INDEX_DIR // FOUNDERS
          </div>
          <div className="flex flex-col gap-2">
            {personnel.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(i)}
                className={`text-left font-mono text-sm md:text-base py-4 px-4 border-l-2 transition-all duration-300 relative overflow-hidden group ${
                  activeIndex === i 
                    ? "border-white bg-white/10 text-white" 
                    : "border-transparent text-white/50 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {activeIndex === i && (
                  <motion.div 
                    layoutId="activeDossierBg" 
                    className="absolute inset-0 bg-white/5 pointer-events-none" 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="flex justify-between items-center relative z-10">
                  <span>[{p.id}] {p.name.toUpperCase()}</span>
                  {activeIndex === i && <span className="text-[10px] tracking-widest animate-pulse">ACTIVE</span>}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-auto pt-12">
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
                <Fingerprint size={32} className="mb-2 text-white/20" />
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
            <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-end">
              <Barcode className="h-10 opacity-50" />
              <div className="font-mono text-[10px] tracking-widest text-emerald-500/70 uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500/70 rounded-full animate-pulse" />
                STATUS: CLEARANCE_GRANTED
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* IDEA 2: DATA RIBBON FOOTER */}
      <div className="w-full border-t border-white/20 bg-white/[0.02] p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
        <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto opacity-70 hover:opacity-100 transition-opacity no-scrollbar">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">ATTACHED_MODULES:</span>
          <div className="flex gap-3">
            {['Brand', 'UI/UX', 'Product', 'Dev', 'Motion', 'Content', 'Growth', 'Automation'].map((skill, i) => (
              <span key={i} className="font-mono text-[10px] uppercase tracking-widest text-white/80 whitespace-nowrap">[{skill}]</span>
            ))}
          </div>
        </div>
        <a href="#" className="flex-shrink-0 inline-flex items-center font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:text-emerald-400 transition-colors duration-300 group/btn">
          ACCESS_FULL_ROSTER <ArrowRight size={12} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export default function MainContent() {
  return (
    <div className="bg-black text-white font-sans antialiased selection:bg-white selection:text-black relative">
      <style dangerouslySetInnerHTML={{__html: `
        .glitch-hover:hover {
          animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          color: #fff;
          text-shadow: 2px 0px #ff0000, -2px 0px #00ffff;
        }
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(-10deg); }
          40% { transform: skew(10deg); }
          60% { transform: skew(-5deg); }
          80% { transform: skew(5deg); }
          100% { transform: skew(0deg); }
        }
        .laser-scan {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.8);
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
          opacity: 0;
          transform: translateY(-100%);
        }
        .group:hover .laser-scan,
        .group[data-active="true"] .laser-scan {
          animation: scan 2s linear infinite;
          opacity: 1;
        }
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(400px); }
        }
      `}} />
      
      <NoiseOverlay />
      <ScanlineOverlay />
      
      {/* STORYTELLING BRIDGE 01 -> 02 */}
      <StorytellingBridge label="SYSTEM.INIT" />

      {/* 02 · THE PROBLEM */}
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
          className="max-w-[1000px] relative z-10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-16 gap-4">
            <HudLabel className="text-white/40">SYS.DIAGNOSTIC // 02</HudLabel>
            <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 animate-pulse" />
              STATUS: CRITICAL_FRAGMENTATION
            </div>
          </div>
          
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.04em] font-medium mb-16 text-white selection:bg-white selection:text-black">
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
              <div className="text-[1.125rem] md:text-[1.25rem] text-white/50 font-mono tracking-tight flex flex-wrap items-center gap-3 selection:bg-white selection:text-black bg-white/[0.02] border border-white/10 p-4 md:p-6 inline-flex">
                <span className="text-emerald-500">&gt;</span> 
                <span>One operating team. One brief. No translation layer.</span>
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} 
                  className="inline-block w-3 h-5 bg-white/70 align-middle" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STORYTELLING BRIDGE 02 -> 03 */}
      <StorytellingBridge label="LOAD.ARCHIVE" />

      {/* 03 · THE WORK PREDATES THE NAME */}
      <section className="relative px-[5%] py-16 md:py-24 border-y border-white/10">
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
              Security-first engineering shaped in high-stakes environments. Our tech lead's baseline is fintech. Reliability and compliance that do not disappear because the project happens to be a website. That is the technical floor.
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

      {/* STORYTELLING BRIDGE 03 -> 04 */}
      <StorytellingBridge label="VERIFY.EVIDENCE" />

      {/* 04 · PROOF */}
      <section className="relative px-[5%] py-16 md:py-24 border-y border-white/10">
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
              <InteractiveCard key={i} variants={fadeUp} className="group border-b border-white/20 py-12 relative overflow-hidden hover:bg-white data-[active=true]:bg-white hover:text-black data-[active=true]:text-black transition-all duration-500 px-4 md:px-8 -mx-4 md:-mx-8 cursor-crosshair">
                <div className="absolute left-0 top-0 h-full w-1 bg-white scale-y-0 group-hover:scale-y-100 group-data-[active=true]:scale-y-100 transition-transform origin-top duration-300" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-black/50 group-data-[active=true]:text-black/50 transition-colors">
                    {item.label}
                  </div>
                  <div className="font-mono text-[10px] tracking-widest opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity text-black/40">
                    [ VERIFIED ]
                  </div>
                </div>
                
                <div className="text-[2rem] font-medium mb-6 group-hover:translate-x-4 group-data-[active=true]:translate-x-4 transition-transform duration-500 flex items-center gap-4">
                  {item.title}
                </div>
                
                <p className="text-[1.125rem] text-white/60 group-hover:text-black/80 group-data-[active=true]:text-black/80 transition-colors mb-0 leading-relaxed max-w-[60ch]">
                  {item.desc}
                </p>
              </InteractiveCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STORYTELLING BRIDGE 04 -> 05 */}
      <StorytellingBridge label="SELECT.PATH" />

      {/* 05 · TWO FRONT DOORS */}
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
          <InteractiveCard variants={fadeUp} className="p-8 md:p-16 border border-white/20 flex flex-col h-full hover:bg-white data-[active=true]:bg-white hover:text-black data-[active=true]:text-black transition-all duration-500 group cursor-pointer relative overflow-hidden">
            <CornerBrackets size="w-8 h-8" />
            <div className="absolute -right-10 -top-10 text-[150px] font-mono font-bold text-white/[0.03] group-hover:text-black/[0.05] group-data-[active=true]:text-black/[0.05] transition-colors pointer-events-none">01</div>
            
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-black/50 group-data-[active=true]:text-black/50 mb-16 transition-colors">Studio</div>
            <h3 className="text-[2rem] font-medium mb-6 leading-tight">Identity, campaigns, film, content, and brand systems with real signal.</h3>
            <p className="text-[1.125rem] text-white/50 group-hover:text-black/70 group-data-[active=true]:text-black/70 transition-colors mb-0">Creative direction at global brand level, inside a studio that ships what it designs.</p>
            <div className="mt-20 pt-8 border-t border-white/10 group-hover:border-black/10 group-data-[active=true]:border-black/10 font-mono text-[10px] tracking-[0.2em] flex items-center gap-3 uppercase">
              [ INITIATE_SEQUENCE ] <ArrowRight size={14} className="group-hover:translate-x-2 group-data-[active=true]:translate-x-2 transition-transform duration-300" />
            </div>
          </InteractiveCard>
          
          <InteractiveCard variants={fadeUp} className="p-8 md:p-16 border border-white/20 flex flex-col h-full hover:bg-white data-[active=true]:bg-white hover:text-black data-[active=true]:text-black transition-all duration-500 group cursor-pointer relative overflow-hidden">
            <CornerBrackets size="w-8 h-8" />
            <div className="absolute -right-10 -top-10 text-[150px] font-mono font-bold text-white/[0.03] group-hover:text-black/[0.05] group-data-[active=true]:text-black/[0.05] transition-colors pointer-events-none">02</div>
            
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-black/50 group-data-[active=true]:text-black/50 mb-16 transition-colors">Product & Systems</div>
            <h3 className="text-[2rem] font-medium mb-6 leading-tight">Websites, software, platforms, automation, and intelligent systems built for real-world use.</h3>
            <p className="text-[1.125rem] text-white/50 group-hover:text-black/70 group-data-[active=true]:text-black/70 transition-colors mb-0">Engineering standards shaped in fintech, inside a studio that understands brand from day one.</p>
            <div className="mt-20 pt-8 border-t border-white/10 group-hover:border-black/10 group-data-[active=true]:border-black/10 font-mono text-[10px] tracking-[0.2em] flex items-center gap-3 uppercase">
              [ INITIATE_SEQUENCE ] <ArrowRight size={14} className="group-hover:translate-x-2 group-data-[active=true]:translate-x-2 transition-transform duration-300" />
            </div>
          </InteractiveCard>
        </motion.div>
      </section>

      {/* STORYTELLING BRIDGE 05 -> 06 */}
      <StorytellingBridge label="DEFINE.OUTPUT" />

      {/* 06 · WHAT WE HELP YOU SHAPE */}
      <section className="relative px-[5%] py-16 md:py-24 border-y border-white/10">
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

      {/* STORYTELLING BRIDGE 06 -> 07 */}
      <StorytellingBridge label="EXECUTION.MODELS" />

      {/* 07 · WAYS TO WORK */}
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
          <ProtocolRow 
            index="01"
            mode="[ MODE: BURST_EXECUTION ]"
            title="Sprint"
            desc="The sharpest place to start. Strategy, audits, landing pages, product scoping, automation planning, and early system direction."
            GraphComponent={SprintGraph}
          />
          <ProtocolRow 
            index="02"
            mode="[ MODE: SYSTEM_COMPILE ]"
            title="Build"
            desc="End-to-end delivery across brand, websites, products, platforms, and intelligent systems."
            GraphComponent={BuildGraph}
          />
          <ProtocolRow 
            index="03"
            mode="[ MODE: CONTINUOUS_SYNC ]"
            title="Partner"
            desc="Ongoing creative, technical, product, and strategic support for teams that need a senior layer close to the work."
            GraphComponent={PartnerGraph}
          />
        </motion.div>
      </section>

      {/* STORYTELLING BRIDGE 07 -> 08 */}
      <StorytellingBridge label="ACCESS.ROSTER" />

      {/* 08 · FOUNDERS & TEAM */}
      <section className="relative px-[5%] py-16 md:py-24 border-y border-white/10">
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

      {/* STORYTELLING BRIDGE 08 -> 09 */}
      <StorytellingBridge label="INITIATE.CONTACT" />

      {/* 09 · FINAL CTA */}
      <section className="relative px-[5%] py-32 md:py-48 flex flex-col items-center justify-center border-y border-white/10 overflow-hidden bg-black">
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
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] font-medium text-white min-h-[2.2em] md:min-h-0">
                <ScrambleHeading text="Tell us what you're building." />
              </h2>
            </div>
            
            <div className="flex gap-4 items-start">
              <span className="text-white/40 font-mono mt-1">&gt;</span>
              <p className="text-white/60 text-[1.125rem] md:text-[1.25rem] max-w-[45ch] leading-relaxed">
                Stage, constraints, timeline, and what is at stake. We'll tell you where to start. And what not to build yet.
              </p>
            </div>

            <div className="flex gap-4 items-start md:items-center pt-8">
              <span className="text-white/40 font-mono mt-4 md:mt-0">&gt;</span>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 w-full">
                <a href="#" className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-[10px] md:text-[12px] uppercase tracking-[0.2em] bg-white text-black overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    INITIATE_PROTOCOL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-black/10"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                  />
                </a>
                <a href="#" className="inline-flex items-center justify-center px-8 py-4 font-mono text-[10px] md:text-[12px] uppercase tracking-[0.2em] border border-white/30 text-white hover:border-white transition-colors duration-300">
                  VIEW_LOGS
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="px-[5%] py-20 bg-black relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 font-mono text-[10px] tracking-[0.1em] uppercase">
          <div>
            <div className="font-sans font-semibold text-[1.5rem] tracking-[0.2em] text-white mb-6">MOZAIC</div>
            <p className="text-white/40 mb-0">&copy; 2026 MOZAIC // SYS.ONLINE</p>
          </div>
          <div className="flex flex-col gap-4 text-white/50">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Work</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Services</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> About</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Contact</a>
          </div>
          <div className="flex flex-col gap-4 text-white/50">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Studio</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Product & Systems</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Growth</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> AI & Automation</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Strategy</a>
          </div>
          <div className="text-white/50">
            <div className="flex items-center gap-2 mb-4"><div className="w-1.5 h-1.5 bg-white/30" /> Barcelona</div>
            <div className="flex items-center gap-2 mb-4"><div className="w-1.5 h-1.5 bg-white/30" /> Paris</div>
            <div className="flex items-center gap-2 mb-10"><div className="w-1.5 h-1.5 bg-white/30" /> Montreal</div>
            <p className="mb-0 text-white/80 border border-white/20 inline-block px-3 py-1">EN · FR · ES · AR</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
