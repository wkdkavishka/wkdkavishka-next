import { Inter } from 'next/font/google';
import { EmailProvider } from '../contexts/EmailContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import './globals.css';
import { metadata } from './metadata';
import ThreeBackground from '../components/ThreeBackground';

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
                            <div className="relative z-10">
                                {/* comment */}
                                {children}
                            </div>
                        </div>
                    </EmailProvider>
                </NotificationProvider>
            </body>
        </html>
    );
}
