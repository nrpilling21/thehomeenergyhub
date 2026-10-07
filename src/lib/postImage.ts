/* Picks a photo for a blog post from its slug and tags, so new posts get a
   fitting image with no manual step. Returns null when nothing fits; callers
   then fall back to a code-drawn Sunlight panel. Add a photo to
   public/images and a row here to cover a new topic. */
const RULES: { image: string; alt: string; keywords: string[] }[] = [
  { image: "/images/heat-pump.jpg", alt: "Air source heat pump outside a timber-clad home", keywords: ["heat-pump", "heat pump"] },
  { image: "/images/solar-panels.jpg", alt: "Rooftop solar panels at sunset", keywords: ["solar", "battery", "batteries"] },
  {
    image: "/images/utility-room.jpg",
    alt: "Washing machine in a sunlit utility room",
    keywords: ["washing", "dryer", "tumble", "dishwasher", "laundry", "airer", "immersion", "kettle", "oven", "fridge", "freezer", "appliance", "microwave", "air-fryer"],
  },
  {
    image: "/images/thermostat.jpg",
    alt: "Smart thermostat on a sunlit wall",
    keywords: ["smart-meter", "smart meter", "ihd", "smets", "meter", "thermostat", "tariff", "bill", "price-cap"],
  },
  {
    image: "/images/couple-blankets.jpg",
    alt: "Couple wrapped in blankets with mugs of tea",
    keywords: ["insulation", "draught", "loft", "cavity", "damp", "condensation", "dehumidifier", "heater", "radiator", "heating", "cold"],
  },
];

export function postImage(slug: string, tags: string[] = []): { image: string; alt: string } | null {
  const hay = `${slug} ${tags.join(" ")}`.toLowerCase();
  for (const r of RULES) if (r.keywords.some((k) => hay.includes(k))) return { image: r.image, alt: r.alt };
  return null;
}

export function postSeed(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h) % 9;
}
