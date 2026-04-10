import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-cream-dark mt-20">
      <div className="max-w-5xl mx-auto px-5 pt-12 pb-10">
        <div className="border-t border-plum-light/40 mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="font-display font-semibold text-base text-ink mb-4">Tools</div>
            <div className="space-y-3 text-base text-ink/60">
              <Link href="/heat-pump-cost-calculator" className="block hover:text-ink transition-colors">
                Heat Pump Cost Calculator
              </Link>
              <Link href="/ev-charging-cost-calculator" className="block hover:text-ink transition-colors">
                EV Charging Cost Calculator
              </Link>
            </div>
          </div>
          <div>
            <div className="font-display font-semibold text-base text-ink mb-4">Guides</div>
            <div className="space-y-3 text-base text-ink/60">
              <Link href="/heat-pump-cost-uk" className="block hover:text-ink transition-colors">
                Heat Pump Costs UK
              </Link>
              <Link href="/best-ev-charger-uk" className="block hover:text-ink transition-colors">
                Best EV Charger UK
              </Link>
              <Link href="/blog" className="block hover:text-ink transition-colors">
                Blog
              </Link>
            </div>
          </div>
          <div>
            <div className="font-display font-semibold text-base text-ink mb-4">About</div>
            <p className="text-base text-ink/60 leading-relaxed">
              Independent advice on home energy upgrades. No sales calls, no nonsense.
            </p>
          </div>
        </div>

        <div className="border-t border-plum-light/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink/40">
          <span>&copy; {new Date().getFullYear()} Home Energy Hub. All rights reserved.</span>
          <span>Independent. Honest. Free to use.</span>
        </div>
      </div>
    </footer>
  );
}
