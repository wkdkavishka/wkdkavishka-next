import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { EmailDialog } from "@/components/email-dialog";
import { SectionHeading } from "@/components/section-heading";
import type { PersonalData, SocialLink } from "@/data/site-data";

const cardClassName =
	"reveal group flex h-full min-h-64 w-full flex-col items-center gap-3 rounded-lg border bg-card p-6 text-center text-card-foreground shadow-sm transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

// Spans work inside both a dialog button and links without nested interactive elements.
function ContactCardContent({
	icon,
	title,
	description,
	action,
}: {
	icon: ReactNode;
	title: string;
	description: string;
	action: string;
}) {
	return (
		<>
			{icon}
			<span className="text-lg font-semibold">{title}</span>
			<span className="text-sm leading-relaxed text-muted-foreground">
				{description}
			</span>
			<span className="mt-auto max-w-full pt-2 text-sm font-medium text-primary underline-offset-4 group-hover:underline [overflow-wrap:anywhere]">
				{action}
			</span>
		</>
	);
}

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
			<SectionHeading title="Get in Touch" subtitle="Shall we talk?" />
			<p className="reveal mx-auto mb-10 max-w-175 text-center text-lg text-muted-foreground">
				{personalData.getInTouch}
			</p>

			<div className="grid auto-rows-fr gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
				<EmailDialog email={personalData.email}>
					<button
						type="button"
						className={`${cardClassName} cursor-pointer`}
					>
						<ContactCardContent
							icon={
								<Mail className="mb-1 h-10 w-10 shrink-0 text-primary" aria-hidden="true" />
							}
							title="Email"
							description="Feel free to send me an email."
							action={personalData.email}
						/>
					</button>
				</EmailDialog>

				<a
					href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
						personalData.location,
					)}`}
					target="_blank"
					rel="noopener noreferrer"
					className={cardClassName}
				>
					<ContactCardContent
						icon={
							<MapPin className="mb-1 h-10 w-10 shrink-0 text-primary" aria-hidden="true" />
						}
						title="Location"
						description="Based in"
						action={personalData.location}
					/>
				</a>

				<a href={`tel:${personalData.phone}`} className={cardClassName}>
					<ContactCardContent
						icon={
							<Phone className="mb-1 h-10 w-10 shrink-0 text-primary" aria-hidden="true" />
						}
						title="Phone"
						description="Call me at"
						action={personalData.phone}
					/>
				</a>

				{socialLinks.map((link) => {
					const Icon = link.icon;
					return (
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							key={link.name}
							className={cardClassName}
						>
							<ContactCardContent
								icon={
									<Icon className="mb-1 h-10 w-10 shrink-0 text-primary" aria-hidden="true" />
								}
								title={link.name}
								description={`Connect on ${link.name}`}
								action={link.name === "WhatsApp" ? "Send a message" : "View profile"}
							/>
						</a>
					);
				})}
			</div>
		</section>
	);
}
