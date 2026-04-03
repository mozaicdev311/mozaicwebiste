"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const BOOT_MESSAGES = [
  "[SYS.BOOT] INITIATING CORE...",
  "[MOUNTING_DOM] ESTABLISHING NODE TREE...",
  "[GSAP_SYNC] ALIGNING TIMELINES...",
  "[ALLOCATING_MEMORY] VRAM CACHE OK...",
  "[WebGL] SHADER COMPILATION SUCCESS...",
  "[SECURITY] OVERRIDING PROTOCOLS...",
  "[MATRIX] DECRYPTING ENCODING...",
  "[SYS.READY] AWAITING HANDOFF..."
];

export function BootSequence({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden";
    
    let currentProgress = 0;
    
    // Message interval
    const msgInterval = setInterval(() => {
      const randomMsg = BOOT_MESSAGES[Math.floor(Math.random() * BOOT_MESSAGES.length)];
      setMessages(prev => [...prev.slice(-4), randomMsg]);
    }, 150);

    // Progress interval with the 80% stall
    const progressInterval = setInterval(() => {
      if (currentProgress < 80) {
        currentProgress += Math.random() * 15;
      } else if (currentProgress >= 80 && currentProgress < 85) {
        // Stall and jitter at 80%
        currentProgress += Math.random() * 0.5;
      } else {
        // Snap to 100%
        currentProgress = 100;
      }
      
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        clearInterval(msgInterval);
        setProgress(100);
        
        // Trigger hand-off sequence
        setTimeout(() => {
          setShowFlash(true);
          setTimeout(() => {
            setIsBooting(false);
            document.body.style.overflow = "";
            if (onComplete) onComplete();
          }, 300); // Flash duration
        }, 400); // Hold at 100% briefly
      } else {
        setProgress(currentProgress);
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden pointer-events-auto"
        >
          {/* Main MOZAIC Logo */}
          <motion.div
            animate={progress === 100 ? { scale: 3, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "circIn" }}
            className="mb-8"
          >
            <Image 
              src="/images/mozaic-logo.jpg" 
              alt="MOZAIC" 
              width={320} 
              height={100}
              className="w-auto h-20 object-contain invert mix-blend-screen"
            />
          </motion.div>

          {/* Loading Bar Container */}
          <div className="w-64 max-w-[80vw] space-y-4">
            <div className="h-[2px] w-full bg-zinc-900 relative overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
              />
            </div>

            {/* Terminal Output */}
            <div className="h-24 font-mono text-[10px] sm:text-xs text-zinc-500 flex flex-col justify-end">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="truncate"
                >
                  {msg}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CRT Flash Overlay */}
          {showFlash && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 0] }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none z-50"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
