/* Picks a photo for a blog post from its slug and tags, so new posts get a
   fitting image with no manual step. Returns null when nothing fits; callers
   then fall back to a code-drawn Sunlight panel. Add a photo to
   public/images and a row here to cover a new topic. */
const RULES: { image: string; alt: string; keywords: string[] }[] = [
  { image: "/images/ev-charging.jpg", alt: "Electric car charging from a wall-mounted home charger at sunset", keywords: ["ev-", "-ev", "electric-car", "tethered"] },
  { image: "/images/heat-pump.jpg", alt: "Air source heat pump outside a timber-clad home", keywords: ["heat-pump", "heat pump"] },
  { image: "/images/solar-panels.jpg", alt: "Rooftop solar panels at sunset", keywords: ["solar", "battery", "batteries"] },
  {
    image: "/images/utility-room.jpg",
    alt: "Washing machine in a sunlit utility room",
    keywords: ["washing-machine", "tumble-dryer", "laundry", "airer"],
  },
  {
    image: "/images/thermostat.jpg",
    alt: "Smart thermostat on a sunlit wall",
    keywords: ["smart-meter", "smart meter", "ihd", "smets", "meter", "thermostat", "tariff", "bill", "price-cap"],
  },
  {
    image: "/images/couple-blankets.jpg",
    alt: "Couple wrapped in blankets with mugs of tea",
    keywords: ["insulation", "draught", "loft", "cavity", "damp", "condensation", "blanket"],
  },
];

export function postImage(
  slug: string,
  tags: string[] = [],
  override?: { image?: string; imageAlt?: string }
): { image: string; alt: string } | null {
  if (override?.image) return { image: override.image, alt: override.imageAlt || "" };
  // Slug only: tags are too broad (e.g. "bill" on most posts) and mis-match.
  void tags;
  const hay = slug.toLowerCase();
  for (const r of RULES) if (r.keywords.some((k) => hay.includes(k))) return { image: r.image, alt: r.alt };
  return null;
}

export function postSeed(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h) % 9;
}
