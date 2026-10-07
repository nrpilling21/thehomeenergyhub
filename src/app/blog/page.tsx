import { getAllPosts } from '@/lib/blog';
import { PageHero } from '@/components/PageHero';
import { BlogGrid } from '@/components/BlogGrid';
import { toBlogItems } from '@/lib/postList';

export const metadata = {
  alternates: { canonical: '/blog' },
  title: 'Blog',
  description: 'Expert guides on heat pumps, EV chargers, energy tariffs and saving money on your home energy bills.',
};

export default function BlogIndex() {
  const items = toBlogItems(getAllPosts());

  return (
    <div className="pb-2">
      <PageHero eyebrow="Blog" title="Guides to help you save on home energy.">
        Running costs, upgrades and tariffs, explained plainly. New posts every week.
      </PageHero>
      {items.length === 0 ? (
        <p className="px-5 py-16 text-plum-muted">Coming soon &mdash; new posts every Tuesday and Friday.</p>
      ) : (
        <BlogGrid items={items} />
      )}
    </div>
  );
}
