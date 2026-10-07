import { CalculatorShell } from "@/components/CalculatorShell";
import type { Metadata } from "next";
import SmartMeterSavingsCalculator from "@/components/SmartMeterSavingsCalculator";

export const metadata: Metadata = {
  alternates: { canonical: '/smart-meter-savings-calculator' },
  title: "Smart Meter Savings Calculator UK (2026) — Free Instant Estimate",
  description:
    "Estimate how much a smart meter could save your household in 2026. Covers visibility savings, load shifting, EV / heat pump / solar tariff arbitrage and SEG export earnings.",
  openGraph: {
    title: "Smart Meter Savings Calculator UK (2026) — Free Instant Estimate",
    description:
      "How much could a smart meter save your household? Free 2-minute estimate covering visibility, load-shifting and smart-tariff savings.",
    url: "https://www.thehomeenergyhub.co.uk/smart-meter-savings-calculator",
    type: "website",
  },
};

export default function CalculatorPage() {
  return (
    <CalculatorShell
      title="Smart meter savings calculator."
      intro="Estimate what a smart meter could save your household through visibility, load shifting and smart tariffs."
      points={["Tell us how you use energy", "See visibility savings", "Add smart-tariff savings"]}
      image="/images/thermostat.jpg" imageAlt="Smart thermostat on a sunlit wall"
    >
      <h2 className="sr-only">Smart Meter Savings Calculator UK (2026)</h2>
      <SmartMeterSavingsCalculator />
    </CalculatorShell>
  );
}
