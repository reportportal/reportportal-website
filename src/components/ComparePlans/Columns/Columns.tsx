import React, { FC } from 'react';
import { useMediaQuerySafe } from '@app/hooks/useMediaQuerySafe';
import { isBoolean, isString } from 'lodash';
import {
  ComparePlanCell,
  createBemBlockBuilder,
  FormattedComparePlansItemDto,
  isComparePlanCellLink,
  isComparePlanCellWithNote,
  MEDIA_DESKTOP_SM,
} from '@app/utils';
import { Link } from '@app/components/Link';
import { Badge } from '@app/components/Badge';

import { ROW_BADGES } from '../constants';
import MarkIcon from './icons/mark.inline.svg';
import CrossIcon from './icons/cross.inline.svg';
import { TextWithColor } from './TextWithColor';

import '../ComparePlans.scss';

interface ColumnsProps {
  cols: FormattedComparePlansItemDto['plans'];
  title?: string;
}

const getBlocksWith = createBemBlockBuilder(['compare']);

const getShortValue = (columnValue: ComparePlanCell) => {
  if (isBoolean(columnValue)) {
    return '';
  }

  if (isComparePlanCellWithNote(columnValue)) {
    return columnValue.note;
  }

  if (isComparePlanCellLink(columnValue)) {
    return columnValue.label;
  }

  return String(columnValue);
};

export const Columns: FC<ColumnsProps> = ({ title = '', cols }) => {
  const isDesktop = useMediaQuerySafe(MEDIA_DESKTOP_SM);

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
      {title && (
        <div className={getBlocksWith('__row-title')}>
          {title}
          {ROW_BADGES[title] && (
            <Badge className={getBlocksWith('__badge')} variant={ROW_BADGES[title]} />
          )}
        </div>
      )}
      {isColumnsVisible && (
        <div className={getBlocksWith('__row-title-cols')}>
          {cols.map((columnValue, index) => {
            const getRenderedValue = () => {
              if (isBoolean(columnValue)) {
                return getMark(columnValue);
              }

              // The feature is there, it just has to be switched on for you.
              if (isComparePlanCellWithNote(columnValue)) {
                return (
                  <div className={getBlocksWith('__cell-note')}>
                    {getMark(columnValue.value)}
                    <span className={getBlocksWith('__cell-note-text')}>{columnValue.note}</span>
                  </div>
                );
              }

              // Sells Service Packages from inside the table.
              if (isComparePlanCellLink(columnValue)) {
                return (
                  <div>
                    <Link className={getBlocksWith('__cell-link')} to={columnValue.url}>
                      {columnValue.label}
                    </Link>
                  </div>
                );
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
                data-short={getShortValue(columnValue)}
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
