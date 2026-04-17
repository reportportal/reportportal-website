export interface BlogState {
  searchQuery: string;
  selectedCategories: string[];
  visibleCount: number;
  articleSlug?: string;
  scrollY?: number;
  articleTop?: number;
}

const SESSION_STORAGE_KEY = 'blogPageState';

export const serializeBlogStateToQuery = (
  searchQuery: string,
  selectedCategories: string[],
): string => {
  const params = new URLSearchParams();

  if (searchQuery.trim()) {
    params.set('search', searchQuery.trim());
  }

  if (selectedCategories.length > 0) {
    params.set('categories', selectedCategories.join(','));
  }

  return params.toString();
};

export const deserializeBlogStateFromQuery = (queryString: string): Partial<BlogState> => {
  const params = new URLSearchParams(queryString);
  const state: Partial<BlogState> = {};

  const search = params.get('search');
  if (search) {
    state.searchQuery = search;
  }

  const categories = params.get('categories');
  if (categories) {
    state.selectedCategories = categories.split(',').filter(Boolean);
  }

  return state;
};

export const saveBlogStateToSession = (
  searchQuery: string,
  selectedCategories: string[],
  visibleCount: number,
  articleSlug?: string,
  scrollY?: number,
  articleTop?: number,
): void => {
  try {
    const state: BlogState = {
      searchQuery,
      selectedCategories,
      visibleCount,
    };

    if (articleSlug) {
      state.articleSlug = articleSlug;
    }

    if (scrollY !== undefined) {
      state.scrollY = scrollY;
    }

    if (articleTop !== undefined) {
      state.articleTop = articleTop;
    }

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // Ignore sessionStorage errors (e.g., in private browsing mode)
  }
};

export const getBlogStateFromSession = (): BlogState | null => {
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    return JSON.parse(stored) as BlogState;
  } catch (error) {
    return null;
  }
};

export const clearBlogStateFromSession = (): void => {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    console.error('localstorage deletion error');
  }
};

export const restoreScrollPosition = (
  articleSlug: string,
  scrollY?: number,
  articleTop?: number,
): void => {
  if (typeof window === 'undefined') {
    return;
  }

  // If we have exact position, use it
  if (scrollY !== undefined && articleTop !== undefined) {
    // Restore to the exact position
    window.scrollTo({
      top: scrollY,
      behavior: 'instant',
    });
    return;
  }

  // Fallback to element-based restoration
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    // Try to find article by data attribute first
    const articleElement = document.querySelector(`[data-article-slug="${articleSlug}"]`);

    if (articleElement) {
      const rect = articleElement.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const headerOffset = 100; // Offset for header

      window.scrollTo({
        top: elementTop - headerOffset,
        behavior: 'smooth',
      });
      return;
    }

    const linkElement = document.querySelector(`a[href="/blog/${articleSlug}"]`);

    if (linkElement) {
      const rect = linkElement.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const headerOffset = 100;

      window.scrollTo({
        top: elementTop - headerOffset,
        behavior: 'smooth',
      });
    }
  });
};
