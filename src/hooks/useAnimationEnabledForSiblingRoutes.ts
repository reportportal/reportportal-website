import { useLocation } from '@gatsbyjs/reach-router';
import { isSameParentRoute } from '@app/utils';

export const useAnimationEnabledForSiblingRoutes = () => {
  const { pathname } = useLocation();

  if (typeof window === 'undefined') {
    return true;
  }

  return !isSameParentRoute(pathname, window.prevLocation?.pathname);
};
