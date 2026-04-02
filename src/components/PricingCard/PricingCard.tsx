import React, { FC } from 'react';
import classNames from 'classnames';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { Link } from '@app/components/Link';
import {
  createBemBlockBuilder,
  PlanType,
  formatNumberWithCommas,
  isAbsoluteURL,
  formatTextFromContentfulTextFieldWithLineBreaks,
  OfferingPlanDto,
} from '@app/utils';
import ArrowIcon from '@app/svg/arrow.inline.svg';

import './PricingCard.scss';

interface PricingCardProps {
  plan: OfferingPlanDto;
  planType: PlanType;
  listItems?: string[];
  dataGtm?: string;
  isDiamond?: boolean;
  isFullWidth?: boolean;
}

const getBlocksWith = createBemBlockBuilder(['pricing-card']);

export const PricingCard: FC<PricingCardProps> = ({
  plan,
  listItems,
  planType,
  isFullWidth,
  dataGtm,
  isDiamond = false,
}) => {
  const href = plan.cta.link.url;
  const currency = plan.price?.currency;
  const price = plan.price?.[planType] as number;

  return (
    <div className={classNames(getBlocksWith(), { [getBlocksWith('--full-width')]: isFullWidth })}>
      <div>
        {plan.isPopular && <div className={getBlocksWith('__popular')}>Top choice</div>}
        {isDiamond && <div className={getBlocksWith('__diamond')} />}
        {plan.title && <div className={getBlocksWith('__title')}>{plan.title}</div>}
        {plan.description && (
          <div className={getBlocksWith('__description')}>
            {formatTextFromContentfulTextFieldWithLineBreaks(plan.description)}
          </div>
        )}
        {listItems && (
          <ul>
            {listItems.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {plan.features && (
          <div className={getBlocksWith('__features')}>
            {renderRichText(plan.features, {
              renderNode: {},
            })}
          </div>
        )}
      </div>
      <div className={getBlocksWith('__bottom-panel')}>
        <div className={getBlocksWith('__price')}>
          {plan.pricingInfo ? (
            <span className={getBlocksWith('__price-value')}>{plan.pricingInfo}</span>
          ) : (
            <>
              <span className={getBlocksWith('__price-value')}>
                {currency}
                {formatNumberWithCommas(price)}
                {isDiamond && '+'}
              </span>
              <div className={getBlocksWith('__price-period')}>
                for package per {plan.price?.period}
              </div>
            </>
          )}
        </div>
        <Link
          className={classNames('btn', `btn--${plan.cta.type}`, 'btn--large')}
          to={plan.isContactUsURLEndsWithPlanType ? `${href}/${planType}` : href}
          {...(dataGtm && { 'data-gtm': dataGtm })}
        >
          {plan.cta.link.title}
          {isAbsoluteURL(href) && <ArrowIcon />}
        </Link>
      </div>
    </div>
  );
};
