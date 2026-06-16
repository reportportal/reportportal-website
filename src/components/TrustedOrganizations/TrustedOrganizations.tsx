import React, { FC } from 'react';
import { useTrustedByOrganizations } from '@app/hooks/useTrustedByOrganizations';
import { createBemBlockBuilder } from '@app/utils';

import './TrustedOrganizations.scss';

const getBlocksWith = createBemBlockBuilder(['trusted-organizations']);

export const TrustedOrganizations: FC = () => {
  const organizations = useTrustedByOrganizations();

  // Swap Nokia (index 2) and Thomson Reuters (index 5)
  const reordered = [...organizations];
  if (reordered.length > 5) {
    [reordered[2], reordered[5]] = [reordered[5], reordered[2]];
  }

  const firstRow = reordered.slice(0, 3);
  const secondRow = reordered.slice(3, 6);

  return (
    <div className={getBlocksWith()}>
      <div className={getBlocksWith('__title')}>
        Trusted by leading companies
      </div>
      <div className={getBlocksWith('__icons-wrapper')}>
        <div className={getBlocksWith('__icons')}>
          {firstRow.map(({ secondaryLogo, id }) => (
            <div key={id} className={getBlocksWith('__icon')}>
              <img src={secondaryLogo?.url} alt={secondaryLogo?.title} loading="lazy" />
            </div>
          ))}
        </div>
        <div className={getBlocksWith('__icons')}>
          {secondRow.map(({ secondaryLogo, id }) => (
            <div key={id} className={getBlocksWith('__icon')}>
              <img src={secondaryLogo?.url} alt={secondaryLogo?.title} loading="lazy" />
            </div>
          ))}
          <div className={getBlocksWith('__and-more')}>+ many more</div>
        </div>
      </div>
    </div>
  );
};
