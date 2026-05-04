/*
 * Loading intro: a hairline draws across the full viewport, holds, then the
 * green overlay shatters into vertical strips. Each strip's top half slides
 * up and bottom half slides down, with a tiny right-to-left stagger so the
 * page feels like it's being unzipped sideways.
 *
 * Pacing borrows from Antoine Wodniack's AW-2025-Portfolio (CC BY-NC 4.0).
 * Credit visible in the page footer.
 */
'use client';

import { motion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';

const COLUMN_COUNT = 10;
const STRIP_DURATION = 0.95; // seconds per strip exit
const STAGGER = 0.06; // seconds between adjacent strips (right→left)
const HOLD_BEFORE_REVEAL_MS = 2400;
const TOTAL_EXIT_MS = (STRIP_DURATION + (COLUMN_COUNT - 1) * STAGGER) * 1000;

const EASE = [0.86, 0, 0.07, 1] as const;
const HAIRLINE_EASE = [0.25, 1, 0.5, 1] as const;

export default function IntroOverlay() {
    const [exiting, setExiting] = useState(false);
    const [unmounted, setUnmounted] = useState(false);

    useEffect(() => {
        const exitId = window.setTimeout(() => setExiting(true), HOLD_BEFORE_REVEAL_MS);
        const unmountId = window.setTimeout(
            () => setUnmounted(true),
            HOLD_BEFORE_REVEAL_MS + TOTAL_EXIT_MS + 200
        );
        return () => {
            window.clearTimeout(exitId);
            window.clearTimeout(unmountId);
        };
    }, []);

    if (unmounted) return null;

    const widthPct = 100 / COLUMN_COUNT;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 60,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {Array.from({ length: COLUMN_COUNT }).map((_, i) => {
                // Right-most strip (highest i) goes first, leftmost goes last.
                const delay = (COLUMN_COUNT - 1 - i) * STAGGER;
                const leftPct = i * widthPct;
                // +0.5% overlap so we never get sub-pixel green slivers between strips
                const wPct = widthPct + 0.5;

                return (
                    <Fragment key={i}>
                        {/* Top half of this column */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: exiting ? '-101%' : 0 }}
                            transition={{
                                duration: STRIP_DURATION,
                                delay: exiting ? delay : 0,
                                ease: EASE,
                            }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: `${leftPct}%`,
                                width: `${wPct}%`,
                                height: '50%',
                                background: 'var(--color-primary)',
                                willChange: 'transform',
                                transform: 'translate3d(0,0,0)',
                            }}
                        />
                        {/* Bottom half of this column */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: exiting ? '101%' : 0 }}
                            transition={{
                                duration: STRIP_DURATION,
                                delay: exiting ? delay : 0,
                                ease: EASE,
                            }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: `${leftPct}%`,
                                width: `${wPct}%`,
                                height: '50%',
                                background: 'var(--color-primary)',
                                willChange: 'transform',
                                transform: 'translate3d(0,0,0)',
                            }}
                        />
                    </Fragment>
                );
            })}

            {/* Hairline — full viewport width, draws left → right slowly */}
            <motion.div
                initial={{ scaleX: 0, opacity: 1 }}
                animate={
                    exiting
                        ? { scaleX: 1, opacity: 0 }
                        : { scaleX: 1, opacity: 1 }
                }
                transition={
                    exiting
                        ? { duration: 0.7, ease: 'easeOut' }
                        : { duration: 1.55, ease: HAIRLINE_EASE }
                }
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'var(--color-secondary)',
                    transformOrigin: '0 50%',
                    translateY: '-50%',
                    willChange: 'transform, opacity',
                }}
            />
        </div>
    );
}
