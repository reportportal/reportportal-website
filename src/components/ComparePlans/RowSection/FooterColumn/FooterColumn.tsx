import React, { FC } from 'react';
import classNames from 'classnames';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder, FormattedComparePlansDto } from '@app/utils';
import LinkArrow from '@app/svg/externalLinkArrow.inline.svg';

import '../../ComparePlans.scss';
import '../RowSection.scss';

interface FooterColumnsProps {
  note: string;
  ctas: FormattedComparePlansDto['ctas'];
}

const getBlocksWith = createBemBlockBuilder(['row-section']);
const getBlocksWithCompare = createBemBlockBuilder(['compare']);

export const FooterColumn: FC<FooterColumnsProps> = ({ ctas, note }) => (
  <div className={getBlocksWith('', '__container')}>
    <div className={getBlocksWithCompare('__row-title-wrapper')}>
      <div className={getBlocksWith('__row-title', '__row-title-footer')}>
        <Link to="/legal/terms/">
          Terms & Conditions <LinkArrow />
        </Link>
        <div>{note}</div>
      </div>
      <div className={getBlocksWithCompare('__row-title-cols', '__row-title-cols-visible')}>
        {ctas.map(({ link, type }) => (
          <div key={link.url} className={getBlocksWithCompare('__row-title-col')}>
            <div className={getBlocksWith('__buttons-wrapper')}>
              <Link
                className={classNames('btn', `btn--${type}`, getBlocksWith('__button'))}
                to={link.url}
              >
                {link.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
