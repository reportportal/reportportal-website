export const SEARCH_RESULTS_LIMIT = 50;

export const BLOG_PARAMS = {
  search: 'search',
  categories: 'categories',
  page: 'page',
} as const;

export interface BlogParams {
  searchQuery: string;
  selectedCategories: string[];
  page: number;
}

export const parseBlogParams = (search: string): BlogParams => {
  const params = new URLSearchParams(search);
  const rawPage = Number(params.get(BLOG_PARAMS.page));
  const categories = params.get(BLOG_PARAMS.categories);

  return {
    searchQuery: params.get(BLOG_PARAMS.search) ?? '',
    selectedCategories: categories ? categories.split(',').filter(Boolean) : [],
    page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
  };
};

export const buildBlogUrl = ({ searchQuery, selectedCategories, page }: BlogParams): string => {
  const params = new URLSearchParams();

  if (searchQuery.trim()) {
    params.set(BLOG_PARAMS.search, searchQuery.trim());
  }

  if (selectedCategories.length > 0) {
    params.set(BLOG_PARAMS.categories, selectedCategories.join(','));
  }

  if (page > 1) {
    params.set(BLOG_PARAMS.page, String(page));
  }

  const query = params.toString();
  return query ? `/blog?${query}` : '/blog';
};
