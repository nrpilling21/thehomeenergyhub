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
