import MainContent from "@/components/landing/MainContent"
import HeroC5OSBoot from "@/components/mobile-hero/hero-c5-os-boot"
import SplitHero from "@/components/split-hero/split-hero"
import { NoiseOverlay, ScanlineOverlay } from "@/components/landing/ui/Shared"
import { BootSequence } from "@/components/ui/boot-sequence"

export default function Home() {
  return (
    <>
      <BootSequence />
      <div className="fixed inset-0 z-[9990] pointer-events-none mix-blend-overlay">
        <NoiseOverlay />
      </div>
      <div className="fixed inset-0 z-[9991] pointer-events-none opacity-30 mix-blend-overlay">
        <ScanlineOverlay />
      </div>
      <div id="top" className="min-h-screen bg-black text-white relative z-0">
        <div className="block lg:hidden">
          <HeroC5OSBoot />
        </div>
        <div className="hidden lg:block">
          <SplitHero />
        </div>
        <MainContent />
      </div>
    </>
  )
}
