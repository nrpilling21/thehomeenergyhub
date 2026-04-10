'use client';

import { useState } from 'react';

const BARS = [40,65,30,80,50,90,35,70,55,25,75,45,85,60,30,70,50,90,40,75,55,85,35,65,45,80,60,30,75,50];

export default function AudioPlayer({ duration }: { duration: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex items-center gap-3 py-2">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-9 h-9 rounded-full bg-ink flex items-center justify-center flex-shrink-0 hover:opacity-90 transition"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <rect width="3" height="12" rx="1" fill="#FCFAF8"/>
            <rect x="7" width="3" height="12" rx="1" fill="#FCFAF8"/>
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M0 0.75V11.25L10 6L0 0.75Z" fill="#FCFAF8"/>
          </svg>
        )}
      </button>

      <div className="flex items-center gap-px h-5 flex-shrink-0">
        {BARS.map((h, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full"
            style={{
              height: `${h}%`,
              backgroundColor: '#28030F',
              opacity: i < 2 && isPlaying ? 0.8 : 0.18,
            }}
          />
        ))}
      </div>

      <div className="flex-1 h-1.5 bg-ink/10 rounded-full relative mx-1">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-ink rounded-full shadow-sm"
          style={{ left: '0%' }}
        />
      </div>

      <span className="text-xs text-ink/45 font-mono tabular-nums flex-shrink-0">
        0:00 / {duration}
      </span>
    </div>
  );
}

