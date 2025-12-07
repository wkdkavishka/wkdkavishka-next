import type { Metadata, Viewport } from "next";
import siteData from "@/data/site-data";

export const siteUrl = siteData.siteUrl;
export const siteName = siteData.personal.name;
export const siteDescription = siteData.personal.description;
export const siteKeywords = [
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

  siteData.personal.name,
  ...(siteData.personal.skills || []),
].join(", ");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
};

export const siteMetadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName }],
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
  // Apple touch icons
  icons: {
    apple: [
      { url: "/images/meta/apple-touch-icon.png", sizes: "180x180" },
      { url: "/images/meta/android-chrome-192x192.png", sizes: "192x192" },
      { url: "/images/meta/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  // Fallback meta tags (optional, but safe)
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": siteName,
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
      siteData.socialLinks.find((s) => s.name.toLowerCase().includes("twitter"))
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

export default siteMetadata;
