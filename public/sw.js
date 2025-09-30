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

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            // Try to add all static files, but don't fail if some are missing
            const cachePromises = [
                ...staticFiles.map(url => 
                    cache.add(url).catch(err => 
                        console.warn(`Failed to cache ${url}:`, err)
                    )
                ),
                // Add root URL and routes with network-first strategy
                cache.add('/').catch(err => console.warn('Failed to cache /:', err))
            ];
            
            await Promise.all(cachePromises);
            console.log('Service Worker: Caching complete');
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found
            if (response) {
                return response;
            }
            
            // For navigation requests, try the network first, fall back to offline page
            if (event.request.mode === 'navigate') {
                return fetch(event.request)
                    .then((response) => {
                        // Cache the page if it's a valid response
                        if (response.status === 200) {
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        }
                        return response;
                    })
                    .catch(() => {
                        return caches.match('/offline.html')
                            .then((offlineResponse) => {
                                return offlineResponse || new Response('You are offline and no offline page is available.');
                            });
                    });
            }
            
            // For other requests, try network first, then cache
            return fetch(event.request)
                .then((response) => {
                    // Don't cache error responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Cache the response
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    
                    return response;
                })
                .catch(() => {
                    // If both network and cache fail, show a generic offline response
                    return new Response('You are offline and the requested resource is not available.');
                });
        })
    );
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
