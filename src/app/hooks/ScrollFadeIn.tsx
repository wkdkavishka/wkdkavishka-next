'use client';

import React, { useEffect, useRef, ReactNode, ElementType } from 'react';

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
  className = '',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  as: Tag = 'div',
  ...props
}: ScrollFadeInProps) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('in-view');
          } else {
            element.classList.remove('in-view');
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
      observer.unobserve(element);
    };
  }, [delay, threshold, rootMargin]);

  const Component = Tag as ElementType;

  const delayClass = delay ? `delay-${delay * 100}` : '';

  return (
    <Component
      ref={elementRef}
      className={`${className} animate-fade-in gpu ${delayClass}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default ScrollFadeIn;
