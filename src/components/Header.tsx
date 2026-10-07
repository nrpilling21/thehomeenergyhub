"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { SunMark } from "@/components/SunWaves";

export function Header() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsOpen(false);
      if (ctaRef.current && !ctaRef.current.contains(e.target as Node)) setCtaOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-[17px] font-medium text-ink hover:opacity-80 transition-opacity"
        >
          <SunMark className="w-6 h-6 text-sun" />
          Home Energy Hub
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-ink/70">
          {/* Tools dropdown */}
          <div ref={toolsRef} className="relative">
            <button
              onClick={() => { setToolsOpen(!toolsOpen); setCtaOpen(false); }}
              className="flex items-center gap-1 hover:text-ink transition-colors"
            >
              Tools
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-cream rounded-xl shadow-lg border border-line py-2 z-50">
                <Link
                  href="/heat-pump-cost-calculator"
                  onClick={() => setToolsOpen(false)}
                  className="block px-4 py-2.5 hover:bg-cream-dark transition-colors"
                >
                  <div className="text-sm font-medium text-ink">Heat Pump Calculator</div>
                  <div className="text-xs text-ink/50 mt-0.5">Get a personalised cost estimate</div>
                </Link>
                <Link
                  href="/ev-charging-cost-calculator"
                  onClick={() => setToolsOpen(false)}
                  className="block px-4 py-2.5 hover:bg-cream-dark transition-colors"
                >
                  <div className="text-sm font-medium text-ink">EV Charging Calculator</div>
                  <div className="text-xs text-ink/50 mt-0.5">See your charging costs and savings</div>
                </Link>
              </div>
            )}
          </div>

          <Link href="/heat-pump-cost-uk" className="hover:text-ink transition-colors">
            Heat Pump Costs
          </Link>
          <Link href="/best-ev-charger-uk" className="hover:text-ink transition-colors">
            EV Chargers
          </Link>
          <Link href="/blog" className="hover:text-ink transition-colors">
            Blog
          </Link>
        </nav>

        {/* CTA with dropdown picker */}
        <div ref={ctaRef} className="hidden md:block relative">
          <button
            onClick={() => { setCtaOpen(!ctaOpen); setToolsOpen(false); }}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-[4px] text-sm font-medium bg-ink text-cream hover:opacity-90 transition"
          >
            See how you can save
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={`transition-transform ${ctaOpen ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {ctaOpen && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-cream rounded-xl shadow-lg border border-line py-2 z-50">
              <Link
                href="/heat-pump-cost-calculator"
                onClick={() => setCtaOpen(false)}
                className="block px-4 py-3 hover:bg-cream-dark transition-colors"
              >
                <div className="text-sm font-semibold text-ink">Heat pump savings</div>
                <div className="text-xs text-ink/50 mt-0.5">Estimate costs, grants, and payback period</div>
              </Link>
              <div className="border-t border-plum-light/10 mx-3" />
              <Link
                href="/ev-charging-cost-calculator"
                onClick={() => setCtaOpen(false)}
                className="block px-4 py-3 hover:bg-cream-dark transition-colors"
              >
                <div className="text-sm font-semibold text-ink">EV charging savings</div>
                <div className="text-xs text-ink/50 mt-0.5">Compare tariffs and savings vs petrol</div>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <button
          className="md:hidden text-ink/70 hover:text-ink"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3.75 7.5h16.5M3.75 16.5h16.5" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <nav className="md:hidden border-t border-line bg-cream px-5 py-4">
          {[
            ["/heat-pump-cost-calculator", "Heat Pump Calculator"],
            ["/ev-charging-cost-calculator", "EV Charging Calculator"],
            ["/smart-meter-savings-calculator", "Smart Meter Calculator"],
            ["/heat-pump-cost-uk", "Heat Pump Costs"],
            ["/best-ev-charger-uk", "EV Chargers"],
            ["/blog", "Blog"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-2xl font-display font-medium border-b border-line last:border-b-0"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
