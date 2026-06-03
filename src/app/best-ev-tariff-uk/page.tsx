import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best EV Tariff UK 2026 — Octopus Go vs Intelligent vs OVO vs EDF Compared",
  description:
    "The cheapest UK EV electricity tariffs in 2026, compared head-to-head. Octopus Intelligent Go (7.5p), Octopus Go (8.5p), OVO Charge Anytime (8.5p), EDF GoElectric (9p), British Gas Electric Driver (9.9p), Scottish Power EV Saver and more — eligibility, smart meter requirements and how much each can save.",
  alternates: {
    canonical: "https://www.thehomeenergyhub.co.uk/best-ev-tariff-uk",
  },
  openGraph: {
    title: "Best EV Tariff UK 2026 — Compared Head-to-Head",
    description:
      "Octopus Intelligent Go vs Octopus Go vs OVO Charge Anytime vs EDF GoElectric — UK EV tariffs ranked by 2026 rate, eligibility and total annual cost.",
    url: "https://www.thehomeenergyhub.co.uk/best-ev-tariff-uk",
    type: "website",
  },
};

type Tariff = {
  name: string;
  supplier: string;
  offPeak: string;
  hours: string;
  peakHint: string;
  smartMeter: string;
  carRequirement: string;
  bestFor: string;
};

const TARIFFS: Tariff[] = [
  {
    name: "Intelligent Octopus Go",
    supplier: "Octopus Energy",
    offPeak: "7.5p/kWh",
    hours: "6 hours (23:30–05:30) plus app-extended smart sessions",
    peakHint: "Peak rate roughly tracks the Ofgem cap (~24–26p)",
    smartMeter: "SMETS2 required (DCC half-hourly settlement)",
    carRequirement: "Compatible EV or compatible charger (Ohme, Wallbox, Hypervolt, Zappi)",
    bestFor: "Households whose car/charger is on the compatibility list — the longest cheap window on the market.",
  },
  {
    name: "Octopus Go",
    supplier: "Octopus Energy",
    offPeak: "8.5p/kWh",
    hours: "5 hours (00:30–05:30 fixed)",
    peakHint: "Peak rate roughly tracks the Ofgem cap (~24–26p)",
    smartMeter: "SMETS2 required",
    carRequirement: "Any EV — no smart charger compatibility check",
    bestFor: "Anyone with an EV and a standard 7kW wallbox who can&apos;t qualify for Intelligent Go.",
  },
  {
    name: "OVO Charge Anytime",
    supplier: "OVO Energy",
    offPeak: "8.5p/kWh (charging only)",
    hours: "Any time — applied retrospectively to charging kWh",
    peakHint: "Standard variable on the rest of the home (~24p)",
    smartMeter: "SMETS2 plus OVO-supported smart charger or EV API",
    carRequirement: "Compatible EV/charger via the OVO Drive app",
    bestFor: "Drivers who can&apos;t reliably charge inside a fixed off-peak window (shift workers, holiday charging).",
  },
  {
    name: "EDF GoElectric Overnight",
    supplier: "EDF",
    offPeak: "9p/kWh",
    hours: "5 hours (00:00–05:00)",
    peakHint: "23–24p outside the window",
    smartMeter: "SMETS2 required",
    carRequirement: "Any EV",
    bestFor: "Existing EDF customers wanting a fixed 12-month price stability play.",
  },
  {
    name: "British Gas Electric Driver",
    supplier: "British Gas",
    offPeak: "9.9p/kWh",
    hours: "5 hours (00:00–05:00)",
    peakHint: "Standard SVT on remainder (~24.5p)",
    smartMeter: "SMETS2 required",
    carRequirement: "Any EV",
    bestFor: "British Gas customers who don&apos;t want to switch supplier but want the cheap window.",
  },
  {
    name: "Scottish Power EV Saver",
    supplier: "Scottish Power",
    offPeak: "8.9p/kWh",
    hours: "4 hours (00:30–04:30)",
    peakHint: "~24.5p outside the window",
    smartMeter: "SMETS2 required",
    carRequirement: "Any EV",
    bestFor: "Households on Scottish Power who can keep charging inside a tight 4-hour window.",
  },
];

