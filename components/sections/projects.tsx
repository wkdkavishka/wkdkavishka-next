import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { ProjectImages } from "@/components/project-images";
import { SectionHeading } from "@/components/section-heading";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type Project,
	type ProjectSection,
	projectSections,
} from "@/data/site-data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
	const pageUrl = `/projects/${project.slug}`;

	return (
		<div className="reveal">
			<Card className="h-full overflow-hidden border-muted-foreground/20 hover:border-primary/50 transition-colors">
				<Link
					href={pageUrl}
					aria-labelledby={`project-${project.slug}`}
					className="group flex h-full flex-col rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
				>
					<div className="aspect-video bg-muted relative overflow-hidden">
						{project.image.length > 0 ? (
							<ProjectImages
								images={project.image}
								alt={`${project.title} screenshot`}
								startDelay={index * 500}
							/>
						) : (
							// No fabricated screenshot or confidential client information in the fallback.
							<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
								<Code2
									className="h-12 w-12 text-muted-foreground/50"
									aria-hidden="true"
								/>
							</div>
						)}
					</div>
					<CardHeader>
						<CardTitle
							id={`project-${project.slug}`}
							className="break-words group-hover:underline underline-offset-4"
						>
							{project.title}
						</CardTitle>
						<CardDescription>{project.summary}</CardDescription>
					</CardHeader>
					<CardContent className="mt-auto pt-0">
						<span className="inline-flex min-h-11 items-center gap-2 text-sm font-medium">
							View project <ArrowRight className="h-4 w-4" aria-hidden="true" />
						</span>
					</CardContent>
				</Link>
			</Card>
		</div>
	);
}

export function Projects({
	projects,
	section,
}: {
	projects: Project[];
	section: ProjectSection;
}) {
	const sectionInfo = projectSections[section];
	const sectionProjects = projects.filter((project) => project.section === section);
	if (sectionProjects.length === 0) return null;

	return (
		<section
			id={sectionInfo.id}
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6 flex flex-col items-center rounded-xl"
		>
			<SectionHeading title={sectionInfo.title} subtitle={sectionInfo.subtitle} />

			<div className="grid w-full max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
				{sectionProjects.map((project, index) => (
					<ProjectCard key={project.slug} project={project} index={index} />
				))}
			</div>
		</section>
	);
}
