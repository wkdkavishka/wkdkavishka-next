"use client";

import { motion } from "framer-motion";
import {
	ArrowRight,
	Download,
	Facebook,
	Github,
	Globe,
	Linkedin,
	MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PersonalData, SocialLink } from "@/lib/db/zod-schema";

export function Hero({
	personalData,
	socialLinks,
}: {
	personalData: PersonalData;
	socialLinks: SocialLink[];
}) {
	const getIcon = (name: string) => {
		const lowerName = name.toLowerCase();
		if (lowerName.includes("linkedin")) return Linkedin;
		if (lowerName.includes("github")) return Github;
		if (lowerName.includes("facebook")) return Facebook;
		if (lowerName.includes("whatsapp")) return MessageCircle;
		if (lowerName.includes("instagram")) return Globe; // Fallback or specific
		return Globe;
	};

	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-16 md:pt-0">
			{/* Background Elements */}
			<div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
			<div className="absolute left-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]"></div>
			<div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-secondary/20 blur-[100px]"></div>

			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center gap-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						viewport={{ once: false }}
						transition={{ duration: 0.5 }}
						className="inline-block rounded-lg bg-muted px-3 py-1 text-sm"
					>
						Available for new projects
					</motion.div>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						viewport={{ once: false }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent pb-3 bg-gradient-to-r from-foreground to-foreground/70"
					>
						Hi, I'm <span className="text-primary">{personalData.name}</span>
						<br />
						{personalData.title}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						viewport={{ once: false }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed pb-3 xl:text-xl/relaxed"
					>
						{personalData.description}
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						viewport={{ once: false }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex flex-col gap-2 min-[400px]:flex-row"
					>
						<Button size="lg" className="gap-2" asChild>
							<Link href="#contact">
								Hire Me <ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" className="gap-2" asChild>
							<Link
								href={
									personalData.resumeUrl.includes("cloudinary")
										? personalData.resumeUrl.replace(
												"/upload/",
												"/upload/fl_attachment/",
											)
										: personalData.resumeUrl
								}
								target="_blank"
							>
								Download CV <Download className="h-4 w-4" />
							</Link>
						</Button>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						viewport={{ once: false }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="flex items-center gap-4 mt-8"
					>
						{socialLinks.map((link) => {
							const Icon = getIcon(link.name);
							return (
								<Link
									key={link.name}
									href={link.url}
									target="_blank"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									<Icon className="h-6 w-6" />
									<span className="sr-only">{link.name}</span>
								</Link>
							);
						})}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
