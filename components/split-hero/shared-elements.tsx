"use client"

import { useEffect } from "react"
import Image from "next/image"

interface SharedBackgroundProps {
  viewState: "split" | "studio" | "tech"
  hoveredPanel: "left" | "right" | null
  isMobile: boolean
}

export function SharedBackground({ viewState, hoveredPanel, isMobile }: SharedBackgroundProps) {
  useEffect(() => {
    // Inject Unicorn Studio Script
    const embedScript = document.createElement("script")
    embedScript.type = "text/javascript"
    embedScript.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js"
    
    // Add load listener to init
    embedScript.onload = function() {
       // @ts-ignore
       if (window.UnicornStudio) {
         // @ts-ignore
         window.UnicornStudio.init()
       }
    }

    document.head.appendChild(embedScript)

    // Style to handle the canvases and hide branding
    const style = document.createElement("style")
    style.textContent = `
      [data-us-project] {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
      }
      
      /* Hide branding safely - Target specific elements, NOT the container */
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="watermark"],
      /* Global fallback for the overlay link */
      a[href*="unicorn.studio"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `
    document.head.appendChild(style)

    const hideBranding = () => {
      // Safer scanner - target text/links only
      // We search specifically for the overlay link usually injected at body end
      const links = document.querySelectorAll('a[href*="unicorn.studio"]')
      links.forEach(el => {
         el.remove()
      })

      // Also check inside the project container for specific text nodes
      const containers = document.querySelectorAll('[data-us-project]')
      containers.forEach(container => {
        const children = container.querySelectorAll('*')
        children.forEach(el => {
          // Skip if it's a canvas or the container itself
          if (el.tagName === 'CANVAS' || el.hasAttribute('data-us-project')) return

          const text = (el.textContent || "").toLowerCase()
          if (text.includes("made with") && text.includes("unicorn")) {
            el.remove()
          }
        })
      })
    }

    hideBranding()
    const interval = setInterval(hideBranding, 50)

    setTimeout(hideBranding, 500)
    setTimeout(hideBranding, 1000)
    setTimeout(hideBranding, 2000)
    setTimeout(hideBranding, 5000)
    setTimeout(hideBranding, 10000)

    return () => {
      clearInterval(interval)
      document.head.removeChild(embedScript)
      document.head.removeChild(style)
    }
  }, [])

  // Calculate clip-paths for split screen
  // Default (Split): Left shows 0-50%, Right shows 50-100%
  
  let leftClip = "inset(0 50% 0 0)" // Shows left half
  let rightClip = "inset(0 0 0 50%)" // Shows right half

  if (!isMobile) {
    if (viewState === "studio") {
      leftClip = "inset(0 0 0 0)" // Full screen
      rightClip = "inset(0 0 0 100%)" // Hidden
    } else if (viewState === "tech") {
      leftClip = "inset(0 100% 0 0)" // Hidden
      rightClip = "inset(0 0 0 0)" // Full screen
    } else if (hoveredPanel === "left") {
      leftClip = "inset(0 40% 0 0)" // 60% width
      rightClip = "inset(0 0 0 60%)" // 40% width
    } else if (hoveredPanel === "right") {
      leftClip = "inset(0 60% 0 0)" // 40% width
      rightClip = "inset(0 0 0 40%)" // 60% width
    }
  } else {
    // Mobile logic (Vertical split is harder with simple inset, usually stacked)
    // For now, let's keep simple logic or hide webGL on mobile as per original code
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-black">
      
      {/* LEFT BACKGROUND (Mozaic Fluid) */}
      <div 
        className="absolute inset-0 transition-all duration-500 ease-out hidden lg:block"
        style={{ clipPath: leftClip }}
      >
        <div data-us-project="OMzqyUv6M3kSnv0JeAtC"></div>
      </div>

      {/* RIGHT BACKGROUND (Vitruvian Wireframe) */}
      <div 
        className="absolute inset-0 transition-all duration-500 ease-out hidden lg:block"
        style={{ clipPath: rightClip }}
      >
        <div data-us-project="whwOGlfJ5Rz2rHaEUgHl"></div>
      </div>

      {/* Mobile Fallback (Stars) */}
      <div className="absolute inset-0 w-full h-full lg:hidden stars-bg"></div>

      <style jsx>{`
        .stars-bg {
          background-image: 
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%;
          opacity: 0.3;
        }
      `}</style>
    </div>
  )
}

export function SharedTopBar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 border-b border-white/20 pointer-events-none">
      <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between pointer-events-auto">
        <div className="flex gap-2 lg:gap-4 items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fichier%201HD_New_Mozaic_Opt1-RK66SS2l1DT94G5RIbxu7IbwIHkQ4A.png"
            alt="MOZAIC"
            width={140}
            height={48}
            className="w-auto brightness-0 invert h-14"
          />
          <div className="h-3 lg:h-4 w-px bg-white/40"></div>
          <span className="text-white/60 text-[8px] lg:text-[10px] font-mono">EST. 2026</span>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-[10px] font-mono text-white/60">
          <a href="#services" className="hover:text-white transition-colors">
            SERVICES
          </a>
          <a href="#work" className="hover:text-white transition-colors">
            WORK
          </a>
          <a href="#team" className="hover:text-white transition-colors">
            TEAM
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            CONTACT
          </a>
        </div>
      </div>
    </div>
  )
}

export function SharedBottomBar() {
  return (
    <div
      className="absolute left-0 right-0 z-50 border-t border-white/20 bg-black/40 backdrop-blur-sm pointer-events-none"
      style={{ bottom: 0 }}
    >
      <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/50">
          <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
          <span className="lg:hidden">SYS.ACT</span>
          <div className="hidden lg:flex gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-1 h-3 bg-white/30" style={{ height: `${(i % 3 + 1) * 4}px` }}></div>
            ))}
          </div>
          <span>V1.0.0</span>
        </div>

        <div className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/50">
          <span className="hidden lg:inline">◐ RENDERING</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-[#00FF00]/60 rounded-full animate-pulse"></div>
            <div
              className="w-1 h-1 bg-[#FF0000]/40 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <span className="hidden lg:inline">FRAME: ∞</span>
        </div>
      </div>
    </div>
  )
}
