import type { MetadataRoute } from "next";
import siteMetadata from "@/data/metadata";
import siteData from "@/data/site-data";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: siteData.personal.name,
		short_name: siteData.personal.name,
		description: siteMetadata.description || siteData.personal.description,
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#ffffff",
		icons: [
			{
				src: "/images/meta/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/images/meta/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
