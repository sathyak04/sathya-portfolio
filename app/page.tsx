'use client';

import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';

export default function MinimalModernPortfolio() {
	return (
		<div className="min-h-screen" style={{ background: 'var(--color-primary)', color: 'var(--color-secondary)' }}>
			<HeroSection />
			<SkillsSection />
			<ProjectsSection />
			<footer
				style={{
					padding: '2rem 1.5rem',
					textAlign: 'center',
					fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
					fontSize: 11,
					letterSpacing: '0.05em',
					textTransform: 'uppercase',
					color: 'rgba(255,255,255,0.5)',
					background: '#000',
				}}
			>
				Site intro animation, wave-field interaction, and binary-strip motif
				adapted from{' '}
				<a
					href="https://github.com/AntoineW/AW-2025-Portfolio"
					target="_blank"
					rel="noopener noreferrer"
					style={{ textDecoration: 'underline', color: 'rgba(255,255,255,0.85)' }}
				>
					Antoine Wodniack&apos;s AW-2025-Portfolio
				</a>{' '}
				(CC BY-NC 4.0)
			</footer>
		</div>
	);
}
