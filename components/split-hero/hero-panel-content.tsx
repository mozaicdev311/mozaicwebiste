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
        "absolute bottom-[20%] w-full pointer-events-none px-6 lg:px-12",
        isLeft ? "left-0 text-left lg:pl-[10%]" : "right-0 text-right lg:pr-[10%]"
      )}
    >
      {/* Section Marker */}
      <div
        className={cn(
          "flex items-center gap-3 mb-3",
          isLeft ? "justify-start" : "justify-end"
        )}
      >
        {isLeft && <div className="w-6 h-px border-t border-white/40"></div>}
        <span className="text-white/40 text-[10px] font-mono tracking-[0.15em]">
          {marker}
        </span>
        {!isLeft && <div className="w-6 h-px border-t border-white/40"></div>}
      </div>

      {/* Title */}
      <h2
        className="text-white text-[28px] lg:text-[36px] font-medium leading-none mb-3 tracking-[0.02em]"
        style={{ fontFamily: "sans-serif" }}
      >
        {title}
      </h2>

      {/* Hover Descriptions (Controlled by GSAP) */}
      <div className="relative h-20 overflow-visible">
        <div
          className={cn(
            "panel-desc absolute top-0 w-full opacity-0 translate-y-2",
            isLeft ? "left-0" : "right-0"
          )}
        >
          <p className="text-white/50 text-[13px] font-mono leading-[1.6] mb-1">
            {description}
          </p>
          <p
            className={cn(
              "text-white/35 text-[11px] font-mono leading-[1.7] max-w-[280px]",
              !isLeft && "ml-auto"
            )}
          >
            {subDescription}
          </p>
        </div>
      </div>
    </div>
  )
}
