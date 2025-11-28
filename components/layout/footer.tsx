import { Mail } from "lucide-react";
import Link from "next/link";
import siteData from "@/data/site-data";

export function Footer() {
	return (
		<footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4 md:px-6">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						Built by{" "}
						<a
							href="#"
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							WKDKavishka
						</a>
						. The source code is available on{" "}
						<a
							href="#"
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
					{siteData.personal.socialLinks.map((link) => (
						<Link
							key={link.name}
							href={link.url}
							target="_blank"
							rel="noreferrer"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<link.icon className="h-5 w-5" />
							<span className="sr-only">{link.name}</span>
						</Link>
					))}
					<Link
						href={`mailto:${siteData.personal.email}`}
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						<Mail className="h-5 w-5" />
						<span className="sr-only">Email</span>
					</Link>
				</div>
			</div>
		</footer>
	);
}
