import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog | The Home Energy Hub',
  description:
    'Expert guides on heat pumps, EV chargers, energy tariffs and saving money on your home energy bills.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">Expert guides to help you save on home energy</p>

      {posts.length === 0 ? (
        <p className="text-gray-400">Coming soon \u2014 new posts every Tuesday and Friday.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-green-600 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700 capitalize">
                    {post.category.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{post.description}</p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

