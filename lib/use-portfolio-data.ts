"use client";

import { useEffect, useState } from "react";
import {
	type CachedData,
	cleanupBlobURLs,
	createBlobUrls,
	getCachedData,
	preloadImages,
	setCachedData,
} from "@/lib/cache-service";
import type {
	PersonalData,
	Project,
	Service,
	SocialLink,
} from "@/lib/db/zod-schema";

export interface PortfolioData {
	projects: Project[];
	services: Service[];
	personalData: PersonalData | null;
	socialLinks: SocialLink[];
	imageBlobs: Record<string, string>;
}

export function usePortfolioData() {
	const [data, setData] = useState<PortfolioData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;
		let currentImageBlobs: Record<string, string> = {};

		async function loadData() {
			try {
				setLoading(true);

				// Step 1: Check if we have cached data
				const cachedData = await getCachedData();

				if (cachedData?.imageBlobData) {
					// Step 2: Check if cache is still valid
					const response = await fetch("/api/last-modified");
					const { lastModified } = await response.json();

					if (cachedData.lastModified === lastModified) {
						// Cache is valid, use it
						if (isMounted) {
							// Convert stored Blobs to URLs
							currentImageBlobs = createBlobUrls(cachedData.imageBlobData);

							setData({
								projects: cachedData.projects,
								services: cachedData.services,
								personalData: cachedData.personalData,
								socialLinks: cachedData.socialLinks,
								imageBlobs: currentImageBlobs,
							});
							setLoading(false);
						}
						return;
					}

					// Cache is invalid, but we don't need to cleanup blob URLs here
					// because we haven't created them yet from the old cache
				}

				// Step 3: Fetch fresh data
				const [
					projectsRes,
					servicesRes,
					personalDataRes,
					socialLinksRes,
					timestampRes,
				] = await Promise.all([
					fetch("/api/projects"),
					fetch("/api/services"),
					fetch("/api/personal-data"),
					fetch("/api/social-links"),
					fetch("/api/last-modified"),
				]);

				const projects = (await projectsRes.json()) as Project[];
				const services = (await servicesRes.json()) as Service[];
				const personalData =
					(await personalDataRes.json()) as PersonalData | null;
				const socialLinks = (await socialLinksRes.json()) as SocialLink[];
				const { lastModified } = await timestampRes.json();

				// Step 4: Collect all image URLs
				const allImageUrls: string[] = [];

				// Project images
				projects.forEach((project) => {
					project.image.forEach((url) => allImageUrls.push(url));
				});

				// Profile image
				if (personalData?.profileImage) {
					allImageUrls.push(personalData.profileImage);
				}

				// Step 5: Preload images and get blob objects
				const imageBlobData = await preloadImages([...new Set(allImageUrls)]);

				// Step 6: Cache everything (storing Blobs)
				const newCachedData: CachedData = {
					lastModified,
					projects,
					services,
					personalData,
					socialLinks,
					imageBlobData,
				};

				await setCachedData(newCachedData);

				// Step 7: Update state (converting to URLs)
				if (isMounted) {
					currentImageBlobs = createBlobUrls(imageBlobData);

					setData({
						projects,
						services,
						personalData,
						socialLinks,
						imageBlobs: currentImageBlobs,
					});
					setLoading(false);
				}
			} catch (err) {
				console.error("Failed to load portfolio data:", err);
				if (isMounted) {
					setError(err instanceof Error ? err.message : "Failed to load data");
					setLoading(false);
				}
			}
		}

		loadData();

		return () => {
			isMounted = false;
			// Cleanup blob URLs on unmount
			if (Object.keys(currentImageBlobs).length > 0) {
				cleanupBlobURLs(currentImageBlobs);
			}
		};
	}, []);

	return { data, loading, error };
}
