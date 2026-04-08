/* eslint-disable import/no-default-export -- ambient modules match `import x from '*.svg'` */

/** SVGR (gatsby-plugin-svgr-svgo): `.inline.svg` → React component. */
declare module '*.inline.svg' {
  import type { FC, SVGProps } from 'react';

  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

/** Webpack url-loader: plain `.svg` → resolved URL string for `<img src>` etc. */
declare module '*.svg' {
  const src: string;
  export default src;
}

interface Window {
  dataLayer: object[];
  prevLocation: Location | null;
}

declare module 'react-scroll' {
  import { ComponentType } from 'react';

  // https://github.com/fisshy/react-scroll/issues/566
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Link: ComponentType<any>;
}
