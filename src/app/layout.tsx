import { ClientProviders } from '@/providers/ClientProviders';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavigationComp as Navigation } from '../components/NavigationComp';
import ThreeBackground from '../components/ThreeBackground';
import { EmailProvider } from '../contexts/EmailContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import './globals.css';
import { siteMetadata } from '../data/metadata';
import { Footer } from '@/components/FooterComp';

export const metadata: Metadata = {
    ...siteMetadata,
    manifest: '/manifest.json',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full" suppressHydrationWarning>
            <body className={`${inter.className} min-h-full`}>
                <div id="portal-root"></div>
                <ThreeBackground />
                <ClientProviders>
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
                </ClientProviders>
            </body>
        </html>
    );
}
