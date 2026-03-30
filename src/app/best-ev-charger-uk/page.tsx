import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Home EV Charger UK (2026): Honest Comparison",
  description:
    "Five home EV chargers compared on what matters: smart tariff integration, solar compatibility, build quality, app experience, and installed price.",
};

export default function EvChargerPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
        Best Home EV Charger UK (2026): Honest Comparison
      </h1>
      <p className="text-gray-500 text-lg mb-8 leading-relaxed">
        A good home EV charger costs £800–£1,200 fully installed, charges your car 3–4x faster than a
        three-pin plug, and pays for itself within a year through cheaper overnight electricity rates.
        Here&apos;s which one to actually buy, based on what matters most to you.
      </p>

      {/* Quick recommendation table */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Recommendation</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="py-3 pr-4 font-semibold text-gray-900">If you need...</th>
              <th className="py-3 pr-4 font-semibold text-gray-900">Get this</th>
              <th className="py-3 font-semibold text-gray-900">Price (installed)</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4">Best for smart tariff savings</td>
              <td className="py-3 pr-4 font-medium text-gray-900">Ohme Home Pro</td>
              <td className="py-3">£850–£1,050</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4">Best for solar panel owners</td>
              <td className="py-3 pr-4 font-medium text-gray-900">MyEnergi Zappi</td>
              <td className="py-3">£950–£1,200</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4">Best all-rounder</td>
              <td className="py-3 pr-4 font-medium text-gray-900">Wallbox Pulsar Max</td>
              <td className="py-3">£800–£1,050</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4">Best budget option</td>
              <td className="py-3 pr-4 font-medium text-gray-900">Pod Point Solo 3S</td>
              <td className="py-3">£800–£950</td>
            </tr>
            <tr>
              <td className="py-3 pr-4">Best for future-proofing</td>
              <td className="py-3 pr-4 font-medium text-gray-900">Hypervolt Home 3</td>
              <td className="py-3">£900–£1,100</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        Every charger on this list is OZEV-approved, smart-enabled, and available at 7.4kW (the
        maximum for most UK single-phase homes). We compared them on five things that actually matter:
        smart tariff integration, solar compatibility, build quality, app experience, and total
        installed cost.
      </p>

      {/* Charger reviews */}
      <ChargerReview
        number={1}
        name="Ohme Home Pro"
        tagline="Best for Smart Tariff Users"
        price="£850–£1,050 installed"
        power="7.4kW (single-phase)"
        keyFeature="Deep smart tariff integration"
        strengths={[
          "Automatic smart tariff scheduling — set your departure time and it handles the rest",
          "Direct integration with Octopus Energy and other time-of-use tariffs",
          "Solar diversion available (though not as sophisticated as Zappi)",
          "Compact design with tethered cable included",
        ]}
        weaknesses={[
          "Solar diversion is basic compared to Zappi",
          "App can occasionally be buggy",
          "Less premium feel than Hypervolt or Wallbox",
        ]}
        bestFor="Anyone on a smart energy tariff, especially Octopus. If you're not on a smart tariff, the Ohme loses its biggest advantage."
        buyUrl="https://www.echargersuk.co.uk"
      />

      <ChargerReview
        number={2}
        name="MyEnergi Zappi"
        tagline="Best for Solar Panel Owners"
        price="£950–£1,200 installed"
        power="7.4kW (single-phase)"
        keyFeature="Solar energy diversion"
        strengths={[
          "Three modes: Fast (full power), Eco (solar + grid), Eco+ (solar only)",
          "Works with MyEnergi Eddi and Harvi for whole-house energy management",
          "British-designed and manufactured",
          "No subscription fees — all smart features are free",
        ]}
        weaknesses={[
          "More expensive than competitors",
          "Smart tariff integration isn't as polished as Ohme's",
          "App is functional but dated",
          "Eco+ mode only practical in summer",
        ]}
        bestFor="Homes with existing solar panels (3kW+ systems). Without solar, you're paying a premium for a feature you won't use."
        buyUrl="https://www.echargersuk.co.uk"
      />

      <ChargerReview
        number={3}
        name="Wallbox Pulsar Max"
        tagline="Best All-Rounder"
        price="£800–£1,050 installed"
        power="7.4kW (single-phase)"
        keyFeature="Compact, well-built, strong app"
        strengths={[
          "Smallest form factor of any tethered charger",
          "LED status ring gives clear visual feedback",
          "OCPP support for multiple energy platforms",
          "Strong app with detailed statistics and scheduling",
        ]}
        weaknesses={[
          "Smart tariff integration less automated than Ohme",
          "No native solar diversion",
          "Tethered cable only — no untethered option",
        ]}
        bestFor="Someone who wants a reliable, well-designed charger without needing specialist features. The 'just works' option."
        buyUrl="https://www.echargersuk.co.uk"
      />

      <ChargerReview
        number={4}
        name="Pod Point Solo 3S"
        tagline="Best Budget Option"
        price="£800–£950 installed"
        power="7.4kW (single-phase)"
        keyFeature="Simple, reliable, cheapest installed price"
        strengths={[
          "Often the cheapest fully-installed option",
          "Solid reliability — Pod Point has been around since 2009",
          "Simple setup and scheduling via app",
          "Untethered socket version available",
        ]}
        weaknesses={[
          "App is basic compared to Ohme or Wallbox",
          "Limited smart tariff integration",
          "No solar diversion capability",
          "Functional rather than attractive design",
        ]}
        bestFor="Someone who wants the cheapest reliable charger and doesn't need solar or smart tariff features."
        buyUrl="https://www.echargersuk.co.uk"
      />

      <ChargerReview
        number={5}
        name="Hypervolt Home 3"
        tagline="Best for Future-Proofing"
        price="£900–£1,100 installed"
        power="7.4kW (single-phase)"
        keyFeature="Sleek design, bidirectional-ready"
        strengths={[
          "Premium industrial design — the best-looking charger on the list",
          "Built-in energy monitoring",
          "Designed for future V2G/bidirectional charging support",
          "OCPP 2.0 support",
        ]}
        weaknesses={[
          "Newer to market, less long-term reliability data",
          "V2G is still mostly theoretical for most cars in 2026",
          "Premium pricing for features you can't fully use yet",
        ]}
        bestFor="Early adopters and design-conscious buyers who plan to keep the charger for 10+ years and want V2G readiness."
        buyUrl="https://www.echargersuk.co.uk"
      />

      {/* Running costs */}
      <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-4">Running Costs Comparison</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="py-3 pr-4 font-semibold text-gray-900"></th>
              <th className="py-3 pr-4 font-semibold text-gray-900">Home (standard)</th>
              <th className="py-3 pr-4 font-semibold text-gray-900">Home (EV tariff)</th>
              <th className="py-3 pr-4 font-semibold text-gray-900">Public fast</th>
              <th className="py-3 font-semibold text-gray-900">Petrol</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4 font-medium text-gray-900">Cost per mile</td>
              <td className="py-3 pr-4">7–10p</td>
              <td className="py-3 pr-4">2–3p</td>
              <td className="py-3 pr-4">15–25p</td>
              <td className="py-3">16–22p</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4 font-medium text-gray-900">Annual (8,000 mi)</td>
              <td className="py-3 pr-4">£560–£800</td>
              <td className="py-3 pr-4">£160–£240</td>
              <td className="py-3 pr-4">£1,200–£2,000</td>
              <td className="py-3">£1,280–£1,760</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium text-gray-900">Monthly saving vs petrol</td>
              <td className="py-3 pr-4">£40–£80</td>
              <td className="py-3 pr-4">£85–£130</td>
              <td className="py-3 pr-4">—</td>
              <td className="py-3">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Which should you buy */}
      <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Which One Should You Buy?</h2>
      <div className="text-gray-600 leading-relaxed space-y-4 mb-10">
        <p>
          <strong>If you have solar panels:</strong> Zappi. No question.
        </p>
        <p>
          <strong>If you&apos;re on a smart tariff:</strong> Ohme Home Pro. The automated scheduling
          saves money with zero effort.
        </p>
        <p>
          <strong>If you just want a good charger:</strong> Wallbox Pulsar Max. Does everything well,
          looks good, fair price.
        </p>
        <p>
          <strong>If budget is the priority:</strong> Pod Point Solo 3S. Cheapest installed, reliable,
          does the job.
        </p>
        <p>
          <strong>If you&apos;re planning long-term:</strong> Hypervolt Home 3. V2G readiness could be
          valuable in 3–5 years.
        </p>
        <p>
          For most people, the Ohme Home Pro or Wallbox Pulsar Max will be the right choice. The Ohme
          if you&apos;re willing to switch to a smart tariff (which you should — it saves hundreds per
          year regardless of charger), the Wallbox if you&apos;d rather keep things simple.
        </p>
      </div>

      {/* eChargers CTA */}
      <div className="bg-gray-900 rounded-2xl p-6 mt-10 mb-6">
        <div className="font-semibold text-white mb-1">Ready to buy?</div>
        <p className="text-sm text-gray-300 mb-3">
          Browse all five chargers with pricing, installation options, and next-day delivery at our sister
          site eChargers UK.
        </p>
        <a
          href="https://www.echargersuk.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-900 bg-white hover:bg-gray-100 transition-colors"
        >
          Shop at eChargers UK
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>

      {/* EV calculator cross-link */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6">
        <div className="font-semibold text-gray-900 mb-1">How much will charging actually cost you?</div>
        <p className="text-sm text-gray-500 mb-3">
          Use our free EV charging calculator to see your annual costs, savings vs petrol, and how
          quickly a wallbox pays for itself.
        </p>
        <Link
          href="/ev-charging-cost-calculator"
          className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          Try the EV charging calculator
        </Link>
      </div>

      {/* Cross-link */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mt-4">
        <div className="font-semibold text-gray-900 mb-1">Considering a heat pump too?</div>
        <p className="text-sm text-gray-500 mb-3">
          Use our free calculator to get a cost estimate for air or ground source heat pumps, including
          the £7,500 BUS grant.
        </p>
        <Link
          href="/heat-pump-cost-calculator"
          className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          Try the heat pump calculator
        </Link>
      </div>
    </article>
  );
}

function ChargerReview({
  number,
  name,
  tagline,
  price,
  power,
  keyFeature,
  strengths,
  weaknesses,
  bestFor,
  buyUrl,
}: {
  number: number;
  name: string;
  tagline: string;
  price: string;
  power: string;
  keyFeature: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string;
  buyUrl?: string;
}) {
  return (
    <section className="mb-10 pb-10 border-b border-gray-100 last:border-0">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        {number}. {name} — {tagline}
      </h2>
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
        <span>{price}</span>
        <span>{power}</span>
        <span>Key: {keyFeature}</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-4">
        <div>
          <div className="text-sm font-semibold text-gray-900 mb-2">Strengths</div>
          <ul className="space-y-1.5">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-600 mt-0.5 flex-shrink-0">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900 mb-2">Weaknesses</div>
          <ul className="space-y-1.5">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-gray-400 mt-0.5 flex-shrink-0">-</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        <span className="font-medium text-gray-700">Best for:</span> {bestFor}
      </p>

      {buyUrl && (
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          View {name} at eChargers UK
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      )}
    </section>
  );
}
