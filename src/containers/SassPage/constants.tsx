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
          card is required, and you do not need to pay or commit to anything after it ends.
        </div>
        <div>
          During the trial you get every feature included in the Startup plan, and the Startup
          limits for data storage and retention apply for that time.
        </div>
        <div>
          <b>One trial per customer</b>
        </div>
        <div>
          Each customer can use one free trial, on their first organization — an organization being
          your team&apos;s workspace in ReportPortal. If you have already created one, or been added
          to someone else&apos;s, the trial is not available, because your workspace already exists.
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
          <b>If you subscribe by the last day of the trial</b>
        </div>
        <div>
          Your access continues without interruption. You keep using your projects and reporting new
          test results, and your existing data stays available under your plan&apos;s retention
          settings.
        </div>
        <div>
          <b>If you do not subscribe</b>
        </div>
        <div>
          Access to your trial projects is removed — you can no longer view existing data or report
          new results — and your trial data and projects are deleted.
        </div>
        <div>
          Export anything you want to keep before the trial ends. If you need more time to evaluate,
          write to <Link to="mailto:support@reportportal.io">support@reportportal.io</Link> before
          then.
        </div>
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
          Access to your projects ends when the subscription expires. You can no longer view
          existing data or report new test results, and your projects and their data are then
          deleted.
        </div>
        <div>
          Export anything you want to keep before the subscription ends. If you need help with
          renewal, write to <Link to="mailto:support@reportportal.io">support@reportportal.io</Link>{' '}
          before then.
        </div>
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
        <div>Your account keeps working normally and reporting does not stop.</div>
        <div>
          Once you reach the limit, the system checks your storage daily and removes the oldest data
          first — test results and attachments alike. Data is also removed once it is older than
          your retention period; whichever rule is reached first applies. Because the oldest data
          goes first, your most recent results are the last to be affected.
        </div>
        <div>
          If you are regularly close to the limit, that is usually the point to consider a larger
          plan.
        </div>
      </>
    ),
  },
  {
    key: 8,
    label: 'What does “Upon request” mean in the comparison table?',
    children: (
      <>
        <div>The feature is included in your plan — there is no extra cost.</div>
        <div>
          It is not turned on automatically. We set it up for you, because it has to be connected to
          your own systems or configured for your instance.
        </div>
        <div>To get it enabled, contact us and we will set it up.</div>
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
