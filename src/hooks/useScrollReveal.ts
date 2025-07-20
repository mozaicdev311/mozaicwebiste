import { useState, useEffect, useRef } from 'react';

interface ScrollRevealOptions extends IntersectionObserverInit {
  // No custom options needed for now, but can be extended
}

export const useScrollReveal = (options?: ScrollRevealOptions) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Trigger if the element is intersecting and we haven't already made it visible
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        // Once visible, we don't need to observe it anymore
        observer.unobserve(element);
      }
    }, {
      root: null, // relative to the viewport
      rootMargin: '0px',
      threshold: 0.1, // 10% of the item must be visible to trigger
      ...options,
    });

    observer.observe(element);

    return () => {
      // Clean up the observer when the component unmounts
      observer.unobserve(element);
    };
  }, [isVisible, options]); // Rerun effect if isVisible or options change

  return [ref, isVisible] as const;
};
