import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { BREADCRUMBS } from '@app/components/StructuredData';
import { OnPremisesPage } from '@app/containers/OnPremisesPage';
import { SEO_DATA } from '@app/utils';

const OnPremises: FC = () => (
  <Layout className="offer-page-wrapper">
    <OnPremisesPage />
  </Layout>
);

export default OnPremises;

export const Head = () => {
  const { title, description } = SEO_DATA.onPremises;

  return (
    <Seo
      title={title}
      description={description}
      breadcrumbs={[BREADCRUMBS.home, BREADCRUMBS.pricing, BREADCRUMBS.pricingOnPremises]}
    />
  );
};
