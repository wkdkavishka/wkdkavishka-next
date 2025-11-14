import type { MetadataRoute } from "next";
import siteData from "@/app/data/site-data";

// This is needed for static export
// This tells Next.js to treat this route as static
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${siteData.siteUrl}/sitemap.xml`,
  };
}
