import Link from "next/link"

export default function MobileTestIndex() {
  return (
    <div className="min-h-[100dvh] bg-black text-white font-mono p-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-[#00FF00] tracking-widest mb-8 text-sm border-b border-[#00FF00]/30 pb-4">
        MOZAIC // MOBILE HERO CONCEPTS
      </h1>
      
      <div className="flex flex-col gap-4 w-full max-w-sm">

        <Link 
          href="/mobile-test/c5"
          className="p-6 border border-[#00FF00] bg-[#00FF00]/5 hover:bg-[#00FF00]/15 transition-all text-left group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-[#00FF00] text-black text-[8px] px-2 py-1 font-bold">LATEST</div>
          <div className="text-[10px] text-[#00FF00] mb-2">CONCEPT 05</div>
          <div className="text-xl mb-2 group-hover:text-[#00FF00]">The OS Boot (Biometric Tap)</div>
          <div className="text-xs text-white/70 leading-relaxed">
            Zero scroll-jacking. The hero is locked as a 50/50 split. A massive, pulsing "INIT" button sits in the center. Tapping it triggers a cinematic 1.5s 3D sequence where the panels blow past the camera, revealing the final payload.
          </div>
        </Link>

        <Link 
          href="/mobile-test/c4"
          className="p-6 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-left group"
        >
          <div className="text-[10px] text-white/50 mb-2">CONCEPT 04</div>
          <div className="text-lg mb-2">The Element Fly-Through</div>
        </Link>

        <Link 
          href="/mobile-test/c1"
          className="p-6 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-left group"
        >
          <div className="text-[10px] text-white/50 mb-2">CONCEPT 01</div>
          <div className="text-lg mb-2">The Glass Compression</div>
        </Link>

        <Link 
          href="/mobile-test/c2"
          className="p-6 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-left group"
        >
          <div className="text-[10px] text-white/50 mb-2">CONCEPT 02</div>
          <div className="text-lg mb-2">The Data Melt</div>
        </Link>

        <Link 
          href="/mobile-test/c3"
          className="p-6 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-left group"
        >
          <div className="text-[10px] text-white/50 mb-2">CONCEPT 03</div>
          <div className="text-lg mb-2">The Holographic Tunnel</div>
        </Link>
      </div>
      
      <p className="mt-8 text-[10px] text-white/30 uppercase tracking-[0.2em] max-w-[250px]">
        Note: Best viewed on an actual mobile device to test thumb ergonomics.
      </p>
    </div>
  )
}
