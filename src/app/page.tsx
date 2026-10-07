import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SunWaves, SunMark } from "@/components/SunWaves";
import { HouseIllustration } from "@/components/HouseIllustration";

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

const FEATURES = [
  {
    eyebrow: "Heat",
    title: "Find out what a heat pump really costs.",
    body: "Install price, the £7,500 Boiler Upgrade Scheme grant and running costs against your current boiler.",
    href: "/heat-pump-cost-calculator",
    cta: "Run the numbers",
    tone: "sun" as const,
    icon: "heat",
  },
  {
    eyebrow: "Generate",
    title: "Work out if solar pays back on your roof.",
    body: "Honest install costs, realistic payback timescales and what export payments are worth.",
    href: "/solar-panel-costs-uk",
    cta: "Read the solar guide",
    tone: "dusk" as const,
    icon: "sun",
  },
  {
    eyebrow: "Drive",
    title: "Charge your car at home for less.",
    body: "See what home charging costs on your tariff, and which chargers and EV tariffs are worth it.",
    href: "/ev-charging-cost-calculator",
    cta: "Try the EV calculator",
    tone: "sun" as const,
    icon: "plug",
  },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 4);
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden text-cream min-h-[72vh] sm:min-h-[78vh] flex items-end">
        <SunWaves tone="sun" seed={1} animate />
        <div className="relative w-full max-w-6xl mx-auto px-5 pt-32 pb-14 sm:pb-20">
          <p className="eyebrow text-cream/80 mb-6 animate-fadeup">Independent UK energy advice</p>
          <h1 className="!text-[3rem] sm:!text-[4.5rem] lg:!text-[5.5rem] !leading-[1.02] max-w-5xl animate-fadeup">
            Power your home for less.
          </h1>
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p className="text-lg sm:text-xl text-cream/90 max-w-xl leading-relaxed">
              Honest guides and free calculators for heat pumps, solar, EV charging and insulation.
              No sales calls, no nonsense.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/heat-pump-cost-calculator"
                className="inline-flex items-center px-6 py-3.5 rounded-[4px] text-[15px] font-medium bg-cream text-ink hover:bg-white transition"
              >
                Try the heat pump calculator
              </Link>
              <Link
                href="/heat-pump-cost-uk"
                className="inline-flex items-center px-6 py-3.5 rounded-[4px] text-[15px] font-medium border border-cream/50 text-cream hover:bg-cream/10 transition"
              >
                Read the guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof row */}
      <section className="border-b border-line">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-line">
          {[
            ["9", "free guides and calculators"],
            ["£7,500", "heat pump grant, explained"],
            ["0", "sales calls, ever"],
          ].map(([n, label]) => (
            <div key={label} className="px-5 py-6 sm:py-8 flex items-baseline gap-3 border-b sm:border-b-0 border-line last:border-b-0">
              <span className="font-display text-4xl text-sun">{n}</span>
              <span className="eyebrow text-ink/60">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature rows on a hairline grid */}
      <section className="border-b border-line">
        {FEATURES.map((f, i) => (
          <div key={f.href} className="border-b border-line last:border-b-0">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr_1.3fr] md:divide-x divide-line">
              <div className="hidden md:flex p-6 items-start">
                <span className="eyebrow text-ink/40">0{i + 1}</span>
              </div>
              <div className="px-5 py-14 md:py-20 md:px-12 flex flex-col items-center text-center justify-center">
                <span className="eyebrow text-ink/50 mb-4">{f.eyebrow}</span>
                <h2 className="font-display text-3xl sm:text-[2.6rem] leading-[1.08] font-medium max-w-md mb-4">{f.title}</h2>
                <p className="text-ink/60 max-w-md leading-relaxed mb-6">{f.body}</p>
                <Link href={f.href} className="text-[15px] font-medium border-b border-ink/30 hover:border-ink pb-0.5 transition">
                  {f.cta} &rarr;
                </Link>
              </div>
              <div className="relative isolate overflow-hidden min-h-[220px] md:min-h-0 m-4 md:m-0 rounded-2xl md:rounded-none">
                <SunWaves tone={f.tone} seed={i * 2 + 3} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FeatureGlyph kind={f.icon} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
        <div className="text-center mb-12">
          <p className="eyebrow text-ink/50 mb-4">How the Hub works</p>
          <h2 className="font-display text-4xl sm:text-6xl max-w-3xl mx-auto">
            Better decisions, one home at a time.
          </h2>
        </div>
        <div className="bg-cream-dark rounded-2xl grid lg:grid-cols-2 gap-10 p-6 sm:p-12 items-center">
          <ol className="space-y-10">
            {[
              ["Run the numbers", "Our calculators use current UK tariffs and grants to estimate what an upgrade costs and saves in your home.", "/heat-pump-cost-calculator", "Open the calculators"],
              ["Read the honest guide", "Plain-English guides that cover the trade-offs installers skip over, written for UK homes.", "/blog", "Browse the guides"],
              ["Upgrade with confidence", "We compare the products and tariffs worth your money. Some links are affiliate links, which keep the site free.", "/affiliate-disclosure", "How we make money"],
            ].map(([t, b, href, cta], i) => (
              <li key={t} className="max-w-md">
                <p className="eyebrow text-sun-deep mb-3">Step {i + 1}</p>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#4C2806] mb-3">{t}.</h3>
                <p className="text-ink/65 leading-relaxed mb-4">{b}</p>
                <Link href={href} className="inline-flex items-center px-4 py-2.5 rounded-[4px] bg-ink text-cream text-sm font-medium hover:opacity-90 transition">
                  {cta}
                </Link>
              </li>
            ))}
          </ol>
          <HouseIllustration className="w-full max-w-lg mx-auto" />
        </div>
      </section>

      {/* All guides and tools */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24">
        <div className="flex items-end justify-between mb-8 gap-6">
          <h2 className="font-display text-3xl sm:text-4xl font-medium max-w-md leading-tight">Every guide and calculator.</h2>
          <p className="hidden sm:block text-ink/55 max-w-xs text-right">Free to use, independently written, updated for 2026.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {ITEMS.map((it, i) => (
            <Link
              key={it.href}
              href={it.href}
              className="group relative flex flex-col justify-between min-h-[230px] bg-cream-dark rounded-xl p-5 hover:bg-sand transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-full bg-cream flex items-center justify-center text-xs font-medium">{i + 1}</span>
                <span className={`eyebrow px-2 py-1 rounded-[3px] ${it.kind === "Tool" ? "bg-sun text-cream" : "bg-cream text-ink/60"}`}>{it.kind}</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-medium mb-1.5 leading-snug">{it.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{it.desc}</p>
              </div>
              <span className="absolute right-5 bottom-5 opacity-0 group-hover:opacity-100 transition text-sun">&rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest from the blog */}
      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-medium">Latest from the blog.</h2>
            <Link href="/blog" className="eyebrow text-ink/60 hover:text-ink transition">
              All posts &rarr;
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
            {/* Built from content/blog at build time, newest first, so a new post
                appears here on its next deploy with no manual edit. */}
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-cream p-6 hover:bg-cream-dark transition-colors flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <span className="eyebrow text-sun-deep">{formatCategory(post.category)}</span>
                </div>
                <h3 className="font-display text-lg font-medium leading-snug mb-2">{post.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed mb-6">{post.description}</p>
                <span className="mt-auto eyebrow text-ink/40">{formatPostDate(post.date)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="grid md:grid-cols-2">
        <div className="bg-lilac px-5 sm:px-12 py-16 sm:py-20 flex flex-col justify-center">
          <SunMark className="w-8 h-8 mb-8 text-ink" />
          <p className="eyebrow text-ink/60 mb-4">The future is warm</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight max-w-md mb-8">
            Ready to see what your home could save?
          </h2>
          <div>
            <Link href="/heat-pump-cost-calculator" className="inline-flex items-center px-5 py-3 rounded-[4px] bg-ink text-cream text-sm font-medium hover:opacity-90 transition">
              Start with the calculator
            </Link>
          </div>
        </div>
        <div className="relative isolate overflow-hidden min-h-[280px] bg-cream-dark">
          <SunWaves tone="dusk" seed={7} />
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <p className="font-display text-3xl sm:text-[2.75rem] font-medium text-cream text-center leading-[1.1] tracking-[-0.03em] max-w-sm">
              Independent. Honest. Free to use.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureGlyph({ kind }: { kind: string }) {
  const s = { stroke: "#FFF7E9", strokeWidth: 3, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "sun")
    return (
      <svg viewBox="0 0 120 120" className="w-28 h-28">
        <circle cx="60" cy="60" r="20" {...s} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
          const a = (d * Math.PI) / 180;
          return <line key={d} x1={60 + Math.cos(a) * 32} y1={60 + Math.sin(a) * 32} x2={60 + Math.cos(a) * 44} y2={60 + Math.sin(a) * 44} {...s} />;
        })}
      </svg>
    );
  if (kind === "plug")
    return (
      <svg viewBox="0 0 120 120" className="w-28 h-28">
        <rect x="38" y="46" width="44" height="40" rx="12" {...s} />
        <line x1="50" y1="30" x2="50" y2="46" {...s} />
        <line x1="70" y1="30" x2="70" y2="46" {...s} />
        <path d="M60 86 V98 C60 106 70 108 78 104" {...s} />
      </svg>
    );
  return (
    <svg viewBox="0 0 120 120" className="w-28 h-28">
      {[42, 60, 78].map((x) => (
        <path key={x} d={`M${x} 92 C${x - 12} 74 ${x + 12} 58 ${x} 30`} {...s} />
      ))}
    </svg>
  );
}

function formatCategory(category: string): string {
  return category
    .split("-")
    .map((w) => (w === "ev" ? "EV" : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

/* Frontmatter dates are YYYY-MM-DD or DD.MM.YYYY. */
function formatPostDate(dateStr: string): string {
  const dot = dateStr.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  const d = new Date(dot ? `${dot[3]}-${dot[2]}-${dot[1]}` : dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

