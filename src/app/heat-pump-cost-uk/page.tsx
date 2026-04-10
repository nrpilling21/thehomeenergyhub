import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Much Does a Heat Pump Cost in the UK? (2026 Guide)",
  description:
    "Heat pumps cost Â£8,000-Â£15,000 for air source or Â£15,000-Â£35,000 for ground source, installed. With the Â£7,500 BUS grant and 0% VAT, the real cost is much lower.",
};

export default function HeatPumpCostPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <p className="font-mono text-sm tracking-widest text-plum-muted uppercase mb-4">Guide</p>
      <h1 className="font-display text-3xl sm:text-4xl font-normal text-ink leading-tight mb-5">
        How Much Does a Heat Pump Cost in the UK? (2026 Guide)
      </h1>
      <p className="text-ink/60 text-xl mb-10 leading-relaxed">
        Heat pumps typically cost between Â£8,000 and Â£15,000 installed for an air source unit, or
        Â£15,000 to Â£35,000 for ground source. With the Building Upgrade Scheme grant of Â£7,500 and the
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
              <td className="py-3.5 px-4">Â£8,000-Â£10,000</td>
              <td className="py-3.5 px-4">Â£18,000-Â£22,000</td>
              <td className="py-3.5 px-4 font-semibold text-ink">Â£500-Â£2,500</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3.5 px-4">3-4 bed detached</td>
              <td className="py-3.5 px-4">Â£11,000-Â£15,000</td>
              <td className="py-3.5 px-4">Â£22,000-Â£30,000</td>
              <td className="py-3.5 px-4 font-semibold text-ink">Â£3,500-Â£7,500</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4">Large period property</td>
              <td className="py-3.5 px-4">Â£14,000-Â£18,000</td>
              <td className="py-3.5 px-4">Â£28,000-Â£35,000</td>
              <td className="py-3.5 px-4 font-semibold text-ink">Â£6,500-Â£10,500</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Section title="Air Source Heat Pump Costs">
        <p>
          An air source heat pump sits outside your property and extracts heat from the ambient air,
          even in cold conditions. Installation typically costs between Â£8,000 and Â£15,000.
        </p>
        <p>
          For a straightforward 3-4 bedroom home with adequate space and reasonable access, expect to
          pay around Â£12,000 installed. This includes the unit, removal of your old boiler, pipework,
          wiring, commissioning, and a standard warranty.
        </p>
        <p>
          Costs push higher if you need new radiators or underfloor heating (adds Â£3,000-Â£8,000),
          extensive pipework runs (Â£1,000-Â£2,000), or if your existing heating system needs
          significant conversion work.
        </p>
      </Section>

      <Section title="Ground Source Heat Pump Costs">
        <p>
          Ground source heat pumps are significantly more expensive because they require drilling
          boreholes or installing ground loops. Installation costs range from Â£15,000 to Â£35,000
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
          A modern heat pump costs roughly Â£800 to Â£1,200 per year to run, depending on your home's
          size, insulation, electricity tariff, and heating demand. A gas boiler costs approximately
          Â£1,000-Â£1,400 per year, giving modest savings of 10-20% on fuel costs.
        </p>
        <p>
          The comparison looks better when you factor in grants. After the Â£7,500 BUS grant, an air
          source heat pump costs roughly Â£1,500-Â£2,500 net  - often less than a new boiler
          installation.
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
              <td className="py-3.5 px-4">Â£560-Â£800</td>
              <td className="py-3.5 px-4 font-semibold text-ink">Â£160-Â£240</td>
              <td className="py-3.5 px-4">Â£1,200-Â£2,000</td>
              <td className="py-3.5 px-4">Â£1,280-Â£1,760</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Section title="The Building Upgrade Scheme (BUS) Grant">
        <p>
          The BUS offers Â£7,500 towards the cost of an air or ground source heat pump for UK
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
          For most homeowners, yes  - particularly when grants are available. After the Â£7,500 BUS
          grant and 0% VAT, air source installations often cost less than replacing a gas boiler.
          Payback periods are typically 8-12 years for air source, 12-18 for ground source.
        </p>
        <p>
          If your boiler is over 12 years old and you plan to stay in your home for the next decade,
          installing now is financially sensible. If your boiler is relatively new, waiting 2-3 years
          for further price reductions is reasonable.
        </p>
      </Section>

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
