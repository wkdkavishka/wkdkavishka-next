"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavigationComp } from "./NavigationComp";

export const MobileNavigationPortal = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (typeof document === "undefined" || !isMounted) {
    return null;
  }

  const portalRoot = document.getElementById("mobile-navigation-root");
  if (!portalRoot) return null;

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 z-50 block border-t border-gray-100 bg-white shadow-lg md:hidden">
      <NavigationComp isMobile={true} />
    </div>,
    portalRoot,
  );
};
