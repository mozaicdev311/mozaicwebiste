import Link from "next/link"
import { ArrowLeft, ArrowRight, Terminal } from "lucide-react"

import { CalendlyEmbed } from "@/components/contact/calendly-embed"
import { ContactForm } from "@/components/contact/contact-form"
import { NoiseOverlay, ScanlineOverlay, HudLabel } from "@/components/landing/ui/Shared"
import { Button } from "@/components/ui/button"
import { getCalendlyBaseUrl, getCalendlyEmbedUrl } from "@/lib/contact"

export default function ContactPage() {
  const calendlyBaseUrl = getCalendlyBaseUrl()
  const calendlyEmbedUrl = calendlyBaseUrl ? getCalendlyEmbedUrl(calendlyBaseUrl) : null

  return (
    <main className="min-h-screen bg-black text-white">
      <NoiseOverlay />
      <ScanlineOverlay />

      <div className="sticky top-0 z-50 border-b border-white/20 bg-black/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-[5%] py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/65 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Return
            </Link>
            <div className="hidden h-4 w-px bg-white/20 md:block" />
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 md:block">
              Secure_Channel_Open
            </div>
          </div>

          <div className="hidden items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 md:flex">
            <Link href="/#services" className="transition-colors hover:text-white">
              Services
            </Link>
            <Link href="/#work" className="transition-colors hover:text-white">
              Work
            </Link>
            <Link href="/#team" className="transition-colors hover:text-white">
              Team
            </Link>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-white/10 px-[5%] py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_30%,black_35%,transparent_100%)]" />
        <div className="relative mx-auto max-w-[1600px]">
          <HudLabel className="mb-8">CONTACT.PROTOCOL // 10</HudLabel>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <h1 className="max-w-[10ch] text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-[-0.05em] font-medium">
                Start where the work gets real.
              </h1>
              <p className="mt-8 max-w-[56ch] text-[1.125rem] leading-relaxed text-white/60 md:text-[1.25rem]">
                Use the form when you need a sharp first pass on scope, timing, and what should happen next. Use the calendar when the brief is already formed and you want direct time on the table.
              </p>

              <div className="mt-12 flex flex-wrap gap-4">
                <Button
                  asChild
                  className="h-12 rounded-none bg-[#00FF66] px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-black hover:bg-[#00FF66]/90"
                >
                  <Link href="#contact-intake">
                    Open intake
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-none border-white/20 bg-transparent px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black"
                >
                  <Link href="#schedule-call">Open calendar</Link>
                </Button>
              </div>
            </div>

            <div className="border border-white/15 bg-black/55 p-6 md:p-8">
              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <Terminal className="size-4 text-white/45" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Routing_Notes
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="h-2 w-2 bg-white/20" />
                  <div className="h-2 w-2 bg-white/20" />
                  <div className="h-2 w-2 bg-white" />
                </div>
              </div>

              <div className="space-y-5 text-sm leading-relaxed text-white/62">
                <p>
                  Best for launches, websites, platforms, automation systems, strategy sprints, and ongoing partner support.
                </p>
                <p>
                  The brief can be rough. We care more about the stake, timing, and what has to work than polished wording.
                </p>
                <div className="grid gap-3 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 sm:grid-cols-2">
                  <div>Founder-led replies</div>
                  <div>Form + scheduling</div>
                  <div>Business-first triage</div>
                  <div>No CRM maze</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-intake" className="px-[5%] py-16 md:py-20">
        <div className="mx-auto grid max-w-[1600px] gap-8 xl:grid-cols-2">
          <ContactForm />
          <CalendlyEmbed baseUrl={calendlyBaseUrl} embedUrl={calendlyEmbedUrl} />
        </div>
      </section>
    </main>
  )
}
