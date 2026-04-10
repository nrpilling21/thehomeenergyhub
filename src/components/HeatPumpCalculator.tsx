"use client";

import { useState, useMemo } from "react";

const PROPERTY_TYPES = [
  { label: "Flat / Apartment", id: "flat" },
  { label: "Terraced house", id: "terrace" },
  { label: "Semi-detached", id: "semi" },
  { label: "Detached house", id: "detached" },
  { label: "Bungalow", id: "bungalow" },
];

const BEDROOMS = [
  { label: "1 bedroom", id: 1 },
  { label: "2 bedrooms", id: 2 },
  { label: "3 bedrooms", id: 3 },
  { label: "4 bedrooms", id: 4 },
  { label: "5+ bedrooms", id: 5 },
];

const HEAT_LOSS: Record<string, Record<number, number>> = {
  flat: { 1: 3, 2: 4, 3: 5, 4: 6, 5: 7 },
  terrace: { 1: 4, 2: 5, 3: 7, 4: 8, 5: 10 },
  semi: { 1: 5, 2: 6, 3: 8, 4: 10, 5: 12 },
  detached: { 1: 6, 2: 7, 3: 10, 4: 12, 5: 16 },
  bungalow: { 1: 5, 2: 6, 3: 8, 4: 10, 5: 13 },
};

const INSULATION = [
  { label: "Good", desc: "Modern build, or fully insulated walls and loft", factor: 0.85, id: "good" },
  { label: "Average", desc: "Some insulation, but not fully upgraded", factor: 1.0, id: "average" },
  { label: "Poor", desc: "Solid walls, little or no insulation", factor: 1.25, id: "poor" },
];

const PUMP_TYPES = [
  {
    label: "Air source",
    desc: "Most popular. Unit sits outside your home.",
    id: "air",
    costPerKw: { low: 1100, high: 1500 },
    installBase: { low: 2500, high: 4500 },
    cop: 3.2,
    grant: 7500,
  },
  {
    label: "Ground source",
    desc: "More efficient. Requires garden space for boreholes.",
    id: "ground",
    costPerKw: { low: 1800, high: 2500 },
    installBase: { low: 6000, high: 12000 },
    cop: 4.0,
    grant: 7500,
  },
];

const CURRENT_HEATING = [
  { label: "Gas boiler", id: "gas", costPerKwh: 0.065, efficiency: 0.92 },
  { label: "Oil boiler", id: "oil", costPerKwh: 0.075, efficiency: 0.85 },
  { label: "Electric heating", id: "electric", costPerKwh: 0.245, efficiency: 1.0 },
  { label: "LPG boiler", id: "lpg", costPerKwh: 0.085, efficiency: 0.89 },
];

const ELEC = 0.245;
const HOURS = 2000;

function fmt(v: number) {
  return "\u00A3" + Math.round(v).toLocaleString("en-GB");
}

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

