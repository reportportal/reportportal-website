import { useCallback, useSyncExternalStore } from 'react';

/**
 * SSR-safe media-query hook.
 *
 * `react-responsive`'s `useMediaQuery` returns one value on the server (no
 * `window.matchMedia`, defaults to `false`) and a different value on the very
 * first client render (real evaluation against the actual viewport). For any
 * visitor whose viewport doesn't happen to match the server default, that
 * divergence is a React 18 hydration mismatch. Depending on what the matched
 * value gates, the mismatch can range from "different className" warnings to a
 * full #418 + #423 (which causes React to discard the SSR tree and re-render
 * the entire root client-side -- visible as a white flash on slow networks).
 *
 * `useSyncExternalStore` is React 18's intended primitive for subscribing to
 * external mutable sources while staying SSR-safe. It *forces* the caller to
 * supply a server snapshot (the `ssrFallback` argument), making the SSR/client
 * divergence explicit at every call site instead of silently wrong. On the
 * first client render React calls `getServerSnapshot` again to keep hydration
 * byte-identical to SSR; only after hydration commits does the real
 * `matchMedia` value take over (causing a normal re-render, not a mismatch).
 *
 * Picking the right `ssrFallback`:
 * - Use `false` when the SSR HTML should reflect the "below the breakpoint"
 *   variant (default; matches `react-responsive`'s historical SSR behavior).
 * - Use `true` when SSR'ing the "above the breakpoint" variant produces a
 *   better first paint, *or* when downstream logic only works correctly if
 *   the matched value is `true` from the very first render (e.g.
 *   `framer-motion` `initial`/`animate` props that only fire on mount).
 */
export const useMediaQuerySafe = (query: string, ssrFallback = false): boolean => {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);

      return () => mql.removeEventListener('change', callback);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => ssrFallback,
  );
};
