import React from 'react';
import { FAQSchemaItem, OfferSchemaParams, extractText } from '@app/components/StructuredData';

export const FAQ_ITEMS = [
  {
    key: 1,
    label: 'How does the free trial work?',
    children: (
      <>
        <div>
          As soon as you sign up and sign in, your free trial is considered to be activated.
        </div>
        <div>
          Your free trial lasts for 30 days and gives users access to all of the features of
          ReportPortal. As the free trial is associated with the Startup tier, all the limitations
          of the Startup tier (data storage, data retention policy) are applicable to the free trial
          period.
        </div>
        <div>*applies only to the Startup tier</div>
      </>
    ),
  },
  {
    key: 2,
    label: 'How many times can I get the free trial?',
    children: (
      <>
        <div>ReportPortal customers are eligible for one free trial only.</div>
        <div>
          Also, the free trial is only available for your first project (you won&apos;t be able to
          get the free trial if you&apos;ve already created a project or if you&apos;ve been invited
          to other projects before).
        </div>
        <div>*applies only to the Startup tier</div>
      </>
    ),
  },
  {
    key: 3,
    label: 'Do I need to provide credit card details to get the free trial?',
    children: (
      <>
        <div>No, the free trial doesn&apos;t require your card details.</div>
        <div>
          It is absolutely free and you are not obliged to keep using ReportPortal after the free
          trial. But in order to continue the usage of the application, you should accomplish the
          payment for the next term.
        </div>
        <div>*applies only to the Startup tier</div>
      </>
    ),
  },
  {
    key: 4,
    label: 'What happens when the free trial period ends?',
    children: (
      <>
        <div>
          In case you purchase a subscription on the day of the end of the free trial or before it,
          you will be able to proceed using ReportPortal. All the data reported during the free
          trial period will stay safe and remain on your project.
        </div>
        <div>
          If you do not purchase a subscription to one of the billing plans by the end of the trial
          or earlier, your project will be switched to read-only mode until you activate the
          subscription. Read-only mode means that during the next month after the end of the free
          trial, you will be able to use all the features except reporting functionality — you
          won&apos;t be able to report any new data into ReportPortal.
        </div>
        <div>
          If the subscription is still not activated during the month after the end of the free
          trial, all your project data will be erased.
        </div>
        <div>*applies only to Startup tier</div>
      </>
    ),
  },
  {
    key: 5,
    label: 'How is my subscription charged?',
    children: (
      <>
        <div>You will be charged at the beginning of each billing period.</div>
        <div>
          If you opt for a monthly plan, your minimum commitment is 3 months. Thus, you will be
          charged on the first day of the new quarterly billing cycle.
        </div>
        <div>
          If you are on a yearly plan, you will be charged on the first day of the new yearly cycle
          - either quarterly or annually in advance / bi-annually.
        </div>
      </>
    ),
  },
  {
    key: 6,
    label: 'Can I change the billing plan at any time?',
    children: (
      <div>
        <div>You may change your subscription plan at any time.</div>
        <div>
          Just reach out to us via email available on the Contact tab in Billing Settings of your
          Project.
        </div>
      </div>
    ),
  },
  {
    key: 7,
    label: 'What happens when a subscription expires?',
    children: (
      <>
        <div>
          In case of no payment, the project will be switched to &quot;read-only&quot; mode on the
          first day of the next billing cycle. During the next month, you&apos;ll be able to use all
          the features of the application except reporting functionality.
        </div>
        <div>After one month, all your project data will be erased.</div>
      </>
    ),
  },
];

export const SAAS_FAQ_SCHEMA_ITEMS: FAQSchemaItem[] = FAQ_ITEMS.map(({ label, children }) => ({
  question: label,
  answer: extractText(children),
}));

export const SAAS_OFFERS: OfferSchemaParams[] = [
  {
    name: 'Startup',
    price: '49',
    priceCurrency: 'USD',
    description: 'SaaS Startup plan for small teams',
    url: '/contact-us/saas/startup-plan',
  },
  {
    name: 'Business',
    price: '249',
    priceCurrency: 'USD',
    description: 'SaaS Business plan for growing teams',
    url: '/contact-us/saas/business-plan',
  },
  {
    name: 'Enterprise',
    description: 'SaaS Enterprise plan for large organizations with custom pricing',
    url: '/contact-us/saas/enterprise-plan',
  },
];
