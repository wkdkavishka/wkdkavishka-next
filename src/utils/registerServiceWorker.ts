export const registerServiceWorker = async () => {
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
