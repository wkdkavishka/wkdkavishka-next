'use client';
import { useEffect, useState } from 'react';
import { registerServiceWorker } from '@/utils/registerServiceWorker';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Only run this on the client side and after the component has mounted
        const registerSW = async () => {
            try {
                await registerServiceWorker();
            } catch (error) {
                console.error('Failed to initialize service worker:', error);
            }
        };

        if (isMounted) {
            registerSW();
        }

        return () => {
            setIsMounted(false);
        };
    }, [isMounted]);

    return <>{children}</>;
}
