export const MAX_LENGTH = 255;

// TODO: replace with the real Salesforce field name when backend mapping is ready
export const REASON_SALESFORCE_FIELD = 'reason_placeholder__c';

export const REASON_OPTIONS = [
  { label: 'Request a Demo', value: 'demo' },
  { label: 'Pricing details', value: 'pricing' },
  { label: 'Free Trial', value: 'free_trial' },
  { label: 'Technical Support', value: 'support' },
  { label: 'Other — I\'ll describe below', value: 'other' },
] as const;

export type ReasonValue = (typeof REASON_OPTIONS)[number]['value'];
