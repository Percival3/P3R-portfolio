import React, { useEffect, useRef, useState } from 'react';

interface HomeBootSequenceProps {
  lines?: string[];
  /** Optional final line rendered with .home-boot__final styling (themed accent color). */
  finalLine?: string;
  label?: string;
  localeTag?: string;
  storageKey?: string;
}

const DEFAULT_LINES = [
  'INITIALIZING SYSTEM...',
  'CONNECTING TO THE VAST AND INFINITE NET...',
  'LOADING GHOST...',
  'AWAKENING...',
];

const TYPE_INTERVAL_MS = 42;
const HOLD_DELAY_MS = 900;
const REDUCED_MOTION_HOLD_MS = 220;
const EXIT_DURATION_MS = 720;
const DEFAULT_STORAGE_KEY = 'curved-chaos-home-boot-seen';

export default function HomeBootSequence({
  lines = DEFAULT_LINES,
  finalLine,
  label = 'Boot Sequence',
  localeTag = 'HOME / ZH',
  storageKey = DEFAULT_STORAGE_KEY,
}: HomeBootSequenceProps) {
  const [bootText, setBootText] = useState('');
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const fullText = lines.join('\n');
  const overflowRef = useRef({ body: '', html: '' });
  const shouldPlayRef = useRef(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(media.matches);
    updateMotionPreference();

    media.addEventListener('change', updateMotionPreference);
    return () => media.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(storageKey) === 'true') {
        shouldPlayRef.current = false;
        setIsVisible(false);
        return;
      }

      window.sessionStorage.setItem(storageKey, 'true');
    } catch {
      // Ignore storage failures and fall back to playing the animation.
    }
  }, [storageKey]);

  useEffect(() => {
    overflowRef.current = {
      body: document.body.style.overflow,
      html: document.documentElement.style.overflow,
    };

    return () => {
      document.body.style.overflow = overflowRef.current.body;
      document.documentElement.style.overflow = overflowRef.current.html;
      delete document.documentElement.dataset.homeBoot;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (!shouldPlayRef.current) {
      document.body.style.overflow = overflowRef.current.body;
      document.documentElement.style.overflow = overflowRef.current.html;
      delete root.dataset.homeBoot;
      return;
    }

    root.dataset.homeBoot = isVisible && !isExiting ? 'booting' : 'ready';

    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = overflowRef.current.body;
    document.documentElement.style.overflow = overflowRef.current.html;
  }, [isVisible, isExiting]);

  useEffect(() => {
    const timeoutIds: number[] = [];
    let typingIntervalId: number | undefined;

    if (!shouldPlayRef.current) return;

    if (prefersReducedMotion) {
      setBootText(fullText);
      timeoutIds.push(window.setTimeout(() => setIsExiting(true), REDUCED_MOTION_HOLD_MS));

      return () => {
        timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      };
    }

    let cursor = 0;
    typingIntervalId = window.setInterval(() => {
      cursor += 1;
      setBootText(fullText.slice(0, cursor));

      if (cursor >= fullText.length) {
        window.clearInterval(typingIntervalId);
        timeoutIds.push(window.setTimeout(() => setIsExiting(true), HOLD_DELAY_MS));
      }
    }, TYPE_INTERVAL_MS);

    return () => {
      if (typingIntervalId) {
        window.clearInterval(typingIntervalId);
      }
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [fullText, prefersReducedMotion]);

  useEffect(() => {
    if (!shouldPlayRef.current || !isExiting) return;

    const exitTimeoutId = window.setTimeout(() => setIsVisible(false), EXIT_DURATION_MS);
    return () => window.clearTimeout(exitTimeoutId);
  }, [isExiting]);

  if (!isVisible) return null;

  return (
    <div className={`home-boot${isExiting ? ' is-exiting' : ''}`} aria-hidden="true">
      <div className="home-boot__noise"></div>

      <div className="home-boot__frame">
        <div className="home-boot__topline">
          <span>{label}</span>
          <span>{localeTag}</span>
        </div>

        <div className="home-boot__output">
          {bootText.split('\n').map((line, i, arr) => {
            const isLast = i === arr.length - 1;
            // Apply final styling when this is the last line being typed and it
            // matches (or is a partial prefix of) the designated finalLine.
            const isFinal =
              Boolean(finalLine) &&
              isLast &&
              line.length > 0 &&
              finalLine!.startsWith(line);
            return (
              <div key={i} className={isFinal ? 'home-boot__final' : undefined}>
                {line || '\u00A0'}
                {!isExiting && isLast && <span className="home-boot__cursor" />}
              </div>
            );
          })}
        </div>

        <div className="home-boot__footer">
          <span>PERSONAL DOSSIER // 2026</span>
          <span>CALIBRATING ENTRY VECTOR</span>
        </div>
      </div>
    </div>
  );
}
