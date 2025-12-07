import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import siteMetadata, { viewport as siteViewport } from "@/data/metadata";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

export const viewport = siteViewport;
export const metadata = siteMetadata;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
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
	);
}
