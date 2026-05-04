'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Project {
    id: number;
    title: string;
    tagline: string;
    description: string;
    tech: string[];
    image: string;
    projectLink?: string;
    githubLink?: string;
    hackathonLink?: string;
    isHackathonWinner?: boolean;
    bgClassName?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Gopher',
        tagline: 'AI travel planner',
        description:
            'Groq-powered itinerary generator with the Google Maps API, a Framer Motion frontend, and Neon Postgres for trip storage.',
        tech: ['Next.js', 'Groq', 'Maps', 'Neon'],
        image: '/gopher_bg.png',
        projectLink: 'https://gopher-eight.vercel.app/',
        githubLink: 'https://github.com/sathyak04/gopher',
        hackathonLink: 'https://devpost.com/software/gopher-cayzwi',
    },
    {
        id: 2,
        title: 'MutationMap',
        tagline: '3D cancer ML platform',
        description:
            'Interactive React Three Fiber visualization plus a Scikit-learn + Groq pipeline predicting cancer types at 92%+ accuracy.',
        tech: ['React', 'Three.js', 'Python', 'Scikit-Learn'],
        image: '/mutation_bg.png',
        bgClassName: 'bg-white',
        projectLink: 'https://biohacks-1.onrender.com/',
        githubLink: 'https://github.com/sathyak04/biohacks',
        hackathonLink: 'https://devpost.com/software/cancer-predicter',
    },
    {
        id: 3,
        title: 'Spango',
        tagline: '3D language learning',
        description:
            'Immersive 3D language platform with planetary visualization, Web Speech pronunciation feedback, and Firebase progression.',
        tech: ['React', 'Three.js', 'Web Speech', 'Firebase'],
        image: '/earth_bg.png',
        projectLink: 'https://spango.vercel.app/',
        githubLink: 'https://github.com/sathyak04/spango',
        hackathonLink: 'https://acmhacks-2025.devpost.com/project-gallery',
        isHackathonWinner: true,
    },
    {
        id: 4,
        title: 'ACM at UCSC',
        tagline: 'Chapter platform',
        description:
            'Full-stack site for the UCSC ACM chapter — events via the Google Calendar API, member auth, and a MongoDB profile backend.',
        tech: ['React', 'Express', 'MongoDB', 'Calendar API'],
        image: '/acm_bg.png',
        projectLink: 'https://acmucsc.vercel.app/',
    },
    {
        id: 5,
        title: "Who's That Pokémon?",
        tagline: 'AI letter prediction',
        description:
            'TensorFlow letter classifier trained on the EMNIST dataset, served via a JS frontend deployed on Google Cloud Run.',
        tech: ['Python', 'TensorFlow', 'EMNIST', 'Cloud Run'],
        image: '/pokeball_bg.png',
        projectLink: 'https://whos-that-pokemon-455795788738.us-central1.run.app/',
        githubLink: 'https://github.com/sathyak04/pokemon-emnist',
    },
    {
        id: 6,
        title: 'Cloud Image Uploader',
        tagline: 'OAuth · GCS · WebSockets',
        description:
            'Full-stack uploader integrating Google OAuth, GCS object processing, and live WebSocket progress updates to the client.',
        tech: ['React', 'Fastify', 'GCP', 'WebSockets'],
        image: '/camera_bg.png',
        projectLink: 'https://www.loom.com/share/ef4d8bebffdd469dbd50bd53634d68a4',
        githubLink: 'https://github.com/sathyak04/upload-application',
    },
    {
        id: 7,
        title: 'The MushROOMS',
        tagline: 'Maze game · DFS / A*',
        description:
            'Pygame maze on a graph data structure with randomized DFS generation and A* pathfinding via stack and priority queues.',
        tech: ['Python', 'Pygame', 'Graphs'],
        image: '/mushroom_bg.png',
        projectLink: 'https://sathyak04.github.io/the-mushrooms/',
        githubLink: 'https://github.com/sathyak04/the-mushrooms',
    },
    {
        id: 8,
        title: 'Capybara Run!',
        tagline: '2D side-scroller',
        description:
            '2D side-scrolling runner in vanilla JavaScript and HTML with the KAPLAY library — progressive difficulty and OOP architecture.',
        tech: ['JavaScript', 'HTML', 'KAPLAY'],
        image: '/orange_bg.png',
        projectLink: '/projects/capybara-game',
        githubLink: 'https://github.com/sathyak04/my-portfolio',
    },
];

export default function ProjectsSection() {
    const [hovered, setHovered] = useState<Project | null>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <section
            id="work"
            style={{
                background: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                padding: '3.5rem 0 4rem',
            }}
        >
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '0 1.5rem 0.75rem',
                    fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid var(--color-secondary)',
                }}
            >
                <span style={{ fontWeight: 700 }}>Selected Work</span>
                <span style={{ opacity: 0.65 }}>
                    {String(projects.length).padStart(3, '0')} entries
                </span>
            </motion.div>

            {/* Project rows */}
            <div>
                {projects.map((p, i) => (
                    <ProjectRow
                        key={p.id}
                        project={p}
                        index={i}
                        onEnter={() => setHovered(p)}
                        onLeave={() => setHovered(null)}
                    />
                ))}
            </div>

            {/* Cursor-following preview */}
            <CursorPreview project={hovered} pos={pos} />
        </section>
    );
}

interface RowProps {
    project: Project;
    index: number;
    onEnter: () => void;
    onLeave: () => void;
}

