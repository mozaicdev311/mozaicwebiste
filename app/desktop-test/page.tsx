import DesktopHeroTest from "@/components/desktop-hero-experimental/desktop-hero-test"

export default function DesktopTestPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <DesktopHeroTest />

      <section
        id="work"
        className="relative overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_top,rgba(22,34,22,0.32)_0%,rgba(0,0,0,0)_46%),linear-gradient(180deg,#050505_0%,#020202_100%)]"
      >
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)", backgroundSize: "72px 72px" }} />

        <div className="relative mx-auto max-w-6xl px-6 py-28 lg:px-10 lg:py-40">
          <div className="max-w-3xl">
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-[#9CB49C]">
              Operating layer
            </p>
            <h2 className="max-w-4xl text-[42px] leading-[1.02] tracking-tight text-white font-serif lg:text-[72px]">
              One system for brand signal, product clarity, and execution at speed.
            </h2>
            <p className="mt-8 max-w-2xl font-mono text-[14px] leading-[1.8] text-white/58 lg:text-[15px]">
              The hero resolves into the working surface below: positioning, interfaces, and delivery logic held inside the same operating team.
            </p>
          </div>

          <div className="mt-16 grid gap-8 border-t border-white/10 pt-14 lg:mt-24 lg:grid-cols-3 lg:pt-20">
            <div className="border-l border-white/10 pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A8C3A8]">01 / Brand</p>
              <h3 className="mt-5 text-[24px] font-serif tracking-tight text-white lg:text-[30px]">Identity with operating logic.</h3>
              <p className="mt-4 max-w-sm font-mono text-[13px] leading-[1.8] text-white/55">
                Systems, campaigns, and art direction designed to survive contact with real product and real growth.
              </p>
            </div>

            <div className="border-l border-white/10 pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A8C3A8]">02 / Product</p>
              <h3 className="mt-5 text-[24px] font-serif tracking-tight text-white lg:text-[30px]">Interfaces that carry the business.</h3>
              <p className="mt-4 max-w-sm font-mono text-[13px] leading-[1.8] text-white/55">
                Product architecture, flows, and intelligent behavior shaped for teams that need depth without chaos.
              </p>
            </div>

            <div className="border-l border-white/10 pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A8C3A8]">03 / Delivery</p>
              <h3 className="mt-5 text-[24px] font-serif tracking-tight text-white lg:text-[30px]">Founder-led execution, end to end.</h3>
              <p className="mt-4 max-w-sm font-mono text-[13px] leading-[1.8] text-white/55">
                Strategy, design, engineering, and launch held together by one decision surface instead of fragmented handoffs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
