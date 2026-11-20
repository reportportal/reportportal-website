export const MAX_LENGTH = 255;
export const MESSAGE_MAX_LENGTH = 1000;

// JSON keys the leadservice endpoint accepts, not the Salesforce field API
// names (UserMessage__c / TrafficSource__c / PageReferrer__c) — same split as ReportPortalSource below.
export const REASON_SALESFORCE_FIELD = 'UserMessage';
export const TRAFFIC_SOURCE_SALESFORCE_FIELD = 'TrafficSource';
export const PAGE_REFERRER_SALESFORCE_FIELD = 'PageReferrer';

export const REASON_OPTIONS = [
  { label: 'Request a Demo', value: 'demo' },
  { label: 'Pricing details', value: 'pricing' },
  { label: 'Free Trial', value: 'free_trial' },
  { label: 'Technical Support', value: 'support' },
  { label: "Other — I'll describe below", value: 'other' },
] as const;

export type ReasonValue = (typeof REASON_OPTIONS)[number]['value'];

export const REASON_SOURCE_MAP: Record<ReasonValue, string> = {
  demo: 'Landing page / General / Request a Demo',
  pricing: 'Landing page / General / Pricing details',
  free_trial: 'Landing page / General / Free Trial',
  support: 'Landing page / General / Technical support',
  other: 'Landing page / General / Other',
};

export const GENERAL_SOURCE = 'Landing page / General';
export const CUSTOM_TEXT_SOURCE = 'Landing page / General / Custom text';

export const GENERAL_LEAD_SOURCE = 'RP General';
export const CUSTOM_TEXT_LEAD_SOURCE = 'RP Custom text';

// Website CTA mapping rows 1–8 → Salesforce Lead Source
export const REASON_LEAD_SOURCE_MAP: Record<ReasonValue, string> = {
  demo: 'RP Request a Demo',
  pricing: 'RP Pricing details',
  free_trial: 'RP Free Trial',
  support: 'RP Technical support',
  other: 'RP Other',
};

export type CtaSourceOverride = {
  source: string;
  reason?: ReasonValue;
  leadSource?: string;
  // Always send `source` as ReportPortalSource; lead_source follows rows 1–8
  keepCtaSource?: boolean;
};

export const CTA_SOURCE_OVERRIDES: Record<string, CtaSourceOverride> = {
  hero_free_trial: {
    reason: 'free_trial',
    source: 'Landing page / General / Hero / Button "Start Free Trial"',
  },
  benefits_free_trial: {
    reason: 'free_trial',
    source: 'Landing page / General / Benefits for business / Button "Start Free Trial"',
  },
  faster_releases_free_trial: {
    reason: 'free_trial',
    source: 'Landing page / General / Faster releases / Button "Start Free Trial"',
  },
  features_free_trial: {
    reason: 'free_trial',
    source: 'Landing page / General / Ready to transform / Button "Start Free Trial"',
  },
  enterprise_demo: {
    reason: 'demo',
    source: 'Landing page / General / Built for Global Enterprises/ Button "Request a Demo"',
  },
  features_demo: {
    reason: 'demo',
    source: 'Landing page / General / Ready to transform /  Button "Request a Demo"',
  },
  test_management_demo: {
    reason: 'demo',
    source: 'Landing page / General / TMS / Button "Request a Demo"',
  },
  community_free_trial: {
    reason: 'free_trial',
    source: 'Landing page / RP Community',
    leadSource: 'RP Community',
  },
  // Pricing → SaaS / Service Packages overview CTAs (rows 27, 31, 32)
  saas_questions: {
    source: 'Landing page / SaaS / Interest in SaaS Plans',
    keepCtaSource: true,
  },
  service_packages_interest: {
    source: 'Landing page / Service Packages / Interest in Support Packages',
    keepCtaSource: true,
  },
  service_packages_questions: {
    source: 'Landing page / Service Packages / Interest in Support Packages',
    keepCtaSource: true,
  },
};
