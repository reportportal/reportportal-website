export const MAX_LENGTH = 255;
export const MESSAGE_MAX_LENGTH = 1000;

// TODO: replace with the real Salesforce field name when backend mapping is ready
export const REASON_SALESFORCE_FIELD = 'reason_placeholder__c';

// TODO: replace with the real Salesforce field names once the Salesforce team
// approves and creates the custom fields (EPMRPP-119009).
export const TRAFFIC_SOURCE_SALESFORCE_FIELD = 'traffic_source_placeholder__c';
export const PAGE_REFERRER_SALESFORCE_FIELD = 'page_referrer_placeholder__c';

export const REASON_OPTIONS = [
  { label: 'Request a Demo', value: 'demo' },
  { label: 'Pricing details', value: 'pricing' },
  { label: 'Free Trial', value: 'free_trial' },
  { label: 'Technical Support', value: 'support' },
  { label: "Other — I'll describe below", value: 'other' },
] as const;

export type ReasonValue = (typeof REASON_OPTIONS)[number]['value'];
