import type { Metadata, Viewport } from "next";
import siteData from "@/data/site-data";

export const siteUrl = siteData.siteUrl;
export const siteName = siteData.personal.name;
export const siteDescription = siteData.personal.description;
export const siteTitle = `${siteName} — ${siteData.personal.headline} in Sri Lanka`;
export const twitterHandle = "@wkdkavishka";
export const siteKeywords = [
	siteName,
	...siteData.personal.alternateNames,
	siteData.personal.headline,
	"Software engineer Sri Lanka",
	"Full-stack web developer Sri Lanka",
	"Web application development",
	"Flutter developer Sri Lanka",
	"Flutter mobile app development",
	"React developer",
	"Next.js",
	"Spring Boot",
	"PostgreSQL",
	"Android developer Sri Lanka",
	"Kotlin developer",
	"Android kiosk mode",
	"Android Enterprise",
	"POS payment terminal apps",
	"Colombo",
].join(", ");

// Share image route: app/og/[file]/route.tsx. Named *.png so GitHub Pages serves it as an image.
export const ogImagePath = (slug: string) => `/og/${slug}.png`;

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
};

export const siteMetadata: Metadata = {
	title: {
		default: siteTitle,
		template: `%s | ${siteName}`,
	},
	description: siteDescription,
	keywords: siteKeywords,
	authors: [{ name: siteName, url: siteUrl }],
	creator: siteName,
	publisher: siteName,
	formatDetection: {
		email: true,
		address: false,
		telephone: true,
	},
	metadataBase: new URL(siteUrl),
	alternates: {
		canonical: "/",
	},

	// iOS PWA SUPPORT (CORRECT API)
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent", // or "default"
		title: siteName,
		startupImage: [siteData.personal.profileImage],
	},
	// Apple touch icon: iOS only uses 180x180; listing the bigger Android icons here made browsers
	// download them on every page
	icons: {
		apple: [{ url: "/images/meta/apple-touch-icon.png", sizes: "180x180" }],
	},
	// Fallback meta tags (optional, but safe)
	other: {
		"apple-mobile-web-app-capable": "yes",
		"apple-mobile-web-app-status-bar-style": "black-translucent",
		"apple-mobile-web-app-title": siteName,
	},

	openGraph: {
		type: "profile",
		locale: "en_US",
		url: siteUrl,
		siteName,
		title: siteTitle,
		description: siteDescription,
		images: [
			{
				url: ogImagePath("home"),
				width: 1200,
				height: 630,
				alt: `${siteName}, ${siteData.personal.headline}`,
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: siteTitle,
		description: siteDescription,
		images: [ogImagePath("home")],
		site: twitterHandle,
		creator: twitterHandle,
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	verification: {
		google: process.env.GOOGLE as string,
	},
};

// Metadata for a page below the home page. Child metadata replaces the layout's openGraph and
// twitter objects whole rather than merging them, and inherits its canonical "/" — so every page
// sets all three here.
export function pageMetadata({
	title,
	description,
	path,
	image,
}: {
	title: string;
	description: string;
	path: string;
	image: string;
}): Metadata {
	const images = [{ url: image, width: 1200, height: 630, alt: title }];
	return {
		title,
		description,
		alternates: { canonical: path },
		openGraph: {
			type: "website",
			locale: "en_US",
			url: path,
			siteName,
			title,
			description,
			images,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [image],
			site: twitterHandle,
			creator: twitterHandle,
		},
	};
}

export default siteMetadata;
