import Image from "next/image"
import SplitHero from "@/components/split-hero/split-hero"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item"
import { EvervaultCard, Icon } from "@/components/ui/evervault-card"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* SECTION 1: HERO */}
      <SplitHero />

      {/* SECTION 2: PROBLEM */}
      <section className="bg-[#FFFFFF] text-[#000000] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-extrabold text-5xl md:text-7xl mb-12 text-balance">
            The Problem With
            <br />
            Digital Projects
          </h2>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-12">
            <p className="font-regular">Most digital projects look like this:</p>

            <div className="space-y-3 pl-6">
              <p>→ One agency for branding</p>
              <p>→ Another for development</p>
              <p>→ Another for infrastructure</p>
              <p>→ Another for marketing</p>
            </div>

            <p className="font-regular pt-4">You coordinate. Budgets balloon. Timelines slip. Nothing connects.</p>
          </div>

          <p className="font-extrabold text-3xl md:text-5xl text-[#FF0000] text-balance">
            Fragmented systems.
            <br />
            Miscommunication.
            <br />
            Blown budgets.
          </p>
        </div>
      </section>

      {/* SECTION 3: SOLUTION */}
      <section className="bg-[#000000] text-[#FFFFFF] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-extrabold text-5xl md:text-7xl mb-6 text-balance">
            One Team.
            <br />
            Complete Delivery.
          </h2>

          <p className="font-bold text-2xl md:text-3xl mb-16">Three capabilities. Integrated.</p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Creative Card */}
            <div className="relative h-[400px] border-2 border-[#00FF00]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-[#00FF00] z-20" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-[#00FF00] z-20" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-[#00FF00] z-20" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-[#00FF00] z-20" />

              <EvervaultCard className="h-full">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-12 w-12 bg-[#00FF00] rounded-full"></div>
                  <h3 className="font-extrabold text-3xl text-[#FFFFFF]">Creative</h3>
                  <p className="text-[#FFFFFF]/80 text-lg">
                    Brand identity & storytelling
                    <br />
                    Films, content & campaigns
                  </p>
                </div>
              </EvervaultCard>
            </div>

            {/* Technical Card */}
            <div className="relative h-[400px] border-2 border-[#FF0000]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-[#FF0000] z-20" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-[#FF0000] z-20" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-[#FF0000] z-20" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-[#FF0000] z-20" />

              <EvervaultCard className="h-full">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-12 w-12 bg-[#FF0000] rounded-full"></div>
                  <h3 className="font-extrabold text-3xl text-[#FFFFFF]">Technical</h3>
                  <p className="text-[#FFFFFF]/80 text-lg">
                    Web, mobile & software
                    <br />
                    AI integration & automation
                  </p>
                </div>
              </EvervaultCard>
            </div>

            {/* Infrastructure Card */}
            <div className="relative h-[400px] border-2 border-[#0000FF]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-[#0000FF] z-20" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-[#0000FF] z-20" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-[#0000FF] z-20" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-[#0000FF] z-20" />

              <EvervaultCard className="h-full">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-12 w-12 bg-[#0000FF] rounded-full text-[rgba(0,0,255,1)]"></div>
                  <h3 className="font-extrabold text-3xl text-[#FFFFFF]">Infrastructure</h3>
                  <p className="text-[#FFFFFF]/80 text-lg">
                    Cloud architecture & security
                    <br />
                    Scalable, reliable systems
                  </p>
                </div>
              </EvervaultCard>
            </div>
          </div>

          <p className="font-semibold text-xl md:text-2xl text-center">
            No handoffs. No coordination tax. No fragmented delivery.
          </p>
        </div>
      </section>

      {/* SECTION 4: VALUE PROPOSITIONS */}
      <section className="bg-[#FFFFFF] text-[#000000] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ItemGroup className="grid md:grid-cols-2 gap-8">
            <Item variant="outline" className="bg-[#FFFFFF] border-2 border-[#000000] hover:border-[#FF0000]">
              <ItemContent>
                <ItemTitle className="font-extrabold text-3xl">Faster Delivery</ItemTitle>
                <ItemDescription className="text-lg">
                  AI-accelerated workflows. 3-5x faster than traditional agencies.
                  <br />
                  <span className="font-semibold">Your MVP in 2-4 months, not 12.</span>
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant="outline" className="bg-[#FFFFFF] border-2 border-[#000000] hover:border-[#00FF00]">
              <ItemContent>
                <ItemTitle className="font-extrabold text-3xl">Lower Cost</ItemTitle>
                <ItemDescription className="text-lg">
                  No office overhead. Lean operations. Maximum efficiency.
                  <br />
                  <span className="font-semibold">Agency-quality systems at 40% less.</span>
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant="outline" className="bg-[#FFFFFF] border-2 border-[#000000] hover:border-[#FF0000]">
              <ItemContent>
                <ItemTitle className="font-extrabold text-3xl">Complete Systems</ItemTitle>
                <ItemDescription className="text-lg">
                  {"We don't build pieces—we build complete systems."}
                  <br />
                  <span className="font-semibold">Brand to infrastructure. Strategy to execution.</span>
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant="outline" className="bg-[#FFFFFF] border-2 border-[#000000] hover:border-[#00FF00]">
              <ItemContent>
                <ItemTitle className="font-extrabold text-3xl">Global Reach</ItemTitle>
                <ItemDescription className="text-lg">
                  Teams in Barcelona, Paris, and Montreal.
                  <br />
                  <span className="font-semibold">Fluent in English, French, Spanish, and Arabic.</span>
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </div>
      </section>

      {/* SECTION 5: SERVICES */}
      <section id="services" className="bg-[#000000] text-[#FFFFFF] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-extrabold text-5xl md:text-7xl mb-16 text-balance">What We Build</h2>

          <ItemGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Item variant="outline" className="bg-[#000000] border border-[#FFFFFF]/20 hover:border-[#00FF00]">
              <ItemContent>
                <ItemTitle className="font-extrabold text-2xl text-[#FFFFFF]">Creative Studio</ItemTitle>
                <ItemDescription className="text-sm text-[#FFFFFF]/60 mb-2">
                  Brand films • Short-form content • Motion graphics • Brand identity
                </ItemDescription>
                <p className="text-[#FFFFFF]/80 italic text-sm">{"Human storytelling. AI-accelerated production."}</p>
              </ItemContent>
            </Item>

            <Item variant="outline" className="bg-[#000000] border border-[#FFFFFF]/20 hover:border-[#FF0000]">
              <ItemContent>
                <ItemTitle className="font-extrabold text-2xl text-[#FFFFFF]">Web & Mobile</ItemTitle>
                <ItemDescription className="text-sm text-[#FFFFFF]/60 mb-2">
                  Marketplaces • SaaS • E-commerce • Mobile apps
                </ItemDescription>
                <p className="text-[#FFFFFF]/80 italic text-sm">{"Platforms that scale. Delivered 3-5x faster."}</p>
              </ItemContent>
            </Item>

            <Item variant="outline" className="bg-[#000000] border border-[#FFFFFF]/20 hover:border-[#FFFFFF]">
              <ItemContent>
                <ItemTitle className="font-extrabold text-2xl text-[#FFFFFF]">Cloud & Infrastructure</ItemTitle>
                <ItemDescription className="text-sm text-[#FFFFFF]/60 mb-2">
                  AWS architecture • Security • DevOps • APIs
                </ItemDescription>
                <p className="text-[#FFFFFF]/80 italic text-sm">{"Systems built to grow with you."}</p>
              </ItemContent>
            </Item>

            <Item variant="outline" className="bg-[#000000] border border-[#FFFFFF]/20 hover:border-[#00FF00]">
              <ItemContent>
                <ItemTitle className="font-extrabold text-2xl text-[#FFFFFF]">AI & Automation</ItemTitle>
                <ItemDescription className="text-sm text-[#FFFFFF]/60 mb-2">
                  Process automation • AI assistants • Custom tools
                </ItemDescription>
                <p className="text-[#FFFFFF]/80 italic text-sm">{"Less manual work. More output."}</p>
              </ItemContent>
            </Item>

            <Item variant="outline" className="bg-[#000000] border border-[#FFFFFF]/20 hover:border-[#FF0000]">
              <ItemContent>
                <ItemTitle className="font-extrabold text-2xl text-[#FFFFFF]">Marketing & Growth</ItemTitle>
                <ItemDescription className="text-sm text-[#FFFFFF]/60 mb-2">
                  SEO • Paid ads • Content strategy • Funnels
                </ItemDescription>
                <p className="text-[#FFFFFF]/80 italic text-sm">{"Measurable growth. Real results."}</p>
              </ItemContent>
            </Item>

            <Item variant="outline" className="bg-[#000000] border border-[#FFFFFF]/20 hover:border-[#FFFFFF]">
              <ItemContent>
                <ItemTitle className="font-extrabold text-2xl text-[#FFFFFF]">Strategy & Consulting</ItemTitle>
                <ItemDescription className="text-sm text-[#FFFFFF]/60 mb-2">
                  Digital roadmaps • Architecture • Technical feasibility
                </ItemDescription>
                <p className="text-[#FFFFFF]/80 italic text-sm">{"Strategy grounded in execution."}</p>
              </ItemContent>
            </Item>
          </ItemGroup>
        </div>
      </section>

      {/* SECTION 6: CASE STUDY */}
      <section id="work" className="bg-[#FFFFFF] text-[#000000] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-4">
            <span className="font-semibold text-[#FF0000] text-sm uppercase tracking-wider">Case Study</span>
          </div>

          <Item variant="default" size="lg" className="border-none p-0">
            <ItemContent>
              <ItemTitle className="font-extrabold text-4xl md:text-6xl lg:text-7xl mb-6 text-balance">
                Natsnap: €150K Wildlife Marketplace
              </ItemTitle>
              <ItemDescription className="text-xl md:text-2xl leading-relaxed mb-8">
                A complete booking platform for wildlife experiences—multi-role system, complex booking engine, Stripe
                payments, multi-language support.
              </ItemDescription>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["Next.js", "React", "NestJS", "PostgreSQL", "Redis", "AWS"].map((tech) => (
                  <span key={tech} className="bg-[#000000] text-[#FFFFFF] px-4 py-2 font-semibold text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <div className="font-extrabold text-3xl mb-1">€150K</div>
                  <div className="text-sm text-[#000000]/60">Value</div>
                </div>
                <div>
                  <div className="font-extrabold text-3xl mb-1">4</div>
                  <div className="text-sm text-[#000000]/60">User Roles</div>
                </div>
                <div>
                  <div className="font-extrabold text-3xl mb-1">2</div>
                  <div className="text-sm text-[#000000]/60">Languages</div>
                </div>
                <div>
                  <div className="font-extrabold text-3xl mb-1">Full</div>
                  <div className="text-sm text-[#000000]/60">Stack</div>
                </div>
              </div>
            </ItemContent>
            <ItemActions>
              <Button variant="ghost" className="font-semibold text-lg p-0 h-auto hover:text-[#FF0000]">
                View Case Study →
              </Button>
            </ItemActions>
          </Item>
        </div>
      </section>

      {/* SECTION 7: COMPARISON */}
      <section className="bg-[#000000] text-[#FFFFFF] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-extrabold text-5xl md:text-7xl mb-16 text-balance">
            MOZAIC vs.
            <br />
            The Alternatives
          </h2>

          <ItemGroup className="space-y-0">
            <Item variant="default" className="border-t border-[#FFFFFF]/20 pt-8 pb-8">
              <ItemContent>
                <ItemTitle className="font-bold text-2xl mb-4 text-[#FFFFFF]">vs. Creative Agencies</ItemTitle>
                <ItemDescription className="text-xl leading-relaxed">
                  <span className="text-[#FF0000]">They build beautiful brands.</span>
                  <br />
                  <span className="text-[#00FF00] font-semibold">We build beautiful brands that actually work.</span>
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant="default" className="border-t border-[#FFFFFF]/20 pt-8 pb-8">
              <ItemContent>
                <ItemTitle className="font-bold text-2xl mb-4 text-[#FFFFFF]">vs. Dev Agencies</ItemTitle>
                <ItemDescription className="text-xl leading-relaxed">
                  <span className="text-[#FF0000]">They build functional systems.</span>
                  <br />
                  <span className="text-[#00FF00] font-semibold">We build functional systems with soul.</span>
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant="default" className="border-t border-[#FFFFFF]/20 pt-8 pb-8">
              <ItemContent>
                <ItemTitle className="font-bold text-2xl mb-4 text-[#FFFFFF]">vs. Marketing Agencies</ItemTitle>
                <ItemDescription className="text-xl leading-relaxed">
                  <span className="text-[#FF0000]">They run campaigns.</span>
                  <br />
                  <span className="text-[#00FF00] font-semibold">
                    We build the systems that make campaigns succeed.
                  </span>
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant="default" className="border-t border-[#FFFFFF]/20 pt-8 pb-8">
              <ItemContent>
                <ItemTitle className="font-bold text-2xl mb-4 text-[#FFFFFF]">vs. Consultancies</ItemTitle>
                <ItemDescription className="text-xl leading-relaxed">
                  <span className="text-[#FF0000]">They deliver strategy decks.</span>
                  <br />
                  <span className="text-[#00FF00] font-semibold">We deliver working systems.</span>
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </div>
      </section>

      {/* SECTION 8: TEAM */}
      <section id="team" className="bg-[#FFFFFF] text-[#000000] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-extrabold text-5xl md:text-7xl mb-6">The Team</h2>

          <p className="font-bold text-2xl md:text-3xl mb-16">Three founders. Complementary expertise. One studio.</p>

          <ItemGroup className="grid md:grid-cols-3 gap-8">
            <Item
              variant="outline"
              className="bg-[#FFFFFF] border-2 border-[#000000] hover:border-[#FF0000] overflow-hidden p-0"
            >
              <ItemMedia>
                <div className="aspect-square bg-[#000000]/5 flex items-center justify-center">
                  <div className="text-6xl font-extrabold text-[#000000]/10">O</div>
                </div>
              </ItemMedia>
              <ItemContent className="p-6">
                <ItemTitle className="font-extrabold text-2xl">Oussama</ItemTitle>
                <p className="font-semibold mb-3">Founder & Business Development</p>
                <ItemDescription className="text-sm text-[#000000]/60 mb-4">Barcelona, Spain</ItemDescription>
                <ItemDescription className="text-sm">
                  Full-stack development • AI integration • Digital strategy
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item
              variant="outline"
              className="bg-[#FFFFFF] border-2 border-[#000000] hover:border-[#00FF00] overflow-hidden p-0"
            >
              <ItemMedia>
                <div className="aspect-square bg-[#000000]/5 flex items-center justify-center">
                  <div className="text-6xl font-extrabold text-[#000000]/10">T</div>
                </div>
              </ItemMedia>
              <ItemContent className="p-6">
                <ItemTitle className="font-extrabold text-2xl">Tawfik</ItemTitle>
                <p className="font-semibold mb-3">Founder & Creative Director</p>
                <ItemDescription className="text-sm text-[#000000]/60 mb-4">Paris, France</ItemDescription>
                <ItemDescription className="text-sm">
                  Brand identity • Visual storytelling • Creative direction
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item
              variant="outline"
              className="bg-[#FFFFFF] border-2 border-[#000000] hover:border-[#FF0000] overflow-hidden p-0"
            >
              <ItemMedia>
                <div className="aspect-square bg-[#000000]/5 flex items-center justify-center">
                  <div className="text-6xl font-extrabold text-[#000000]/10">M</div>
                </div>
              </ItemMedia>
              <ItemContent className="p-6">
                <ItemTitle className="font-extrabold text-2xl">Med Amine</ItemTitle>
                <p className="font-semibold mb-3">Founder & Tech Lead</p>
                <ItemDescription className="text-sm text-[#000000]/60 mb-4">Montreal, Canada</ItemDescription>
                <ItemDescription className="text-sm">Cloud architecture • Security • Infrastructure</ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section id="contact" className="bg-[#000000] text-[#FFFFFF] py-32 md:py-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-extrabold text-5xl md:text-7xl mb-8 text-balance">Ready to Build?</h2>

          <p className="text-xl md:text-2xl leading-relaxed mb-12 text-[#FFFFFF]/80">
            {"Let's discuss your project. No pitch decks. No pressure."}
            <br />
            Just a real conversation about what you need.
          </p>

          <div className="mb-8">
            <Button className="bg-[#FF0000] text-[#FFFFFF] hover:bg-[#FF0000]/90 font-bold rounded-none h-16 px-12 text-xl">
              Start a Conversation
            </Button>
          </div>

          <p className="font-semibold text-lg">hello@mozaic.studio</p>
        </div>
      </section>

      {/* SECTION 10: FOOTER */}
      <footer className="bg-[#000000] text-[#FFFFFF] border-t border-[#FFFFFF]/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fichier%201HD_New_Mozaic_Opt1-ErFwPJ3JuUZludgx8IwNOoiaBDXfQH.png"
              alt="MOZAIC"
              width={150}
              height={50}
              className="h-12 brightness-0 invert w-fit"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="font-semibold text-sm mb-2">
                Creative Vision. Technical Excellence. Infrastructure Strength.
              </p>
              <p className="text-sm text-[#FFFFFF]/60">Barcelona • Paris • Montreal</p>
            </div>

            <ButtonGroup>
              <Button
                variant="ghost"
                className="text-[#FFFFFF] hover:text-[#00FF00] hover:bg-transparent font-semibold"
              >
                <a href="#">LinkedIn</a>
              </Button>
              <Button
                variant="ghost"
                className="text-[#FFFFFF] hover:text-[#00FF00] hover:bg-transparent font-semibold"
              >
                <a href="mailto:hello@mozaic.studio">Email</a>
              </Button>
              <Button
                variant="ghost"
                className="text-[#FFFFFF] hover:text-[#00FF00] hover:bg-transparent font-semibold"
              >
                <a href="#">Instagram</a>
              </Button>
            </ButtonGroup>
          </div>

          <div className="mt-8 pt-8 border-t border-[#FFFFFF]/10">
            <p className="text-sm text-[#FFFFFF]/40">© 2025 MOZAIC Studio</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
