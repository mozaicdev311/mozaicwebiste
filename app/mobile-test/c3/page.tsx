import HeroC3ZPush from "@/components/mobile-hero/hero-c3-zpush"

export default function MobileConcept3Page() {
  return (
    <div className="bg-neutral-900 min-h-[300vh]">
      <HeroC3ZPush />
      {/* Proof that normal scrolling continues below the hero effect */}
      <div className="h-[100vh] flex items-center justify-center text-white/40 font-mono text-sm border-t border-white/10">
        ↓ Content flows naturally below ↓
      </div>
    </div>
  )
}
