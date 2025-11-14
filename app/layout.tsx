import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavigationComp as Navigation } from "@/app/components/NavigationComp";
import ThreeBackground from "@/app/components/ThreeBackground";
import { EmailProvider } from "@/app/contexts/EmailContext";
import { NotificationProvider } from "@/app/contexts/NotificationContext";
import "./globals.css";
import { Footer } from "@/app/components/FooterComp";
import { siteMetadata } from "@/app/data/metadata";
import RegisterSW from "./utils/RegisterSW";

export const metadata: Metadata = {
  ...siteMetadata,
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* add the webmanifest file */}
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Optional: PWA meta tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="WKDKavishka" />
      </head>

      <body className={`${inter.className} min-h-full`}>
        <div id="portal-root"></div>
        <ThreeBackground />
        {/* <ClientProviders> */}
        <NotificationProvider>
          <EmailProvider>
            <div className="relative min-h-screen">
              <div className="sticky top-0 z-50 px-10 pt-2 md:px-20">
                <Navigation />
              </div>
              <div className="px-10 pt-2">
                <div className="relative z-10">{children}</div>
              </div>
              <div className="relative bottom-0 z-50 px-10 pb-2">
                <Footer />
              </div>
            </div>
          </EmailProvider>
        </NotificationProvider>
        {/* </ClientProviders> */}

        {/* REGISTER SERVICE WORKER + TOAST LOGIC */}
        <RegisterSW />
      </body>
    </html>
  );
}
