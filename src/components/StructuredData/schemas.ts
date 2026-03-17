import { SITE_URL, SITE_NAME, LOGO_URL, SOCIAL_LINKS } from './constants';

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  sameAs: SOCIAL_LINKS,
});
