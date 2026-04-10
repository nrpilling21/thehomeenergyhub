import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AudioPlayer from '@/components/AudioPlayer';
import AuthorAvatar from '@/components/AuthorAvatar';

const AUTHORS = [
  {
    name: 'Sophie Carter',
    role: 'Home Energy Writer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    initials: 'SC',
  },
  {
    name: 'James Whitfield',
    role: 'Energy Analyst',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    initials: 'JW',
  },
  {
    name: 'Priya Sharma',
    role: 'Sustainability Editor',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    initials: 'PS',
  },
  {
    name: 'Daniel Brooks',
    role: 'Energy Technology Writer',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    initials: 'DB',
  },
];

const FACT_CHECKER = { name: 'Tom Richards' };

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = ((h << 5) - h) + slug.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function getAuthor(slug: string) {
  return AUTHORS[hashSlug(slug) % AUTHORS.length];
}

function readTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function stripMarkdown(md: string): string {
  return md
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^[-*] /gm, '')
    .trim();
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: `${post.title} | The Home Energy Hub`,
    description: post.description,
  };
}

/* Simple markdown to HTML (headings, paragraphs, bold, links, lists) */
function markdownToHtml(md: string): string {
  return md
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';

      if (block.startsWith('### ')) return `<h3 class="text-lg font-display font-semibold mt-8 mb-3">${block.slice(4)}</h3>`;
      if (block.startsWith('## ')) return `<h2 class="text-xl font-display font-semibold mt-10 mb-4">${block.slice(3)}</h2>`;

      if (block.match(/^[-*] /m)) {
        const items = block.split('\n').filter(l => l.match(/^[-*] /)).map(l => `<li class="mb-1">${l.replace(/^[-*] /, '')}</li>`);
        return `<ul class="list-disc pl-6 mb-4 text-ink/65 leading-relaxed">${items.join('')}</ul>`;
      }

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

  const author = getAuthor(params.slug);
  const contentHtml = markdownToHtml(post.content);
  const plainText = stripMarkdown(post.content);
  const minutes = readTime(post.content);
  const totalSec = Math.round(minutes * 48);
  const dur = `${Math.floor(totalSec / 60)}:${String(totalSec % 60).padStart(2, '0')}`;

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <article className="max-w-3xl mx-auto px-5 py-12">
        <p className="font-mono text-xs tracking-widest text-ink/40 uppercase mb-6">
          {post.category.replace('-', ' ')}
        </p>

        <h1 className="text-3xl font-display font-normal text-ink mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-lg text-ink/60 mb-8 leading-relaxed">{post.description}</p>

        {/* Author byline */}
        <div className="border-t border-b border-ink/10 py-5 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <AuthorAvatar src={author.avatar} alt={author.name} initials={author.initials} size={40} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{author.name}</p>
              <p className="text-xs text-ink/50">
                {author.role}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{post.date}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{minutes} min read
              </p>
            </div>
          </div>

          <AudioPlayer duration={dur} text={plainText} />

          <div className="flex items-center gap-1.5 mt-3">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-green-600 flex-shrink-0">
              <path d="M7 0a7 7 0 1 0 0 14A7 7 0 0 0 7 0Zm3.2 5.3-3.7 3.7a.5.5 0 0 1-.7 0L3.8 7a.5.5 0 0 1 .7-.7L6.1 8l3.4-3.4a.5.5 0 0 1 .7.7Z" fill="currentColor"/>
            </svg>
            <span className="text-xs text-ink/45">
              Fact checked by{' '}
              <span className="font-semibold text-ink/65">{FACT_CHECKER.name}</span>
            </span>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

        {/* CTA */}
        <div className="bg-yellow rounded-2xl p-8 mt-12 text-center">
          <p className="font-display font-semibold text-lg text-ink mb-2">Get a personalised estimate</p>
          <p className="text-ink/60 text-base mb-4">Try our free calculators&nbsp;&mdash;&nbsp;no email required.</p>
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
