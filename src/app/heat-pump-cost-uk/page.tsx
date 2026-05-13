import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Much Does a Heat Pump Cost in the UK? (2026 Guide)",
  description:
    "Heat pumps cost £8,000-£15,000 for air source or £15,000-£35,000 for ground source, installed. With the £7,500 BUS grant and 0% VAT, the real cost is much lower.",
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a heat pump cost in the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "An air source heat pump costs £8,000-£15,000 installed for a typical UK home in 2026. Ground source heat pumps cost £15,000-£35,000 because of the borehole or ground array. With the £7,500 Boiler Upgrade Scheme (BUS) grant and 0% VAT until March 2027, the real cost of an air source install is often £4,000-£8,500 — broadly comparable to a high-end gas boiler replacement.",
      },
    },
    {
      "@type": "Question",
      name: "Is the £7,500 heat pump grant still available in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The Boiler Upgrade Scheme (BUS) pays £7,500 toward an air source or ground source heat pump and is confirmed running until 2028. Your installer must be MCS-registered and they handle the application on your behalf. Payment lands 4-6 weeks after the install. 0% VAT on the installation is also confirmed until 31 March 2027 — after that, VAT reverts to 20% and the real cost rises noticeably.",
      },
    },
    {
      "@type": "Question",
      name: "Are heat pumps cheaper to run than a gas boiler?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Usually, yes — but only with the right tariff. A modern air source heat pump runs at a coefficient of performance (COP) of 3-4, meaning it delivers 3-4 units of heat for every 1 unit of electricity. On a heat-pump-specific tariff like Octopus Cosy (12-15p/kWh off-peak), a well-insulated home pays around £800-£1,100 per year for heating and hot water, vs £1,000-£1,400 on gas. On the standard Ofgem unit rate of 24.5p/kWh, the savings disappear — so a smart meter and an EV/heat-pump tariff are essential to make the numbers work.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to replace my radiators for a heat pump?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Often, yes — at least some of them. Heat pumps run at a lower flow temperature (40-50°C) than gas boilers (70-80°C), so radiators need to be larger to deliver the same heat output. A good installer will do a room-by-room heat loss survey and tell you exactly which radiators need upsizing. Budget £100-£250 per replacement radiator on top of the headline install cost. Underfloor heating, where present, works particularly well with heat pumps without modification.",
      },
    },
    {
      "@type": "Question",
      name: "How long do heat pumps last?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "An air source heat pump lasts 15-20 years with annual servicing — comparable to a modern gas boiler. Ground source heat pumps last 20-25 years on the indoor unit and 50+ years on the buried ground loop. Most major manufacturers (Vaillant, Mitsubishi, Daikin, Samsung) offer 5-7 year warranties as standard, extendable to 10 years through MCS-registered installers.",
      },
    },
    {
      "@type": "Question",
      name: "Is an air source or ground source heat pump better?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "For most UK homes, air source. It's cheaper to install (£8,000-£15,000 vs £15,000-£35,000 for ground source), the BUS grant is the same £7,500 either way, and modern units run efficiently down to -15°C outdoor temperature. Ground source makes financial sense only if you have a large garden suitable for trenching, a long-term horizon (15+ years), and high heat demand — typically a large detached or rural property. The running cost gap between the two is real but usually doesn't justify the upfront premium.",
      },
    },
  ],
};


