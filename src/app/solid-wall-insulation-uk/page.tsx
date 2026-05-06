import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solid Wall Insulation Cost UK (2026): Internal vs External",
  description:
    "Solid wall insulation costs £4,000-£15,000 in the UK. Internal (IWI) is cheaper at £4,000-£7,000; external (EWI) is £8,000-£15,000 but transforms efficiency. Grants, savings and which to pick.",
  keywords: [
    "solid wall insulation cost uk",
    "internal solid wall insulation cost",
    "external wall insulation cost uk",
    "internal wall insulation cost",
    "ewi cost uk",
    "iwi cost uk",
    "external solid wall insulation cost",
    "solid wall insulation grants",
    "solid wall insulation pros and cons",
  ],
  alternates: { canonical: "/solid-wall-insulation-uk" },
  openGraph: {
    title: "Solid Wall Insulation Cost UK (2026): Internal vs External",
    description:
      "Honest UK costs and savings for internal and external solid wall insulation, plus grants and which option suits which property.",
    url: "https://thehomeenergyhub.co.uk/solid-wall-insulation-uk",
    type: "article",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does solid wall insulation cost in the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "For a 3-bed semi, internal solid wall insulation typically costs £4,000-£7,000 installed. External solid wall insulation typically costs £8,000-£15,000. Costs depend on wall area, material chosen, finish quality and access. Grants through the Great British Insulation Scheme or ECO4 can reduce or fully cover the bill for eligible homes.",
      },
    },
    {
      "@type": "Question",
      name: "Internal or external solid wall insulation - which is better?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "External (EWI) is the better long-term solution: it preserves internal floor space, doesn't disrupt your life during install, eliminates cold bridging at floor and ceiling junctions, and protects the wall from weather. Internal (IWI) is cheaper and lets you do one room at a time, but it shrinks each room by 50-100mm, requires plumbing/wiring/skirting/sockets to be moved, and is more prone to interstitial condensation if poorly detailed.",
      },
    },
    {
      "@type": "Question",
      name: "How much will solid wall insulation save on energy bills?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The Energy Saving Trust estimates solid wall insulation saves around £445-£475 per year for a typical detached house, £300-£325 for a semi-detached and £210-£230 for a mid-terrace. Savings depend on heating fuel, current insulation level, occupancy and how warm you keep the home.",
      },
    },
    {
      "@type": "Question",
      name: "Are there grants for solid wall insulation in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The Great British Insulation Scheme (open until March 2026) covers low-income households or homes in council tax bands A-D in England with EPC ratings D-G. ECO4 covers low-income and vulnerable households until March 2026. The Warm Homes: Local Grant runs to 2028 for properties in deprived areas. 0% VAT applies to all insulation work until March 2027.",
      },
    },
    {
      "@type": "Question",
      name: "How long does solid wall insulation last?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Properly installed external wall insulation has a design life of 25-30 years, with most systems carrying a 25-year SWIGA guarantee. Internal wall insulation lasts as long as the host wall is dry — typically 25 years before any refresh is needed. The single biggest factor in longevity is install quality, not the material.",
      },
    },
  ],
};

