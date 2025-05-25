'use client';

import { useEffect, useRef } from 'react';

export function useScrollAnimation({
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
} = {}) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.animationDelay = `${delay * 100}ms`;
          element.classList.add('fade-in');
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [delay, threshold, rootMargin]);

  return elementRef;
}

export default useScrollAnimation;
