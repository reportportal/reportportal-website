import React, { FC, useEffect, useRef, useState } from 'react';
import { useMediaQuerySafe } from '@app/hooks/useMediaQuerySafe';
import { Collapse } from 'antd';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES } from '@contentful/rich-text-types';
import classNames from 'classnames';
import {
  createBemBlockBuilder,
  FormattedComparePlansDto,
  FormattedComparePlansItemDto,
  iconsCommon,
  MEDIA_DESKTOP_SM,
} from '@app/utils';
import { Link } from '@app/components/Link';
import { Directions, useScrollDirection } from '@app/hooks/useScrollDirection';
import LinkArrow from '@app/svg/externalLinkArrow.inline.svg';

import { Columns } from './Columns';
import { FooterColumn, RowSection } from './RowSection';
import { ROW_BADGES } from './constants';

import './ComparePlans.scss';

interface ComparePlansProps {
  plans: FormattedComparePlansDto;
  isCollapsibleOnMobile?: boolean;
}

const getBlocksWith = createBemBlockBuilder(['compare']);

// Warn once per process, not once per render.
let hasCheckedBadgeKeys = false;

/**
 * ROW_BADGES is keyed by the row name an editor types in Contentful, so a rename
 * there silently drops a badge — which is exactly what happened to LDAP.
 *
 * Called from the render body rather than an effect on purpose: effects do not
 * run during server rendering, so an effect-based check could only ever fire in
 * a browser. This way `gatsby build` prints it too, and a missed rename shows up
 * in the build log before it reaches staging. Silent in the browser bundle.
 */
const checkBadgeKeys = (sections: FormattedComparePlansDto['sections']) => {
  if (
    hasCheckedBadgeKeys ||
    (process.env.NODE_ENV === 'production' && typeof window !== 'undefined')
  ) {
    return;
  }

  hasCheckedBadgeKeys = true;

  const names = new Set(sections.flatMap(section => section.items.map(item => item.name)));
  const orphans = Object.keys(ROW_BADGES).filter(name => !names.has(name));

  if (orphans.length) {
    // eslint-disable-next-line no-console
    console.warn(
      `[ComparePlans] These badge keys match no row and render nothing: ${orphans.join(
        ', ',
      )}. Renamed in Contentful? See src/components/ComparePlans/constants.ts`,
    );
  }
};

