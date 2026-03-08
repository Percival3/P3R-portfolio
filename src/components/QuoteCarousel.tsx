import React, { useEffect, useMemo, useState } from 'react';

export type QuoteItem = {
  text: string;
  sub: string;
};

const DEFAULT_QUOTES: QuoteItem[] = [
  { text: '头顶的星空和心中的律令', sub: '理性作为存在' },
  { text: 'Stand Alone Complex', sub: '个体分离，共鸣成网' },
  { text: 'Cogito ergo sum', sub: '我思故我在' },
];

interface QuoteCarouselProps {
  quotes?: readonly QuoteItem[];
  mode?: 'typewriter' | 'lyrics';
}

/* ─── Lyrics mode ─────────────────────────────────────────── */

const ITEM_H = 50; // px per lyrics slot, sized for two wrapped lines
const LYRICS_HOLD_MS = 3600;

function LyricsCarousel({ quotes }: { quotes: readonly QuoteItem[] }) {
  const n = quotes.length;
  // Extended list: [last, ...quotes, first] for seamless infinite wrap
  const extended = useMemo(
    () => [quotes[n - 1], ...quotes, quotes[0]],
    [quotes, n],
  );
  // pos: 1..n are real items; 0 = phantom(last), n+1 = phantom(first)
  const [pos, setPos] = useState(1);
  const [noAnim, setNoAnim] = useState(false);

  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => {
      setNoAnim(false);
      setPos((p) => {
        const next = p + 1;
        if (next === n + 1) {
          // Animate to phantom(first), then silently reset to pos=1
          setTimeout(() => {
            setNoAnim(true);
            setPos(1);
            requestAnimationFrame(() =>
              requestAnimationFrame(() => setNoAnim(false)),
            );
          }, 580);
        }
        return next;
      });
    }, LYRICS_HOLD_MS);
    return () => clearInterval(t);
  }, [n]);

  const translateY = ITEM_H - pos * ITEM_H;

  return (
    <div style={{ height: ITEM_H * 3, overflow: 'hidden' }}>
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          transition: noAnim ? 'none' : 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {extended.map((q, i) => {
          const active = i === pos;
          return (
            <div
              key={i}
              style={{
                height: ITEM_H,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                opacity: active ? 1 : 0.38,
                transition: 'opacity 0.5s',
              }}
            >
              <span
                style={{
                  fontWeight: 900,
                  fontStyle: 'italic',
                  fontSize: active ? '0.82rem' : '0.68rem',
                  color: active ? 'var(--p3r-ice-white)' : 'var(--p3r-ice-text-dim)',
                  textShadow: active ? 'var(--p3r-ice-hover-glow)' : 'none',
                  transition: 'all 0.5s',
                  display: '-webkit-box',
                  overflow: 'hidden',
                  lineHeight: 1.12,
                  maxWidth: '100%',
                  overflowWrap: 'break-word',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {q.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Typewriter mode ─────────────────────────────────────── */

const TEXT_TYPING_MS = 70;
const HOLD_MS = 1700;

function TypewriterCarousel({ quotes }: { quotes: readonly QuoteItem[] }) {
  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [quotes]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const current = quotes[index];
    if (!current) return;

    setTypedText('');

    let textCursor = 0;
    let textTimer: number | undefined;
    let nextTimer: number | undefined;

    if (prefersReducedMotion) {
      setTypedText(current.text);
      if (quotes.length > 1) {
        nextTimer = window.setTimeout(
          () => setIndex((prev) => (prev + 1) % quotes.length),
          HOLD_MS + 900,
        );
      }
      return () => { if (nextTimer) window.clearTimeout(nextTimer); };
    }

    const scheduleNext = () => {
      if (quotes.length < 2) return;
      nextTimer = window.setTimeout(
        () => setIndex((prev) => (prev + 1) % quotes.length),
        HOLD_MS,
      );
    };

    textTimer = window.setInterval(() => {
      textCursor += 1;
      setTypedText(current.text.slice(0, textCursor));
      if (textCursor >= current.text.length) {
        window.clearInterval(textTimer);
        scheduleNext();
      }
    }, TEXT_TYPING_MS);

    return () => {
      if (textTimer) window.clearInterval(textTimer);
      if (nextTimer) window.clearTimeout(nextTimer);
    };
  }, [index, prefersReducedMotion, quotes]);

  return (
    <div className="mx-auto flex min-h-[7.8rem] max-w-2xl items-center justify-center sm:min-h-[8.8rem] md:min-h-[10.4rem]">
      <div className="w-full">
        <blockquote className="quote-display text-center text-[1.05rem] sm:text-[1.25rem] md:text-[2rem] italic leading-[1.4] text-[#f6ead9] dark:text-[#d8efff] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
          {typedText}
          {!prefersReducedMotion && (
            <span className="inline-block w-[1px] h-[0.95em] ml-1 align-[-0.04em] bg-current animate-pulse"></span>
          )}
        </blockquote>
      </div>
    </div>
  );
}

/* ─── Public export ──────────────────────────────────────── */

export default function QuoteCarousel({ quotes, mode = 'typewriter' }: QuoteCarouselProps) {
  const resolvedQuotes = useMemo(
    () => (quotes && quotes.length > 0 ? quotes : DEFAULT_QUOTES),
    [quotes],
  );

  if (mode === 'lyrics') {
    return <LyricsCarousel quotes={resolvedQuotes} />;
  }

  return <TypewriterCarousel quotes={resolvedQuotes} />;
}
