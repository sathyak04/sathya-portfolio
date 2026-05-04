'use client';

import { motion } from 'framer-motion';

const LANGUAGES = ['Python', 'C / C++', 'JavaScript', 'TypeScript', 'SQL'];

const FRAMEWORKS_TOOLS = [
	'PyTorch',
	'Hugging Face',
	'LangChain',
	'LlamaIndex',
	'FastAPI',
	'React',
	'PostgreSQL',
	'Redis',
	'Docker',
	'AWS',
	'Git',
];

export default function SkillsSection() {
	return (
		<section
			id="skills"
			style={{
				background: 'var(--color-primary)',
				color: 'var(--color-secondary)',
				padding: '3rem 0 2rem',
				position: 'relative',
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
				<span style={{ fontWeight: 700 }}>Skills</span>
				<span style={{ opacity: 0.65 }}>
					{LANGUAGES.length + FRAMEWORKS_TOOLS.length} entries
				</span>
			</motion.div>

			<MarqueeRow label="Languages" items={LANGUAGES} direction="left" duration={28} />
			<div style={{ height: 1, background: 'var(--color-secondary)', opacity: 0.25 }} />
			<MarqueeRow label="Frameworks · Tools" items={FRAMEWORKS_TOOLS} direction="right" duration={48} />
		</section>
	);
}

interface MarqueeProps {
	label: string;
	items: string[];
	direction: 'left' | 'right';
	duration: number; // seconds for one full loop
}

function MarqueeRow({ label, items, direction, duration }: MarqueeProps) {
	// Quadruple the list so the loop is seamless even when the list is short.
	const track = [...items, ...items, ...items, ...items];
	const animName = direction === 'left' ? 'marquee-left' : 'marquee-right';

	return (
		<div style={{ position: 'relative', padding: '1rem 0' }}>
			{/* Floating category label */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '1rem',
					transform: 'translateY(-50%)',
					zIndex: 2,
					padding: '0.4rem 0.8rem',
					background: 'var(--color-secondary)',
					color: 'var(--color-primary)',
					fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
					fontSize: 10,
					fontWeight: 700,
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
				}}
			>
				{label}
			</div>

			<div
				style={{
					overflow: 'hidden',
					maskImage:
						'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
					WebkitMaskImage:
						'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
				}}
			>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						whiteSpace: 'nowrap',
						willChange: 'transform',
						animation: `${animName} ${duration}s linear infinite`,
					}}
				>
					{track.map((skill, i) => (
						<span
							key={i}
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: '1.5rem',
								paddingRight: '1.5rem',
								fontFamily: 'var(--font-display), var(--font-geist-sans), sans-serif',
								fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
								fontWeight: 900,
								lineHeight: 1,
								letterSpacing: '-0.01em',
								textTransform: 'uppercase',
							}}
						>
							{skill}
							<span style={{ fontSize: '0.4em', opacity: 0.6 }}>✦</span>
						</span>
					))}
				</div>
			</div>

			<style>{`
				@keyframes marquee-left {
					from { transform: translate3d(0, 0, 0); }
					to   { transform: translate3d(-50%, 0, 0); }
				}
				@keyframes marquee-right {
					from { transform: translate3d(-50%, 0, 0); }
					to   { transform: translate3d(0, 0, 0); }
				}
			`}</style>
		</div>
	);
}
