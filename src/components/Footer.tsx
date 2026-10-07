import Link from "next/link";

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
    <footer className="bg-white px-2 pb-2">
      <div className="bg-cream-dark rounded-[6px] px-5 sm:px-6 pt-10 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[15px] font-medium tracking-[-0.02em] mb-24 sm:mb-40">
          <p className="col-span-2 md:col-span-1 max-w-[16rem]">
            Independent advice on home energy upgrades.
            <span className="text-plum-muted"> No sales calls, no nonsense.</span>
          </p>
          {GROUPS.map((g) => (
            <div key={g.title}>
              <p className="text-plum-muted mb-3">{g.title}</p>
              <div className="space-y-1.5">
                {g.links.map(([href, label]) => (
                  <Link key={href} href={href} className="block hover:opacity-60 transition-opacity">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10.5vw] sm:text-[11vw] leading-[1.05] font-medium tracking-[-0.05em] text-ink/90 whitespace-nowrap overflow-hidden">
          Home Energy Hub
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2 text-[13px] font-medium text-plum-muted">
          <span>&copy; {new Date().getFullYear()} Home Energy Hub. All rights reserved.</span>
          <span>Independent. Honest. Free to use.</span>
        </div>
      </div>
    </footer>
  );
}
