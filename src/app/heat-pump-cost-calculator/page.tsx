import { CalculatorShell } from "@/components/CalculatorShell";
import type { Metadata } from "next";
import HeatPumpCalculator from "@/components/HeatPumpCalculator";

export const metadata: Metadata = {
  alternates: { canonical: '/heat-pump-cost-calculator' },
  title: "Heat Pump Cost Calculator UK (2026) — Free Instant Estimate",
  description:
    "Get a personalised heat pump cost estimate in 2 minutes. Covers air source, ground source, the £7,500 BUS grant, running costs and payback period.",
  openGraph: {
    title: "Heat Pump Cost Calculator UK (2026) — Free Instant Estimate",
    description:
      "Get a personalised heat pump cost estimate in 2 minutes. Covers air source, ground source, the £7,500 BUS grant, and running costs.",
    url: "https://www.thehomeenergyhub.co.uk/heat-pump-cost-calculator",
    type: "website",
  },
};

export default function CalculatorPage() {
  return (
    <CalculatorShell
      title="Heat pump cost calculator."
      intro="Answer six quick questions about your home for a personalised install estimate, grant savings and running costs."
      points={["Tell us about your home", "See install cost after the £7,500 grant", "Compare running costs with your boiler"]}
      image="/images/heat-pump.jpg" imageAlt="Air source heat pump outside a timber-clad home"
    >
      <h2 className="sr-only">Heat Pump Cost Calculator UK (2026)</h2>
      <HeatPumpCalculator />
    </CalculatorShell>
  );
}
