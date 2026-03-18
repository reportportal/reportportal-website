import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { BREADCRUMBS, JsonLd, productSchema, faqPageSchema } from '@app/components/StructuredData';
import { SaasPage } from '@app/containers/SassPage';
import { SAAS_FAQ_SCHEMA_ITEMS, SAAS_OFFERS } from '@app/containers/SassPage/constants';
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
    <>
      <Seo
        title={title}
        description={description}
        breadcrumbs={[BREADCRUMBS.home, BREADCRUMBS.pricing, BREADCRUMBS.pricingSaas]}
      />
      <JsonLd
        data={productSchema({
          name: 'ReportPortal SaaS',
          description:
            'AI-powered test automation dashboard with flexible SaaS pricing plans from small teams to global enterprises',
          url: '/pricing/saas/',
          offers: SAAS_OFFERS,
        })}
      />
      <JsonLd data={faqPageSchema(SAAS_FAQ_SCHEMA_ITEMS)} />
    </>
  );
};
