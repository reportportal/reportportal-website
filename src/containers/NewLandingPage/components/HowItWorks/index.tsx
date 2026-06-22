import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';
import { useInView } from '@app/hooks/useInView';
import { Link } from '@app/components/Link';

import { HOW_IT_WORKS_STEPS } from './constants';

import './HowItWorks.scss';

const getBlocksWith = createBemBlockBuilder(['how-it-works-new']);

// 24×24 stroke icons — one per step
const STEP_ICONS: Record<string, React.ReactNode> = {
  '01': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  '02': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  '03': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  '04': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  '05': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export const HowItWorks: FC = () => {
  // Pause the two infinite decorative animations (hiw-pulse badge + hiw-flow
  // connector) when the section is scrolled out of view or the tab is hidden.
  // Keeping them running off-screen steals frames and makes scrolling feel
  // less smooth, with zero visual benefit.
  const [ref, isInView] = useInView({ once: false });

  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true,
  );

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const onVisibilityChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  return (
    <section
      ref={ref}
      className={classNames(getBlocksWith(), {
        'how-it-works-new--paused': !isInView || !isTabVisible,
      })}
    >
    <div className={getBlocksWith('__pattern-top')} aria-hidden="true" />
    <div className={getBlocksWith('__pattern-bottom')} aria-hidden="true" />
    <div className={classNames(getBlocksWith('__inner'), 'container')}>

      {/* Heading */}
      <h2>How it works</h2>

      {/* Subtitle */}
      <p className={getBlocksWith('__subtitle')}>
        From test design to release — one agentic pipeline.
      </p>

      {/* Badge — below subtitle, introduces the step flow */}
      <div className={getBlocksWith('__badge')}>AI Agents</div>

      {/* Simple gradient stem — mobile & tablet only.
          On desktop, the T-bar SVG below takes over. */}
      <div className={getBlocksWith('__connector-stem')} aria-hidden="true" />

      {/* T-bar SVG connector — desktop only.
          viewBox 1000×48: spine at y=16, drops to y=48.
          Column centres at 10%, 30%, 50%, 70%, 90% (5 equal cols).
          Gradient fades to transparent at both edges.
          Outer elbows (cards 1 & 5) are Q-bezier rounded corners.
          5 animated paths branch simultaneously: 2 s on, 4 s off. */}
      <svg
        className={getBlocksWith('__connector')}
        viewBox="0 0 1000 48"
        width="100%"
        height="48"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="hiw-tbar-grad"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2="1000" y2="0"
          >
            <stop offset="0%"   stopColor="#9b59f5" stopOpacity="0" />
            <stop offset="8%"   stopColor="#9b59f5" stopOpacity="1" />
            <stop offset="50%"  stopColor="#00b4d5" stopOpacity="1" />
            <stop offset="92%"  stopColor="#00d4aa" stopOpacity="1" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Static faint base traces.
            Outer corners (cards 1 & 5) use a Q-bezier for rounded elbows;
            inner drops are straight lines. */}
        <g
          stroke="url(#hiw-tbar-grad)"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        >
          <line x1="500" y1="0"   x2="500" y2="16" />
          {/* Spine stops at x=108/892 — exactly where the Q-curves begin */}
          <line x1="108" y1="16"  x2="892" y2="16" />
          {/* Outer rounded drops */}
          <path d="M 108,16 Q 100,16 100,24 L 100,48" />
          <path d="M 892,16 Q 900,16 900,24 L 900,48" />
          {/* Inner straight drops */}
          <line x1="300" y1="16" x2="300" y2="48" />
          <line x1="500" y1="16" x2="500" y2="48" />
          <line x1="700" y1="16" x2="700" y2="48" />
        </g>

        {/* Animated energy pulses — 5 complete paths, one per card.
            All start simultaneously from the badge (500,0).
            Outer paths (cards 1 & 5) use Q-bezier rounded elbows.
            pathLength="100" normalises dasharray across all path lengths. */}
        <g
          stroke="url(#hiw-tbar-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        >
          {/* Card 1 — left outer, rounded elbow */}
          <path className="hiw-flow" d="M 500,0 L 500,16 L 108,16 Q 100,16 100,24 L 100,48" pathLength="100" />
          {/* Card 2 */}
          <path className="hiw-flow" d="M 500,0 L 500,16 L 300,16 L 300,48" pathLength="100" />
          {/* Card 3 — centre, straight down */}
          <path className="hiw-flow" d="M 500,0 L 500,48" pathLength="100" />
          {/* Card 4 */}
          <path className="hiw-flow" d="M 500,0 L 500,16 L 700,16 L 700,48" pathLength="100" />
          {/* Card 5 — right outer, rounded elbow */}
          <path className="hiw-flow" d="M 500,0 L 500,16 L 892,16 Q 900,16 900,24 L 900,48" pathLength="100" />
        </g>
      </svg>

      {/* Cards grid */}
      <div className={getBlocksWith('__features-list')}>
        {HOW_IT_WORKS_STEPS.map(({ step, title, description }) => (
          <div key={step} className={getBlocksWith('__feature-item')}>
            <div className={getBlocksWith('__step-icon')}>
              {STEP_ICONS[step]}
            </div>
            <span className={getBlocksWith('__step-label')}>STEP {step}</span>
            <span className={getBlocksWith('__feature-title')}>{title}</span>
            <span className={getBlocksWith('__feature-description')}>{description}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className={getBlocksWith('__button-group')}>
        <Link
          className="btn btn--primary btn--large"
          to="https://demo.reportportal.io/"
          data-gtm="try_demo_how_it_works"
        >
          Try demo
        </Link>
      </div>

    </div>
    </section>
  );
};
