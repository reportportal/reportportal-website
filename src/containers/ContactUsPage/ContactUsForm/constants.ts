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
