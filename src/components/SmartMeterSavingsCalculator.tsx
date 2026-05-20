"use client";

import { useState, useMemo } from "react";

// Annual electricity + gas spend bucket midpoints (£/yr)
const SPEND_BUCKETS = [
  { label: "Under £1,200", id: "low", mid: 1000, mult: 0.7 },
  { label: "£1,200 - £1,800", id: "mid", mid: 1500, mult: 1.0 },
  { label: "£1,800 - £2,400", id: "high", mid: 2100, mult: 1.15 },
  { label: "£2,400 - £3,000", id: "vhigh", mid: 2700, mult: 1.3 },
  { label: "Over £3,000", id: "xhigh", mid: 3300, mult: 1.45 },
];

// Property profile — affects baseline appliance/shifting potential
const PROPERTY = [
  { label: "Flat or 1-2 bed terrace", id: "small", appliance: 0.7 },
  { label: "3-bed semi or terrace", id: "medium", appliance: 1.0 },
  { label: "4+ bed detached", id: "large", appliance: 1.3 },
];

// Energy assets — drive the big tariff-arbitrage savings
type Asset = "ev" | "hp" | "solar" | "battery" | "storage";
const ASSETS: { id: Asset; label: string; desc: string }[] = [
  { id: "ev", label: "Electric vehicle (EV)", desc: "Charging overnight on a TOU tariff" },
  { id: "hp", label: "Air-source heat pump", desc: "Cosy/Intelligent tariff requires SMETS2" },
  { id: "solar", label: "Solar panels", desc: "SEG export payments require a smart meter" },
  { id: "battery", label: "Home battery", desc: "Cheap-rate grid charging via SMETS2" },
  { id: "storage", label: "Storage / electric heaters", desc: "Economy 7 or off-peak tariff" },
];

// Engagement — how actively the household will use the data
const ENGAGEMENT = [
  { label: "Yes, I'll watch the IHD and act on it", id: "active", visibility: 0.075, shiftFactor: 1.0 },
  { label: "Sometimes, when I remember", id: "passive", visibility: 0.03, shiftFactor: 0.5 },
  { label: "No, I just want the smart tariff", id: "tariff", visibility: 0.0, shiftFactor: 0.7 },
];

// Shifting willingness (running dishwasher overnight, etc.)
const SHIFT = [
  { label: "Yes, happy to shift", id: "shift", multiplier: 1.0 },
  { label: "Some loads, not all", id: "partial", multiplier: 0.6 },
  { label: "No, fixed schedule", id: "none", multiplier: 0.2 },
];

// Per-asset annual saving ranges (£/yr) at average UK use
const ASSET_SAVINGS: Record<Asset, { low: number; high: number }> = {
  ev: { low: 400, high: 700 },        // Octopus Go / Intelligent — 7-10p vs 24.5p flat
  hp: { low: 200, high: 500 },        // Cosy tariff savings vs flat rate
  solar: { low: 100, high: 250 },     // SEG export (avg 4kW)
  battery: { low: 150, high: 400 },   // TOU arbitrage on cheap windows
  storage: { low: 80, high: 220 },    // Economy 7 vs single rate
};

