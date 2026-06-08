import React, { CSSProperties, FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Divider } from 'antd';
import classNames from 'classnames';
import { useInView } from 'framer-motion';
import { Link } from '@app/components/Link';
import { Certificates } from '@app/components/CertificationCard/Certificates';
import { useFooter } from '@app/hooks/useFooter';
import { createBemBlockBuilder, isNewYearMode } from '@app/utils';

import { FooterList } from './FooterList';
import { NavLogoIcon, NewYearNavLogoIcon } from './icons';

import './Footer.scss';

const getBlocksWith = createBemBlockBuilder(['footer']);

export const Footer: FC = () => {
  const { text, sections, terms, socials } = useFooter();
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <footer ref={containerRef} className={getBlocksWith()}>
      <div className={classNames(getBlocksWith('__container'), 'container')}>
        <section id="footer-content" />
        <section className={getBlocksWith('__navigation')}>
          <div>
            <div className={getBlocksWith('__purpose')}>
              <Link to="/" className={getBlocksWith('__logo')}>
                {isNewYearMode ? <NewYearNavLogoIcon /> : <NavLogoIcon />}
              </Link>
              <span>{text}</span>
              <span>© {new Date().getFullYear()} ReportPortal</span>
            </div>
            <Certificates className={getBlocksWith('__certificates')} />
          </div>
          <div className={getBlocksWith('__navigation-links')}>
            {sections.map(({ title, items }) => (
              <FooterList key={title} title={title} items={items} />
            ))}
          </div>
        </section>
        <Divider />
        <section className={getBlocksWith('__secondary')}>
          <div className={getBlocksWith('__legal')}>
            <span className={getBlocksWith('__license')}>
              <span>
                Sponsored by&nbsp;
                <Link to="https://www.epam.com/">EPAM</Link>
              </span>
              <span>Licensed under Apache v2.0</span>
            </span>
            <div className={getBlocksWith('__terms')}>
              {terms.map(({ title, url }) => (
                <Link key={title} to={url}>
                  {title}
                </Link>
              ))}
            </div>
          </div>
          <div className={getBlocksWith('__other-links')}>
            <ul className={getBlocksWith('__social-links')}>
              {socials.map(({ alt, link, icon, hoverIcon }) => (
                <li key={link.url}>
                  <Link
                    to={link.url}
                    style={
                      {
                        '--hover-icon': `url('${hoverIcon.url}')`,
                      } as CSSProperties
                    }
                  >
                    {typeof document !== 'undefined' &&
                      isInView &&
                      createPortal(
                        <link rel="preload" as="image" href={hoverIcon.url} />,
                        document.head,
                      )}
                    <img src={icon.url} width={icon.width} height={icon.height} alt={alt} />
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </section>
      </div>
    </footer>
  );
};
