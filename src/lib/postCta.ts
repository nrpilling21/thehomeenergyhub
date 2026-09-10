/* The call to action at the foot of each blog post.

   This was previously hardcoded to the heat pump and EV charging calculators
   on every post, which meant a reader finishing the heated airer guide was
   offered a heat pump calculator, and the smart meter savings calculator -
   one of three tools the site has - never appeared at all. The running-cost
   cluster carries most of the site's traffic and was getting the least
   relevant CTA on the page.

   Each cluster now gets a destination that follows from what the reader just
   read, and copy that says why. Where a calculator genuinely fits, it leads;
   where none does, the closest pillar guide leads instead, because sending an
   insulation reader to a heat pump calculator is what caused the problem in
   the first place.

   Matching is by keyword against slug and tags, the same approach as
   src/lib/hero.ts. Unmatched posts fall back to DEFAULT_CTA. */

export interface PostCta {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

const DEFAULT_CTA: PostCta = {
  heading: 'Get a personalised estimate',
  body: 'Try our free calculators — no email required.',
  primary: { label: 'Heat Pump Calculator', href: '/heat-pump-cost-calculator' },
  secondary: { label: 'EV Charging Calculator', href: '/ev-charging-cost-calculator' },
};

const CLUSTERS: { keywords: string[]; cta: PostCta }[] = [
  {
    keywords: ['heat-pump', 'heat pump', 'bus grant', 'boiler upgrade'],
    cta: {
      heading: 'See what a heat pump would cost you',
      body: 'Your property, your current heating, the £7,500 grant included — no email required.',
      primary: { label: 'Heat Pump Calculator', href: '/heat-pump-cost-calculator' },
      secondary: { label: 'Heat pump costs guide', href: '/heat-pump-cost-uk' },
    },
  },
  {
    keywords: ['ev', 'electric car', 'electric-car', 'charger', 'charging', 'tethered', 'wallbox'],
    cta: {
      heading: 'Work out your own charging costs',
      body: 'Your mileage, your tariff and your charger, rather than an average — no email required.',
      primary: { label: 'EV Charging Calculator', href: '/ev-charging-cost-calculator' },
      secondary: { label: 'Compare EV tariffs', href: '/best-ev-tariff-uk' },
    },
  },
  {
    keywords: ['smart meter', 'smart-meter', 'ihd', 'smets', 'in-home display', 'tariff'],
    cta: {
      heading: 'See what your meter could actually save you',
      body: 'A smart meter only saves money if it gets you onto a better tariff. Find out what that is worth on your bill — no email required.',
      primary: { label: 'Smart Meter Savings Calculator', href: '/smart-meter-savings-calculator' },
      secondary: { label: 'Smart meter guide', href: '/smart-meter-guide-uk' },
    },
  },
  {
    /* Appliance running costs. Every figure in these guides is the unit rate
       multiplied by something, so the tariff is the one lever the reader can
       actually pull — which makes the savings calculator the honest next step
       rather than a calculator for equipment they were not reading about. */
    keywords: [
      'running cost', 'running costs', 'heater', 'radiator', 'dehumidifier',
      'airer', 'tumble', 'dryer', 'laundry', 'thermostat', 'damp',
    ],
    cta: {
      heading: 'The unit rate drives every figure above',
      body: 'Costs here use the current price cap. If you are on a different tariff, see what the gap is worth over a year — no email required.',
      primary: { label: 'Smart Meter Savings Calculator', href: '/smart-meter-savings-calculator' },
      secondary: { label: 'Do smart meters save money?', href: '/blog/do-smart-meters-save-you-money-uk' },
    },
  },
  {
    keywords: ['solar', 'battery', 'seg', 'export'],
    cta: {
      heading: 'See what solar would cost and pay back',
      body: 'Prices by system size, realistic savings and payback periods for UK homes.',
      primary: { label: 'Solar panel costs guide', href: '/solar-panel-costs-uk' },
      secondary: { label: 'Solar battery storage', href: '/blog/solar-battery-storage-uk' },
    },
  },
  {
    keywords: ['insulation', 'loft', 'cavity', 'draught', 'epc', 'solid wall', 'floor'],
    cta: {
      heading: 'Work out what to insulate first',
      body: 'Our insulation guide compares cost and payback by measure, so you spend on the one that pays back soonest.',
      primary: { label: 'Home insulation guide', href: '/home-insulation-guide-uk' },
      secondary: { label: 'Heat Pump Calculator', href: '/heat-pump-cost-calculator' },
    },
  },
];

/* Keywords match on word boundaries, so the short ones ("ev") cannot fire
   inside "every" or "level".

   Matching runs over the slug first and only falls back to tags if nothing
   hits. The slug is the reliable signal: the tumble dryer post carries the tag
   "heat pump tumble dryer", which on a combined match sent a laundry reader to
   the heat pump calculator — precisely the mismatch this file exists to fix.
   Cluster order still matters within each pass, which is why heat pumps are
   tested before appliance running costs: "heat-pump-running-costs-2026" should
   get the heat pump calculator, not the tariff one. */
function matches(keywords: string[], haystack: string): boolean {
  return keywords.some(k => {
    const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[\s-]+/g, '[\\s-]+');
    return new RegExp(`(^|[^a-z])${escaped}([^a-z]|$)`, 'i').test(haystack);
  });
}

/* A cluster CTA can name a post as its secondary link, which on that post
   itself would render a button pointing at the page the reader is already on
   (the solar battery guide did exactly this). Drop a self-referential
   secondary, and fall back entirely if the primary is the current page. */
function withoutSelfLinks(cta: PostCta, slug: string): PostCta {
  const self = `/blog/${slug}`;
  if (cta.primary.href === self) return DEFAULT_CTA;
  if (cta.secondary?.href === self) {
    const { secondary, ...rest } = cta;
    void secondary;
    return rest;
  }
  return cta;
}

export function getPostCta(slug: string, tags: string[] = []): PostCta {
  const slugText = slug.toLowerCase();
  for (const c of CLUSTERS) {
    if (matches(c.keywords, slugText)) return withoutSelfLinks(c.cta, slug);
  }
  const withTags = `${slugText} ${tags.join(' ')}`.toLowerCase();
  for (const c of CLUSTERS) {
    if (matches(c.keywords, withTags)) return withoutSelfLinks(c.cta, slug);
  }
  return DEFAULT_CTA;
}
