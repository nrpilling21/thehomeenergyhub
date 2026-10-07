import Link from "next/link";
import { SunWaves, SunMark } from "@/components/SunWaves";

const GROUPS: { title: string; links: [string, string][] }[] = [
  {
    title: "Tools",
    links: [
      ["/heat-pump-cost-calculator", "Heat Pump Cost Calculator"],
      ["/ev-charging-cost-calculator", "EV Charging Cost Calculator"],
      ["/smart-meter-savings-calculator", "Smart Meter Savings Calculator"],
    ],
  },
  {
    title: "Guides",
    links: [
      ["/heat-pump-cost-uk", "Heat Pump Costs UK"],
      ["/solar-panel-costs-uk", "Solar Panel Costs UK"],
      ["/best-ev-charger-uk", "Best EV Charger UK"],
      ["/blog", "Blog"],
    ],
  },
  {
    title: "About",
    links: [["/affiliate-disclosure", "Affiliate Disclosure"]],
  },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden text-cream">
      <SunWaves tone="sun" seed={5} />
      <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-20">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <div className="eyebrow text-cream/70 mb-4">{g.title}</div>
              <div className="space-y-2.5">
                {g.links.map(([href, label]) => (
                  <Link key={href} href={href} className="block text-[15px] font-medium tracking-[-0.02em] text-cream hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
              {g.title === "About" && (
                <p className="mt-4 text-sm text-cream/85 max-w-xs leading-relaxed">
                  Independent advice on home energy upgrades. No sales calls, no nonsense.
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <SunMark className="w-10 h-10 sm:w-14 sm:h-14" />
            <span className="font-display font-medium text-4xl sm:text-6xl tracking-tight">Home Energy Hub</span>
          </div>
          <span className="font-display font-medium text-2xl sm:text-3xl">Independent. Honest. Free.</span>
        </div>
        <div className="mt-10 pt-5 border-t border-cream/25 flex flex-col sm:flex-row justify-between gap-2 eyebrow text-cream/70">
          <span>&copy; {new Date().getFullYear()} Home Energy Hub. All rights reserved.</span>
          <span>thehomeenergyhub.co.uk</span>
        </div>
      </div>
    </footer>
  );
}
