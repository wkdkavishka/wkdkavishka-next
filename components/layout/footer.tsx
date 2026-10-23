import { Mail } from "lucide-react";
import Link from "next/link";
import { EmailDialog } from "@/components/email-dialog";
import siteData from "@/data/site-data";

// Reads siteData itself rather than taking props: server pages can't pass the icon components
// in socialLinks to a client component.
export function Footer() {
	const { personal: personalData, socialLinks } = siteData;
	const personalLinks = socialLinks.filter((link) =>
		link.placements.includes("footer"),
	);
	return (
		<footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:min-h-24 md:flex-row md:py-6 px-4 md:px-6">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						Built by{" "}
						<Link
							href="/"
							className="font-medium underline underline-offset-4"
						>
							{personalData.name}
						</Link>
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
				<div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
					<nav
						aria-label="Personal socials"
						className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
					>
						<span className="text-sm text-muted-foreground">Personal socials</span>
						{personalLinks.map((link) => (
							<Link
								key={link.name}
								href={link.url}
								target="_blank"
								rel="noreferrer"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								<span className="text-sm font-medium">{link.name}</span>
							</Link>
						))}
					</nav>
					<EmailDialog email={personalData.email}>
						<button
							type="button"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<Mail className="h-5 w-5" />
							<span className="sr-only">Email</span>
						</button>
					</EmailDialog>
				</div>
			</div>
		</footer>
	);
}
