import React from 'react';
import { FAQSchemaItem, OfferSchemaParams, extractText } from '@app/components/StructuredData';
import { Link } from '@app/components/Link';

/**
 * These answers are also published as schema.org FAQPage markup (see
 * `saas.tsx`), so anything wrong here is wrong in Google's results too.
 */
export const FAQ_ITEMS = [
  {
    key: 1,
    label: 'How does the free trial work?',
    children: (
      <>
        <div>
          The trial starts the moment you sign in for the first time and runs for 30 days. No credit
          card is required, and you are under no obligation to continue afterwards.
        </div>
        <div>
          It gives you every feature of ReportPortal on the Startup tier, so the Startup limits on
          data storage and retention apply for the duration.
        </div>
        <div>
          Each customer is eligible for one trial, on their first organization. If you have already
          created an organization, or been invited to someone else&apos;s, the trial is no longer
          available.
        </div>
      </>
    ),
  },
  {
    key: 2,
    label: 'What happens when the free trial ends?',
    children: (
      <>
        <div>
          Subscribe on or before the last day of the trial and nothing changes — everything you
          reported during the trial stays where it is.
        </div>
        <div>
          If you do not, your Organization and the Project(s) in it switch to read-only mode for one
          month. Every feature keeps working except reporting: you can read, analyse and export what
          is already there, but no new results can be sent in. Subscribing at any point during that
          month restores full access.
        </div>
        <div>After that month without a subscription, the data is deleted.</div>
      </>
    ),
  },
  {
    key: 3,
    label: 'How am I billed?',
    children: (
      <>
        <div>
          In advance, at the start of each billing period. The prices on this page are per month,
          and invoicing is quarterly at a minimum — longer prepayment periods, such as six months or
          a year up front, can be arranged.
        </div>
        <div>
          The yearly option is a twelve-month commitment rather than a different invoice schedule.
          It brings the monthly rate down by around 5%; the quarterly option commits you for three
          months.
        </div>
      </>
    ),
  },
  {
    key: 4,
    label: 'Can I change my plan later?',
    children: (
      <>
        <div>
          Yes, at any time, in either direction. Write to{' '}
          <Link to="mailto:support@reportportal.io">support@reportportal.io</Link> and we will
          arrange it.
        </div>
        <div>
          Moving to a larger plan is the usual reason people get in touch — more storage, a longer
          retention period, or a dedicated instance.
        </div>
      </>
    ),
  },
  {
    key: 5,
    label: 'What happens if a subscription is not renewed?',
    children: (
      <>
        <div>
          The same as at the end of the trial. On the first day of the unpaid billing cycle your
          Organization and the Project(s) in it switch to read-only for one month — everything
          remains readable, but no new results can be reported.
        </div>
        <div>If the subscription is still not active after that month, the data is deleted.</div>
      </>
    ),
  },
  {
    key: 6,
    label: 'Are users and projects really unlimited?',
    children: (
      <>
        <div>
          Yes, on every plan. We do not charge per seat and we do not cap the number of project
          spaces — invite your whole team, including people who only ever read dashboards.
        </div>
        <div>
          What differs between plans is capacity and infrastructure: how much data you can store,
          how long it is kept, and whether your instance is shared or dedicated.
        </div>
      </>
    ),
  },
  {
    key: 7,
    label: 'What happens if I reach my data storage limit?',
    children: (
      <>
        <div>
          Nothing breaks and reporting does not stop. The system measures stored data daily and
          gradually removes the oldest data above the limit, across both the database and the
          attachment storage.
        </div>
        <div>
          Data is also removed once it passes your retention period — whichever comes first. If you
          are consistently near the limit, that is usually the point to move to a larger plan.
        </div>
      </>
    ),
  },
  {
    key: 8,
    label: 'What does “Upon request” mean in the comparison table?',
    children: (
      <>
        <div>
          The feature is part of that plan, but it is set up for you rather than switched on by
          default — typically because it has to be configured against your own systems or your
          dedicated instance.
        </div>
        <div>
          There is no additional charge — it is included in the plan. Contact us and we will arrange
          it for your instance.
        </div>
      </>
    ),
  },
];

export const SAAS_FAQ_SCHEMA_ITEMS: FAQSchemaItem[] = FAQ_ITEMS.map(({ label, children }) => ({
  question: label,
  answer: extractText(children),
}));

/**
 * Published as schema.org Offer markup, which is what Google shows next to the
 * page. The figures are the monthly rate on the yearly plan — the view the page
 * opens on — and they are duplicated from Contentful, so they have to be
 * updated by hand whenever the plans change there. They sat at $49 and $249
 * long after the real prices had moved; see the follow-up about deriving these
 * from the same source as the cards.
 */
export const SAAS_OFFERS: OfferSchemaParams[] = [
  {
    name: 'Startup',
    price: '569',
    priceCurrency: 'USD',
    description: 'SaaS Startup plan — per month, billed quarterly, unlimited users',
    url: '/contact-us/saas/startup-plan',
  },
  {
    name: 'Business',
    price: '2659',
    priceCurrency: 'USD',
    description: 'SaaS Business plan — per month, billed quarterly, unlimited users',
    url: '/contact-us/saas/business-plan',
  },
  {
    name: 'Enterprise',
    description: 'SaaS Enterprise plan for large organizations with custom pricing',
    url: '/contact-us/saas/enterprise-plan',
  },
];
