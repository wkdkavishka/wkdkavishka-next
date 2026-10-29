import type { MetadataRoute } from "next";
import siteData from "@/data/site-data";
import { irsSiteUrl, isPreview, isStaticExport } from "@/lib/site-config";

export const dynamic = "force-static";

// Real pages only: "#about"-style links are not separate pages to search engines.
// lastModified comes from the `updated` dates in siteData, not the build time, so it only
// changes when the content does.
export default function sitemap(): MetadataRoute.Sitemap {
	if (isPreview) return [];
	// The mirror's portfolio pages canonicalize to Vercel. Only the independent
	// IRS site remains canonical on Pages; its own sitemap stays untouched.
	if (isStaticExport) return [{ url: irsSiteUrl }];
	return [
		{ url: siteData.siteUrl, lastModified: siteData.updated },
		...siteData.projects.map((project) => ({
			url: `${siteData.siteUrl}/projects/${project.slug}`,
			lastModified: project.updated,
		})),
	];
}
