'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/*
  Site-wide outbound-click tracking for commercial links (BL-116).

  Affiliate links live in two places — hand-written TSX pages and
  markdown blog content rendered via dangerouslySetInnerHTML — so
  wrapping individual anchors in a component would miss most of them.
  A single delegated listener on the document catches every one,
  including any added by future blog posts, with no per-link markup.

  Events land in Vercel Analytics as custom events, which is what makes
  affiliate clickout rate reportable per page in the weekly SEO report.
*/

const COMMERCIAL_HOSTS = [
  'amazon.co.uk',
  'amzn.to',
  'awin1.com',
  'www.awin1.com',
];

function isCommercial(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return COMMERCIAL_HOSTS.some(h => host === h || host.endsWith('.' + h));
}

/* Amazon search links carry the query; product links carry the ASIN.
   Recording which kind converted better is the whole point of BL-117. */
function describeDestination(url: URL): { kind: string; item: string } {
  if (url.hostname.toLowerCase().includes('amazon') || url.hostname.toLowerCase().includes('amzn')) {
    const dp = url.pathname.match(/\/dp\/([A-Z0-9]{10})/i);
    if (dp) return { kind: 'amazon-product', item: dp[1] };
    const k = url.searchParams.get('k');
    if (k) return { kind: 'amazon-search', item: k.slice(0, 60) };
    return { kind: 'amazon-other', item: url.pathname.slice(0, 60) };
  }
  return { kind: 'awin', item: url.searchParams.get('p') ? 'deeplink' : url.pathname.slice(0, 60) };
}

export function OutboundTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !/^https?:\/\//i.test(href)) return;

      let url: URL;
      try {
        url = new URL(href);
      } catch {
        return;
      }
      if (!isCommercial(url.hostname)) return;

      const { kind, item } = describeDestination(url);
      track('affiliate_click', {
        kind,
        item,
        page: window.location.pathname,
        label: (anchor.textContent || '').trim().slice(0, 60),
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
