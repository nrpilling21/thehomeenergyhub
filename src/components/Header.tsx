"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);
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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-semibold text-ink tracking-tight hover:opacity-80 transition-opacity"
        >
          Home Energy Hub
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-ink/60 font-medium">
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
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-plum-light/15 py-2 z-50">
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
        <div ref={ctaRef} className="hidden sm:block relative">
          <button
            onClick={() => { setCtaOpen(!ctaOpen); setToolsOpen(false); }}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-medium bg-yellow text-ink hover:brightness-95 transition"
          >
            See how you can save
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={`transition-transform ${ctaOpen ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {ctaOpen && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-plum-light/15 py-2 z-50">
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

        {/* Mobile menu button */}
        <button className="sm:hidden text-ink/60 hover:text-ink">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
