import { Inter } from 'next/font/google';
import './globals.css';
import { metadata } from './metadata';

export { metadata };

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
                    children,
}: Readonly<{
                    children: React.ReactNode;
}>) {
                    return (
                                        <html lang="en" className="h-full" suppressHydrationWarning>
                                                            <body
                                                                                className={`${inter.className} min-h-full bg-gray-900 text-white`}
                                                            >
                                                                                {children}
                                                            </body>
                                        </html>
                    );
}
