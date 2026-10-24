import { ExternalLink, Github, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectLink } from "@/data/site-data";

const icons = { demo: ExternalLink, code: Github, package: Package };

// Outbound link of a project (live site, source code, package page)
export function ProjectLinkButton({ link }: { link: ProjectLink }) {
	const Icon = icons[link.type];
	return (
		<Button
			variant="outline"
			className="h-auto min-h-11 w-full justify-start whitespace-normal px-4 py-3 text-left [overflow-wrap:anywhere]"
			asChild
		>
			<a href={link.url} target="_blank" rel="noopener noreferrer">
				<Icon className="h-4 w-4" aria-hidden="true" />
				<span>
					{link.label}
					<span className="sr-only"> (opens in a new tab)</span>
				</span>
			</a>
		</Button>
	);
}
