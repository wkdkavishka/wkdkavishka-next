"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallButton() {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showInstallButton, setShowInstallButton] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			// Prevent the mini-infobar from appearing
			e.preventDefault();
			// Save the event so it can be triggered later
			setDeferredPrompt(e as BeforeInstallPromptEvent);
			// Show the install button
			setShowInstallButton(true);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		// Check if already installed
		if (
			window.matchMedia("(display-mode: standalone)").matches ||
			(window.navigator as any).standalone
		) {
			setShowInstallButton(false);
		}

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt,
			);
		};
	}, []);

	const handleInstallClick = async () => {
		if (!deferredPrompt) return;

		// Show the install prompt
		await deferredPrompt.prompt();

		// Wait for the user's response
		const choiceResult = await deferredPrompt.userChoice;

		if (choiceResult.outcome === "accepted") {
			console.log("User accepted the PWA install prompt");
		}

		// Clear the saved prompt
		setDeferredPrompt(null);
		setShowInstallButton(false);
	};

	if (!showInstallButton) return null;

	return (
		<Button
			size="lg"
			onClick={handleInstallClick}
			className="gap-2 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
		>
			<Download className="h-4 w-4" />
			Install App
		</Button>
	);
}
