import kebabCase from 'lodash/kebabCase';

import { ContactUsBaseConfig, PlanType } from './types';

const SALESFORCE_SOURCE_NAME = 'ReportPortalSource';
const LEAD_SOURCE = 'lead_source';
const servicePackagesAndAcceleratorsPlans = ['Silver', 'Gold', 'Platinum'];
const availableOptions: PlanType[] = ['quarterly', 'yearly'];

const createConfig = ({
  baseConfig,
  source,
  url,
  planType,
  ...rest
}: {
  baseConfig: {
    id: string;
    options: {
      name: string;
      value: string;
    }[];
  };
  url: string;
  source: string;
  planType?: PlanType;
}) => ({
  ...baseConfig,
  options: baseConfig.options.concat({
    name: SALESFORCE_SOURCE_NAME,
    value: source,
  }),
  // eslint-disable-next-line no-nested-ternary
  url: typeof planType === 'undefined' ? url : `${url}/${planType}`,
  ...rest,
});

const createStartupPlanBaseConfig = (planType: PlanType) => ({
  id: '[SaaS] Startup Plan',
  options: [{ name: LEAD_SOURCE, value: 'RP SaaS' }],
  planType,
});

const createBusinessPlanBaseConfig = (planType: PlanType) => ({
  id: '[SaaS] Business Plan',
  options: [{ name: LEAD_SOURCE, value: 'RP SaaS' }],
  planType,
});

const createEnterprisePlanBaseConfig = () => ({
  id: '[SaaS] Enterprise Plan',
  options: [{ name: LEAD_SOURCE, value: 'RP SaaS' }],
});

const createContactUsConfig = ({ salesforceSourceName, leadSource, url }) => ({
  id: 'Contact us',
  url,
  options: [
    { name: SALESFORCE_SOURCE_NAME, value: `Landing page / ${salesforceSourceName}` },
    { name: LEAD_SOURCE, value: leadSource },
  ],
  isDiscussFieldShown: false,
});

const QaSpaceBaseConfig = {
  id: 'QaSpace',
  options: [{ name: LEAD_SOURCE, value: 'RP QASP' }],
  isDiscussFieldShown: false,
  areCertificatesShown: false,
};
const Drill4JBaseConfig = {
  id: 'Drill4J',
  options: [{ name: LEAD_SOURCE, value: 'RP D4J' }],
  isDiscussFieldShown: false,
  areCertificatesShown: false,
};
const HealeniumBaseConfig = {
  id: 'Healenium',
  options: [{ name: LEAD_SOURCE, value: 'RP HLM' }],
  isDiscussFieldShown: false,
  areCertificatesShown: false,
};

