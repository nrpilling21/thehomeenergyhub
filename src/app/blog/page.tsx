import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { PageHero } from '@/components/PageHero';
import { Sunlight } from '@/components/Sunlight';
import { postImage, postSeed } from '@/lib/postImage';

export const metadata = {
  alternates: { canonical: '/blog' },
  title: 'Blog',
  description: 'Expert guides on heat pumps, EV chargers, energy tariffs and saving money on your home energy bills.',
};

function readTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatCategory(category: string): string {
  return category
    .split('-')
    .map((w, i) => (w === 'ev' ? 'EV' : i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
}

/* Frontmatter dates are YYYY-MM-DD or DD.MM.YYYY. */
function formatDate(dateStr: string): string {
  const dot = dateStr.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  const d = new Date(dot ? `${dot[3]}-${dot[2]}-${dot[1]}` : dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="pb-2">
      <PageHero eyebrow="Blog" title="Guides to help you save on home energy.">
        Running costs, upgrades and tariffs, explained plainly. New posts every week.
      </PageHero>

      {posts.length === 0 ? (
        <p className="px-5 py-16 text-plum-muted">Coming soon &mdash; new posts every Tuesday and Friday.</p>
      ) : (
        <>
          {/* Newest post as a large photo card */}
          {(() => {
            const post = posts[0];
            const img = postImage(post.slug, post.tags);
            const minutes = post.content ? readTime(post.content) : 8;
            return (
              <div className="px-2 pt-2">
                <Link href={`/blog/${post.slug}`} className="group grid lg:grid-cols-[1fr_1.3fr] gap-2">
                  <div className="bg-cream-dark group-hover:bg-sand transition-colors rounded-[6px] p-5 sm:p-8 flex flex-col justify-between min-h-[300px] text-[15px] font-medium tracking-[-0.03em]">
                    <p className="text-plum-muted">Latest · {formatCategory(post.category)} · {minutes} min read</p>
                    <div>
                      <h2 className="!text-[1.75rem] sm:!text-[2rem] !leading-[1.12] mb-3 max-w-lg">{post.title}</h2>
                      <p className="text-plum-muted text-[1.0625rem] leading-[1.35] max-w-lg mb-6">{post.description}</p>
                      <p className="text-plum-muted text-[13px]">{formatDate(post.date)}</p>
                    </div>
                  </div>
                  <div className="relative isolate overflow-hidden rounded-[6px] min-h-[280px] lg:min-h-[420px]">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img.image} alt={img.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                    ) : (
                      <Sunlight mood="amber" seed={postSeed(post.slug)} shade={false} />
                    )}
                  </div>
                </Link>
              </div>
            );
          })()}

          {/* Everything else as quiet numbered cards */}
          <div className="px-2 pt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {posts.slice(1).map((post, i) => {
              const minutes = post.content ? readTime(post.content) : 8;
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-cream-dark hover:bg-sand transition-colors rounded-[6px] p-4 sm:p-5 min-h-[260px] flex flex-col justify-between text-[15px] font-medium tracking-[-0.03em] leading-[1.3]"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">{i + 2}</span>
                    <span className="text-[13px] text-plum-muted">{formatCategory(post.category)} · {minutes} min</span>
                  </div>
                  <article>
                    <h2 className="!text-[1.0625rem] !leading-[1.3] mb-1.5">{post.title}</h2>
                    <p className="text-plum-muted mb-4">{post.description}</p>
                    <p className="text-plum-muted text-[13px]">{formatDate(post.date)}</p>
                  </article>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
