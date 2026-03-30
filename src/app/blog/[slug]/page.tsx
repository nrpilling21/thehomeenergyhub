import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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

function markdownToHtml(md: string): string {
  return md
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('### ')) return `<h3 class="text-lg font-bold mt-8 mb-3">${block.slice(4)}</h3>`;
      if (block.startsWith('## ')) return `<h2 class="text-xl font-bold mt-10 mb-4">${block.slice(3)}</h2>`;
      if (block.match(/^[-*] /m)) {
        const items = block.split('\n').filter(l => l.match(/^[-*] /)).map(l => `<li class="mb-1">${l.replace(/^[-*] /, '')}</li>`);
        return `<ul class="list-disc pl-6 mb-4 text-gray-600 leading-relaxed">${items.join('')}</ul>`;
      }
      let html = block
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-green-700 underline">$1</a>');
      return `<p class="text-gray-600 leading-relaxed mb-4">${html}</p>`;
    })
    .join('\n');
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const contentHtml = markdownToHtml(post.content);
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
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700 capitalize">
            {post.category.replace('-', ' ')}
          </span>
          <span className="text-xs text-gray-400">{post.date}</span>
          <span className="text-xs text-gray-400">by {post.author}</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 leading-tight">{post.title}</h1>
        <p className="text-lg text-gray-500 mb-10 leading-relaxed">{post.description}</p>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mt-12 text-center">
          <p className="font-bold text-lg mb-2">Get a personalised estimate</p>
          <p className="text-gray-500 text-sm mb-4">Try our free calculators — no email required.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="/heat-pump-cost-calculator" className="px-6 py-3 bg-green-700 text-white rounded-xl font-semibold text-sm hover:bg-green-800 transition">Heat Pump Calculator</a>
            <a href="/ev-charging-cost-calculator" className="px-6 py-3 bg-white border border-green-700 text-green-700 rounded-xl font-semibold text-sm hover:bg-green-50 transition">EV Charging Calculator</a>
          </div>
        </div>
      </article>
    </>
  );
}
