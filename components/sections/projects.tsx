import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { ProjectImages } from "@/components/project-images";
import { ProjectLinkButton } from "@/components/project-link-button";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/data/site-data";

const FEATURED_PROJECT_COUNT = 4;
const VISIBLE_TAG_COUNT = 4;

function ProjectCard({ project, index }: { project: Project; index: number }) {
	const pageUrl = `/projects/${project.slug}`;

	return (
		<div className="reveal">
			<Card className="h-full flex flex-col overflow-hidden border-muted-foreground/20 hover:border-primary/50 transition-colors">
				{/* Same target as the title link, so it's skipped by keyboard and screen readers */}
				<Link
					href={pageUrl}
					tabIndex={-1}
					aria-hidden="true"
					className="aspect-video bg-muted relative group overflow-hidden block"
				>
					{project.image.length > 0 ? (
						<ProjectImages
							images={project.image}
							alt={`${project.title} screenshot`}
							startDelay={index * 500}
						/>
					) : (
						// Client work has no public screenshots: show the stack instead
						<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center bg-gradient-to-br from-muted to-secondary">
							<span className="text-lg font-semibold">
								{project.tags.slice(0, 3).join(" · ")}
							</span>
							{project.org && (
								<span className="text-sm text-muted-foreground">
									{project.org}
								</span>
							)}
						</div>
					)}
				</Link>
				<CardHeader>
					<CardTitle>
						<Link href={pageUrl} className="hover:underline underline-offset-4">
							{project.title}
						</Link>
					</CardTitle>
					<CardDescription>{project.summary}</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 flex flex-col gap-4">
					<div className="flex flex-wrap gap-2">
						{project.tags.slice(0, VISIBLE_TAG_COUNT).map((tag) => (
							<span
								key={tag}
								className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
							>
								{tag}
							</span>
						))}
						{project.tags.length > VISIBLE_TAG_COUNT && (
							<span className="inline-flex items-center px-2.5 py-0.5 text-xs text-muted-foreground">
								+{project.tags.length - VISIBLE_TAG_COUNT} more
								<span className="sr-only">
									{" "}technologies listed on the project page
								</span>
							</span>
						)}
					</div>
					<div className="flex flex-wrap gap-2 mt-auto">
						<Button size="sm" className="flex-1 gap-2" asChild>
							<Link href={pageUrl}>
								Details <ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						{project.links.slice(0, 1).map((link) => (
							<ProjectLinkButton key={link.url} link={link} />
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export function Projects({ projects }: { projects: Project[] }) {
	const featuredProjects = projects.slice(0, FEATURED_PROJECT_COUNT);
	const moreProjects = projects.slice(FEATURED_PROJECT_COUNT);

	return (
		<section
			id="projects"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6 flex flex-col items-center rounded-xl"
		>
			<div className="reveal flex flex-col items-center gap-4 text-center md:gap-8 mb-16">
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Featured Projects
					</h2>
					<p className="mx-auto max-w-175 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Full-stack web applications, Flutter apps and more.
					</p>
				</div>
			</div>

			<div className="grid w-full max-w-5xl gap-8 md:grid-cols-2">
				{featuredProjects.map((project, index) => (
					<ProjectCard key={project.slug} project={project} index={index} />
				))}
			</div>

			{moreProjects.length > 0 ? (
				// Native disclosure keeps every project in the HTML and works without JavaScript.
				<details className="group/projects mt-10 w-full max-w-5xl">
					<summary className="mx-auto flex w-fit cursor-pointer list-none flex-col items-center gap-4 rounded-md text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
						<span className="text-sm text-muted-foreground">
							<span className="group-open/projects:hidden">
								Showing {featuredProjects.length} of {projects.length} projects
							</span>
							<span className="hidden group-open/projects:inline">
								Showing all {projects.length} projects
							</span>
						</span>
						<span className={buttonVariants({ variant: "outline", size: "lg" })}>
							<span className="group-open/projects:hidden">
								Show {moreProjects.length} more{" "}
								{moreProjects.length === 1 ? "project" : "projects"}
							</span>
							<span className="hidden group-open/projects:inline">
								Show fewer projects
							</span>
							<ChevronDown
								aria-hidden="true"
								className="group-open/projects:rotate-180"
							/>
						</span>
					</summary>
					<div className="mt-10 grid gap-8 md:grid-cols-2">
						{moreProjects.map((project, index) => (
							<ProjectCard
								key={project.slug}
								project={project}
								index={index + featuredProjects.length}
							/>
						))}
					</div>
				</details>
			) : (
				<p className="mt-10 text-sm text-muted-foreground">
					Showing all {projects.length}{" "}
					{projects.length === 1 ? "project" : "projects"}
				</p>
			)}
		</section>
	);
}
