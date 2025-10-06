import withSerwistInit from '@serwist/next';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    output: 'export', // This is crucial for static export
    outputFileTracingRoot: __dirname, // Explicitly set the root directory
    images: {
        unoptimized: true, // Required for static export
    },
    distDir: 'dist',
};

const withSerwist = withSerwistInit({
    // use something else that works, such as "service-worker/index.ts".
    swSrc: 'src/app/sw.ts',
    swDest: 'dist/sw.js',
    cacheOnNavigation: true,
    reloadOnOnline: true,
    disable: process.env.NODE_ENV === 'development', // Optional: disable in dev
});

export default withSerwist(nextConfig);
