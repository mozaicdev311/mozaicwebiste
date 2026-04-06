"use client"

import { cn } from "@/lib/utils"

interface HeroPanelContentProps {
  side: "left" | "right"
  marker: string
  title: string
  description: string
  subDescription: string
}

export function HeroPanelContent({
  side,
  marker,
  title,
  description,
  subDescription,
}: HeroPanelContentProps) {
  const isLeft = side === "left"

  return (
    <div
      className={cn(
        "absolute top-1/2 -translate-y-1/2 w-[80vw] lg:w-[45vw] z-50 px-6 lg:px-0 pointer-events-none",
        isLeft ? "right-1/2 text-right pr-6 lg:pr-[4vw]" : "left-1/2 text-left pl-6 lg:pl-[4vw]"
      )}
    >
      {/* Section Marker */}
      <div
        className={cn(
          "flex items-center gap-4 mb-4",
          isLeft ? "justify-end" : "justify-start"
        )}
      >
        {!isLeft && <div className="w-12 h-px border-t border-white/50"></div>}
        <span className="text-white/50 text-[12px] lg:text-[14px] font-mono tracking-[0.2em]">
          {marker}
        </span>
        {isLeft && <div className="w-12 h-px border-t border-white/50"></div>}
      </div>

      {/* Title */}
      <h2
        className="text-white text-[36px] lg:text-[56px] font-medium leading-[1.1] mb-6 tracking-tight"
        style={{ fontFamily: "sans-serif" }}
      >
        {title}
      </h2>

      {/* Hover Descriptions (Controlled by GSAP) */}
      <div className="relative h-40 overflow-visible mt-6">
        <div
          className={cn(
            "panel-desc absolute top-0 w-full opacity-0 translate-y-4",
            isLeft ? "right-0" : "left-0"
          )}
        >
          <p className="text-white/80 text-[16px] lg:text-[20px] font-medium leading-[1.5] mb-3">
            {description}
          </p>
          <p
            className={cn(
              "text-white/50 text-[14px] lg:text-[16px] font-mono leading-[1.6] max-w-[380px]",
              isLeft && "ml-auto"
            )}
          >
            {subDescription}
          </p>
        </div>
      </div>
    </div>
  )
}
