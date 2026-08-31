import React, { FC } from 'react';
import { ArrowLink } from '@app/components/ArrowLink';
import { useMenuList } from '@app/hooks/useMenuList';
import { createBemBlockBuilder, DOCUMENTATION_URL } from '@app/utils';

import { MenuProps } from '../../constants';
import { SectionList } from '../SectionList';
import { GENERAL_LIST, FEATURES_LIST } from './constants';

import '../Menu.scss';
import './ProductMenu.scss';

export const ProductMenu: FC<MenuProps> = ({ isDesktop = true, isOpen, menuContainerRef }) => {
  const getBlocksWith = createBemBlockBuilder(['menu-dialog', 'menu-dialog-product']);
  const { integrations } = useMenuList();

  const generalList = (
    <SectionList
      className="general-list"
      title="General"
      itemsPerRow={isDesktop ? 1 : 2}
      items={GENERAL_LIST}
    />
  );

  const featuresList = (
    <SectionList
      className="features-list"
      title="Features"
      itemsPerRow={isDesktop ? 3 : 6}
      items={FEATURES_LIST}
    />
  );

  const integrationsList = (
    <SectionList
      className="integrations-list"
      title="Integrations"
      items={integrations}
      mode="secondary"
    />
  );

  if (!isDesktop) {
    return (
      <div className={getBlocksWith()}>
        {generalList}
        {featuresList}
        <ArrowLink to="/features/" text="See all features" />
      </div>
    );
  }

  return (
    <div hidden={!isOpen} ref={menuContainerRef} className={getBlocksWith()}>
      <div className={getBlocksWith('__body-row')}>
        <div className={getBlocksWith('__body-col--lf')}>
          {generalList}
          {featuresList}
          <div>
            <ArrowLink to="/features/" text="See all features" />
          </div>
        </div>
        <div className={getBlocksWith('__body-col--rt', '__body-col--flex-column')}>
          {integrationsList}
          <div>
            <ArrowLink to={`${DOCUMENTATION_URL}/plugins/`} text="See all integrations" />
          </div>
        </div>
      </div>
    </div>
  );
};
