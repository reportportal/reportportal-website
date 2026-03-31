import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { BREADCRUMBS, JsonLd, productSchema, faqPageSchema } from '@app/components/StructuredData';
import { OnPremisesPage } from '@app/containers/OnPremisesPage';
import {
  ON_PREMISES_FAQ_SCHEMA_ITEMS,
  ON_PREMISES_OFFERS,
} from '@app/containers/OnPremisesPage/constants';
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
    <>
      <Seo
        title={title}
        description={description}
        breadcrumbs={[BREADCRUMBS.home, BREADCRUMBS.pricing, BREADCRUMBS.pricingOnPremises]}
      />
      <JsonLd
        data={productSchema({
          name: 'ReportPortal On-Premises',
          description:
            'Self-hosted AI-powered test automation dashboard with flexible on-premises pricing plans and professional services',
          url: '/pricing/on-premises/',
          offers: ON_PREMISES_OFFERS,
        })}
      />
      <JsonLd data={faqPageSchema(ON_PREMISES_FAQ_SCHEMA_ITEMS)} />
    </>
  );
};
