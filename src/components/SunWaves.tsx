/* Sunrise wave texture: stacked, gently curving bands that shade from deep
   orange to amber, with film grain on top (the `.grain` class in globals.css).
   Pure SVG generated here, so there is no image file to host or maintain and
   it renders crisp at any size.

   `tone` picks the colour ramp; `seed` shifts the curves so two panels on the
   same page do not look identical. */

type Tone = "sun" | "dusk" | "sand";

const RAMPS: Record<Tone, string[]> = {
  sun: ["#E2470A", "#E9540B", "#EE620E", "#F27012", "#F47E16", "#F68C1B", "#F79A22", "#F8A62B"],
  dusk: ["#8C5BD6", "#A56FD8", "#C483CF", "#DD8FB8", "#EE8F8E", "#F49565", "#F59B44", "#F6A433"],
  sand: ["#EADBC0", "#EEDFC6", "#F1E4CC", "#F3E8D3", "#F5EBD8", "#F7EEDD", "#F8F1E3", "#FAF4E8"],
};

function band(i: number, n: number, seed: number): string {
  const W = 1600;
  const H = 900;
  // Each band starts higher on the left and dips toward the right, like
  // Daylight's diagonal sweep, with a slow sine for softness.
  const baseY = -260 + (i / n) * (H + 420);
  const amp = 46 + ((i * 37 + seed * 13) % 30);
  const phase = (i * 0.55 + seed) % (Math.PI * 2);
  const pts: string[] = [];
  const steps = 16;
  for (let s = 0; s <= steps; s++) {
    const x = (s / steps) * W;
    const y = baseY + (x / W) * 260 + Math.sin(x / 300 + phase) * amp;
    pts.push(`${x.toFixed(0)},${y.toFixed(1)}`);
  }
  return `M0,${H + 400} L${pts.join(" L")} L${W},${H + 400} Z`;
}

export function SunWaves({
  tone = "sun",
  seed = 1,
  className = "",
  animate = false,
}: {
  tone?: Tone;
  seed?: number;
  className?: string;
  animate?: boolean;
}) {
  const ramp = RAMPS[tone];
  const n = ramp.length;
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden grain ${className}`}>
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className={`absolute inset-0 h-full w-[108%] ${animate ? "animate-drift" : ""}`}
      >
        <rect width="1600" height="900" fill={ramp[0]} />
        {ramp.map((c, i) => (
          <path key={i} d={band(i + 1, n, seed)} fill={c} />
        ))}
      </svg>
    </div>
  );
}

/* Brand mark: a sun rising over a roofline. */
export function SunMark({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <path d="M3 17 L16 6 L29 17" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 24 a5.5 5.5 0 0 1 11 0" fill={color} />
      <path d="M6 27.5 H26" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
