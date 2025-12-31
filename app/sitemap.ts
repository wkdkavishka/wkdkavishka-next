import type { MetadataRoute } from "next";
import siteData from "@/data/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	// Main page entry
	const mainPage = {
		url: `${siteData.siteUrl}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 1.0,
	};

	// Section anchors for Google sitelinks
	// While these are hash links, including them helps Google understand site structure
	const sections = ["about", "projects", "services", "contact"].map(
		(section) => ({
			url: `${siteData.siteUrl}#${section}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		}),
	);

	return [mainPage, ...sections];
}
