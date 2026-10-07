/* The site's topic model. Drives the Guides mega menu, the blog filters, the
   Running costs hub and the footer, so a new post lands in the right place
   automatically from its slug. To add a topic, add a TOPICS entry and its
   slug keywords in classify(). */

export type TopicId = "heating" | "solar" | "ev" | "insulation" | "smart" | "running";

export interface Topic {
  id: TopicId;
  label: string;
  blurb: string;
  guides: { href: string; label: string }[];
  calculator?: { href: string; label: string };
}

export const TOPICS: Topic[] = [
  {
    id: "heating",
    label: "Heating & heat pumps",
    blurb: "Heat pump costs, grants and boiler settings.",
    guides: [{ href: "/heat-pump-cost-uk", label: "Heat pump costs UK" }],
    calculator: { href: "/heat-pump-cost-calculator", label: "Heat pump calculator" },
  },
  {
    id: "smart",
    label: "Smart meters & tariffs",
    blurb: "Displays, savings, problems and cheaper tariffs.",
    guides: [{ href: "/smart-meter-guide-uk", label: "Smart meter guide" }],
    calculator: { href: "/smart-meter-savings-calculator", label: "Smart meter calculator" },
  },
  {
    id: "running",
    label: "Running costs",
    blurb: "What every appliance costs to run.",
    guides: [{ href: "/running-costs", label: "All running costs" }],
  },
  {
    id: "insulation",
    label: "Insulation & draughts",
    blurb: "Loft, wall and floor insulation, damp and EPC.",
    guides: [
      { href: "/home-insulation-guide-uk", label: "Home insulation guide" },
      { href: "/solid-wall-insulation-uk", label: "Solid wall insulation" },
    ],
  },
  {
    id: "solar",
    label: "Solar & batteries",
    blurb: "Panel costs, batteries, grants and payback.",
    guides: [{ href: "/solar-panel-costs-uk", label: "Solar panel costs UK" }],
  },
  {
    id: "ev",
    label: "EV charging",
    blurb: "Home chargers, EV tariffs and charging costs.",
    guides: [
      { href: "/best-ev-charger-uk", label: "Best home EV charger" },
      { href: "/best-ev-tariff-uk", label: "Best EV tariff" },
    ],
    calculator: { href: "/ev-charging-cost-calculator", label: "EV charging calculator" },
  },
];

export const CALCULATORS = [
  { href: "/heat-pump-cost-calculator", label: "Heat pump cost calculator", desc: "Install cost after grants, and running costs." },
  { href: "/ev-charging-cost-calculator", label: "EV charging cost calculator", desc: "Cost per mile at home vs petrol." },
  { href: "/smart-meter-savings-calculator", label: "Smart meter savings calculator", desc: "What visibility and smart tariffs could save." },
];

/* Order matters: the first match wins, so specific topics come before the
   broad running-costs bucket. */
export function classify(slug: string): TopicId {
  const s = slug.toLowerCase();
  const has = (...k: string[]) => k.some((x) => s.includes(x));
  if (has("ev-", "-ev", "electric-car", "tethered")) return "ev";
  if (has("solar", "battery")) return "solar";
  if (has("heat-pump")) return "heating";
  if (has("smart-meter", "smets", "in-home-display", "tariff", "price-cap")) return "smart";
  if (has("insulation", "draught", "epc", "condensation", "damp")) return "insulation";
  if (has("boiler", "thermostat", "radiator")) return "heating";
  return "running";
}

export function topicLabel(id: TopicId): string {
  return TOPICS.find((t) => t.id === id)?.label ?? "";
}
