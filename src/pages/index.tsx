import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { LandingPage } from '@app/containers/LandingPage';
import { SEO_DATA } from '@app/utils';

const Root: FC = () => (
  <Layout>
    <LandingPage />
  </Layout>
);

export default Root;

export const Head = () => {
  const { title, description } = SEO_DATA.index;

  return (
    <>
      <Seo title={title} description={description} />
      <meta name="google-site-verification" content="X8a5V5KjJKkoDD6jOKp51TpGSz4EcDPgjCFTRfBG8kk" />
    </>
  );
};
