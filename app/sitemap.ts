import type { MetadataRoute } from "next";
import siteData from "@/data/site-data";

export const dynamic = "force-static";

// Real pages only: "#about"-style links are not separate pages to search engines.
// lastModified comes from the `updated` dates in siteData, not the build time, so it only
// changes when the content does.
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: siteData.siteUrl, lastModified: siteData.updated },
		...siteData.projects.map((project) => ({
			url: `${siteData.siteUrl}/projects/${project.slug}`,
			lastModified: project.updated,
		})),
	];
}
