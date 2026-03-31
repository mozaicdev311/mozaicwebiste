import DesktopHeroTest from "@/components/desktop-hero-experimental/desktop-hero-test"

export default function DesktopTestPage() {
  return (
    <main className="min-h-screen bg-black">
      <DesktopHeroTest />
      {/* Spacer to allow scrolling */}
      <div className="h-[200vh] bg-neutral-900 border-t border-white/10 flex items-center justify-center">
        <p className="font-mono text-white/50">Next section (mock)</p>
      </div>
    </main>
  )
}
