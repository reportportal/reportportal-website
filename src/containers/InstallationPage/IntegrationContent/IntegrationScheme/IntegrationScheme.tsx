import React, { FC } from 'react';
import classNames from 'classnames';
import { useMediaQuerySafe } from '@app/hooks/useMediaQuerySafe';
import { useToggle } from 'ahooks';
import { Divider } from 'antd';
import { createBemBlockBuilder, MEDIA_TABLET_SM } from '@app/utils';

import { SchemeRow } from './SchemeRow';
import { SchemeHeader } from './SchemeHeader';
import { Arrow } from './Arrow';
import { SCHEME_DATA } from './constants';

import '../../InstallationPage.scss';
import './IntegrationScheme.scss';

const getGeneralBlocksWith = createBemBlockBuilder(['installation']);
const getBlocksWith = createBemBlockBuilder(['scheme']);

export const IntegrationScheme: FC = () => {
  const [collapsedScheme, { toggle: toggleCollapsedSchemeState }] = useToggle(true);
  const isDesktop = useMediaQuerySafe(MEDIA_TABLET_SM);

  return (
    <div className={getGeneralBlocksWith('__container')}>
      <div className={getGeneralBlocksWith('__wrapper')}>
        <div className={getGeneralBlocksWith('__chapter')}>Step 3</div>
        <h3 className={getGeneralBlocksWith('__title-content')}>
          Integrate with your test framework
        </h3>
        <p>Integration scheme:</p>

        <Divider className={getBlocksWith('__divider')} />

        {isDesktop && (
          <>
            <SchemeHeader state={collapsedScheme} />
            <div
              className={classNames(getBlocksWith(), {
                [getBlocksWith('__collapse')]: collapsedScheme,
              })}
            >
              <div className={getBlocksWith('__container')}>
                {SCHEME_DATA.map(({ cells, row }) => (
                  <SchemeRow key={row} portion={cells} row={row} lastRow={SCHEME_DATA.length} />
                ))}
              </div>
            </div>
          </>
        )}

        {!isDesktop && <div className={getBlocksWith('__mocked')} />}

        <div className="collapse__btn">
          {isDesktop && (
            <div className="collapse__btn-inner" onClick={toggleCollapsedSchemeState}>
              <Arrow state={!collapsedScheme}>
                <p>{collapsedScheme ? 'Extended scheme' : 'See less'}</p>
              </Arrow>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
