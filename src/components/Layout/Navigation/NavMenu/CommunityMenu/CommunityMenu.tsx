import React, { FC } from 'react';
import classNames from 'classnames';
import { SubscriptionForm } from '@app/components/SubscriptionForm';
import { useMenuList } from '@app/hooks/useMenuList';
import { createBemBlockBuilder } from '@app/utils';

import { COMMUNITY_LIST } from './constants';
import { MenuProps } from '../../constants';
import GithubCover from '../covers/github.inline.svg';
import { SectionList } from '../SectionList';
import { SectionCard } from '../SectionCard';

import '../Menu.scss';

const getBlocksWith = createBemBlockBuilder(['menu-dialog', 'menu-dialog-community']);

export const CommunityMenu: FC<MenuProps> = ({ isDesktop = true, isOpen, menuContainerRef }) => {
  const { communities } = useMenuList();

  const generalList = (
    <SectionList
      showTitle={false}
      className="general-list"
      itemsPerRow={2}
      items={COMMUNITY_LIST}
    />
  );

  const contributionCard = (
    <SectionCard className="contribution-card" title="Github Contribution" cover={<GithubCover />}>
      {generalList}
    </SectionCard>
  );

  const communityList = (
    <SectionList
      className={classNames('community-list', { 'section-list-secondary': isDesktop })}
      title="Our social medias"
      items={communities}
    />
  );

  const footer = (
    <div className={classNames(getBlocksWith('__footer'))}>
      <div className={getBlocksWith('__footer-container')}>
        <SubscriptionForm />
      </div>
    </div>
  );

  if (!isDesktop) {
    return (
      <div className={getBlocksWith()}>
        {generalList}
        {communityList}
      </div>
    );
  }

  return (
    <div hidden={!isOpen} ref={menuContainerRef} className={getBlocksWith()}>
      <div className={getBlocksWith('__body')}>
        <div className={getBlocksWith('__body-row')}>
          <div className={getBlocksWith('__body-col--lf')}>{contributionCard}</div>
          <div className={getBlocksWith('__body-col--rt', '__body-col--flex-column')}>
            {communityList}
          </div>
        </div>
      </div>
      {footer}
    </div>
  );
};