export default function SolidWallInsulationPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <p className="font-mono text-xs tracking-widest text-plum-muted uppercase mb-4">Guide</p>
      <h1 className="text-3xl font-display font-normal text-ink leading-tight mb-4">
        Solid Wall Insulation Cost UK (2026): Internal vs External
      </h1>
      <p className="text-ink/60 text-lg mb-8 leading-relaxed">
        Around 8 million UK homes have solid walls — most built before 1930. They lose roughly twice
        as much heat as cavity walls, and they cannot be filled with the standard cavity injection
        method. Insulating them is a bigger job: <strong>£4,000-£7,000</strong> for internal wall
        insulation (IWI) on a 3-bed semi, or <strong>£8,000-£15,000</strong> for external wall
        insulation (EWI). Here&apos;s how to choose between them, what grants help, and what the
        savings actually look like.
      </p>

      {/* TL;DR table */}
      <h2 className="text-xl font-display font-semibold text-ink mb-4">Cost at a glance (3-bed semi)</h2>
      <div className="overflow-x-auto mb-10 rounded-2xl border border-plum-light/20">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-plum-light/20 text-left bg-cream-dark">
              <th className="py-3 px-4 font-semibold text-ink">Option</th>
              <th className="py-3 px-4 font-semibold text-ink">Typical cost</th>
              <th className="py-3 px-4 font-semibold text-ink">Annual saving</th>
              <th className="py-3 px-4 font-semibold text-ink">Payback</th>
            </tr>
          </thead>
          <tbody className="text-ink/70">
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">Internal wall insulation (IWI)</td>
              <td className="py-3 px-4">£4,000-£7,000</td>
              <td className="py-3 px-4">£300-£325</td>
              <td className="py-3 px-4">13-22 years</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">External wall insulation (EWI)</td>
              <td className="py-3 px-4">£8,000-£15,000</td>
              <td className="py-3 px-4">£300-£475</td>
              <td className="py-3 px-4">17-50 years</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-ink">Hybrid (IWI on party walls, EWI rest)</td>
              <td className="py-3 px-4">£6,000-£10,000</td>
              <td className="py-3 px-4">£325-£420</td>
              <td className="py-3 px-4">15-30 years</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-ink/60 text-sm mb-10 leading-relaxed">
        Headline payback looks long, but the comfort gains are immediate (no cold spots, no dripping
        windows in winter), the property uplift is real, and 0% VAT plus the available grants change
        the maths considerably for many homes. Comfort and resale matter more than headline payback for
        most owners.
      </p>

      {/* Internal vs External */}
      <h2 className="text-2xl font-display font-semibold text-ink mt-12 mb-4">Internal wall insulation (IWI)</h2>
      <p className="text-ink/70 mb-4 leading-relaxed">
        Insulation boards or studwork are fixed to the inside face of external walls, then re-skimmed
        and decorated. A 50-100mm insulation layer sits between the wall and your new internal
        surface.
      </p>
      <p className="text-ink/70 mb-4 leading-relaxed">
        <strong>Cost drivers:</strong> wall area, the insulation product (PIR is cheaper but lower
        performance per mm than aerogel; mineral wool studwork is mid-range), how much
        skirting/coving/sockets/radiators have to be removed and refitted, and whether walls are dry.
        A 3-bed mid-terrace with one solid party wall and a single rear elevation needing IWI might
        only cost £3,000-£4,500. A detached house with all four walls treated could exceed £10,000.
      </p>
      <p className="text-ink/70 mb-4 leading-relaxed">
        <strong>Pros:</strong> cheaper than EWI, can be done one room at a time, no planning issues,
        no scaffolding, no impact on neighbours.
      </p>
      <p className="text-ink/70 mb-6 leading-relaxed">
        <strong>Cons:</strong> shrinks each treated room by roughly 50-100mm on each external wall,
        requires sockets, radiators and skirting boards to be moved, creates a thermal bridge at every
        floor/ceiling junction unless detailed properly, and is more sensitive to interstitial
        condensation than EWI. It also disrupts the home during install — every treated room is out of
        action for 1-2 weeks.
      </p>

      <h2 className="text-2xl font-display font-semibold text-ink mt-10 mb-4">External wall insulation (EWI)</h2>
      <p className="text-ink/70 mb-4 leading-relaxed">
        A continuous insulation layer is fixed to the outside of the wall, then finished in render,
        brick slip or cladding. EWI typically uses 90-120mm of insulation, giving better U-values than
        IWI in the same property.
      </p>
      <p className="text-ink/70 mb-4 leading-relaxed">
        <strong>Cost drivers:</strong> wall area, render finish (silicone is mid-range; brick slips
        are top of the range and add £30-£60/m²), scaffolding access, and any architectural details
        that need re-forming around windows, eaves and openings. Expect £100-£200/m² of treated wall
        as a working figure.
      </p>
      <p className="text-ink/70 mb-4 leading-relaxed">
        <strong>Pros:</strong> no internal disruption, no loss of room size, eliminates cold bridges
        at floor and ceiling, transforms the U-value of the wall (from ~2.0 to ~0.30 W/m²K), and
        protects the masonry from weather. Often produces a near-new look on tired pebbledash or
        rendered properties.
      </p>
      <p className="text-ink/70 mb-6 leading-relaxed">
        <strong>Cons:</strong> twice the cost of IWI, planning may be required in conservation areas
        or on listed buildings, scaffolding for 2-4 weeks, neighbour impact during install, and
        boundary issues if your wall is on the property line.
      </p>

      <h2 className="text-2xl font-display font-semibold text-ink mt-10 mb-4">How much will it actually save?</h2>
      <p className="text-ink/70 mb-4 leading-relaxed">
        The Energy Saving Trust&apos;s 2026 figures, for an uninsulated, gas-heated UK home:
      </p>
      <ul className="list-disc pl-6 mb-6 text-ink/70 space-y-1">
        <li>Detached house: £445-£475 per year</li>
        <li>Semi-detached: £300-£325 per year</li>
        <li>Mid-terrace: £210-£230 per year</li>
        <li>Bungalow: £180-£210 per year</li>
        <li>Flat: £120-£150 per year</li>
      </ul>
      <p className="text-ink/70 mb-6 leading-relaxed">
        Add roughly 30-50% on top of these figures if you heat with electric resistive heating, oil or
        LPG. If you have a heat pump (or are planning one), solid wall insulation has an outsized
        effect on running costs because heat pumps lose efficiency badly in poorly-insulated homes —
        see our <Link href="/blog/heat-pump-running-costs-2026" className="text-plum-muted underline">heat pump running costs guide</Link> for the figures.
      </p>

      <h2 className="text-2xl font-display font-semibold text-ink mt-10 mb-4">Grants and 0% VAT</h2>
      <p className="text-ink/70 mb-4 leading-relaxed">
        Three schemes can bring the bill down or eliminate it for eligible homes:
      </p>
      <ul className="list-disc pl-6 mb-6 text-ink/70 space-y-2">
        <li><strong>Great British Insulation Scheme</strong> — runs until March 2026. Targets council tax bands A-D in England with EPC D-G ratings. Either fully funded or part-funded depending on income.</li>
        <li><strong>ECO4</strong> — runs until March 2026. Aimed at low-income and vulnerable households across all UK nations. Often fully funded.</li>
        <li><strong>Warm Homes: Local Grant</strong> — runs until 2028 for homes in deprived areas (LA-administered).</li>
      </ul>
      <p className="text-ink/70 mb-6 leading-relaxed">
        Outside grants, every UK household benefits from <strong>0% VAT on insulation</strong> until at
        least March 2027 — a 20% discount on the full quote.
      </p>

      <h2 className="text-2xl font-display font-semibold text-ink mt-10 mb-4">What to do first if budget is tight</h2>
      <p className="text-ink/70 mb-4 leading-relaxed">
        Solid wall insulation is the most expensive measure in the typical retrofit ladder. Before
        committing, sequence the cheaper measures that deliver fast payback:
      </p>
      <ol className="list-decimal pl-6 mb-6 text-ink/70 space-y-2">
        <li><Link href="/blog/draught-proofing-cost-uk" className="text-plum-muted underline">Draught proofing</Link> — £100-£200, payback under 12 months. Almost always the first move.</li>
        <li><Link href="/blog/loft-insulation-cost-uk" className="text-plum-muted underline">Loft insulation</Link> top-up to 270mm — £300-£500, payback 2-4 years.</li>
        <li><Link href="/blog/cavity-wall-insulation-cost-uk" className="text-plum-muted underline">Cavity wall insulation</Link> if applicable — £450-£1,500, payback 3-5 years (note: only relevant if your walls have a cavity).</li>
        <li>Solid wall insulation — IWI for one room at a time, EWI when budget allows a full job.</li>
      </ol>
      <p className="text-ink/70 mb-6 leading-relaxed">
        Track each measure&apos;s actual impact via your smart meter — see our guide to <Link href="/blog/do-smart-meters-save-you-money-uk" className="text-plum-muted underline">whether smart meters save money</Link> for a practical workflow.
      </p>

      <h2 className="text-2xl font-display font-semibold text-ink mt-10 mb-4">FAQ</h2>

      <h3 className="text-lg font-display font-semibold text-ink mt-6 mb-2">Will solid wall insulation cause damp?</h3>
      <p className="text-ink/70 mb-4 leading-relaxed">
        Done well, no — done badly, yes. The biggest single risk with IWI is cold bridging at floor
        and ceiling junctions, and around window reveals. A competent installer details these with
        thermal breaks and vapour-control layers. A bad installer will skip them, and you&apos;ll see
        damp patches at the corners within 2-3 winters. Insist on PAS 2030/2035 accreditation and a
        25-year SWIGA-backed guarantee.
      </p>

      <h3 className="text-lg font-display font-semibold text-ink mt-6 mb-2">Does solid wall insulation increase property value?</h3>
      <p className="text-ink/70 mb-4 leading-relaxed">
        EWI typically lifts EPC by 1-2 bands. Halifax&apos;s 2024 analysis found a one-band EPC
        improvement (D to C) was associated with a 1.7-3.4% uplift in sale price — roughly £5,000-£10,000
        on an average UK home. IWI does the same on EPC but the room-shrinkage cost is sometimes
        priced in by buyers, so the uplift is more variable.
      </p>

      <h3 className="text-lg font-display font-semibold text-ink mt-6 mb-2">Can I do solid wall insulation as a DIY job?</h3>
      <p className="text-ink/70 mb-4 leading-relaxed">
        Technically yes for IWI on a single room, no for EWI. But to access grants, the 0% VAT, and
        any meaningful guarantee, you need an installer accredited under PAS 2030/2035. DIY-installed
        IWI is also a common cause of interstitial condensation problems if vapour control isn&apos;t
        handled correctly.
      </p>

      <h3 className="text-lg font-display font-semibold text-ink mt-6 mb-2">Is solid wall insulation worth it before a heat pump?</h3>
      <p className="text-ink/70 mb-4 leading-relaxed">
        Yes — for a solid-walled home, it&apos;s often the single biggest factor in heat pump
        running costs. A heat pump fitted to an uninsulated solid-walled house may need a 14-16kW
        unit; the same property with EWI may only need a 7-9kW unit, saving £2,000-£4,000 on the heat
        pump itself plus 30-40% on running costs. See our <Link href="/heat-pump-cost-uk" className="text-plum-muted underline">heat pump cost guide</Link> for sizing and grant detail.
      </p>

      {/* Related guides */}
      <h2 className="text-2xl font-display font-semibold text-ink mt-12 mb-4">Related guides</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <RelatedCard
          href="/home-insulation-guide-uk"
          label="Pillar guide"
          title="Home Insulation Guide UK"
          desc="The full insulation cost ladder — loft, cavity, solid wall, floor."
        />
        <RelatedCard
          href="/blog/cavity-wall-insulation-cost-uk"
          label="Sister post"
          title="Cavity Wall Insulation Cost UK"
          desc="If your walls have a cavity, this is the cheaper sibling — £450-£1,500."
        />
        <RelatedCard
          href="/blog/loft-insulation-cost-uk"
          label="Sister post"
          title="Loft Insulation Cost UK"
          desc="The single highest-payback insulation measure for most homes."
        />
        <RelatedCard
          href="/blog/draught-proofing-cost-uk"
          label="Quick win"
          title="Draught Proofing Cost UK"
          desc="The £100-£200 starter move — fastest payback of any energy upgrade."
        />
        <RelatedCard
          href="/heat-pump-cost-uk"
          label="Pillar guide"
          title="Heat Pump Costs UK"
          desc="Why insulation comes before the heat pump, and what the BUS grant covers."
        />
        <RelatedCard
          href="/blog/how-to-improve-epc-rating"
          label="Related"
          title="How to Improve Your EPC Rating"
          desc="Solid wall insulation can lift EPC by 1-2 bands — here are the others."
        />
      </div>
    </article>
  );
}

function RelatedCard({
  href,
  label,
  title,
  desc,
}: {
  href: string;
  label: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group block bg-cream-dark rounded-2xl p-5 hover:shadow-md transition-all"
    >
      <span className="inline-block px-2 py-0.5 rounded-md bg-yellow text-ink/70 font-mono text-xs tracking-wider uppercase mb-2">
        {label}
      </span>
      <h3 className="font-display font-semibold text-base text-ink mb-1.5 leading-snug">{title}</h3>
      <p className="text-sm text-ink/60 leading-relaxed">{desc}</p>
    </Link>
  );
}
