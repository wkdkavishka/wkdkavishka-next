"use client";

import React, { useEffect, useRef, ReactNode, ElementType } from "react";

interface ScrollFadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  as?: ElementType;
}

export function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  as: Tag = "div",
  ...props
}: ScrollFadeInProps) {
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasAnimated.current = true;
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.6s ease-out ${delay * 0.1}s, transform 0.6s ease-out ${delay * 0.1}s`;
            
            // Force reflow
            void element.offsetHeight;
            
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            observer.unobserve(element);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold, rootMargin]);

  const Component = Tag as ElementType;
  
  return (
    <Component
      ref={elementRef}
      className={`${className} opacity-0`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default ScrollFadeIn;
