import { useCallback, useRef, useState } from 'react';

interface InViewOptions {
  once?: boolean;
  margin?: string;
}

export const useInView = ({ once = true, margin }: InViewOptions = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenScrolledPast, setHasBeenScrolledPast] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      setHasBeenScrolledPast(false);

      const { bottom } = node.getBoundingClientRect();

      if (bottom <= 0) {
        setHasBeenScrolledPast(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setIsInView(false);
            setHasBeenScrolledPast(false);
          }
        },
        { rootMargin: margin },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [once, margin],
  );

  return [ref, isInView || hasBeenScrolledPast] as const;
};
