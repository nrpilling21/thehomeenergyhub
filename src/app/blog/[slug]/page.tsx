import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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
  const pageTitle = `${post.title} | ${SITE_NAME}`;

  return {
    title: pageTitle,
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

/* Simple markdown to HTML (headings, paragraphs, bold, links, lists) */
function markdownToHtml(md: string): string {
  return md
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';

      // Headings
      if (block.startsWith('### ')) return `<h3 class="text-lg font-display font-semibold mt-8 mb-3">${block.slice(4)}</h3>`;
      if (block.startsWith('## ')) return `<h2 class="text-xl font-display font-semibold mt-10 mb-4">${block.slice(3)}</h2>`;

      // Unordered lists
      if (block.match(/^[-*] /m)) {
        const items = block.split('\n').filter(l => l.match(/^[-*] /)).map(l => `<li class="mb-1">${l.replace(/^[-*] /, '')}</li>`);
        return `<ul class="list-disc pl-6 mb-4 text-ink/65 leading-relaxed">${items.join('')}</ul>`;
      }

      // Paragraph with inline formatting
      let html = block
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-ink underline">$1</a>');

      return `<p class="text-ink/65 leading-relaxed mb-4">${html}</p>`;
    })
    .join('\n');
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const contentHtml = markdownToHtml(post.content);
  const url = `${SITE_URL}/blog/${params.slug}`;

  // BlogPosting JSON-LD - emitted on every blog post
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
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

        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

        {/* CTA - yellow background */}
        <div className="bg-yellow rounded-2xl p-8 mt-12 text-center">
          <p className="font-display font-semibold text-lg text-ink mb-2">Get a personalised estimate</p>
          <p className="text-ink/60 text-base mb-4">Try our free calculators  - no email required.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="/heat-pump-cost-calculator" className="px-6 py-3 bg-ink text-cream-dark rounded-xl font-semibold text-sm hover:opacity-90 transition">
              Heat Pump Calculator
            </a>
            <a href="/ev-charging-cost-calculator" className="px-6 py-3 bg-cream border border-ink/15 text-ink rounded-xl font-semibold text-sm hover:border-ink/30 transition">
              EV Charging Calculator
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
