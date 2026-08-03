import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react';

import { IllustrationStaticProvider } from './IllustrationStaticContext';

// Scales illustration proportionally to fit the mobile container width.
// Uses ResizeObserver so it reacts to viewport changes.
// Self-scaling illustrations (those with their own ResizeObserver) signal via
// the onSelfScaling callback so we skip adding an extra outer scale on top.
export const MobileIllustrationWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const selfScalingRef = useRef(false);
  const onSelfScalingHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) {
      return undefined;
    }

    function applyScale() {
      if (!outer || !inner) return;
      if (selfScalingRef.current) {
        outer.style.height = `${inner.scrollHeight}px`;
        return;
      }
      const naturalW = inner.scrollWidth;
      if (!naturalW) return;
      const scale = Math.min(1, outer.clientWidth / naturalW);
      inner.style.transform = `scale(${scale})`;
      inner.style.transformOrigin = 'top left';
      outer.style.height = `${inner.scrollHeight * scale}px`;
    }

    const onSelfScaling = () => {
      selfScalingRef.current = true;
      // Remove the scale transform we may have set before self-scaling notified
      if (inner) inner.style.transform = '';
      applyScale();
    };

    onSelfScalingHandlerRef.current = onSelfScaling;

    applyScale();
    const ro = new ResizeObserver(applyScale);
    ro.observe(outer);
    return () => {
      onSelfScalingHandlerRef.current = null;
      ro.disconnect();
    };
  }, []);

  const onSelfScalingCallback = useCallback(() => {
    onSelfScalingHandlerRef.current?.();
  }, []);

  return (
    <div ref={outerRef} className="animated-list__mobile-illustration-outer">
      <div ref={innerRef} className="animated-list__mobile-illustration-inner">
        <IllustrationStaticProvider onSelfScaling={onSelfScalingCallback}>
          {children}
        </IllustrationStaticProvider>
      </div>
    </div>
  );
};
