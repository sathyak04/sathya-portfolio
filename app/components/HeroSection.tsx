'use client';

import { motion } from 'framer-motion';

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

			<div className="relative z-10 text-center">
			<motion.h1
			initial={{ y: 50 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
			className="text-4xl md:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-600 fix-clipping pixelFont"
			>
			Sathya Kumaraguru
			</motion.h1>

				<motion.p
					initial={{ y: 60, opacity: 0 }}
					animate={{ y: 20, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="text-3xl md:text-3xl text-white-300 mb-8 px-1 leading-normal pixelFont"
				>
					Full-Stack Developer & AI Enthusiast
				</motion.p>
			</div>

			<motion.div
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.6 }}
				className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
			>
				<div className="animate-bounce">
					<svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
					</svg>
				</div>
			</motion.div>
		</motion.section>
	);
}