import SplitHero from "@/components/split-hero/split-hero"

const credibilityItems = [
  {
    number: "01",
    title: "Creative direction at global brand level.",
    description:
      "Campaign direction, retail launches, social film, editorial, and brand photography for Back Market, Moët Hennessy, Whatnot, and Vice TV. Global stages. Real commercial stakes. That is the creative baseline at MOZAIC.",
  },
  {
    number: "02",
    title: "Security-first engineering shaped in high-stakes technical environments.",
    description:
      "Our tech lead's career started in fintech. Systems that handle real money under real regulatory scrutiny. Compliance that is not optional. Standards that do not drop when the project is a website.\n\nThat is the technical floor.",
  },
  {
    number: "03",
    title: "Products and intelligent systems shaped under real constraints.",
    description:
      "Not just for clients. We shape our own platforms and AI systems with our own money on the line. Recommendations come from execution, not theory. That is what keeps the work honest.",
  },
]

const proofItems = [
  {
    badge: "MOZAIC Build",
    title: "Natsnap",
    description:
      "A two-sided marketplace for wildlife photography and nature tourism. Role-based access, booking orchestration, Stripe payment flows, provider operations, and localization shaped as one product system from day one. One team composed every layer.",
  },
  {
    badge: "MOZAIC Build",
    title: "PrepLingo",
    description:
      "An AI-powered exam prep platform for French immigration tests. Real-time speech evaluation, rubric-based LLM scoring, queue-based AI workers, encrypted storage, and GDPR-compliant handling shaped into one evaluation system. Built for candidates who cannot afford guesswork.",
  },
]

const outcomeItems = [
  {
    number: "01",
    title: "Launch the brand and the product together.",
    description:
      "Not two parallel tracks stitched together at the end. One team shaping identity, product, and architecture from the same brief. The thing that ships is the thing that was designed.",
  },
  {
    number: "02",
    title: "Ship software that can carry the business.",
    description:
      "Platforms, marketplaces, SaaS, and internal tools. Systems architecture shaped for access control, transaction flows, operations, and scale.",
  },
  {
    number: "03",
    title: "Connect growth to product through intelligent systems.",
    description:
      "Automation, acquisition loops, and implementation owned by the same team. No translation layer between strategy, code, and performance.",
  },
  {
    number: "04",
    title: "Decide what to build before the budget moves.",
    description:
      "Roadmaps, architecture, sequencing, and scope. From people who ship what they recommend.",
  },
]

const waysToWork = [
  {
    label: "Sprint",
    title: "Sprint",
    description:
      "A focused starting point for discovery, audits, landing pages, automation flows, and strategy work.",
  },
  {
    label: "Build",
    title: "Build",
    description:
      "End-to-end delivery for brands, websites, products, platforms, and intelligent systems.",
  },
  {
    label: "Partner",
    title: "Partner",
    description: "Ongoing creative, growth, technical, and strategic support.",
  },
]

