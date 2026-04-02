import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { ServicePackagesPage } from '@app/containers/ServicePackagesPage';
import { SEO_DATA } from '@app/utils';

const ServicePackages: FC = () => (
  <Layout className="offer-page-wrapper">
    <ServicePackagesPage />
  </Layout>
);

export default ServicePackages;

export const Head = () => {
  const { title, description } = SEO_DATA.servicePackages;

  return <Seo title={title} description={description} />;
};
