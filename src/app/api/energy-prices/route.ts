import { NextResponse } from "next/server";
import { getEnergyPrices, getEvTariffRates } from "@/lib/energy-prices";

export const revalidate = 3600;

export async function GET() {
  const [prices, evRates] = await Promise.all([
    getEnergyPrices(),
    getEvTariffRates(),
  ]);

  return NextResponse.json({ prices, evRates });
}
