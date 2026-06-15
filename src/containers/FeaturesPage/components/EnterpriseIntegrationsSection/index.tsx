import React, { ComponentType, FC, SVGProps } from 'react';
import classNames from 'classnames';
import Marquee from 'react-fast-marquee';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder } from '@app/utils';
import { useHomePage } from '@app/hooks/useHomePage';
import IntegrationsIcon from '@app/svg/icon-integrations.inline.svg';
import PipelineIcon from '@app/svg/icon-pipeline.inline.svg';
import LockIcon from '@app/svg/icon-lock.inline.svg';
import AddUserIcon from '@app/svg/icon-add-user.inline.svg';

import { Feature } from '../../constants';

import './EnterpriseIntegrationsSection.scss';

const getBlocksWith = createBemBlockBuilder(['enterprise-integrations']);

const LOCAL_INTEGRATIONS = [
  { url: '/svg/integrations/github.svg',     alt: 'GitHub' },
  { url: '/svg/integrations/gitlab.svg',     alt: 'GitLab' },
  { url: '/svg/integrations/slack.svg',      alt: 'Slack' },
  { url: '/svg/integrations/telegram.svg',   alt: 'Telegram' },
  { url: '/svg/integrations/jenkins.svg',    alt: 'Jenkins' },
  { url: '/svg/integrations/monday.svg',     alt: 'Monday.com' },
  { url: '/svg/integrations/red-hat.svg',    alt: 'Red Hat' },
];

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  jira: IntegrationsIcon,
  cicd: PipelineIcon,
  sso: LockIcon,
  scim: AddUserIcon,
};

interface EnterpriseIntegrationsSectionProps {
  feature: Feature;
}

export const EnterpriseIntegrationsSection: FC<EnterpriseIntegrationsSectionProps> = ({
  feature,
}) => {
  const { integrations } = useHomePage();
  const primaryCta = feature.cta?.[0];

  return (
    <section className={getBlocksWith()}>
      <div className={classNames(getBlocksWith('__heading'), 'container')}>
        {feature.badge && (
          <span className={getBlocksWith('__badge')}>{feature.badge}</span>
        )}
        <h2 className={getBlocksWith('__title')}>{feature.title}</h2>
        {feature.description && (
          <p className={getBlocksWith('__description')}>{feature.description}</p>
        )}
      </div>

      {feature.linkedCards && feature.linkedCards.length > 0 && (
        <div className={classNames(getBlocksWith('__cards'), 'container')}>
          {feature.linkedCards.map(card => {
            const IconComponent = card.icon ? ICON_MAP[card.icon] : null;

            return (
              <div key={card.title} className="linked-card">
                {IconComponent && (
                  <div className={getBlocksWith('__card-icon-wrap')}>
                    <IconComponent className={getBlocksWith('__card-icon')} />
                  </div>
                )}
                <strong className="linked-card__title">{card.title}</strong>
                <p className="linked-card__description">{card.description}</p>
              </div>
            );
          })}
        </div>
      )}

      {feature.integrationsStrip && integrations && (
        <div className={getBlocksWith('__strip')}>
          <Marquee
            className={getBlocksWith('__strip-marquee')}
            speed={25}
            gradientWidth="19.27%"
          >
            {[
              ...integrations.map(s => ({ url: s.icon.url, alt: s.alt })),
              ...LOCAL_INTEGRATIONS,
            ].map((slide, index) => (
              <div className={getBlocksWith('__strip-logo')} key={index}>
                <img src={slide.url} alt={slide.alt} loading="lazy" />
              </div>
            ))}
          </Marquee>
        </div>
      )}

      {primaryCta && (
        <div className={classNames(getBlocksWith('__cta'), 'container')}>
          <Link className="btn btn--primary btn--large" to={primaryCta.link}>
            {primaryCta.text}
          </Link>
        </div>
      )}
    </section>
  );
};
