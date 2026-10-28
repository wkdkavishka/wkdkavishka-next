"use client";

import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/site-data";
import { cn } from "@/lib/utils";

// Keep the dialog out of the first download, like the interaction-loaded email form.
const ProjectLightbox = dynamic(() => import("@/components/project-lightbox"), {
	ssr: false,
});

export interface ProjectScreenshot {
	src: string;
	alt: string;
	caption: string;
}

export function ProjectGallery({
	title,
	images,
	imageDetails,
}: {
	title: string;
	images: string[];
	imageDetails?: Project["imageDetails"];
}) {
	const galleryId = useId();
	const galleryRef = useRef<HTMLUListElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [viewerLoaded, setViewerLoaded] = useState(false);
	const [viewerOpen, setViewerOpen] = useState(false);
	const screenshots: ProjectScreenshot[] = images.map((src, index) => ({
		src,
		alt: imageDetails?.[src]?.alt ?? `${title} screenshot ${index + 1}`,
		caption: imageDetails?.[src]?.caption ?? `Screenshot ${index + 1}`,
	}));
	const loadViewer = () => setViewerLoaded(true);

	function scrollToScreenshot(index: number) {
		const gallery = galleryRef.current;
		const first = gallery?.firstElementChild as HTMLElement | null;
		const target = gallery?.children[index] as HTMLElement | undefined;
		if (!gallery || !first || !target) return;
		gallery.scrollTo({
			left: target.offsetLeft - first.offsetLeft,
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
				? "instant"
				: "smooth",
		});
	}

	if (screenshots.length === 0) return null;

	return (
		<section aria-labelledby="screenshots-heading" className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<h2 id="screenshots-heading" className="text-2xl font-bold tracking-tight">
					Screenshots
				</h2>
				{screenshots.length > 1 && (
					<div className="flex items-center gap-2">
						<Button
							type="button"
							variant="outline"
							size="icon"
							className="size-11"
							aria-label="Previous screenshot"
							aria-controls={galleryId}
							disabled={currentIndex === 0}
							onClick={() => scrollToScreenshot(currentIndex - 1)}
						>
							<ChevronLeft aria-hidden="true" />
						</Button>
						<span
							className="min-w-12 text-center text-sm tabular-nums text-muted-foreground"
							aria-live="polite"
							aria-atomic="true"
						>
							{currentIndex + 1} / {screenshots.length}
						</span>
						<Button
							type="button"
							variant="outline"
							size="icon"
							className="size-11"
							aria-label="Next screenshot"
							aria-controls={galleryId}
							disabled={currentIndex === screenshots.length - 1}
							onClick={() => scrollToScreenshot(currentIndex + 1)}
						>
							<ChevronRight aria-hidden="true" />
						</Button>
					</div>
				)}
			</div>
			<ul
				id={galleryId}
				ref={galleryRef}
				aria-label={`${title} screenshots`}
				tabIndex={0}
				className="relative -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain p-1 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				onScroll={(event) => {
					const gallery = event.currentTarget;
					const first = gallery.firstElementChild as HTMLElement | null;
					if (!first) return;
					let nearestIndex = 0;
					let nearestDistance = Infinity;
					Array.from(gallery.children).forEach((child, index) => {
						const distance = Math.abs(
							(child as HTMLElement).offsetLeft - first.offsetLeft - gallery.scrollLeft,
						);
						if (distance < nearestDistance) {
							nearestIndex = index;
							nearestDistance = distance;
						}
					});
					setCurrentIndex(nearestIndex);
				}}
			>
				{screenshots.map((screenshot, index) => (
					<li
						key={screenshot.src}
						className={cn(
							"shrink-0 snap-start",
							screenshots.length === 1 ? "w-full" : "w-[88%] sm:w-[78%]",
						)}
					>
						<figure>
							<button
								type="button"
								aria-label={`View ${screenshot.alt} full size`}
								aria-haspopup="dialog"
								aria-expanded={viewerOpen && selectedIndex === index}
								className="group block w-full cursor-zoom-in rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								onPointerEnter={loadViewer}
								onTouchStart={loadViewer}
								onFocus={loadViewer}
								onClick={(event) => {
									triggerRef.current = event.currentTarget;
									loadViewer();
									setSelectedIndex(index);
									setViewerOpen(true);
								}}
							>
								<span className="relative block aspect-4/3 overflow-hidden rounded-lg border bg-muted">
									<Image
										src={screenshot.src}
										alt={screenshot.alt}
										fill
										sizes="(min-width: 1024px) 560px, (min-width: 640px) 75vw, 88vw"
										className="object-contain"
									/>
									<span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-md border bg-background/90 px-2 py-1 text-sm group-hover:underline underline-offset-4">
										<Expand className="size-4" aria-hidden="true" /> Full size
									</span>
								</span>
							</button>
							<figcaption className="mt-2 text-sm text-muted-foreground [overflow-wrap:anywhere]">
								{screenshot.caption}
							</figcaption>
						</figure>
					</li>
				))}
			</ul>
			{viewerLoaded && (
				<ProjectLightbox
					title={title}
					images={screenshots}
					index={selectedIndex}
					onIndexChange={setSelectedIndex}
					open={viewerOpen}
					onOpenChange={setViewerOpen}
					onCloseAutoFocus={(event) => {
						event.preventDefault();
						triggerRef.current?.focus({ preventScroll: true });
					}}
				/>
			)}
		</section>
	);
}
