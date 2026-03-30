const OCTOPUS_BASE = "https://api.octopus.energy/v1";
const ELEC_TARIFF = "E-1R-VAR-22-11-01-A";
const GAS_TARIFF = "G-1R-VAR-22-11-01-A";
const PRODUCT = "VAR-22-11-01";

export interface EnergyPrices {
  electricity: number;
  gas: number;
  source: "octopus" | "ofgem-fallback";
  fetchedAt: string;
}

export async function getEnergyPrices(): Promise<EnergyPrices> {
  try {
    const [elecRes, gasRes] = await Promise.all([
      fetch(`${OCTOPUS_BASE}/products/${PRODUCT}/electricity-tariffs/${ELEC_TARIFF}/standard-unit-rates/?page_size=1`, { next: { revalidate: 3600 } }),
      fetch(`${OCTOPUS_BASE}/products/${PRODUCT}/gas-tariffs/${GAS_TARIFF}/standard-unit-rates/?page_size=1`, { next: { revalidate: 3600 } }),
    ]);
    const elecData = await elecRes.json();
    const gasData = await gasRes.json();
    const elecRate = elecData.results?.[0]?.value_inc_vat;
    const gasRate = gasData.results?.[0]?.value_inc_vat;
    return {
      electricity: elecRate ? elecRate / 100 : 0.2467,
      gas: gasRate ? gasRate / 100 : 0.0574,
      source: "octopus",
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return { electricity: 0.2467, gas: 0.0574, source: "ofgem-fallback", fetchedAt: new Date().toISOString() };
  }
}

export interface EvTariffRates {
  offPeakPence: number;
  peakPence: number;
  source: string;
}

export async function getEvTariffRates(): Promise<EvTariffRates> {
  try {
    const res = await fetch(`${OCTOPUS_BASE}/products/GO-VAR-22-10-14/electricity-tariffs/E-1R-GO-VAR-22-10-14-A/standard-unit-rates/?page_size=2`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const rates = data.results || [];
    const offPeak = rates.find((r: { value_inc_vat: number }) => r.value_inc_vat < 10);
    const peak = rates.find((r: { value_inc_vat: number }) => r.value_inc_vat >= 10);
    return { offPeakPence: offPeak?.value_inc_vat || 7.5, peakPence: peak?.value_inc_vat || 24.5, source: "octopus-go" };
  } catch {
    return { offPeakPence: 7.5, peakPence: 24.5, source: "fallback" };
  }
}
