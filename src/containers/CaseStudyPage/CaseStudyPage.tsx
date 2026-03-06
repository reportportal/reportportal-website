import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import noop from 'lodash/noop';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { Link } from '@app/components/Link';
import { SubscriptionBanner } from '@app/components/SubscriptionBanner';
import { createBemBlockBuilder } from '@app/utils';
import { CaseStudyProps } from '@app/templates/case-study/case-study';

import { OPTIONS } from './constants';
import { ArrowLeft } from '../../svg/arrowLeft';
import DownloadIcon from '../../svg/download.inline.svg';

import './CaseStudyPage.scss';

const getBlocksWith = createBemBlockBuilder(['case-page']);

export const CaseStudyPage: FC<CaseStudyProps['contentfulCaseStudy']> = ({
  title,
  industry,
  challenges,
  highlights,
  benefitsResults,
}) => {
  useEffect(() => {
    function setupTable() {
      const tables = Array.from(document.querySelectorAll('table')).reverse();

      if (!tables.length) return;

      if (window.matchMedia('(min-width: 768px)').matches) {
        let counter = 0;

        tables.forEach((table, idx) => {
          const ulPrevHeight = table.previousElementSibling!.getBoundingClientRect().height;

          table.style.height = `${ulPrevHeight}px`;
          table.style.bottom = idx === 0 ? '0px' : `${counter}px`;

          counter += ulPrevHeight;
        });
      } else {
        tables.forEach(table => {
          table.style.height = 'initial';
        });
      }
    }

    setupTable();
    window.addEventListener('resize', setupTable);
    return () => window.removeEventListener('resize', setupTable);
  });

  return (
    <>
      <div className={getBlocksWith()}>
        <div className={getBlocksWith('__hero')}>
          <div className={classNames(getBlocksWith('__head'), 'container')}>
            <div className={getBlocksWith('__titles')}>
              <p className={getBlocksWith('__industry')}>{industry}</p>
              <h1 className={getBlocksWith('__title')}>{title}</h1>
            </div>
            <div className={getBlocksWith('__button-group')}>
              <Link
                className={classNames('btn btn--white btn--large', getBlocksWith('__back-to-list'))}
                to="/case-studies/"
              >
                <ArrowLeft />
                Back to Case Studies
              </Link>
              <a
                className={classNames(
                  'btn btn--white btn--large temporary-hide',
                  getBlocksWith('__download-pdf'),
                )}
                download
                onClick={noop}
              >
                <DownloadIcon />
                Download PDF version
              </a>
            </div>
          </div>
        </div>
        <div className={classNames(getBlocksWith('__case-body'), 'container')}>
          <div className={getBlocksWith('__case-columns')}>
            <div className={getBlocksWith('__challenges')}>
              <div className={getBlocksWith('__challenges--body')}>
                {challenges?.raw && renderRichText(challenges, OPTIONS)}
              </div>
            </div>
            <div className={getBlocksWith('__highlights')}>
              <div className={getBlocksWith('__highlights--body')}>
                {highlights?.raw && renderRichText(highlights, OPTIONS)}
              </div>
              {benefitsResults?.raw && (
                <div className={getBlocksWith('__benefits-results')}>
                  <div className={getBlocksWith('__benefits-results--body')}>
                    {renderRichText(benefitsResults, OPTIONS)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SubscriptionBanner />
    </>
  );
};
