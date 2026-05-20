import type { Metadata } from "next";
import SmartMeterSavingsCalculator from "@/components/SmartMeterSavingsCalculator";

export const metadata: Metadata = {
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
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="sr-only">Smart Meter Savings Calculator UK (2026)</h1>
      <SmartMeterSavingsCalculator />
    </div>
  );
}
