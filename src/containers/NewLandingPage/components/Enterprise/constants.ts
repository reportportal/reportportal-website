export interface EnterpriseCard {
  iconKey: string;
  title: string;
  description: string;
}

export const ENTERPRISE_CARDS: EnterpriseCard[] = [
  {
    iconKey: 'security',
    title: 'Enterprise Security',
    description: 'SSO (SAML, LDAP), Role Based Access Control, SCIM User Provisioning',
  },
  {
    iconKey: 'lock',
    title: 'Compliance & Data Controls',
    description: 'SOC 2 Type II certified, GDPR compliant, with data residency options',
  },
  {
    iconKey: 'contributors',
    title: 'Enterprise Scale',
    description: 'Group projects into Organizations — hundreds of users, thousands of tests',
  },
  {
    iconKey: 'analytics',
    title: 'Advanced Analytics',
    description: 'Custom dashboards, executive reports, and trend analysis',
  },
  {
    iconKey: 'headphones',
    title: 'Priority Support',
    description: 'Dedicated support team with response SLAs and onboarding assistance',
  },
  {
    iconKey: 'globe',
    title: 'Global Deployment',
    description: 'Cloud, on-premise, or hybrid deployment across multiple regions',
  },
];
