import type { GatsbySSR } from 'gatsby';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ConfigProvider } from 'antd';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

/**
 * Per-page antd v5 SSR via cssinjs: a fresh cache captures only the rules
 * for components rendered on this page, then `extractStyle` inlines them
 * into `<head>` — no separate `antd.min.css` blob, no unused styles.
 *
 * - Default `hashPriority` keeps antd selectors at single-class specificity
 *   so SCSS overrides (`.faq .ant-collapse-item`, etc.) win deterministically.
 * - `theme.hashed: false` drops antd's `:where(.css-XXX)` multi-version
 *   wrappers (we only ship one antd version) — saves ~30–40 KB raw /
 *   ~3–5 KB gz per page with no specificity change.
 * - The bare `a {…}` link reset that antd cssinjs emits via `getResetStyles`
 *   is not stripped here; project SCSS in `src/styles/global.scss`
 *   neutralizes it via equal-specificity overrides that win by source order
 *   thanks to the head reordering in `onPreRenderHTML` below.
 */
export const replaceRenderer: NonNullable<GatsbySSR['replaceRenderer']> = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const cache = createCache();
  const html = renderToString(
    <StyleProvider cache={cache}>
      <ConfigProvider theme={{ hashed: false }}>
        {bodyComponent as React.ReactElement}
      </ConfigProvider>
    </StyleProvider>,
  );
  replaceBodyHTMLString(html);
  setHeadComponents([
    <style
      key="antd-cssinjs"
      data-antd-cssinjs
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />,
  ]);
};

/**
 * Two head adjustments:
 * 1. Swap Gatsby's inlined `<style data-identity="gatsby-global-css">` for
 *    a `<link>` to the same emitted file — smaller HTML, browser-cacheable.
 * 2. Move the antd `<style data-antd-cssinjs>` (which `setHeadComponents`
 *    appends at the end of `<head>`) **before** that app SCSS link, so on
 *    equal-specificity ties (e.g. Steps wait-state dot, 5 classes either
 *    side) the project SCSS wins by source order instead of antd defaults.
 */
const isAntdCssinjsStyle = (el: React.ReactElement): boolean => {
  if (el.type !== 'style') return false;
  const p = el.props as { 'data-antd-cssinjs'?: unknown };
  return 'data-antd-cssinjs' in p;
};

const isAppStylesheetLink = (el: React.ReactElement): boolean => {
  if (el.type !== 'link') return false;
  const p = el.props as { rel?: string; href?: string };
  return p.rel === 'stylesheet' && typeof p.href === 'string' && /^\/styles\..+\.css$/.test(p.href);
};

export const onPreRenderHTML: NonNullable<GatsbySSR['onPreRenderHTML']> = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const head = getHeadComponents().map(el => {
    if (!React.isValidElement(el) || el.type !== 'style') return el;
    const p = el.props as { 'data-identity'?: string; 'data-href'?: string };
    if (p['data-identity'] !== 'gatsby-global-css' || !p['data-href']) return el;
    const href = p['data-href'];
    return <link key={el.key ?? href} rel="stylesheet" href={href} type="text/css" />;
  });

  const antdIdx = head.findIndex(el => React.isValidElement(el) && isAntdCssinjsStyle(el));
  const appCssIdx = head.findIndex(el => React.isValidElement(el) && isAppStylesheetLink(el));
  if (antdIdx > -1 && appCssIdx > -1 && antdIdx > appCssIdx) {
    const [antd] = head.splice(antdIdx, 1);
    head.splice(appCssIdx, 0, antd);
  }

  replaceHeadComponents(head);
};

// Critical woff2 files that every page uses above the fold. Preloading them
// here starts the download before the CSS that references them is parsed,
// which usually lands the font bytes before first paint on fast networks and
// reduces the window where the Arial fallback is visible on slow ones.
const PRELOADED_FONTS = [
  '/fonts/Poppins/poppins-v24-latin-regular.woff2',
  '/fonts/Poppins/poppins-v24-latin-600.woff2',
  '/fonts/Noto_Sans/noto-sans-v42-latin-regular.woff2',
];

const isVwoEnabled = process.env.GATSBY_ENABLE_VWO === 'true';

export const onRenderBody: NonNullable<GatsbySSR['onRenderBody']> = ({ setHeadComponents }) => {
  setHeadComponents([
    ...PRELOADED_FONTS.map(href => (
      <link
        key={`preload-${href}`}
        rel="preload"
        as="font"
        type="font/woff2"
        href={href}
        crossOrigin="anonymous"
      />
    )),
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
    ...(isVwoEnabled
      ? [
          <link
            key="visualwebsiteoptimizer"
            rel="preconnect"
            href="https://dev.visualwebsiteoptimizer.com"
          />,
          <script key="vwoCode" type="text/javascript" id="vwoCode" src="/abtesting.js" />,
        ]
      : []),
  ]);
};
