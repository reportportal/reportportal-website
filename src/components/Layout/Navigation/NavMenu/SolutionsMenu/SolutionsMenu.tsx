import React, { FC } from 'react';
import classNames from 'classnames';
import { Link } from '@app/components/Link';
import { useMenuList } from '@app/hooks/useMenuList';
import { createBemBlockBuilder } from '@app/utils';

import CaseStudiesCover from '../covers/case-studies.inline.svg';
import { LinkList } from '../LinkList';
import { SectionCard } from '../SectionCard';

import '../Menu.scss';
import './SolutionsMenu.scss';

interface SolutionsMenuProps {
  isDesktop: boolean;
  isOpen: boolean;
  menuContainerRef: string;
}

const getBlocksWith = createBemBlockBuilder(['menu-dialog']);

export const SolutionsMenu: FC<SolutionsMenuProps> = ({
  isDesktop = true,
  isOpen,
  menuContainerRef,
}) => {
  const { solutions } = useMenuList();

  const solutionsList = (
    <LinkList
      className="solutions-list"
      showTitle={isDesktop}
      title="Our Solutions"
      items={solutions}
    />
  );

  const caseStudiesCard = (
    <SectionCard
      className="solutions-card"
      title="Case Studies"
      cover={<CaseStudiesCover />}
      text="Featured customers' stories where ReportPortal shines the best."
    >
      <div className={classNames(getBlocksWith('__btn-group'), 'full-width')}>
        <Link className="btn btn--outline full-width" to="/case-studies/">
          Explore Case Studies
        </Link>
      </div>
    </SectionCard>
  );

  if (!isDesktop) {
    return <div className={getBlocksWith()}>{solutionsList}</div>;
  }

  return (
    <div hidden={!isOpen} ref={menuContainerRef} className={getBlocksWith()}>
      <div>
        <div className={getBlocksWith('__body-row')}>
          <div className={getBlocksWith('__body-col--lf')}>{solutionsList}</div>
          <div className={getBlocksWith('__body-col--rt', '__body-col--card')}>
            {caseStudiesCard}
          </div>
        </div>
      </div>
    </div>
  );
};
