export const registerServiceWorker = async () => {
    // Only register service worker in production to avoid caching issues and because Next.js does not serve sw.js in dev mode.
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            return registration;
        } catch (error) {
            console.error('ServiceWorker registration failed: ', error);
            return null;
        }
    }
    return null;
};
