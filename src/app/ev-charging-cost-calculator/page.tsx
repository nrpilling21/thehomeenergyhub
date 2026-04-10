import type { Metadata } from "next";
import EvChargingCalculator from "@/components/EvChargingCalculator";

export const metadata: Metadata = {
  title: "EV Charging Cost Calculator UK (2026) â Free Instant Estimate",
  description:
    "Find out exactly what it costs to charge an electric car at home. Compare standard vs off-peak tariffs, see savings vs petrol, and get charger recommendations.",
  openGraph: {
    title: "EV Charging Cost Calculator UK (2026) â Free Instant Estimate",
    description:
      "Find out exactly what it costs to charge an electric car at home. Compare tariffs, see savings vs petrol, and get charger recommendations.",
    url: "https://www.thehomeenergyhub.co.uk/ev-charging-cost-calculator",
    type: "website",
  },
};

export default function EvCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="sr-only">EV Charging Cost Calculator UK (2026)</h1>
      <EvChargingCalculator />
    </div>
  );
}
