import withSerwistInit from '@serwist/next';

const nextConfig = {
    output: 'export', // This is crucial for static export
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
