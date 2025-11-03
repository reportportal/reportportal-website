import React, { FC } from 'react';
import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import { createBemBlockBuilder } from '@app/utils';

import { SectionItem, SectionItemProps } from './SectionItem';

import './SectionList.scss';

interface SectionListProps {
  items: SectionItemProps[];
  title?: string;
  className?: string;
  showTitle?: boolean;
  itemsPerRow?: number;
  mode?: 'primary' | 'secondary';
}

export const SectionList: FC<SectionListProps> = ({
  title,
  showTitle = true,
  items,
  itemsPerRow = items.length,
  className = '',
  mode = 'primary',
}) => {
  const bemClasses = compact([
    'section-list',
    mode === 'secondary' ? 'section-list-secondary' : undefined,
    className,
  ]);
  const getBlocksWith = createBemBlockBuilder(bemClasses);
  const columns = chunk(items, itemsPerRow).map((column, columnIndex) => (
    <div key={columnIndex} className={getBlocksWith('__col')}>
      {column.map(data => (
        <SectionItem key={data.title} className={getBlocksWith('__item')} {...data} mode={mode} />
      ))}
    </div>
  ));

  return (
    <div className={getBlocksWith()}>
      {showTitle && <p className={getBlocksWith('__title')}>{title}</p>}
      <div className="row">{columns}</div>
    </div>
  );
};
