import React from "react";
import Link from "next/link";
import { HashLink } from "@/components/hash-link";

export default function Footer() {
  return (
    <footer className="px-[5%] py-20 bg-black relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 font-mono text-[10px] tracking-[0.1em] uppercase">
        <div>
          <div className="font-sans font-semibold text-[1.5rem] tracking-[0.2em] text-white mb-6">MOZAIC</div>
          <p className="text-white/40 mb-0">&copy; 2026 MOZAIC // SYS.ONLINE</p>
        </div>
        <div className="flex flex-col gap-4 text-white/50">
          <HashLink href="#work" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Work</HashLink>
          <HashLink href="#services" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Services</HashLink>
          <HashLink href="#team" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> About</HashLink>
          <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Contact</Link>
        </div>
        <div className="flex flex-col gap-4 text-white/50">
          <HashLink href="#service-brand-product" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Studio</HashLink>
          <HashLink href="#service-software" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Product & Systems</HashLink>
          <HashLink href="#service-growth" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Growth</HashLink>
          <HashLink href="#service-growth" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> AI & Automation</HashLink>
          <HashLink href="#service-strategy" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-white/20">&gt;</span> Strategy</HashLink>
        </div>
        <div className="text-white/50">
          <div className="flex items-center gap-2 mb-4"><div className="w-1.5 h-1.5 bg-white/30" /> Barcelona</div>
          <div className="flex items-center gap-2 mb-4"><div className="w-1.5 h-1.5 bg-white/30" /> Paris</div>
          <div className="flex items-center gap-2 mb-10"><div className="w-1.5 h-1.5 bg-white/30" /> Montreal</div>
          <p className="mb-0 text-white/80 border border-white/20 inline-block px-3 py-1">EN · FR · ES · AR</p>
        </div>
      </div>
    </footer>
  );
}
