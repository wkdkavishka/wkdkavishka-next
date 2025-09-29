import { useState, useEffect } from 'react';

// Define the BeforeInstallPromptEvent type since it's not included in the standard TypeScript types
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

export function usePWAInstallPrompt() {
    // Store the install prompt event for later use
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    // Track whether the PWA is installable
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Store the event for later use
            setDeferredPrompt(e);
            // Update the installable state
            setIsInstallable(true);
        };

        // Check if the app is already installed
        const handleAppInstalled = () => {
            setIsInstallable(false);
            setDeferredPrompt(null);
        };

        // Add event listeners
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        // Clean up event listeners
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const promptToInstall = async () => {
        if (!deferredPrompt) {
            return;
        }

        try {
            // Show the install prompt
            await deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const choiceResult = await deferredPrompt.userChoice;

            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the PWA installation');
            } else {
                console.log('User dismissed the PWA installation');
            }
        } catch (error) {
            console.error('Error attempting to prompt for PWA installation:', error);
        } finally {
            // Clear the deferred prompt, it can only be used once
            setDeferredPrompt(null);
            setIsInstallable(false);
        }
    };

    return { isInstallable, promptToInstall };
}
