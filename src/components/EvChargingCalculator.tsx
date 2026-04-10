"use client";

import { useState, useMemo } from "react";

/* ââ Data ââ */
const VEHICLES = [
  { label: "Small EV (e.g. MG4, Fiat 500e)", id: "small", batteryKwh: 51, rangeKm: 280, effKwhPerMile: 0.29 },
  { label: "Medium EV (e.g. Tesla Model 3, VW ID.3)", id: "medium", batteryKwh: 60, rangeKm: 340, effKwhPerMile: 0.32 },
  { label: "Large EV (e.g. Tesla Model Y, BMW iX)", id: "large", batteryKwh: 75, rangeKm: 350, effKwhPerMile: 0.36 },
  { label: "Premium EV (e.g. Mercedes EQS, Audi Q8)", id: "premium", batteryKwh: 100, rangeKm: 400, effKwhPerMile: 0.40 },
];

const MILEAGE = [
  { label: "5,000 miles/year", id: 5000, desc: "Low - short commute or mostly local" },
  { label: "8,000 miles/year", id: 8000, desc: "Average UK mileage" },
  { label: "12,000 miles/year", id: 12000, desc: "Regular commuter" },
  { label: "15,000+ miles/year", id: 15000, desc: "High mileage driver" },
];

const TARIFF = [
  { label: "Standard tariff", id: "standard", rate: 0.245, desc: "Charging anytime at your normal rate" },
  { label: "EV/off-peak tariff", id: "offpeak", rate: 0.075, desc: "e.g. Octopus Go, Intelligent Octopus" },
  { label: "Solar panels at home", id: "solar", rate: 0.0, desc: "Free charging from your own panels" },
];

const CHARGER_TYPE = [
  { label: "3-pin plug (2.3kW)", id: "3pin", kw: 2.3, desc: "Slow - uses a standard socket", cost: 0 },
  { label: "Home wallbox (7.4kW)", id: "wallbox", kw: 7.4, desc: "3x faster. The recommended option.", cost: 950 },
];

const CURRENT_FUEL = [
  { label: "Petrol", id: "petrol", costPerMile: 0.18 },
  { label: "Diesel", id: "diesel", costPerMile: 0.16 },
  { label: "Hybrid", id: "hybrid", costPerMile: 0.12 },
  { label: "Already driving an EV", id: "ev", costPerMile: null },
];

const fmt = (v: number) => "\u00A3" + Math.round(v).toLocaleString("en-GB");
const fmtp = (v: number) => (v * 100).toFixed(1) + "p";

/* ââ Shared UI (matching heat pump calculator style) ââ */
function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-1.5 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-full flex-1 transition-colors duration-300"
          style={{ backgroundColor: i <= step ? "#28030F" : "rgba(40, 3, 15, 0.08)" }}
        />
      ))}
    </div>
  );
}

function Question({ text, sub }: { text: string; sub?: string }) {
  return (
    <div className="mb-8" style={{ animation: "fadeUp 0.25s ease" }}>
      <h2 className="text-xl font-extrabold font-display text-ink leading-snug">{text}</h2>
      {sub && <p className="text-ink/70 text-base mt-2">{sub}</p>}
    </div>
  );
}

