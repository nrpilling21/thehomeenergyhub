import {
  ELECTRICITY_PENCE_PER_KWH,
  GAS_PENCE_PER_KWH,
  CAP_PERIOD,
} from '@/lib/energy-rates';

/* Inline SVG charts for the running-cost guides.

   Every figure here is COMPUTED from the rate constants in energy-rates.ts
   rather than typed in, so a chart can never drift from the prose beside it
   and the quarterly cap change updates the charts for free. That is the whole
   reason these are generated SVG rather than exported PNGs.

   Usage: put `[chart:<id>]` on its own line in a post. The markdown renderer
   in src/app/blog/[slug]/page.tsx swaps it for the SVG. An unknown id renders
   nothing rather than breaking the page. */

const INK = '#28030F';
const MUTED = '#755760';
const YELLOW = '#FBF582';
const CREAM_DARK = '#F9F4F1';
const BAR = '#28030F';

type Row = { label: string; value: number; display: string; highlight?: boolean };

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Horizontal bar chart. Labels sit above each bar so long UK appliance names
   are not truncated on a phone. */
function barChart(title: string, note: string, rows: Row[]): string {
  const rowH = 46;
  const top = 58;
  const bottom = 34;
  const width = 720;
  const labelW = 0;
  const chartW = width - 150;
  const height = top + rows.length * rowH + bottom;
  const max = Math.max(...rows.map(r => r.value));

  const bars = rows
    .map((r, i) => {
      const y = top + i * rowH;
      const w = Math.max(2, (r.value / max) * chartW);
      const fill = r.highlight ? YELLOW : BAR;
      const stroke = r.highlight ? `stroke="${INK}" stroke-width="1.5"` : '';
      return `
    <text x="0" y="${y + 11}" font-size="13" fill="${MUTED}">${esc(r.label)}</text>
    <rect x="0" y="${y + 18}" width="${w}" height="16" rx="4" fill="${fill}" ${stroke} />
    <text x="${w + 10}" y="${y + 31}" font-size="13" font-weight="600" fill="${INK}">${esc(r.display)}</text>`;
    })
    .join('');

  return `<figure class="my-8 not-prose">
  <svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(title)}. ${rows.map(r => `${r.label}: ${r.display}`).join('. ')}." style="max-width:100%;height:auto;background:${CREAM_DARK};border-radius:16px;padding:20px;box-sizing:content-box">
    <text x="0" y="18" font-size="17" font-weight="700" fill="${INK}">${esc(title)}</text>
    <text x="0" y="40" font-size="13" fill="${MUTED}">${esc(note)}</text>${bars}
    <text x="0" y="${height - 8}" font-size="11" fill="${MUTED}">The Home Energy Hub &middot; Ofgem cap, ${esc(CAP_PERIOD)} &middot; ${ELECTRICITY_PENCE_PER_KWH}p/kWh</text>
  </svg>
</figure>`;
}

/* Precision is per-chart so each figure matches the decimal places used in
   the table it sits beside. The heat-source comparison quotes 2dp; the
   appliance charts quote 1dp. */
const p = (pence: number, dp = 1) => `${pence.toFixed(dp)}p`;
const gbp = (pence: number) => `£${(pence / 100).toFixed(2)}`;
const gbpWhole = (pounds: number) => `£${Math.round(pounds).toLocaleString('en-GB')}`;

function perHour(watts: number): number {
  return (watts / 1000) * ELECTRICITY_PENCE_PER_KWH;
}

