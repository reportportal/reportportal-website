interface Redirect {
  fromPath: string;
  toPath: string;
}

export const redirects: Redirect[] = [
  {
    fromPath: '/pricing/on-premises/',
    toPath: '/pricing/service-packages/',
  },
  {
    fromPath: '/contact-us/on-premises/lite/',
    toPath: '/contact-us/service-packages/silver/',
  },
  {
    fromPath: '/contact-us/on-premises/service-pro/',
    toPath: '/contact-us/service-packages/gold/',
  },
  {
    fromPath: '/contact-us/on-premises/advanced/',
    toPath: '/contact-us/service-packages/platinum/',
  },
  {
    fromPath: '/contact-us/on-premises/compare/lite/',
    toPath: '/contact-us/service-packages/silver/',
  },
  {
    fromPath: '/contact-us/on-premises/compare/service-pro/',
    toPath: '/contact-us/service-packages/gold/',
  },
  {
    fromPath: '/contact-us/on-premises/compare/advanced/',
    toPath: '/contact-us/service-packages/platinum/',
  },
];
