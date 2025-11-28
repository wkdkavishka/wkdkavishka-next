"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import siteData from "@/data/site-data";

export function Contact() {
	return (
		<section id="contact" className="w-full py-24 sm:py-32 bg-muted/50">
			<div className="container px-4 md:px-6 mx-auto">
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
							Have a project in mind or want to say hello? I&apos;d love to hear
							from you.
						</p>
					</div>
				</motion.div>

				<div className="grid gap-8 lg:grid-cols-2">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Card className="h-full border-muted-foreground/20">
							<CardHeader>
								<CardTitle>Contact Information</CardTitle>
								<CardDescription>
									Feel free to reach out through any of these channels.
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-6">
								<div className="flex items-center gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
										<Mail className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm font-medium">Email</p>
										<p className="text-sm text-muted-foreground">
											{siteData.personal.email}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
										<Phone className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm font-medium">WhatsApp</p>
										<Link
											href={
												siteData.personal.socialLinks.find(
													(s) => s.name === "WhatsApp",
												)?.url || "#"
											}
											target="_blank"
											className="text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											{siteData.personal.phone}
										</Link>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
										<MapPin className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm font-medium">Location</p>
										<p className="text-sm text-muted-foreground">
											{siteData.personal.location}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Card className="border-muted-foreground/20">
							<CardHeader>
								<CardTitle>Send a Message</CardTitle>
								<CardDescription>
									I&apos;ll get back to you as soon as possible.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form className="grid gap-4">
									<div className="grid gap-2">
										<label htmlFor="name" className="text-sm font-medium">
											Name
										</label>
										<Input id="name" placeholder="Your name" />
									</div>
									<div className="grid gap-2">
										<label htmlFor="email" className="text-sm font-medium">
											Email
										</label>
										<Input id="email" type="email" placeholder="Your email" />
									</div>
									<div className="grid gap-2">
										<label htmlFor="message" className="text-sm font-medium">
											Message
										</label>
										<Textarea
											id="message"
											placeholder="Your message"
											className="min-h-[120px]"
										/>
									</div>
									<Button type="submit" className="w-full">
										Send Message
									</Button>
								</form>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
