"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { type ComponentProps, useEffect, useRef } from "react";
import type { ProjectScreenshot } from "@/components/project-gallery";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";

export default function ProjectLightbox({
	title,
	images,
	index,
	onIndexChange,
	open,
	onOpenChange,
	onCloseAutoFocus,
}: {
	title: string;
	images: ProjectScreenshot[];
	index: number;
	onIndexChange: (index: number) => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCloseAutoFocus: ComponentProps<typeof DialogContent>["onCloseAutoFocus"];
}) {
	const viewportRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}, [index, open]);

	const image = images[index];
	if (!image) return null;

	const previous = () => onIndexChange((index - 1 + images.length) % images.length);
	const next = () => onIndexChange((index + 1) % images.length);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="flex h-[90dvh] max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-6xl motion-reduce:animate-none"
				showCloseButton={false}
				onCloseAutoFocus={onCloseAutoFocus}
				onKeyDown={(event) => {
					if (event.altKey || event.ctrlKey || event.metaKey || images.length < 2) return;
					if (event.key === "ArrowLeft") {
						event.preventDefault();
						previous();
					} else if (event.key === "ArrowRight") {
						event.preventDefault();
						next();
					}
				}}
			>
				<DialogTitle className="sr-only">{title} screenshots</DialogTitle>
				<DialogDescription className="sr-only">
					Scroll to inspect the full image. Use the left and right arrow keys to change
					screenshots, or Escape to close.
				</DialogDescription>
				<div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b p-3 pr-16 sm:p-4 sm:pr-16">
					<p
						className="min-w-0 text-sm font-medium [overflow-wrap:anywhere]"
						aria-live="polite"
						aria-atomic="true"
					>
						{image.caption}
					</p>
					{images.length > 1 && (
						<div className="flex items-center gap-2">
							<Button
								type="button"
								variant="outline"
								size="icon"
								className="size-11"
								aria-label="Previous full-size screenshot"
								onClick={previous}
							>
								<ChevronLeft aria-hidden="true" />
							</Button>
							<span
								className="min-w-12 text-center text-sm tabular-nums text-muted-foreground"
								aria-live="polite"
								aria-atomic="true"
							>
								{index + 1} / {images.length}
							</span>
							<Button
								type="button"
								variant="outline"
								size="icon"
								className="size-11"
								aria-label="Next full-size screenshot"
								onClick={next}
							>
								<ChevronRight aria-hidden="true" />
							</Button>
						</div>
					)}
					<DialogClose asChild>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="absolute top-3 right-3 size-11"
							aria-label="Close full-size screenshot"
						>
							<X aria-hidden="true" />
						</Button>
					</DialogClose>
				</div>
				<div
					ref={viewportRef}
					tabIndex={0}
					role="region"
					aria-label="Full-size screenshot"
					className="min-h-0 flex-1 overflow-auto overscroll-contain p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:p-4"
				>
					{/* Originals keep their intrinsic proportions, including future tall screenshots. */}
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={image.src} alt={image.alt} className="mx-auto block h-auto w-full" />
				</div>
			</DialogContent>
		</Dialog>
	);
}
