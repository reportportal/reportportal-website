import React, { FC, ChangeEvent } from 'react';
import { createBemBlockBuilder } from '@app/utils';
import { SearchIcon } from '@app/svg/searchIcon';

import './BlogSearch.scss';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const getBlocksWith = createBemBlockBuilder(['blog-search']);

export const BlogSearch: FC<BlogSearchProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={getBlocksWith()}>
      <div className={getBlocksWith('__input-wrapper')}>
        <div className={getBlocksWith('__icon')}>
          <SearchIcon />
        </div>
        <input
          type="text"
          className={getBlocksWith('__input')}
          value={value}
          placeholder="Search article by term"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
