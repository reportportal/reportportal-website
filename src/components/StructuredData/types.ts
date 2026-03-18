export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface ArticleSchemaParams {
  headline: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  description?: string;
  url: string;
}

export interface FAQSchemaItem {
  question: string;
  answer: string;
}

export interface OfferSchemaParams {
  name: string;
  price?: string;
  priceCurrency?: string;
  url?: string;
  description?: string;
}

export interface ProductSchemaParams {
  name: string;
  description: string;
  url?: string;
  image?: string;
  offers?: OfferSchemaParams[];
}
