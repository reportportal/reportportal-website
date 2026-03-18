import React from 'react';
import { FAQSchemaItem, OfferSchemaParams, extractText } from '@app/components/StructuredData';

export const TIME_SCALE_DATA = [
  {
    time: '1+',
    items: ['ReportPortal training', 'Simple query resolved'],
  },
  {
    time: '20+',
    items: [
      'Simple deployment on AWS with DB',
      'Configuration of performance monitoring',
      'Support of an existing Test Framework',
    ],
  },
  {
    time: '120+',
    items: ['Plugin implementation', 'Integration with a new Test Framework'],
  },
];

export const FAQ_DATA = [
  {
    key: 1,
    label: 'What is the validity period for Professional Service Points?',
    children: (
      <div>
        The Professional Service Points included into the subscription plan are accumulated on a
        monthly basis and are valid for the payment term only. If quarterly payment option is
        chosen, no more than 3 monthly amounts of Professional Service Points can be accumulated or
        used prospectively; if yearly payment option is chosen, up to 12 monthly amounts of
        Professional Service Points can be accumulated or used prospectively.
      </div>
    ),
  },
  {
    key: 2,
    label: 'How is my subscription charged?',
    children: (
      <div>
        Company will pay a fixed fee, in advance, based on the service level elected in the Order
        Form.
      </div>
    ),
  },
  {
    key: 3,
    label: 'Can I pay monthly?',
    children: (
      <>
        <div>Unfortunately, not for now.</div>
        <div>
          But we work to make it possible. Currently we do semi-manual invoice processing which
          requires effort of the operations and accounting teams.
        </div>
        <div>
          Monthly payments will be available as soon as we add online payment capabilities. This is
          our highest priority at the moment.
        </div>
      </>
    ),
  },
  {
    key: 4,
    label: 'What payment methods do you accept?',
    children: (
      <div>
        As for now, the payment can be made via bank transfer (ACH, Wire) or check. Later on, we
        plan to provide alternative forms of payment.
      </div>
    ),
  },
  {
    key: 5,
    label: 'Can I change billing plans at any time?',
    children: (
      <>
        <div>Unfortunately, no.</div>
        <div>You can&apos;t downgrade your billing plan at any time.</div>
        <div>
          However, if you need more Professional Service Points, we can discuss the plan upgrade.
          For that, please, press &quot;Get a Quote&quot; in the upper right corner of our landing
          page. We&apos;ll be happy to help you to find the most suitable plan for your team and
          provide a quote.
        </div>
      </>
    ),
  },
  {
    key: 6,
    label: 'What if I overuse or underuse my monthly limit?',
    children: (
      <>
        <div>
          If Company seeks to consume more Professional Service Points than have been contracted for
          according to the Order, overage fees of 25% on a per Professional Service Point basis will
          apply.
        </div>
        <div>
          Professional Service Points may be used for the duration of the payment term, and expire
          at that time. For example, annual upfront payment entitles Company to use the contracted
          monthly service points at any point in the year. For a quarterly upfront payment, service
          points must be used within three months.
        </div>
      </>
    ),
  },
  {
    key: 7,
    label: 'What are the business hours of the service team?',
    children: (
      <div>
        Unless otherwise agreed in writing, ReportPortal service personnel are located in the CET
        time zone (UTC +1). Commercially reasonable efforts will be made to find overlap times where
        synchronous communication with a Company is required. For purposes of finding overlap times,
        the Company agrees to make its personnel available between 8 AM and 6 PM when synchronous
        communication is required.
      </div>
    ),
  },
  {
    key: 8,
    label: 'I need a quote. How can I request one?',
    children: (
      <>
        <div>Just press &quot;Get a Quote&quot; in the upper right corner of our landing page.</div>
        <div>
          We&apos;ll be happy to help you to find the most suitable plan for your team and provide a
          quote.
        </div>
      </>
    ),
  },
];

export const ON_PREMISES_FAQ_SCHEMA_ITEMS: FAQSchemaItem[] = FAQ_DATA.map(
  ({ label, children }) => ({
    question: label,
    answer: extractText(children),
  }),
);

export const ON_PREMISES_OFFERS: OfferSchemaParams[] = [
  {
    name: 'Lite',
    description: 'On-Premises Lite plan with essential support',
    url: '/contact-us/on-premises',
  },
  {
    name: 'Service Pro',
    description: 'On-Premises Service Pro plan with professional support and service points',
    url: '/contact-us/on-premises',
  },
  {
    name: 'Advanced',
    description: 'On-Premises Advanced plan with comprehensive support and premium services',
    url: '/contact-us/on-premises',
  },
];
