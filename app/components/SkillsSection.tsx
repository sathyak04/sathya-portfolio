'use client';

import { motion } from 'framer-motion';

const skillCategories = [
	{
		title: "Languages",
		icon: (
			<svg className="w-10 h-10 mb-4 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
			</svg>
		),
		skills: ['JavaScript / TypeScript', 'Python', 'SQL', 'C / C++', 'C#', 'Java']
	},
	{
		title: "Frameworks & Libraries",
		icon: (
			<svg className="w-10 h-10 mb-4 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
			</svg>
		),
		skills: ['React & Next.js', 'Node.js & Express', 'TensorFlow & Scikit-learn', 'ASP.NET', 'Three.js', 'Tailwind & Framer Motion']
	},
	{
		title: "Cloud, Tools & Databases",
		icon: (
			<svg className="w-10 h-10 mb-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
		),
		skills: ['Google Cloud & Firebase', 'MongoDB', 'PostgreSQL & Neon', 'Groq & Vercel AI SDK', 'Git & Linux']
	}
];

export default function SkillsSection() {
	return (
		<section className="py-12 flex justify-center bg-black relative overflow-hidden">
			{/* Stylish Background Pattern Glow */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.1),transparent)]" />

			<div className="max-w-6xl w-full px-6 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-10"
				>
					<h2 className="text-4xl md:text-6xl font-bold text-white pixelFont drop-shadow-md mb-4">
						Skills & Technologies
					</h2>
					<p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto">
						The technical foundation behind my projects and professional experience.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
					{skillCategories.map((category, index) => (
						<motion.div
							key={category.title}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							className="bg-black/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/30 hover:bg-black/30 hover:-translate-y-2 transition-all duration-300 shadow-2xl flex flex-col items-center"
						>
							<div className="flex flex-col items-center mb-4">
								{category.icon}
								<h3 className="text-xl font-bold text-center text-white pixelFont tracking-wide drop-shadow-sm">{category.title}</h3>
							</div>

							<div className="flex flex-wrap gap-2 justify-center mt-2">
								{category.skills.map((skill) => (
									<span
										key={skill}
										className="bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-white/90 hover:bg-white/25 hover:text-white transition-all duration-200 cursor-default border border-white/5 shadow-sm"
									>
										{skill}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}