type FAQ = { question: string; answer: string };

const FAQS: FAQ[] = [
  {
    question: "Which UK EV tariff is cheapest in 2026?",
    answer:
      "Intelligent Octopus Go at 7.5p/kWh has the lowest published off-peak rate. Octopus Go (8.5p) and OVO Charge Anytime (8.5p) are joint second. EDF GoElectric Overnight (9p) and Scottish Power EV Saver (8.9p) sit slightly above. British Gas Electric Driver (9.9p) is the most expensive of the major-supplier EV tariffs. The cheapest published rate doesn&apos;t always win in practice — if your car or charger isn&apos;t on Intelligent Go&apos;s compatibility list, Go at 8.5p is the next-best fixed-window option. If you can&apos;t reliably charge between 00:30 and 05:30, OVO Charge Anytime&apos;s anytime-billing model often beats both.",
  },
  {
    question: "Do I need a smart meter for an EV tariff?",
    answer:
      "Yes. Every published UK EV tariff requires a working SMETS2 smart meter operating in half-hourly settlement mode through the DCC. Without it the supplier cannot bill your off-peak kWh separately. If you have a SMETS1 meter it likely needs migrating — your supplier handles this free of charge, usually inside 90 days. If your current SMETS2 has gone &quot;dumb&quot; after a switch, your supplier is required to restore the smart connection within 90 days under Ofgem rules. Our smart meter problems guide walks through how to push them on it.",
  },
  {
    question: "Octopus Go vs Intelligent Octopus Go — which should I pick?",
    answer:
      "Intelligent Go is cheaper (7.5p vs 8.5p) and gives a longer cheap window (6 hours vs 5), but it only works if your car or charger is on Octopus&apos;s compatibility list. Octopus controls the charging session — the app starts and stops the charge to balance the grid. If you want full manual control over when you charge, or your hardware isn&apos;t compatible, plain Octopus Go is the right pick. For most drivers with a 2022+ EV and a smart charger like an Ohme, Zappi, Hypervolt or Wallbox, Intelligent Go is the better deal.",
  },
  {
    question: "How much can the right EV tariff save me?",
    answer:
      "On 8,000 miles per year of typical UK driving the difference between a standard variable tariff (~24.5p/kWh) and an EV off-peak tariff (7.5–9p) is around £400–£700 per year just on the EV. If you also run a heat pump on a heat-pump-friendly tariff like Octopus Cosy, or a home battery on time-of-use arbitrage, the gap widens. Plug your bill and assets into our smart meter savings calculator for a household-specific estimate.",
  },
  {
    question: "Can I get an EV tariff without an EV?",
    answer:
      "Octopus Go and OVO Charge Anytime require proof of EV ownership or a smart charger registered to your supply. EDF GoElectric Overnight and British Gas Electric Driver historically required a declaration but enforcement is light. If you have a home battery or a heat pump but no EV, you may still qualify for an EV tariff at signup — though the supplier may move you off it if usage doesn&apos;t look like EV charging. The cleaner play if you have a heat pump is Octopus Cosy, not an EV tariff.",
  },
  {
    question: "Does Octopus Cosy compete with EV tariffs?",
    answer:
      "Cosy is a heat-pump tariff (three cheap windows totalling 9 hours/day at ~13p/kWh, the standard rate the rest of the time). It is cheaper than Go on a per-kWh basis for the heat pump but more expensive for the EV — the trade-off depends on how big each load is. Households with both a heat pump and an EV often split: Cosy if the heat pump dominates (large home, ASHP running long hours), Go or Intelligent if the EV dominates (short home, high mileage). Octopus does not currently allow both on the same MPAN.",
  },
  {
    question: "Are EV tariffs fixed-rate or variable?",
    answer:
      "Octopus Go and Intelligent Octopus Go are variable — the off-peak rate has held steady but the peak rate moves with the wider Octopus tracker product. EDF GoElectric is offered on a 12-month fixed term. OVO Charge Anytime applies a fixed charging-only credit on top of your underlying tariff (which can be fixed or variable). British Gas Electric Driver is a 12-month fixed product. Check the current contract length on the supplier site before signing up — wholesale prices can move quickly.",
  },
  {
    question: "How do I switch to an EV tariff?",
    answer:
      "Apply directly on the supplier&apos;s site — the switch takes 5–10 working days under the Faster Switching guarantee. Your existing supplier handles the meter readings. If you don&apos;t yet have a SMETS2 meter the supplier will arrange a free upgrade install before activating the tariff, which can add 4–8 weeks. Confirm in writing which charging hours apply before you sign — and check the early-exit fee on any 12-month fixed product.",
  },
];

