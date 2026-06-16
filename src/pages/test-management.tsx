import React, { FC } from 'react';
import { Layout, Seo } from '@app/components/Layout';
import { TestManagementPage } from '../containers/TestManagementPage';

const TestManagement: FC = () => (
  <Layout>
    <TestManagementPage />
  </Layout>
);

export default TestManagement;

export const Head = () => (
  <Seo
    title="Test Management System — ReportPortal"
    description="Plan, design, and execute tests inside ReportPortal. A unified Test Management System with Test Case Library, Milestones, Test Plans, and Manual Executions."
  />
);
