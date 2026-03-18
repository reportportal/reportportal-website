import React from 'react';
import feature1 from '@app/svg/featuresListItem1.svg';
import feature2 from '@app/svg/featuresListItem2.svg';
import feature3 from '@app/svg/featuresListItem3.svg';
import feature4 from '@app/svg/featuresListItem4.svg';
import feature5 from '@app/svg/featuresListItem5.svg';
import feature6 from '@app/svg/featuresListItem6.svg';
import feature7 from '@app/svg/featuresListItem7.svg';
import feature8 from '@app/svg/featuresListItem8.svg';
import { DOCUMENTATION_URL } from '@app/utils';
import { Link } from '@app/components/Link';
import { FAQSchemaItem, extractText } from '@app/components/StructuredData';

export const NAVIGATION_LIST = [
  { id: 1, name: 'Single-entry point for test reporting', link: '#single-entry' },
  { id: 2, name: 'Categorisation of failures', link: '#categorisation' },
  { id: 3, name: 'AI-based failure reason detection', link: '#ai-based' },
  { id: 4, name: 'Rich artifacts in test reports', link: '#rich-artifacts-in-test-reports' },
  { id: 5, name: 'Real-time reporting', link: '#real-time-reporting' },
  { id: 6, name: 'Data visualisation', link: '#visualisation-of-tests' },
  { id: 7, name: 'REST API', link: '#rest-api' },
  { id: 8, name: 'Quality Gates', link: '#quality-gates' },
];

export const FEATURES_LIST = [
  {
    title: 'Single-entry point and unified test reporting ',
    description:
      'Use a single-entry point to aggregate the results of all the automated tests in a unified way. It will help you to improve the efficiency and consistency of the testing process, enhance traceability and collaboration between the development team and stakeholders as all test results can be accessed, reviewed, and analyzed in one place.',
    image: feature1,
    id: 'single-entry',
    link: `${DOCUMENTATION_URL}/features/UnifiedTestReporting`,
  },
  {
    title: 'Categorisation of failures based on issue roots',
    description:
      'Get a better understanding of the underlying causes of the failures and set the appropriate Defect types to them: Product bug, Auto Bug, System Issue or custom type. Having all the failures categorized, you will be able to understand the failures context better, prioritize the issues and ensure that the most critical issues are addressed first.',
    image: feature2,
    id: 'categorisation',
    link: `${DOCUMENTATION_URL}/features/CategorisationOfFailures`,
  },
  {
    title: 'AI-based failure reason detection',
    description:
      'Reduce the time and resources by automating the process of identifying the root cause of test failures. By automating failure triaging process, your team will be able to focus on addressing the identified issues, increasing the coverage, rather than spending time on manual analysis.',
    image: feature3,
    id: 'ai-based',
    link: `${DOCUMENTATION_URL}/features/AIFailureReasonDetection`,
  },
  {
    title: 'Rich artifacts in test reports',
    description:
      'Get additional information beyond the basic test results, such as logs, screenshots, video recordings and network traffic (payloads and requests). This information will help you to speed up results analysis and categorization by providing more details about the test results and will make it easier to replicate and debug issues.',
    image: feature4,
    id: 'rich-artifacts-in-test-reports',
    link: `${DOCUMENTATION_URL}/features/RichArtifactsInTestReports`,
  },
  {
    title: 'Real-time reporting',
    description:
      'Access and view test results as soon as they are generated. No need to wait for the moment when test execution is completed. It will help you to speed up the process of addressing issues and save a significant amount of time in the long run.',
    image: feature5,
    id: 'real-time-reporting',
    link: `${DOCUMENTATION_URL}/features/RealTimeReporting`,
  },
  {
    title: 'Visualisation of test results',
    description:
      'Get a better understanding of the overall status of the testing process and product health, identify areas that need improvement and make data-driven decisions on product release.',
    image: feature6,
    id: 'visualisation-of-tests',
    link: `${DOCUMENTATION_URL}/features/VisualisationOfTestResults`,
  },
  {
    title: 'REST API',
    description:
      'Access and manipulate test results in a programmatic way in order to automate the process of sending test results, integrate with other tools, create custom reports, generate alerts or notifications and trigger certain actions like re-running of test cases, or triggering a build in a CI/CD pipeline.',
    image: feature7,
    id: 'rest-api',
    link: `${DOCUMENTATION_URL}/features/RESTAPI`,
  },
  {
    title: 'Quality Gates',
    description:
      'Use as an objective means of evaluating the quality of a software release, as opposed to subjective opinions or guesses. This will help to ensure that the software is of high quality and is free of major defects or issues, which can improve customer satisfaction and reduce the risk of software failures.',
    image: feature8,
    id: 'quality-gates',
    link: `${DOCUMENTATION_URL}/features/QualityGates`,
    isPremium: true,
  },
];

export const FEATURES_FAQ_ITEMS = [
  {
    key: 1,
    label: 'What is meant by "Premium feature"?',
    children: (
      <>
        <p>
          Premium feature is an advanced feature which comes on top of Free Open Source edition. It
          comes at no cost with SaaS offering and included into the &quot;160&quot; Managed Services
          package.
        </p>
        <p>
          See the{' '}
          <Link to={`${DOCUMENTATION_URL}/terms-and-conditions/PremiumFeatures`} className="link">
            List of features
          </Link>{' '}
          and their description.
        </p>
      </>
    ),
  },
  {
    key: 2,
    label: 'What capabilities does Rest API provide?',
    children: (
      <p>
        REST API enables users to easily integrate any testing framework or third-party tool with
        ReportPortal so as to report data into ReportPortal, call analyze action, add attributes,
        merge/update/finish launches. Besides, you can pull the data from ReportPortal in order to
        update the statuses in the pipeline, generate custom reports and many more.
      </p>
    ),
  },
];

export const FEATURES_FAQ_SCHEMA_ITEMS: FAQSchemaItem[] = FEATURES_FAQ_ITEMS.map(
  ({ label, children }) => ({
    question: label,
    answer: extractText(children),
  }),
);
