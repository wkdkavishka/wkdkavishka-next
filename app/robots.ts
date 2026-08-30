import type { MetadataRoute } from "next";
import siteData from "@/data/site-data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		// robots.txt is per-origin and root-only, so every GitHub Pages project site
		// under this domain must declare its sitemap here to be discoverable.
		sitemap: [
			`${siteData.siteUrl}/sitemap.xml`,
			`${siteData.siteUrl}/IRS-Calculate_Inner_restlessnes_score/sitemap.xml`,
		],
	};
}