function fmt(v: number) {
  return "£" + Math.round(v).toLocaleString("en-GB");
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
        backgroundColor: "#FCFAF8",
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

function MultiOption({
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
        backgroundColor: "#FCFAF8",
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
            borderRadius: "4px",
            border: selected ? "2px solid #28030F" : "2px solid rgba(40, 3, 15, 0.25)",
            backgroundColor: selected ? "#28030F" : "transparent",
            transition: "all 0.15s ease",
          }}
        >
          {selected && (
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="#FCFAF8"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
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
        <span className={`text-lg font-bold ${accent ? "text-ink" : "text-ink"}`}>{value}</span>
      </div>
      {sub && <div className="text-xs text-ink/70 mt-0.5 text-right">{sub}</div>}
    </div>
  );
}

export default function SmartMeterSavingsCalculator() {
  const [step, setStep] = useState(0);
  const [spend, setSpend] = useState<number | null>(null);
  const [property, setProperty] = useState<number | null>(null);
  const [assets, setAssets] = useState<Set<Asset>>(new Set());
  const [engagement, setEngagement] = useState<number | null>(null);
  const [shift, setShift] = useState<number | null>(null);

  const STEPS = 5;
  const showResults = step === STEPS;

  const advance = () => setTimeout(() => setStep((s) => s + 1), 220);

  const selectSingle = (setter: (v: number) => void, val: number) => {
    setter(val);
    advance();
  };

  const toggleAsset = (id: Asset) => {
    const next = new Set(assets);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setAssets(next);
  };

  const results = useMemo(() => {
    if (spend === null || property === null || engagement === null || shift === null) return null;

    const bucket = SPEND_BUCKETS[spend];
    const prop = PROPERTY[property];
    const eng = ENGAGEMENT[engagement];
    const shiftCfg = SHIFT[shift];

    // 1) Visibility / behaviour savings: % of total spend driven by engagement, capped by property profile
    const visibilityLow = bucket.mid * eng.visibility * 0.7;
    const visibilityHigh = bucket.mid * eng.visibility * 1.0;

    // 2) Generic load-shifting savings (dishwasher/washing machine on cheap window). Only meaningful
    //    if household has a SMETS2 + TOU access (assumed when any tariff-bearing asset exists or
    //    they pick "tariff" engagement). Floor of £30, scaled by spend bucket and shifting choice.
    const hasTouAsset =
      assets.has("ev") || assets.has("hp") || assets.has("battery") || assets.has("storage");
    const baseShiftLow = hasTouAsset || eng.id === "tariff" ? 30 : 15;
    const baseShiftHigh = hasTouAsset || eng.id === "tariff" ? 80 : 35;
    const shiftLow = baseShiftLow * shiftCfg.multiplier * bucket.mult * prop.appliance;
    const shiftHigh = baseShiftHigh * shiftCfg.multiplier * bucket.mult * prop.appliance;

    // 3) Asset-driven tariff savings — biggest line
    let assetLow = 0;
    let assetHigh = 0;
    assets.forEach((a) => {
      // EV/HP/Battery savings respond to shifting willingness; solar is fixed export earnings.
      const responsiveness = a === "solar" ? 1.0 : (0.4 + 0.6 * shiftCfg.multiplier);
      // engagement nudges asset realisation slightly
      const engNudge = a === "solar" ? 1.0 : eng.shiftFactor;
      assetLow += ASSET_SAVINGS[a].low * responsiveness * engNudge;
      assetHigh += ASSET_SAVINGS[a].high * responsiveness * engNudge;
    });

    const totalLow = visibilityLow + shiftLow + assetLow;
    const totalHigh = visibilityHigh + shiftHigh + assetHigh;
    const totalMid = (totalLow + totalHigh) / 2;
    const pct = bucket.mid > 0 ? (totalMid / bucket.mid) * 100 : 0;

    return {
      visibility: { low: visibilityLow, high: visibilityHigh },
      shifting: { low: shiftLow, high: shiftHigh },
      asset: { low: assetLow, high: assetHigh },
      total: { low: totalLow, high: totalHigh, mid: totalMid },
      pct,
      bucket,
      eng,
      assetCount: assets.size,
    };
  }, [spend, property, assets, engagement, shift]);

  return (
    <div className="max-w-md mx-auto font-sans px-5 py-8">
      {/* Brand area */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm font-bold text-ink tracking-tight">Smart Meter Savings Calculator</div>
        <div className="text-xs text-ink/55">2 min estimate</div>
      </div>

      {!showResults && <Progress step={step} total={STEPS} />}

      {/* Step 0: Annual spend */}
      {step === 0 && (
        <div>
          <Question
            text="What's your current annual energy bill?"
            sub="Electricity plus gas combined. Check your latest annual statement."
          />
          {SPEND_BUCKETS.map((b, i) => (
            <Option
              key={b.id}
              label={b.label}
              selected={spend === i}
              onClick={() => selectSingle(setSpend, i)}
            />
          ))}
        </div>
      )}

      {/* Step 1: Property */}
      {step === 1 && (
        <div>
          <BackBtn onClick={() => setStep(0)} />
          <Question text="What kind of property?" sub="Affects how much shifting saves you." />
          {PROPERTY.map((p, i) => (
            <Option
              key={p.id}
              label={p.label}
              selected={property === i}
              onClick={() => selectSingle(setProperty, i)}
            />
          ))}
        </div>
      )}

      {/* Step 2: Assets */}
      {step === 2 && (
        <div>
          <BackBtn onClick={() => setStep(1)} />
          <Question
            text="Do you have any of these?"
            sub="Tap all that apply. These unlock the biggest smart-tariff savings."
          />
          {ASSETS.map((a) => (
            <MultiOption
              key={a.id}
              label={a.label}
              desc={a.desc}
              selected={assets.has(a.id)}
              onClick={() => toggleAsset(a.id)}
            />
          ))}
          <button
            onClick={() => setStep(3)}
            className="w-full mt-4 py-3 rounded-full text-sm font-semibold text-cream-dark bg-ink hover:opacity-90 transition-colors"
          >
            {assets.size === 0 ? "Skip — none of these" : `Continue (${assets.size} selected)`}
          </button>
        </div>
      )}

      {/* Step 3: Engagement */}
      {step === 3 && (
        <div>
          <BackBtn onClick={() => setStep(2)} />
          <Question
            text="Will you actually watch the data?"
            sub="The in-home display only saves money if someone looks at it."
          />
          {ENGAGEMENT.map((e, i) => (
            <Option
              key={e.id}
              label={e.label}
              selected={engagement === i}
              onClick={() => selectSingle(setEngagement, i)}
            />
          ))}
        </div>
      )}

      {/* Step 4: Shifting */}
      {step === 4 && (
        <div>
          <BackBtn onClick={() => setStep(3)} />
          <Question
            text="Happy to run heavy loads overnight?"
            sub="Dishwasher, washing machine, EV charging on a cheap off-peak rate."
          />
          {SHIFT.map((s, i) => (
            <Option
              key={s.id}
              label={s.label}
              selected={shift === i}
              onClick={() => selectSingle(setShift, i)}
            />
          ))}
        </div>
      )}

      {/* Results */}
      {showResults && results && (
        <div style={{ animation: "fadeUp 0.3s ease" }}>
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-ink/70 mb-2">
              Your estimated saving
            </div>
            <div className="text-4xl font-display font-extrabold text-ink leading-none mb-1">
              {fmt(results.total.low)} - {fmt(results.total.high)}
              <span className="text-base font-medium text-ink/55 ml-1">/yr</span>
            </div>
            <div className="text-sm text-ink/70">
              Roughly {Math.round(results.pct)}% off a {fmt(results.bucket.mid)}/yr bill.
            </div>
          </div>

          <div className="bg-cream border border-plum-light/20 rounded-2xl px-5 mb-6">
            <div className="py-3 border-b border-ink/5">
              <span className="text-xs font-semibold text-ink uppercase tracking-wide">
                Where the saving comes from
              </span>
            </div>
            <ResultStat
              label="Visibility (behaviour change)"
              value={`${fmt(results.visibility.low)} - ${fmt(results.visibility.high)}/yr`}
              sub={
                results.eng.id === "tariff"
                  ? "Skipped — you said you won't watch the data"
                  : "From acting on what the IHD shows"
              }
            />
            <ResultStat
              label="Load shifting"
              value={`${fmt(results.shifting.low)} - ${fmt(results.shifting.high)}/yr`}
              sub="Running heavy appliances on cheap rates"
            />
            <ResultStat
              label="Smart tariff (EV / HP / solar)"
              value={`${fmt(results.asset.low)} - ${fmt(results.asset.high)}/yr`}
              sub={
                results.assetCount === 0
                  ? "Add an EV, heat pump or solar to unlock"
                  : `${results.assetCount} asset${results.assetCount > 1 ? "s" : ""} selected`
              }
              accent={results.asset.low > 0}
            />
          </div>

          <div className="bg-cream-dark rounded-2xl p-5 mb-8">
            <div className="text-sm font-semibold text-ink mb-1">How accurate is this?</div>
            <p className="text-xs text-ink/70 leading-relaxed">
              These figures are based on published UK data from Smart Energy GB, Ofgem and the Energy
              Saving Trust. Visibility-only households typically save 0-3%. Add a smart tariff and an
              EV or heat pump and savings can exceed £600/yr. Your actual saving depends on the
              specific tariff you switch to and how reliably you shift loads.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <a
              href="/smart-meter-guide-uk"
              className="block w-full text-center py-3.5 rounded-full text-sm font-semibold text-cream-dark bg-ink transition-colors hover:opacity-90"
            >
              Read the smart meter guide UK
            </a>
            <a
              href="/blog/do-smart-meters-save-you-money-uk"
              className="block w-full text-center py-3.5 rounded-full text-sm font-semibold text-ink border-2 border-ink/15 hover:border-ink/30 transition-colors"
            >
              See what the published data actually shows
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-ink/70 mb-6">
            <span>Independent</span>
            <span>No sales calls</span>
            <span>Free to use</span>
          </div>

          <p className="text-xs text-ink/70 text-center leading-relaxed">
            Savings are estimates based on UK market averages, May 2026. Actual savings depend on your
            tariff, behaviour, and energy use. A smart meter alone does not change your bill — switching
            to a smart tariff and acting on the data does.
          </p>

          <div className="text-center mt-6 mb-4">
            <button
              onClick={() => {
                setStep(0);
                setSpend(null);
                setProperty(null);
                setAssets(new Set());
                setEngagement(null);
                setShift(null);
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
