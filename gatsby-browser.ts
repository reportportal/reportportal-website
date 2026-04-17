import type { GatsbyBrowser } from 'gatsby';

declare global {
  interface Window {
    prevLocation?: Location;
  }
}

export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] = () => {
  if (typeof window !== 'undefined' && window.history.scrollRestoration) {
    window.history.scrollRestoration = 'manual';
  }
};

export const shouldUpdateScroll: GatsbyBrowser['shouldUpdateScroll'] = ({
  routerProps: { location },
  prevRouterProps,
  getSavedScrollPosition,
}) => {
  // Always scroll to top when navigating INTO an individual blog post page.
  // Blog post pages have pathname like /blog/article-slug (not just /blog or /blog/).
  if (
    location?.pathname?.startsWith('/blog/') &&
    location.pathname !== '/blog/' &&
    location.pathname !== '/blog'
  ) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    return false;
  }

  // Preserve scroll when only the query string changes on the same pathname
  // (e.g., blog filters, Load More pagination). Prevents Gatsby from resetting
  // scroll to the top when the listing calls navigate(..., { replace: true }).
  if (
    prevRouterProps?.location &&
    prevRouterProps.location.pathname === location?.pathname &&
    prevRouterProps.location.search !== location?.search
  ) {
    return false;
  }

  const [, currentPositionY] = getSavedScrollPosition(location) ?? [0, 0];
  const [, prevPositionY] = getSavedScrollPosition(prevRouterProps?.location ?? location) ?? [0, 0];
  const withHash = Boolean(location?.hash);

  const isScrollDifferentFromPreviousPage =
    prevRouterProps?.location && prevPositionY !== currentPositionY;
  const shouldScrollOnInitialLoad = !prevRouterProps?.location && currentPositionY;

  if (isScrollDifferentFromPreviousPage ?? shouldScrollOnInitialLoad) {
    window.scrollTo({
      top: currentPositionY,
      ...(!withHash && { behavior: 'instant' as ScrollBehavior }),
    });
  }

  return true;
};

export const onPreRouteUpdate: GatsbyBrowser['onPreRouteUpdate'] = ({ prevLocation }) => {
  window.prevLocation = prevLocation ?? undefined;
  document.documentElement.classList.add('no-transitions');
};

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = () => {
  // Settle one frame with transitions disabled so hover/active re-evaluation
  // after back-navigation does not fade in over 300ms (flicker), then
  // re-enable them for normal user interactions.
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('no-transitions');
  });
};
