import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog | The Home Energy Hub',
  description: 'Expert guides on heat pumps, EV chargers, energy tariffs and saving money on your home energy bills.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-display font-normal text-ink mb-2">Blog</h1>
      <p className="text-ink/55 mb-10">Expert guides to help you save on home energy</p>

      {posts.length === 0 ? (
        <p className="text-ink/60">Coming soon  - new posts every Tuesday and Friday.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="bg-cream-dark rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-yellow text-ink capitalize">
                    {post.category.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-ink/55">{post.date}</span>
                </div>
                <h2 className="text-xl font-display font-semibold mb-2">{post.title}</h2>
                <p className="text-ink/60 text-base leading-relaxed">{post.description}</p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
