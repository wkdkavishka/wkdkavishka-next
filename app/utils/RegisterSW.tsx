// app/utils/RegisterSW.tsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Registers the classic (non-module) service worker at /sw.js
 * - Skips if browser does not support SW
 * - Waits for the page to be fully loaded
 * - Logs installation state
 * - Listens for controller changes (new SW waiting)
 * - Handles errors gracefully
 */
export default function RegisterSW() {
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // -----------------------------------------------------------------
    // 1. Guard: only run if browser supports SW
    // -----------------------------------------------------------------
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      console.log("ServiceWorker registration skipped:", "not supported");
      return;
    }

    // -----------------------------------------------------------------
    // 2. Wait for the document to be ready (covers SPA navigation)
    // -----------------------------------------------------------------
    const registerWhenReady = async () => {
      if (document.readyState === "complete") {
        await doRegister();
      } else {
        await new Promise<void>((resolve) =>
          window.addEventListener("load", () => resolve(), { once: true }),
        );
        await doRegister();
      }
    };

    // -----------------------------------------------------------------
    // 3. Actual registration
    // -----------------------------------------------------------------
    const doRegister = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/", // matches the SW location
          // type: "classic" is the default – your sw.js is NOT an ES module
        });

        registrationRef.current = registration;

        // ----- Installation state logging -----
        if (registration.installing) {
          console.log("ServiceWorker installing…");
        } else if (registration.waiting) {
          console.log("ServiceWorker installed (waiting)");
        } else if (registration.active) {
          console.log("ServiceWorker active");
        }

        console.log(
          "ServiceWorker registration successful → scope:",
          registration.scope,
        );

        // ----- Update-found handling (optional toast / UI) -----
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            console.log("New ServiceWorker version found – installing…");
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                console.log("New ServiceWorker ready. Reload to apply update.");
                // Optional: show a toast asking the user to reload
              }
            });
          }
        });
      } catch (err) {
        console.error("ServiceWorker registration failed:", err);
      }
    };

    registerWhenReady();

    // -----------------------------------------------------------------
    // 4. Listen for controller changes (new SW takes over)
    // -----------------------------------------------------------------
    const onControllerChange = () => {
      console.log("ServiceWorker controller changed – page will reload.");
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      onControllerChange,
    );

    // Cleanup
    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange,
      );
    };
  }, []);

  return null;
}