function Option({
  selected,
  onClick,
  label,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  desc?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all"
      style={{
        padding: "14px 18px",
        borderRadius: "12px",
        border: selected ? "2px solid #28030F" : "1.5px solid rgba(40, 3, 15, 0.1)",
        backgroundColor: selected ? "#FCFAF8" : "#FCFAF8",
        marginBottom: "8px",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-sm font-medium ${selected ? "text-ink" : "text-ink/70"}`}>
            {label}
          </div>
          {desc && <div className="text-xs text-ink/70 mt-0.5">{desc}</div>}
        </div>
        <div
          className="flex-shrink-0 ml-3"
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: selected ? "6px solid #28030F" : "2px solid rgba(40, 3, 15, 0.25)",
            transition: "border 0.15s ease",
          }}
        />
      </div>
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-sm text-ink/70 hover:text-ink/60 transition-colors mb-6"
    >
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back
    </button>
  );
}

function ResultStat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="py-4 border-b border-ink/5 last:border-0">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-ink/50">{label}</span>
        <span className={`text-lg font-bold ${accent ? "text-ink" : "text-ink"}`}>
          {value}
        </span>
      </div>
      {sub && <div className="text-xs text-ink/70 mt-0.5 text-right">{sub}</div>}
    </div>
  );
}

/* ââ Main Calculator ââ */
export default function EvChargingCalculator() {
  const [step, setStep] = useState(0);
  const [vehicle, setVehicle] = useState<number | null>(null);
  const [mileage, setMileage] = useState<number | null>(null);
  const [tariff, setTariff] = useState<number | null>(null);
  const [chargerType, setChargerType] = useState<number | null>(null);
  const [currentFuel, setCurrentFuel] = useState<number | null>(null);

  const STEPS = 5;
  const showResults = step === STEPS;

  const select = (setter: (v: number) => void, val: number) => {
    setter(val);
    setTimeout(() => setStep((s) => s + 1), 250);
  };

  const results = useMemo(() => {
    if (vehicle === null || mileage === null || tariff === null || chargerType === null || currentFuel === null)
      return null;

    const v = VEHICLES[vehicle];
    const m = MILEAGE[mileage];
    const t = TARIFF[tariff];
    const c = CHARGER_TYPE[chargerType];
    const f = CURRENT_FUEL[currentFuel];

    const annualKwh = m.id * v.effKwhPerMile;
    const annualEvCost = annualKwh * t.rate;
    const costPerMile = v.effKwhPerMile * t.rate;
    const annualOldCost = f.costPerMile !== null ? m.id * f.costPerMile : null;
    const annualSaving = annualOldCost !== null ? annualOldCost - annualEvCost : null;
    const monthlySaving = annualSaving !== null ? annualSaving / 12 : null;
    const chargerPayback = c.cost > 0 && annualSaving && annualSaving > 0 ? c.cost / annualSaving : null;

    // Charge time: typical 20-80% charge
    const chargeKwh = v.batteryKwh * 0.6;
    const chargeHours = chargeKwh / c.kw;

    return {
      vehicleLabel: v.label.split("(")[0].trim(),
      mileageLabel: m.label,
      tariffLabel: t.label,
      chargerLabel: c.label,
      fuelLabel: f.label,
      annualKwh: Math.round(annualKwh),
      annualEvCost: Math.round(annualEvCost),
      costPerMile,
      annualOldCost: annualOldCost !== null ? Math.round(annualOldCost) : null,
      annualSaving: annualSaving !== null ? Math.round(annualSaving) : null,
      monthlySaving: monthlySaving !== null ? Math.round(monthlySaving) : null,
      chargerCost: c.cost,
      chargerPayback: chargerPayback ? Math.round(chargerPayback * 10) / 10 : null,
      chargeHours: Math.round(chargeHours * 10) / 10,
      hasComparison: f.costPerMile !== null,
    };
  }, [vehicle, mileage, tariff, chargerType, currentFuel]);

  const reset = () => {
    setStep(0);
    setVehicle(null);
    setMileage(null);
    setTariff(null);
    setChargerType(null);
    setCurrentFuel(null);
  };

  return (
    <div className="max-w-md mx-auto font-sans px-5 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm font-bold text-ink tracking-tight">EV Charging Calculator</div>
        <div className="text-xs text-ink/55">2 min estimate</div>
      </div>

      {!showResults && <Progress step={step} total={STEPS} />}

      {/* Step 0: Vehicle */}
      {step === 0 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <Question text="What type of electric car do you have (or are considering)?" />
          {VEHICLES.map((v, i) => (
            <Option key={v.id} label={v.label} selected={vehicle === i} onClick={() => select(setVehicle, i)} />
          ))}
        </div>
      )}

      {/* Step 1: Mileage */}
      {step === 1 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <BackBtn onClick={() => setStep(0)} />
          <Question text="How many miles do you drive per year?" />
          {MILEAGE.map((m, i) => (
            <Option key={m.id} label={m.label} desc={m.desc} selected={mileage === i} onClick={() => select(setMileage, i)} />
          ))}
        </div>
      )}

      {/* Step 2: Tariff */}
      {step === 2 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <BackBtn onClick={() => setStep(1)} />
          <Question
            text="What electricity tariff will you charge on?"
            sub="An EV-specific tariff can cut your charging costs by 60-70%."
          />
          {TARIFF.map((t, i) => (
            <Option key={t.id} label={t.label} desc={t.desc} selected={tariff === i} onClick={() => select(setTariff, i)} />
          ))}
        </div>
      )}

      {/* Step 3: Charger type */}
      {step === 3 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <BackBtn onClick={() => setStep(2)} />
          <Question
            text="How will you charge at home?"
            sub="A dedicated wallbox is faster and safer for daily use."
          />
          {CHARGER_TYPE.map((c, i) => (
            <Option key={c.id} label={c.label} desc={c.desc} selected={chargerType === i} onClick={() => select(setChargerType, i)} />
          ))}
        </div>
      )}

      {/* Step 4: Current fuel */}
      {step === 4 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <BackBtn onClick={() => setStep(3)} />
          <Question text="What do you currently drive?" sub="So we can show your potential savings." />
          {CURRENT_FUEL.map((f, i) => (
            <Option key={f.id} label={f.label} selected={currentFuel === i} onClick={() => select(setCurrentFuel, i)} />
          ))}
        </div>
      )}

      {/* Results */}
      {showResults && results && (
        <div style={{ animation: "fadeUp 0.35s ease" }}>
          <BackBtn onClick={() => setStep(4)} />

          {/* Hero number */}
          <div className="text-center mb-8">
            <p className="text-base text-ink/65 mb-3">
              Annual home charging cost for your {results.vehicleLabel}
            </p>
            <div className="text-4xl font-extrabold text-ink tracking-tight">
              {fmt(results.annualEvCost)}/yr
            </div>
            <div className="text-base text-ink/65 mt-2">
              {fmtp(results.costPerMile)} per mile {"\u00B7"} {results.mileageLabel}
            </div>
          </div>

          {/* Charging breakdown */}
          <div className="bg-cream border border-plum-light/20 rounded-2xl px-5 mb-6">
            <ResultStat label="Annual energy needed" value={`${results.annualKwh.toLocaleString()} kWh`} />
            <ResultStat label="Charging with" value={results.chargerLabel} />
            <ResultStat label="Tariff" value={results.tariffLabel} />
            <ResultStat
              label="Typical 20-80% charge time"
              value={`${results.chargeHours} hours`}
              sub={results.chargeHours > 8 ? "Overnight charging ideal" : ""}
            />
          </div>

          {/* Savings vs current fuel */}
          {results.hasComparison && (
            <div className="bg-cream border border-plum-light/20 rounded-2xl px-5 mb-6">
              <div className="py-3 border-b border-ink/5">
                <span className="text-xs font-semibold text-ink uppercase tracking-wide">
                  Savings vs {results.fuelLabel.toLowerCase()}
                </span>
              </div>
              <ResultStat label={`Current ${results.fuelLabel.toLowerCase()} cost`} value={`${fmt(results.annualOldCost!)}/yr`} />
              <ResultStat label="EV home charging" value={`${fmt(results.annualEvCost)}/yr`} accent />
              {results.annualSaving! > 0 && (
                <>
                  <ResultStat label="Annual saving" value={`${fmt(results.annualSaving!)}/yr`} accent />
                  <ResultStat label="Monthly saving" value={`${fmt(results.monthlySaving!)}/mo`} accent />
                </>
              )}
              {results.chargerCost > 0 && results.chargerPayback && (
                <ResultStat
                  label="Wallbox pays for itself in"
                  value={`~${results.chargerPayback} years`}
                  sub={`Based on ${fmt(results.chargerCost)} installed`}
                />
              )}
            </div>
          )}

          {/* CTAs */}
          <div className="space-y-3 mb-8">
            <a
              href="https://www.echargersuk.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3.5 rounded-full text-sm font-semibold text-cream-dark transition-colors bg-ink hover:opacity-90"
            >
              Browse EV chargers at eChargers UK
            </a>
            <a
              href="/best-ev-charger-uk"
              className="block w-full text-center py-3.5 rounded-full text-sm font-semibold text-ink border-2 border-ink/15 hover:border-ink/30 transition-colors"
            >
              Read: Best home EV charger UK
            </a>
          </div>

          {/* Email capture */}
          <div className="bg-cream-dark rounded-2xl p-5 mb-8">
            <div className="text-sm font-semibold text-ink mb-1">Get our free EV charging guide</div>
            <p className="text-xs text-ink/60 mb-3">
              Smart tariff tips, charger recommendations, and how to cut your charging costs even further.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 text-sm px-3 py-2.5 rounded-lg border border-plum-light/30 bg-cream placeholder-ink/30 focus:outline-none focus:border-plum-light"
              />
              <button
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-cream-dark flex-shrink-0 bg-ink hover:opacity-90 transition-colors"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-ink/70 mt-2">No spam. Unsubscribe anytime.</p>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-ink/70 mb-6">
            <span>Independent advice</span>
            <span>No sales calls</span>
            <span>Free to use</span>
          </div>

          <p className="text-xs text-ink/70 text-center leading-relaxed">
            Costs based on UK energy prices as of March 2026. Actual costs depend on your driving
            style, tariff, and vehicle efficiency.
          </p>

          <div className="text-center mt-6 mb-4">
            <button
              onClick={reset}
              className="text-sm text-ink/70 hover:text-ink/60 transition-colors"
            >
              Recalculate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
