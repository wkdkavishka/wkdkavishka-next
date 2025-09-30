// Basic Service Worker for full offline support (inspired by https://github.com/DannyMoerkerke/basic-service-worker)

const SW_VERSION = 1;
const CACHE_NAME = `pwa-cache-v${SW_VERSION}`;

// List of static files to cache
const staticFiles = [
    '/',
    '/index.html',
    '/offline.html',
    '/favicon.ico',
    '/manifest.json',
    '/site.webmanifest',
    '/images/pwa/mobile.png',
    '/images/pwa/desktop.png',
    '/images/pwa/desktop-1.png',
    // Add more static assets as needed
];

// List of routes to cache (for SPA navigation)
const routes = [
    '/',
    '/about',
    '/contact',
    '/projects',
    '/services',
    '/team',
    // Add more routes as needed
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([...staticFiles, ...routes]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request).then((response) => {
            return (
                response ||
                fetch(event.request)
                    .then((res) => {
                        // Optionally cache new GET requests here
                        return res;
                    })
                    .catch(() => caches.match('/offline.html'))
            );
        })
    );
});
