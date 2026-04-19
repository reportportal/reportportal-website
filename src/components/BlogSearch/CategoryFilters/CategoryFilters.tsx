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

const getBlocksWith = createBemBlockBuilder(['category-filters']);

export const CategoryFilters: FC<CategoryFiltersProps> = ({
  categories,
  selectedCategories,
  onCategoryToggle,
  onAllArticlesClick,
}) => {
  const isAllArticlesActive = selectedCategories.length === 0;

  return (
    <div className={getBlocksWith()}>
      <button
        type="button"
        className={classNames(getBlocksWith('__button'), {
          [getBlocksWith('__button--active')]: isAllArticlesActive,
        })}
        aria-pressed={isAllArticlesActive}
        onClick={onAllArticlesClick}
      >
        <span className={getBlocksWith('__text')}>All articles</span>
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
            aria-pressed={isActive}
            onClick={() => onCategoryToggle(category)}
          >
            <span className={getBlocksWith('__text')}>{category}</span>
          </button>
        );
      })}
    </div>
  );
};
