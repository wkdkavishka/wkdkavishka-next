import { Inter } from 'next/font/google';
import { EmailProvider } from '../contexts/EmailContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import './globals.css';
import { metadata } from './metadata';
import ThreeBackground from '../components/ThreeBackground';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navigation } from '../components/NavigationComp';

export { metadata };

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
                <SpeedInsights />
            </body>
        </html>
    );
}
