import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export', // This is crucial for static export
    images: {
        unoptimized: true, // Required for static export
    },
    distDir: 'dist',
    // Add custom headers for caching
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=604800, immutable',
                    },
                ],
            },
            {
                // Match all static files
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=604800, immutable',
                    },
                ],
            },
            {
                // Match CSS and JS files
                source: '/(.*).(js|css|woff2)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=604800, immutable',
                    },
                ],
            },
            {
                // Match image files
                source: '/(.*).(jpg|jpeg|png|webp|gif|ico|svg)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=604800, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
