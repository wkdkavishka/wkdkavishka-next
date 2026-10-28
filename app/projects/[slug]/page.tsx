import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectLinkButton } from "@/components/project-link-button";
import { ogImagePath, pageMetadata } from "@/data/metadata";
import siteData, { projectSections } from "@/data/site-data";
import { projectJsonLd } from "@/data/structured-data";
import { cn } from "@/lib/utils";

// Static export: every project page is built ahead of time, unknown slugs are 404s
export const dynamicParams = false;

export function generateStaticParams() {
	return siteData.projects.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
	return siteData.projects.find((project) => project.slug === slug);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const project = findProject((await params).slug);
	if (!project) return {};
	return pageMetadata({
		title: project.seoTitle ?? project.title,
		description: project.summary,
		path: `/projects/${project.slug}`,
		image: ogImagePath(project.slug),
	});
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const project = findProject((await params).slug);
	if (!project) notFound();

	const section = projectSections[project.section];
	const facts = [
		{ label: "Company / organisation", value: project.org },
		{ label: "Engagement", value: project.engagement },
		{
			label: "My role",
			value:
				project.role ?? (project.contributionType === "solo" ? "Solo developer" : undefined),
		},
		{ label: "Year", value: project.years },
	].filter((fact) => fact.value);
	const hasDetails = facts.length > 0 || project.links.length > 0;

	return (
		<div className="flex min-h-screen flex-col">
			<JsonLd data={projectJsonLd(project)} />
			<Header name={siteData.personal.name} projectSection={project.section} />
			<main className="flex-1 container mx-auto max-w-280 px-4 md:px-6 pt-28 pb-24">
				<Link
					href={`/#${section.id}`}
					className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to {section.title}
				</Link>

				<article className="mt-8 space-y-10 sm:space-y-12">
					<header className="max-w-3xl space-y-4">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl [overflow-wrap:anywhere]">
							{project.title}
						</h1>
						<p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
							{project.summary}
						</p>
						<p className="text-sm">
							By{" "}
							<Link href="/" className="font-medium underline underline-offset-4">
								{siteData.personal.name}
							</Link>
						</p>
					</header>
					<div
						className={cn(
							"grid gap-10 lg:gap-12",
							hasDetails && "lg:grid-cols-[minmax(0,1fr)_17.5rem]",
						)}
					>
						{hasDetails && (
							<aside
								aria-labelledby="project-details-heading"
								className="self-start rounded-xl border bg-card p-6 text-card-foreground lg:col-start-2 lg:row-start-1"
							>
								<h2 id="project-details-heading" className="text-lg font-semibold">
									Project details
								</h2>
								{facts.length > 0 && (
									<dl className="mt-6 space-y-5">
										{facts.map((fact) => (
											<div key={fact.label} className="space-y-1">
												<dt className="text-sm text-muted-foreground">
													{fact.label}
												</dt>
												<dd className="text-sm font-medium [overflow-wrap:anywhere]">
													{fact.value}
												</dd>
											</div>
										))}
									</dl>
								)}
								{project.links.length > 0 && (
									<div className="mt-6 flex flex-col gap-3 border-t pt-6">
										{project.links.map((link) => (
											<ProjectLinkButton key={link.url} link={link} />
										))}
									</div>
								)}
							</aside>
						)}
						<div className="min-w-0 space-y-10 sm:space-y-12 lg:col-start-1 lg:row-start-1">
							<section aria-labelledby="about-project-heading" className="space-y-4">
								<h2 id="about-project-heading" className="text-2xl font-bold tracking-tight">
									About the project
								</h2>
								<p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
									{project.description}
								</p>
							</section>
							<ProjectGallery
								key={project.slug}
								title={project.title}
								images={project.image}
								imageDetails={project.imageDetails}
							/>
							{project.highlights.length > 0 && (
								<section aria-labelledby="contribution-heading" className="space-y-4">
									<h2 id="contribution-heading" className="text-2xl font-bold tracking-tight">
										{project.contributionType === "solo"
											? "Project highlights"
											: "My contributions"}
									</h2>
									<ul className="list-disc pl-5 flex flex-col gap-3 leading-relaxed text-muted-foreground">
										{project.highlights.map((highlight) => (
											<li key={highlight}>{highlight}</li>
										))}
									</ul>
								</section>
							)}

							{project.tags.length > 0 && (
								<section aria-labelledby="technologies-heading" className="space-y-4">
									<h2 id="technologies-heading" className="text-2xl font-bold tracking-tight">
										Technologies
									</h2>
									<ul className="flex flex-wrap gap-2">
										{project.tags.map((tag) => (
											<li
												key={tag}
												className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground [overflow-wrap:anywhere]"
											>
												{tag}
											</li>
										))}
									</ul>
								</section>
							)}
						</div>
					</div>
				</article>
			</main>
			<Footer />
		</div>
	);
}
