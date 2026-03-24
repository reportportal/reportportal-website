import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { BREADCRUMBS } from '@app/components/StructuredData';
import { SaasPage } from '@app/containers/SassPage';
import { SEO_DATA } from '@app/utils';

const Saas: FC = () => (
  <Layout className="offer-page-wrapper saas-page-wrapper">
    <SaasPage />
  </Layout>
);

export default Saas;

export const Head = () => {
  const { title, description } = SEO_DATA.saas;

  return (
    <Seo
      title={title}
      description={description}
      breadcrumbs={[BREADCRUMBS.home, BREADCRUMBS.pricing, BREADCRUMBS.pricingSaas]}
    />
  );
};
