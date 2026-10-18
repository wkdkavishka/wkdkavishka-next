"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Cycles a project's screenshots every 3 s with a CSS cross-fade. All images are stacked and only
// their opacity changes, so no animation library is needed.
export function ProjectImages({
	images,
	alt,
	startDelay,
}: {
	images: string[];
	alt: string;
	// Staggers the cards so they don't all change at once
	startDelay: number;
}) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (images.length <= 1) return;
		let interval: ReturnType<typeof setInterval> | undefined;
		const timeout = setTimeout(() => {
			interval = setInterval(() => {
				setCurrent((prev) => (prev + 1) % images.length);
			}, 3000);
		}, startDelay);
		return () => {
			clearTimeout(timeout);
			if (interval) clearInterval(interval);
		};
	}, [images.length, startDelay]);

	return images.map((src, index) => (
		<Image
			key={src}
			src={src}
			// Only the first image is described; the others repeat it
			alt={index === 0 ? alt : ""}
			fill
			className={`object-cover transition-[opacity,scale] duration-700 ease-in-out group-hover:scale-105 ${
				index === current ? "opacity-100" : "opacity-0"
			}`}
		/>
	));
}
