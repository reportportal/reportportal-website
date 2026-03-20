import { SITE_URL, SITE_NAME, LOGO_URL, SOCIAL_LINKS } from './constants';
import {
  ArticleSchemaParams,
  BreadcrumbItem,
  FAQSchemaItem,
  HowToSchemaParams,
  ProductSchemaParams,
} from './types';

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  sameAs: SOCIAL_LINKS,
});

export const breadcrumbListSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const articleSchema = ({
  headline,
  image,
  datePublished,
  dateModified,
  author,
  description,
  url,
}: ArticleSchemaParams) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  ...(image && { image: `https:${image}` }),
  datePublished,
  ...(dateModified && { dateModified }),
  author: {
    '@type': 'Person',
    name: author,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
  },
  ...(description && { description }),
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url,
  },
});

export const productSchema = ({ name, description, url, image, offers }: ProductSchemaParams) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  description,
  brand: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
  ...(url && { url: `${SITE_URL}${url}` }),
  ...(image && { image }),
  ...(offers?.length && {
    offers: offers.map(offer => ({
      '@type': 'Offer',
      name: offer.name,
      ...(offer.price !== undefined && { price: offer.price }),
      ...(offer.priceCurrency && { priceCurrency: offer.priceCurrency }),
      ...(offer.url && { url: `${SITE_URL}${offer.url}` }),
      ...(offer.description && { description: offer.description }),
    })),
  }),
});

export const faqPageSchema = (items: FAQSchemaItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const howToSchema = ({ name, description, steps }: HowToSchemaParams) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
});
