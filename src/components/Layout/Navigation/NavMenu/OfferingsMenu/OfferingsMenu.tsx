import React, { FC } from 'react';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder } from '@app/utils';
import { useMenuList } from '@app/hooks/useMenuList';

import { MenuProps } from '../../constants';
import { SectionList } from '../SectionList';
import { PRICING_CONFIG, SERVICE_LIST } from './constants';

import '../Menu.scss';
import './OfferingsMenu.scss';

export const OfferingsMenu: FC<MenuProps> = ({ isDesktop = true, isOpen, menuContainerRef }) => {
  const { pricing } = useMenuList();

  const getBlocksWith = createBemBlockBuilder(['menu-dialog', 'menu-dialog-offerings']);

  const pricingList = (
    <SectionList className="pricing-list" title="ReportPortal Pricing" items={PRICING_CONFIG} />
  );

  const servicesList = (
    <SectionList className="services-list" title="Services" items={SERVICE_LIST} />
  );

  const pricingForSolutionsList = (
    <SectionList
      className="pricing-solutions-list"
      title="Pricing for Solutions"
      items={pricing}
      mode={isDesktop ? 'secondary' : 'primary'}
    />
  );

  if (!isDesktop) {
    return (
      <div className={getBlocksWith()}>
        {pricingList}
        {servicesList}
        {pricingForSolutionsList}
      </div>
    );
  }

  return (
    <div hidden={!isOpen} ref={menuContainerRef} className={getBlocksWith()}>
      <div className={getBlocksWith('__body')}>
        <div className={getBlocksWith('__body-row')}>
          <div className={getBlocksWith('__body-col--lf')}>
            <div className="row">
              {pricingList}
              {servicesList}
            </div>
            <div className={getBlocksWith('__cta')}>
              <Link
                className="btn btn--outline"
                to="/contact-us/pricing-for-solutions/"
                data-gtm="get_a_quote_pricing"
              >
                Contact us
              </Link>
              <span>Customize your plan and unlock the benefits! Get your quote now.</span>
            </div>
          </div>
          <div className={getBlocksWith('__body-col--rt', '__body-col--flex-column')}>
            {pricingForSolutionsList}
          </div>
        </div>
      </div>
    </div>
  );
};
