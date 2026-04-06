import HeroC4Flythrough from "@/components/mobile-hero/hero-c4-particles"

export default function MobileConcept4Page() {
  return (
    <div className="bg-neutral-900 min-h-[300vh]">
      <HeroC4Flythrough />
      {/* Proof that normal scrolling continues below the hero effect */}
      <div className="h-[100vh] flex items-center justify-center text-white/40 font-mono text-sm border-t border-white/10">
        ↓ Content flows naturally below ↓
      </div>
    </div>
  )
}
