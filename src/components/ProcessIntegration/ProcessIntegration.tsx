import React, { forwardRef } from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from '@app/components/Link';
import { useHomePage } from '@app/hooks/useHomePage';
import {
  createBemBlockBuilder,
  DOCUMENTATION_URL,
  PropsWithAnimation,
} from '@app/utils';

import './ProcessIntegration.scss';

const getBlocksWith = createBemBlockBuilder(['process-integration']);

const LOCAL_INTEGRATIONS = [
  { url: '/svg/integrations/github.svg',   alt: 'GitHub' },
  { url: '/svg/integrations/gitlab.svg',   alt: 'GitLab' },
  { url: '/svg/integrations/slack.svg',    alt: 'Slack' },
  { url: '/svg/integrations/telegram.svg', alt: 'Telegram' },
  { url: '/svg/integrations/jenkins.svg',  alt: 'Jenkins' },
  { url: '/svg/integrations/monday.svg',   alt: 'Monday.com' },
  { url: '/svg/integrations/red-hat.svg',  alt: 'Red Hat' },
];

export const ProcessIntegration = forwardRef<HTMLDivElement, PropsWithAnimation>(
  (_props, ref) => {
    const { integrations } = useHomePage();

    return (
      <section className={getBlocksWith()} ref={ref}>
        <div className="container">
          <h2>Integrate with your existing test automation process</h2>
          <h3>
            Connect ReportPortal to your CI/CD pipelines, test frameworks, bug trackers, and AI
            testing platforms via MCP Server — and see all results in one unified view.
          </h3>
          <div className={getBlocksWith('__link-container')}>
            <Link className="btn btn--outline btn--large" to={`${DOCUMENTATION_URL}/plugins/`}>
              See all integrations
            </Link>
          </div>
        </div>
        <div className={getBlocksWith('__carousel')}>
          <Marquee
            className={getBlocksWith('__carousel-marquee')}
            speed={25}
            gradientWidth="19.27%"
          >
            {[
              ...integrations.map(s => ({ url: s.icon.url, alt: s.alt })),
              ...LOCAL_INTEGRATIONS,
            ].map((slide, index) => (
              <div className={getBlocksWith('__carousel-logo')} key={index}>
                <img src={slide.url} alt={slide.alt} loading="lazy" />
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    );
  },
);

ProcessIntegration.displayName = 'ProcessIntegration';
