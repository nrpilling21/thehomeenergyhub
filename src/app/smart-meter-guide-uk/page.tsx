import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smart Meters UK 2026: Costs, Savings, Problems and Best IHDs",
  description:
    "Everything you need to know about UK smart meters in 2026. Are they free? How much do they save? SMETS1 vs SMETS2, common problems and the best in-home displays compared.",
  keywords: [
    "smart meter uk",
    "smart meter guide uk",
    "do smart meters save money",
    "smets1 vs smets2",
    "best smart meter uk",
    "smart meter problems",
    "smart meter cost uk",
    "smart meter installation uk",
    "in home display smart meter",
  ],
  alternates: { canonical: "/smart-meter-guide-uk" },
  openGraph: {
    title: "Smart Meters UK 2026: Costs, Savings, Problems and Best IHDs",
    description:
      "Honest UK guide to smart meters in 2026: real savings (£60-£250/year), SMETS2 vs SMETS1, the most common problems and how to fix them, and which IHD is worth using.",
    url: "https://thehomeenergyhub.co.uk/smart-meter-guide-uk",
    type: "article",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are smart meters free in the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. There is no upfront cost for the smart meter itself or for installation. The cost of the rollout is recovered through standing charges across all energy bills, so technically every billpayer pays a small amount toward smart meters whether they have one or not. Refusing a smart meter does not save you money.",
      },
    },
    {
      "@type": "Question",
      name: "How much money does a smart meter save?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "On average, UK households save £60-£90 per year just from the visibility a smart meter gives them — roughly 2-3 percent off a typical bill. That figure rises substantially if you switch to a time-of-use tariff: heat-pump tariffs like Octopus Cozy or EV tariffs like Octopus Go can save another £200-£500 per year for the right household. The smart meter is the gateway, not the saving itself.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between SMETS1 and SMETS2 smart meters?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "SMETS1 was the first generation, rolled out from 2012-2018. Many SMETS1 meters went 'dumb' when customers switched supplier — they kept measuring usage but stopped sending readings. SMETS2 was introduced in 2018 and works across every UK supplier through the Data Communications Company (DCC) network. If you are getting a smart meter today, you will get a SMETS2. Most older SMETS1 meters have now been remotely re-enrolled onto the DCC network, restoring their smart functions.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my smart meter not working?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The most common reasons are: poor mobile signal at the meter location (smart meters use the WAN network to send readings), a flat in-home display battery, a Wi-Fi router moved away from the IHD, or the meter being a SMETS1 that hasn't yet been re-enrolled on the DCC network. The fix depends on which problem you have — see our smart meter problems guide for diagnostics on the 12 most common faults.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a smart meter if I have solar panels?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes — and you usually need one. The Smart Export Guarantee (SEG), which pays you for electricity you export to the grid, requires a SMETS2 smart meter that can record export readings. Without it, you cannot claim SEG payments. If you already have a smart meter, ask your supplier to switch on export readings (sometimes called 'export MPAN').",
      },
    },
    {
      "@type": "Question",
      name: "Do smart meters work on prepayment?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. SMETS2 smart meters can switch between credit and prepayment mode remotely — your supplier can change it without an engineer visit. Smart prepayment is also significantly easier than legacy key/card meters: you can top up via app, web or phone, see exact balance on the IHD, and don't lose money to emergency credit confusion.",
      },
    },
  ],
};

