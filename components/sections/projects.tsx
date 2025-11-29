"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/schema";

function ProjectCard({ 
	project, 
	index,
	imageBlobs,
}: { 
	project: Project; 
	index: number;
	imageBlobs?: Record<string, string>;
}) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		// Only set up interval if there are multiple images
		if (project.image.length <= 1) return;

		// Stagger the start time based on index (0.5s per index)
		const startDelay = index * 500; // 500ms = 0.5s
		let interval: NodeJS.Timeout;

		const timeout = setTimeout(() => {
			interval = setInterval(() => {
				setCurrentImageIndex((prev) => (prev + 1) % project.image.length);
			}, 3000); // Change image every 3 seconds
		}, startDelay);

		return () => {
			clearTimeout(timeout);
			if (interval) clearInterval(interval);
		};
	}, [project.image.length, index]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
		>
			<Card className="h-full flex flex-col overflow-hidden border-muted-foreground/20 hover:border-primary/50 transition-colors">
				<div className="aspect-video bg-muted relative group overflow-hidden">
					<AnimatePresence mode="popLayout">
						<motion.div
							key={currentImageIndex}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="absolute inset-0"
						>
							<Image
								src={imageBlobs?.[project.image[currentImageIndex]] || project.image[currentImageIndex]}
								alt={project.title}
								fill
								className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
							/>
						</motion.div>
					</AnimatePresence>
				</div>
				<CardHeader>
					<CardTitle>{project.title}</CardTitle>
					<CardDescription>{project.description}</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 flex flex-col gap-4">
					<div className="flex flex-wrap gap-2">
						{project.tags.map((tag) => (
							<span
								key={tag}
								className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
							>
								{tag}
							</span>
						))}
					</div>
					<div className="flex gap-2 mt-auto">
						{project.github && (
							<Button
								variant="outline"
								size="sm"
								className="flex-1 gap-2"
								asChild
							>
								<Link href={project.github} target="_blank">
									<Github className="h-4 w-4" /> Code
								</Link>
							</Button>
						)}
						<Button size="sm" className="flex-1 gap-2" asChild>
							<Link href={project.link} target="_blank">
								<ExternalLink className="h-4 w-4" /> Demo
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

export function Projects({ projects, imageBlobs }: { projects: Project[]; imageBlobs?: Record<string, string> }) {
	return (
		<section
			id="projects"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6 bg-muted/50 flex flex-col items-center"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className="flex flex-col items-center gap-4 text-center md:gap-8 mb-16"
			>
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Featured Projects
					</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						A selection of my recent work.
					</p>
				</div>
			</motion.div>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{projects.map((project, index) => (
					<ProjectCard key={index} project={project} index={index} imageBlobs={imageBlobs} />
				))}
			</div>
		</section>
	);
}
