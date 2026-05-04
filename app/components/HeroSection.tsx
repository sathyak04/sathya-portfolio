'use client';
import { motion } from 'framer-motion';
import WaveField from './WaveField';
import BinaryStrip from './BinaryStrip';
import DisplayHeadline from './DisplayHeadline';

export default function HeroSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, delay: 2.7 }}
			className="relative flex flex-col overflow-hidden"
			style={{
				height: '100svh',
				background: 'var(--color-primary)',
				color: 'var(--color-secondary)',
			}}
		>
			{/* Wave field — fills remaining space at the top */}
			<div className="relative" style={{ flex: '1 1 0', minHeight: 0 }}>
				<WaveField />
			</div>

			<BinaryStrip strings={['Build', 'With', 'Purpose']} />

			<DisplayHeadline words={['AI', 'FullStack']} />

			<div
				style={{
					padding: '0.35rem 1.25rem 0.6rem',
					textAlign: 'center',
					fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
					fontSize: 12,
					lineHeight: 1.5,
					letterSpacing: '0.05em',
					textTransform: 'uppercase',
					color: 'var(--color-secondary)',
				}}
			>
				<div style={{ fontWeight: 700 }}>
					Sathya Kumaraguru — CS @ UC Santa Cruz · DSA Tutor
				</div>
				<div style={{ opacity: 0.75 }}>
					Previously: Overture Maps Foundation (AWS · Meta · Microsoft) · Molina Healthcare · GPT Integrators
				</div>
			</div>

			<BinaryStrip strings={['Sa', 'thya', 'Ku', 'ma', 'ra', 'gu', 'ru']} />
		</motion.section>
	);
}
