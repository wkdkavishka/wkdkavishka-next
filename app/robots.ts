import type { MetadataRoute } from "next";
import siteData from "@/data/site-data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${siteData.siteUrl}/sitemap.xml`,
	};
}
