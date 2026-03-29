import HeroC5OSBoot from "@/components/mobile-hero/hero-c5-os-boot"

export default function MobileConcept5Page() {
  return (
    <div className="bg-black">
      <HeroC5OSBoot />
      {/* Proof that normal scrolling continues below the hero effect */}
      <div className="h-[100vh] flex items-center justify-center text-white/40 font-mono text-sm border-t border-white/10">
        ↓ Content flows naturally below ↓
      </div>
    </div>
  )
}
