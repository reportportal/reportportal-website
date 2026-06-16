import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { FeaturesPage } from '@app/containers/FeaturesPage';
import { SEO_DATA } from '@app/utils';

const Features: FC = () => (
  <Layout className="features-page-layout">
    <FeaturesPage />
  </Layout>
);

export default Features;

export const Head = () => {
  const { title, description } = SEO_DATA.features;

  return <Seo title={title} description={description} />;
};
