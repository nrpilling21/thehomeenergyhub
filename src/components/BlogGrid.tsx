"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sunlight } from "@/components/Sunlight";
import { TOPICS, type TopicId } from "@/lib/topics";

export interface BlogItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  minutes: number;
  topic: TopicId;
  topicLabel: string;
  image: { image: string; alt: string } | null;
  seed: number;
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

      {/* Every post as a wide text-and-photo row */}
      <div className="px-2 pt-2 space-y-2">
        {filtered.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group grid lg:grid-cols-[1fr_1.3fr] gap-2">
            <div className="order-2 lg:order-1 bg-cream-dark group-hover:bg-sand transition-colors rounded-[6px] p-5 sm:p-8 flex flex-col justify-between gap-10 lg:min-h-[340px] text-[15px] font-medium tracking-[-0.03em]">
              <p className="text-plum-muted">
                {i === 0 && topic === "all" && showFeatured ? "Latest · " : ""}
                {post.topicLabel} · {post.minutes} min read
              </p>
              <div>
                <h2 className="!text-[1.5rem] sm:!text-[2rem] !leading-[1.12] mb-3 max-w-lg">{post.title}</h2>
                <p className="text-plum-muted text-[1.0625rem] leading-[1.35] max-w-lg mb-6">{post.description}</p>
                <p className="text-plum-muted text-[13px]">{post.date}</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative isolate overflow-hidden rounded-[6px] aspect-[16/10] lg:aspect-auto lg:min-h-[340px]">
              {post.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.image.image}
                  alt={post.image.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              ) : (
                <Sunlight mood={(["amber", "dusk", "morning"] as const)[post.seed % 3]} seed={post.seed} shade={false} />
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
