import React, { FC } from 'react';
import { Typography } from 'antd';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder } from '@app/utils';

import { Notice } from '../Notice';

import '../InstallationPage.scss';

export const LaunchPortal: FC = () => {
  const { Text } = Typography;
  const getBlocksWith = createBemBlockBuilder(['installation']);

  return (
    <div className={getBlocksWith('__wrapper')}>
      <div className={getBlocksWith('__chapter')}>Step 2</div>
      <h3 className={getBlocksWith('__title-content')}>Launch ReportPortal</h3>
      <p>If you deploy ReportPortal on a separate host, use:</p>

      <Text className={getBlocksWith('__code')} code copyable>
        http://IP_ADDRESS:8080
      </Text>

      <p>
        Otherwise, open{' '}
        <Link className={getBlocksWith('__link')} to="http://localhost:8080/ui/">
          ReportPortal
        </Link>{' '}
        and login.
      </p>

      <Notice importance>
        ReportPortal is ready for login when you see a list of services (API Service, Jobs Service,
        Authorization Service, Service UI) at the bottom of the Login Page.
      </Notice>

      <div className={getBlocksWith('__access')}>
        <h5>Use the following credentials:</h5>
        <div>
          <h6>For user access:</h6>
          <div className={getBlocksWith('__access-container')}>
            <div className={getBlocksWith('__access-item')}>
              Login:
              <Text className={getBlocksWith('__code')} code copyable>
                default@reportportal.internal
              </Text>
            </div>

            <div className={getBlocksWith('__access-item')}>
              Password:
              <Text className={getBlocksWith('__code')} code copyable>
                1q2w3e
              </Text>
            </div>
          </div>
        </div>
        <div>
          <h6>For admin access:</h6>
          <div className={getBlocksWith('__access-container')}>
            <div className={getBlocksWith('__access-item')}>
              Login:
              <Text className={getBlocksWith('__code')} code copyable>
                admin@reportportal.internal
              </Text>
            </div>

            <div className={getBlocksWith('__access-item')}>
              Password:
              <Text className={getBlocksWith('__code')} code>
                Password specified in Step 1
              </Text>
            </div>
          </div>
        </div>
      </div>
      <p>Please change admin password for security reasons.</p>
    </div>
  );
};
