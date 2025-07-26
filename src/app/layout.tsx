import { Inter } from 'next/font/google';
import './globals.css';
import { metadata } from './metadata';
import { NotificationProvider } from '../contexts/NotificationContext';
import { EmailProvider } from '../contexts/EmailContext';

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
                <NotificationProvider>
                    <EmailProvider>
                        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
                    </EmailProvider>
                </NotificationProvider>
            </body>
        </html>
    );
}
