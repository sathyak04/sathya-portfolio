/*
 * Animated wave field of vertical line strands.
 *
 * Technique adapted from Antoine Wodniack's AWaves component in
 * AW-2025-Portfolio (https://github.com/AntoineW/AW-2025-Portfolio,
 * CC BY-NC 4.0). Reimplemented in React/TypeScript with our own
 * palette (green bg / black lines) and wired through React refs.
 *
 * Each strand is a column of points. Per frame:
 *   1. Perlin-noise drift gives ambient wave motion.
 *   2. Cursor velocity pushes nearby points; spring tension and
 *      friction pull them home.
 */
'use client';

import { useEffect, useRef } from 'react';
import { Noise } from '../utils/Noise';

interface Point {
    x: number;
    y: number;
    waveX: number;
    waveY: number;
    cx: number;
    cy: number;
    vx: number;
    vy: number;
}

const X_GAP = 10;
const Y_GAP = 32;

export default function WaveField() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const svg = svgRef.current;
        if (!container || !svg) return;

        const noise = new Noise(Math.random());

        let lines: Point[][] = [];
        let paths: SVGPathElement[] = [];
        let bounding = { left: 0, top: 0, width: 0, height: 0 };
        let rafId = 0;

        const mouse = {
            x: -10,
            y: 0,
            lx: 0,
            ly: 0,
            sx: 0,
            sy: 0,
            v: 0,
            vs: 0,
            a: 0,
            set: false,
        };

        const setSize = () => {
            const rect = container.getBoundingClientRect();
            bounding = {
                left: rect.left,
                top: rect.top + window.scrollY,
                width: container.clientWidth,
                height: container.clientHeight,
            };
            svg.setAttribute('width', `${bounding.width}`);
            svg.setAttribute('height', `${bounding.height}`);
        };

        const buildLines = () => {
            for (const path of paths) path.remove();
            lines = [];
            paths = [];

            const { width, height } = bounding;

            // Extend the grid past the container so wave displacement never
            // reveals an empty band at the edges. ~140px gives full coverage
            // without bloating the point count (perf was lagging at 240).
            const overshootTop = 140;
            const overshootBottom = 140;
            const oWidth = width + 300;
            const oHeight = height + overshootTop + overshootBottom;

            const totalLines = Math.ceil(oWidth / X_GAP);
            const totalPoints = Math.ceil(oHeight / Y_GAP);

            const xStart = (width - X_GAP * totalLines) / 2;
            const yStart = -overshootTop;

            for (let i = 0; i <= totalLines; i++) {
                const points: Point[] = [];
                for (let j = 0; j <= totalPoints; j++) {
                    points.push({
                        x: xStart + X_GAP * i,
                        y: yStart + Y_GAP * j,
                        waveX: 0,
                        waveY: 0,
                        cx: 0,
                        cy: 0,
                        vx: 0,
                        vy: 0,
                    });
                }

                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', '#000');
                path.setAttribute('stroke-width', '1');
                svg.appendChild(path);

                lines.push(points);
                paths.push(path);
            }
        };

        const movePoints = (time: number) => {
            for (const points of lines) {
                for (const p of points) {
                    // Ambient perlin drift
                    const move =
                        noise.perlin2((p.x + time * 0.0125) * 0.002, (p.y + time * 0.005) * 0.0015) * 12;
                    p.waveX = Math.cos(move) * 32;
                    p.waveY = Math.sin(move) * 16;

                    // Cursor push
                    const dx = p.x - mouse.sx;
                    const dy = p.y - mouse.sy;
                    const d = Math.hypot(dx, dy);
                    const l = Math.max(175, mouse.vs);

                    if (d < l) {
                        const s = 1 - d / l;
                        const f = Math.cos(d * 0.001) * s;
                        p.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
                        p.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
                    }

                    // Spring pull home + friction
                    p.vx += (0 - p.cx) * 0.005;
                    p.vy += (0 - p.cy) * 0.005;
                    p.vx *= 0.925;
                    p.vy *= 0.925;
                    p.cx += p.vx * 2;
                    p.cy += p.vy * 2;

                    // Clamp
                    if (p.cx > 100) p.cx = 100;
                    else if (p.cx < -100) p.cx = -100;
                    if (p.cy > 100) p.cy = 100;
                    else if (p.cy < -100) p.cy = -100;
                }
            }
        };

        const drawLines = () => {
            for (let li = 0; li < lines.length; li++) {
                const points = lines[li];
                let d = '';
                for (let pi = 0; pi < points.length; pi++) {
                    const p = points[pi];
                    const isLast = pi === points.length - 1;
                    const useCursor = !isLast;
                    const x = Math.round((p.x + p.waveX + (useCursor ? p.cx : 0)) * 10) / 10;
                    const y = Math.round((p.y + p.waveY + (useCursor ? p.cy : 0)) * 10) / 10;
                    d += pi === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
                }
                paths[li].setAttribute('d', d);
            }
        };

        const tick = (time: number) => {
            // Smoothed mouse position
            mouse.sx += (mouse.x - mouse.sx) * 0.1;
            mouse.sy += (mouse.y - mouse.sy) * 0.1;

            const dx = mouse.x - mouse.lx;
            const dy = mouse.y - mouse.ly;
            const d = Math.hypot(dx, dy);
            mouse.v = d;
            mouse.vs += (d - mouse.vs) * 0.1;
            if (mouse.vs > 100) mouse.vs = 100;

            mouse.lx = mouse.x;
            mouse.ly = mouse.y;
            mouse.a = Math.atan2(dy, dx);

            container.style.setProperty('--x', `${mouse.sx}px`);
            container.style.setProperty('--y', `${mouse.sy}px`);

            movePoints(time);
            drawLines();

            rafId = requestAnimationFrame(tick);
        };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX - bounding.left;
            mouse.y = e.clientY - bounding.top + window.scrollY;
            if (!mouse.set) {
                mouse.sx = mouse.x;
                mouse.sy = mouse.y;
                mouse.lx = mouse.x;
                mouse.ly = mouse.y;
                mouse.set = true;
            }
        };

        const onResize = () => {
            setSize();
            buildLines();
        };

        setSize();
        buildLines();
        // Render one static frame so the panel reveal doesn't expose blank SVG
        drawLines();

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('resize', onResize);

        // Defer the rAF loop until the intro's strips begin to slide so we
        // don't burn CPU updating ~200 SVG paths behind panels that cover
        // them.  Starts ~200ms before the strips begin opening.
        const startId = window.setTimeout(() => {
            rafId = requestAnimationFrame(tick);
        }, 2200);

        return () => {
            window.clearTimeout(startId);
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            for (const path of paths) path.remove();
        };
    }, []);

    return (
        <div ref={containerRef} className="wave-field absolute inset-0 overflow-hidden">
            <svg ref={svgRef} className="block w-full h-full" style={{ overflow: 'visible' }} />
        </div>
    );
}
