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
  const featured = showFeatured && topic === "all" ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;
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

      {featured && (
        <div className="px-2 pt-2">
          <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-[1fr_1.3fr] gap-2">
            <div className="bg-cream-dark group-hover:bg-sand transition-colors rounded-[6px] p-5 sm:p-8 flex flex-col justify-between min-h-[300px] text-[15px] font-medium tracking-[-0.03em]">
              <p className="text-plum-muted">
                Latest · {featured.topicLabel} · {featured.minutes} min read
              </p>
              <div>
                <h2 className="!text-[1.75rem] sm:!text-[2rem] !leading-[1.12] mb-3 max-w-lg">{featured.title}</h2>
                <p className="text-plum-muted text-[1.0625rem] leading-[1.35] max-w-lg mb-6">{featured.description}</p>
                <p className="text-plum-muted text-[13px]">{featured.date}</p>
              </div>
            </div>
            <div className="relative isolate overflow-hidden rounded-[6px] min-h-[280px] lg:min-h-[420px]">
              {featured.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featured.image.image} alt={featured.image.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              ) : (
                <Sunlight mood="amber" seed={featured.seed} shade={false} />
              )}
            </div>
          </Link>
        </div>
      )}

      <div className="px-2 pt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {rest.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-cream-dark hover:bg-sand transition-colors rounded-[6px] p-4 sm:p-5 min-h-[240px] flex flex-col justify-between text-[15px] font-medium tracking-[-0.03em] leading-[1.3]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="w-9 h-9 shrink-0 rounded-full bg-white flex items-center justify-center">{i + (featured ? 2 : 1)}</span>
              <span className="text-[13px] text-plum-muted text-right">
                {post.topicLabel} · {post.minutes} min
              </span>
            </div>
            <article className="pt-10">
              <h2 className="!text-[1.0625rem] !leading-[1.3] mb-1.5">{post.title}</h2>
              <p className="text-plum-muted mb-4">{post.description}</p>
              <p className="text-plum-muted text-[13px]">{post.date}</p>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
