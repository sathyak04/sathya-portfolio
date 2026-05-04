/*
 * Giant display headline with random per-character slide animation.
 * Each character lives inside a clipped span; on a low-probability tick
 * a random character slides in one of four directions and resets.
 *
 * Adapted from Antoine Wodniack's S-Hero title behaviour
 * (https://github.com/AntoineW/AW-2025-Portfolio, CC BY-NC 4.0).
 */
'use client';

import { useEffect, useRef } from 'react';

interface Props {
    words: string[];
    separator?: string;
}

const DIRECTIONS = ['up', 'down', 'left', 'right'] as const;

export default function DisplayHeadline({ words, separator = '✦' }: Props) {
    const rootRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const charEls = Array.from(root.querySelectorAll<HTMLElement>('.char'));

        // Trigger a slide on a random char roughly every 2.5–4s.
        const scheduleNext = (): number =>
            window.setTimeout(() => {
                const candidates = charEls.filter(
                    (el) => !DIRECTIONS.some((d) => el.classList.contains(`char--${d}`))
                );
                const target = candidates[Math.floor(Math.random() * candidates.length)];
                if (target) {
                    const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
                    target.classList.add(`char--${dir}`);
                    window.setTimeout(() => {
                        DIRECTIONS.forEach((d) => target.classList.remove(`char--${d}`));
                    }, 1200);
                }
                id = scheduleNext();
            }, 2500 + Math.random() * 1500);

        let id = scheduleNext();

        return () => window.clearTimeout(id);
    }, []);

    return (
        <h1
            ref={rootRef}
            className="display-headline"
            style={{
                margin: 0,
                padding: '0.4rem 0',
                fontFamily: 'var(--font-display), var(--font-geist-sans), sans-serif',
                fontWeight: 900,
                fontSize: 'min(12vw, 12rem)',
                lineHeight: 1,
                letterSpacing: 0,
                textTransform: 'uppercase',
                color: 'var(--color-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap',
                rowGap: '0.5rem',
                columnGap: '0.25em',
                userSelect: 'none',
                cursor: 'default',
            }}
        >
            {words.flatMap((word, wIdx) => {
                const wordEl = (
                    <span key={`w${wIdx}`} className="display-word" style={{ display: 'inline-flex' }}>
                        {Array.from(word).map((letter, i) => (
                            <span key={i} className="char">
                                <span className="char__inner">{letter.toUpperCase()}</span>
                            </span>
                        ))}
                    </span>
                );
                if (wIdx === words.length - 1) return [wordEl];
                return [
                    wordEl,
                    <span
                        key={`s${wIdx}`}
                        aria-hidden
                        className="display-sep"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            fontSize: '0.65em',
                            lineHeight: 1,
                            transform: 'translateY(-0.05em)',
                        }}
                    >
                        {separator}
                    </span>,
                ];
            })}
        </h1>
    );
}
