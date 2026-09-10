/* Code-generated hero illustrations for blog posts.

   The site publishes no photography and deliberately does not use stock
   images: the same Unsplash photo appears on every competitor's page, Google
   gives decorative stock little credit, and each one is a file somebody has to
   source and maintain. Instead each post gets a flat geometric band built from
   primitives (circles, arcs, bars, rounded rects) in the brand palette.

   The motif is chosen by keyword from the post's slug and tags, so a
   dehumidifier post reads differently from a loft insulation post without
   anyone assigning artwork. Everything is deliberately geometric rather than
   figurative - a row of well-spaced shapes reads as intentional design, where
   a hand-drawn appliance would just look poor.

   To add a motif: write a glyph function, then add a MOTIFS entry with the
   keywords that should select it. Unknown topics fall back to `bars`. */

const INK = '#28030F';
const YELLOW = '#FBF582';
const CREAM_DARK = '#F9F4F1';
const MUTED = 'rgba(40, 3, 15, 0.18)';

const W = 1200;
const H = 188;
const MID = 96;

type Glyph = (cx: number, fill: string) => string;

/* Rising wavy lines - heat, warmth, heating controls. Closed arcs read as a
   rainbow at this size, so these are open serpentine strokes instead. */
const heat: Glyph = (cx, fill) =>
  [-20, 0, 20]
    .map(dx => {
      const x = cx + dx;
      const top = MID - 44;
      return `<path d="M ${x} ${MID + 44} C ${x - 13} ${MID + 16} ${x + 13} ${MID - 8} ${x} ${top}" fill="none" stroke="${fill}" stroke-width="7" stroke-linecap="round" />`;
    })
    .join('');

/* Concentric rings - a drum, for laundry appliances. */
const drum: Glyph = (cx, fill) => `
  <circle cx="${cx}" cy="${MID}" r="44" fill="none" stroke="${fill}" stroke-width="7" />
  <circle cx="${cx}" cy="${MID}" r="18" fill="${fill}" />`;

/* Teardrop - moisture, damp, dehumidifiers. */
const droplet: Glyph = (cx, fill) => `
  <path d="M ${cx} ${MID - 46} C ${cx + 34} ${MID - 6} ${cx + 30} ${MID + 42} ${cx} ${MID + 42} C ${cx - 30} ${MID + 42} ${cx - 34} ${MID - 6} ${cx} ${MID - 46} Z" fill="${fill}" />`;

/* Bar readout - meters, displays, measurement. */
const bars: Glyph = (cx, fill) => {
  const hs = [28, 52, 38];
  return hs
    .map((h, i) => {
      const x = cx - 26 + i * 20;
      return `<rect x="${x}" y="${MID + 44 - h}" width="12" height="${h}" rx="6" fill="${fill}" />`;
    })
    .join('');
};

/* Stacked slabs of decreasing width - insulation layers. */
const layers: Glyph = (cx, fill) =>
  [0, 1, 2]
    .map(i => {
      const w = 90 - i * 22;
      return `<rect x="${cx - w / 2}" y="${MID - 34 + i * 26}" width="${w}" height="14" rx="7" fill="${fill}" />`;
    })
    .join('');

/* Disc with rays - solar. */
const sun: Glyph = (cx, fill) => {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315]
    .map(deg => {
      const a = (deg * Math.PI) / 180;
      const x1 = cx + Math.cos(a) * 32;
      const y1 = MID + Math.sin(a) * 32;
      const x2 = cx + Math.cos(a) * 46;
      const y2 = MID + Math.sin(a) * 46;
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${fill}" stroke-width="7" stroke-linecap="round" />`;
    })
    .join('');
  return `<circle cx="${cx}" cy="${MID}" r="21" fill="${fill}" />${rays}`;
};

/* Plug body with two prongs - EV charging. */
const plug: Glyph = (cx, fill) => `
  <rect x="${cx - 30}" y="${MID - 14}" width="60" height="52" rx="16" fill="${fill}" />
  <rect x="${cx - 21}" y="${MID - 46}" width="10" height="30" rx="5" fill="${fill}" />
  <rect x="${cx + 11}" y="${MID - 46}" width="10" height="30" rx="5" fill="${fill}" />`;

/* Three blades around a hub - heat pump / fan. */
const blades: Glyph = (cx, fill) => {
  const b = [0, 120, 240]
    .map(
      deg =>
        `<ellipse cx="${cx}" cy="${MID - 26}" rx="12" ry="26" fill="${fill}" transform="rotate(${deg} ${cx} ${MID})" />`
    )
    .join('');
  return `${b}<circle cx="${cx}" cy="${MID}" r="10" fill="${CREAM_DARK}" />`;
};

const MOTIFS: { glyph: Glyph; keywords: string[] }[] = [
  { glyph: blades, keywords: ['heat-pump', 'heat pump'] },
  { glyph: plug, keywords: ['ev', 'charger', 'charging', 'electric-car', 'electric car', 'tethered'] },
  { glyph: sun, keywords: ['solar', 'battery', 'grant'] },
  { glyph: droplet, keywords: ['dehumidifier', 'damp', 'condensation', 'humidity'] },
  { glyph: drum, keywords: ['tumble', 'dryer', 'airer', 'laundry', 'washing'] },
  { glyph: heat, keywords: ['heater', 'radiator', 'thermostat', 'heating', 'draught'] },
  { glyph: layers, keywords: ['insulation', 'loft', 'cavity', 'floor', 'wall', 'epc'] },
  { glyph: bars, keywords: ['smart meter', 'smart-meter', 'meter', 'ihd', 'smets', 'display', 'tariff', 'bill'] },
];

function pickGlyph(haystack: string): Glyph {
  for (const m of MOTIFS) {
    if (m.keywords.some(k => haystack.includes(k))) return m.glyph;
  }
  return bars;
}

/* One accent glyph among the row, offset from centre so it does not read as
   a bullseye. Same index every time for a given post, so the art is stable
   across builds. */
function accentIndex(seed: string, count: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(h) % count;
}

export function renderHero(slug: string, tags: string[] = [], alt = ''): string {
  const haystack = `${slug} ${tags.join(' ')}`.toLowerCase();
  const glyph = pickGlyph(haystack);

  const count = 7;
  const gap = W / (count + 1);
  const accent = accentIndex(slug, count);

  const row = Array.from({ length: count }, (_, i) => {
    const cx = gap * (i + 1);
    if (i === accent) return glyph(cx, YELLOW);
    return glyph(cx, i % 2 === 0 ? INK : MUTED);
  }).join('');

  return `<div class="not-prose mb-8">
  <svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${alt.replace(/"/g, '&quot;')}" style="display:block;width:100%;height:auto;background:${CREAM_DARK};border-radius:24px">
    ${row}
  </svg>
</div>`;
}
