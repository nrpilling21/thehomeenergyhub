import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-semibold text-sm text-gray-900 mb-3">Tools</div>
            <div className="space-y-2 text-sm text-gray-500">
              <Link href="/heat-pump-cost-calculator" className="block hover:text-gray-700">
                Heat Pump Cost Calculator
              </Link>
              <Link href="/ev-charging-cost-calculator" className="block hover:text-gray-700">
                EV Charging Cost Calculator
              </Link>
            </div>
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-900 mb-3">Guides</div>
            <div className="space-y-2 text-sm text-gray-500">
              <Link href="/heat-pump-cost-uk" className="block hover:text-gray-700">
                Heat Pump Costs UK
              </Link>
              <Link href="/solar-panel-costs-uk" className="block hover:text-gray-700">
                Solar Panel Costs UK
              </Link>
              <Link href="/best-ev-charger-uk" className="block hover:text-gray-700">
                Best EV Charger UK
              </Link>
              <Link href="/blog" className="block hover:text-gray-700">
                Blog
              </Link>
            </div>
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-900 mb-3">About</div>
            <p className="text-sm text-gray-500">
              Independent advice on home energy upgrades. No sales calls, no nonsense.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>&copy; {new Date().getFullYear()} Home Energy Hub. All rights reserved.</span>
          <span>Independent. Honest. Free to use.</span>
        </div>
      </div>
    </footer>
  );
}
