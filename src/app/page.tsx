import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Sunlight } from "@/components/Sunlight";

export const metadata: Metadata = {
  title: "Home Energy Hub — Independent UK Energy Advice",
  description:
    "Free, independent guides and tools for heat pumps, EV chargers, solar panels and battery storage. No sales calls, no nonsense.",
  alternates: { canonical: "/" },
};

const ITEMS: { href: string; kind: "Tool" | "Guide"; title: string; desc: string }[] = [
  {
    href: "/heat-pump-cost-calculator",
    kind: "Tool",
    title: "Heat Pump Cost Calculator",
    desc: "Get a personalised estimate in 2 minutes. Covers air and ground source, grants, and running costs.",
  },
  {
    href: "/heat-pump-cost-uk",
    kind: "Guide",
    title: "Heat Pump Costs UK (2026)",
    desc: "What you'll actually pay for an air or ground source heat pump, including the £7,500 BUS grant.",
  },
  {
    href: "/solar-panel-costs-uk",
    kind: "Guide",
    title: "Solar Panel Costs UK (2026)",
    desc: "Honest install costs, payback timescales, and what the SEG export tariff is really worth.",
  },
  {
    href: "/ev-charging-cost-calculator",
    kind: "Tool",
    title: "EV Charging Cost Calculator",
    desc: "Find out what it costs to charge at home, compare tariffs, and see your savings vs petrol.",
  },
  {
    href: "/best-ev-charger-uk",
    kind: "Guide",
    title: "Best Home EV Charger UK",
    desc: "Five chargers compared on the things that matter: smart tariff support, solar, price, and build quality.",
  },
  {
    href: "/home-insulation-guide-uk",
    kind: "Guide",
    title: "Home Insulation Guide UK",
    desc: "Loft, cavity wall and solid wall insulation costs, payback times and what to do first.",
  },
  {
    href: "/smart-meter-guide-uk",
    kind: "Guide",
    title: "Smart Meter Guide UK",
    desc: "SMETS1 vs SMETS2, savings, fixes for common problems, and the right in-home display.",
  },
  {
    href: "/smart-meter-savings-calculator",
    kind: "Tool",
    title: "Smart Meter Savings Calculator",
    desc: "Estimate what a smart meter could save your household — visibility, load shifting and smart-tariff arbitrage.",
  },
  {
    href: "/best-ev-tariff-uk",
    kind: "Guide",
    title: "Best EV Tariff UK 2026",
    desc: "Octopus Go vs Intelligent vs OVO Charge Anytime vs EDF GoElectric — every UK EV tariff compared on rate, hours and total annual cost.",
  },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 4);
  return (
    <div className="bg-white">
      {/* Hero: full-bleed image with a three-part statement */}
      <section className="relative isolate h-[100svh] min-h-[560px] text-white overflow-hidden">
        <Sunlight mood="amber" seed={1} />
        <div className="relative h-full px-5 sm:px-6 flex flex-col">
          <h1 className="sr-only">Home Energy Hub: independent UK energy advice</h1>
          <div aria-hidden className="flex-1 grid grid-cols-1 md:grid-cols-3 content-center gap-1 md:gap-6">
            <p className="text-[2.6rem] sm:text-[2.75rem] font-medium tracking-[-0.03em] leading-[1.05] animate-fadeup">Lower bills.</p>
            <p className="text-[2.6rem] sm:text-[2.75rem] font-medium tracking-[-0.03em] leading-[1.05] md:text-center animate-fadeup">Warmer homes.</p>
            <p className="text-[2.6rem] sm:text-[2.75rem] font-medium tracking-[-0.03em] leading-[1.05] md:text-right animate-fadeup">Honest advice.</p>
          </div>
          <div className="pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-[15px]">
            <p className="max-w-sm text-white/80">Free, independent guides and calculators for UK homes. No sales calls.</p>
            <Link href="/heat-pump-cost-calculator" className="inline-flex self-start sm:self-auto items-center gap-2 rounded-full bg-white text-ink px-5 py-2.5 hover:bg-white/90 transition">
              Try the heat pump calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Intro: short dark heading, grey paragraph */}
      <section className="px-5 sm:px-6 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-16">
          <h2 className="text-[1.375rem] font-medium tracking-[-0.03em] leading-[1.16]">
            Independent advice
            <br className="hidden sm:block" /> for the modern UK home.
          </h2>
          <p className="text-[1.375rem] font-medium tracking-[-0.03em] leading-[1.16] text-plum-muted">
            Heat pumps, solar, batteries, EV charging and insulation can all cut your bills, but most advice comes from
            people selling the kit. We run the numbers properly, explain the trade-offs plainly, and never pass your
            details to installers.
          </p>
        </div>
      </section>

      {/* Mission: three photo tiles linking into the main topics */}
      <section className="px-2">
        <div className="text-center mb-10 px-4">
          <p className="text-[2rem] font-medium tracking-[-0.03em] leading-[1.16]">Our mission.</p>
          <p className="text-[2rem] font-medium tracking-[-0.03em] leading-[1.16] text-plum-muted">Cheaper, warmer homes.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-2">
          {[
            ["/images/heat-pump.jpg", "Air source heat pump outside a timber-clad home", "/heat-pump-cost-uk", "Heat pumps.", "What they really cost to fit and run."],
            ["/images/utility-room.jpg", "Washing machine in a sunlit utility room", "/blog/how-much-does-it-cost-to-run-a-washing-machine-uk", "Running costs.", "What your washing machine costs per wash."],
            ["/images/dining-sunset.jpg", "Dining table by open doors at sunset", "/home-insulation-guide-uk", "A warmer home.", "Insulation that pays for itself first."],
          ].map(([src, alt, href, t, d]) => (
            <Link key={href} href={href} className="group relative isolate overflow-hidden rounded-[6px] aspect-[4/3] sm:aspect-[4/5] text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-[15px] font-medium tracking-[-0.03em]">
                <p>{t}</p>
                <p className="text-white/70">{d}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Problem statement on a stone panel */}
      <section className="px-2 pt-2">
        <div className="bg-cream-dark rounded-[6px] grid md:grid-cols-2 gap-6 md:gap-16 px-6 sm:px-12 pt-10 pb-24 sm:pb-40">
          <h2 className="text-[1.375rem] font-medium tracking-[-0.03em] leading-[1.16] md:pl-[25%]">
            Energy advice is usually
            <br className="hidden sm:block" /> built to sell you something.
          </h2>
          <p className="text-[1.375rem] font-medium tracking-[-0.03em] leading-[1.16] text-plum-muted">
            Comparison sites and installers earn more when you spend more. We earn a little from some product links and
            say so on every page, but the numbers come first. Here is where we think the biggest wins are.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-2 mt-2">
          {[
            ["Lower bills.", "Cut what you pay for heat, power and driving.", "/images/thermostat.jpg", "Smart thermostat set to 21 degrees"],
            ["Lower carbon.", "Shrink your home's impact without the guilt trip.", "/images/solar-panels.jpg", "Rooftop solar panels at sunset"],
            ["A warmer home.", "Fewer draughts, steadier heat, better air.", "/images/couple-blankets.jpg", "Couple wrapped in blankets with mugs of tea"],
          ].map(([t, d, src, alt], i) => (
            <div key={t} className="bg-cream-dark rounded-[6px] p-2 flex flex-col">
              <div className="relative overflow-hidden rounded-[4px] aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute top-2 left-2 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[15px] font-medium">{i + 1}</span>
              </div>
              <div className="p-2 sm:p-3 pt-10 sm:pt-14">
                <p className="text-[15px] font-medium tracking-[-0.03em]">{t}</p>
                <p className="text-[15px] font-medium tracking-[-0.03em] text-plum-muted max-w-[16rem]">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guides and tools */}
      <section className="px-2 pt-28 sm:pt-36">
        <h2 className="text-center text-[2rem] font-medium tracking-[-0.03em] leading-[1.16] mb-10 px-4">
          Start with
          <br /> the numbers.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {ITEMS.map((it, i) => (
            <Link
              key={it.href}
              href={it.href}
              className="group bg-cream-dark hover:bg-sand transition-colors rounded-[6px] p-4 sm:p-5 min-h-[220px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[15px] font-medium">{i + 1}</span>
                <span className="text-[13px] font-medium text-plum-muted">{it.kind}</span>
              </div>
              <div>
                <p className="text-[15px] font-medium tracking-[-0.03em]">{it.title}.</p>
                <p className="text-[15px] font-medium tracking-[-0.03em] text-plum-muted max-w-sm">{it.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog as a quiet list */}
      <section className="px-5 sm:px-6 pt-28 sm:pt-36 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 mb-10">
            <h2 className="text-[1.375rem] font-medium tracking-[-0.03em] leading-[1.16]">Latest from the blog.</h2>
            <p className="text-[1.375rem] font-medium tracking-[-0.03em] leading-[1.16] text-plum-muted">
              New guides every week on running costs, upgrades and getting more from your tariff.{" "}
              <Link href="/blog" className="text-ink underline underline-offset-4 decoration-1">See all posts</Link>
            </p>
          </div>
          {/* Built from content/blog at build time, newest first, so a new post
              appears here on its next deploy with no manual edit. */}
          <div className="border-t border-line">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_9rem] gap-2 md:gap-16 py-5 border-b border-line text-[15px] font-medium tracking-[-0.02em]"
              >
                <span className="group-hover:opacity-60 transition-opacity">{post.title}</span>
                <span className="text-plum-muted hidden md:block">{post.description}</span>
                <span className="text-plum-muted md:text-right whitespace-nowrap">{formatPostDate(post.date)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing image CTA */}
      <section className="px-2 pb-2">
        <div className="relative isolate overflow-hidden rounded-[6px] h-[80vh] min-h-[460px] text-white">
          <Sunlight mood="amber" seed={7} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-[2.75rem] font-medium tracking-[-0.03em] leading-[1.05] mb-8">
              See what your home
              <br /> could save.
            </p>
            <Link href="/heat-pump-cost-calculator" className="rounded-full bg-white text-ink px-5 py-2.5 text-[15px] font-medium hover:bg-white/90 transition">
              Start with the calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Frontmatter dates are YYYY-MM-DD or DD.MM.YYYY. */
function formatPostDate(dateStr: string): string {
  const dot = dateStr.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  const d = new Date(dot ? `${dot[3]}-${dot[2]}-${dot[1]}` : dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

