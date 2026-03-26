import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

// --- Custom Hooks & Utilities ---
export const useScrambleText = (text: string, trigger: boolean = true) => {
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

const BARCODE_WIDTHS = [4.6, 3.1, 3.2, 3.0, 3.9, 3.9, 2.3, 2.4, 2.1, 1.7, 3.3, 1.1, 5.0, 4.9, 1.8, 1.2, 2.0, 3.9, 1.3, 2.7];

// --- Reusable UI Components ---

export const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

export const ScanlineOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-40 h-full w-full bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20" />
);

export const CornerBrackets = ({ size = "w-4 h-4", color = "border-white/40" }) => (
  <>
    <div className={`absolute top-0 left-0 ${size} border-t border-l ${color}`} />
    <div className={`absolute top-0 right-0 ${size} border-t border-r ${color}`} />
    <div className={`absolute bottom-0 left-0 ${size} border-b border-l ${color}`} />
    <div className={`absolute bottom-0 right-0 ${size} border-b border-r ${color}`} />
  </>
);

export const Crosshair = ({ className = "" }: { className?: string }) => (
  <div className={`absolute w-4 h-4 sm:w-6 sm:h-6 pointer-events-none z-10 ${className}`}>
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40 -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/40 -translate-x-1/2" />
  </div>
);

export const HudLabel = ({ children, className = "", scramble = true }: { children: string, className?: string, scramble?: boolean }) => {
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

export const ScrambleHeading = ({ text, className = "" }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const scrambled = useScrambleText(text, isInView);
  
  return <span ref={ref} className={className}>{scrambled}</span>;
}

export const Barcode = ({ className = "" }: { className?: string }) => (
  <div className={`flex gap-[2px] h-8 opacity-30 ${className}`}>
    {BARCODE_WIDTHS.map((width, i) => (
      <div key={i} className="bg-white h-full" style={{ width: `${width}px` }} />
    ))}
  </div>
);

export const DataBar = ({ label, value }: { label: string, value: number }) => (
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

// --- Animations ---
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export const StorytellingBridge = ({ label }: { label: string }) => {
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

export const InteractiveCard = React.forwardRef(({ children, className = "", variants, ...props }: any, forwardedRef) => {
  const localRef = useRef(null);
  const ref = forwardedRef || localRef;
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  return (
    <motion.div 
      ref={ref}
      variants={variants}
      className={className}
      data-active={isInView}
      {...props}
    >
      {children}
    </motion.div>
  );
});
InteractiveCard.displayName = "InteractiveCard";
