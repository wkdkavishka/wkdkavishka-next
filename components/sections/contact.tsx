import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { EmailDialog } from "@/components/email-dialog";
import { Button } from "@/components/ui/button";

import type { PersonalData, SocialLink } from "@/data/site-data";

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
			<div className="reveal flex flex-col items-center gap-4 text-center md:gap-8 mb-16">
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Get in Touch
					</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						{personalData.getInTouch}
					</p>
				</div>
			</div>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
				<EmailDialog email={personalData.email}>
					{/* A real button so the dialog opens from the keyboard too; spans because a button can't hold a heading */}
					<button
						type="button"
						className="reveal flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors cursor-pointer"
					>
						<Mail className="h-10 w-10 text-primary mb-2" />
						<span className="font-semibold text-lg">Email</span>
						<span className="text-sm text-muted-foreground mb-4">
							Feel free to send me an email.
						</span>
						<Button variant="link" asChild>
							<span>{personalData.email}</span>
						</Button>
					</button>
				</EmailDialog>

				<Link
					href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
						personalData.location,
					)}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className="reveal flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
						<MapPin className="h-10 w-10 text-primary mb-2" />
						<h3 className="font-semibold text-lg">Location</h3>
						<p className="text-sm text-muted-foreground mb-4">Based in</p>
						<span className="text-sm font-medium">{personalData.location}</span>
					</div>
				</Link>

				<Link href={`tel:${personalData.phone}`}>
					<div className="reveal flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
						<Phone className="h-10 w-10 text-primary mb-2" />
						<h3 className="font-semibold text-lg">Phone</h3>
						<p className="text-sm text-muted-foreground mb-4">Call me at</p>
						<Button variant="link" asChild>
							<span>{personalData.phone}</span>
						</Button>
					</div>
				</Link>

				{socialLinks.map((link) => {
					const Icon = link.icon;
					return (
						<Link
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							key={link.name}
						>
							<div className="reveal flex flex-col items-center gap-2 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
								<Icon className="h-10 w-10 text-primary mb-2" />
								<h3 className="font-semibold text-lg">{link.name}</h3>
								<p className="text-sm text-muted-foreground mb-4">
									Connect on {link.name}
								</p>
								<Button variant="link" asChild>
									<span>View Profile</span>
								</Button>
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
