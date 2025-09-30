import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

// Additional static files to precache
const additionalPrecacheEntries: (PrecacheEntry | string)[] = [
    '/',
    '/index.html',
    '/offline.html',
    '/favicon.ico',
    '/manifest',
    '/sitemap.xml',
    '/sitemap-0.xml',
    '/robots.txt',
    '/browserconfig.xml',
    '/next.svg',
    '/vercel.svg',
    '/file.svg',
    '/globe.svg',
    '/window.svg',

    // PWA assets
    '/images/pwa/mobile.png',
    '/images/pwa/desktop.png',
    '/images/pwa/desktop-1.png',

    // Team images
    '/images/team/member-1.webp',
    '/images/team/member-2.webp',
    '/images/team/member-3.webp',
    '/images/team/member-4.webp',

    // Project images - IRS Calculator
    '/images/projects/irs-calculator/1.webp',
    '/images/projects/irs-calculator/2.webp',
    '/images/projects/irs-calculator/3.webp',

    // Project images - WKDKavishka Vue
    '/images/projects/wkdkavishka-vue/1.webp',
    '/images/projects/wkdkavishka-vue/2.webp',
    '/images/projects/wkdkavishka-vue/3.webp',
    '/images/projects/wkdkavishka-vue/4.webp',

    // Profile image
    '/images/profile/profile.webp',
];

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    precacheOptions: {
        cleanupOutdatedCaches: true,
        concurrency: 10,
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
    },
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    disableDevLogs: true,
    runtimeCaching: defaultCache,
    fallbacks: {
        entries: [
            {
                url: '/offline.html',
                matcher({ request }) {
                    return request.destination === 'document';
                },
            },
        ],
    },
});

// Add additional static files to cache on install
serwist.addToPrecacheList(additionalPrecacheEntries);

serwist.addEventListeners();
