import MainContent from "@/components/landing/MainContent"
import SplitHero from "@/components/split-hero/split-hero"

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-black text-white">
      <SplitHero />
      <MainContent />
    </div>
  )
}
