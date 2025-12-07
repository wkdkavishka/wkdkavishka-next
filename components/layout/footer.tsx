"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { EmailDialog } from "@/components/email-dialog";
import type { PersonalData, SocialLink } from "@/lib/db/zod-schema";

export function Footer({
	personalData,
	socialLinks,
}: {
	personalData: PersonalData;
	socialLinks: SocialLink[];
}) {
	return (
		<footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4 md:px-6">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						Built by{" "}
						<a
							href="/"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							{personalData.name}
						</a>
						. The source code is available on{" "}
						<a
							href={socialLinks.find((l) => l.name === "GitHub")?.url || "#"}
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							GitHub
						</a>
						.
					</p>
				</div>
				<div className="flex items-center gap-4">
					{socialLinks.map((link) => (
						<Link
							key={link.name}
							href={link.url}
							target="_blank"
							rel="noreferrer"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							{/* We don't have dynamic icons easily unless we map them or use a library that renders from string */}
							{/* For now, let's just show the name or use a generic icon if we can't map */}
							<span className="text-sm font-medium">{link.name}</span>
						</Link>
					))}
					<EmailDialog email={personalData.email}>
						<button className="text-muted-foreground hover:text-foreground transition-colors">
							<Mail className="h-5 w-5" />
							<span className="sr-only">Email</span>
						</button>
					</EmailDialog>
				</div>
			</div>
		</footer>
	);
}
