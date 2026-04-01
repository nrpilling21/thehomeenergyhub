import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home Energy Hub \u2014 Independent UK Energy Advice",
  description:
    "Free, independent guides and tools for heat pumps, EV chargers, solar panels and battery storage. No sales calls, no nonsense.",
};

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-5">
      {/* Hero */}
      <section className="py-16 sm:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          Honest advice on home energy upgrades
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          Independent UK guides and calculators for heat pumps, EV chargers, solar panels and battery
          storage. Free to use, no sales calls.
        </p>
        <Link
          href="/heat-pump-cost-calculator"
          className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          Try the heat pump calculator
        </Link>
      </section>

      {/* Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
        <Card href="/heat-pump-cost-calculator" icon="calc" title="Heat Pump Cost Calculator" desc="Get a personalised estimate in 2 minutes. Covers air and ground source, grants, and running costs." />
        <Card href="/heat-pump-cost-uk" icon="article" title="Heat Pump Costs UK (2026)" desc="What you'll actually pay for an air or ground source heat pump, including the \u00a37,500 BUS grant." />
        <Card href="/solar-panel-costs-uk" icon="article" title="Solar Panel Costs UK (2026)" desc="Full cost breakdown for 3–6kW systems, savings calculations, payback periods, and battery storage options." />
        <Card href="/ev-charging-cost-calculator" icon="calc" title="EV Charging Cost Calculator" desc="Find out what it costs to charge at home, compare tariffs, and see your savings vs petrol." />
        <Card href="/best-ev-charger-uk" icon="article" title="Best Home EV Charger UK" desc="Five chargers compared on the things that matter: smart tariff support, solar, price, and build quality." />
      </section>

      {/* Trust bar */}
      <section className="border-t border-gray-100 py-12 text-center">
        <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
          <span>Independent</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>No sales pressure</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>Free to use</span>
        </div>
      </section>
    </div>
  );
}

function Card({ href, icon, title, desc }: { href: string; icon: "calc" | "article"; title: string; desc: string }) {
  return (
    <Link href={href} className="group block border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-colors">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center mb-4 text-gray-500 group-hover:bg-gray-200 transition-colors">
        {icon === "calc" ? (
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 14h2M14 14h2M8 18h2M14 18h2M8 10h8" /></svg>
        ) : (
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM7 7h10M7 12h10M7 17h6" /></svg>
        )}
      </div>
      <h3 className="font-semibold text-sm text-gray-900 mb-1.5">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </Link>
  );
}
