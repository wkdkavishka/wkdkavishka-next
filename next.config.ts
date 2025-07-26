import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export', // This is crucial for static export
    images: {
        unoptimized: true, // Required for static export
    },
    // Optional: If your project page is at a subdirectory (e.g., username.github.io/my-project)
    // basePath: '/your-repo-name',
    // assetPrefix: '/your-repo-name/',
    // For user/organization pages (username.github.io), you typically don't need basePath/assetPrefix
};

export default nextConfig;
