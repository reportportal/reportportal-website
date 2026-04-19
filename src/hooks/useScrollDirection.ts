import { useState, useRef, useLayoutEffect } from 'react';
import { useScroll } from 'ahooks';
import { noop } from 'lodash';

interface ScrollDirection {
  isMenuOpen: boolean;
  callbackFn?: () => void;
}

export enum Directions {
  DOWN = 'down',
  UP = 'up',
}

export const useScrollDirection = ({ isMenuOpen, callbackFn = noop }: ScrollDirection) => {
  const [scrollDirection, setScrollDirection] = useState<Directions | null>(null);
  const lastScrollYRef = useRef(0);
  const scroll = useScroll();

  const scrollY = scroll?.top ?? 0;

  useLayoutEffect(() => {
    const direction = scrollY > lastScrollYRef.current ? Directions.DOWN : Directions.UP;
    const isScrollDebouncedEnough = Math.abs(scrollY - lastScrollYRef.current) > 10;

    if (scrollY === 0) {
      setScrollDirection(null);
    }

    if (isScrollDebouncedEnough) {
      lastScrollYRef.current = scrollY;

      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }

      callbackFn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY]);

  useLayoutEffect(() => {
    if (isMenuOpen) {
      setScrollDirection(null);
    }
  }, [isMenuOpen]);

  return scrollDirection;
};
