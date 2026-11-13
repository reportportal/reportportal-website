import React, { FC } from 'react';
import { Collapse, CollapseProps } from 'antd';
import classNames from 'classnames';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder, DOCUMENTATION_URL, iconsCommon } from '@app/utils';

import ArrowIcon from '../../svg/arrow.inline.svg';

import './Faq.scss';

interface FaqProps {
  items: CollapseProps['items'];
  titleId?: string;
  documentationLink?: string;
  showMoreInfoLink?: boolean;
}

const getBlocksWith = createBemBlockBuilder(['faq']);

export const Faq: FC<FaqProps> = ({
  items,
  titleId,
  documentationLink = `${DOCUMENTATION_URL}/FAQ/`,
  showMoreInfoLink = true,
}) => (
  <div className={classNames('container', getBlocksWith())}>
    <div className={getBlocksWith('__heading')}>
      <h2 id={titleId}>Frequently asked questions</h2>
    </div>
    <div className={getBlocksWith('__content')}>
      <Collapse
        items={items}
        defaultActiveKey={['1']}
        size="large"
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <img
            className={classNames(getBlocksWith('__expand-icon'), {
              [getBlocksWith('__expand-icon--active')]: isActive,
            })}
            src={iconsCommon.arrowLight}
            alt={isActive ? 'Collapse' : 'Expand'}
          />
        )}
      />
    </div>
    {showMoreInfoLink && (
      <div className={getBlocksWith('__link')}>
        <p>
          More information on the link to our
          <Link className={getBlocksWith('__link-documentation')} to={documentationLink}>
            Documentation
            <ArrowIcon />
          </Link>
        </p>
      </div>
    )}
  </div>
);
