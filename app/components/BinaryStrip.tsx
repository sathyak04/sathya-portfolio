/*
 * Binary separator strip — between strings, scrolling 0/1 chars
 * with `////` decoration blocks and a triangle on each end.
 *
 * Adapted from Antoine Wodniack's ASeparator component
 * (https://github.com/AntoineW/AW-2025-Portfolio, CC BY-NC 4.0).
 */
'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
    strings: string[];
    invert?: boolean;
}

export default function BinaryStrip({ strings, invert }: Props) {
    const codes = strings.map((s) =>
        s
            .split('')
            .map((c) => c.charCodeAt(0).toString(2))
            .join(' ')
    );

    return (
        <div
            className="relative flex items-center justify-between w-full"
            style={{
                height: '2.25rem',
                padding: '0 1rem',
                borderTop: '1px solid currentColor',
                borderBottom: '1px solid currentColor',
                fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
                fontSize: 8,
                lineHeight: '16px',
                letterSpacing: '0.04em',
                background: invert ? 'var(--color-secondary)' : 'transparent',
                color: invert ? 'var(--color-primary)' : 'var(--color-secondary)',
            }}
        >
            <Triangle dir="left" color="currentColor" />

            <div className="flex items-center grow" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', minWidth: 0 }}>
                {codes.flatMap((code, i) => {
                    const els: React.ReactNode[] = [
                        <span key={`w${i}`} className="shrink-0 whitespace-nowrap">
                            <BinaryWord text={code} />
                        </span>,
                    ];
                    if (i < codes.length - 1) {
                        els.push(
                            <span
                                key={`s${i}`}
                                aria-hidden
                                className="overflow-hidden mx-2 whitespace-nowrap"
                                style={{ flex: '1 1 0', minWidth: 0, height: 8, lineHeight: '8px', letterSpacing: '0.04em' }}
                            >
                                {'/'.repeat(220)}
                            </span>
                        );
                    }
                    return els;
                })}
            </div>

            <Triangle dir="right" color="currentColor" />
        </div>
    );
}

function Triangle({ dir, color }: { dir: 'left' | 'right'; color: string }) {
    return (
        <span
            aria-hidden
            style={{
                position: 'absolute',
                top: '50%',
                transform: 'translate3d(0, -40%, 0)',
                borderTop: '2px solid transparent',
                borderBottom: '2px solid transparent',
                ...(dir === 'left'
                    ? { left: '1rem', borderLeft: `4px solid ${color}` }
                    : { right: '1rem', borderRight: `4px solid ${color}` }),
            }}
        />
    );
}

function BinaryWord({ text }: { text: string }) {
    const [chars, setChars] = useState<string[]>(() => text.split(''));
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setChars((prev) =>
                prev.map((c) => {
                    if (c === ' ') return c;
                    if (Math.random() > 0.1) return c;
                    return Math.random() > 0.5 ? '0' : '1';
                })
            );
        }, 100);
        return () => {
            if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <span className="inline-flex">
            {chars.map((c, i) => (
                <span key={i} style={{ width: c === ' ' ? '0.4em' : '0.6em', textAlign: 'center' }}>
                    {c === ' ' ? ' ' : c}
                </span>
            ))}
        </span>
    );
}
