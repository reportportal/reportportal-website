import { useState, useEffect, useCallback } from 'react';
import { useRafInterval } from 'ahooks';
import { useInView } from '@app/hooks/useInView';

// Auto-switching is desktop-only — matches the breakpoint where the
// illustration panel becomes visible (1239px = v.$desktop-sm).
// Lazy getter avoids module-level window access during SSR.
const getDesktopMQ = () =>
  typeof window !== 'undefined' ? window.matchMedia('(min-width: 1239px)') : null;

const isDesktop = () => getDesktopMQ()?.matches ?? false;

interface AnimationIntervalProps {
  totalItemsLength: number;
  interval?: number;
}

export const useAnimationInterval = ({
  interval = 10000,
  totalItemsLength,
}: AnimationIntervalProps) => {
  const [ref, inView] = useInView();
  const [delay, setDelay] = useState<number | undefined>(undefined);
  const [activeListIndex, setActiveListIndex] = useState<number>(0);
  const [desktop, setDesktop] = useState(isDesktop);

  useEffect(() => {
    const mq = getDesktopMQ();
    if (!mq) return undefined;
    const onChange = (e: MediaQueryListEvent) => setDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const setIndexAndResetInterval = useCallback((index: number) => {
    setDelay(undefined);
    setActiveListIndex(index);
  }, []);

  useRafInterval(() => {
    setActiveListIndex(prevState => (prevState === totalItemsLength - 1 ? 0 : prevState + 1));
  }, delay);

  useEffect(() => {
    setDelay(inView && desktop ? interval : undefined);
  }, [setDelay, interval, inView, desktop]);

  return {
    inView,
    activeListIndex,
    setActiveListIndex,
    setIndexAndResetInterval,
    ref,
    delay,
    setDelay,
  };
};
