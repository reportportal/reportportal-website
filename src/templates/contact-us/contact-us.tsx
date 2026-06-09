import React, { FC } from 'react';
import { PageProps } from 'gatsby';
import { Layout, Seo } from '@app/components/Layout';
import { ContactUsPage } from '@app/containers/ContactUsPage';
import { ContactUsConfig, SEO_DATA } from '@app/utils';

const CONTACT_US_GENERAL_PATH = '/contact-us/general/';

const ContactUs: FC<PageProps<null, ContactUsConfig>> = ({ pageContext: config }) => {
  return (
    <Layout className="features-page-layout">
      <ContactUsPage {...config} />
    </Layout>
  );
};

export default ContactUs;

export const Head = ({ location }) => {
  const { title, description } = SEO_DATA.contactUsGeneral;
  const noIndex = location.pathname !== CONTACT_US_GENERAL_PATH;

  return <Seo title={title} description={description} noIndex={noIndex} />;
};
