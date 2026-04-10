import type { Metadata } from "next";
import HeatPumpCalculator from "@/components/HeatPumpCalculator";

export const metadata: Metadata = {
  title: "Heat Pump Cost Calculator UK (2026) â Free Instant Estimate",
  description:
    "Get a personalised heat pump cost estimate in 2 minutes. Covers air source, ground source, the Â£7,500 BUS grant, running costs and payback period.",
  openGraph: {
    title: "Heat Pump Cost Calculator UK (2026) â Free Instant Estimate",
    description:
      "Get a personalised heat pump cost estimate in 2 minutes. Covers air source, ground source, the Â£7,500 BUS grant, and running costs.",
    url: "https://www.thehomeenergyhub.co.uk/heat-pump-cost-calculator",
    type: "website",
  },
};

export default function CalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="sr-only">Heat Pump Cost Calculator UK (2026)</h1>
      <HeatPumpCalculator />
    </div>
  );
}
