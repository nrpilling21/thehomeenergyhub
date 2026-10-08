import type { BlogPost } from "@/lib/blog";
import type { BlogItem } from "@/components/BlogGrid";
import { classify, topicLabel } from "@/lib/topics";

function readTime(text: string): number {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

/* Frontmatter dates are YYYY-MM-DD or DD.MM.YYYY. */
export function formatDate(dateStr: string): string {
  const dot = dateStr.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  const d = new Date(dot ? `${dot[3]}-${dot[2]}-${dot[1]}` : dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/* Serialisable card data for the client-side blog grid. */
export function toBlogItems(posts: BlogPost[]): BlogItem[] {
  return posts.map((p) => {
    const topic = classify(p.slug);
    return {
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: formatDate(p.date),
      minutes: p.content ? readTime(p.content) : 8,
      topic,
      topicLabel: topicLabel(topic),
    };
  });
}
