import React, { CSSProperties, FC, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { Link } from '@app/components/Link';
import {
  ContentfulAsset,
  createBemBlockBuilder,
  isAbsoluteURL,
  isContentfulRecord,
  LinkDto,
} from '@app/utils';
import ArrowIcon from '@app/svg/arrow.inline.svg';

interface SectionItemBaseProps {
  title: string;
  link: LinkDto;
  icon?: ContentfulAsset | ReactElement | string;
  text?: string;
  sys?: object;
  hoverIcon?: ContentfulAsset;
  iconClass?: string;
  className?: string;
  isDataFromContentful?: boolean;
  mode?: 'primary' | 'secondary';
}

export type SectionItemProps =
  | (SectionItemBaseProps & { iconClass: string; icon?: never })
  | (SectionItemBaseProps & { icon: ContentfulAsset | ReactElement | string; iconClass?: never });

export const SectionItem: FC<SectionItemProps> = props => {
  const { title, link, icon, hoverIcon, iconClass, text, className = '', mode = 'primary' } = props;

  const getBlocksWith = createBemBlockBuilder(['section-item', className]);
  const shouldDisplayArrow = mode === 'secondary' && isAbsoluteURL(link.url);

  const renderIcon = () => {
    const isDataFromContentful = isContentfulRecord(props);
    const iconClassName = isDataFromContentful ? 'contentful' : iconClass;

    if (iconClassName) {
      return (
        <>
          {typeof document !== 'undefined' &&
            hoverIcon &&
            createPortal(<link rel="preload" as="image" href={hoverIcon.url} />, document.head)}
          <span
            className={getBlocksWith('-icon', `-icon--${iconClassName}`)}
            {...(isDataFromContentful && {
              style: {
                '--icon': `url('${(icon as ContentfulAsset).url}')`,
                '--hover-icon': `url('${((hoverIcon ?? icon) as ContentfulAsset).url}')`,
              } as CSSProperties,
            })}
          />
        </>
      );
    }

    return <>{icon}</>;
  };

  return (
    <Link
      key={title}
      to={link.url}
      className={classNames(getBlocksWith(), { [getBlocksWith('--no-text')]: !text })}
    >
      {renderIcon()}
      <div>
        <p className={getBlocksWith('-title')}>
          {title}
          {shouldDisplayArrow && <ArrowIcon className={getBlocksWith('-arrow')} />}
        </p>
        {text && <p className={getBlocksWith('-text')}>{text}</p>}
      </div>
    </Link>
  );
};
