import React from 'react';

export const TIME_SCALE_DATA = [
  {
    time: '1+',
    items: [
      'ReportPortal training',
      'Solving simple queries',
      'Simple deployment on AWS with DB',
      'Support of an existing Test Framework',
    ],
  },
  {
    time: '50+',
    items: [
      'Plugin implementation',
      'Custom widget implementation',
      'Performance monitoring configuration',
      'Data migration between ReportPortal instances',
    ],
  },
  {
    time: '150+',
    items: [
      'Heavy UI customization',
      'Integration with a new Test Framework',
      'Deploy to highly restricted or air-gap environment',
      'Dedicated interface with custom business logic',
    ],
  },
];

export const FAQ_DATA = [
  {
    key: 1,
    label: 'What is the validity period for support hours?',
    children: (
      <div>
        Support hours included in your subscription plan are valid only for the annual payment term.
        All hours are available from the start of each 12-month term and may be used at any time
        during that term — either all at once or in parts. Unused hours expire at the end of the
        term, do not roll over, are non-transferable, and are not refundable.
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
    label: 'What payment methods do you accept?',
    children: (
      <div>
        As for now, the payment can be made via bank transfer (ACH, Wire) or check. Later on, we
        plan to provide alternative forms of payment.
      </div>
    ),
  },
  {
    key: 4,
    label: 'Can I change billing plans at any time?',
    children: (
      <div>
        Unfortunately, no. You can&apos;t downgrade your billing plan at any time. <br /> However,
        if you need more support hours, we can discuss the plan upgrade. For that, please, press
        &quot;Contact us&quot; in the upper right corner of our landing page. We&apos;ll be happy to
        help you to find the most suitable plan for your team and provide a quote.
      </div>
    ),
  },
  {
    key: 5,
    label: 'What if I overuse my hour limit?',
    children: (
      <div>
        If Company seeks to consume more support hours than have been contracted for according to
        the Order, overage fees of 25% on a per support hour basis will apply.
      </div>
    ),
  },
  {
    key: 6,
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
    key: 7,
    label: 'I need a quote. How can I request one?',
    children: (
      <div>
        Just press &quot;Contact us&quot; in the upper right corner of our landing page.
        <br />
        We&apos;ll be happy to help you to find the most suitable plan for your team and provide a
        quote.
      </div>
    ),
  },
];
