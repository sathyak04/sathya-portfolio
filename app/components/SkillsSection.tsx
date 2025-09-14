'use client';

import { motion } from 'framer-motion';

const skills = [
  // Programming Languages
  'Python', 'C++', 'JavaScript', 'SQL', 'C#', 'C', 'HTML',

  // Frameworks & Libraries
  'TensorFlow', 'Keras', 'Scikit-learn', 'React', 'ASP.NET', 'Pandas', 'NumPy', 'Matplotlib', 'KAPLAY',

  // Tools & Platforms
  'Git', 'GitHub', 'GitLab', 'Linux', 'Windows', 'Visual Studio Code', 'Visual Studio', 'PyCharm', 'Jupyter Notebook',

  // Soft Skills
  'Problem Solving', 'Teamwork', 'Collaboration', 'Communication', 'Critical Thinking', 'Adaptability', 'Time Management', 'Leadership'
];

export default function SkillsSection() {
	return (
		<section className="py-12 md:py-20 bg-gradient-to-r from-red-600 to-yellow-600">
			<div className="max-w-7xl mx-auto px-4">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-6xl md:text-6xl font-bold mb-8 md:mb-12 text-center pixelFont"
				>
					Skills & Technologies
				</motion.h2>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{skills.map((skill, index) => (
						<motion.div
							key={skill}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							whileHover={{ scale: 1.05 }}
							className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
						>
							<h3 className="text-lg font-semibold">{skill}</h3>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}