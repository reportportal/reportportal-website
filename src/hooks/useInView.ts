import { useEffect, useRef, useState } from 'react';
import { useInView as useFramerInView } from 'framer-motion';

type InViewOptions = Parameters<typeof useFramerInView>[1];

export const useInView = (options: InViewOptions = { once: true }) => {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, options);
  const [hasBeenScrolledPast, setHasBeenScrolledPast] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const { bottom } = (ref.current as HTMLElement).getBoundingClientRect();

      if (bottom <= 0) {
        setHasBeenScrolledPast(true);
      }
    }
  }, []);

  return [ref, isInView || hasBeenScrolledPast] as const;
};
