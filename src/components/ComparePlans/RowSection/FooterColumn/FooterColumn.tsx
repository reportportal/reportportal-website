import React, { FC } from 'react';
import classNames from 'classnames';
import { Link } from '@app/components/Link';
import { ComparePlanCell, createBemBlockBuilder, FormattedComparePlansDto } from '@app/utils';
import LinkArrow from '@app/svg/externalLinkArrow.inline.svg';

import '../../ComparePlans.scss';
import '../RowSection.scss';

interface FooterColumnsProps {
  note: string;
  ctas: FormattedComparePlansDto['ctas'];
  planNames: ComparePlanCell[];
}

const getBlocksWith = createBemBlockBuilder(['row-section']);
const getBlocksWithCompare = createBemBlockBuilder(['compare']);

// The table header can stay terse — the column it labels makes the context
// obvious. A label floating above a button cannot, so it spells out "plan".
// Guarded in case an editor ever puts the word in the Contentful column itself.
const withPlanSuffix = (name: string) => (/\bplans?$/i.test(name.trim()) ? name : `${name} plan`);

export const FooterColumn: FC<FooterColumnsProps> = ({ ctas, note, planNames }) => (
  <div className={getBlocksWith('', '__container')}>
    <div className={getBlocksWithCompare('__row-title-wrapper')}>
      <div className={getBlocksWith('__row-title', '__row-title-footer')}>
        <Link to="/legal/terms/">
          Terms & Conditions <LinkArrow />
        </Link>
        <div>{note}</div>
      </div>
      <div className={getBlocksWithCompare('__row-title-cols', '__row-title-cols-visible')}>
        {ctas.map(({ link, type }, index) => (
          <div key={link.url} className={getBlocksWithCompare('__row-title-col')}>
            {/* Below desktop the table is a single column with no standing plan
                headers, so a bare row of buttons would not say which plan each
                one belongs to. The label is redundant on desktop, where the
                button already sits under its own column, and is hidden there. */}
            {planNames[index] !== undefined && (
              <div className={getBlocksWith('__button-plan')}>
                {withPlanSuffix(String(planNames[index]))}
              </div>
            )}
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
