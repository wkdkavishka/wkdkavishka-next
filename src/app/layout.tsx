import { Inter } from 'next/font/google';
import './globals.css';
import { metadata } from './metadata';
import { NotificationProvider } from '../contexts/NotificationContext';

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
                <NotificationProvider>
                    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
                </NotificationProvider>
            </body>
        </html>
    );
}
