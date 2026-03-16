"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { cn } from "@/lib/utils"

interface StudioContentProps {
  isExpanded: boolean
  onExpand: () => void
}

export function StudioContent({ isExpanded, onExpand }: StudioContentProps) {
  return (
    <div 
      className={cn(
        "relative z-10 h-full flex flex-col justify-center transition-all duration-700 ease-in-out",
        // Split State: Centered in the left panel
        !isExpanded && "w-full px-6 lg:px-12 xl:px-20",
        // Expanded State: Right aligned (occupying the right 50% of screen)
        isExpanded && "w-full lg:w-1/2 ml-auto px-6 lg:pl-16 lg:pr-[10%]"
      )}
    >
      {/* PREVIEW HEADER (Visible only in Split View) */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
          isExpanded ? "opacity-0 pointer-events-none" : "opacity-100 delay-300"
        )}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white whitespace-nowrap">
          MOZAIC STUDIO
        </h2>
      </div>

      {/* FULL CONTENT (Visible only in Expanded View) */}
      <div 
        className={cn(
          "max-w-2xl relative transition-all duration-700",
          isExpanded ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8 pointer-events-none"
        )}
      >
        {/* Top decorative line */}
        <div className="flex items-center gap-2 mb-3 opacity-60">
          <div className="w-8 h-px bg-[#00FF00]"></div>
          <span className="text-[#00FF00] text-[10px] font-mono tracking-wider">∞</span>
          <div className="flex-1 h-px bg-white"></div>
        </div>

        {/* Headline */}
        <div className="relative mb-4 lg:mb-6">
          <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] font-mono tracking-wide">
            COMPLETE DIGITAL
            <br />
            SYSTEMS.
          </h1>
        </div>

        {/* Secondary Content */}
        <div className="overflow-hidden">
          {/* Decorative dots pattern */}
          <div className="hidden lg:flex gap-1 mb-4 opacity-40">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-0.5 h-0.5 bg-[#FF0000] rounded-full"></div>
            ))}
          </div>

          <div className="relative mb-6 lg:mb-8">
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed font-mono opacity-90 max-w-xl">
              Creative, development, and infrastructure—integrated. We build complete systems that agencies piece
              together. One team, one vision, faster execution.
            </p>

            {/* Technical corner accent */}
            <div
              className="hidden lg:block absolute -left-4 top-1/2 w-3 h-3 border border-[#00FF00] opacity-30"
              style={{ transform: "translateY(-50%)" }}
            >
              <div
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#00FF00]"
                style={{ transform: "translate(-50%, -50%)" }}
              ></div>
            </div>
          </div>

          {/* Buttons */}
          <ButtonGroup className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                // Already expanded
              }}
              className="relative px-6 py-3 bg-[#FF0000] text-white font-mono text-sm hover:bg-[#FF0000]/90 transition-all duration-200 group rounded-none"
            >
              <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              START A CONVERSATION
            </Button>

            <Button
              variant="outline"
              className="relative px-6 py-3 bg-transparent border border-white text-white font-mono text-sm hover:bg-white hover:text-black transition-all duration-200 rounded-none"
            >
              SEE OUR WORK
            </Button>
          </ButtonGroup>

          {/* Bottom Footer */}
          <div className="hidden lg:flex items-center gap-2 mb-6 opacity-40">
            <span className="text-[#00FF00] text-[9px] font-mono">∞</span>
            <div className="flex-1 h-px bg-white"></div>
            <span className="text-white text-[9px] font-mono">MOZAIC.SYSTEMS</span>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#FF0000]">•</span>
              <span className="text-white/70">3-5X FASTER</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00FF00]">•</span>
              <span className="text-white/70">40% LOWER COST</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">•</span>
              <span className="text-white/70">END-TO-END</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dither-pattern {
          background-image: 
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, white 1px, white 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 2px);
          background-size: 3px 3px;
        }
      `}</style>
    </div>
  )
}
