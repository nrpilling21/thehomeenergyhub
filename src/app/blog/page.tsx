import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog | The Home Energy Hub',
  description: 'Expert guides on heat pumps, EV chargers, energy tariffs and saving money on your home energy bills.',
};

const AUTHOR = {
  name: 'Sophie Carter',
  initials: 'SC',
};

function readTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-display font-normal text-ink mb-2">Blog</h1>
      <p className="text-ink/55 mb-10">Expert guides to help you save on home energy</p>

      {posts.length === 0 ? (
        <p className="text-ink/60">Coming soon &mdash; new posts every Tuesday and Friday.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map(post => {
            const minutes = post.content ? readTime(post.content) : 8;
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="bg-cream-dark rounded-2xl p-6 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-yellow text-ink capitalize">
                      {post.category.replace('-', ' ')}
                    </span>
                    <span className="text-xs text-ink/55">{post.date}</span>
                    <span className="text-xs text-ink/35">Â·</span>
                    <span className="text-xs text-ink/55">{minutes} min read</span>
                    <span className="text-xs text-ink/40 ml-auto flex items-center gap-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                      </svg>
                      Listen
                    </span>
                  </div>
                  <h2 className="text-xl font-display font-semibold mb-2">{post.title}</h2>
                  <p className="text-ink/60 text-base leading-relaxed mb-3">{post.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-ink/10 flex items-center justify-center">
                      <span className="text-[9px] font-semibold text-ink/50">{AUTHOR.initials}</span>
                    </div>
                    <span className="text-xs text-ink/50">{AUTHOR.name}</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
