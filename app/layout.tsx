import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { getPersonalData, getSocialLinks } from "@/lib/actions";
import type { Metadata, Viewport } from "next";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
};

export async function generateMetadata(): Promise<Metadata> {
	const personalData = await getPersonalData();
	const socialLinks = await getSocialLinks();

	const siteName = personalData?.name || "Portfolio";
	const siteDescription = personalData?.description || "Personal Portfolio";
	const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

	const keywords = [
		"Dumindu Kavishka",
		"Dumindu",
		"Kavishka",
		"wkdkavishka",
		"Portfolio",
		"Resume",
		"Software Engineer",
		"DevOps Engineer",
		"Web Development",
		"Cloud Computing",
		"Full Stack Development",
		siteName,
		...(personalData?.skills || []),
	].join(", ");

	return {
		title: {
			default: siteName,
			template: `%s | ${siteName}`,
		},
		description: siteDescription,
		keywords: keywords,
		authors: [{ name: siteName }],
		creator: siteName,
		publisher: siteName,
		metadataBase: new URL(siteUrl),
		alternates: {
			canonical: "/",
		},
		appleWebApp: {
			capable: true,
			statusBarStyle: "black-translucent",
			title: siteName,
			startupImage: personalData?.profileImage ? [personalData.profileImage] : [],
		},
		icons: {
			apple: [
				{ url: "/images/meta/apple-touch-icon.png", sizes: "180x180" },
				{ url: "/images/meta/android-chrome-192x192.png", sizes: "192x192" },
				{ url: "/images/meta/android-chrome-512x512.png", sizes: "512x512" },
			],
		},
		openGraph: {
			type: "website",
			locale: "en_US",
			url: siteUrl,
			siteName,
			title: siteName,
			description: siteDescription,
			images: [
				{
					url: "/images/meta/og-image.jpg",
					width: 1200,
					height: 630,
					alt: siteName,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: siteName,
			description: siteDescription,
			images: [`/images/meta/og-image.jpg`],
			creator:
				socialLinks.find((s) => s.name.toLowerCase().includes("twitter"))
					?.url || "",
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
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
