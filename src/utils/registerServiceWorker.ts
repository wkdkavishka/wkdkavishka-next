export const registerServiceWorker = async () => {
    // Only register service worker in production to avoid caching issues and because Next.js does not serve sw.js in dev mode.
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
        console.log('ServiceWorker registration skipped (not in production)');
        return null;
    }

    if (!('serviceWorker' in navigator)) {
        console.warn('Service workers are not supported in this browser');
        return null;
    }

    try {
        // Wait for the page to be fully loaded
        if (document.readyState !== 'complete') {
            await new Promise((resolve) => window.addEventListener('load', resolve));
        }

        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            type: 'module',
        });

        if (registration.installing) {
            console.log('ServiceWorker installing');
        } else if (registration.waiting) {
            console.log('ServiceWorker installed');
        } else if (registration.active) {
            console.log('ServiceWorker active');
        }

        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        return registration;
    } catch (error) {
        console.error('ServiceWorker registration failed: ', error);
        return null;
    }
};
