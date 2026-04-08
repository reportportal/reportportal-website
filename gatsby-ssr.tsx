import React from 'react';

/** Gatsby’s main webpack CSS chunk filename in <head> after we replace the inline <style>. */
const GATSBY_APP_STYLES_RE = /\/styles\.[a-zA-Z0-9_-]+\.css$/;

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}: {
  getHeadComponents: () => React.ReactNode[];
  replaceHeadComponents: (components: React.ReactNode[]) => void;
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

export const onRenderBody = ({ setHeadComponents }) => {
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