const founders = [
  {
    role: "Business Development & Product",
    name: "Oussama",
    location: "Barcelona",
    description:
      "Hears a business problem and maps the system behind it. Not the website. Not the campaign. The operating model. Co-founded Natsnap and led its product from architecture through launch: a two-sided marketplace with real users, real payments, and product logic shaped end to end.",
  },
  {
    role: "Creative Direction",
    name: "Tawfik",
    location: "Paris",
    description:
      "Directed 360 creative, social film, retail launch work, and visual systems for Back Market, Moët Hennessy, Whatnot, and Vice TV. At Back Market, he art directed the Obsolete Computer initiative, supported the Soho retail launch, and directed social content that reached hundreds of thousands of views within days. The reason a MOZAIC product doesn't just work. It feels like something.",
  },
  {
    role: "Tech Lead & Infrastructure",
    name: "Med Amine",
    location: "Montreal",
    description:
      "Professional baseline: fintech. Systems that process real money under real regulatory scrutiny. Built PrepLingo's AI pipeline: speech evaluation, LLM scoring, encrypted storage, GDPR compliance. For immigration candidates who cannot afford a system that guesses. His minimum is most studios' ceiling.",
  },
]

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="mb-12 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
      <span className="h-px w-6 bg-[#00FF00]" />
      <span>{text}</span>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SplitHero />

      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-5xl px-6 py-24 md:py-28">
          <SectionLabel text="02 · The Problem" />
          <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Most companies don't need another agency.
            <br />
            They need <span className="text-[#00FF00]">one system.</span>
          </h2>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1px_.95fr]">
            <div className="space-y-4 text-base leading-8 text-white/65 md:text-[17px] md:leading-9">
              <p>Brand in one room. Product in another. Growth brought in once both are already set.</p>
              <p>The brand team defines the system. The build compromises it. Growth inherits both and is left to make the numbers work.</p>
              <p>Three teams. Three handoffs. No shared definition of done.</p>
              <p>Everyone is moving. Nobody owns the outcome.</p>
              <p>That is not a process problem. It is an architecture problem. And architecture does not improve by coordinating harder.</p>
            </div>

            <div className="bg-white/10" />

            <div className="flex flex-col">
              <p className="mb-6 border-b border-white/10 pb-6 text-2xl font-bold leading-relaxed tracking-[-0.01em]">
                MOZAIC was set up to close that gap before it opens.
              </p>
              <p className="text-[15px] leading-8 text-white/65">
                Brand, product, and the technical layer are shaped from the same brief, by the same team, before handoffs turn into delays.
                <br />
                <br />
                One operating team. One brief. No translation layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" id="services">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:py-28">
          <SectionLabel text="03 · The Work Predates the Name" />
          <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.03em] md:text-6xl">
            The work predates the name.
          </h2>

          <div className="mt-14 grid border-y border-white/10 md:grid-cols-3">
            {credibilityItems.map((item, index) => (
              <article
                key={item.number}
                className={`bg-gradient-to-b from-white/[0.015] to-transparent p-10 ${index < credibilityItems.length - 1 ? "md:border-r md:border-white/10" : ""}`}
              >
                <span className="mb-6 block text-[10px] font-bold tracking-[0.2em] text-[#00FF00]">{item.number}</span>
                <h3 className="mb-4 text-[26px] font-extrabold leading-[1.3] tracking-[-0.02em] text-balance">
                  {item.title}
                </h3>
                <p className="whitespace-pre-line text-[15px] leading-8 text-white/65">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" id="work">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:py-28">
          <SectionLabel text="04 · Proof" />
          <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.03em] md:text-6xl">
            MOZAIC is new.
            <br />
            The standards aren't.
          </h2>
          <p className="mt-5 text-[15px] leading-8 text-white/65">
            A selection of MOZAIC builds and the founder work that set the standard behind them.
          </p>

          <div className="mt-12 grid border border-white/10 md:grid-cols-2">
            {proofItems.map((item, index) => (
              <article
                key={item.title}
                className={`min-h-[320px] bg-gradient-to-b from-white/[0.015] to-transparent p-10 ${index === 0 ? "md:border-r md:border-white/10" : ""}`}
              >
                <span className="mb-7 inline-flex w-fit items-center gap-2 border border-[#00FF00]/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#00FF00]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00FF00]" />
                  {item.badge}
                </span>
                <h3 className="mb-4 text-4xl font-black tracking-[-0.03em]">{item.title}</h3>
                <p className="text-base leading-8 text-white/65">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 border border-t-0 border-white/10 px-10 py-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Founder Experience</span>
            <span className="hidden h-7 w-px bg-white/10 sm:block" />
            <span className="text-[14px] leading-7 text-white/65">
              From Back Market 360 creative and Soho retail launch work to Moët Hennessy maison content, Whatnot consulting, and Vice TV creative direction.
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:py-28">
          <SectionLabel text="05 · Two Front Doors" />
          <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.03em] md:text-6xl">Where do you start?</h2>

          <div className="mt-12 grid border border-white/10 md:grid-cols-2">
            <article className="min-h-[340px] bg-gradient-to-b from-white/[0.012] to-transparent p-10 md:border-r md:border-white/10">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/40">01</span>
              <h3 className="mt-5 text-5xl font-black leading-none tracking-[-0.03em]">Studio</h3>
              <p className="mt-5 max-w-[42ch] text-[15px] leading-8 text-white/65">
                Identity, campaigns, films, content, and brand systems with real signal.
                <br />
                <br />
                Creative direction at global brand level, inside a studio that ships what it designs.
              </p>
              <span className="mt-8 block text-right text-2xl text-white/25">→</span>
            </article>

            <article className="min-h-[340px] bg-gradient-to-b from-white/[0.012] to-transparent p-10">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/40">02</span>
              <h3 className="mt-5 text-balance text-5xl font-black leading-none tracking-[-0.03em]">Product & Systems</h3>
              <p className="mt-5 max-w-[42ch] text-[15px] leading-8 text-white/65">
                Websites, software, platforms, automation, and intelligent systems built for real-world use.
                <br />
                <br />
                Engineering standards shaped in fintech, inside a studio that understands brand from day one.
              </p>
              <span className="mt-8 block text-right text-2xl text-white/25">→</span>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:py-28">
          <SectionLabel text="06 · What We Help You Shape" />
          <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.03em] md:text-6xl">
            What we help
            <br />
            you shape.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {outcomeItems.map((item) => (
              <article key={item.number} className="grid grid-cols-[48px_1fr] gap-x-5 border border-white/10 bg-gradient-to-b from-white/[0.015] to-transparent p-8">
                <span className="pt-1 text-[11px] font-bold tracking-[0.12em] text-[#00FF00]">{item.number}</span>
                <div>
                  <h3 className="mb-3 text-[22px] font-bold leading-[1.28] tracking-[-0.02em] text-balance">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-8 text-white/65">{item.description}</p>
                  <span className="mt-6 block text-right text-lg text-white/20">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:py-28">
          <SectionLabel text="07 · Ways to Work" />
          <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Three ways in.
            <br />
            One standard.
          </h2>

          <div className="mt-12 grid border border-white/10 md:grid-cols-3">
            {waysToWork.map((item, index) => (
              <article
                key={item.title}
                className={`min-h-[220px] bg-gradient-to-b from-white/[0.012] to-transparent p-10 ${index < waysToWork.length - 1 ? "md:border-r md:border-white/10" : ""}`}
              >
                <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00FF00]">{item.label}</span>
                <h3 className="mb-5 text-4xl font-black tracking-[-0.03em]">{item.title}</h3>
                <p className="text-[15px] leading-8 text-white/65">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" id="team">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:py-28">
          <SectionLabel text="08 · Founders & Team" />
          <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Founder-led.
            <br />
            Team-backed.
          </h2>

          <p className="mt-10 max-w-4xl text-xl leading-9 text-white/65">
            The founders stay close to the work: strategy, creative direction, product logic, and technical architecture. Around them is a wider team across brand design, UI/UX, engineering, content, motion, growth, and automation. A deliberate tessellation of specialists around what the problem actually requires.
          </p>

          <div className="mt-14 grid border border-white/10 md:grid-cols-3">
            {founders.map((founder, index) => (
              <article
                key={founder.name}
                className={`min-h-[380px] bg-gradient-to-b from-white/[0.015] to-transparent p-10 ${index < founders.length - 1 ? "md:border-r md:border-white/10" : ""}`}
              >
                <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{founder.role}</span>
                <h3 className="mb-2 text-4xl font-black tracking-[-0.02em]">{founder.name}</h3>
                <span className="mb-5 block text-xs font-bold uppercase tracking-[0.08em] text-[#00FF00]">{founder.location}</span>
                <p className="text-[15px] leading-8 text-white/65">{founder.description}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 border border-white/10 bg-gradient-to-b from-white/[0.01] to-transparent px-10 py-8 md:grid-cols-[1.35fr_.65fr]">
            <p className="text-[13px] leading-8 text-white/40">
              Brand design · UI/UX · Product design · Development · Motion · Content · Growth · Automation
            </p>
            <p className="text-[14px] leading-7 text-white/65 md:text-right">
              Distinct disciplines.
              <br />
              Composed around the problem.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center">
            <p className="max-w-3xl text-[14px] leading-7 text-white/35">
              One core leadership team. A wider multidisciplinary bench. One standard across the work.
            </p>
            <a href="#" className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#00FF00]">
              Full story →
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" id="contact">
        <div className="mx-auto w-full max-w-5xl px-6 py-28 text-center md:py-36">
          <span className="mb-7 inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#00FF00]">Start here</span>
          <h2 className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Tell us what
            <br />
            you're building.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[19px] leading-9 text-white/65">
            Stage, constraints, timeline, and what is at stake.
            <br />
            We'll tell you where to start. And what to leave out.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <a href="#" className="min-w-[190px] bg-white px-8 py-4 text-center text-[13px] font-bold uppercase tracking-[0.05em] text-black transition hover:bg-[#00FF00]">
              Start a Project
            </a>
            <a href="#work" className="min-w-[190px] border border-white/20 px-8 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.05em] text-white transition hover:border-[#00FF00] hover:text-[#00FF00]">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      <footer className="grid items-center gap-6 px-6 py-8 md:grid-cols-[auto_1fr_auto] md:px-12">
        <span className="text-sm font-black uppercase tracking-[0.1em]">MOZAIC</span>

        <div className="flex flex-wrap gap-5 text-xs tracking-[0.04em] text-white/40 md:justify-center">
          <a href="#work" className="hover:text-white">Work</a>
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#team" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white">Studio</a>
          <a href="#" className="hover:text-white">Product & Systems</a>
          <a href="#" className="hover:text-white">Growth</a>
          <a href="#" className="hover:text-white">AI & Automation</a>
          <a href="#" className="hover:text-white">Strategy</a>
        </div>

        <span className="text-xs tracking-[0.04em] text-white/30 md:text-right">
          Barcelona · Paris · Montreal · EN · FR · ES · AR · © 2026 MOZAIC
        </span>
      </footer>
    </div>
  )
}
