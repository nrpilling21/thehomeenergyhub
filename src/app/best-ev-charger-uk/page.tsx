import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Home EV Charger UK (2026): Honest Comparison",
  description:
    "Five home EV chargers compared on what matters: smart tariff integration, solar compatibility, build quality, app experience, and installed price.",
};

export default function EvChargerPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
        Best Home EV Charger UK (2026): Honest Comparison
      </h1>
      <p className="text-gray-500 text-lg mb-8 leading-relaxed">
        A good home EV charger costs Â£800âÂ£1,200 fully installed, charges your car 3â4x faster than a
        three-pin plug, and pays for itself within a year through cheaper overnight electricity rates.
        Here&apos;s which one to actually buy, based on what matters most to you.
      </p>

      {/* Quick recommendation table */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Recommendation</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="py-3 pr-4 font-semibold text-gray-900">If you need...</th>
              <th className="py-3 pr-4 font-semibold text-gray-900">Get this</th>
              <th className="py-3 font-semibold text-gray-900">Price (installed)</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4">Best for smart tariff savings</td>
              <td className="py-3 pr-4 font-medium text-gray-900">Ohme Home Pro</td>
              <td className="py-3">Â£850âÂ£1,050</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4">Best for solar panel owners</td>
              <td className="py-3 pr-4 font-medium text-gray-900">MyEnergi Zappi</td>
              <td className="py-3">Â£950âÂ£1,200</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4">Best all-rounder</td>
              <td className="py-3 pr-4 font-medium text-gray-900">Wallbox Pulsar Max</td>
              <td className="py-3">Â£800âÂ£1,050</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4">Best budget option</td>
              <td className="py-3 pr-4 font-medium text-gray-900">Pod Point Solo 3S</td>
              <td className="py-3">Â£800âÂ£950</td>
            </tr>
            <tr>
              <td className="py-3 pr-4">Best for future-proofing</td>
              <td className="py-3 pr-4 font-medium text-gray-900">Hypervolt Home 3</td>
              <td className="py-3">Â£900âÂ¢1,100</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        Every charger on this list is OZEV-approved, smart-enabled, and available at 7.4kW.
        We compared them on five things: smart tariff integration, solar compatibility,
        build quality, app experience, and total installed cost.
      </p>

      {/* Placeholder for charger reviews - simplified for initial deploy */}
      <div className="text-gray-500 text-center py-10">Full reviews coming soon</div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mt-10">
        <div className="font-semibold text-gray-900 mb-1">How much will charging cost?</div>
        <p className="text-sm text-gray-500 mb-3">
          Use our free EV charging calculator to see your annual costs and savings.
        </p>
        <Link
          href="/ev-charging-cost-calculator"
          className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          Try the EV charging calculator
        </Link>
      </div>
    </article>
  );
}
