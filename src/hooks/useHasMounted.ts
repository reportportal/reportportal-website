import { useEffect, useState } from 'react';

/**
 * Returns `false` on the server and on the very first client render, then
 * `true` after the initial commit. Use this to gate any value whose SSR
 * approximation differs from its real client value (e.g. `ahooks` `useScroll`,
 * `window.innerWidth`, conditionally rendered `createPortal` calls) so the
 * SSR HTML and the first hydrated tree are byte-identical. Without this,
 * React 18 will abort hydration with "There was an error while hydrating" and
 * re-render the whole root from scratch, producing a visible white flash on
 * slow networks.
 *
 * For media queries specifically, prefer `useMediaQuerySafe` -- it bakes the
 * mount gate into a single `useSyncExternalStore` subscription with an
 * explicit SSR fallback per call site.
 */
export const useHasMounted = (): boolean => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  return hasMounted;
};
