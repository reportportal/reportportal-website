import React from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import type { GatsbyBrowser } from 'gatsby';

export const wrapRootElement: NonNullable<GatsbyBrowser['wrapRootElement']> = ({ element }) =>
  React.createElement(
    StyleProvider,
    null,
    React.createElement(ConfigProvider, { theme: { hashed: false } }, element),
  );

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
  // Skip when a hash is present so in-page anchor navigation still works.
  if (
    location?.pathname?.startsWith('/blog/') &&
    location.pathname !== '/blog/' &&
    !location.hash
  ) {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    return false;
  }

  // Preserve scroll when navigating on the same pathname, regardless of
  // whether the query string changes (e.g., blog filters, Load More
  // pagination, or a no-op navigate that trims to the same URL). Prevents
  // Gatsby from resetting scroll to the top when the listing calls
  // navigate(..., { replace: true }).
  if (prevRouterProps?.location && prevRouterProps.location.pathname === location?.pathname) {
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
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('no-transitions');
    });
  });
};