export default function HeatPumpCalculator() {
  const [step, setStep] = useState(0);
  const [propertyType, setPropertyType] = useState<number | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [insulation, setInsulation] = useState<number | null>(null);
  const [pumpType, setPumpType] = useState<number | null>(null);
  const [heating, setHeating] = useState<number | null>(null);
  const [grant, setGrant] = useState<number | null>(null);

  const STEPS = 6;
  const showResults = step === STEPS;

  const select = (setter: (v: number) => void, val: number) => {
    setter(val);
    setTimeout(() => setStep((s) => s + 1), 250);
  };

  const results = useMemo(() => {
    if (
      propertyType === null ||
      bedrooms === null ||
      insulation === null ||
      pumpType === null ||
      heating === null ||
      grant === null
    )
      return null;

    const baseKw = HEAT_LOSS[PROPERTY_TYPES[propertyType].id]?.[BEDROOMS[bedrooms].id] || 8;
    const adjKw = baseKw * INSULATION[insulation].factor;
    const pump = PUMP_TYPES[pumpType];
    const heat = CURRENT_HEATING[heating];

    const totalLow = adjKw * pump.costPerKw.low + pump.installBase.low;
    const totalHigh = adjKw * pump.costPerKw.high + pump.installBase.high;
    const g = grant === 0 ? pump.grant : 0;
    const netLow = Math.max(0, totalLow - g);
    const netHigh = Math.max(0, totalHigh - g);
    const netMid = (netLow + netHigh) / 2;

    const demand = adjKw * HOURS;
    const hpCost = (demand / pump.cop) * ELEC;
    const oldCost = (demand / heat.efficiency) * heat.costPerKwh;
    const saving = oldCost - hpCost;
    const payback = saving > 0 ? netMid / saving : null;

    return {
      kw: Math.round(adjKw * 10) / 10,
      totalLow: Math.round(totalLow),
      totalHigh: Math.round(totalHigh),
      grant: g,
      netLow: Math.round(netLow),
      netHigh: Math.round(netHigh),
      hpCost: Math.round(hpCost),
      oldCost: Math.round(oldCost),
      saving: Math.round(saving),
      payback: payback ? Math.round(payback * 10) / 10 : null,
      pumpLabel: pump.label,
      propLabel: `${BEDROOMS[bedrooms].label} ${PROPERTY_TYPES[propertyType].label.toLowerCase()}`,
      heatLabel: heat.label.toLowerCase(),
    };
  }, [propertyType, bedrooms, insulation, pumpType, heating, grant]);

  return (
    <div className="max-w-md mx-auto font-sans px-5 py-8">
      {/* Brand area */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm font-bold text-ink tracking-tight">Heat Pump Calculator</div>
        <div className="text-xs text-ink/55">2 min estimate</div>
      </div>

      {!showResults && <Progress step={step} total={STEPS} />}

      {/* Step 0: Property type */}
      {step === 0 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <Question text="What type of property do you have?" />
          {PROPERTY_TYPES.map((p, i) => (
            <Option
              key={p.id}
              label={p.label}
              selected={propertyType === i}
              onClick={() => select(setPropertyType, i)}
            />
          ))}
        </div>
      )}

      {/* Step 1: Bedrooms */}
      {step === 1 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <BackBtn onClick={() => setStep(0)} />
          <Question text="How many bedrooms?" />
          {BEDROOMS.map((b, i) => (
            <Option
              key={b.id}
              label={b.label}
              selected={bedrooms === i}
              onClick={() => select(setBedrooms, i)}
            />
          ))}
        </div>
      )}

      {/* Step 2: Insulation */}
      {step === 2 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <BackBtn onClick={() => setStep(1)} />
          <Question
            text="How well insulated is your home?"
            sub="This affects the size and cost of heat pump you'll need."
          />
          {INSULATION.map((ins, i) => (
            <Option
              key={ins.id}
              label={ins.label}
              desc={ins.desc}
              selected={insulation === i}
              onClick={() => select(setInsulation, i)}
            />
          ))}
        </div>
      )}

      {/* Step 3: Pump type */}
      {step === 3 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <BackBtn onClick={() => setStep(2)} />
          <Question text="Which type of heat pump are you considering?" />
          {PUMP_TYPES.map((pt, i) => (
            <Option
              key={pt.id}
              label={pt.label}
              desc={pt.desc}
              selected={pumpType === i}
              onClick={() => select(setPumpType, i)}
            />
          ))}
        </div>
      )}

      {/* Step 4: Current heating */}
      {step === 4 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <BackBtn onClick={() => setStep(3)} />
          <Question
            text="What do you currently use for heating?"
            sub="So we can compare your running costs."
          />
          {CURRENT_HEATING.map((h, i) => (
            <Option
              key={h.id}
              label={h.label}
              selected={heating === i}
              onClick={() => select(setHeating, i)}
            />
          ))}
        </div>
      )}

      {/* Step 5: Grant */}
      {step === 5 && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          <BackBtn onClick={() => setStep(4)} />
          <Question
            text="Are you eligible for the government grant?"
            sub="The Boiler Upgrade Scheme gives most homeowners Â£7,500 towards installation."
          />
          <Option
            label="Yes - include the Â£7,500 grant"
            desc="Available until March 2028"
            selected={grant === 0}
            onClick={() => select(setGrant, 0)}
          />
          <Option
            label="No - show the full price"
            desc="Not eligible, or prefer to see full cost"
            selected={grant === 1}
            onClick={() => select(setGrant, 1)}
          />
          <div className="mt-4 bg-cream-dark rounded-xl p-3">
            <p className="text-xs text-ink/50">
              <span className="font-medium text-ink/70">Not sure if you qualify?</span> Most
              owner-occupied homes in England and Wales are eligible. Your installer handles the
              application.
            </p>
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && results && (
        <div style={{ animation: "fadeUp 0.35s ease" }}>
          <BackBtn onClick={() => setStep(5)} />

          <div className="text-center mb-8">
            <p className="text-base text-ink/65 mb-3">
              Estimated cost for your {results.propLabel}
            </p>
            <div className="text-4xl font-extrabold text-ink tracking-tight">
              {fmt(results.netLow)} &ndash; {fmt(results.netHigh)}
            </div>
            {results.grant > 0 && (
              <div className="inline-flex items-center gap-1.5 mt-3 bg-yellow-soft text-ink text-xs font-bold px-3 py-1 rounded-full">
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Includes {fmt(results.grant)} BUS grant
              </div>
            )}
          </div>

          <div className="bg-cream border border-plum-light/20 rounded-2xl px-5 mb-6">
            <ResultStat label="System size" value={`${results.kw} kW`} />
            <ResultStat label="Type" value={results.pumpLabel} />
            <ResultStat
              label="Full installed price"
              value={`${fmt(results.totalLow)} - ${fmt(results.totalHigh)}`}
            />
            {results.grant > 0 && (
              <ResultStat label="BUS grant" value={`-${fmt(results.grant)}`} accent />
            )}
            <ResultStat label="VAT" value="0%" sub="Until March 2027" />
          </div>

          <div className="bg-cream border border-plum-light/20 rounded-2xl px-5 mb-6">
            <div className="py-3 border-b border-ink/5">
              <span className="text-xs font-semibold text-ink uppercase tracking-wide">
                Annual running costs
              </span>
            </div>
            <ResultStat label={`Current ${results.heatLabel}`} value={`${fmt(results.oldCost)}/yr`} />
            <ResultStat
              label="Heat pump"
              value={`${fmt(results.hpCost)}/yr`}
              accent={results.saving > 0}
            />
            {results.saving > 0 && (
              <ResultStat label="You'd save" value={`${fmt(results.saving)}/yr`} accent />
            )}
            {results.payback && results.saving > 0 && (
              <ResultStat label="Payback period" value={`~${results.payback} years`} />
            )}
          </div>

          <div className="space-y-3 mb-8">
            <a
              href="#get-quotes"
              className="block w-full text-center py-3.5 rounded-full text-sm font-semibold text-cream-dark bg-ink transition-colors hover:opacity-90"
            >
              Get free quotes from local installers
            </a>
            <a
              href="/heat-pump-cost-uk"
              className="block w-full text-center py-3.5 rounded-full text-sm font-semibold text-ink border-2 border-ink/15 hover:border-ink/30 transition-colors"
            >
              Read: How much does a heat pump cost?
            </a>
          </div>

          <div className="bg-cream-dark rounded-2xl p-5 mb-8">
            <div className="text-sm font-semibold text-ink mb-1">Save your estimate</div>
            <p className="text-xs text-ink/60 mb-3">
              Get a copy of this estimate plus our free guide to choosing the right heat pump.
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
            Costs are estimates based on UK market averages, March 2026. Actual costs depend on your
            property, location, and installer. Always get multiple quotes from MCS-certified
            installers.
          </p>

          <div className="text-center mt-6 mb-4">
            <button
              onClick={() => {
                setStep(0);
                setPropertyType(null);
                setBedrooms(null);
                setInsulation(null);
                setPumpType(null);
                setHeating(null);
                setGrant(null);
              }}
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
