import HeroC1Compression from "@/components/mobile-hero/hero-c1-compression"

export default function MobileConcept1Page() {
  return (
    <div className="bg-neutral-900 min-h-[300vh]">
      <HeroC1Compression />
      {/* Proof that normal scrolling continues below the hero effect */}
      <div className="h-[100vh] flex items-center justify-center text-white/40 font-mono text-sm border-t border-white/10">
        ↓ Content flows naturally below ↓
      </div>
    </div>
  )
}
