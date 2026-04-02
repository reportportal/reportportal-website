import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { BREADCRUMBS, JsonLd, howToSchema } from '@app/components/StructuredData';
import { InstallationPage } from '@app/containers/InstallationPage';
import {
  DOCKER_HOW_TO_SCHEMA,
  KUBERNETES_HOW_TO_SCHEMA,
  GOOGLE_CLOUD_HOW_TO_SCHEMA,
} from '@app/containers/InstallationPage/constants';
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
    <>
      <Seo
        title={title}
        description={description}
        breadcrumbs={[BREADCRUMBS.home, BREADCRUMBS.installation]}
      />
      <JsonLd data={howToSchema(DOCKER_HOW_TO_SCHEMA)} />
      <JsonLd data={howToSchema(KUBERNETES_HOW_TO_SCHEMA)} />
      <JsonLd data={howToSchema(GOOGLE_CLOUD_HOW_TO_SCHEMA)} />
    </>
  );
};
