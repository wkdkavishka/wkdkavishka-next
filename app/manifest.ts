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
		theme_color: "#000000", // Dark theme
		icons: [
			{
				src: "/images/meta/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/images/meta/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/images/meta/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
		screenshots: [
			{
				src: "/images/pwa/mobile-1.png",
				sizes: "541x1053",
				type: "image/png",
				form_factor: "narrow",
			},
			{
				src: "/images/pwa/mobile-2.png",
				sizes: "541x1053",
				type: "image/png",
				form_factor: "narrow",
			},
			{
				src: "/images/pwa/mobile-3.png",
				sizes: "541x1053",
				type: "image/png",
				form_factor: "narrow",
			},
			{
				src: "/images/pwa/desktop-1.png",
				sizes: "1883x1060",
				type: "image/png",
				form_factor: "wide",
			},
			{
				src: "/images/pwa/desktop-2.png",
				sizes: "1870x1044",
				type: "image/png",
				form_factor: "wide",
			},
			{
				src: "/images/pwa/desktop-3.png",
				sizes: "1870x1044",
				type: "image/png",
				form_factor: "wide",
			},
		],
		shortcuts: [
			{
				name: "Contact Me",
				short_name: "Contact",
				description: "Get in touch with me",
				url: "/#contact",
				icons: [
					{
						src: "/images/profile/profile.jpg",
						sizes: "96x96",
					},
				],
			},
		],
	};
}
