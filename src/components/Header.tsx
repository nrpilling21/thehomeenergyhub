"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CALCULATORS, TOPICS, type TopicId } from "@/lib/topics";

export interface NavPost {
  href: string;
  title: string;
  topic: TopicId;
}
export interface SearchItem {
  href: string;
  title: string;
  kind: string;
}

type Menu = "guides" | "calculators" | null;

/* Topic-led navigation: Guides (mega menu by topic) · Running costs · Blog,
   with search and a "Free calculators" pill that opens the calculators panel. Floats in white
   over the homepage hero, solid everywhere else. */
export function Header({ latest, searchIndex }: { latest: NavPost[]; searchIndex: SearchItem[] }) {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";
  const [open, setOpen] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Escape closes menus; click outside closes dropdowns; "/" or Cmd/Ctrl+K opens search.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
      const typing = (e.target as HTMLElement)?.closest("input, textarea, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(null);
        setSearchOpen(true);
      }
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock page scroll behind full-screen layers.
  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
  }, [mobileOpen, searchOpen]);

  const overlay = isHome && !scrolled && !open && !mobileOpen;
  const guideHrefs = TOPICS.flatMap((t) => t.guides.map((g) => g.href)).filter((h) => h !== "/running-costs");
  const section = useMemo(() => {
    if (pathname.startsWith("/blog")) return "blog";
    if (pathname.startsWith("/running-costs")) return "running";
    if (CALCULATORS.some((c) => pathname.startsWith(c.href))) return "calculators";
    if (guideHrefs.some((h) => pathname.startsWith(h)) || pathname === "/affiliate-disclosure") return "guides";
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const tab = (id: string) =>
    `relative py-1 transition-opacity hover:opacity-60 ${
      section === id ? "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-current" : ""
    }`;

  return (
    <>
      <header
        ref={navRef}
        className={`${isHome ? "fixed inset-x-0" : "sticky"} top-0 z-50 transition-colors duration-300 ${
          overlay ? "bg-transparent text-white" : "bg-white/95 backdrop-blur-md text-ink border-b border-line"
        }`}
      >
        <div className="px-5 sm:px-6 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
          <Link href="/" className="justify-self-start text-[16px] font-medium tracking-[-0.03em] hover:opacity-70 transition-opacity">
            Home Energy Hub
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-9 text-[15px]">
            <button
              type="button"
              className={`${tab("guides")} flex items-center gap-1`}
              aria-expanded={open === "guides"}
              aria-controls="menu-guides"
              onClick={() => setOpen(open === "guides" ? null : "guides")}
            >
              Guides <Chevron up={open === "guides"} />
            </button>
            <Link href="/running-costs" className={tab("running")} aria-current={section === "running" ? "page" : undefined}>
              Running costs
            </Link>
            <Link href="/blog" className={tab("blog")} aria-current={section === "blog" ? "page" : undefined}>
              Blog
            </Link>
          </nav>

          <div className="col-start-3 justify-self-end flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setOpen(null);
                setSearchOpen(true);
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-60 transition-opacity"
              aria-label="Search the site"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
            <button
              type="button"
              aria-expanded={open === "calculators"}
              aria-controls="menu-calculators"
              onClick={() => setOpen(open === "calculators" ? null : "calculators")}
              className={`hidden lg:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium transition ${
                overlay ? "bg-white text-ink hover:bg-white/90" : "bg-ink text-white hover:opacity-90"
              } ${section === "calculators" ? "ring-2 ring-offset-2 ring-ink/20" : ""}`}
            >
              Free calculators <Chevron up={open === "calculators"} />
            </button>
            <button
              type="button"
              className="lg:hidden w-9 h-9 flex items-center justify-center"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3.75 8.5h16.5M3.75 15.5h16.5" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Guides mega menu */}
        {open === "guides" && (
          <div id="menu-guides" className="hidden lg:block absolute inset-x-0 top-full bg-white text-ink border-b border-line shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)]">
            <div className="px-2 py-2 grid grid-cols-[1fr_1fr_1fr_0.9fr] gap-2">
              {TOPICS.map((t) => {
                const posts = latest.filter((p) => p.topic === t.id).slice(0, 2);
                return (
                  <div key={t.id} className="bg-cream-dark rounded-[6px] p-5 flex flex-col gap-4 text-[14px] font-medium tracking-[-0.02em]">
                    <div>
                      <p className="text-[15px]">{t.label}.</p>
                      <p className="text-plum-muted">{t.blurb}</p>
                    </div>
                    <ul className="space-y-1.5">
                      {t.guides.map((g) => (
                        <li key={g.href}>
                          <Link href={g.href} className="hover:opacity-60">
                            {g.label} &rarr;
                          </Link>
                        </li>
                      ))}
                      {t.calculator && (
                        <li>
                          <Link href={t.calculator.href} className="hover:opacity-60">
                            {t.calculator.label} &rarr;
                          </Link>
                        </li>
                      )}
                    </ul>
                    {posts.length > 0 && (
                      <ul className="mt-auto pt-3 border-t border-line space-y-1.5">
                        {posts.map((p) => (
                          <li key={p.href}>
                            <Link href={p.href} className="text-plum-muted hover:text-ink line-clamp-1">
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
              <Link
                href="/blog"
                className="col-start-4 row-start-1 row-span-2 relative overflow-hidden rounded-[6px] min-h-[320px] text-white group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/couple-blankets.jpg" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/0" />
                <div className="absolute bottom-0 p-5 text-[15px] font-medium tracking-[-0.03em]">
                  <p>Every guide.</p>
                  <p className="text-white/70">Browse the blog by topic &rarr;</p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Calculators menu */}
        {open === "calculators" && (
          <div id="menu-calculators" className="hidden lg:block absolute inset-x-0 top-full bg-white text-ink border-b border-line shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)]">
            <div className="px-2 py-2 grid grid-cols-3 gap-2">
              {CALCULATORS.map((c, i) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="bg-cream-dark hover:bg-sand transition-colors rounded-[6px] p-5 min-h-[170px] flex flex-col justify-between text-[15px] font-medium tracking-[-0.03em]"
                >
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">{i + 1}</span>
                  <span>
                    <span className="block">{c.label}.</span>
                    <span className="block text-plum-muted">{c.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Full-screen mobile menu */}
      {mobileOpen && (
        <div id="menu-mobile" className="lg:hidden fixed inset-0 top-16 z-40 bg-white text-ink overflow-y-auto">
          <nav aria-label="Mobile" className="px-5 pb-16 pt-2">
            <details className="group border-b border-line">
              <summary className="flex items-center justify-between py-4 text-[1.75rem] font-medium tracking-[-0.03em] list-none cursor-pointer">
                Guides <Chevron up={false} big />
              </summary>
              <div className="pb-5 space-y-5">
                {TOPICS.map((t) => (
                  <div key={t.id} className="text-[15px] font-medium tracking-[-0.02em]">
                    <p className="text-plum-muted mb-1.5">{t.label}</p>
                    {t.guides.map((g) => (
                      <Link key={g.href} href={g.href} className="block py-1">
                        {g.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </details>
            <details className="group border-b border-line" open>
              <summary className="flex items-center justify-between py-4 text-[1.75rem] font-medium tracking-[-0.03em] list-none cursor-pointer">
                Calculators <Chevron up={false} big />
              </summary>
              <div className="pb-5 space-y-3">
                {CALCULATORS.map((c) => (
                  <Link key={c.href} href={c.href} className="block text-[15px] font-medium tracking-[-0.02em]">
                    {c.label}
                    <span className="block text-plum-muted">{c.desc}</span>
                  </Link>
                ))}
              </div>
            </details>
            <Link href="/running-costs" className="block py-4 border-b border-line text-[1.75rem] font-medium tracking-[-0.03em]">
              Running costs
            </Link>
            <Link href="/blog" className="block py-4 border-b border-line text-[1.75rem] font-medium tracking-[-0.03em]">
              Blog
            </Link>
          </nav>
        </div>
      )}

      {searchOpen && <SearchOverlay items={searchIndex} onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function Chevron({ up, big = false }: { up: boolean; big?: boolean }) {
  const s = big ? 20 : 12;
  return (
    <svg
      width={s}
      height={s}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden
      className={`transition-transform ${up ? "rotate-180" : ""} ${big ? "group-open:rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function SearchOverlay({ items, onClose }: { items: SearchItem[]; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => inputRef.current?.focus(), []);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items.filter((i) => i.kind !== "Post").slice(0, 8);
    return items
      .map((i) => {
        const hay = `${i.title} ${i.kind}`.toLowerCase();
        const score = terms.every((t) => hay.includes(t)) ? (i.kind === "Post" ? 1 : 2) : 0;
        return { i, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.i);
  }, [q, items]);

  useEffect(() => setActive(0), [q]);

  return (
    <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-start justify-center px-3 pt-[10vh]" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="w-full max-w-xl bg-white text-ink rounded-[8px] shadow-2xl overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 border-b border-line">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-plum-muted shrink-0">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                window.location.href = results[active].href;
              }
            }}
            placeholder="Search guides, calculators and posts"
            className="w-full py-4 text-[17px] font-medium tracking-[-0.02em] outline-none placeholder:text-plum-muted"
            aria-label="Search"
          />
          <kbd className="hidden sm:block text-[12px] text-plum-muted border border-line rounded px-1.5 py-0.5">Esc</kbd>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-6 text-[15px] text-plum-muted">No matches. Try &ldquo;washing machine&rdquo; or &ldquo;heat pump&rdquo;.</li>
          ) : (
            results.map((r, i) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  onClick={onClose}
                  onMouseEnter={() => setActive(i)}
                  className={`flex items-center justify-between gap-4 rounded-[6px] px-3 py-2.5 text-[15px] font-medium tracking-[-0.02em] ${
                    i === active ? "bg-cream-dark" : ""
                  }`}
                >
                  <span className="truncate">{r.title}</span>
                  <span className="text-[13px] text-plum-muted shrink-0">{r.kind}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