export default function BestEvTariffUkPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-10 text-ink">
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
        Best EV Tariff UK 2026
      </h1>
      <p className="text-ink/70 text-base mb-2">
        Octopus Intelligent Go vs Octopus Go vs OVO Charge Anytime vs EDF, British Gas and Scottish
        Power — the cheapest UK electricity tariffs for EV drivers in 2026, compared head-to-head.
      </p>
      <p className="text-ink/55 text-sm mb-8">Updated June 2026</p>

      <div className="bg-cream-dark border border-plum-light/20 rounded-2xl p-5 mb-10">
        <div className="text-xs font-bold uppercase tracking-widest text-ink/70 mb-2">
          The short answer
        </div>
        <p className="text-ink leading-relaxed mb-3">
          <strong>Intelligent Octopus Go (7.5p/kWh)</strong> is the cheapest UK EV tariff in 2026 if
          your car or smart charger is on the compatibility list. <strong>Octopus Go (8.5p)</strong>{" "}
          is the simpler next-best option for anyone whose hardware isn&apos;t supported.{" "}
          <strong>OVO Charge Anytime (8.5p)</strong> wins for drivers who can&apos;t reliably charge
          inside a fixed window. Every published EV tariff requires a working SMETS2{" "}
          <Link href="/smart-meter-guide-uk" className="text-ink underline underline-offset-2">
            smart meter
          </Link>
          .
        </p>
        <p className="text-ink/70 text-sm leading-relaxed">
          On 8,000 miles a year, switching from a standard variable tariff to an EV off-peak tariff
          saves around <strong>£400–£700</strong> on the EV alone. For a household-specific estimate
          covering EVs, heat pumps and solar, run the numbers through our{" "}
          <Link href="/smart-meter-savings-calculator" className="text-ink underline underline-offset-2">
            smart meter savings calculator
          </Link>
          .
        </p>
      </div>

      <h2 className="font-display text-xl font-semibold mt-10 mb-4">UK EV tariff comparison (2026)</h2>
      <div className="overflow-x-auto mb-10 rounded-2xl border border-plum-light/20">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-plum-light/20 bg-cream-dark text-left">
              <th className="py-3 px-4 font-semibold text-ink">Tariff</th>
              <th className="py-3 px-4 font-semibold text-ink">Off-peak rate</th>
              <th className="py-3 px-4 font-semibold text-ink">Off-peak window</th>
              <th className="py-3 px-4 font-semibold text-ink">Best for</th>
            </tr>
          </thead>
          <tbody className="text-ink/70">
            {TARIFFS.map((t) => (
              <tr key={t.name} className="border-b border-plum-light/15 last:border-0">
                <td className="py-3 px-4">
                  <div className="font-semibold text-ink">{t.name}</div>
                  <div className="text-xs text-ink/55">{t.supplier}</div>
                </td>
                <td className="py-3 px-4 font-semibold text-ink">{t.offPeak}</td>
                <td className="py-3 px-4">{t.hours}</td>
                <td className="py-3 px-4" dangerouslySetInnerHTML={{ __html: t.bestFor }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-ink/65 leading-relaxed mb-8">
        Rates above are the current published off-peak figures from each supplier&apos;s public
        tariff page, June 2026. Peak rates outside the off-peak window roughly track the Ofgem
        default cap (24–26p/kWh). Always confirm the current rate and contract length on the
        supplier site before signing up — wholesale electricity prices can move quickly.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-4">
        Annual cost: standard tariff vs EV tariff
      </h2>
      <p className="text-ink/65 leading-relaxed mb-5">
        Worked example: 8,000 miles/year, 3.5 miles/kWh efficiency = 2,286 kWh of charging per year.
      </p>
      <div className="overflow-x-auto mb-10 rounded-2xl border border-plum-light/20">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-plum-light/20 bg-cream-dark text-left">
              <th className="py-3.5 px-4 font-semibold text-ink">Tariff</th>
              <th className="py-3.5 px-4 font-semibold text-ink">Rate</th>
              <th className="py-3.5 px-4 font-semibold text-ink">Annual EV electricity</th>
              <th className="py-3.5 px-4 font-semibold text-ink">Annual saving</th>
            </tr>
          </thead>
          <tbody className="text-ink/70">
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">Standard variable</td>
              <td className="py-3 px-4">24.5p/kWh</td>
              <td className="py-3 px-4">£560</td>
              <td className="py-3 px-4 text-ink/55">baseline</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">Intelligent Octopus Go</td>
              <td className="py-3 px-4">7.5p/kWh</td>
              <td className="py-3 px-4 font-semibold text-ink">£172</td>
              <td className="py-3 px-4 font-semibold text-ink">£388</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">Octopus Go</td>
              <td className="py-3 px-4">8.5p/kWh</td>
              <td className="py-3 px-4 font-semibold text-ink">£194</td>
              <td className="py-3 px-4 font-semibold text-ink">£366</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">OVO Charge Anytime</td>
              <td className="py-3 px-4">8.5p/kWh</td>
              <td className="py-3 px-4 font-semibold text-ink">£194</td>
              <td className="py-3 px-4 font-semibold text-ink">£366</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">Scottish Power EV Saver</td>
              <td className="py-3 px-4">8.9p/kWh</td>
              <td className="py-3 px-4">£203</td>
              <td className="py-3 px-4">£357</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">EDF GoElectric Overnight</td>
              <td className="py-3 px-4">9p/kWh</td>
              <td className="py-3 px-4">£206</td>
              <td className="py-3 px-4">£354</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-ink">British Gas Electric Driver</td>
              <td className="py-3 px-4">9.9p/kWh</td>
              <td className="py-3 px-4">£226</td>
              <td className="py-3 px-4">£334</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-ink/55 text-sm mb-10">
        These are EV-only figures. Households with higher mileage or a larger battery scale linearly
        — at 12,000 miles/year the savings rise by ~50%. The figures assume 100% of EV charging
        happens inside the off-peak window; in practice 90–95% is typical for drivers with a smart
        charger.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-4">
        Which EV tariff should you pick?
      </h2>
      <p className="text-ink/65 leading-relaxed mb-4">
        The right choice depends on three things: whether your hardware is compatible with
        Intelligent Octopus Go, how predictable your overnight charging is, and what other big
        electrical loads (heat pump, battery, solar) you have at home. The decision tree is short:
      </p>
      <ol className="list-decimal pl-6 space-y-3 text-ink/70 mb-10">
        <li>
          <strong>Got a 2022+ EV or a compatible smart charger</strong> (Ohme, Hypervolt, Zappi,
          Wallbox)? <strong>Intelligent Octopus Go</strong> — cheapest rate, longest window.
        </li>
        <li>
          <strong>EV is older or your charger isn&apos;t on the compatibility list?</strong>{" "}
          <strong>Octopus Go</strong> — slightly more expensive, no compatibility check.
        </li>
        <li>
          <strong>Can&apos;t commit to charging inside a fixed window</strong> (shift work, holidays,
          irregular routine)? <strong>OVO Charge Anytime</strong> — credits charging kWh at any time.
        </li>
        <li>
          <strong>Already with EDF, British Gas or Scottish Power and don&apos;t want to switch?</strong>{" "}
          Take their EV tariff — still cheaper than the standard variable. EDF GoElectric&apos;s
          12-month fix is the best price-stability play of these.
        </li>
        <li>
          <strong>Got a heat pump as well as an EV?</strong> If the heat pump dominates your bill,{" "}
          <Link href="/heat-pump-cost-uk" className="underline underline-offset-2">
            Octopus Cosy
          </Link>{" "}
          may beat any EV tariff overall. Run both scenarios through the{" "}
          <Link href="/smart-meter-savings-calculator" className="underline underline-offset-2">
            smart meter savings calculator
          </Link>{" "}
          before committing.
        </li>
      </ol>

      <h2 className="font-display text-xl font-semibold mt-10 mb-4">
        What you need to qualify
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-ink/70 mb-8">
        <li>
          <strong>A SMETS2 smart meter in half-hourly mode.</strong> A non-smart SMETS1 cannot bill
          the off-peak window separately — see our{" "}
          <Link href="/blog/smets1-vs-smets2-uk" className="underline underline-offset-2">
            SMETS1 vs SMETS2 guide
          </Link>{" "}
          if you&apos;re unsure which you have.
        </li>
        <li>
          <strong>Proof of EV ownership or a registered smart charger.</strong> Suppliers check this
          at sign-up.
        </li>
        <li>
          <strong>A 7kW home wallbox.</strong> Granny-cable charging from a 3-pin socket still
          benefits from the off-peak rate but slows enough that you may not finish in the window. See
          our{" "}
          <Link href="/best-ev-charger-uk" className="underline underline-offset-2">
            best EV charger guide
          </Link>{" "}
          for the chargers that handle Intelligent Octopus Go cleanly.
        </li>
        <li>
          <strong>A working in-home display.</strong> Not strictly required, but the easiest way to
          verify your supplier is honouring the off-peak rate. See our{" "}
          <Link href="/blog/best-smart-meter-in-home-display-uk" className="underline underline-offset-2">
            best smart meter IHD guide
          </Link>{" "}
          for displays that show half-hourly consumption clearly.
        </li>
      </ul>

      <h2 className="font-display text-xl font-semibold mt-10 mb-4">
        Frequently asked questions
      </h2>
      <div className="space-y-6 mb-10">
        {FAQS.map((f) => (
          <div key={f.question} className="border-b border-plum-light/20 pb-6 last:border-0">
            <h3 className="font-display font-semibold text-ink mb-2">{f.question}</h3>
            <p className="text-ink/65 text-base leading-relaxed">{f.answer}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-xl font-semibold mt-12 mb-4">Related Guides</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <Link
          href="/best-ev-charger-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">Best EV charger UK</div>
          <p className="text-sm text-ink/55">
            Five smart wallboxes compared — including the chargers compatible with Intelligent
            Octopus Go.
          </p>
        </Link>
        <Link
          href="/ev-charging-cost-calculator"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">EV charging cost calculator</div>
          <p className="text-sm text-ink/55">
            Punch in your car and tariff for a per-charge and annual cost figure.
          </p>
        </Link>
        <Link
          href="/smart-meter-savings-calculator"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">Smart meter savings calculator</div>
          <p className="text-sm text-ink/55">
            Household-specific estimate combining EV tariff, heat pump, solar and battery savings.
          </p>
        </Link>
        <Link
          href="/blog/how-much-charge-electric-car-home-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">How much to charge an EV at home</div>
          <p className="text-sm text-ink/55">
            Per-charge and per-mile costs across standard, smart and solar tariffs.
          </p>
        </Link>
        <Link
          href="/smart-meter-guide-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">Smart meter guide UK</div>
          <p className="text-sm text-ink/55">
            The SMETS2 prerequisite every EV tariff depends on — explained in full.
          </p>
        </Link>
        <Link
          href="/blog/smets1-vs-smets2-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">SMETS1 vs SMETS2</div>
          <p className="text-sm text-ink/55">
            Why SMETS1 meters often block EV tariffs and how to get yours migrated.
          </p>
        </Link>
      </div>

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          }),
        }}
      />
    </article>
  );
}
