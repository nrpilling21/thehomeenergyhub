import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'The Home Energy Hub';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  return renderOgCard({
    title: post?.title ?? 'The Home Energy Hub',
    eyebrow: post?.category.replace('-', ' '),
  });
}