export const contactUsBaseConfigs: ContactUsBaseConfig[] = [
  ...availableOptions.flatMap(planType => [
    createConfig({
      baseConfig: createStartupPlanBaseConfig(planType),
      url: '/contact-us/saas/startup-plan',
      source: 'Landing page / SaaS / Request "Startup Plan"',
      planType,
    }),
    createConfig({
      baseConfig: createBusinessPlanBaseConfig(planType),
      url: '/contact-us/saas/business-plan',
      source: 'Landing page / SaaS / Request "Business Plan"',
      planType,
    }),
    createConfig({
      baseConfig: createEnterprisePlanBaseConfig(),
      url: '/contact-us/saas/enterprise-plan',
      source: 'Landing page / SaaS / Request "Enterprise Plan"',
      planType,
    }),
  ]),
  createConfig({
    baseConfig: createStartupPlanBaseConfig('yearly'),
    url: '/contact-us/saas/compare/startup-plan',
    source: 'Landing page / SaaS / Compare Plan / Request "Startup Plan"',
  }),
  createConfig({
    baseConfig: createBusinessPlanBaseConfig('yearly'),
    url: '/contact-us/saas/compare/business-plan',
    source: 'Landing page / SaaS / Compare Plan / Request "Business Plan"',
  }),
  createConfig({
    baseConfig: createEnterprisePlanBaseConfig(),
    url: '/contact-us/saas/compare/enterprise-plan',
    source: 'Landing page / SaaS / Compare Plan / Request "Enterprise Plan"',
  }),
  createConfig({
    baseConfig: QaSpaceBaseConfig,
    url: '/contact-us/qasp',
    source: 'Landing page / RP QASP',
  }),
  createConfig({
    baseConfig: Drill4JBaseConfig,
    url: '/contact-us/d4j',
    source: 'Landing page / RP D4J',
  }),
  createConfig({
    baseConfig: HealeniumBaseConfig,
    url: '/contact-us/hlm',
    source: 'Landing page / RP HLM',
  }),
  ...servicePackagesAndAcceleratorsPlans.flatMap(plan => [
    {
      id: `[Service Packages] ${plan}`,
      options: [
        { name: LEAD_SOURCE, value: 'RP Service' },
        {
          name: SALESFORCE_SOURCE_NAME,
          value: `Landing page / Service Packages / Request Support "${plan} Package"`,
        },
      ],
      url: `/contact-us/service-packages/${kebabCase(plan)}`,
      planType: 'yearly',
    },
    {
      id: `[Service Packages] ${plan}`,
      options: [
        { name: LEAD_SOURCE, value: 'RP Service' },
        {
          name: SALESFORCE_SOURCE_NAME,
          value: `Landing page / Service Packages / Compare Plan / Request Support "${plan} Plan"`,
        },
      ],
      url: `/contact-us/service-packages/compare/${kebabCase(plan)}`,
      planType: 'yearly',
    },
    createConfig({
      baseConfig: QaSpaceBaseConfig,
      url: `/contact-us/qasp/${kebabCase(plan)}`,
      source: `Landing page / QASP / Request Support "${plan} Plan"`,
    }),
    createConfig({
      baseConfig: QaSpaceBaseConfig,
      url: `/contact-us/qasp/compare/${kebabCase(plan)}`,
      source: `Landing page / QASP / Compare Plan / Request Support "${plan} Plan"`,
    }),
    createConfig({
      baseConfig: Drill4JBaseConfig,
      url: `/contact-us/d4j/${kebabCase(plan)}`,
      source: `Landing page / D4J / Request Support "${plan} Plan"`,
    }),
    createConfig({
      baseConfig: Drill4JBaseConfig,
      url: `/contact-us/d4j/compare/${kebabCase(plan)}`,
      source: `Landing page / D4J / Compare Plan / Request Support "${plan} Plan"`,
    }),
    createConfig({
      baseConfig: HealeniumBaseConfig,
      url: `/contact-us/hlm/${kebabCase(plan)}`,
      source: `Landing page / HLM / Request Support "${plan} Plan"`,
    }),
    createConfig({
      baseConfig: HealeniumBaseConfig,
      url: `/contact-us/hlm/compare/${kebabCase(plan)}`,
      source: `Landing page / HLM / Compare Plan / Request Support "${plan} Plan"`,
    }),
  ]),
  {
    id: 'TaaS',
    url: '/contact-us/taas',
    options: [
      {
        name: SALESFORCE_SOURCE_NAME,
        value: 'Landing page / RP TaaS',
      },
      {
        name: LEAD_SOURCE,
        value: 'RP TaaS',
      },
    ],
    isDiscussFieldShown: false,
  },
  {
    id: 'TAaaS',
    url: '/contact-us/taaas',
    options: [
      {
        name: SALESFORCE_SOURCE_NAME,
        value: 'Landing page / RP TAaaS',
      },
      {
        name: LEAD_SOURCE,
        value: 'RP TAaaS',
      },
    ],
    isDiscussFieldShown: false,
  },
  {
    id: 'QAaaS',
    url: '/contact-us/qe-consulting',
    options: [
      {
        name: SALESFORCE_SOURCE_NAME,
        value: 'Landing page / RP QAaaS',
      },
      {
        name: LEAD_SOURCE,
        value: 'RP QAaaS',
      },
    ],
    isDiscussFieldShown: false,
  },
  createContactUsConfig({
    salesforceSourceName: 'General',
    leadSource: 'RP General',
    url: '/contact-us/general',
  }),
  {
    id: '[Service Packages]',
    url: '/contact-us/service-packages',
    options: [
      {
        name: SALESFORCE_SOURCE_NAME,
        value: 'Landing page / Service Packages / Interest in Support Packages',
      },
      { name: LEAD_SOURCE, value: 'RP Service' },
    ],
    isDiscussFieldShown: false,
  },
  createContactUsConfig({
    salesforceSourceName: 'RP Community',
    leadSource: 'RP Community',
    url: '/contact-us/community',
  }),
  createContactUsConfig({
    salesforceSourceName: 'Sponsorship Program / Individual',
    leadSource: 'RP Sponsorship Program',
    url: '/contact-us/sponsorship-program/individual',
  }),
  createContactUsConfig({
    salesforceSourceName: 'Sponsorship Program / Business',
    leadSource: 'RP Sponsorship Program',
    url: '/contact-us/sponsorship-program/business',
  }),
  createContactUsConfig({
    salesforceSourceName: 'Sponsorship Program / Business / Diamond',
    leadSource: 'RP Sponsorship Program',
    url: '/contact-us/sponsorship-program/business/diamond',
  }),
  createContactUsConfig({
    salesforceSourceName: 'Navigation menu / Pricing',
    leadSource: 'RP General',
    url: '/contact-us/pricing-for-solutions',
  }),
];
