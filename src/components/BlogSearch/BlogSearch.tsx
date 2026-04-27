import React, { FC, ChangeEvent, useEffect, useState } from 'react';
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
  // Local mirror keeps the input in sync with the DOM on every keystroke,
  // so the async URL round-trip in the parent (navigate -> useLocation ->
  // params) cannot re-render the input with a stale value and snap the
  // caret to the end.
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(current => (current === value ? current : value));
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setLocalValue(nextValue);
    onChange(nextValue);
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
          value={localValue}
          placeholder="Search article by term"
          onChange={handleChange}
          onFocus={() => onFocusChange?.(true)}
          onBlur={() => onFocusChange?.(false)}
        />
      </div>
    </div>
  );
};
