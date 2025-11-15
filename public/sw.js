// public/sw.js
//! CACHE_NAME is updated to the date and time
//! this must be 4th line of the file
const CACHE_NAME = `pwa-cache-2025-11-15T18:41:12.992Z`;
const OFFLINE_PAGE = "/offline.html";

const PRECACHE_ASSETS = [
  "/index.html",
  "/offline.html",

  "/file.svg",
  "/globe.svg",
  "/vercel.svg",
  "/window.svg",
  "/resume.pdf",

  "/images/meta/favicon-16x16.png",
  "/images/meta/favicon-32x32.png",
  "/images/meta/apple-touch-icon.png",
  "/images/meta/android-chrome-192x192.png",
  "/images/meta/android-chrome-512x512.png",
  "/images/meta/mstile-70x70.png",
  "/images/meta/mstile-150x150.png",
  "/images/meta/mstile-310x150.png",
  "/images/meta/mstile-310x310.png",
  "/images/meta/og-image.jpg",

  "/images/profile/profile.webp",
  "/images/team/member-1.webp",
  "/images/team/member-2.webp",
  "/images/team/member-3.webp",
  "/images/team/member-4.webp",

  "/images/projects/irs-calculator/1.webp",
  "/images/projects/irs-calculator/2.webp",
  "/images/projects/irs-calculator/3.webp",
  "/images/projects/wkdkavishka-vue/1.webp",
  "/images/projects/wkdkavishka-vue/2.webp",
  "/images/projects/wkdkavishka-vue/3.webp",
  "/images/projects/wkdkavishka-vue/4.webp",

  "/images/pwa/desktop-1.png",
  "/images/pwa/desktop.png",
  "/images/pwa/mobile.png",

  "/manifest.webmanifest", // ← use .webmanifest
];

let installSuccess = true;
const failedAssets = [];

// Enhanced: Log failed assets
async function safeCacheAddAll(cache, urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url, { credentials: "omit" });
      if (response.ok) {
        await cache.put(url, response.clone());
        console.log(`[SW] Cached: ${url}`);
      } else {
        console.error(
          `[SW] Failed to cache: ${url} → ${response.status} ${response.statusText}`,
        );
        failedAssets.push({ url, status: response.status });
        installSuccess = false;
      }
    } catch (err) {
      console.error(`[SW] Failed to fetch: ${url}`, err.message || err);
      failedAssets.push({ url, error: err.message });
      installSuccess = false;
    }
  }
}

// INSTALL
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => safeCacheAddAll(cache, PRECACHE_ASSETS))
      .then(() => {
        if (!installSuccess) {
          console.warn("[SW] Installation completed with failures. See above.");
        } else {
          console.log("[SW] All assets cached successfully!");
        }
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error("[SW] Install failed:", err);
        installSuccess = false;
      }),
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => {
              console.log(`[SW] Deleting old cache: ${key}`);
              return caches.delete(key);
            }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// FETCH
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || request.url.includes("chrome-extension"))
    return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          console.log(`[SW] Offline fallback: ${request.url}`);
          return caches.match(OFFLINE_PAGE);
        });
      }),
  );
});

// Message: Skip waiting
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
