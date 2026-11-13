import React, { createContext, FC, ReactNode, useContext, useEffect, useRef } from 'react';

/**
 * When true, illustrations should skip all entrance animations and render
 * their final state immediately (used for mobile inline previews).
 */
const IllustrationStaticContext = createContext(false);

/**
 * Allows a self-scaling illustration to signal that it manages its own
 * ResizeObserver — so MobileIllustrationWrapper should skip external scaling.
 */
const SelfScalingContext = createContext<(() => void) | null>(null);

export const IllustrationStaticProvider: FC<{
  children: ReactNode;
  onSelfScaling?: () => void;
}> = ({ children, onSelfScaling }) => (
  <IllustrationStaticContext.Provider value={true}>
    <SelfScalingContext.Provider value={onSelfScaling ?? null}>
      {children}
    </SelfScalingContext.Provider>
  </IllustrationStaticContext.Provider>
);

/** Returns true when the illustration is rendered in a static (no-animation) context. */
export const useIllustrationStatic = (): boolean => useContext(IllustrationStaticContext);

/**
 * Call this hook in a self-scaling illustration to inform the
 * MobileIllustrationWrapper that it should not apply an additional scale.
 */
export const useRegisterSelfScaling = (): void => {
  const notify = useContext(SelfScalingContext);
  const notifyRef = useRef(notify);
  notifyRef.current = notify;

  useEffect(() => {
    notifyRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
