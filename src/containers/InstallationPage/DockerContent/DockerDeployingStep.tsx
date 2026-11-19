import React, { FC } from 'react';
import { Typography } from 'antd';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder } from '@app/utils';

import '../InstallationPage.scss';

const DOCUMENTATION_URL = process.env.DOCUMENTATION_URL;

export const DockerDeployingStep: FC = () => {
  const { Text } = Typography;
  const getBlocksWith = createBemBlockBuilder(['installation']);
  const dockerSnippet = `services:
  api:
    environment:
      RP_INITIAL_ADMIN_PASSWORD: "YourSecurePass"`;

  return (
    <>
      <div className={getBlocksWith('__wrapper')}>
        <div className={getBlocksWith('__chapter')}>Step 1</div>
        <h3 className={getBlocksWith('__title-content')}>Configure and deploy ReportPortal</h3>
        <p>The following guide describes deployment on Linux/Mac/Windows.</p>
        <p>
          1. Download the latest ReportPortal Docker compose file from{' '}
          <Link
            className={getBlocksWith('__link')}
            to="https://github.com/reportportal/reportportal/blob/master/docker-compose.yml"
          >
            GitHub
          </Link>
          . You can make it by running the following command:
        </p>

        <Text className={getBlocksWith('__code')} code copyable>
          curl -LO
          https://raw.githubusercontent.com/reportportal/reportportal/master/docker-compose.yml
        </Text>
        <p>
          Open <span className={getBlocksWith('__code-text')}>docker-compose.yml</span> and set a
          strong admin password:
        </p>

        <Text className={getBlocksWith('__code')} code copyable>
          {dockerSnippet}
        </Text>

        <p>2. Start the application using the following command:</p>

        <Text className={getBlocksWith('__code')} code copyable>
          docker-compose -p reportportal up -d --force-recreate
        </Text>

        <p>
          For detailed instructions, advanced configuration, backup/restore, and production
          recommendations, see the full guide:{' '}
          <Link
            className={getBlocksWith('__link')}
            to={`${DOCUMENTATION_URL}/installation-steps/DeployWithDocker/`}
          >
            How to deploy with Docker
          </Link>
          .
        </p>
      </div>
    </>
  );
};
