import React, { FC, ReactNode, MouseEvent, HTMLAttributes } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { isAbsoluteURL, DOCUMENTATION_URL } from '@app/utils';

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  to: string;
  className?: string;
  activeClassName?: string;
  partiallyActive?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

// These links are considered SEO trusted, they should be opened in the new tab without "rel" attribute set
const TRUSTED_DOMAINS = [
  'https://merch.reportportal.io',
  'https://reportportal.io',
  'https://demo.reportportal.io',
  'https://tdspora.ai',
  'https://drill4j.github.io',
  'https://healenium.io',
  'https://mobitru.com',
  'https://display.test.io',
  'https://console.cloud.google.com/marketplace/product/epam-mp-rp/reportportal?project=epam-mp-rp',
  DOCUMENTATION_URL,
];

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
export const Link: FC<LinkProps> = ({
  children,
  to = '',
  activeClassName,
  partiallyActive,
  ...other
}) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const isTrustedLink = TRUSTED_DOMAINS.some(domain => to.startsWith(domain as string));
  const isInternal = !isTrustedLink && !isAbsoluteURL(to);

  // Use Gatsby Link for internal links, and <a> for others
  if (isInternal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    );
  }

  // https://DOCUMENTATION_URL is the way to define DOCUMENTATION_URL in Contentful
  const href = to
    .replace('https://DOCUMENTATION_URL', DOCUMENTATION_URL)
    .replace('/docs/FAQ/', '/docs/references/FAQ/')
    .replace(/\/docs\/FAQ$/, '/docs/references/FAQ/');

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      href={href}
      target="_blank"
      {...(!isTrustedLink && {
        rel: 'noopener noreferrer',
      })}
      {...other}
    >
      {children}
    </a>
  );
};
