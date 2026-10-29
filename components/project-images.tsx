"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// Preserve the original 3 s rotation and 0.5 s Motion cross-fade from before 5a4d84f.
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
	const reducedMotion = useReducedMotion();

	useEffect(() => {
		if (images.length <= 1 || reducedMotion) return;
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
	}, [images.length, startDelay, reducedMotion]);

	if (images.length === 0) return null;
	return (
		<AnimatePresence mode="popLayout">
			<motion.div
				key={current}
				data-motion-reveal
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: reducedMotion ? 0 : 0.5 }}
				className="absolute inset-0"
			>
				<Image
					src={images[current]}
					alt={alt}
					fill
					sizes="(min-width: 768px) 496px, calc(100vw - 2rem)"
					className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
				/>
			</motion.div>
		</AnimatePresence>
	);
}
