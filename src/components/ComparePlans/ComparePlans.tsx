import React, { FC, Fragment } from 'react';
import { useMediaQuerySafe } from '@app/hooks/useMediaQuerySafe';
import { Collapse } from 'antd';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES } from '@contentful/rich-text-types';
import { size } from 'lodash';
import classNames from 'classnames';
import {
  createBemBlockBuilder,
  FormattedComparePlansDto,
  FormattedComparePlansItemDto,
  iconsCommon,
  MEDIA_DESKTOP_SM,
} from '@app/utils';
import { Link } from '@app/components/Link';

import { Columns } from './Columns';
import { FooterColumn, RowSection } from './RowSection';

import './ComparePlans.scss';

interface ComparePlansProps {
  plans: FormattedComparePlansDto;
  isCollapsibleOnMobile?: boolean;
}

const getBlocksWith = createBemBlockBuilder(['compare']);

export const ComparePlans: FC<ComparePlansProps> = ({
  plans: { sections, columns, ctas, note },
  isCollapsibleOnMobile = true,
}) => {
  const isDesktop = useMediaQuerySafe(MEDIA_DESKTOP_SM);
  const { Panel } = Collapse;
  const [featureColumn, ...plansColumns] = columns;

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
                  </Link>
                ),
              },
            })}
          </div>
          <div className={getBlocksWith('__tab-data')}>
            {!isDesktop && (
              <div className={getBlocksWith('__tab-header')}>
                <Columns cols={plansColumns} />
              </div>
            )}
            <div className={getBlocksWith('__tab-data-last-item')}>
              <Columns cols={row.plans} />
            </div>
          </div>
        </div>
      </Panel>
    );
  };

  const comparePlans = (
    <>
      {isDesktop && (
        <div className={getBlocksWith('__tab-header')}>
          <Columns title={featureColumn} cols={plansColumns} />
        </div>
      )}
      <div className={getBlocksWith('__container')}>
        <Collapse
          defaultActiveKey={[getRowKey(0, 0)]}
          ghost
          expandIconPosition={isDesktop ? 'start' : 'end'}
          expandIcon={({ isActive }) => (
            <img
              className={getBlocksWith(isActive ? '__tab--arrow-bottom' : '__tab--arrow-right')}
              src={iconsCommon.arrowDark}
              alt={isActive ? 'Collapse' : 'Expand'}
            />
          )}
        >
          {sections.map((section, sectionIndex) => (
            <Fragment key={sectionIndex}>
              {((isDesktop && sectionIndex !== 0) || (!isDesktop && size(sections) > 1)) && (
                <Panel
                  forceRender
                  key={section.title}
                  showArrow={false}
                  collapsible="disabled"
                  header={<RowSection title={section.title} />}
                />
              )}
              {section.items.map((item, itemIndex) =>
                renderRow(item, getRowKey(sectionIndex, itemIndex)),
              )}
            </Fragment>
          ))}
          <Panel
            key="Footer"
            showArrow={false}
            collapsible="disabled"
            header={<FooterColumn note={note} ctas={ctas} />}
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
            <div className={getBlocksWith('__title')}>Compare packages</div>
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
