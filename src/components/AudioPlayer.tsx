'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const BARS = [40,65,30,80,50,90,35,70,55,25,75,45,85,60,30,70,50,90,40,75,55,85,35,65,45,80,60,30,75,50];

export default function AudioPlayer({ duration, text }: { duration: string; text: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState('0:00');
  const [supported, setSupported] = useState(true);
  const accumulatedRef = useRef(0);
  const startTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);

  const totalSeconds = (() => {
    const parts = duration.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  })();

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  /* Split text into ~200-char chunks at sentence boundaries to avoid
     Chrome's ~15 s auto-pause bug with long utterances. */
  useEffect(() => {
    const sentences = text.match(/[^.!?\n]+[.!?\n]+/g) || [text];
    const chunks: string[] = [];
    let buf = '';
    for (const s of sentences) {
      if ((buf + s).length > 200 && buf) {
        chunks.push(buf.trim());
        buf = s;
      } else {
        buf += s;
      }
    }
    if (buf.trim()) chunks.push(buf.trim());
    chunksRef.current = chunks;
  }, [text]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const sec = accumulatedRef.current + (Date.now() - startTimeRef.current) / 1000;
      const pct = Math.min((sec / totalSeconds) * 100, 100);
      setProgress(pct);
      setElapsed(formatTime(sec));
    }, 250);
  }, [totalSeconds, stopTimer]);

  const speakChunk = useCallback((idx: number) => {
    if (idx >= chunksRef.current.length) {
      setIsPlaying(false);
      setProgress(100);
      setElapsed(duration);
      stopTimer();
      return;
    }
    chunkIndexRef.current = idx;
    const utter = new SpeechSynthesisUtterance(chunksRef.current[idx]);
    utter.rate = 1;
    utter.pitch = 1;
    utter.onend = () => {
      accumulatedRef.current += (Date.now() - startTimeRef.current) / 1000;
      startTimeRef.current = Date.now();
      speakChunk(idx + 1);
    };
    utter.onerror = () => {
      setIsPlaying(false);
      stopTimer();
    };
    window.speechSynthesis.speak(utter);
  }, [duration, stopTimer]);

  const handlePlayPause = useCallback(() => {
    if (!supported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      accumulatedRef.current += (Date.now() - startTimeRef.current) / 1000;
      stopTimer();
      setIsPlaying(false);
    } else {
      if (progress >= 100) {
        /* Restart from beginning */
        accumulatedRef.current = 0;
        setProgress(0);
        setElapsed('0:00');
        chunkIndexRef.current = 0;
      }
      window.speechSynthesis.cancel();
      startTimer();
      speakChunk(chunkIndexRef.current);
      setIsPlaying(true);
    }
  }, [supported, isPlaying, progress, stopTimer, startTimer, speakChunk]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopTimer();
    };
  }, [stopTimer]);

  if (!supported) return null;

  return (
    <div className="flex items-center gap-3 py-2">
      <button
        onClick={handlePlayPause}
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
        {BARS.map((h, i) => {
          const barPct = (i / BARS.length) * 100;
          return (
            <div
              key={i}
              className="w-0.5 rounded-full transition-opacity"
              style={{
                height: `${h}%`,
                backgroundColor: '#28030F',
                opacity: barPct < progress ? 0.7 : 0.18,
              }}
            />
          );
        })}
      </div>

      <div className="flex-1 h-1.5 bg-ink/10 rounded-full relative mx-1">
        <div
          className="absolute top-0 left-0 h-full bg-ink/25 rounded-full"
          style={{ width: `${progress}%`, transition: 'width 0.3s' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-ink rounded-full shadow-sm"
          style={{ left: `${Math.min(progress, 100)}%`, transition: 'left 0.3s' }}
        />
      </div>

      <span className="text-xs text-ink/45 font-mono tabular-nums flex-shrink-0">
        {elapsed} / {duration}
      </span>
    </div>
  );
}
