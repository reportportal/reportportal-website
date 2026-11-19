import { HowToSchemaParams } from '@app/components/StructuredData';

export const KUBERNETES_SECTIONS = [
  { step: 'Step 1', title: 'Configure and deploy ReportPortal', id: 'section-0' },
  { step: 'Step 2', title: 'Launch ReportPortal', id: 'section-1' },
  { step: 'Step 3', title: 'Integrate with your test framework', id: 'section-2' },
];

export const DOCKER_SECTIONS = [
  { step: 'Install Docker', title: '', id: 'section-0' },
  { step: 'Step 1', title: 'Configure and deploy ReportPortal', id: 'section-1' },
  { step: 'Step 2', title: 'Launch ReportPortal', id: 'section-2' },
  { step: 'Step 3', title: 'Integrate with your test framework', id: 'section-3' },
];

export const DOCKER = 'Docker';

export const KUBERNETES = 'Kubernetes';

export const DOCKER_HOW_TO_SCHEMA: HowToSchemaParams = {
  name: 'How to Install ReportPortal with Docker',
  description:
    'Step-by-step guide to install and deploy ReportPortal using Docker and Docker Compose.',
  steps: [
    {
      name: 'Install Docker',
      text: 'Install Docker Engine and ensure Docker Compose plugin is version 2.2 or higher. Allocate at least 2 CPUs, 6 GB RAM, and 20 GB free disk space to Docker. Supported OS: Linux (Ubuntu 20.04+), macOS (Docker Desktop requires macOS 12.0+), Windows (64-bit Windows 11 Pro+ with Hyper-V/WSL 2).',
    },
    {
      name: 'Configure and deploy ReportPortal',
      text: 'Download the latest ReportPortal Docker Compose file from GitHub by running: curl -LO https://raw.githubusercontent.com/reportportal/reportportal/master/docker-compose.yml. Set a strong admin password in docker-compose.yml, then start the application with: docker-compose -p reportportal up -d --force-recreate.',
    },
    {
      name: 'Launch ReportPortal',
      text: 'Open http://localhost:8080 in your browser and log in. Use the default credentials (email: default@reportportal.internal, password: 1q2w3e) for user access, or (email: admin@reportportal.internal, password: password specified in Step 1) for admin access. Change the admin password for security reasons.',
    },
    {
      name: 'Integrate with your test framework',
      text: 'Choose the appropriate integration agent for your programming language and test framework, then configure it to report test results to your ReportPortal instance.',
    },
  ],
};

export const KUBERNETES_HOW_TO_SCHEMA: HowToSchemaParams = {
  name: 'How to Install ReportPortal with Kubernetes',
  description:
    'Step-by-step guide to install and deploy ReportPortal on a Kubernetes cluster using Helm charts.',
  steps: [
    {
      name: 'Install the Helm chart',
      text: 'Ensure you have Kubernetes v1.26+ and Helm v3.4+. Minimum requirements: 2 CPUs and 6Gi of memory. Add the official ReportPortal Helm repository with: helm repo add reportportal https://reportportal.io/kubernetes && helm repo update reportportal. Install the chart with: helm install my-release --set serviceapi.auth.superadminInitPasswd.password="MyPassword" reportportal/reportportal.',
    },
    {
      name: 'Launch ReportPortal',
      text: 'Open http://localhost:8080 in your browser and log in. Use the default credentials (email: default@reportportal.internal, password: 1q2w3e) for user access, or (email: admin@reportportal.internal, password: password specified in Step 1) for admin access. Change the admin password for security reasons.',
    },
    {
      name: 'Integrate with your test framework',
      text: 'Choose the appropriate integration agent for your programming language and test framework, then configure it to report test results to your ReportPortal instance.',
    },
  ],
};
