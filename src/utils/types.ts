import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { Required } from 'utility-types';

export interface ContentfulAsset {
  url: string;
  title: string;
  width?: number;
  height?: number;
}

export interface OrganizationDto {
  id: string;
  title: string;
  primaryLogo?: ContentfulAsset;
  secondaryLogo?: ContentfulAsset;
}

export interface LinkDto {
  url: string;
  title: string;
}

export interface ImageWrapperDto {
  title: string;
  description: string;
  link: LinkDto;
  icon: ContentfulAsset;
  alt?: string;
  subTitle?: string;
  hoverIcon?: ContentfulAsset;
}

export interface CarouselSlideDto {
  id: string;
  organizations: OrganizationDto[];
}

export interface BlogPostDto {
  id: number;
  slug: string;
  title: {
    title: string;
  };
  // `gatsbyImageData` is null for SVG assets (sharp can't process them), so we
  // also keep `file.url` around as a fallback and render a plain <img>. When
  // the whole field is null (editor forgot a thumbnail), the UI falls back to
  // a branded placeholder.
  featuredImage: {
    gatsbyImageData: IGatsbyImageData | null;
    file: {
      url: string;
      contentType: string;
    } | null;
    description: string | null;
  } | null;
  category: string[] | null;
  description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  publishDate: string;
  leadParagraph: {
    leadParagraph: string;
  };
  author: string;
  searchIndex?: string;
}

export interface BlogPostsQueryDto {
  allContentfulBlogPost: { nodes: BlogPostDto[] };
}

export interface OfferingPlansQuery {
  allContentfulComparePlan: { nodes: ComparePlansDto[] };
  allContentfulSection: { nodes: OfferingPlansDto[] };
}

export interface CTA {
  type: string;
  name?: string;
  link?: LinkDto;
}

export interface ComparePlansItemDto {
  name: string;
  description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  plans: string;
}

/**
 * A cell of the compare table. The `plans` field in Contentful is a text field
 * holding a JSON array with one entry per plan column.
 *
 *   true / false        renders a tick or a cross
 *   "1 TB" / 5          renders as text
 *   { value, note }     renders a tick with a caption underneath
 *   { label, url }      renders a link, used to cross-sell Service Packages
 *
 * The two object shapes are additions — every value that worked before still
 * renders exactly as it did.
 */
export interface ComparePlanCellWithNote {
  value: boolean;
  note: string;
}

export interface ComparePlanCellLink {
  label: string;
  url: string;
}

export type ComparePlanCell =
  | string
  | number
  | boolean
  | ComparePlanCellWithNote
  | ComparePlanCellLink;

export const isComparePlanCellWithNote = (cell: ComparePlanCell): cell is ComparePlanCellWithNote =>
  typeof cell === 'object' && cell !== null && 'value' in cell;

export const isComparePlanCellLink = (cell: ComparePlanCell): cell is ComparePlanCellLink =>
  typeof cell === 'object' && cell !== null && 'url' in cell;

export interface OfferingPlanPrice {
  currency: string;
  period: string;
  title?: string;
  monthly?: number;
  quarterly?: number;
  yearly?: number;
  // Caption under the price, per billing period. Already present in Contentful
  // and in the GraphQL fragment; the card used to ignore both.
  monthlyDescription?: string;
  quarterlyDescription?: string;
  yearlyDescription?: string;
}

export interface OfferingPlanDto {
  title: string;
  isPopular: boolean;
  description?: string;
  features?: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  pricingInfo?: string;
  price?: OfferingPlanPrice;
  cta: Required<CTA, 'link'>;
  isContactUsURLEndsWithPlanType?: boolean;
}

export interface ComparePlansDto {
  note: string;
  ctas: Required<CTA, 'link'>[];
  columns: string;
  sections: { title: string; items: ComparePlansItemDto[] }[];
}

export interface OfferingPlansDto {
  title: string;
  items: OfferingPlanDto[];
}

export type PlanType = 'quarterly' | 'yearly' | 'monthly';

export enum DataGTM {
  ContactUs = 'contact_us',
  BecomeSponsor = 'become_sponsor',
}

export interface ContactUsBaseConfig {
  id: string;
  url: string;
  options: {
    name: string;
    value: string;
  }[];
  planType?: PlanType;
  isDiscussFieldShown?: boolean;
  areCertificatesShown?: boolean;
}

export interface ContactUsContentfulConfig {
  title: string;
  message: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  messagePosition: string;
  showBillingPeriod?: boolean;
  price?: Omit<OfferingPlanPrice, 'title'>;
}

export type ContactUsConfig = ContactUsBaseConfig & ContactUsContentfulConfig;

export type PropsWithAnimation<P = object> = P & { isAnimationEnabled?: boolean };

const validThumbnailKeys = ['default', 'high', 'maxres', 'medium', 'standard'] as const;

type ValidThumbnailKeysType = (typeof validThumbnailKeys)[number];

type Thumbnail = Record<
  ValidThumbnailKeysType,
  {
    height: number;
    width: number;
    url: string;
  }
>;

export interface YoutubeVideoDto {
  id: string;
  title: string;
  duration: string;
  published_at: string;
  statistics: {
    comment_count: number;
    like_count: number;
    view_count: number;
  };
  thumbnail: Partial<Thumbnail>;
}
