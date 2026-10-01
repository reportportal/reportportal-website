import { SITE_URL, SITE_NAME, LOGO_URL, PREVIEW_IMAGE_URL, SOCIAL_LINKS } from './constants';
import {
  ArticleSchemaParams,
  BreadcrumbItem,
  FAQSchemaItem,
  HowToSchemaParams,
  ProductSchemaParams,
  WebPageSchemaParams,
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

/**
 * Google only accepts a Product that has `offers` (each with `price` and
 * `priceCurrency`), `review` or `aggregateRating`. Use this builder only for pages
 * that sell something with a public price; otherwise use `webPageSchema`.
 */
export const productSchema = ({
  name,
  description,
  url,
  image = PREVIEW_IMAGE_URL,
  offers,
}: ProductSchemaParams) => {
  const validOffers = (offers ?? []).filter(offer => offer.price && offer.priceCurrency);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    ...(url && { url: `${SITE_URL}${url}` }),
    ...(validOffers.length > 0 && {
      offers: validOffers.map(offer => ({
        '@type': 'Offer',
        name: offer.name,
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        availability: 'https://schema.org/InStock',
        ...(offer.url && { url: `${SITE_URL}${offer.url}` }),
        ...(offer.description && { description: offer.description }),
      })),
    }),
  };
};

export const webPageSchema = ({ name, description, url, aboutName }: WebPageSchemaParams) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name,
  description,
  url: `${SITE_URL}${url}`,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  },
  ...(aboutName && {
    about: {
      '@type': 'Thing',
      name: aboutName,
    },
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
