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

  // Contentful has held a per-period caption for the price since the fields were
  // added, but the component ignored it and printed a hardcoded string instead.
  // It is the only place that can say "billed quarterly" next to the number —
  // without it the card shows $569 while the first invoice is three times that.
  const priceCaption = plan.price?.[`${planType}Description`];

  // The yearly rate is a discount off the quarterly one, so show what it saves.
  // Written as a comparison rather than a truthy check: Service Packages store
  // quarterly: 0, and every other page shares this component.
  const previousPrice =
    planType === 'yearly' && Number(plan.price?.quarterly) > Number(plan.price?.yearly)
      ? plan.price?.quarterly
      : undefined;

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
              {previousPrice && (
                <span className={getBlocksWith('__price-previous')}>
                  {currency}
                  {formatNumberWithCommas(previousPrice)}
                </span>
              )}
              <span className={getBlocksWith('__price-value')}>
                {currency}
                {formatNumberWithCommas(price)}
                {isDiamond && '+'}
              </span>
            </>
          )}
          {/* Always rendered, even with nothing to say. The bottom panel is
              anchored to the foot of the card, so a shorter caption pushes the
              price line down and the three cards stop lining up. A plan priced
              "Let's talk" has no `price` node to hold a caption at all — and it
              cannot get one without inventing a currency and an amount, since
              Contentful marks both required. Reserving the space here keeps the
              layout honest instead. */}
          <div className={getBlocksWith('__price-period')}>
            {priceCaption && formatTextFromContentfulTextFieldWithLineBreaks(priceCaption)}
            {!priceCaption && !plan.pricingInfo && `for package per ${plan.price?.period}`}
          </div>
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
