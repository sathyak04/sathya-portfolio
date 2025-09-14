'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
	{
		id: 1,
		title: 'Capybara Run!',
		description: '2D side-scrolling runner game in JavaScript and HTML, utilizing object-oriented programming principles with KAPLAY library.',
		image: '/orange_bg.png',
		projectLink: '/projects/capybara-game',
		githubLink: 'https://github.com/sathyak04/my-portfolio/tree/main/public/capybara-game',
	},
	{
		id: 2,
		title: 'Who\'s That Pokemon?',
		description: 'AI-powered letter prediction using Python & TensorFlow on the EMNIST dataset, with JavaScript frontend, deployed on Google Cloud Run. <span style="color: red;">** Loading project may take up to a minute **</span>',
		image: '/pokeball_bg.png',
		projectLink: 'https://pokemon-emnist-649222735408.us-central1.run.app',
		githubLink: 'https://github.com/sathyak04/pokemon-emnist',
	},
	{
		id: 3,
		title: 'Cloud Image Uploader',
		description: 'Full-Stack image uploader using React & Fastify, integrated with Google Cloud for OAuth, GCS processing, and WebSockets.',
		image: '/camera_bg.png',
		projectLink: 'https://www.loom.com/share/ef4d8bebffdd469dbd50bd53634d68a4?sid=ce6bcf48-4483-470b-82d5-b9462efe9604',
		githubLink: 'https://github.com/sathyak04/upload-application',
	},
	{
		id: 4,
		title: 'The MushROOMS',
  		description: 'Pygame maze game on a graph data structure, using randomized DFS and A* pathfinding algorithms implemented with stack and priority queues. <span style="color: red;">** Loading project may take up to a minute **</span>',
		projectLink: 'https://sathyak04.github.io/the-mushrooms/',
		githubLink: 'https://github.com/sathyak04/the-mushrooms',
	},
];

export default function ProjectsSection() {
	return (
		<section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-6xl md:text-6xl font-bold mb-8 md:mb-12 text-center pixelFont"
			>
				Featured Projects
			</motion.h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{projects.map((project) => (
					<motion.div
						key={project.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: project.id * 0.1 }}
						whileHover={{ scale: 1.02 }}
						className="group relative aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl overflow-hidden"
					>
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-cover transition-transform group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
						<div className="absolute inset-0 p-6 flex flex-col justify-end">
							<h3 className="text-xl mb-2 pixelFont text-5xl md:text-4xl text-red-400">{project.title}</h3>
							<p className="text-white-300 mb-4">{project.description}</p>
							<div className="flex gap-4">
								{project.projectLink && (
									<Link
										href={project.projectLink}
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
											View Project
										</div>
									</Link>
								)}
								{project.githubLink && (
									<Link
										href={project.githubLink}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
									>
										GitHub
									</Link>
								)}
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}