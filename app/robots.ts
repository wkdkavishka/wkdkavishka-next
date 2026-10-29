import type { MetadataRoute } from "next";
import siteData from "@/data/site-data";
import { githubOrigin, irsSiteUrl, isPreview, isStaticExport } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	if (isPreview) return { rules: { userAgent: "*", disallow: "/" } };
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: [
			`${siteData.siteUrl}/sitemap.xml`,
			// robots.txt is root-only. The independent IRS tool is still on Pages.
			...(isStaticExport ? [
				`${githubOrigin}/sitemap.xml`,
				`${irsSiteUrl}sitemap.xml`,
			] : []),
		],
	};
}
