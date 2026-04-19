import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { isBoolean, isString } from 'lodash';
import { createBemBlockBuilder, FormattedComparePlansItemDto, MEDIA_DESKTOP_SM } from '@app/utils';

import MarkIcon from './icons/mark.inline.svg';
import CrossIcon from './icons/cross.inline.svg';
import { TextWithColor } from './TextWithColor';

import '../ComparePlans.scss';

interface ColumnsProps {
  cols: FormattedComparePlansItemDto['plans'];
  title?: string;
}

const getBlocksWith = createBemBlockBuilder(['compare']);

export const Columns: FC<ColumnsProps> = ({ title = '', cols }) => {
  const isDesktop = useMediaQuery({ query: MEDIA_DESKTOP_SM });

  const getMark = (value: boolean) =>
    value ? (
      <div className={getBlocksWith('__mark-icon')}>
        <MarkIcon />
      </div>
    ) : (
      <div className={getBlocksWith('__cross-icon')}>
        <CrossIcon />
      </div>
    );

  const isColumnsVisible = (title && isDesktop) || (!title && !isDesktop);

  return (
    <div className={getBlocksWith('__row-title-wrapper')}>
      {title && <div className={getBlocksWith('__row-title')}>{title}</div>}
      {isColumnsVisible && (
        <div className={getBlocksWith('__row-title-cols')}>
          {cols.map((columnValue, index) => {
            const getRenderedValue = () => {
              if (isBoolean(columnValue)) {
                return getMark(columnValue);
              }

              if (isString(columnValue)) {
                return <TextWithColor text={columnValue} />;
              }

              return <div>{columnValue}</div>;
            };

            return (
              <div
                key={index}
                className={getBlocksWith('__row-title-col')}
                data-short={columnValue}
              >
                {getRenderedValue()}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