const CHARTS: Record<string, () => string> = {
  /* Cost per hour by heater wattage. */
  'electric-heater-cost-per-hour': () =>
    barChart(
      'What an electric heater costs to run, per hour',
      'At full power. Every heater is 100% efficient, so wattage is the only variable.',
      [
        ['Low-wattage panel or tube heater', 400],
        ['Small oil-filled radiator', 700],
        ['Halogen heater (3-bar)', 1200],
        ['Oil-filled radiator', 1500],
        ['Ceramic tower heater', 1800],
        ['Fan or convector heater', 2000],
        ['Large oil-filled radiator', 2500],
        ['Fan heater on maximum', 3000],
      ].map(([label, w]) => ({
        label: `${label} (${(w as number).toLocaleString('en-GB')}W)`,
        value: perHour(w as number),
        display: p(perHour(w as number)),
      }))
    ),

  /* What thermostatic control is actually worth over a winter. */
  'electric-heater-thermostat-saving': () => {
    const winter = (duty: number) => 1.5 * 5 * 120 * ELECTRICITY_PENCE_PER_KWH * duty;
    return barChart(
      'What a thermostat saves on one 1.5kW heater',
      '5 hours a day for a 120-day winter, by how much of that time the element is actually drawing power.',
      [
        { d: 1.0, label: 'No thermostat, on constantly' },
        { d: 0.6, label: 'Thermostat, 60% duty cycle' },
        { d: 0.5, label: 'Thermostat, 50% duty cycle' },
        { d: 0.4, label: 'Thermostat, 40% duty cycle', hi: true },
      ].map(r => ({
        label: r.label,
        value: winter(r.d),
        display: gbp(winter(r.d)),
        highlight: r.hi,
      }))
    );
  },

  /* Cost per hour by dehumidifier type. */
  'dehumidifier-cost-per-hour': () =>
    barChart(
      'What a dehumidifier costs to run, per hour',
      'At the nameplate power draw. A humidistat cuts this by roughly 60% in real use.',
      [
        ['Mini Peltier (wardrobe, 0.5L/day)', 40],
        ['Small compressor (10L/day)', 160],
        ['Mid-size compressor (12L/day)', 200],
        ['Large compressor (20L/day)', 300],
        ['Extra-large compressor (25L/day)', 480],
        ['Desiccant (7 to 10L/day)', 650],
      ].map(([label, w]) => ({
        label: `${label} — ${w}W`,
        value: perHour(w as number),
        display: p(perHour(w as number)),
      }))
    ),

  /* Cost per load by drying method. Computed from kWh per cycle, so every bar
     matches the per-load table in the tumble dryer guide. */
  'drying-cost-per-load': () =>
    barChart(
      'What it costs to dry one load of washing',
      'Energy used per cycle multiplied by the unit rate. Typical figures for a full 8kg cotton load.',
      [
        { label: 'Heated airer, covered (0.9 kWh)', kwh: 0.9, hi: true },
        { label: 'Heat pump dryer (1.8 kWh)', kwh: 1.8 },
        { label: 'Vented dryer (4.5 kWh)', kwh: 4.5 },
        { label: 'Condenser dryer (5.0 kWh)', kwh: 5.0 },
        { label: 'Washer-dryer, dry cycle (5.25 kWh)', kwh: 5.25 },
      ].map(r => {
        const pence = r.kwh * ELECTRICITY_PENCE_PER_KWH;
        return {
          label: r.label,
          value: pence,
          display: pence < 100 ? p(pence, 0) : gbp(pence),
          highlight: r.hi,
        };
      })
    ),

  /* Heated airer cost per load, by how it is run and what it replaces.
     Computed from power draw x hours, matching the guide's per-load tables. */
  'heated-airer-cost-per-load': () =>
    barChart(
      'Heated airer running cost per load, and what it replaces',
      'Power draw multiplied by drying time. A cover roughly halves the time, which roughly halves the cost.',
      [
        { label: 'Airer, covered, warm room (300W, 3 hours)', w: 300, h: 3, hi: true },
        { label: 'Airer, covered, cold room (300W, 4 hours)', w: 300, h: 4 },
        { label: 'Airer, uncovered (300W, 6 hours)', w: 300, h: 6 },
        { label: 'Airer, uncovered, slow (300W, 8 hours)', w: 300, h: 8 },
        { label: 'Heat pump dryer (0.8kW, 2.5 hours)', w: 800, h: 2.5 },
        { label: 'Vented dryer (2.5kW, 1.5 hours)', w: 2500, h: 1.5 },
        { label: 'Condenser dryer (2.8kW, 2 hours)', w: 2800, h: 2 },
      ].map(r => {
        const pence = (r.w / 1000) * r.h * ELECTRICITY_PENCE_PER_KWH;
        return {
          label: r.label,
          value: pence,
          display: pence < 100 ? p(pence, 0) : gbp(pence),
          highlight: r.hi,
        };
      })
    ),

  /* The tariff lever on a heat pump. 3-bed semi drawing ~3,475 kWh of
     electricity a year, which is the mid-point of the guide's range. */
  'heat-pump-annual-by-tariff': () => {
    const KWH = 3475;
    return barChart(
      'What a heat pump costs to run in a 3-bed semi, by tariff',
      'Same house, same heat pump, 3,475 kWh of electricity a year. Only the tariff changes.',
      [
        { label: 'Standard variable (price cap)', rate: ELECTRICITY_PENCE_PER_KWH },
        { label: 'Economy 7 overnight (13p)', rate: 13 },
        { label: 'Octopus Cosy heat pump rate (10p)', rate: 10, hi: true },
      ].map(r => ({
        label: r.label,
        value: (KWH * r.rate) / 100,
        display: gbpWhole((KWH * r.rate) / 100),
        highlight: r.hi,
      }))
    );
  },

  /* Annual EV home-charging cost by tariff. 8,000 miles at ~3.2 miles/kWh
     is about 2,500 kWh, the basis used in the EV charging guide. */
  'ev-charging-annual-by-tariff': () => {
    const KWH = 2500;
    return barChart(
      'A year of home EV charging, by tariff',
      '8,000 miles at roughly 3.2 miles per kWh, so about 2,500 kWh of charging.',
      [
        { label: 'Standard variable (price cap)', rate: ELECTRICITY_PENCE_PER_KWH },
        { label: 'Octopus Go (8.5p off-peak)', rate: 8.5 },
        { label: 'Intelligent Octopus Go (7.5p off-peak)', rate: 7.5 },
        { label: 'Octopus Agile, well scheduled (5p average)', rate: 5, hi: true },
      ].map(r => ({
        label: r.label,
        value: (KWH * r.rate) / 100,
        display: gbpWhole((KWH * r.rate) / 100),
        highlight: r.hi,
      }))
    );
  },

  /* What a solar battery is worth per year, by export rate. The premium is
     import minus export, so a worse SEG rate makes the battery more valuable. */
  'solar-battery-saving-by-seg': () => {
    const STORED = 1200;
    return barChart(
      'What a 5 kWh solar battery saves a year, by export rate',
      '1,200 kWh stored a year. The saving is the import rate minus your export rate, so a lower SEG rate is worth more.',
      [
        { label: 'SEG 15p (high fixed export rate)', seg: 15 },
        { label: 'SEG 12p (typical fixed export rate)', seg: 12 },
        { label: 'SEG 5p (low fixed export rate)', seg: 5, hi: true },
      ].map(r => ({
        label: r.label,
        value: (STORED * (ELECTRICITY_PENCE_PER_KWH - r.seg)) / 100,
        display: gbpWhole((STORED * (ELECTRICITY_PENCE_PER_KWH - r.seg)) / 100),
        highlight: r.hi,
      }))
    );
  },

  /* Cost per hour by electric blanket type, plus the appliances people reach
     for instead. The point of the chart is the order-of-magnitude gap. */
  'electric-blanket-cost-per-hour': () =>
    barChart(
      'What an electric blanket costs per hour, and what it replaces',
      'At the nameplate power draw. Blankets spend most of the night on a low setting well below this.',
      [
        { label: 'Single underblanket', w: 60, hi: true },
        { label: 'Single overblanket', w: 80 },
        { label: 'Double underblanket', w: 100 },
        { label: 'Heated throw', w: 120 },
        { label: 'King underblanket', w: 140 },
        { label: 'Dehumidifier, mid-size', w: 200 },
        { label: 'Oil-filled radiator', w: 1500 },
        { label: 'Fan heater', w: 2000 },
      ].map(r => ({
        label: `${r.label} (${r.w.toLocaleString('en-GB')}W)`,
        value: perHour(r.w),
        display: p(perHour(r.w)),
        highlight: r.hi,
      }))
    ),

  /* A whole winter of electric blanket use, by how you run it. 120 nights. */
  'electric-blanket-winter-cost': () => {
    const NIGHTS = 120;
    const winter = (kwhPerNight: number) => (kwhPerNight * NIGHTS * ELECTRICITY_PENCE_PER_KWH) / 100;
    return barChart(
      'A whole winter on an electric blanket',
      '120 nights on a 100W double underblanket, by how you use it. Preheat is 30 minutes at full power.',
      [
        { label: 'Preheat only, switched off at bedtime', kwh: 0.05, hi: true },
        { label: 'Preheat, then low setting for 8 hours', kwh: 0.37 },
        { label: 'Full power all night, 8 hours', kwh: 0.8 },
      ].map(r => ({
        label: r.label,
        value: winter(r.kwh),
        display: `£${winter(r.kwh).toFixed(2)}`,
        highlight: r.hi,
      }))
    );
  },

  /* The comparison that decides whether electric heating makes sense at all. */
  'heat-source-cost-per-kwh': () =>
    barChart(
      'Cost per kWh of heat actually delivered',
      'Not cost per kWh of fuel — what you pay for the heat that reaches the room.',
      [
        { label: 'Electric heater (100% efficient)', v: ELECTRICITY_PENCE_PER_KWH },
        { label: 'Gas boiler at 80% efficiency', v: GAS_PENCE_PER_KWH / 0.8 },
        { label: 'Gas boiler at 90% efficiency', v: GAS_PENCE_PER_KWH / 0.9 },
        { label: 'Heat pump at SCOP 3.0', v: ELECTRICITY_PENCE_PER_KWH / 3.0 },
        { label: 'Heat pump at SCOP 3.5', v: ELECTRICITY_PENCE_PER_KWH / 3.5, hi: true },
      ].map(r => ({ label: r.label, value: r.v, display: p(r.v, 2), highlight: r.hi }))
    ),
};

export function renderChart(id: string): string | null {
  const chart = CHARTS[id];
  return chart ? chart() : null;
}
