import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-base font-bold text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
        >
          The Home Energy Hub
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-500">
          <Link href="/heat-pump-cost-calculator" className="hover:text-gray-900 transition-colors">
            Calculator
          </Link>
          <Link href="/heat-pump-cost-uk" className="hover:text-gray-900 transition-colors">
            Heat Pump Costs
          </Link>
          <Link href="/ev-charging-cost-calculator" className="hover:text-gray-900 transition-colors">
            EV Calculator
          </Link>
          <Link href="/best-ev-charger-uk" className="hover:text-gray-900 transition-colors">
            EV Chargers
          </Link>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            Blog
          </Link>
        </nav>
        {/* Mobile menu button */}
        <button className="sm:hidden text-gray-500 hover:text-gray-900">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