export const ComparePlans: FC<ComparePlansProps> = ({
  plans: { sections, columns, ctas, note },
  isCollapsibleOnMobile = true,
}) => {
  const isDesktop = useMediaQuerySafe(MEDIA_DESKTOP_SM);
  const { Panel } = Collapse;
  const [featureColumn, ...plansColumns] = columns;

  // The site navigation hides on scroll down and slides back on scroll up, so a
  // sticky header pinned to top: 0 would end up underneath it. Reuse the same
  // signal the navigation uses rather than adding a second scroll listener.
  const isNavigationVisible = useScrollDirection({ isMenuOpen: false }) === Directions.UP;

  // In place the header should be indistinguishable from the page — a grey band
  // sitting above the card is noise. The tint is only there to keep the column
  // names legible once they overlap the rows, so it fades in when the header
  // actually sticks. A 1px sentinel at the header's resting position tells us
  // when that happens without a scroll listener.
  const headerSentinelRef = useRef<HTMLDivElement>(null);
  const [isHeaderStuck, setIsHeaderStuck] = useState(false);

  useEffect(() => {
    const sentinel = headerSentinelRef.current;

    if (!sentinel || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => setIsHeaderStuck(!entry.isIntersecting));

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [isDesktop]);

  const expandIcon = ({ isActive }: { isActive?: boolean }) => (
    <img
      className={getBlocksWith(isActive ? '__tab--arrow-bottom' : '__tab--arrow-right')}
      src={iconsCommon.arrowDark}
      alt={isActive ? 'Collapse' : 'Expand'}
    />
  );

  checkBadgeKeys(sections);

  const getRowKey = (sectionIndex: number, itemIndex: number) =>
    `${sections[sectionIndex].title}${sections[sectionIndex].items[itemIndex].name}`;

  const renderRow = (row: FormattedComparePlansItemDto, key: string) => {
    return (
      <Panel
        forceRender
        key={key}
        showArrow
        header={
          <div className={getBlocksWith('__row')}>
            <Columns title={row.name} cols={row.plans} />
          </div>
        }
      >
        <div className={getBlocksWith('__content')}>
          <div
            className={classNames(getBlocksWith('__description'), {
              [getBlocksWith('__description-full-width')]: isDesktop,
            })}
          >
            {renderRichText(row.description, {
              renderNode: {
                // eslint-disable-next-line react/no-multi-comp
                [INLINES.HYPERLINK]: (node, children) => (
                  <Link className={getBlocksWith('__description-anchor')} to={node.data.uri}>
                    {children}
                    <LinkArrow />
                  </Link>
                ),
              },
            })}
          </div>
          {/* Only below desktop. On desktop the plan values already sit in the
              collapsed row, so Columns renders nothing here — but the wrappers
              still contributed 40px of collapsed margin under the description,
              which is what made the gap below it larger than the one above. */}
          {!isDesktop && (
            <div className={getBlocksWith('__tab-data')}>
              <div className={getBlocksWith('__tab-header')}>
                <Columns cols={plansColumns} />
              </div>
              <div className={getBlocksWith('__tab-data-last-item')}>
                <Columns cols={row.plans} />
              </div>
            </div>
          )}
        </div>
      </Panel>
    );
  };

  const comparePlans = (
    <>
      {isDesktop && (
        <>
          <div ref={headerSentinelRef} className={getBlocksWith('__tab-header-sentinel')} />
          <div
            className={classNames(getBlocksWith('__tab-header'), {
              [getBlocksWith('__tab-header--below-nav')]: isNavigationVisible,
              [getBlocksWith('__tab-header--stuck')]: isHeaderStuck,
            })}
          >
            <Columns title={featureColumn} cols={plansColumns} />
          </div>
        </>
      )}
      <div className={getBlocksWith('__container')}>
        {/* The section chevron follows the heading text the way the "Compare
            plans" title's arrow does, instead of sitting at the far right edge
            where it reads as belonging to the plan columns. The icon is placed
            after the text by antd; SCSS shrinks the text box so the two end up
            side by side. Desktop sections render no arrow at all, so this only
            affects tablet and mobile. */}
        <Collapse
          defaultActiveKey={sections.map(section => section.title)}
          ghost
          expandIconPosition="end"
          expandIcon={expandIcon}
        >
          {/* Below desktop the table is a long single column, so a section can be
              folded away. On desktop it stays what it was — a heading above its
              rows — because the whole grid is visible at once and collapsing it
              would only hide what the reader came to compare. Sections start
              open either way, so nothing is hidden by default. */}
          {sections.map((section, sectionIndex) => (
            <Panel
              forceRender
              key={section.title}
              showArrow={!isDesktop}
              collapsible={isDesktop ? 'disabled' : undefined}
              header={<RowSection title={section.title} />}
            >
              <Collapse
                className={getBlocksWith('__section-rows')}
                defaultActiveKey={sectionIndex === 0 ? [getRowKey(0, 0)] : []}
                ghost
                expandIconPosition={isDesktop ? 'start' : 'end'}
                expandIcon={expandIcon}
              >
                {section.items.map((item, itemIndex) =>
                  renderRow(item, getRowKey(sectionIndex, itemIndex)),
                )}
              </Collapse>
            </Panel>
          ))}
          <Panel
            key="Footer"
            showArrow={false}
            collapsible="disabled"
            header={<FooterColumn note={note} ctas={ctas} planNames={plansColumns} />}
          />
        </Collapse>
      </div>
    </>
  );

  const isCollapsable = !isDesktop && isCollapsibleOnMobile;

  return (
    <div
      className={classNames(getBlocksWith(), {
        [getBlocksWith('-narrow')]: plansColumns.length === 4,
      })}
    >
      <div className="container">
        {!isCollapsable ? (
          <>
            <div className={getBlocksWith('__title')}>Compare plans</div>
            {comparePlans}
          </>
        ) : (
          <Collapse
            ghost
            expandIconPosition="end"
            prefixCls="ant-tablet"
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => (
              <img
                className={classNames(getBlocksWith('__title-arrow'), {
                  [classNames(getBlocksWith('__title-arrow--active'))]: isActive,
                })}
                src={iconsCommon.arrowDark}
                alt={isActive ? 'Collapse' : 'Expand'}
              />
            )}
            items={[
              {
                label: 'Compare plans',
                key: 1,
                children: comparePlans,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};
