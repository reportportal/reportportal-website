import React, { FC } from 'react';
import { createBemBlockBuilder, DOCUMENTATION_URL } from '@app/utils';
import { Link } from '@app/components/Link';

import { Notice } from '../Notice';

import '../InstallationPage.scss';

export const GoogleCloudLaunchPortal: FC = () => {
  const getBlocksWith = createBemBlockBuilder(['installation']);

  return (
    <div className={getBlocksWith('__wrapper')}>
      <div className={getBlocksWith('__chapter')}>Step 2</div>
      <h3 className={getBlocksWith('__title-content')}>Launch ReportPortal</h3>
      <p>
        After the deployment is completed, we will land on the page with application information
        from which we can follow the link to log in. Then please proceed with the following actions:
      </p>
      <p>
        1. Open <b>Service URL</b> link from the &apos;ReportPortal info&apos; section.
      </p>
      <Notice importance>
        Clicking &apos;Service URL&apos; might trigger a &apos;connection not private&apos; browser
        alert, but there&apos;s no actual risk as you&apos;re accessing your own server. This alert
        because Google Marketplace uses a temporary, self-signed certificate during deployment for
        data encryption. As this certificate isn&apos;t connected to any domain, just like
        ReportPortal at this stage, browsers flag it as unverified, hence the warning.
      </Notice>
      <p>
        2. For the Chrome browser, click on <b>&apos;Advanced&apos;</b> — then click on
        &apos;Proceed to XXXXX (unsafe)&apos; button-link (where &apos;XXXXX&apos; is your generated
        Service URL address).
      </p>
      <p>
        3. On the opened ReportPortal authorization page, input <b>superadmin</b> as your login. For
        the password, use the auto-generated <b>initial password</b> from the &apos;ReportPortal
        info&apos; section.
      </p>
      <Notice>
        It may take Google Kubernetes Engine a few minutes before the application becomes accessible
        via the link.
      </Notice>
      <p>Let&apos;s get your ReportPortal instance up!</p>
      <p>
        For a more comprehensive installation guide, please refer to the{' '}
        <Link
          className={getBlocksWith('__link')}
          to={`${DOCUMENTATION_URL}/installation-steps/DeployViaGoogleCloudMarketplace/`}
        >
          link
        </Link>
        .
      </p>
    </div>
  );
};
