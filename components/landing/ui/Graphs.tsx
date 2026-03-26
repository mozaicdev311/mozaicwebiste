import React from "react";
import { motion } from "motion/react";

export const RotatingWireframe = () => (
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

export const WaveformGraph = () => (
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

export const SystemScanGraph = () => {
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

export const NodeGraph = () => {
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

export const SprintGraph = ({ isHovered }: { isHovered: boolean }) => {
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

export const BuildGraph = ({ isHovered }: { isHovered: boolean }) => {
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

export const PartnerGraph = ({ isHovered }: { isHovered: boolean }) => {
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
