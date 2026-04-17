import React, { FC } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';

import './CategoryFilters.scss';

interface CategoryFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onAllArticlesClick: () => void;
}

const ALL_ARTICLES = 'All articles';

const getBlocksWith = createBemBlockBuilder(['category-filters']);

export const CategoryFilters: FC<CategoryFiltersProps> = ({
  categories,
  selectedCategories,
  onCategoryToggle,
  onAllArticlesClick,
}) => {
  const hasSelectedCategories = selectedCategories.length > 0;
  const isAllArticlesActive = !hasSelectedCategories;

  const handleCategoryClick = (category: string) => {
    if (category === ALL_ARTICLES) {
      onAllArticlesClick();
    } else {
      onCategoryToggle(category);
    }
  };

  return (
    <div className={getBlocksWith()}>
      <button
        type="button"
        className={classNames(getBlocksWith('__button'), {
          [getBlocksWith('__button--active')]: isAllArticlesActive,
        })}
        onClick={() => handleCategoryClick(ALL_ARTICLES)}
      >
        <span className={getBlocksWith('__text')}>{ALL_ARTICLES}</span>
      </button>
      {categories.map(category => {
        const isActive = selectedCategories.includes(category);

        return (
          <button
            key={category}
            type="button"
            className={classNames(getBlocksWith('__button'), {
              [getBlocksWith('__button--active')]: isActive,
            })}
            onClick={() => handleCategoryClick(category)}
          >
            <span className={getBlocksWith('__text')}>{category}</span>
          </button>
        );
      })}
    </div>
  );
};
