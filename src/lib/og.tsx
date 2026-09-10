import { ImageResponse } from 'next/og';

/* Shared Open Graph card renderer.

   The site publishes no photography, so every page previously shared as a bare
   link with no image, and BlogPosting/Article schema had no `image` field for
   Google to use. Rather than sourcing 20 stock photos, each page renders its
   own branded card at build time from its title. One template, no assets, and
   it can never go out of sync with the page it represents.

   Brand colours are duplicated from tailwind.config.ts because ImageResponse
   renders through satori, which does not run Tailwind. */
const CREAM = '#FCFAF8';
const INK = '#28030F';
const YELLOW = '#FBF582';
const MUTED = '#755760';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export function renderOgCard({
  title,
  eyebrow,
  footnote = 'thehomeenergyhub.co.uk',
}: {
  title: string;
  eyebrow?: string;
  footnote?: string;
}) {
  // Long titles need to step down a size or they overflow the card.
  const fontSize = title.length > 85 ? 52 : title.length > 55 ? 62 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: CREAM,
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow ? (
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                backgroundColor: YELLOW,
                color: INK,
                fontSize: 26,
                fontWeight: 600,
                padding: '10px 24px',
                borderRadius: 999,
                marginBottom: 36,
                textTransform: 'capitalize',
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              color: INK,
              fontSize,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              width: 120,
              height: 8,
              backgroundColor: YELLOW,
              borderRadius: 999,
              marginBottom: 28,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ display: 'flex', color: INK, fontSize: 32, fontWeight: 700 }}>
              The Home Energy Hub
            </div>
            <div style={{ display: 'flex', color: MUTED, fontSize: 26, marginLeft: 20 }}>
              {footnote}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
