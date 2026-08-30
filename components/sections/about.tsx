"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { PersonalData } from "@/data/site-data";

export function About({ personalData }: { personalData: PersonalData }) {
	const yearsExperience = new Date().getFullYear() - personalData.startYear;

	return (
		<section
			id="about"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				viewport={{ once: false, amount: 0.3 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col items-center gap-4 text-center md:gap-8"
			>
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						About Me
					</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Passionate about creating intuitive and dynamic user experiences.
					</p>
				</div>
			</motion.div>

			<div className="grid gap-12 lg:grid-cols-2 mt-16 items-center">
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -50 }}
					viewport={{ once: false, amount: 0.3 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="relative aspect-square overflow-hidden rounded-xl bg-muted"
				>
					<Image
						src={personalData.profileImage}
						alt={`${personalData.name} Profile`}
						fill
						className="object-cover"
					/>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 50 }}
					viewport={{ once: false, amount: 0.3 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex flex-col gap-4"
				>
					{personalData.about.map((paragraph, index) => (
						<p key={index} className="text-lg text-muted-foreground">
							{paragraph}
						</p>
					))}

					<div className="grid grid-cols-2 gap-4 mt-4">
						<Card>
							<CardContent className="p-4 flex flex-col items-center justify-center text-center">
								<span className="text-3xl font-bold">{yearsExperience}+</span>
								<span className="text-sm text-muted-foreground">
									Years Experience
								</span>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4 flex flex-col items-center justify-center text-center">
								<span className="text-3xl font-bold">10+</span>
								<span className="text-sm text-muted-foreground">
									Projects Completed
								</span>
							</CardContent>
						</Card>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
