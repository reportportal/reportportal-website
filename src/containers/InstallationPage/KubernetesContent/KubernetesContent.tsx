import React, { FC } from 'react';
import { Typography } from 'antd';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder } from '@app/utils';

import { Notice } from '../Notice';

import '../InstallationPage.scss';

export const KubernetesContent: FC = () => {
  const getBlocksWith = createBemBlockBuilder(['installation']);
  const { Text } = Typography;

  return (
    <div className={getBlocksWith('__wrapper')}>
      <div className={getBlocksWith('__chapter')}>Step 1</div>
      <h3 className={getBlocksWith('__title-content')}>Install the Helm chart</h3>
      <p>
        We use Helm package manager charts to bootstrap a ReportPortal deployment on a Kubernetes
        cluster.
      </p>
      <h4>Prerequisites</h4>
      <Notice>Min requirements for a ReportPortal 1-node solution: 2 CPUs and 6Gi of memory</Notice>
      <p>Required versions:</p>
      <ul className={getBlocksWith('__list', '__main-list')}>
        <li>Kubernetes v1.26+</li>
        <li>Helm Package Manager v3.4+</li>
      </ul>
      <h4>Chart installation</h4>
      <p>Add the official ReportPortal Helm Chart repository:</p>
      <Text className={getBlocksWith('__code')} code copyable>
        helm repo add reportportal https://reportportal.io/kubernetes && helm repo update
        reportportal
      </Text>
      <p>Install the chart:</p>
      <Text className={getBlocksWith('__code')} code copyable>
        helm install my-release --set
        serviceapi.auth.superadminInitPasswd.password=&quot;MyPassword&quot;
        reportportal/reportportal
      </Text>
      <Notice title="NOTE">
        Upon the initial installation and the first login of the SuperAdmin, they will be required
        to create a unique initial password, distinct from the default password provided in the
        ReportPortal installation documentation. Failure to do so will result in the Auth service
        not starting
      </Notice>
      <br />
      <p>
        To <b>uninstall</b> the chart use the following command:
      </p>
      <Text className={getBlocksWith('__code')} code copyable>
        helm uninstall my-release
      </Text>
      <p>
        To customize your chart, follow the instructions in the{' '}
        <Link
          className={getBlocksWith('__link')}
          to="https://github.com/reportportal/kubernetes/blob/develop/reportportal/README.md#configuration"
        >
          Configuration section
        </Link>{' '}
        Configuration section on GitHub.
      </p>
    </div>
  );
};
