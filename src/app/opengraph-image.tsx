import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'The Home Energy Hub — independent UK home energy advice';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    title: 'Independent UK energy advice, with the numbers checked',
    eyebrow: 'Home Energy Hub',
  });
}