export default function SmartMeterGuideUkPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <p className="font-mono text-xs tracking-widest text-plum-muted uppercase mb-4">Guide</p>
      <h1 className="text-3xl font-display font-normal text-ink leading-tight mb-4">
        Smart Meters UK (2026): Costs, Savings, Problems and Best IHDs
      </h1>
      <p className="text-ink/60 text-lg mb-8 leading-relaxed">
        Around 36 million UK smart meters have been installed and roughly 60 percent of homes now have
        one. They are <strong>free to install</strong>, save the average household{" "}
        <strong>£60-£90 a year</strong> on the visibility alone, and are the gateway to the cheaper
        time-of-use tariffs that can save another £200-£500. Here is the honest picture in 2026: what
        they cost, what they save, the problems people actually run into, and how to get the most out
        of yours.
      </p>

      {/* Quick-answer table */}
      <h2 className="text-xl font-display font-semibold text-ink mb-4">Smart Meters at a Glance</h2>
      <div className="overflow-x-auto mb-10 rounded-2xl border border-plum-light/20">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-plum-light/20 text-left bg-cream-dark">
              <th className="py-3 px-4 font-semibold text-ink">Question</th>
              <th className="py-3 px-4 font-semibold text-ink">Short answer</th>
            </tr>
          </thead>
          <tbody className="text-ink/65">
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">Cost to install</td>
              <td className="py-3 px-4">£0 — free from your supplier</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">Average yearly saving</td>
              <td className="py-3 px-4">£60-£90 (just from visibility)</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">Saving with smart tariff</td>
              <td className="py-3 px-4">£200-£500 extra (heat pump or EV tariffs)</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">Generation in 2026</td>
              <td className="py-3 px-4">SMETS2 (compatible across all suppliers)</td>
            </tr>
            <tr className="border-b border-plum-light/15">
              <td className="py-3 px-4 font-medium text-ink">Installation time</td>
              <td className="py-3 px-4">90-120 minutes per meter (gas + electric)</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-ink">In-home display included</td>
              <td className="py-3 px-4">Yes — IHD provided free with installation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-ink/65 leading-relaxed mb-10">
        The honest take: a smart meter on its own is not a money-saving device. It is a measuring
        device that lets <em>you</em> save money — by spotting standby loads, switching to better
        tariffs, and understanding when your home uses energy. The households that get the biggest
        savings are the ones who actually look at their data. Two-thirds of smart meter owners do not.
      </p>

      <Section title="Are Smart Meters Worth It in 2026?">
        <p>
          For nearly every UK home, yes — and the financial case has only got stronger over the past
          two years.
        </p>
        <p>
          The original smart meter rollout was sold on energy savings of around £11 a year, which is
          why some of the early coverage was sceptical. That number is comically out of date in 2026.
          Three things have changed:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Time-of-use tariffs are now mainstream.</strong> Octopus, EDF, OVO, E.ON Next and
            British Gas all offer them. They are only available with a working smart meter, and the
            savings are an order of magnitude bigger than the £11 number.
          </li>
          <li>
            <strong>The Smart Export Guarantee requires SMETS2.</strong> If you have or are
            considering solar panels, you cannot claim SEG export payments without one. That alone is
            worth £100-£250 a year for a typical 4kW system.
          </li>
          <li>
            <strong>Heat pumps need them.</strong> Heat-pump-friendly tariffs like Cosy or Agile cut
            running costs by 30-50 percent vs. a standard tariff, but they require a working SMETS2
            meter for half-hourly settlement.
          </li>
        </ul>
        <p>
          The honest exceptions: if you are happy with your current meter, your bills are already
          accurate, and you have no plans to install solar, an EV charger, or a heat pump in the next
          5 years, the case is weaker. You will still save the £60-£90 visibility average — but you
          can do nothing and not lose much.
        </p>
        <p>
          Want the data behind the savings figures? See our deep-dive on{" "}
          <Link href="/blog/do-smart-meters-save-you-money-uk" className="text-ink underline">
            do smart meters save you money
          </Link>{" "}
          — it walks through the published Ofgem and Smart Energy GB studies and what they actually
          show.
        </p>
      </Section>

      <Section title="SMETS1 vs SMETS2: What's the Difference?">
        <p>
          SMETS stands for Smart Metering Equipment Technical Specification. There have been two
          generations:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>SMETS1</strong> — the first generation, installed 2012-2018. Around 12 million
            were rolled out. The big problem: each was tied to the supplier that installed it, and if
            you switched supplier the meter often went &quot;dumb&quot; — it still measured usage but
            stopped sending readings.
          </li>
          <li>
            <strong>SMETS2</strong> — second generation, introduced 2018. Communicates over the Data
            Communications Company (DCC) wireless network, which every supplier connects to. So when
            you switch supplier the meter keeps working without missing a beat.
          </li>
        </ul>
        <p>
          If you are getting a smart meter installed in 2026, you will get a SMETS2. You cannot
          request a SMETS1, and you would not want to. Most of the older SMETS1 meters have now been
          remotely &quot;re-enrolled&quot; onto the DCC network, which restores their smart functions
          without anyone visiting your home. If yours is still dumb, your supplier can request a
          re-enrolment for you — or replace it with a SMETS2 if it cannot be enrolled.
        </p>
        <p>
          To check what generation you have, look at the model number on the meter (or in your
          supplier app). SMETS2 meters typically have model numbers starting with EDMI, Aclara, Honeywell
          or Itron, and an installation date after late 2018.
        </p>
      </Section>

      <Section title="The Most Common Smart Meter Problems">
        <p>
          The smart meter rollout has not been smooth, and the problems people actually hit fall into
          a small set of repeating patterns:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>The IHD has gone blank.</strong> Usually a flat battery or it has been moved out
            of range of the meter. The fix is normally a few minutes.
          </li>
          <li>
            <strong>Readings stopped reaching the supplier.</strong> WAN signal issues, an old
            SMETS1, or a recent supplier switch. The supplier can run remote diagnostics — call them.
          </li>
          <li>
            <strong>Estimated bills despite a smart meter.</strong> The supplier is not picking up the
            half-hourly reads. Usually a known SMETS1 issue or a settings flag.
          </li>
          <li>
            <strong>Bills suddenly higher after install.</strong> Almost always because previous bills
            were under-estimated, not because the meter is wrong. Compare the pre-install readings on
            the old meter to what you were billed for.
          </li>
        </ul>
        <p>
          For full diagnostics on each, see{" "}
          <Link href="/blog/smart-meter-problems-uk" className="text-ink underline">
            smart meter problems UK
          </Link>{" "}
          — it walks through 12 of the most common issues with the supplier-by-supplier escalation
          paths.
        </p>
      </Section>

      <Section title="Best In-Home Displays (IHDs)">
        <p>
          Every smart meter installation comes with a free in-home display. Some are excellent, some
          are infuriating, and the difference matters because the IHD is the single biggest predictor
          of whether you will actually act on your smart meter data.
        </p>
        <p>
          The IHDs we rate most highly in 2026 are the Chameleon IHD3, the Geo Trio II, and the EDMI
          ESI4 — they have responsive screens, sensible budget alerts, and a usage-graph view that
          actually means something. The cheaper Chameleon IHD2 and the older Secure Liberty 100 are
          much less helpful and quietly drive people to ignore their data.
        </p>
        <p>
          For a side-by-side comparison of seven 2026 IHDs (with the strengths, weaknesses and which
          supplier ships which), see{" "}
          <Link href="/blog/best-smart-meter-in-home-display-uk" className="text-ink underline">
            best smart meter in-home display UK
          </Link>
          . If your supplier&apos;s default IHD is one of the dud ones, you can usually request a
          replacement free of charge.
        </p>
      </Section>

      <Section title="Smart Meters and Solar Panels">
        <p>
          If you have solar panels — or you are planning to install them — a working SMETS2 smart
          meter is essentially mandatory. The Smart Export Guarantee (SEG), which is how you get paid
          for the electricity you export, requires half-hourly export readings that only a SMETS2 can
          provide.
        </p>
        <p>
          For a typical 4kW system exporting around 50 percent of its generation, SEG payments are
          worth £100-£250 a year depending on your supplier&apos;s export tariff. That is on top of
          the £400-£600 a year saved on import.
        </p>
        <p>
          If you already have a smart meter and have just had solar installed, the export reading is
          not always switched on by default. Phone your supplier and ask them to{" "}
          <em>register the export MPAN</em> on your meter — it is a setting change at their end. See{" "}
          <Link href="/solar-panel-costs-uk" className="text-ink underline">
            solar panel costs UK
          </Link>{" "}
          for the full payback maths.
        </p>
      </Section>

      <Section title="Smart Meters and Heat Pumps">
        <p>
          Heat pumps and smart meters work together. The lower running costs that make a heat pump
          financially viable depend on time-of-use tariffs — Octopus Cozy, OVO Heat Pump Plus, EDF
          Beat the Peak — all of which require a smart meter sending half-hourly reads.
        </p>
        <p>
          On a Cozy-style tariff a typical 3-bed home running an air source heat pump pays around
          £400 a year for heating, vs. closer to £900 on a flat tariff. The difference is the smart
          meter making half-hourly settlement possible. See{" "}
          <Link href="/blog/heat-pump-running-costs-2026" className="text-ink underline">
            heat pump running costs 2026
          </Link>{" "}
          for the running-cost breakdown across each major tariff.
        </p>
      </Section>

      <Section title="Smart Meters and EV Charging">
        <p>
          The single biggest argument for a smart meter in any home with an electric vehicle is the
          EV tariff. Octopus Go, Intelligent Octopus Go, EDF GoElectric and OVO Charge Anytime all
          offer overnight rates of around 7-9p/kWh, vs. a standard rate of 25-28p/kWh — a saving of
          70 percent on the energy used to charge the car.
        </p>
        <p>
          For a typical 10,000-mile-a-year EV that is around £700 a year saved. None of those tariffs
          will sign you up without a working SMETS2. See{" "}
          <Link href="/blog/how-much-charge-electric-car-home-uk" className="text-ink underline">
            how much it costs to charge an electric car at home
          </Link>{" "}
          for the full cost comparison.
        </p>
      </Section>

      <Section title="Should You Refuse a Smart Meter?">
        <p>
          You are within your rights to refuse one — there is no law forcing installation. But the
          financial case for refusing has weakened significantly:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>You pay for the rollout either way.</strong> The cost is in standing charges
            across every household, smart or not.
          </li>
          <li>
            <strong>You cannot access the cheapest tariffs.</strong> Time-of-use, EV, heat-pump and
            solar export tariffs are all gated behind SMETS2.
          </li>
          <li>
            <strong>Manual readings still required.</strong> Without a smart meter you must submit
            readings yourself or accept estimated bills.
          </li>
          <li>
            <strong>Solar SEG is unavailable.</strong> No SMETS2, no export payments.
          </li>
        </ul>
        <p>
          The legitimate exceptions are properties with no mobile signal at the meter location (some
          basements and rural properties) where the WAN simply will not work, and households with
          credible health concerns about radio-frequency emissions. For everyone else, the
          opt-out is increasingly an opt-out from cheap energy.
        </p>
      </Section>

      {/* FAQ section */}
      <h2 className="text-xl font-display font-semibold text-ink mt-12 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6 mb-12">
        {FAQ_SCHEMA.mainEntity.map((q) => (
          <div key={q.name} className="border-b border-plum-light/20 pb-6 last:border-0">
            <h3 className="font-display font-semibold text-ink mb-2">{q.name}</h3>
            <p className="text-ink/65 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
          </div>
        ))}
      </div>

      {/* Calculator CTA */}
      <div className="bg-ink rounded-2xl p-6 mt-12 mb-12">
        <div className="font-display font-semibold text-cream-dark text-lg mb-1">
          See what a smart meter could save you
        </div>
        <p className="text-base text-cream-dark/70 mb-4">
          Free 2-minute estimate — visibility, load shifting and smart-tariff savings combined.
        </p>
        <Link
          href="/smart-meter-savings-calculator"
          className="inline-flex items-center px-6 py-2.5 rounded-xl text-base font-medium bg-yellow text-ink hover:brightness-95 transition"
        >
          Calculate your smart meter savings
        </Link>
      </div>

      {/* Related guides grid */}
      <h2 className="text-xl font-display font-semibold text-ink mt-12 mb-4">Related Guides</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <Link
          href="/blog/do-smart-meters-save-you-money-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">Do smart meters save money?</div>
          <p className="text-sm text-ink/55">
            What the published data actually shows about smart meter savings.
          </p>
        </Link>
        <Link
          href="/blog/smart-meter-problems-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">Smart meter problems UK</div>
          <p className="text-sm text-ink/55">
            12 common smart meter issues and how to fix them.
          </p>
        </Link>
        <Link
          href="/blog/best-smart-meter-in-home-display-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">Best in-home display UK</div>
          <p className="text-sm text-ink/55">
            Seven 2026 IHDs compared on usability, accuracy and budget alerts.
          </p>
        </Link>
        <Link
          href="/solar-panel-costs-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">Solar panel costs UK</div>
          <p className="text-sm text-ink/55">
            How a smart meter unlocks Smart Export Guarantee payments for solar.
          </p>
        </Link>
        <Link
          href="/heat-pump-cost-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">Heat pump cost UK</div>
          <p className="text-sm text-ink/55">
            Heat pump tariffs require a working SMETS2 — here is the running-cost picture.
          </p>
        </Link>
        <Link
          href="/best-ev-charger-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">Best home EV charger UK</div>
          <p className="text-sm text-ink/55">
            EV chargers, smart tariffs and the smart meter that ties them together.
          </p>
        </Link>
        <Link
          href="/blog/cavity-wall-insulation-cost-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">Cavity wall insulation cost UK</div>
          <p className="text-sm text-ink/55">
            The fabric upgrade that pairs best with smart-meter tracking — verify your savings month by month.
          </p>
        </Link>
        <Link
          href="/blog/smets1-vs-smets2-uk"
          className="block rounded-2xl border border-plum-light/30 p-5 hover:border-plum-muted transition-colors"
        >
          <div className="font-display font-semibold text-ink mb-1">SMETS1 vs SMETS2 smart meters UK</div>
          <p className="text-sm text-ink/55">
            What changed, why SMETS1 meters went dumb, and when to ask for a free SMETS2 upgrade.
          </p>
        </Link>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-display font-semibold text-ink mt-10 mb-4">{title}</h2>
      <div className="text-ink/65 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}
