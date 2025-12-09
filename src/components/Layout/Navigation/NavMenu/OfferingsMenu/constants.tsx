import React from 'react';

import SaaSIcon from './icons/saas.inline.svg';
import OnPremiseIcon from './icons/on-premise.inline.svg';
import FreeVersionIcon from './icons/free-version.inline.svg';
import TaaSIcon from './icons/taas.inline.svg';
import TAaaSIcon from './icons/taaas.inline.svg';
import QEConsultingIcon from './icons/qe-consulting.inline.svg';

export const PRICING_CONFIG = [
  {
    icon: <SaaSIcon />,
    title: 'SaaS Plans',
    text: 'We host and support an instance for your organization',
    link: { title: 'SaaS', url: '/pricing/saas' },
  },
  {
    icon: <OnPremiseIcon />,
    title: 'Service Packages',
    text: 'Self-hosted instance with support from our team',
    link: { title: 'On-Premises', url: '/pricing/on-premises' },
  },
  {
    icon: <FreeVersionIcon />,
    title: 'Free version',
    text: 'Install and use ReportPortal for free via self-hosted deployment',
    link: { title: 'Free version', url: '/installation' },
  },
];

export const SERVICE_LIST = [
  {
    icon: <TaaSIcon />,
    title: 'Testing as a Service',
    text: 'On-demand testing resources to optimize your testing costs',
    link: { title: 'Testing as a Service', url: '/testing-as-a-service' },
  },
  {
    icon: <TAaaSIcon />,
    title: 'Test Automation as a Service',
    text: 'On-demand end-to-end Test Automation services',
    link: { title: 'Test Automation as a Service', url: '/test-automation-as-a-service' },
  },
  {
    icon: <QEConsultingIcon />,
    title: 'QE Consulting',
    text: 'Holistic Quality Engineering (QE) transformation',
    link: { title: 'Test Automation as a Service', url: '/qe-consulting' },
  },
];
