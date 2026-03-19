"use client"

import { useEffect } from "react"

export default function ArtifactsPage() {
  useEffect(() => {
    // Inject Unicorn Studio script
    const embedScript = document.createElement("script")
    embedScript.type = "text/javascript"
    embedScript.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js"
    
    embedScript.onload = function() {
       // @ts-ignore
       if (window.UnicornStudio) {
         // @ts-ignore
         window.UnicornStudio.init()
       }
    }

    document.head.appendChild(embedScript)

    // Inject styles for clean appearance and hiding branding
    const style = document.createElement("style")
    style.textContent = `
      body {
        margin: 0;
        padding: 0;
        background-color: #0A0A0A;
        overflow: hidden;
      }
      [data-us-project] {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="watermark"],
      a[href*="unicorn.studio"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `
    document.head.appendChild(style)

    // Branding removal logic
    const observer = new MutationObserver((mutations) => {
      let shouldHide = false
      mutations.forEach(m => {
        if (m.addedNodes.length > 0) shouldHide = true
      })
      if (shouldHide) {
        const links = document.querySelectorAll('a[href*="unicorn.studio"]')
        links.forEach(el => el.remove())

        const containers = document.querySelectorAll('[data-us-project]')
        containers.forEach(container => {
          const children = container.querySelectorAll('*')
          children.forEach(el => {
            if (el.tagName === 'CANVAS' || el.hasAttribute('data-us-project')) return
            const text = (el.textContent || "").toLowerCase()
            if (text.includes("made with") && text.includes("unicorn")) {
              el.remove()
            }
          })
        })
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      if (document.head.contains(embedScript)) document.head.removeChild(embedScript)
      if (document.head.contains(style)) document.head.removeChild(style)
    }
  }, [])

  return (
    <main className="flex w-full h-screen bg-[#0A0A0A]">
      {/* Left Artifact */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          data-us-project="OMzqyUv6M3kSnv0JeAtC" 
          className="absolute inset-0"
        />
      </div>

      {/* Right Artifact */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          data-us-project="whwOGlfJ5Rz2rHaEUgHl" 
          className="absolute inset-0"
        />
      </div>
    </main>
  )
}
