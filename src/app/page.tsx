import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home Energy Hub  - Independent UK Energy Advice",
  description:
    "Free, independent guides and tools for heat pumps, EV chargers, solar panels and battery storage. No sales calls, no nonsense.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-5">
      {/* Hero */}
      <section className="py-20 sm:py-28 text-center">
        <p className="font-mono text-sm tracking-widest text-plum-muted uppercase mb-6">
          Independent UK Energy Advice
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-ink leading-[1.1] mb-5">
          Honest advice on<br />home energy upgrades
        </h1>
        <p className="text-ink/60 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Independent UK guides and calculators for heat pumps, EV chargers, solar panels and battery
          storage. Free to use, no sales calls.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/heat-pump-cost-calculator"
            className="inline-flex items-center px-7 py-3.5 rounded-xl text-base font-medium bg-ink text-cream-dark hover:opacity-90 transition"
          >
            Try the heat pump calculator
          </Link>
          <Link
            href="/heat-pump-cost-uk"
            className="inline-flex items-center px-7 py-3.5 rounded-xl text-base font-medium border border-ink/15 text-ink hover:border-ink/30 transition"
          >
            Read guides
          </Link>
        </div>
      </section>

      {/* Cards - 6-card grid covering tools and pillar guides */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
        <Card
          href="/heat-pump-cost-calculator"
          icon="calc"
          label="Tool"
          title="Heat Pump Cost Calculator"
          desc="Get a personalised estimate in 2 minutes. Covers air and ground source, grants, and running costs."
          bgColor="bg-yellow"
        />
        <Card
          href="/heat-pump-cost-uk"
          icon="article"
          label="Guide"
          title="Heat Pump Costs UK (2026)"
          desc="What you'll actually pay for an air or ground source heat pump, including the £7,500 BUS grant."
          bgColor="bg-cream-dark"
        />
        <Card
          href="/solar-panel-costs-uk"
          icon="article"
          label="Guide"
          title="Solar Panel Costs UK (2026)"
          desc="Honest install costs, payback timescales, and what the SEG export tariff is really worth."
          bgColor="bg-yellow"
        />
        <Card
          href="/ev-charging-cost-calculator"
          icon="calc"
          label="Tool"
          title="EV Charging Cost Calculator"
          desc="Find out what it costs to charge at home, compare tariffs, and see your savings vs petrol."
          bgColor="bg-cream-dark"
        />
        <Card
          href="/best-ev-charger-uk"
          icon="article"
          label="Guide"
          title="Best Home EV Charger UK"
          desc="Five chargers compared on the things that matter: smart tariff support, solar, price, and build quality."
          bgColor="bg-yellow"
        />
        <Card
          href="/home-insulation-guide-uk"
          icon="article"
          label="Guide"
          title="Home Insulation Guide UK"
          desc="Loft, cavity wall and solid wall insulation costs, payback times and what to do first."
          bgColor="bg-cream-dark"
        />
      </section>

      {/* Latest from the blog */}
      <section className="pb-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl sm:text-3xl text-ink">Latest from the blog</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-ink/60 hover:text-ink transition"
          >
            All posts &rarr;
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <BlogCard
            href="/blog/best-smart-meter-in-home-display-uk"
            category="Smart Meters"
            date="28 April 2026"
            title="Best Smart Meter In-Home Display UK 2026"
            desc="Seven IHDs compared on accuracy, screen quality and what they actually show."
          />
          <BlogCard
            href="/blog/smart-meter-problems-uk"
            category="Smart Meters"
            date="21 April 2026"
            title="Smart Meter Problems UK: 12 Common Issues and How to Fix Them"
            desc="From blank IHDs to switching faults — diagnose and resolve the most common smart meter issues."
          />
          <BlogCard
            href="/blog/cavity-wall-insulation-cost-uk"
            category="Insulation"
            date="10 April 2026"
            title="Cavity Wall Insulation Cost UK (2026)"
            desc="Bungalows, 3-bed semis, removal cost and what your mortgage lender needs to know."
          />
          <BlogCard
            href="/blog/draught-proofing-cost-uk"
            category="Insulation"
            date="10 April 2026"
            title="Draught Proofing Cost UK"
            desc="The cheapest energy upgrade you can make — costs, savings and where to start."
          />
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-plum-light/30 py-14 text-center">
        <div className="flex items-center justify-center gap-8 text-base text-ink/50 font-medium">
          <span>Independent</span>
          <span className="w-1 h-1 bg-plum-light rounded-full" />
          <span>No sales pressure</span>
          <span className="w-1 h-1 bg-plum-light rounded-full" />
          <span>Free to use</span>
        </div>
      </section>
    </div>
  );
}

function Card({
  href,
  icon,
  label,
  title,
  desc,
  bgColor,
}: {
  href: string;
  icon: "calc" | "article";
  label: string;
  title: string;
  desc: string;
  bgColor: string;
}) {
  return (
    <Link
      href={href}
      className={`group block ${bgColor} rounded-2xl p-6 hover:shadow-md transition-all`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center text-ink/50 group-hover:bg-white/70 transition-colors">
          {icon === "calc" ? (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <path d="M8 6h8M8 14h2M14 14h2M8 18h2M14 18h2M8 10h8" />
            </svg>
          ) : (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM7 7h10M7 12h10M7 17h6" />
            </svg>
          )}
        </div>
        <span className="font-mono text-xs tracking-wider text-ink/40 uppercase">{label}</span>
      </div>
      <h3 className="font-display font-semibold text-lg text-ink mb-1.5">{title}</h3>
      <p className="text-base text-ink/60 leading-relaxed">{desc}</p>
    </Link>
  );
}

function BlogCard({
  href,
  category,
  date,
  title,
  desc,
}: {
  href: string;
  category: string;
  date: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group block bg-cream-dark rounded-2xl p-5 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block px-2 py-0.5 rounded-md bg-yellow text-ink/70 font-mono text-xs tracking-wider uppercase">
          {category}
        </span>
        <span className="font-mono text-xs text-ink/40">{date}</span>
      </div>
      <h3 className="font-display font-semibold text-base text-ink mb-1.5 leading-snug">{title}</h3>
      <p className="text-sm text-ink/60 leading-relaxed">{desc}</p>
    </Link>
  );
}
