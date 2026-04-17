import { isDateBetweenNov25AndJan15GMT3 } from './isDateBetweenNov25AndJan15GMT3';

export const LIST_ANIMATION_DELAY = 10000;

export const BLOG_PAGE_SIZE = 12;

export const DOCUMENTATION_URL = process.env.DOCUMENTATION_URL as string;
export const CONTACT_US_URL = process.env.CONTACT_US_URL as string;

export const isNewYearMode = isDateBetweenNov25AndJan15GMT3();

export const ANNOUNCEMENT_CLOSED_KEY = 'wasAnnouncementClosed';

export const SEO_DATA = {
  index: {
    title:
      'ReportPortal test automation analytics platform and real-time reporting, powered by Machine Learning',
    description:
      'Centralized test automation dashboard. Provides AI-based defects triage and real time test report dashboard.',
  },
  features: {
    title: 'Features',
    description:
      'Explore features for seamless test automation. Rethink end-to-end testing with automated defect triaging and a dynamic QA metrics dashboard.',
  },
  blog: {
    title: 'Blog',
    description: "Stay informed by reading ReportPortal's updates, news, and technology articles.",
  },
  business: {
    title: 'Business sponsorship program',
    description:
      'Boost brand visibility, enhance your tech influence, and shape the future of end to end testing reporting tools by sponsoring ReportPortal.',
  },
  individual: {
    title: 'Individual sponsorship program',
    description:
      'Help maintain a test automation results dashboard by sponsoring ReportPortal. Enjoy the acknowledgment of your efforts.',
  },
  community: {
    title: 'Community',
    description:
      'Connect, learn, and collaborate with testing enthusiasts. Join the ReportPortal community.',
  },
  terms: {
    title: 'Terms and Conditions',
    description:
      'Review the Terms and Conditions to stay informed about the rules governing the use of our test automation results dashboard.',
  },
  caseStudies: {
    title: 'Case Studies',
    description:
      'Discover how organizations have optimized their testing processes thanks to ReportPortal.',
  },
  installation: {
    title: 'Installation guide',
    description: 'Three steps to get started with our test automation dashboard.',
  },
  qeConsulting: {
    title: 'Quality Engineering Consulting',
    description:
      'Achieve a product-quality transformation with our outstanding Quality Engineering Consulting.',
  },
  testAutomationAsAService: {
    title: 'Test Automation as a Service',
    description:
      'Enhance your testing process by utilizing our on-demand automation tools, infrastructure, hardware, and expert resources.',
  },
  testingAsAService: {
    title: 'Testing as a Service',
    description:
      'Optimize your testing costs with our on-demand software, hardware, and expert resources.',
  },
  saas: {
    title: 'Pricing: SaaS',
    description:
      'Explore our flexible pricing plans from small teams to global enterprises. Harness the power of our end-to-end testing reporting tool.',
  },
  servicePackages: {
    title: 'Pricing: Service Packages',
    description:
      'Select the pricing plan that best suits your needs and unlock the full potential of our test report dashboard.',
  },
  qasp: {
    title: 'Pricing for accelerators: QaSpace',
    description:
      "Dive into the specifics of our offerings to keep track of your project's health and progress with our advanced QA metrics dashboard.",
  },
  hlm: {
    title: 'Pricing for accelerators: Healenium',
    description:
      'Choose the pricing package that enables you to stay ahead of the curve with our comprehensive test automation reporting solutions.',
  },
  d4j: {
    title: 'Pricing for accelerators: Drill4J',
    description:
      'Enhance your testing strategy with our priced plans, designed to streamline your quality assurance workflows.',
  },
  contactUsGeneral: {
    title: 'Contact us',
    description:
      'Whether you have questions about our services or need assistance, feel free to connect with us using this form.',
  },
};

export const COMMON_MARQUEE_PROPS = {
  speed: 25,
  pauseOnHover: true,
  gradient: false,
};

export const EMAIL_VALIDATION_REGEX =
  /^(?![.])(?!.*[_.-]{2})[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?<![_\-.])$/;
