'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

function AnimatedNumber({ value, suffix = '', delay = 0 }: { value: number; suffix?: string; delay?: number }) {
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

	useEffect(() => {
		const timeout = setTimeout(() => {
			animate(count, value, { duration: 2, ease: 'easeOut' });
		}, delay * 1000);
		return () => clearTimeout(timeout);
	}, [count, value, delay]);

	return <motion.span>{rounded}</motion.span>;
}

export default function HeroSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="h-screen flex items-center justify-center relative"
		>
			<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(0,0,0,1))]" />
			</div>

			<div className="relative z-10 text-center flex flex-col items-center max-w-4xl mx-auto px-6">
				<motion.h1
					initial={{ y: 50 }}
					animate={{ y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-4xl md:text-7xl font-bold mb-0 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-rose-400 fix-clipping pixelFont"
				>
					Sathya Kumaraguru
				</motion.h1>

				<motion.p
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="text-3xl md:text-3xl text-white-300 mb-2 -mt-2 px-1 leading-normal pixelFont"
				>
					Full-Stack Developer & AI Enthusiast
				</motion.p>

				{/* Stats (Centered below) */}
				<motion.div
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="flex flex-wrap justify-center gap-4 w-full"
				>
					<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 min-w-[130px] max-w-[160px]">
						<p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 pixelFont mb-1">
							<AnimatedNumber value={8} suffix="+" delay={0.6} />
						</p>
						<h3 className="text-sm text-white font-medium pixelFont leading-tight mt-1">Projects Built</h3>
					</div>

					<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 min-w-[130px] max-w-[160px]">
						<p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 pixelFont mb-1">
							<AnimatedNumber value={4} suffix="+" delay={0.6} />
						</p>
						<h3 className="text-sm text-white font-medium pixelFont leading-tight mt-1">Years Experience</h3>
					</div>

					<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 min-w-[130px] max-w-[160px]">
						<p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 pixelFont mb-1">
							<AnimatedNumber value={3} suffix="+" delay={0.6} />
						</p>
						<h3 className="text-sm text-white font-medium pixelFont leading-tight mt-1">Internships</h3>
					</div>
				</motion.div>
			</div>

			<motion.div
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.8 }}
				className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
			>
				<div className="animate-bounce">
					<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
						<defs>
							<linearGradient id="gradientIcon" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="#2dd4bf" /> {/* teal-400 */}
								<stop offset="100%" stopColor="#fb7185" /> {/* rose-400 */}
							</linearGradient>
						</defs>
						<path stroke="url(#gradientIcon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
					</svg>
				</div>
			</motion.div>
		</motion.section>
	);
}