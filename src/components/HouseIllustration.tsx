/* Isometric line drawing of a home with the upgrades this site covers:
   rooftop solar, an air source heat pump and a home EV charger. Ink outlines
   on cream with the upgrades picked out in sunrise orange. Built from 3D
   points projected to isometric 2D, so proportions stay consistent and it
   can be tweaked by changing numbers rather than redrawing paths. */

type P3 = [number, number, number];

const OX = 158;
const OY = 168;
const C = 0.866;

function p([x, y, z]: P3): string {
  return `${(OX + (x - y) * C).toFixed(1)},${(OY + (x + y) * 0.5 - z).toFixed(1)}`;
}
const poly = (pts: P3[]) => pts.map(p).join(" ");

const W = 220; // length along x
const D = 150; // depth along y
const H = 108; // wall height
const R = 64; // roof rise
const INK = "#1C130B";
const CREAM = "#FFF7E9";
const SAND = "#F3E9D6";

export function HouseIllustration({ className = "" }: { className?: string }) {
  // Solar panels on the front roof slope: eave (y=D+6, z=H-4) to ridge (y=D/2, z=H+R).
  const eave: [number, number] = [D + 6, H - 4];
  const ridge: [number, number] = [D / 2, H + R];
  const onSlope = (x: number, t: number): P3 => [
    x,
    eave[0] + (ridge[0] - eave[0]) * t,
    eave[1] + (ridge[1] - eave[1]) * t,
  ];
  const panels: P3[][] = [];
  const cols = 4;
  const rows = 2;
  const x0 = 30;
  const x1 = W - 30;
  const t0 = 0.14;
  const t1 = 0.86;
  const gx = 5;
  const gt = 0.04;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const ax = x0 + ((x1 - x0) / cols) * c + gx / 2;
      const bx = x0 + ((x1 - x0) / cols) * (c + 1) - gx / 2;
      const at = t0 + ((t1 - t0) / rows) * r + gt / 2;
      const bt = t0 + ((t1 - t0) / rows) * (r + 1) - gt / 2;
      panels.push([onSlope(ax, at), onSlope(bx, at), onSlope(bx, bt), onSlope(ax, bt)]);
    }
  }

  // Heat pump unit beside the gable wall.
  const hp = { x0: W + 14, x1: W + 30, y0: D - 78, y1: D - 22, z: 44 };
  const fan: string = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    return p([hp.x1, (hp.y0 + hp.y1) / 2 + Math.cos(a) * 14, hp.z / 2 + Math.sin(a) * 14]);
  }).join(" ");

  // EV charger post in front of the house.
  const ev = { x0: 26, x1: 36, y0: D + 46, y1: D + 54, z: 58 };

  return (
    <svg viewBox="0 0 400 410" className={className} role="img" aria-label="Illustration of a home with solar panels, a heat pump and an EV charger">
      <defs>
        <linearGradient id="heh-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E2470A" />
          <stop offset="1" stopColor="#F8A62B" />
        </linearGradient>
        <linearGradient id="heh-unit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F47E16" />
          <stop offset="1" stopColor="#E2470A" />
        </linearGradient>
      </defs>

      {/* Sun */}
      <circle cx="338" cy="58" r="30" fill="#F7931E" opacity="0.9" />
      <circle cx="338" cy="58" r="44" fill="none" stroke="#F7931E" strokeOpacity="0.35" />

      <g stroke={INK} strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">
        {/* Plot outline */}
        <polygon
          points={poly([[-30, -24, 0], [W + 54, -24, 0], [W + 54, D + 76, 0], [-30, D + 76, 0]])}
          fill="none"
          strokeOpacity="0.25"
          strokeDasharray="3 4"
        />

        {/* Back roof slope */}
        <polygon points={poly([[-6, -6, H - 4], [W + 6, -6, H - 4], [W + 6, D / 2, H + R], [-6, D / 2, H + R]])} fill={SAND} />

        {/* Gable end wall */}
        <polygon points={poly([[W, 0, 0], [W, D, 0], [W, D, H], [W, D / 2, H + R], [W, 0, H]])} fill={SAND} />
        <polygon points={poly([[W, 46, 54], [W, 92, 54], [W, 92, 84], [W, 46, 84]])} fill={CREAM} />
        <polygon points={poly([[W, D / 2 - 8, H + 18], [W, D / 2 + 8, H + 18], [W, D / 2 + 8, H + 34], [W, D / 2 - 8, H + 34]])} fill={CREAM} />

        {/* Front wall */}
        <polygon points={poly([[0, D, 0], [W, D, 0], [W, D, H], [0, D, H]])} fill={CREAM} />
        <polygon points={poly([[26, D, 50], [74, D, 50], [74, D, 84], [26, D, 84]])} fill={SAND} />
        <polygon points={poly([[150, D, 50], [196, D, 50], [196, D, 84], [150, D, 84]])} fill={SAND} />
        <polygon points={poly([[96, D, 0], [126, D, 0], [126, D, 62], [96, D, 62]])} fill={SAND} />

        {/* Front roof slope with overhang */}
        <polygon points={poly([[-6, D + 6, H - 4], [W + 6, D + 6, H - 4], [W + 6, D / 2, H + R], [-6, D / 2, H + R]])} fill={CREAM} />

        {/* Solar panels */}
        {panels.map((pts, i) => (
          <polygon key={i} points={poly(pts)} fill="url(#heh-panel)" strokeWidth="0.9" />
        ))}

        {/* Heat pump */}
        <polygon points={poly([[hp.x0, hp.y1, 0], [hp.x1, hp.y1, 0], [hp.x1, hp.y1, hp.z], [hp.x0, hp.y1, hp.z]])} fill="#B8430A" />
        <polygon points={poly([[hp.x1, hp.y0, 0], [hp.x1, hp.y1, 0], [hp.x1, hp.y1, hp.z], [hp.x1, hp.y0, hp.z]])} fill="url(#heh-unit)" />
        <polygon points={poly([[hp.x0, hp.y0, hp.z], [hp.x1, hp.y0, hp.z], [hp.x1, hp.y1, hp.z], [hp.x0, hp.y1, hp.z]])} fill="#F8A62B" />
        <polygon points={fan} fill="none" stroke={CREAM} strokeWidth="1.4" />

        {/* EV charger and cable */}
        <polygon points={poly([[ev.x0, ev.y1, 0], [ev.x1, ev.y1, 0], [ev.x1, ev.y1, ev.z], [ev.x0, ev.y1, ev.z]])} fill="#B8430A" />
        <polygon points={poly([[ev.x1, ev.y0, 0], [ev.x1, ev.y1, 0], [ev.x1, ev.y1, ev.z], [ev.x1, ev.y0, ev.z]])} fill="url(#heh-unit)" />
        <polygon points={poly([[ev.x0, ev.y0, ev.z], [ev.x1, ev.y0, ev.z], [ev.x1, ev.y1, ev.z], [ev.x0, ev.y1, ev.z]])} fill="#F8A62B" />
        <path
          d={`M ${p([ev.x1, ev.y1 - 2, 40])} C ${p([ev.x1 + 40, ev.y1 + 14, 10])} ${p([ev.x1 + 70, ev.y1 + 4, 0])} ${p([ev.x1 + 96, ev.y1 - 6, 0])}`}
          fill="none"
          stroke="#E2470A"
          strokeWidth="1.8"
        />
      </g>
    </svg>
  );
}
