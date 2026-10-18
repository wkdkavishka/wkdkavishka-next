import { ExternalLink, Github, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectLink } from "@/data/site-data";

const icons = { demo: ExternalLink, code: Github, package: Package };

// Outbound link of a project (live site, source code, package page)
export function ProjectLinkButton({ link }: { link: ProjectLink }) {
	const Icon = icons[link.type];
	return (
		<Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
			<a href={link.url} target="_blank" rel="noopener noreferrer">
				<Icon className="h-4 w-4" /> {link.label}
			</a>
		</Button>
	);
}
