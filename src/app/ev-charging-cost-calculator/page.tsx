import { CalculatorShell } from "@/components/CalculatorShell";
import type { Metadata } from "next";
import EvChargingCalculator from "@/components/EvChargingCalculator";

export const metadata: Metadata = {
  alternates: { canonical: '/ev-charging-cost-calculator' },
  title: "EV Charging Cost Calculator UK (2026) — Free Instant Estimate",
  description:
    "Find out exactly what it costs to charge an electric car at home. Compare standard vs off-peak tariffs, see savings vs petrol, and get charger recommendations.",
  openGraph: {
    title: "EV Charging Cost Calculator UK (2026) — Free Instant Estimate",
    description:
      "Find out exactly what it costs to charge an electric car at home. Compare tariffs, see savings vs petrol, and get charger recommendations.",
    url: "https://www.thehomeenergyhub.co.uk/ev-charging-cost-calculator",
    type: "website",
  },
};

export default function EvCalculatorPage() {
  return (
    <CalculatorShell
      title="EV charging cost calculator."
      intro="Find out what it costs to charge at home on your tariff, and how much you save compared with petrol."
      points={["Pick your car and mileage", "Choose your tariff", "See cost per mile and yearly savings"]}
      image="/images/ev-charging.jpg" imageAlt="Electric car charging from a wall-mounted home charger at sunset"
    >
      <h2 className="sr-only">EV Charging Cost Calculator UK (2026)</h2>
      <EvChargingCalculator />
    </CalculatorShell>
  );
}
