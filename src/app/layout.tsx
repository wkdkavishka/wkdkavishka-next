import { Inter } from 'next/font/google';
import { EmailProvider } from '../contexts/EmailContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import './globals.css';
import { metadata as siteMetadata } from './metadata';
import ThreeBackground from '../components/ThreeBackground';
import { NavigationComp as Navigation } from '../components/NavigationComp';
import { Metadata } from 'next';
import { ClientProviders } from './providers/ClientProviders';

const pwaMetadata = {
    manifest: '/site.webmanifest',
    icons: {
        icon: [
            { url: '/images/meta/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/images/meta/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        ],
        apple: [{ url: '/images/meta/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    other: {
        'msapplication-config': '/browserconfig.xml',
        'msapplication-TileColor': '#000000',
        'msapplication-TileImage': '/images/meta/mstile-144x144.png',
        'theme-color': '#000000',
    },
    openGraph: {
        images: [
            {
                url: '/images/meta/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'WKDKavishka - Personal Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/images/meta/og-image.jpg'],
    },
};

export const metadata: Metadata = {
    ...siteMetadata,
    ...pwaMetadata,
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
                                <div className="sticky top-0 z-50 px-10 pt-2">
                                    <Navigation />
                                </div>
                                <div className="relative z-10">
                                    <main>{children}</main>
                                </div>
                            </div>
                        </EmailProvider>
                    </NotificationProvider>
                </ClientProviders>
            </body>
        </html>
    );
}
