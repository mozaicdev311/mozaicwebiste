"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TechContentProps {
  isExpanded: boolean
  onExpand: () => void
}

export function TechContent({ isExpanded, onExpand }: TechContentProps) {
  return (
    <div 
      className={cn(
        "relative z-10 h-full flex flex-col justify-center transition-all duration-700 ease-in-out",
        // Split State: Centered in the right panel
        !isExpanded && "w-full px-6 lg:px-12 xl:px-20",
        // Expanded State: Left aligned (occupying the left side with 10% margin)
        isExpanded && "w-full lg:pl-[10%] px-6"
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
          MOZAIC TECH
        </h2>
      </div>

      {/* FULL CONTENT (Visible only in Expanded View) */}
      <div 
        className={cn(
          "max-w-lg relative transition-all duration-700",
          isExpanded ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8 pointer-events-none"
        )}
      >
        {/* Top decorative line */}
        <div className="flex items-center gap-2 mb-3 opacity-60">
          <div className="w-8 h-px bg-white"></div>
          <span className="text-white text-[10px] font-mono tracking-wider">001</span>
          <div className="flex-1 h-px bg-white"></div>
        </div>

        {/* Title */}
        <div className="relative">
          <div className="hidden lg:block absolute -left-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 lg:mb-4 leading-tight font-mono tracking-wider" style={{ letterSpacing: '0.1em' }}>
            PERFECT
            <span className="block text-white mt-1 lg:mt-2 opacity-90">
              PROPORTIONS
            </span>
          </h1>
        </div>

        {/* Secondary Content */}
        <div className="overflow-hidden">
          {/* Decorative dots pattern */}
          <div className="hidden lg:flex gap-1 mb-3 opacity-40">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-0.5 h-0.5 bg-white rounded-full"></div>
            ))}
          </div>

          {/* Description */}
          <div className="relative">
            <p className="text-xs lg:text-base text-gray-300 mb-5 lg:mb-6 leading-relaxed font-mono opacity-80">
              Where geometry meets humanity — Da Vinci's vision of ideal form
            </p>
            
            {/* Technical corner accent */}
            <div className="hidden lg:block absolute -right-4 top-1/2 w-3 h-3 border border-white opacity-30" style={{ transform: 'translateY(-50%)' }}>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white" style={{ transform: 'translate(-50%, -50%)' }}></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                // Already expanded
              }}
              className="relative px-5 lg:px-6 py-6 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 group rounded-none h-auto"
            >
              <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
              GET STARTED
            </Button>
            
            <Button 
              variant="ghost"
              className="relative px-5 lg:px-6 py-6 bg-transparent border border-white text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200 rounded-none h-auto"
            >
              LEARN MORE
            </Button>
          </div>

          {/* Bottom technical notation */}
          <div className="hidden lg:flex items-center gap-2 mt-6 opacity-40">
            <span className="text-white text-[9px] font-mono">∞</span>
            <div className="flex-1 h-px bg-white"></div>
            <span className="text-white text-[9px] font-mono">VITRUVIAN</span>
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
