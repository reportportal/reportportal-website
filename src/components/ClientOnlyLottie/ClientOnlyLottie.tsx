import React, { ComponentProps, FC } from 'react';
import { useRequest } from 'ahooks';
import type Lottie from 'lottie-react';

type LottieProps = ComponentProps<typeof Lottie>;

// `lottie-web` (used by `lottie-react`) touches `document` at module
// evaluation time, which crashes Gatsby's SSR/HTML build. Loading it
// via dynamic import on the client keeps it out of the SSR bundle entirely.
export const ClientOnlyLottie: FC<LottieProps> = props => {
  const { data: LottieComponent } = useRequest(() =>
    import('lottie-react').then(mod => mod.default),
  );

  if (!LottieComponent) {
    return null;
  }

  return <LottieComponent {...props} />;
};
