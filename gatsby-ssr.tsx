import type { GatsbySSR } from 'gatsby';
import React from 'react';

/**
 * Matches the main app stylesheet `<link href>` after swapping Gatsby’s inlined global `<style>`.
 *
 * Assumes Gatsby’s default webpack chunk name for the global CSS entry: `styles.<contenthash>.css`
 * (e.g. `/styles.8fdad282ad51b3be5577.css`, `/styles.e0042f30d80eb58145bb.css`). If you rename
 * that chunk in `gatsby-node.js` / webpack, update `GATSBY_APP_STYLES_RE` (or replace this constant)
 * so `antd.min.css` can still be ordered before the app bundle.
 */
const GATSBY_APP_STYLES_RE = /\/styles\.[a-zA-Z0-9_-]+\.css$/;

export const onPreRenderHTML: NonNullable<GatsbySSR['onPreRenderHTML']> = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const stylesheetHref = (el: React.ReactNode): string | null => {
    if (
      !React.isValidElement(el) ||
      el.type !== 'link' ||
      el.props.rel !== 'stylesheet' ||
      typeof el.props.href !== 'string'
    ) {
      return null;
    }
    return el.props.href;
  };

  let head = getHeadComponents().map(el => {
    if (!React.isValidElement(el) || el.type !== 'style') return el;
    const p = el.props as { 'data-identity'?: string; 'data-href'?: string };
    if (p['data-identity'] !== 'gatsby-global-css' || !p['data-href']) return el;
    const href = p['data-href'];
    return <link key={el.key ?? href} rel="stylesheet" href={href} type="text/css" />;
  });

  const antdIdx = head.findIndex(el => stylesheetHref(el)?.includes('antd.min.css'));
  const appIdx = head.findIndex(el => {
    const h = stylesheetHref(el);
    return h != null && GATSBY_APP_STYLES_RE.test(h);
  });
  if (antdIdx !== -1 && appIdx !== -1 && antdIdx > appIdx) {
    const next = [...head];
    const [antd] = next.splice(antdIdx, 1);
    next.splice(appIdx, 0, antd);
    head = next;
  }

  replaceHeadComponents(head);
};

export const onRenderBody: NonNullable<GatsbySSR['onRenderBody']> = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="antd" rel="stylesheet" href="/antd.min.css" />,
    <script
      key="otSDKStub"
      type="text/javascript"
      defer
      src="https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js"
      data-domain-script="77055ecd-ec2c-461a-bf1c-3e84d715e668"
    />,
    <script key="OptanonWrapper" type="text/javascript">
      {'function OptanonWrapper() { }'}
    </script>,
    <link
      key="visualwebsiteoptimizer"
      rel="preconnect"
      href="https://dev.visualwebsiteoptimizer.com"
    />,
    <script key="vwoCode" type="text/javascript" id="vwoCode" src="/abtesting.js" />,
  ]);
};
