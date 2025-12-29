import type { MetadataRoute } from "next";
import siteData from "@/data/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = [
		"",
		// "/projects", // Add other routes here as they become available
		// "/blog",
	].map((route) => ({
		url: `${siteData.siteUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 1,
	}));

	return [...routes];
}
