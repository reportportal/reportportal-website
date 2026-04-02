import React from 'react';

export const TIME_SCALE_DATA = [
  {
    time: 20,
    items: ['Deploy and configure Drill4J services'],
  },
  {
    time: 40,
    items: [
      'Setup Drill4J Application Agent(s)',
      'Setup Drill4J Automated Testing Agent(s)',
      'Support',
    ],
  },
  {
    time: 80,
    items: ['Data gather dry-run', 'Create integration plan'],
  },
];

export const FAQ_DATA = [
  {
    key: 1,
    label: 'What is the validity period for professional service hours?',
    children: (
      <div>
        The professional service hours included into the subscription plan are accumulated on a
        monthly basis and are valid for the payment term only. If quarterly payment option is
        chosen, no more than 3 monthly amounts of professional service hours can be accumulated or
        used prospectively; if yearly payment option is chosen, up to 12 monthly amounts of
        professional service hours can be accumulated or used prospectively.
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
      <div>
        <div>Unfortunately, not for now.</div>
        <div>
          But we work to make it possible. Currently we do semi-manual invoice processing which
          requires effort of the operations and accounting teams.
        </div>
      </div>
    ),
  },
  {
    key: 4,
    label: 'What payment methods do you accept?',
    children: (
      <>
        As for now, the payment can be made via bank transfer (ACH, Wire) or check. Later on, we
        plan to provide alternative forms of payment.
      </>
    ),
  },
  {
    key: 5,
    label: 'Can I change billing plans at any time?',
    children: (
      <div>
        <div>
          Unfortunately, no.
          <br />
          You can&apos;t downgrade your billing plan at any time.
        </div>
        <div>
          However, if you need more professional service hours, we can discuss the plan upgrade.
          <br /> For that, please, get in touch with us via &quot;Contact Us&quot; button.
        </div>
      </div>
    ),
  },
  {
    key: 6,
    label: 'What if I overuse or underuse my monthly limit?',
    children: (
      <div>
        <div>
          If Company seeks to consume more Professional service hours than have been contracted for
          according to the Order, overage fees of 25% on a per Professional service hour basis will
          apply.
        </div>
        <div>
          Professional service hours may be used for the duration of the payment term, and expire at
          that time. For example, annual upfront payment entitles Company to use the contracted
          monthly Service Points at any point in the year. For a quarterly upfront payment, Service
          Points must be used within three months.
        </div>
      </div>
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
];
