import React, { FC } from 'react';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import { JsonLd, organizationSchema } from '@app/components/StructuredData';

interface SeoProps {
  title?: string;
  image?: string;
  previewImage?: string;
  description?: string;
  noIndex?: boolean;
  lang?: string;
  meta?: ConcatArray<{
    name: string;
    content: string;
    property?: string;
  }>;
}

export const Seo: FC<SeoProps> = ({
  title,
  image,
  previewImage,
  description = '',
  lang = 'en',
  noIndex = false,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            titlePS
            description
            keywords
            image
            previewImage
            siteName
            siteUrl
          }
        }
      }
    `,
  );

  const location = useLocation();
  const canonical = new URL(location.pathname, site?.siteMetadata?.siteUrl);
  const url = canonical.href;
  const defaultTitle = site.siteMetadata?.title;
  const titlePS = site.siteMetadata?.titlePS;
  const combinedTitle = `${title ?? defaultTitle} | ${titlePS}`;
  const metaDescription = description || site.siteMetadata.description;
  const metaImage = image ?? site.siteMetadata?.image;
  const keywords = site.siteMetadata?.keywords;
  const metaSiteName = site.siteMetadata?.siteName;
  // https added for correct link construction. Without it, Gatsby and Browser break the link.
  const previewImageUrl = previewImage ? `https:${previewImage}` : site.siteMetadata?.previewImage;
  const twitter = site.siteMetadata?.social?.twitter || '';

  return (
    <>
      <html lang={lang} />
      <title id="meta-title">{combinedTitle}</title>
      <link id="canonicalUrl" rel="canonical" href={url} />
      <meta id="meta-ogurl" content={url} name="og:url" />
      <meta id="meta-description" content={metaDescription} name="description" />
      <meta id="meta-ogdescription" content={metaDescription} property="og:description" />
      <meta id="meta-twitterdescription" content={metaDescription} name="twitter:description" />
      <meta id="meta-ogtitle" content={combinedTitle} property="og:title" />
      <meta id="meta-twittertitle" content={combinedTitle} name="twitter:title" />
      <meta id="meta-image" content={metaImage} name="image" />
      <meta id="meta-ogimage" content={previewImageUrl || metaImage} property="og:image" />
      <meta id="meta-twittercard" content="summary_large_image" name="twitter:card" />
      <meta id="meta-twittertype" content="website" property="og:type" />
      <meta id="meta-twitter-creator" content={twitter} name="twitter:creator" />
      <meta id="meta-keywords" content={keywords} name="keywords" />
      <meta id="meta-ogsite-name" content={metaSiteName} name="og:site_name" />
      <meta id="meta-robots" content={noIndex ? 'noindex' : ''} name="robots" />
      {!noIndex && <JsonLd data={organizationSchema()} />}
    </>
  );
};
