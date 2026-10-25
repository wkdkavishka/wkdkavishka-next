"use client";

import { Download } from "lucide-react";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone() {
	return window.matchMedia("(display-mode: standalone)").matches || Boolean(
		(window.navigator as Navigator & { standalone?: boolean }).standalone,
	);
}

function subscribeDisplayMode(onChange: () => void) {
	const media = window.matchMedia("(display-mode: standalone)");
	media.addEventListener("change", onChange);
	return () => media.removeEventListener("change", onChange);
}

export function PWAInstallButton() {
	const installMode = useSyncExternalStore(subscribeDisplayMode,
		() => isStandalone() ? "standalone" : "onbeforeinstallprompt" in window ? "prompt" : "manual",
		() => "standalone");
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
	const [installed, setInstalled] = useState(false);
	const [showHelp, setShowHelp] = useState(false);
	const [promptFailed, setPromptFailed] = useState(false);
	const [installing, setInstalling] = useState(false);
	const helpId = useId();
	const needsHelp = installMode === "manual" || promptFailed;

	useEffect(() => {
		const handleBeforeInstallPrompt = (event: Event) => {
			event.preventDefault();
			if (!isStandalone()) setDeferredPrompt(event as BeforeInstallPromptEvent);
		};
		const handleInstalled = () => {
			setInstalled(true);
			setDeferredPrompt(null);
		};
		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		window.addEventListener("appinstalled", handleInstalled);
		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
			window.removeEventListener("appinstalled", handleInstalled);
		};
	}, []);

	const handleInstallClick = async () => {
		if (needsHelp) {
			setShowHelp((visible) => !visible);
			return;
		}
		if (!deferredPrompt || installing) return;
		setInstalling(true);
		try {
			await deferredPrompt.prompt();
			const choice = await deferredPrompt.userChoice;
			if (choice.outcome === "accepted") setInstalled(true);
		} catch {
			setPromptFailed(true);
			setShowHelp(true);
		} finally {
			setDeferredPrompt(null);
			setInstalling(false);
		}
	};

	if (installed || installMode === "standalone" || (!deferredPrompt && !needsHelp)) return null;
	return (
		<div className="flex flex-col items-center gap-2">
			<Button
				size="lg"
				onClick={handleInstallClick}
				disabled={installing}
				aria-expanded={needsHelp ? showHelp : undefined}
				aria-controls={needsHelp && showHelp ? helpId : undefined}
				className="gap-2 bg-green-700 hover:bg-green-800 text-white dark:bg-green-700 dark:hover:bg-green-800"
			>
				<Download className="h-4 w-4" />
				Install App
			</Button>
			{showHelp && <p id={helpId} className="max-w-xs text-sm text-muted-foreground">If your browser supports installation, choose Add to Home Screen or Install from its menu. On iPhone or iPad, use Safari’s Share menu.</p>}
		</div>
	);
}
