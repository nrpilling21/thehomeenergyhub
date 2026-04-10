import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solar Panel Costs UK 2026: Prices, Savings & Payback Guide",
  description:
    "Solar panels cost £5,000–£11,000 installed in the UK (2026). With 0% VAT and Smart Export Guarantee payments, payback is 7–10 years. Full cost breakdown by system size.",
  keywords: [
    "solar panel cost uk",
    "solar panel prices uk",
    "how much do solar panels cost uk",
    "solar panel installation cost",
    "solar panels uk 2026",
    "solar panel savings uk",
    "solar panel payback period",
    "solar pv cost uk",
  ],
  openGraph: {
    title: "Solar Panel Costs UK 2026: Prices, Savings & Payback Guide",
    description:
      "Solar panels cost £5,000–£11,000 installed in the UK. Full cost breakdown, savings calculations, and payback periods for every system size.",
    url: "https://www.thehomeenergyhub.co.uk/solar-panel-costs-uk",
    type: "article",
  },
};

export default function SolarPanelCostsPage() {
  const faqItems = [
    {
      question: "How much do solar panels cost in the UK in 2026?",
      answer:
        "A typical 4kW solar panel system costs £6,000–£8,000 installed in the UK in 2026, including 0% VAT. Smaller 3kW systems start around £5,000, while larger 6kW systems cost £8,000–£11,000. Prices have fallen roughly 50% over the past decade.",
    },
    {
      question: "Are solar panels worth it in the UK?",
      answer:
        "Yes, for most homeowners. A typical 4kW system saves £500–£800 per year on electricity bills and pays for itself in 7–10 years. After payback, you get 15–20 more years of essentially free electricity. The current 0% VAT rate and Smart Export Guarantee payments further improve the financial case.",
    },
    {
      question: "How long do solar panels last?",
      answer:
        "Modern solar panels are guaranteed for 25–30 years but typically last 30–40 years with gradual output reduction. Most panels lose around 0.5% efficiency per year, meaning they still produce about 85% of their original output after 30 years.",
    },
    {
      question: "Do I need planning permission for solar panels?",
      answer:
        "In most cases, no. Solar panels fall under permitted development rights for domestic properties in England, Scotland and Wales. You will need planning permission if your home is a listed building, in a conservation area (for front-facing panels), or if the panels protrude more than 200mm from the roof surface.",
    },
    {
      question: "Can I get a grant for solar panels in the UK?",
      answer:
        "There is no direct government grant for solar panels in 2026. However, solar PV installations benefit from 0% VAT (saving roughly £1,000–£2,000) until March 2027. Low-income households in England may qualify for help through the ECO4 scheme. In Scotland, the Home Energy Scotland grant covers solar PV.",
    },
    {
      question: "How much can I earn from solar panels with the Smart Export Guarantee?",
      answer:
        "The Smart Export Guarantee (SEG) pays you for electricity you export to the grid. Rates vary by supplier, typically 4–15p per kWh in 2026. A 4kW system exporting around 50% of its generation earns roughly £100–£250 per year from SEG payments alone.",
    },
  ];

  return (
    <>
      <article className="max-w-3xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
          How Much Do Solar Panels Cost in the UK? (2026 Guide)
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          A typical 4kW solar panel system costs £6,000–£8,000 fully installed in the UK in 2026. With
          0% VAT, Smart Export Guarantee payments, and annual savings of £500–£800 on electricity bills,
          most systems pay for themselves within 7–10 years — leaving 15–20 years of near-free
          electricity.
        </p>

        {/* Quick cost summary table */}
        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
          Solar Panel Costs by System Size
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-3 pr-4 font-semibold text-gray-900">System Size</th>
                <th className="py-3 pr-4 font-semibold text-gray-900">No. of Panels</th>
                <th className="py-3 pr-4 font-semibold text-gray-900">Installed Cost</th>
                <th className="py-3 pr-4 font-semibold text-gray-900">Suitable For</th>
                <th className="py-3 font-semibold text-gray-900">Annual Savings</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4">3 kW</td>
                <td className="py-3 pr-4">7–8</td>
                <td className="py-3 pr-4">£5,000–£6,500</td>
                <td className="py-3 pr-4">1–2 bed flat/terrace</td>
                <td className="py-3">£350–£550</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4">4 kW</td>
                <td className="py-3 pr-4">10</td>
                <td className="py-3 pr-4">£6,000–£8,000</td>
                <td className="py-3 pr-4">3 bed semi-detached</td>
                <td className="py-3">£500–£800</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4">5 kW</td>
                <td className="py-3 pr-4">12–13</td>
                <td className="py-3 pr-4">£7,000–£9,500</td>
                <td className="py-3 pr-4">3–4 bed detached</td>
                <td className="py-3">£650–£950</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">6 kW</td>
                <td className="py-3 pr-4">15</td>
                <td className="py-3 pr-4">£8,000–£11,000</td>
                <td className="py-3 pr-4">4–5 bed detached</td>
                <td className="py-3">£800–£1,200</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mb-8">
          Prices include installation, scaffolding, and 0% VAT. Based on March 2026 averages from MCS-registered installers.
        </p>

        <Section title="What Affects Solar Panel Installation Costs?">
          <p>
            The headline system size is the biggest factor, but several other things influence what
            you&apos;ll actually pay. Roof type matters — flat roofs require additional mounting frames
            (adding £500–£1,000), and slate roofs need specialist fixings compared to standard tiles.
          </p>
          <p>
            Scaffolding is included in most quotes but can add £300–£800 for complex or multi-storey
            properties. Panel brand also affects price: budget panels (Trina, JA Solar) cost less than
            premium brands (SunPower, LG), though the efficiency gap has narrowed considerably.
          </p>
          <p>
            Regional pricing varies too. According to MCS data, the average cost per kW is around
            £1,590 nationally, but installations in the South East tend to cost 10–15% more than in
            the North East. Rural properties may also attract higher costs due to installer travel time.
          </p>
        </Section>

        <Section title="Solar Panels With Battery Storage">
          <p>
            Adding a battery storage system lets you use more of your solar electricity rather than
            exporting it at low SEG rates. A typical 5kWh home battery costs £2,500–£4,000 installed,
            while larger 10kWh units cost £4,000–£6,500. The most popular option in 2026 is pairing
            a 4kW solar array with a 5–10kWh battery.
          </p>
          <p>
            With battery storage, you can increase your self-consumption from roughly 40–50% to
            70–80%, significantly improving your savings. However, the payback period for the battery
            element alone is typically 10–14 years, so the financial case is weaker than for the panels
            themselves.
          </p>
          <CostTable
            title="Solar + Battery Costs"
            headers={["Package", "Installed Cost", "Annual Savings", "Payback"]}
            rows={[
              ["4kW solar only", "£6,000–£8,000", "£500–£800", "7–10 years"],
              ["4kW solar + 5kWh battery", "£9,000–£12,000", "£700–£1,000", "9–12 years"],
              ["4kW solar + 10kWh battery", "£10,500–£14,500", "£850–£1,150", "10–13 years"],
              ["6kW solar + 10kWh battery", "£13,000–£17,000", "£1,100–£1,500", "10–12 years"],
            ]}
          />
        </Section>

        <Section title="How Much Can Solar Panels Save You?">
          <p>
            Your savings depend on three things: how much electricity you use, when you use it, and
            your current tariff. At the April 2026 Ofgem price cap of 24.5p/kWh, a 4kW system
            generating around 3,400 kWh per year saves you roughly £500–£800 annually through a
            combination of reduced bills and SEG export payments.
          </p>
          <p>
            Households that are home during the day or can shift consumption (running washing machines,
            dishwashers, and EV charging while the sun is out) save the most. If you work from home,
            you could realistically use 50–60% of your solar generation directly.
          </p>
          <p>
            With an{" "}
            <Link href="/ev-charging-cost-calculator" className="text-gray-900 underline underline-offset-2 hover:text-gray-600">
              electric vehicle
            </Link>
            , the savings increase further — charging from solar rather than the grid saves 20–24p per
            kWh, which adds up to £200–£400 per year for typical driving.
          </p>
        </Section>

        <Section title="Smart Export Guarantee (SEG) Payments">
          <p>
            The Smart Export Guarantee replaced the old Feed-in Tariff in 2020. All energy suppliers
            with over 150,000 customers must offer an export tariff, though rates vary significantly.
            In 2026, the best fixed-rate SEG tariffs pay 12–15p per kWh, while variable rates track
            wholesale prices.
          </p>
          <p>
            A 4kW system typically exports around 50% of its generation (about 1,700 kWh), earning
            £100–£250 per year from SEG payments. Octopus Energy&apos;s Flux tariff and similar
            time-of-use export deals can be more lucrative if you have a battery and can export during
            peak evening hours.
          </p>
        </Section>

        <Section title="Solar Panel Payback Period in the UK">
          <p>
            The payback period is how long it takes for your cumulative savings to equal the upfront
            cost. For a typical 4kW system at £7,000, saving £650 per year, payback is around 10–11
            years. Factor in 0% VAT savings and a competitive SEG tariff, and this drops to 7–9 years.
          </p>
          <p>
            After payback, a 4kW system generates £650+ in annual savings for the remaining 15–20
            years of its life. Over 25 years, the total financial benefit of a £7,000 system is
            typically £9,000–£14,000 — a solid return on investment.
          </p>
        </Section>

        <Section title="VAT and Government Support for Solar Panels">
          <p>
            Solar PV installations in the UK currently benefit from 0% VAT, which was introduced in
            April 2022 and is confirmed until 31 March 2027. This saves roughly £1,000–£2,000 on a
            typical installation — it is effectively a government subsidy.
          </p>
          <p>
            There is no direct grant for solar panels equivalent to the{" "}
            <Link href="/heat-pump-cost-uk" className="text-gray-900 underline underline-offset-2 hover:text-gray-600">
              £7,500 heat pump BUS grant
            </Link>
            . However, low-income households in England may qualify for free or subsidised solar through
            the ECO4 scheme or local authority programmes. In Scotland, Home Energy Scotland offers
            interest-free loans and cashback grants that can cover solar PV.
          </p>
        </Section>

        <Section title="Types of Solar Panel">
          <p>
            There are three main types of solar panel available in the UK. Monocrystalline panels are
            the most popular, offering the best efficiency (20–22%) and a sleek black appearance. They
            cost slightly more but generate more power per square metre, making them ideal for smaller
            roofs.
          </p>
          <p>
            Polycrystalline panels are cheaper but less efficient (15–17%) and have a blue, speckled
            look. They&apos;re becoming less common as monocrystalline prices have dropped. Thin-film
            panels are the least efficient but work well in partial shade and can be integrated into
            building materials — though they&apos;re rarely used for domestic rooftop installations.
          </p>
        </Section>

        <Section title="How Many Solar Panels Do I Need?">
          <p>
            The right system size depends on your electricity usage, available roof space, and budget.
            The average UK household uses around 3,500 kWh of electricity per year. A 4kW system
            (10 panels) generates roughly 3,400 kWh annually — close to covering your full usage on
            paper, though you&apos;ll still draw from the grid at night and on cloudy days.
          </p>
          <p>
            If you have an{" "}
            <Link href="/ev-charging-cost-calculator" className="text-gray-900 underline underline-offset-2 hover:text-gray-600">
              electric car
            </Link>{" "}
            or{" "}
            <Link href="/heat-pump-cost-uk" className="text-gray-900 underline underline-offset-2 hover:text-gray-600">
              heat pump
            </Link>
            , you&apos;ll want a larger system — 5–6kW is sensible for households with high
            electricity demand. Each standard 400W panel needs about 1.7m² of roof space, so a 4kW
            system requires around 17m² of south-facing roof.
          </p>
        </Section>

        <Section title="Is My Roof Suitable for Solar Panels?">
          <p>
            The ideal roof faces south, has a pitch of 30–40 degrees, and is unshaded. But solar panels
            still work well on east or west-facing roofs — you&apos;ll get around 15–20% less output
            compared to a perfect south-facing installation. North-facing roofs are generally not
            recommended.
          </p>
          <p>
            Shading from trees, chimneys, or neighbouring buildings can reduce output significantly.
            Modern panels with optimisers or microinverters handle partial shading better than older
            string inverter systems. Your installer should carry out a shading analysis as part of the
            quote — be wary of any who skip this step.
          </p>
        </Section>

        <Section title="Choosing a Solar Panel Installer">
          <p>
            Always use an MCS-certified installer — this is a requirement for SEG eligibility and any
            future government support schemes. Get at least three quotes and check that each includes
            scaffolding, electrical work, and all DNO (Distribution Network Operator) notification fees.
          </p>
          <p>
            Look for RECC (Renewable Energy Consumer Code) membership, which provides an additional
            layer of consumer protection. Check reviews on Trustpilot and Google, and ask for references
            from recent local installations. Avoid door-to-door sales companies offering &quot;free&quot;
            panels — these typically involve long-term contracts that limit your savings.
          </p>
        </Section>

        <Section title="Are Solar Panels Worth It in the UK?">
          <p>
            For most homeowners with a suitable roof, yes. The combination of 0% VAT, falling panel
            prices, high electricity costs, and SEG payments makes the financial case stronger than
            it has ever been. A 4kW system costing £7,000 will typically return £9,000–£14,000 over
            its lifetime.
          </p>
          <p>
            Solar panels also add value to your property. Research from the Department of Energy
            suggests homes with solar panels sell for 2–4% more. And unlike boiler replacements or
            new windows, solar panels have virtually zero maintenance costs — an occasional clean and
            an inverter replacement after 10–15 years (£500–£1,000) is all that&apos;s needed.
          </p>
          <p>
            The biggest risk is that electricity prices fall significantly, reducing your savings. But
            with the UK&apos;s net zero targets and increasing demand from EVs and heat pumps, most
            analysts expect electricity prices to remain elevated throughout the 2020s and 2030s.
          </p>
        </Section>

        {/* Bottom CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mt-10 mb-10">
          <div className="font-semibold text-gray-900 mb-1">Thinking about a heat pump too?</div>
          <p className="text-sm text-gray-500 mb-3">
            Solar panels and heat pumps are a natural pairing — use solar electricity to power your
            heating. See our full heat pump cost breakdown and calculator.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/heat-pump-cost-uk"
              className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              Heat pump costs
            </Link>
            <Link
              href="/heat-pump-cost-calculator"
              className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-900 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              Heat pump calculator
            </Link>
          </div>
        </div>

        {/* Related content links */}
        <div className="border-t border-gray-100 pt-8 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/heat-pump-cost-uk"
              className="block border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900 mb-1">Heat Pump Costs UK (2026)</div>
              <p className="text-sm text-gray-500">
                Air source from £8,000, ground source from £15,000 — with a £7,500 grant available.
              </p>
            </Link>
            <Link
              href="/best-ev-charger-uk"
              className="block border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900 mb-1">Best EV Chargers UK</div>
              <p className="text-sm text-gray-500">
                Five smart chargers compared — including solar diverting for EV charging.
              </p>
            </Link>
            <Link
              href="/ev-charging-cost-calculator"
              className="block border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900 mb-1">EV Charging Cost Calculator</div>
              <p className="text-sm text-gray-500">
                See how much you can save by charging your EV with solar panels.
              </p>
            </Link>
            <Link
              href="/blog/loft-insulation-cost-uk"
              className="block border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900 mb-1">Loft Insulation Costs UK</div>
              <p className="text-sm text-gray-500">
                Insulate first, then add solar — maximise the value of every upgrade.
              </p>
            </Link>
          </div>
        </div>

        {/* FAQ with JSON-LD */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question} className="border-b border-gray-100 pb-6 last:border-0">
                <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
        {title}
      </h2>
      <div className="text-gray-600 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

function CostTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-6">
      <h3 className="text-base font-medium text-gray-900 mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              {headers.map((h) => (
                <th key={h} className="py-3 pr-4 font-semibold text-gray-900">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {rows.map((row, i) => (
              <tr
                key={i}
                className={
                  i < rows.length - 1 ? "border-b border-gray-100" : ""
                }
              >
                {row.map((cell, j) => (
                  <td key={j} className="py-3 pr-4">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
