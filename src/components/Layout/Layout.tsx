import React, { FC, ReactElement, useCallback, useRef } from 'react';
import Snowfall, { SnowfallProps } from 'react-snowfall';
import { StyleProvider } from '@ant-design/cssinjs';
import { useAtom } from 'jotai';
import classNames from 'classnames';
import { isNewYearMode, watchProductOverviewAtom } from '@app/utils';

import '../../styles/global.scss';

import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { EmbedVideo } from './EmbedVideo';

const snowfallProps: SnowfallProps = {
  color: '#dee4fd',
  snowflakeCount: 197,
  speed: [1, 3],
  wind: [-0.5, 1],
  radius: [0.5, 1],
  style: { position: 'fixed', zIndex: 1000 },
};

interface LayoutProps {
  children: ReactElement;
  className?: string;
}

export const Layout: FC<LayoutProps> = ({ children, className }) => {
  const [watchProductOverviewState, setWatchProductOverviewState] =
    useAtom(watchProductOverviewAtom);
  const announcementBarRef = useRef<HTMLDivElement>(null);

  const toggleEmbedVideoOpen = useCallback(
    () => setWatchProductOverviewState(({ isOpen }) => ({ isOpen: !isOpen })),
    [setWatchProductOverviewState],
  );

  return (
    <StyleProvider hashPriority="high">
      <div className={classNames(className, { 'new-year-mode': isNewYearMode })}>
        <Navigation announcementBarRef={announcementBarRef} />
        <main>{children}</main>
        <Footer />
        <EmbedVideo
          isOpen={watchProductOverviewState.isOpen}
          embedId="Xci19TAiO50"
          onClick={toggleEmbedVideoOpen}
        />
      </div>
      {isNewYearMode && <Snowfall {...snowfallProps} />}
    </StyleProvider>
  );
};
