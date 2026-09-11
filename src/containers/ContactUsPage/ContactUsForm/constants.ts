export const MAX_LENGTH = 255;
export const MESSAGE_MAX_LENGTH = 1000;

// Confirmed by the Salesforce team (EPMRPP-119009): these are the JSON
// property names the leadservice Apex endpoint itself accepts, NOT the
// Salesforce field API names. Same pattern as the existing `ReportPortalSource`
// key below, which the endpoint maps internally to the field `ReportPortalSource__c`.
// Salesforce field API names for reference: UserMessage__c, TrafficSource__c, PageReferrer__c.
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
