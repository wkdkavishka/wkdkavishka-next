import { Metadata, Viewport } from 'next';
import siteData from '@/data/site-data';

const siteUrl = 'https://wkdkavishka.github.io';
const siteName = siteData.personal.name;
const siteDescription = siteData.personal.title;
const siteKeywords = [
    'Software Engineer',
    'DevOps Engineer',
    'Web Development',
    'Cloud Computing',
    'Full Stack Development',
    'React',
    'Node.js',
    'TypeScript',
    'AWS',
    'Docker',
    'Kubernetes',
    siteData.personal.name,
    ...(siteData.personal.skills || []),
].join(', ');

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    ],
};

export const metadata: Metadata = {
    title: {
        default: siteName,
        template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords: siteKeywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
        email: true,
        address: false,
        telephone: true,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName,
        title: siteName,
        description: siteDescription,
        images: [
            {
                url: '/images/meta/og-image.jpg',
                width: 1200,
                height: 630,
                alt: siteName,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteName,
        description: siteDescription,
        images: [`/images/meta/og-image.jpg`],
        creator:
            siteData.socialLinks.find((s) => s.name.toLowerCase().includes('twitter'))?.url || '',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'dnbg1aDJpyG1SNk4NugqOVp9d0Pa9G-awAm087eCoQg',
        yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
};

export default metadata;
