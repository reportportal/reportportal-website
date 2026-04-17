/* eslint-disable no-restricted-globals */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

exports.onInitialClientRender = () => {
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
};

exports.shouldUpdateScroll = ({
  routerProps: { location },
  prevRouterProps = {},
  getSavedScrollPosition,
}) => {
  // Always scroll to top when navigating to individual blog post pages
  // Blog post pages have pathname like /blog/article-slug (not just /blog or /blog/)
  if (
    location?.pathname?.startsWith('/blog/') &&
    location.pathname !== '/blog/' &&
    location.pathname !== '/blog'
  ) {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
    return false;
  }

  // Check if navigating to blog listing page with saved scroll state
  if (location?.pathname === '/blog/' || location?.pathname === '/blog') {
    try {
      const blogState = sessionStorage.getItem('blogPageState');

      if (blogState) {
        const parsed = JSON.parse(blogState);
        // If we have articleSlug, prevent Gatsby from managing scroll
        // Let the blog page component handle scroll restoration after content is rendered
        if (parsed.articleSlug) {
          return false;
        }
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }

  // Existing scroll restoration logic for other pages
  const [, currentPositionY] = getSavedScrollPosition(location);
  const [, prevPositionY] = getSavedScrollPosition(prevRouterProps?.location ?? location);
  const withHash = Boolean(location?.hash);

  const isScrollDifferentFromPreviousPage =
    prevRouterProps.location && prevPositionY !== currentPositionY;
  const shouldScrollOnInitialLoad = !prevRouterProps.location && currentPositionY;

  if (isScrollDifferentFromPreviousPage ?? shouldScrollOnInitialLoad) {
    window.scrollTo({
      top: currentPositionY,
      ...(!withHash && { behavior: 'instant' }),
    });
  }

  return true;
};

exports.onPreRouteUpdate = ({ prevLocation }) => {
  window.prevLocation = prevLocation;
};
