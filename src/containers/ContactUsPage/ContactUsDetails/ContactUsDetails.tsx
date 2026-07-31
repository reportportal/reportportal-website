import React, { FC, Fragment } from 'react';
import { useLocation } from '@gatsbyjs/reach-router';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import {
  ContactUsConfig,
  createBemBlockBuilder,
  formatNumberWithCommas,
  formatTextFromContentfulRichTextFieldWithLineBreaks,
} from '@app/utils';

import '../ContactUsPage.scss';

const getBlocksWith = createBemBlockBuilder(['contact-us']);

// TODO: remove once Contentful content is updated
const TEMP_GENERAL_MESSAGE = (
  <>
    <p>Ready to connect? Find the right option for your needs:</p>
    <ul>
      <li>
        <p>
          <strong>Request a Demo</strong> — get a personalized walkthrough of ReportPortal.
        </p>
      </li>
      <li>
        <p>
          <strong>Pricing details</strong> — find a plan that fits your team&apos;s scale and needs.
        </p>
      </li>
      <li>
        <p>
          <strong>Free Trial</strong> — get hands-on with ReportPortal, no commitment required.
        </p>
      </li>
      <li>
        <p>
          <strong>Technical Support</strong> — get help from our team with setup or integration.
        </p>
      </li>
    </ul>
  </>
);

export const ContactUsDetails: FC<
  Pick<ContactUsConfig, 'planType' | 'price' | 'message' | 'messagePosition' | 'showBillingPeriod'>
> = ({ message, messagePosition, price, planType, showBillingPeriod }) => {
  const { pathname } = useLocation();
  // Limit the hardcoded fallback to the /contact-us/general page only, so it
  // doesn't override the CMS message on other no-planType pages (qasp, taas…).
  const isGeneralContact = pathname.includes('/contact-us/general');

  const priceInfo =
    planType && price && price[planType] ? (
      <p>
        <span>
          <strong>Price:</strong> {price.currency}
          {formatNumberWithCommas(price[planType] as number)} per {price.period}
          {showBillingPeriod ? ` (billed ${planType})` : '.'}
        </span>
      </p>
    ) : null;

  // TODO: remove TEMP_GENERAL_MESSAGE condition once Contentful content is updated
  const messageInfo =
    !planType && !priceInfo && isGeneralContact
      ? TEMP_GENERAL_MESSAGE
      : renderRichText(message, {
          renderText: formatTextFromContentfulRichTextFieldWithLineBreaks,
        });

  const isMessageAtTop = messagePosition === 'top';
  const detailsInfo = isMessageAtTop ? [messageInfo, priceInfo] : [priceInfo, messageInfo];

  return (
    <div className={getBlocksWith('__details')}>
      {detailsInfo.map((info, index) => (
        <Fragment key={index}>{info}</Fragment>
      ))}
    </div>
  );
};
