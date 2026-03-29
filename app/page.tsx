import MainContent from "@/components/landing/MainContent"
import HeroC5OSBoot from "@/components/mobile-hero/hero-c5-os-boot"
import SplitHero from "@/components/split-hero/split-hero"

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-black text-white">
      <div className="block lg:hidden">
        <HeroC5OSBoot />
      </div>
      <div className="hidden lg:block">
        <SplitHero />
      </div>
      <MainContent />
    </div>
  )
}
