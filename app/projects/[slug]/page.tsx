import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProjectLinkButton } from "@/components/project-link-button";
import { ogImagePath, pageMetadata } from "@/data/metadata";
import siteData from "@/data/site-data";
import { projectJsonLd } from "@/data/structured-data";

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

	const meta = [project.org, project.years].filter(Boolean).join(" · ");

	return (
		<div className="flex min-h-screen flex-col">
			<JsonLd data={projectJsonLd(project)} />
			<Header name={siteData.personal.name} />
			<main className="flex-1 container mx-auto max-w-4xl px-4 md:px-6 pt-28 pb-24">
				<Link
					href="/#projects"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
				>
					<ArrowLeft className="h-4 w-4" /> All projects
				</Link>

				<article className="mt-8 flex flex-col gap-8">
					<header className="flex flex-col gap-4">
						<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
							{project.title}
						</h1>
						{meta && <p className="text-muted-foreground">{meta}</p>}
						<p className="text-lg text-muted-foreground">
							{project.description}
						</p>
						<p className="text-sm">
							By{" "}
							<Link href="/" className="font-medium underline underline-offset-4">
								{siteData.personal.name}
							</Link>
							, {siteData.personal.headline}
						</p>
					</header>

					{project.image.length > 0 && (
						<div className="grid gap-4 sm:grid-cols-2">
							{project.image.map((src, index) => (
								<div
									key={src}
									className="relative aspect-video overflow-hidden rounded-lg border bg-muted"
								>
									<Image
										src={src}
										alt={`${project.title} screenshot ${index + 1}`}
										fill
										className="object-cover"
									/>
								</div>
							))}
						</div>
					)}

					<section className="flex flex-col gap-4">
						<h2 className="text-2xl font-bold tracking-tight">What I built</h2>
						<ul className="list-disc pl-6 flex flex-col gap-2 text-muted-foreground">
							{project.highlights.map((highlight) => (
								<li key={highlight}>{highlight}</li>
							))}
						</ul>
					</section>

					<section className="flex flex-col gap-4">
						<h2 className="text-2xl font-bold tracking-tight">Tech</h2>
						<ul className="flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<li
									key={tag}
									className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground"
								>
									{tag}
								</li>
							))}
						</ul>
					</section>

					{project.links.length > 0 && (
						<div className="flex flex-wrap gap-2 max-w-md">
							{project.links.map((link) => (
								<ProjectLinkButton key={link.url} link={link} />
							))}
						</div>
					)}
				</article>
			</main>
			<Footer />
		</div>
	);
}
