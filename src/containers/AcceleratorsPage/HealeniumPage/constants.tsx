import React from 'react';

export const TIME_SCALE_DATA = [
  {
    time: 8,
    items: ['Responding to Healenium support Questions'],
  },
  {
    time: 50,
    items: [
      'Updating of Healenium and supporting libraries',
      'Integration of Healenium with CI/CD Pipelines',
      'Team Training and Webinars',
    ],
  },
  {
    time: 120,
    items: ['Healenium Custom Development Services'],
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
    label: 'Will Healenium work with my test automation framework?',
    children: (
      <div>
        Healenium will work with any kind of Java + Selenium-based test automation framework.
      </div>
    ),
  },
  {
    key: 3,
    label: 'How can I try to use the product?',
    children: <div>Follow installation instructions on GitHub.</div>,
  },
  {
    key: 4,
    label: 'Can I use it for mobile automation?',
    children: <div>Yes, there is an adapter that supports Appium-based testing solutions.</div>,
  },
];
