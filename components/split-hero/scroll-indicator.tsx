"use client"

import { forwardRef } from "react"

export const ScrollIndicator = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute bottom-[60px] left-1/2 -translate-x-1/2 z-35 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span className="text-white/35 font-mono text-[10px] tracking-[0.2em] whitespace-nowrap">
        <span className="inline-block animate-bounce mr-1">↓</span>
        SCROLL TO SYNTHESIZE
      </span>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
})

ScrollIndicator.displayName = "ScrollIndicator"
