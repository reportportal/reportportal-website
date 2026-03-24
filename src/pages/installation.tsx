import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { BREADCRUMBS } from '@app/components/StructuredData';
import { InstallationPage } from '@app/containers/InstallationPage';
import { SEO_DATA } from '@app/utils';

const Installation: FC = () => (
  <Layout>
    <InstallationPage />
  </Layout>
);

export default Installation;

export const Head = () => {
  const { title, description } = SEO_DATA.installation;

  return (
    <Seo
      title={title}
      description={description}
      breadcrumbs={[BREADCRUMBS.home, BREADCRUMBS.installation]}
    />
  );
};
