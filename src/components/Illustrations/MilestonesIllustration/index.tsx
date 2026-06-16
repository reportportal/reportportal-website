import React, { FC } from 'react';
import classNames from 'classnames';
import { useInView } from '@app/hooks/useInView';

import './MilestonesIllustration.scss';

export const MilestonesIllustration: FC = () => {
  const [ref, isVisible] = useInView({ once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={classNames('mi', { 'mi--visible': isVisible })}
      role="img"
      aria-label="Milestones interface showing sprint, release, plan and feature milestone rows with test plan coverage"
    >
      <div className="mi__shell">

        {/* ── Left nav strip ──────────────────────────────────────────────── */}
        <div style={{ width: '42px', background: '#1C2A40', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: '5px', flexShrink: 0 }}>
          {/* RP logo */}
          <div style={{ width: '24px', height: '24px', marginBottom: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M3.69 23.39v5.08c0 .38.21.73.55.92l15.21 8.47c.34.19.76.19 1.1 0l15.21-8.47c.34-.19.55-.54.55-.92v-6.82L20 30.76l-9.66-5.38v-5.69L3.69 23.39Z" fill="white" />
              <path d="M20 9.24l9.66 5.38v5.77l6.65-3.7v-5.16c0-.38-.21-.73-.55-.92L20.55 2.14a1.1 1.1 0 00-1.1 0L4.24 10.61c-.34.19-.55.54-.55.92v6.94L20 9.24Z" fill="white" />
            </svg>
          </div>

          {/* Avatar */}
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#4A5568', border: '0.5px solid rgba(255,255,255,0.15)', marginBottom: '3px' }} />
          {/* Divider */}
          <div style={{ width: '18px', height: '0.5px', background: 'rgba(0,157,187,0.3)', margin: '3px 0' }} />

          {/* Nav icon placeholders */}
          <div className="mi__nb"><div style={{ width: '12px', height: '10px', borderRadius: '2px', background: 'rgba(200,220,230,0.25)' }} /></div>
          <div className="mi__nb"><div style={{ width: '12px', height: '10px', borderRadius: '2px', background: 'rgba(200,220,230,0.25)' }} /></div>
          <div className="mi__nb"><div style={{ width: '12px', height: '10px', borderRadius: '2px', background: 'rgba(200,220,230,0.25)' }} /></div>

          {/* Active nav item — milestones / flag icon */}
          <div className="mi__nb mi__nb--on">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden="true">
              <path d="M2 12.5V1.5" stroke="#00D4F0" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M2 1.5h9L8.5 5l2.5 3.5H2V1.5z" fill="rgba(0,212,240,0.18)" stroke="#00D4F0" strokeWidth="1.05" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="mi__nb"><div style={{ width: '12px', height: '10px', borderRadius: '2px', background: 'rgba(200,220,230,0.25)' }} /></div>

          <div style={{ flex: 1 }} />

          {/* Bottom avatar */}
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#4A5568', border: '0.5px solid rgba(255,255,255,0.1)' }} />
        </div>

        {/* ── Main content ────────────────────────────────────────────────── */}
        <div style={{ flex: 1, background: '#F5F8FB', display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

          {/* Title bar */}
          <div className="mi__hd">
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#1A2740', flex: 1 }}>Milestones</span>
            <div style={{ padding: '6px 12px', background: '#fff', border: '1px solid #009DBB', borderRadius: '6px', fontSize: '10px', color: '#009DBB', fontWeight: 700, cursor: 'default' }}>
              Create Milestone
            </div>
          </div>

          {/* Milestone list */}
          <div style={{ padding: '14px 18px 14px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>

            {/* ── MS1: Sprint ─────────────────────────────────────────────── */}
            <div className="mi__ms-row mi__ms-row--1">
              <div className="mi__ms-hdr">
                <span style={{ fontSize: '9px', color: '#C3C8D5', flexShrink: 0 }}>▶</span>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #C3C8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7a5 5 0 015-5 5 5 0 013.5 1.4L12 5" stroke="#8791AB" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M12 7a5 5 0 01-5 5 5 5 0 01-3.5-1.4L2 9" stroke="#8791AB" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M10.5 3.5L12 5l-1.8.8" stroke="#8791AB" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.5 10.5L2 9l1.8-.8" stroke="#8791AB" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1A2740' }}>Sprint 59 — Backend Hardening</div>
                  <div style={{ fontSize: '9.5px', color: '#8791AB', marginTop: '1px' }}>02-17-2025 — 02-28-2025</div>
                </div>
                <div style={{ textAlign: 'center', minWidth: '52px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A2740' }}>95%</div>
                  <div style={{ fontSize: '9px', color: '#8791AB' }}>Covered</div>
                </div>
                <div style={{ textAlign: 'center', minWidth: '44px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A2740' }}>2</div>
                  <div style={{ fontSize: '9px', color: '#8791AB' }}>Plans</div>
                </div>
                <div className="mi__pill" style={{ background: '#009DBB', color: '#fff' }}>
                  Scheduled
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2.5 3.5L5 6.5l2.5-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── MS2: Release (expanded) ──────────────────────────────────── */}
            <div className="mi__ms-row mi__ms-row--2" style={{ border: '0.5px solid #C2DDE8', flexShrink: 0 }}>
              <div className="mi__ms-hdr" style={{ background: '#F8FBFD' }}>
                <span className="mi__chevron" style={{ fontSize: '9px', color: '#009DBB', flexShrink: 0 }}>▶</span>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #66D2E6', background: '#EBFBFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 2s2.5.5 3.5 3.5S10 11 10 11L7 9.5 4 11s-1.5-2.5-.5-5.5S7 2 7 2z" stroke="#009DBB" strokeWidth="1.1" strokeLinejoin="round" />
                    <circle cx="7" cy="6.5" r="1.2" stroke="#009DBB" strokeWidth="1" />
                    <path d="M5 10.5L4 13M9 10.5L10 13" stroke="#009DBB" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#005A6E' }}>Release 12.4 — Q1 Delivery</div>
                  <div style={{ fontSize: '9.5px', color: '#8791AB', marginTop: '1px' }}>01-16-2025 — 02-14-2025</div>
                </div>
                <div style={{ textAlign: 'center', minWidth: '52px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A2740' }}>62%</div>
                  <div style={{ fontSize: '9px', color: '#8791AB' }}>Covered</div>
                </div>
                <div style={{ textAlign: 'center', minWidth: '44px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A2740' }}>5</div>
                  <div style={{ fontSize: '9px', color: '#8791AB' }}>Plans</div>
                </div>
                <div className="mi__pill" style={{ background: '#009DBB', color: '#fff' }}>
                  Testing
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2.5 3.5L5 6.5l2.5-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Expanded body — animates open */}
              <div className="mi__xb">
                <div className="mi__col-hdr">
                  <span className="mi__cl" style={{ flex: 1 }}>Test plan name</span>
                  <span className="mi__cl" style={{ width: '100px', textAlign: 'center' }}>Covered / Total</span>
                  <span style={{ width: '24px', flexShrink: 0 }} />
                  <span className="mi__cl" style={{ width: '112px', textAlign: 'left' }}>Coverage</span>
                </div>

                {/* Row 1 */}
                <div className="mi__pr-row">
                  <span style={{ flex: 1, fontSize: '11px', color: '#2F3C5F', fontWeight: 600 }}>API Gateway &amp; Integrations</span>
                  <span style={{ width: '100px', fontSize: '10.5px', color: '#5F7A8A', textAlign: 'center' }}>37 / 50</span>
                  <span style={{ width: '24px', flexShrink: 0 }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '112px' }}>
                    <div className="mi__bar-track"><div className="mi__bar-fill mi__bar-fill--1" /></div>
                    <span style={{ width: '32px', fontSize: '11px', fontWeight: 700, color: '#1A2740', textAlign: 'right' }}>78%</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="mi__pr-row">
                  <span style={{ flex: 1, fontSize: '11px', color: '#2F3C5F', fontWeight: 600 }}>Auth &amp; Permissions</span>
                  <span style={{ width: '100px', fontSize: '10.5px', color: '#5F7A8A', textAlign: 'center' }}>98 / 98</span>
                  <span style={{ width: '24px', flexShrink: 0 }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '112px' }}>
                    <div className="mi__bar-track"><div className="mi__bar-fill mi__bar-fill--2" /></div>
                    <span style={{ width: '32px', fontSize: '11px', fontWeight: 700, color: '#1A2740', textAlign: 'right' }}>100%</span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="mi__pr-row">
                  <span style={{ flex: 1, fontSize: '11px', color: '#2F3C5F', fontWeight: 600 }}>UI Component Suite</span>
                  <span style={{ width: '100px', fontSize: '10.5px', color: '#5F7A8A', textAlign: 'center' }}>231 / 231</span>
                  <span style={{ width: '24px', flexShrink: 0 }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '112px' }}>
                    <div className="mi__bar-track"><div className="mi__bar-fill mi__bar-fill--3" /></div>
                    <span style={{ width: '32px', fontSize: '11px', fontWeight: 700, color: '#1A2740', textAlign: 'right' }}>100%</span>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="mi__pr-row">
                  <span style={{ flex: 1, fontSize: '11px', color: '#2F3C5F', fontWeight: 600 }}>Load &amp; Performance</span>
                  <span style={{ width: '100px', fontSize: '10.5px', color: '#5F7A8A', textAlign: 'center' }}>117 / 345</span>
                  <span style={{ width: '24px', flexShrink: 0 }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '112px' }}>
                    <div className="mi__bar-track"><div className="mi__bar-fill mi__bar-fill--4" /></div>
                    <span style={{ width: '32px', fontSize: '11px', fontWeight: 700, color: '#1A2740', textAlign: 'right' }}>32%</span>
                  </div>
                </div>

                {/* Row 5 */}
                <div className="mi__pr-row">
                  <span style={{ flex: 1, fontSize: '11px', color: '#2F3C5F', fontWeight: 600 }}>Regression Pack v3</span>
                  <span style={{ width: '100px', fontSize: '10.5px', color: '#5F7A8A', textAlign: 'center' }}>101 / 467</span>
                  <span style={{ width: '24px', flexShrink: 0 }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '112px' }}>
                    <div className="mi__bar-track"><div className="mi__bar-fill mi__bar-fill--5" /></div>
                    <span style={{ width: '32px', fontSize: '11px', fontWeight: 700, color: '#1A2740', textAlign: 'right' }}>16%</span>
                  </div>
                </div>

                {/* Create test plan */}
                <div className="mi__ctp" style={{ padding: '10px 16px 10px 32px', borderTop: '0.5px solid #EEF3F8' }}>
                  <span style={{ fontSize: '10.5px', color: '#009DBB', fontWeight: 700, cursor: 'default' }}>+ Create Test Plan</span>
                </div>
              </div>
            </div>

            {/* ── MS3: Plan ───────────────────────────────────────────────── */}
            <div className="mi__ms-row mi__ms-row--3">
              <div className="mi__ms-hdr">
                <span style={{ fontSize: '9px', color: '#C3C8D5', flexShrink: 0 }}>▶</span>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #C3C8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden="true">
                    <path d="M2.5 13V2" stroke="#8791AB" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M2.5 2h8.5L8.5 5.5 11 9H2.5V2z" stroke="#8791AB" strokeWidth="1.1" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1A2740' }}>Plan — Q1 Testing Strategy</div>
                  <div style={{ fontSize: '9.5px', color: '#8791AB', marginTop: '1px' }}>01-01-2025 — 01-16-2025</div>
                </div>
                <div style={{ textAlign: 'center', minWidth: '52px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A2740' }}>92%</div>
                  <div style={{ fontSize: '9px', color: '#8791AB' }}>Covered</div>
                </div>
                <div style={{ textAlign: 'center', minWidth: '44px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A2740' }}>3</div>
                  <div style={{ fontSize: '9px', color: '#8791AB' }}>Plans</div>
                </div>
                <div className="mi__pill" style={{ background: '#fff', border: '1px solid #C8DDE6', color: '#5F7A8A' }}>
                  Completed
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2.5 3.5L5 6.5l2.5-3" stroke="#8791AB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
