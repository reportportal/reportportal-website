import React, { FC, ChangeEvent } from 'react';
import { createBemBlockBuilder } from '@app/utils';
import SearchIcon from '@app/svg/searchIcon.inline.svg';

import './BlogSearch.scss';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  onFocusChange?: (isFocused: boolean) => void;
}

const getBlocksWith = createBemBlockBuilder(['blog-search']);

export const BlogSearch: FC<BlogSearchProps> = ({ value, onChange, onFocusChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={getBlocksWith()}>
      <div className={getBlocksWith('__input-wrapper')}>
        <div className={getBlocksWith('__icon')}>
          <SearchIcon aria-hidden focusable={false} />
        </div>
        <input
          type="search"
          aria-label="Search articles"
          className={getBlocksWith('__input')}
          value={value}
          placeholder="Search article by term"
          onChange={handleChange}
          onFocus={() => onFocusChange?.(true)}
          onBlur={() => onFocusChange?.(false)}
        />
      </div>
    </div>
  );
};
