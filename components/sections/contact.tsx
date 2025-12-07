"use client";

import { motion } from "framer-motion";
import {
	Facebook,
	Github,
	Globe,
	Linkedin,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
} from "lucide-react";
import Link from "next/link";
import { EmailDialog } from "@/components/email-dialog";
import { Button } from "@/components/ui/button";

import type { PersonalData, SocialLink } from "@/lib/db/zod-schema";

export function Contact({
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
		<section
			id="contact"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				viewport={{ once: false, amount: 0.3 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col items-center gap-4 text-center md:gap-8 mb-16"
			>
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Get in Touch
					</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						{personalData.getInTouch}
					</p>
				</div>
			</motion.div>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
				<EmailDialog email={personalData.email}>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						viewport={{ once: false, amount: 0.3 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors cursor-pointer"
					>
						<Mail className="h-10 w-10 text-primary mb-2" />
						<h3 className="font-semibold text-lg">Email</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Feel free to send me an email.
						</p>
						<Button variant="link" asChild>
							<span>{personalData.email}</span>
						</Button>
					</motion.div>
				</EmailDialog>

				<Link
					href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
						personalData.location,
					)}`}
					target="_blank"
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						viewport={{ once: false, amount: 0.3 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors"
					>
						<MapPin className="h-10 w-10 text-primary mb-2" />
						<h3 className="font-semibold text-lg">Location</h3>
						<p className="text-sm text-muted-foreground mb-4">Based in</p>
						<span className="text-sm font-medium">{personalData.location}</span>
					</motion.div>
				</Link>

				<Link href={`tel:${personalData.phone}`}>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						viewport={{ once: false, amount: 0.3 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors"
					>
						<Phone className="h-10 w-10 text-primary mb-2" />
						<h3 className="font-semibold text-lg">Phone</h3>
						<p className="text-sm text-muted-foreground mb-4">Call me at</p>
						<Button variant="link" asChild>
							<span>{personalData.phone}</span>
						</Button>
					</motion.div>
				</Link>

				{socialLinks.map((link, index) => {
					const Icon = getIcon(link.name);
					return (
						// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
						<Link href={link.url} target="_blank" key={link.name}>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								viewport={{ once: false, amount: 0.3 }}
								transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
								className="flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors"
							>
								<Icon className="h-10 w-10 text-primary mb-2" />
								<h3 className="font-semibold text-lg">{link.name}</h3>
								<p className="text-sm text-muted-foreground mb-4">
									Connect on {link.name}
								</p>
								<Button variant="link" asChild>
									<span>View Profile</span>
								</Button>
							</motion.div>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
