/* Homepage hero: the Sunlight "light through a window" scene, animated from
   morning through midday and dusk to night on a 32s loop. Pure SVG + CSS (the
   keyframes live in globals.css under "Day-to-night hero"), so it ships no
   video and no JavaScript. With prefers-reduced-motion it holds the static
   amber midday frame, which matches <Sunlight mood="amber" />. */

const SCENES = [
  { cls: "dn-morning", wall: ["#9E856C", "#BFA587"], floor: ["#6E5A47", "#5E4C3B"] },
  { cls: "dn-amber", wall: ["#8C6447", "#B8865C"], floor: ["#4A3122", "#3B271B"] },
  { cls: "dn-dusk", wall: ["#4E4A52", "#77675E"], floor: ["#2B2522", "#221D1A"] },
  { cls: "dn-night", wall: ["#151A26", "#262A36"], floor: ["#0E1018", "#090B10"] },
];

const PANES = [
  [0, 0],
  [164, 0],
  [0, 204],
  [164, 204],
];

export function DayNight() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden grain">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          {SCENES.map((s) => (
            <g key={s.cls}>
              <linearGradient id={`${s.cls}-wall`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={s.wall[0]} />
                <stop offset="1" stopColor={s.wall[1]} />
              </linearGradient>
              <linearGradient id={`${s.cls}-floor`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={s.floor[0]} />
                <stop offset="1" stopColor={s.floor[1]} />
              </linearGradient>
            </g>
          ))}
          <radialGradient id="dn-vig" cx="0.5" cy="0.45" r="0.75">
            <stop offset="0.45" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.55" />
          </radialGradient>
          <radialGradient id="dn-lampg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFC98A" stopOpacity="0.85" />
            <stop offset="1" stopColor="#FFC98A" stopOpacity="0" />
          </radialGradient>
          <filter id="dn-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="dn-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="90" />
          </filter>
        </defs>

        {/* Wall and floor for each time of day, crossfaded */}
        {SCENES.map((s) => (
          <g key={s.cls} className={`dn-layer ${s.cls}`}>
            <rect width="1600" height="1000" fill={`url(#${s.cls}-wall)`} />
            <rect y="760" width="1600" height="240" fill={`url(#${s.cls}-floor)`} />
          </g>
        ))}
        <rect y="756" width="1600" height="6" fill="#000" opacity="0.15" />

        {/* Sunlight through the window, tracking across the wall */}
        <g className="dn-sun">
          <ellipse cx="850" cy="430" rx="420" ry="300" fill="#FFE2B0" opacity="0.35" filter="url(#dn-glow)" />
          <g transform="translate(690 150)" filter="url(#dn-soft)">
            {PANES.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="150" height="190" fill="#FFE8C2" />
            ))}
          </g>
        </g>
        <g className="dn-sunfloor">
          <g transform="translate(550 790)" filter="url(#dn-soft)">
            <rect width="314" height="150" fill="#FFE2B0" />
          </g>
        </g>

        {/* Night: faint moonlight panes and a warm lamp glow */}
        <g className="dn-moon" transform="translate(380 190) skewX(10)" filter="url(#dn-soft)">
          {PANES.map(([x, y]) => (
            <rect key={`m${x}-${y}`} x={(x * 132) / 164} y={(y * 162) / 204} width="120" height="150" fill="#AFC3E8" />
          ))}
        </g>
        <ellipse className="dn-lamp" cx="1380" cy="640" rx="420" ry="360" fill="url(#dn-lampg)" />

        <rect width="1600" height="1000" fill="url(#dn-vig)" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/20" />
    </div>
  );
}
