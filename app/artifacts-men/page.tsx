"use client"

import { useEffect } from "react"

import { FallingPattern } from "@/components/ui/falling-pattern"

export default function ArtifactsMenPage() {
  useEffect(() => {
    const embedScript = document.createElement("script")
    embedScript.type = "text/javascript"
    embedScript.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js"

    embedScript.onload = function () {
      // @ts-ignore
      if (window.UnicornStudio) {
        // @ts-ignore
        window.UnicornStudio.init()
      }
    }

    document.head.appendChild(embedScript)

    const style = document.createElement("style")
    style.textContent = `
      body {
        margin: 0;
        padding: 0;
        background-color: #000;
        overflow: hidden;
      }

      [data-us-project-src] {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(embedScript)) document.head.removeChild(embedScript)
      if (document.head.contains(style)) document.head.removeChild(style)
    }
  }, [])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <FallingPattern
        className="absolute inset-0 z-0 p-0"
        backgroundColor="#000000"
        color="rgba(255, 255, 255, 0.7)"
        blurIntensity="0.35em"
        duration={180}
        density={2}
      />

      <div className="relative z-10 flex h-full w-full">
        <section className="relative h-full flex-1 overflow-hidden">
          <div
            data-us-project-src="/unicorn-scenes/atlas.json"
            className="absolute inset-0 translate-x-[18%]"
          />
        </section>

        <section className="relative h-full flex-1 overflow-hidden">
          <div
            data-us-project-src="/unicorn-scenes/vitruvian.json"
            className="absolute inset-0 -translate-x-[12%] origin-center scale-[1.1]"
          />
        </section>
      </div>
    </main>
  )
}