function ProjectRow({ project, index, onEnter, onLeave }: RowProps) {
    const href = project.projectLink ?? project.githubLink ?? '#';
    const isExternal = href.startsWith('http');
    const idx = String(index + 1).padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            style={{ borderBottom: '1px solid var(--color-secondary)' }}
        >
            <Link
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className="project-row group"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto auto auto',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '0.85rem 1.5rem',
                    textDecoration: 'none',
                    transition: 'background 0.25s ease, color 0.25s ease',
                }}
            >
                <span
                    style={{
                        fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
                        fontSize: 12,
                        letterSpacing: '0.05em',
                        opacity: 0.55,
                    }}
                >
                    [{idx}]
                </span>

                <h3
                    className="project-title"
                    style={{
                        margin: 0,
                        fontFamily:
                            'var(--font-display), var(--font-geist-sans), sans-serif',
                        fontWeight: 900,
                        fontSize: 'clamp(1.7rem, 4.5vw, 4rem)',
                        lineHeight: 1,
                        letterSpacing: '-0.01em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {project.title}
                </h3>

                <span
                    className="project-tech"
                    style={{
                        fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
                        fontSize: 11,
                        letterSpacing: '0.06em',
                        opacity: 0.7,
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {project.tech.join(' · ')}
                    {project.isHackathonWinner && (
                        <span style={{ marginLeft: '0.6rem' }}>★ Winner</span>
                    )}
                </span>

                {/* GitHub icon — sibling click target inside the row link.
                    stopPropagation + preventDefault keeps the row's main
                    link from also firing when this is clicked. */}
                {project.githubLink ? (
                    <button
                        type="button"
                        aria-label={`${project.title} source on GitHub`}
                        title="View source"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(
                                project.githubLink!,
                                '_blank',
                                'noopener,noreferrer'
                            );
                        }}
                        className="project-gh"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 30,
                            height: 30,
                            background: 'transparent',
                            border: '1px solid currentColor',
                            cursor: 'pointer',
                            color: 'inherit',
                            padding: 0,
                            transition: 'transform 0.2s ease',
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </button>
                ) : (
                    // Reserve the slot so all rows align even without a repo link
                    <span aria-hidden style={{ width: 30, height: 30 }} />
                )}

                <span
                    style={{
                        fontSize: '1.4rem',
                        lineHeight: 1,
                        transition: 'transform 0.25s ease',
                        display: 'inline-block',
                    }}
                    className="project-arrow"
                >
                    →
                </span>
            </Link>

            <style>{`
                .project-row {
                    /* Base color set in CSS (not inline) so :hover can override it */
                    color: var(--color-secondary);
                }
                .project-row h3,
                .project-row span,
                .project-row button {
                    color: inherit;
                }
                .project-row:hover {
                    background: var(--color-secondary);
                    color: var(--color-primary);
                }
                .project-row:hover .project-arrow {
                    transform: translateX(0.4rem);
                }
                .project-gh:hover {
                    transform: scale(1.12);
                }
                @media (max-width: 700px) {
                    .project-tech { display: none; }
                }
            `}</style>
        </motion.div>
    );
}

interface PreviewProps {
    project: Project | null;
    pos: { x: number; y: number };
}

function CursorPreview({ project, pos }: PreviewProps) {
    const PREVIEW_W = 360;
    const PREVIEW_H = 360;
    // Flip to the left side of the cursor when there's no room on the right
    const flipLeft =
        typeof window !== 'undefined' && pos.x + 28 + PREVIEW_W > window.innerWidth;
    const left = flipLeft ? pos.x - 28 - PREVIEW_W : pos.x + 28;

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    style={{
                        position: 'fixed',
                        left,
                        top: Math.min(
                            Math.max(pos.y - 180, 16),
                            (typeof window !== 'undefined' ? window.innerHeight : 800) -
                                PREVIEW_H -
                                16
                        ),
                        width: PREVIEW_W,
                        zIndex: 80,
                        pointerEvents: 'none',
                        overflow: 'hidden',
                        border: '2px solid var(--color-secondary)',
                        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
                        background: 'var(--color-primary)',
                        color: 'var(--color-secondary)',
                    }}
                >
                    {/* Image */}
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: 200,
                            background: project.bgClassName === 'bg-white' ? '#fff' : '#000',
                        }}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes={`${PREVIEW_W}px`}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    {/* Description block */}
                    <div style={{ padding: '0.75rem 1rem 1rem' }}>
                        <div
                            style={{
                                fontFamily:
                                    'var(--font-display), var(--font-geist-sans), sans-serif',
                                fontSize: 22,
                                fontWeight: 900,
                                lineHeight: 1,
                                letterSpacing: '-0.01em',
                                textTransform: 'uppercase',
                                marginBottom: '0.5rem',
                            }}
                        >
                            {project.title}
                            {project.isHackathonWinner && (
                                <span
                                    style={{
                                        marginLeft: '0.5rem',
                                        fontFamily:
                                            'var(--font-geist-mono), ui-monospace, monospace',
                                        fontSize: 10,
                                        fontWeight: 700,
                                        letterSpacing: '0.08em',
                                    }}
                                >
                                    ★ WINNER
                                </span>
                            )}
                        </div>
                        <p
                            style={{
                                margin: 0,
                                fontFamily: 'var(--font-geist-sans), sans-serif',
                                fontSize: 13,
                                lineHeight: 1.45,
                            }}
                        >
                            {project.description}
                        </p>
                        <div
                            style={{
                                marginTop: '0.65rem',
                                fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
                                fontSize: 10,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                opacity: 0.7,
                            }}
                        >
                            {project.tech.join(' · ')}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
