"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement
        resize?: boolean
      }) => void
    }
  }
}

interface CalendlyEmbedProps {
  baseUrl: string | null
  embedUrl: string | null
}

export function CalendlyEmbed({ baseUrl, embedUrl }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scriptFailed, setScriptFailed] = useState(false)

  useEffect(() => {
    if (!embedUrl || !containerRef.current) {
      return
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const initialize = () => {
      if (!containerRef.current || !window.Calendly) {
        return
      }

      containerRef.current.innerHTML = ""
      window.Calendly.initInlineWidget({
        url: embedUrl,
        parentElement: containerRef.current,
        resize: true,
      })
    }

    if (window.Calendly) {
      initialize()
      return
    }

    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    script.onload = initialize
    script.onerror = () => setScriptFailed(true)
    document.body.appendChild(script)

    timeoutId = setTimeout(() => {
      if (!window.Calendly) {
        setScriptFailed(true)
      }
    }, 4500)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [embedUrl])

  return (
    <div id="schedule-call" className="border border-white/15 bg-black/60 p-6 md:p-8">
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Schedule_Block // Direct access
        </div>
        <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.03em] font-medium text-white">
          Book time if the brief is already clear.
        </h2>
        <p className="mt-4 max-w-[50ch] text-[1rem] leading-relaxed text-white/60">
          Use the calendar if you already know the shape of the conversation. If the embed misbehaves, the direct link stays available.
        </p>
      </div>

      {embedUrl ? (
        <div
          ref={containerRef}
          className="min-h-[700px] overflow-hidden border border-white/10 bg-black"
        />
      ) : (
        <div className="border border-white/10 bg-white/[0.02] px-4 py-5 text-sm leading-relaxed text-white/55">
          Calendly is not configured yet. Add <code className="font-mono text-white">NEXT_PUBLIC_CALENDLY_URL</code> to enable the inline scheduler.
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          Fallback path // external booking link
        </div>
        {baseUrl ? (
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-none border-white/20 bg-transparent px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black"
          >
            <Link href={baseUrl} target="_blank" rel="noreferrer">
              Open Calendly
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        ) : null}
      </div>

      {scriptFailed && baseUrl ? (
        <div className="mt-4 border border-amber-400/30 bg-amber-400/8 px-4 py-4 text-sm text-amber-200">
          The inline scheduler did not load here. Use the direct Calendly link above.
        </div>
      ) : null}
    </div>
  )
}
