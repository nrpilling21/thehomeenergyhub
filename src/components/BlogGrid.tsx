"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TOPICS, type TopicId } from "@/lib/topics";

export interface BlogItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  minutes: number;
  topic: TopicId;
  topicLabel: string;
}

/* Blog index with topic filters. Filtering is client-side so the page stays
   statically generated; ?topic=<id> deep-links straight to a filter. */
export function BlogGrid({ items, showFeatured = true }: { items: BlogItem[]; showFeatured?: boolean }) {
  const [topic, setTopic] = useState<TopicId | "all">("all");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && TOPICS.some((x) => x.id === t)) setTopic(t as TopicId);
  }, []);

  const select = (t: TopicId | "all") => {
    setTopic(t);
    const url = new URL(window.location.href);
    if (t === "all") url.searchParams.delete("topic");
    else url.searchParams.set("topic", t);
    window.history.replaceState(null, "", url.toString());
  };

  const filtered = topic === "all" ? items : items.filter((i) => i.topic === topic);
  const counts = Object.fromEntries(TOPICS.map((t) => [t.id, items.filter((i) => i.topic === t.id).length]));

  return (
    <>
      {showFeatured && (
        <div className="px-2 pt-2">
          <div role="tablist" aria-label="Filter posts by topic" className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[{ id: "all" as const, label: "All posts", n: items.length }, ...TOPICS.filter((t) => counts[t.id] > 0).map((t) => ({ id: t.id, label: t.label, n: counts[t.id] }))].map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={topic === t.id}
                onClick={() => select(t.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.02em] transition-colors ${
                  topic === t.id ? "bg-ink text-white" : "bg-cream-dark text-ink hover:bg-sand"
                }`}
              >
                {t.label} <span className={topic === t.id ? "text-white/60" : "text-plum-muted"}>{t.n}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Editorial list: meta on the left, title and summary on the right.
          Text-only, so a new post never needs an image. */}
      <div className="px-5 sm:px-6 pt-10 sm:pt-14 pb-16">
        <ul className="border-t border-line">
          {filtered.map((post, i) => (
            <li key={post.slug} className="border-b border-line">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-3 py-7 sm:py-9 text-[15px] font-medium tracking-[-0.02em]"
              >
                <div className="md:col-span-4 lg:col-span-3 flex md:flex-col gap-x-3 gap-y-1 flex-wrap text-plum-muted">
                  <span className="text-ink">{post.date}</span>
                  <span>{post.topicLabel}</span>
                  <span>{post.minutes} min read</span>
                  {i === 0 && topic === "all" && showFeatured && (
                    <span className="md:mt-2 self-start rounded-full bg-ink text-white text-[12px] px-2.5 py-0.5">Latest</span>
                  )}
                </div>
                <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
                  <h2 className="!text-[1.5rem] sm:!text-[1.875rem] !leading-[1.15] mb-3 max-w-3xl transition-opacity group-hover:opacity-60">
                    {post.title}
                  </h2>
                  <p className="text-plum-muted text-[1.0625rem] leading-[1.4] max-w-2xl">{post.description}</p>
                </div>
                <span aria-hidden className="hidden lg:flex lg:col-span-1 justify-end items-start pt-2 text-[1.25rem] opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
