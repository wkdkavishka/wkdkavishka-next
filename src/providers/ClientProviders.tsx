'use client';
import { useEffect } from 'react';
import { registerServiceWorker } from '@/utils/registerServiceWorker';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        registerServiceWorker();
    }, []);
    return <>{children}</>;
}
