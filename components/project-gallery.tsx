import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/site-data";
import { cn } from "@/lib/utils";

export function ProjectGallery({ project }: { project: Project }) {
	if (project.image.length === 0) return null;

	return (
		<section aria-labelledby="screenshots-heading" className="space-y-6">
			<h2 id="screenshots-heading" className="text-2xl font-bold tracking-tight">
				Screenshots
			</h2>
			<div className="grid gap-6 sm:grid-cols-2">
				{project.image.map((src, index) => {
					const details = project.imageDetails?.[src];
					const alt = details?.alt ?? `${project.title} screenshot ${index + 1}`;
					return (
						<a
							key={src}
							href={src}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Open ${alt} full size (opens in a new tab)`}
							className={cn(
								"group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4",
								index === 0 && "sm:col-span-2",
							)}
						>
							<figure>
								<div
									className={cn(
										"relative overflow-hidden rounded-lg border bg-muted",
										index === 0 ? "aspect-4/3 sm:aspect-video" : "aspect-square",
									)}
								>
									<Image
										src={src}
										alt={alt}
										fill
										sizes={
											index === 0
												? "(min-width: 1024px) 744px, calc(100vw - 2rem)"
												: "(min-width: 1024px) 360px, (min-width: 640px) 50vw, calc(100vw - 2rem)"
										}
										className="object-contain"
									/>
								</div>
								<figcaption className="mt-2 flex items-start justify-between gap-3 text-sm text-muted-foreground">
									<span className="[overflow-wrap:anywhere]">
										{details?.caption ?? `Screenshot ${index + 1}`}
									</span>
									<span className="inline-flex shrink-0 items-center gap-1 group-hover:underline underline-offset-4">
										Full size <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
									</span>
								</figcaption>
							</figure>
						</a>
					);
				})}
			</div>
		</section>
	);
}
