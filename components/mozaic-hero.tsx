"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function MozaicHero() {
  useEffect(() => {
    const embedScript = document.createElement("script")
    embedScript.type = "text/javascript"
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `
    document.head.appendChild(embedScript)

    const style = document.createElement("style")
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `
    document.head.appendChild(style)

    const hideBranding = () => {
      const selectors = [
        "[data-us-project]",
        '[data-us-project="OMzqyUv6M3kSnv0JeAtC"]',
        ".unicorn-studio-container",
        'canvas[aria-label*="Unicorn"]',
      ]

      selectors.forEach((selector) => {
        const containers = document.querySelectorAll(selector)
        containers.forEach((container) => {
          const allElements = container.querySelectorAll("*")
          allElements.forEach((el) => {
            const text = (el.textContent || "").toLowerCase()
            const title = (el.getAttribute("title") || "").toLowerCase()
            const href = (el.getAttribute("href") || "").toLowerCase()

            if (
              text.includes("made with") ||
              text.includes("unicorn") ||
              title.includes("made with") ||
              title.includes("unicorn") ||
              href.includes("unicorn.studio")
            ) {
              const htmlEl = el as HTMLElement
              htmlEl.style.display = "none"
              htmlEl.style.visibility = "hidden"
              htmlEl.style.opacity = "0"
              htmlEl.style.pointerEvents = "none"
              htmlEl.style.position = "absolute"
              htmlEl.style.left = "-9999px"
              htmlEl.style.top = "-9999px"
              try {
                htmlEl.remove()
              } catch (e) {}
            }
          })
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Animation */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <div data-us-project="OMzqyUv6M3kSnv0JeAtC" style={{ width: "100%", height: "100%", minHeight: "100vh" }} />
      </div>

      {/* Mobile stars background */}
      <div className="absolute inset-0 w-full h-full lg:hidden stars-bg"></div>

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/20">
        <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
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
            <Link href="/contact" className="hover:text-white transition-colors">
              CONTACT
            </Link>
          </div>
        </div>
      </div>

      {/* Corner Frame Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-[#00FF00]/30 z-20"></div>
      <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-[#FF0000]/30 z-20"></div>
      <div
        className="absolute left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-[#FF0000]/30 z-20"
        style={{ bottom: "5vh" }}
      ></div>
      <div
        className="absolute right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-[#00FF00]/30 z-20"
        style={{ bottom: "5vh" }}
      ></div>

      {/* CTA Content */}
      <div
        className="relative z-10 flex min-h-screen items-center justify-end pt-16 lg:pt-0"
        style={{ marginTop: "5vh" }}
      >
        <div className="w-full lg:w-1/2 px-6 lg:px-16 lg:pr-[10%]">
          <div className="max-w-2xl relative lg:ml-auto">
            {/* Top decorative line */}
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-[#00FF00]"></div>
              <span className="text-[#00FF00] text-[10px] font-mono tracking-wider">∞</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>

            <div className="relative mb-4 lg:mb-6">
              <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] font-mono tracking-wide">
                COMPLETE DIGITAL
                <br />
                SYSTEMS.
              </h1>
            </div>

            {/* Decorative dots pattern - desktop only */}
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

              {/* Technical corner accent - desktop only */}
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

            {/* Buttons with technical accents */}
            <ButtonGroup className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
              <Button className="relative px-6 py-3 bg-[#FF0000] text-white font-mono text-sm hover:bg-[#FF0000]/90 transition-all duration-200 group rounded-none">
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

            {/* Bottom technical notation - desktop only */}
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
      </div>

      {/* Bottom Footer */}
      <div
        className="absolute left-0 right-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm"
        style={{ bottom: "5vh" }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
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

      <style jsx>{`
        .dither-pattern {
          background-image: 
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, white 1px, white 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 2px);
          background-size: 3px 3px;
        }
        
        .stars-bg {
          background-image: 
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent),
            radial-gradient(1px 1px at 70% 40%, white, transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%;
          background-position: 0% 0%, 40% 40%, 60% 60%, 20% 20%, 80% 80%, 30% 30%, 70% 70%, 50% 50%;
          opacity: 0.3;
        }
      `}</style>
    </main>
  )
}
