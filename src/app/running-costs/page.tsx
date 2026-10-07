import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { PageHero } from '@/components/PageHero';
import { BlogGrid } from '@/components/BlogGrid';
import { toBlogItems } from '@/lib/postList';

export const metadata: Metadata = {
  title: 'Appliance Running Costs UK (2026): What Everything Costs to Run',
  description:
    'What it costs to run a washing machine, dishwasher, tumble dryer, immersion heater, dehumidifier, electric heater and more in the UK, with ways to cut each one.',
  alternates: { canonical: '/running-costs' },
};

/* Hub for the appliance running-cost posts, the site's largest cluster. Built
   from content/blog via the topic model, so a new running-cost post appears
   here on its next deploy with no edit. */
export default function RunningCostsPage() {
  const items = toBlogItems(getAllPosts()).filter((i) => i.topic === 'running');

  return (
    <div className="pb-2">
      <PageHero
        eyebrow="Running costs"
        title="What it costs to run everything at home."
        image="/images/utility-room.jpg"
        imageAlt="Washing machine in a sunlit utility room"
      >
        Per-use and yearly costs for {items.length} household appliances at today&apos;s UK electricity prices, with
        the simple changes that cut each one. Want the bigger picture?{' '}
        <Link href="/smart-meter-savings-calculator">Try the smart meter calculator</Link>.
      </PageHero>
      <BlogGrid items={items} showFeatured={false} />
    </div>
  );
}
