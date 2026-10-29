"use client";

import { RefreshCw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useOnlineStatus } from "@/lib/use-online-status";

const UPDATE_INTERVAL = 5 * 60 * 1000;

export function PwaStatus() {
	const online = useOnlineStatus();
	const registration = useRef<ServiceWorkerRegistration | null>(null);
	const refreshing = useRef(false);
	const refreshTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const retry = useRef<(() => void) | null>(null);
	const [ready, setReady] = useState(false);
	const [showReady, setShowReady] = useState(false);
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [failed, setFailed] = useState(false);
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		// Only the build wrapper prepares offline artifacts. Development, raw
		// next build and previews have no version marker and register no worker.
		const version = document.querySelector<HTMLMetaElement>('meta[name="pwa-version"]')?.content;
		if (process.env.NODE_ENV !== "production" || !version || !("serviceWorker" in navigator)) return;
		const nextMode = document.querySelector<HTMLMetaElement>('meta[name="pwa-mode"]')?.content === "next";
		let disposed = false;
		let lastCheck = 0;
		let announcedReady = false;
		let checking = false;
		let readyTimer: ReturnType<typeof setTimeout> | undefined;
		const cleanups: (() => void)[] = [];
		const requestStatus = () => {
			registration.current?.active?.postMessage({ type: "PWA_STATUS", version });
		};
		const onMessage = (event: MessageEvent) => {
			if (event.source !== registration.current?.active || event.data?.type !== "PWA_STATUS") return;
			setReady(event.data.ready === true);
			setUpdateAvailable(Boolean(registration.current?.waiting) || event.data.version !== version);
			if (event.data.ready && !announcedReady) {
				announcedReady = true;
				setShowReady(true);
				readyTimer = setTimeout(() => setShowReady(false), 6000);
			}
		};
		const onControllerChange = () => {
			if (refreshing.current) {
				clearTimeout(refreshTimeout.current);
				window.location.reload();
			}
			else requestStatus();
		};
		navigator.serviceWorker.addEventListener("message", onMessage);
		navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
		const watchInstalling = (worker: ServiceWorker | null) => {
			if (!worker) return;
			let activated = worker.state === "activated";
			const onStateChange = () => {
				if (disposed) return;
				if (worker.state === "installed") {
					setFailed(false);
					setUpdateAvailable(Boolean(registration.current?.active));
				} else if (worker.state === "activated") {
					activated = true;
					requestStatus();
				} else if (worker.state === "redundant" && !activated) setFailed(true);
			};
			worker.addEventListener("statechange", onStateChange);
			cleanups.push(() => worker.removeEventListener("statechange", onStateChange));
		};
		const connect = async () => {
			const existing = await navigator.serviceWorker.getRegistration("/");
			const current = navigator.onLine
				? await navigator.serviceWorker.register(nextMode ? "/pwa-worker.js" : "/sw.js", { scope: "/", updateViaCache: "none" })
					.catch((error: unknown) => {
						// onLine is only a hint; retain offline status if the network
						// is unreachable while the browser still reports it as online.
						if (existing) return existing;
						throw error;
					})
				: existing;
			if (!current) return;
			if (disposed) return;
			registration.current = current;
			setUpdateAvailable(Boolean(current.waiting));
			watchInstalling(current.installing);
			const onUpdateFound = () => watchInstalling(current.installing);
			current.addEventListener("updatefound", onUpdateFound);
			cleanups.push(() => current.removeEventListener("updatefound", onUpdateFound));
			requestStatus();
		};
		const check = async (force = false) => {
			if (checking || document.visibilityState === "hidden") return;
			if (!force && Date.now() - lastCheck < UPDATE_INTERVAL) return;
			lastCheck = Date.now();
			checking = true;
			try {
				if (!registration.current) await connect();
				else if (navigator.onLine) await registration.current.update();
				if (!disposed) {
					setFailed(false);
					requestStatus();
				}
			} catch {
				if (!disposed) setFailed(true);
			} finally {
				checking = false;
			}
		};
		retry.current = () => { void check(true); };
		const onForeground = () => { void check(); };
		const onOnline = () => { void check(true); };
		// A normal Next server negotiates RSC by request headers. Offline links
		// instead load the complete saved document; never synthesize a Flight
		// response from HTML or alias it to a static-export .txt file.
		const onOfflineLink = (event: MouseEvent) => {
			if (!nextMode || navigator.onLine || event.defaultPrevented || event.button !== 0 ||
				event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
			if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute("download") ||
				(anchor.target && anchor.target !== "_self")) return;
			const url = new URL(anchor.href);
			if (url.origin !== window.location.origin ||
				(url.pathname === window.location.pathname && url.search === window.location.search)) return;
			event.preventDefault();
			event.stopPropagation();
			window.location.assign(url.href);
		};
		document.addEventListener("click", onOfflineLink, true);
		window.addEventListener("online", onOnline);
		window.addEventListener("focus", onForeground);
		document.addEventListener("visibilitychange", onForeground);
		const interval = setInterval(onForeground, UPDATE_INTERVAL);
		void check();
		return () => {
			disposed = true;
			retry.current = null;
			clearTimeout(readyTimer);
			clearTimeout(refreshTimeout.current);
			clearInterval(interval);
			window.removeEventListener("online", onOnline);
			window.removeEventListener("focus", onForeground);
			document.removeEventListener("click", onOfflineLink, true);
			document.removeEventListener("visibilitychange", onForeground);
			navigator.serviceWorker.removeEventListener("message", onMessage);
			navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
			for (const cleanup of cleanups) cleanup();
		};
	}, []);

	const refresh = () => {
		const waiting = registration.current?.waiting;
		if (waiting) {
			refreshing.current = true;
			setUpdating(true);
			waiting.postMessage({ type: "SKIP_WAITING" });
			refreshTimeout.current = setTimeout(() => {
				refreshing.current = false;
				setUpdating(false);
				setFailed(true);
				setUpdateAvailable(Boolean(registration.current?.waiting));
			}, 15000);
		} else window.location.reload();
	};

	if (online && !updateAvailable && !failed && !showReady) return null;
	return (
		<aside aria-label="App status" className="fixed bottom-4 inset-x-4 z-50 mx-auto flex max-w-lg flex-wrap items-center justify-between gap-3 rounded-xl border bg-background p-4 text-sm shadow-lg">
			<p role="status" className="flex-1">
				{!online
					? ready ? "Offline — saved pages are available." : "Offline — reconnect to download the site."
					: updateAvailable ? "Update available. Refresh when you’re ready."
						: failed ? "Offline download or update failed. You can retry."
							: "Available offline."}
			</p>
			{online && updateAvailable ? (
				<Button size="sm" onClick={refresh} disabled={updating}>
					<RefreshCw className={updating ? "animate-spin" : undefined} />
					{updating ? "Updating…" : "Refresh"}
				</Button>
			) : online && failed ? (
				<Button size="sm" variant="outline" onClick={() => retry.current?.()}>Retry</Button>
			) : online ? (
				<Button size="icon-sm" variant="ghost" aria-label="Dismiss offline status" onClick={() => setShowReady(false)}><X /></Button>
			) : null}
		</aside>
	);
}
