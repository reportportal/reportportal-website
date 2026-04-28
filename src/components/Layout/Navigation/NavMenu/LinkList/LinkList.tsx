import React, { FC } from 'react';
import { chunk } from 'lodash';
import { ContentfulAsset, createBemBlockBuilder, LinkDto } from '@app/utils';

import { LinkListItem } from './LinkListItem';

import './LinkList.scss';

export interface ListItem {
  title: string;
  description: string;
  link: LinkDto;
  addition?: string;
  icon: ContentfulAsset;
}

interface LinkListProps {
  title: string;
  items: ListItem[];
  className: string;
  showTitle?: boolean;
  itemsPerRow?: number;
}

export const LinkList: FC<LinkListProps> = ({
  title,
  items,
  className = '',
  showTitle = true,
  itemsPerRow = items.length,
}) => {
  const getBlocksWith = createBemBlockBuilder(['link-list', className]);

  const columns = chunk(items, itemsPerRow).map((column, columnIndex) => (
    <div key={columnIndex} className={getBlocksWith('__col')}>
      {column.map(data => (
        <LinkListItem key={data.title} className={getBlocksWith('__item')} {...data} />
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
