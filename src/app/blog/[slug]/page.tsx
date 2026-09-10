import { getAllPosts, getPostBySlug, toIsoDateTime } from '@/lib/blog';
import { renderChart } from '@/lib/charts';
import { renderHero } from '@/lib/hero';
import { getPostCta } from '@/lib/postCta';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { EnergyTariffCTA } from '@/components/EnergyTariffCTA';

const SITE_URL = 'https://www.thehomeenergyhub.co.uk';
const SITE_NAME = 'The Home Energy Hub';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Not Found' };

  const url = `${SITE_URL}/blog/${params.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${params.slug}` },
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

const AFFILIATE_HOSTS = ['amazon.co.uk', 'amazon.com', 'amzn.to', 'awin1.com', 'zenaps.com'];

/* Build the rel/target attributes for a link in post content.
  — Affiliate links  -> rel="sponsored nofollow noopener noreferrer" target="_blank"
  — Other externals  -> rel="noopener noreferrer" target="_blank"
  — Internal links   -> no extra attributes */
function linkAttributes(href: string): string {
  if (!/^https?:\/\//i.test(href)) return '';
  let host = '';
  try {
    host = new URL(href).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return ' target="_blank" rel="noopener noreferrer"';
  }
  if (host.endsWith('thehomeenergyhub.co.uk')) return '';
  const isAffiliate = AFFILIATE_HOSTS.some(h => host === h || host.endsWith('.' + h));
  const rel = isAffiliate ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer';
  return ` target="_blank" rel="${rel}"`;
}

/* Simple markdown to HTML (headings, paragraphs, bold, links, lists, tables, blockquotes) */
function markdownToHtml(md: string): string {
  return md
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';

      /* Charts: a `[chart:<id>]` line is replaced with generated SVG whose
         figures are computed from the rate constants, so a chart can never
         disagree with the prose around it. Unknown ids render nothing. */
      const chartMatch = block.match(/^\[chart:([a-z0-9-]+)\]$/);
      if (chartMatch) return renderChart(chartMatch[1]) ?? '';

      // Headings
      if (block.startsWith('### ')) return `<h3 class="text-lg font-display font-semibold mt-8 mb-3">${block.slice(4)}</h3>`;
      if (block.startsWith('## ')) return `<h2 class="text-xl font-display font-semibold mt-10 mb-4">${block.slice(3)}</h2>`;

      // Inline-formatting helper (bold + links).
      // External links get rel/target; affiliate links are additionally marked
      // rel="sponsored nofollow" per Google's link-spam policy and the
      // Amazon Associates / Awin programme rules.
      const renderInline = (s: string) => s
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, (_m, label: string, href: string) => {
          const attrs = linkAttributes(href);
          return `<a href="${href}" class="text-ink underline"${attrs}>${label}</a>`;
        });

      const lines = block.split('\n');

      // GFM-style tables: header row | separator | body rows
      if (lines.length >= 2 && lines[0].startsWith('|') && /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(lines[1])) {
        const splitRow = (row: string) => row.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(c => c.trim());
        const headers = splitRow(lines[0]);
        const bodyRows = lines.slice(2).filter(l => l.startsWith('|')).map(splitRow);
        const thead = `<thead><tr>${headers.map(h => `<th class="text-left px-3 py-2 border-b border-ink/15 font-semibold text-ink">${renderInline(h)}</th>`).join('')}</tr></thead>`;
        const tbody = `<tbody>${bodyRows.map(r => `<tr>${r.map(c => `<td class="px-3 py-2 border-b border-ink/10 text-ink/75 align-top">${renderInline(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
        return `<div class="overflow-x-auto mb-6"><table class="w-full text-sm border-collapse">${thead}${tbody}</table></div>`;
      }

      // Blockquotes: every line starts with > 
      if (lines.every(l => l.startsWith('>'))) {
        const inner = lines.map(l => l.replace(/^>\s?/, '')).join(' ');
        return `<blockquote class="border-l-4 border-ink/20 pl-4 italic text-ink/60 my-6">${renderInline(inner)}</blockquote>`;
      }

      // Ordered lists (numbered) — must come before paragraph fallback
      if (block.match(/^\d+\. /)) {
        const items = block.split('\n').filter(l => l.match(/^\d+\. /)).map(l => {
          const text = renderInline(l.replace(/^\d+\. /, ''));
          return `<li class="mb-1">${text}</li>`;
        });
        return `<ol class="list-decimal pl-6 mb-4 text-ink/65 leading-relaxed">${items.join('')}</ol>`;
      }

      // Unordered lists
      if (block.match(/^[-*] /m)) {
        const items = block.split('\n').filter(l => l.match(/^[-*] /)).map(l => {
          const text = renderInline(l.replace(/^[-*] /, ''));
          return `<li class="mb-1">${text}</li>`;
        });
        return `<ul class="list-disc pl-6 mb-4 text-ink/65 leading-relaxed">${items.join('')}</ul>`;
      }

      // Paragraph with inline formatting
      const html = renderInline(block);

      return `<p class="text-ink/65 leading-relaxed mb-4">${html}</p>`;
    })
    .join('\n');
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const contentHtml = markdownToHtml(post.content);

  /* Smart-meter cluster detection: tag-based so future posts are covered
     automatically without touching this file. */
  const isSmartMeterPost = (post.tags || []).some(t =>
    /smart meter|in-home display|ihd|smets/i.test(t)
  );
  const url = `${SITE_URL}/blog/${params.slug}`;
  const cta = getPostCta(post.slug, post.tags);

  // BlogPosting JSON-LD - emitted on every blog post
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    /* The generated Open Graph card doubles as the Article image. Google's
       Rich Results Test reports a missing `image` without it, and article
       rich results are much less likely to be granted. Stable URL (no cache
       key) so the value does not churn between builds. */
    image: [`${url}/opengraph-image`],
    datePublished: toIsoDateTime(post.date),
    dateModified: toIsoDateTime(post.date),
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    keywords: post.tags.join(', '),
    inLanguage: 'en-GB',
    articleSection: post.category.replace('-', ' '),
  };

  // Breadcrumb JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  // JSON-LD FAQ schema (kept from original - only emitted if post has faq frontmatter)
  const faqSchema = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <article className="max-w-3xl mx-auto px-5 py-12">
        <p className="font-mono text-xs tracking-widest text-plum-muted uppercase mb-4">{post.category.replace('-', ' ')}</p>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-ink/55">{post.date}</span>
          <span className="text-xs text-ink/55">by {post.author}</span>
        </div>

        <h1 className="text-3xl font-display font-normal text-ink mb-4 leading-tight">{post.title}</h1>
        <p className="text-lg text-ink/60 mb-10 leading-relaxed">{post.description}</p>

        {/* Generated topic band. Geometric rather than photographic, and built
            in code, so there is no stock licence to track and no image file to
            maintain — see src/lib/hero.ts. */}
        <div
          dangerouslySetInnerHTML={{
            __html: renderHero(post.slug, post.tags, `${post.title} — The Home Energy Hub`),
          }}
        />

        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

        {/* Tariff CTA on the smart-meter cluster — these posts carry ~88% of
            site clicks and the reader is an engaged bill-payer (BL-119). */}
        {isSmartMeterPost && <EnergyTariffCTA />}

        {/* CTA - matched to the post's cluster (src/lib/postCta.ts) rather than
            hardcoded, so a reader finishing a laundry running-cost guide is not
            offered a heat pump calculator. */}
        <div className="bg-yellow rounded-2xl p-8 mt-12 text-center">
          <p className="font-display font-semibold text-lg text-ink mb-2">{cta.heading}</p>
          <p className="text-ink/60 text-base mb-4">{cta.body}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={cta.primary.href} className="px-6 py-3 bg-ink text-cream-dark rounded-xl font-semibold text-sm hover:opacity-90 transition">
              {cta.primary.label}
            </a>
            {cta.secondary && (
              <a href={cta.secondary.href} className="px-6 py-3 bg-cream border border-ink/15 text-ink rounded-xl font-semibold text-sm hover:border-ink/30 transition">
                {cta.secondary.label}
              </a>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
