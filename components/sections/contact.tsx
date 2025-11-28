"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PersonalData, SocialLink } from "@/lib/schema";

export function Contact({
	personalData,
	socialLinks,
}: {
	personalData: PersonalData;
	socialLinks: SocialLink[];
}) {
	return (
		<section
			id="contact"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6"
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
						Get in Touch
					</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						{personalData.getInTouch}
					</p>
				</div>
			</motion.div>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
				>
					<Mail className="h-10 w-10 text-primary mb-2" />
					<h3 className="font-semibold text-lg">Email</h3>
					<p className="text-sm text-muted-foreground mb-4">
						Feel free to send me an email.
					</p>
					<Button variant="link" asChild>
						<Link href={`mailto:${personalData.email}`}>
							{personalData.email}
						</Link>
					</Button>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
				>
					<MapPin className="h-10 w-10 text-primary mb-2" />
					<h3 className="font-semibold text-lg">Location</h3>
					<p className="text-sm text-muted-foreground mb-4">Based in</p>
					<span className="text-sm font-medium">{personalData.location}</span>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
				>
					<Phone className="h-10 w-10 text-primary mb-2" />
					<h3 className="font-semibold text-lg">Phone</h3>
					<p className="text-sm text-muted-foreground mb-4">Call me at</p>
					<Button variant="link" asChild>
						<Link href={`tel:${personalData.phone}`}>{personalData.phone}</Link>
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
