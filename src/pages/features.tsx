import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { BREADCRUMBS, JsonLd, productSchema, faqPageSchema } from '@app/components/StructuredData';
import { FeaturesPage } from '@app/containers/FeaturesPage';
import { FEATURES_FAQ_SCHEMA_ITEMS } from '@app/containers/FeaturesPage/constants';
import { SEO_DATA } from '@app/utils';

const Features: FC = () => (
  <Layout className="features-page-layout">
    <FeaturesPage />
  </Layout>
);

export default Features;

export const Head = () => {
  const { title, description } = SEO_DATA.features;

  return (
    <>
      <Seo
        title={title}
        description={description}
        breadcrumbs={[BREADCRUMBS.home, BREADCRUMBS.features]}
      />
      <JsonLd
        data={productSchema({
          name: 'ReportPortal',
          description:
            'AI-powered test automation dashboard and reporting platform for seamless test automation with automated defect triaging and dynamic QA metrics',
          url: '/features/',
        })}
      />
      <JsonLd data={faqPageSchema(FEATURES_FAQ_SCHEMA_ITEMS)} />
    </>
  );
};