export default function HeatPumpCostPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <p className="font-mono text-sm tracking-widest text-plum-muted uppercase mb-4">Guide</p>
      <h1 className="font-display text-3xl sm:text-4xl font-normal text-ink leading-tight mb-5">
        How Much Does a Heat Pump Cost in the UK? (2026 Guide)
      </h1>
      <p className="text-ink/60 text-xl mb-10 leading-relaxed">
        Heat pumps typically cost between £8,000 and £15,000 installed for an air source unit, or
        £15,000 to £35,000 for ground source. With the Building Upgrade Scheme grant of £7,500 and the
        0% VAT rate valid until March 2027, the real cost for most households is substantially lower
        than these headline figures suggest.
      </p>

      {/* Calculator CTA - yellow background like Heidi */}
      <div className="bg-yellow rounded-2xl p-6 mb-10">
        <div className="font-display font-semibold text-ink text-lg mb-1">Get a personalised estimate</div>
        <p className="text-lg text-ink/60 mb-4">
          Our free calculator gives you a cost estimate tailored to your property, including grants and
          running cost comparison.
        </p>
        <Link
          href="/heat-pump-cost-calculator"
          className="inline-flex items-center px-6 py-2.5 rounded-xl text-base font-medium bg-ink text-cream-dark hover:opacity-90 transition"
        >
          Try the calculator
        </Link>
      </div>

      {/* Quick cost summary table */}
      <h2 className="font-display text-xl font-semibold text-ink mt-12 mb-5">Quick Cost Summary by Property Size</h2>
      <div className="overflow-x-auto mb-10 rounded-2xl border border-plum-light/20">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-plum-light/20 bg-cream-dark text-left">
              <th className="py-3.5 px-4 font-semibold text-ink">Property Type</th>
              <th className="py-3.5 px-4 font-semibold text-ink">Air Source (Installed)</th>
              <th className="py-3.5 px-4 font-semibold text-ink">Ground Source (Installed)</th>
              <th className="py-3.5 px-4 font-semibold text-ink">Net Cost (After Grant)</th>
            </tr>
          </thead>
          <tbody className="text-ink/55">
            <tr className="border-b border-plum-light/15">
              <td className="py-3.5 px-4">1-2 bed flat/terrace</td>
              <td className="py-3.5 px-4">£8,000-£10,000</td>
              <td className="py-3.5 px-4">£18,000-£22,000</td>
              <td className="py-3.5 px-4 font-semibold text-ink">£500-£2,500</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3.5 px-4">3-4 bed detached</td>
              <td className="py-3.5 px-4">£11,000-£15,000</td>
              <td className="py-3.5 px-4">£22,000-£30,000</td>
              <td className="py-3.5 px-4 font-semibold text-ink">£3,500-£7,500</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4">Large period property</td>
              <td className="py-3.5 px-4">£14,000-£18,000</td>
              <td className="py-3.5 px-4">£28,000-£35,000</td>
              <td className="py-3.5 px-4 font-semibold text-ink">£6,500-£10,500</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Section title="Air Source Heat Pump Costs">
        <p>
          An air source heat pump sits outside your property and extracts heat from the ambient air,
          even in cold conditions. Installation typically costs between £8,000 and £15,000.
        </p>
        <p>
          For a straightforward 3-4 bedroom home with adequate space and reasonable access, expect to
          pay around £12,000 installed. This includes the unit, removal of your old boiler, pipework,
          wiring, commissioning, and a standard warranty.
        </p>
        <p>
          Costs push higher if you need new radiators or underfloor heating (adds £3,000-£8,000),
          extensive pipework runs (£1,000-£2,000), or if your existing heating system needs
          significant conversion work.
        </p>
      </Section>

      <Section title="Ground Source Heat Pump Costs">
        <p>
          Ground source heat pumps are significantly more expensive because they require drilling
          boreholes or installing ground loops. Installation costs range from £15,000 to £35,000
          depending on ground conditions and property layout.
        </p>
        <p>
          Ground source systems are far more efficient than air source (COP of 4-5 vs 3-4), so they
          deliver greater energy savings over time. The main variable is geology: clay and chalk are
          cheaper to drill, while rocky ground significantly increases costs.
        </p>
      </Section>

      <Section title="Running Costs: Heat Pumps vs Gas Boilers">
        <p>
          A modern heat pump costs roughly £800 to £1,200 per year to run, depending on your home's
          size, insulation, electricity tariff, and heating demand. A gas boiler costs approximately
          £1,000-£1,400 per year, giving modest savings of 10-20% on fuel costs.
        </p>
        <p>
          The comparison looks better when you factor in grants. After the £7,500 BUS grant, an air
          source heat pump costs roughly £1,500-£2,500 net  - often less than a new boiler
          installation.
        </p>
        <p>
          Running costs swing significantly with the electricity tariff you use. Heat-pump-specific
          tariffs like Octopus Cosy require a working SMETS2{" "}
          <Link href="/smart-meter-guide-uk" className="text-yellow underline hover:no-underline">
            smart meter
          </Link>{" "}
          for half-hourly settlement — without one, you pay the standard Ofgem unit rate and most of
          the heat-pump-vs-gas savings disappear.
        </p>
      </Section>

      {/* Running costs table */}
      <h2 className="font-display text-xl font-semibold text-ink mt-12 mb-5">Running Cost Comparison</h2>
      <div className="overflow-x-auto mb-10 rounded-2xl border border-plum-light/20">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-plum-light/20 bg-cream-dark text-left">
              <th className="py-3.5 px-4 font-semibold text-ink"></th>
              <th className="py-3.5 px-4 font-semibold text-ink">Home (standard)</th>
              <th className="py-3.5 px-4 font-semibold text-ink">Home (EV tariff)</th>
              <th className="py-3.5 px-4 font-semibold text-ink">Public charger</th>
              <th className="py-3.5 px-4 font-semibold text-ink">Petrol</th>
            </tr>
          </thead>
          <tbody className="text-ink/55">
            <tr className="border-b border-plum-light/15">
              <td className="py-3.5 px-4 font-medium text-ink">Cost per mile</td>
              <td className="py-3.5 px-4">7-10p</td>
              <td className="py-3.5 px-4 font-semibold text-ink">2-3p</td>
              <td className="py-3.5 px-4">15-25p</td>
              <td className="py-3.5 px-4">16-22p</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3.5 px-4 font-medium text-ink">Annual (8,000 mi)</td>
              <td className="py-3.5 px-4">£560-£800</td>
              <td className="py-3.5 px-4 font-semibold text-ink">£160-£240</td>
              <td className="py-3.5 px-4">£1,200-£2,000</td>
              <td className="py-3.5 px-4">£1,280-£1,760</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Section title="The Building Upgrade Scheme (BUS) Grant">
        <p>
          The BUS offers £7,500 towards the cost of an air or ground source heat pump for UK
          homeowners. Most owner-occupied properties qualify. Your installer must be MCS-registered,
          and they typically handle the paperwork. Payment arrives 4-6 weeks after application.
        </p>
        <p>
          The scheme was extended until 2027, and 0% VAT on installations is confirmed until 31 March
          2027. After that date, VAT reverts to 20%, making installations noticeably more expensive.
        </p>
      </Section>

      <Section title="Is a Heat Pump Worth the Cost?">
        <p>
          For most homeowners, yes  - particularly when grants are available. After the £7,500 BUS
          grant and 0% VAT, air source installations often cost less than replacing a gas boiler.
          Payback periods are typically 8-12 years for air source, 12-18 for ground source.
        </p>
        <p>
          If your boiler is over 12 years old and you plan to stay in your home for the next decade,
          installing now is financially sensible. If your boiler is relatively new, waiting 2-3 years
          for further price reductions is reasonable.
        </p>
      </Section>

      {/* FAQ section */}
      <h2 className="font-display text-xl font-semibold text-ink mt-12 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6 mb-12">
        {FAQ_SCHEMA.mainEntity.map((q) => (
          <div key={q.name} className="border-b border-plum-light/20 pb-6 last:border-0">
            <h3 className="font-display font-semibold text-ink mb-2">{q.name}</h3>
            <p className="text-ink/65 text-base leading-relaxed">{q.acceptedAnswer.text}</p>
          </div>
        ))}
      </div>


      {/* Bottom CTA - plum dark background like Heidi's dark blocks */}
      <div className="bg-ink rounded-2xl p-6 mt-12">
        <div className="font-display font-semibold text-cream-dark text-lg mb-1">Want a personalised estimate?</div>
        <p className="text-lg text-cream-dark/70 mb-4">
          Use our free calculator to get a cost estimate based on your property size, insulation, and
          heating system.
        </p>
        <Link
          href="/heat-pump-cost-calculator"
          className="inline-flex items-center px-6 py-2.5 rounded-xl text-base font-medium bg-yellow text-ink hover:brightness-95 transition"
        >
          Calculate your heat pump cost
        </Link>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-display text-xl font-semibold text-ink mt-12 mb-5">{title}</h2>
      <div className="text-ink/65 text-lg leading-relaxed space-y-4">{children}</div>
    </section>
  );
}
