interface AmplifyRedirect {
  source: string;
  target: string;
  status: '301' | '302' | '200' | '404';
  condition: string | null;
}

export const amplifyRedirects: AmplifyRedirect[] = [
  {
    source: '/pricing/on-premises/',
    target: '/pricing/service-packages/',
    status: '301',
    condition: null,
  },
  {
    source: '/contact-us/on-premises/lite/',
    target: '/contact-us/service-packages/silver/',
    status: '301',
    condition: null,
  },
  {
    source: '/contact-us/on-premises/service-pro/',
    target: '/contact-us/service-packages/gold/',
    status: '301',
    condition: null,
  },
  {
    source: '/contact-us/on-premises/advanced/',
    target: '/contact-us/service-packages/platinum/',
    status: '301',
    condition: null,
  },
  {
    source: '/contact-us/on-premises/compare/lite/',
    target: '/contact-us/service-packages/silver/',
    status: '301',
    condition: null,
  },
  {
    source: '/contact-us/on-premises/compare/service-pro/',
    target: '/contact-us/service-packages/gold/',
    status: '301',
    condition: null,
  },
  {
    source: '/contact-us/on-premises/compare/advanced/',
    target: '/contact-us/service-packages/platinum/',
    status: '301',
    condition: null,
  },
];
