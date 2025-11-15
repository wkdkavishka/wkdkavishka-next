import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavigationComp as Navigation } from "@/components/NavigationComp";
import ThreeBackground from "@/components/ThreeBackground";
import { EmailProvider } from "@/contexts/EmailContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import "./globals.css";
import { Footer } from "@/components/FooterComp";
import { siteMetadata } from "@/data/metadata";
import RegisterSW from "@/utils/RegisterSW";

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
        <link rel="manifest" href="/manifest.webmanifest" />
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
        <div id="mobile-navigation-root"></div>
        <ThreeBackground />

        <NotificationProvider>
          <EmailProvider>
            {/* Full-screen flex container: content + fixed nav */}
            <div className="flex flex-col min-h-screen md:block">
              {/* Desktop Navigation */}
              <div className="sticky top-0 z-50 hidden px-10 pt-2 md:block md:px-20">
                <Navigation isMobile={false} />
              </div>
              {/* Mobile Navigation — fixed at absolute bottom, always visible */}
              <div className="fixed bottom-0 left-0 right-0 z-50 block border-t border-gray-100 bg-white shadow-lg md:hidden">
                <Navigation isMobile={true} />
              </div>
              {/* Scrollable Content Area (includes footer) */}
              <main className="flex-1 overflow-y-auto px-10 pt-2 pb-20 md:pb-2">
                <div className="relative z-10">{children}</div>
              </main>
              {/* Footer with extra padding on mobile */}
              <div className="relative bottom-0 z-40 px-10 pb-20 md:pb-2">
                <Footer />
              </div>
            </div>
          </EmailProvider>
        </NotificationProvider>

        <RegisterSW />
      </body>
    </html>
  );
}
