/* Atmospheric "sunlight through a window" panels, drawn in SVG so the site
   ships no stock photography. A warm wall, a floor line, window-pane patches
   of light softened with blur, a vignette and film grain read as a calm,
   photographic interior at any size.

   Every slot accepts `src`: drop in a real image later (e.g. your own
   generated photography in /public/images) and the panel uses it instead,
   with the same grain and darkening for legible white text. */

type Mood = "amber" | "dusk" | "morning";

const MOODS: Record<Mood, { wallTop: string; wallBottom: string; floor: string; light: string; lightOpacity: number }> = {
  amber: { wallTop: "#8C6447", wallBottom: "#B8865C", floor: "#4A3122", light: "#FFE2B0", lightOpacity: 0.75 },
  dusk: { wallTop: "#4E4A52", wallBottom: "#77675E", floor: "#2B2522", light: "#F6C894", lightOpacity: 0.6 },
  morning: { wallTop: "#CDBBA5", wallBottom: "#E4D5C1", floor: "#9C8670", light: "#FFF6E6", lightOpacity: 0.85 },
};

export function Sunlight({
  mood = "amber",
  seed = 0,
  src,
  alt = "",
  className = "",
  shade = true,
}: {
  mood?: Mood;
  seed?: number;
  src?: string;
  alt?: string;
  className?: string;
  shade?: boolean;
}) {
  const m = MOODS[mood];
  const id = `sl-${mood}-${seed}`;
  // Window position and light angle shift with the seed so panels differ.
  const x = 520 + ((seed * 173) % 420);
  const skew = -16 - (seed % 3) * 6;
  const pw = 150;
  const ph = 190;
  const gap = 14;

  return (
    <div aria-hidden={!src} className={`absolute inset-0 overflow-hidden grain ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={m.wallTop} />
              <stop offset="1" stopColor={m.wallBottom} />
            </linearGradient>
            <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={m.floor} stopOpacity="0.85" />
              <stop offset="1" stopColor={m.floor} />
            </linearGradient>
            <radialGradient id={`${id}-vig`} cx="0.5" cy="0.45" r="0.75">
              <stop offset="0.45" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.55" />
            </radialGradient>
            <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
            <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="90" />
            </filter>
          </defs>

          <rect width="1600" height="1000" fill={`url(#${id}-wall)`} />

          {/* Broad bloom of light around the window patch */}
          <ellipse cx={x + 160} cy="430" rx="420" ry="300" fill={m.light} opacity={m.lightOpacity * 0.45} filter={`url(#${id}-glow)`} />

          {/* Window panes of light, skewed by the sun angle */}
          <g transform={`translate(${x} 150) skewX(${skew})`} filter={`url(#${id}-soft)`} opacity={m.lightOpacity}>
            {[0, 1].map((c) =>
              [0, 1].map((r) => (
                <rect key={`${c}${r}`} x={c * (pw + gap)} y={r * (ph + gap)} width={pw} height={ph} fill={m.light} />
              ))
            )}
          </g>

          {/* Floor */}
          <rect y="760" width="1600" height="240" fill={`url(#${id}-floor)`} />
          <rect y="756" width="1600" height="6" fill="#000" opacity="0.15" />
          {/* Light spilling across the floor */}
          <g transform={`translate(${x - 140} 790) skewX(${skew * 2.4})`} filter={`url(#${id}-soft)`} opacity={m.lightOpacity * 0.55}>
            <rect width={pw * 2 + gap} height="150" fill={m.light} />
          </g>

          <rect width="1600" height="1000" fill={`url(#${id}-vig)`} />
        </svg>
      )}
      {shade && <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/20" />}
    </div>
  );
}
