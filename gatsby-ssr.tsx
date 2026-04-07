import React from 'react';

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
