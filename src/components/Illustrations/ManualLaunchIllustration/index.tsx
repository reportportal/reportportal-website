import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useInView } from '@app/hooks/useInView';

import './ManualLaunchIllustration.scss';

export const ManualLaunchIllustration: FC = () => {
  const [ref, isVisible] = useInView({ once: true });

  const [stepsVisible, setStepsVisible] = useState([false, false, false, false]);
  const [iconsVisible, setIconsVisible] = useState([false, false, false, false]);
  const [failClicking, setFailClicking] = useState(false);
  const [showExecChip, setShowExecChip] = useState(false);
  const [btsVisible, setBtsVisible] = useState(false);
  const [btag1, setBtag1] = useState(false);
  const [btag2, setBtag2] = useState(false);
  const [btsAdd, setBtsAdd] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return undefined;

    // Respect reduced-motion: show final state immediately, skip sequence
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setStepsVisible([true, true, true, true]);
      setIconsVisible([true, true, true, true]);
      setShowExecChip(true);
      setBtsVisible(true);
      setBtag1(true);
      setBtag2(true);
      setBtsAdd(true);
      setCommentVisible(true);
      return undefined;
    }

    // Skip animation sequence on mobile — CSS shows everything statically
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setStepsVisible([true, true, true, true]);
      setIconsVisible([true, true, true, true]);
      setShowExecChip(true);
      setBtsVisible(true);
      setBtag1(true);
      setBtag2(true);
      setBtsAdd(true);
      setCommentVisible(true);
      return undefined;
    }

    const ids: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      ids.push(setTimeout(fn, ms));
    };

    // ── Step rows appear staggered ──────────────────────────────────────
    [0, 1, 2, 3].forEach(i => {
      schedule(() => {
        setStepsVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 350 + i * 180);
    });

    // ── Checkmark icons: steps 1–3 green, step 4 red X ─────────────────
    [0, 1, 2].forEach(i => {
      schedule(() => {
        setIconsVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 1600 + i * 160);
    });
    // Step 4 — red X
    schedule(() => {
      setIconsVisible(prev => {
        const next = [...prev];
        next[3] = true;
        return next;
      });
    }, 1600 + 3 * 160);

    // ── Failed button click animation ───────────────────────────────────
    schedule(() => setFailClicking(true), 2650);

    // ── Swap pills → execution chip ─────────────────────────────────────
    schedule(() => setShowExecChip(true), 2820);

    // ── BTS section + tags ──────────────────────────────────────────────
    schedule(() => setBtsVisible(true), 3350);
    schedule(() => setBtag1(true), 3350 + 220);
    schedule(() => setBtag2(true), 3350 + 400);
    schedule(() => setBtsAdd(true), 3350 + 580);

    // ── Comment section ─────────────────────────────────────────────────
    schedule(() => setCommentVisible(true), 4200);

    return () => ids.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div className="manual-launch" ref={ref}>
      <div
        className={classNames('manual-launch__scene', {
          'manual-launch__scene--active': isVisible,
        })}
        role="img"
        aria-label="Manual test execution interface showing step-by-step test wizard with pass/fail results and linked issues"
      >
        {/* ── Left nav ──────────────────────────────────────────────────── */}
        <div
          style={{
            width: '42px',
            background: '#1C2A40',
            borderRight: '0.5px solid rgba(0,157,187,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 0',
            gap: '5px',
            flexShrink: 0,
            boxShadow: '4px 0 24px rgba(28,42,64,0.15)',
          }}
        >
          {/* RP logo */}
          <div
            style={{
              width: '24px',
              height: '24px',
              marginBottom: '8px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path
                d="M3.69 23.39v5.08c0 .38.21.73.55.92l15.21 8.47c.34.19.76.19 1.1 0l15.21-8.47c.34-.19.55-.54.55-.92v-6.82L20 30.76l-9.66-5.38v-5.69L3.69 23.39Z"
                fill="white"
              />
              <path
                d="M20 9.24l9.66 5.38v5.77l6.65-3.7v-5.16c0-.38-.21-.73-.55-.92L20.55 2.14a1.1 1.1 0 00-1.1 0L4.24 10.61c-.34.19-.55.54-.55.92v6.94L20 9.24Z"
                fill="white"
              />
            </svg>
          </div>
          {/* Top avatar */}
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: '#4A5568',
              border: '0.5px solid rgba(255,255,255,0.15)',
              marginBottom: '3px',
              flexShrink: 0,
            }}
          />
          {/* Divider */}
          <div
            style={{
              width: '18px',
              height: '0.5px',
              background: 'rgba(0,157,187,0.3)',
              margin: '3px 0',
              flexShrink: 0,
            }}
          />
          {/* Nav icon placeholders */}
          <div className="manual-launch__nb">
            <div
              style={{
                width: '12px',
                height: '10px',
                borderRadius: '2px',
                background: 'rgba(200,220,230,0.28)',
              }}
            />
          </div>
          <div className="manual-launch__nb">
            <div
              style={{
                width: '12px',
                height: '10px',
                borderRadius: '2px',
                background: 'rgba(200,220,230,0.28)',
              }}
            />
          </div>
          <div className="manual-launch__nb">
            <div
              style={{
                width: '12px',
                height: '10px',
                borderRadius: '2px',
                background: 'rgba(200,220,230,0.28)',
              }}
            />
          </div>
          <div className="manual-launch__nb">
            <div
              style={{
                width: '12px',
                height: '10px',
                borderRadius: '2px',
                background: 'rgba(200,220,230,0.28)',
              }}
            />
          </div>
          {/* Active nav item — play icon */}
          <div className="manual-launch__nb manual-launch__nb--on">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M3 2L10 6L3 10V2Z"
                fill="#00D4F0"
                stroke="#00D4F0"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ flex: 1 }} />
          {/* Bottom avatar */}
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: '#4A5568',
              border: '0.5px solid rgba(255,255,255,0.1)',
              marginTop: '2px',
            }}
          />
        </div>

        {/* ── Main content ──────────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            background: '#F5F8FB',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
          }}
        >
          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className="manual-launch__hdr">
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#1A2740', flex: 1 }}>
              User Login — Successful
            </span>

            {/* STATE 1: Pills (visible until showExecChip) */}
            {!showExecChip && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    padding: '5px 14px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'default',
                    border: '1.5px solid #D4DAE6',
                    background: '#F0F2F5',
                    color: '#8791AB',
                    userSelect: 'none',
                  }}
                >
                  Skipped
                </div>
                <div
                  className={classNames('manual-launch__s-fail', {
                    'manual-launch__s-fail--clicking': failClicking,
                  })}
                  style={{
                    padding: '5px 14px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'default',
                    border: '1.5px solid #C8373A',
                    background: '#C8373A',
                    color: '#fff',
                    userSelect: 'none',
                  }}
                >
                  Failed
                </div>
                <div
                  style={{
                    padding: '5px 14px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'default',
                    border: '1.5px solid #B2E4CE',
                    background: '#E8F7F0',
                    color: '#00916A',
                    userSelect: 'none',
                  }}
                >
                  Passed
                </div>
              </div>
            )}

            {/* STATE 2: Execution chip */}
            {showExecChip && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#5F7A8A', fontWeight: 600 }}>
                  Current execution status:
                </span>
                <div className="manual-launch__exec-chip">
                  <div className="manual-launch__exec-dot" />
                  Failed
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'default',
                    }}
                  >
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true">
                      <path
                        d="M1 1L6 6M6 1L1 6"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Body ────────────────────────────────────────────────────── */}
          <div
            style={{
              flex: 1,
              padding: '14px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              overflow: 'hidden',
            }}
          >
            {/* Steps section */}
            <div className={classNames('manual-launch__section', 'manual-launch__steps-section')}>
              {/* Section header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 14px',
                  borderBottom: '0.5px solid #EEF3F8',
                  background: '#FAFCFE',
                }}
              >
                <span style={{ fontSize: '8px', color: '#009DBB' }}>▼</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#2F3C5F' }}>Steps</span>
              </div>
              {/* Table header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '36px 1fr 1fr 28px',
                  padding: '5px 14px',
                  background: '#F0F6FA',
                  borderBottom: '0.5px solid #DCE9F0',
                }}
              >
                <span
                  style={{
                    fontSize: '9px',
                    color: '#8791AB',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  №
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    color: '#8791AB',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Instructions
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    color: '#8791AB',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Expected Result
                </span>
                <span />
              </div>

              {/* Step 1 — green ✓ */}
              <div
                className={classNames('manual-launch__step-row', {
                  'manual-launch__step-row--visible': stepsVisible[0],
                })}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#009DBB' }}>1</span>
                <span style={{ fontSize: '10.5px', color: '#2F3C5F', lineHeight: 1.5 }}>
                  Navigate to the login page
                </span>
                <span style={{ fontSize: '10.5px', color: '#5F7A8A', lineHeight: 1.5 }}>
                  Login page renders with email and password fields visible
                </span>
                <div
                  className={classNames('manual-launch__step-icon', {
                    'manual-launch__step-icon--visible': iconsVisible[0],
                  })}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="#E6FAF3" stroke="#00B884" strokeWidth="1.2" />
                    <path
                      d="M5 8.2L7.2 10.4L11 6"
                      stroke="#00B884"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="22"
                      style={{
                        strokeDashoffset: iconsVisible[0] ? 0 : 22,
                        transition: 'stroke-dashoffset .28s ease',
                      }}
                    />
                  </svg>
                </div>
              </div>

              {/* Step 2 — green ✓ */}
              <div
                className={classNames('manual-launch__step-row', {
                  'manual-launch__step-row--visible': stepsVisible[1],
                })}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#009DBB' }}>2</span>
                <span style={{ fontSize: '10.5px', color: '#2F3C5F', lineHeight: 1.5 }}>
                  Enter a valid email in the email field
                </span>
                <span style={{ fontSize: '10.5px', color: '#5F7A8A', lineHeight: 1.5 }}>
                  Email is displayed in the field without errors
                </span>
                <div
                  className={classNames('manual-launch__step-icon', {
                    'manual-launch__step-icon--visible': iconsVisible[1],
                  })}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="#E6FAF3" stroke="#00B884" strokeWidth="1.2" />
                    <path
                      d="M5 8.2L7.2 10.4L11 6"
                      stroke="#00B884"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="22"
                      style={{
                        strokeDashoffset: iconsVisible[1] ? 0 : 22,
                        transition: 'stroke-dashoffset .28s ease',
                      }}
                    />
                  </svg>
                </div>
              </div>

              {/* Step 3 — green ✓ */}
              <div
                className={classNames('manual-launch__step-row', {
                  'manual-launch__step-row--visible': stepsVisible[2],
                })}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#009DBB' }}>3</span>
                <span style={{ fontSize: '10.5px', color: '#2F3C5F', lineHeight: 1.5 }}>
                  Enter a valid password in the password field
                </span>
                <span style={{ fontSize: '10.5px', color: '#5F7A8A', lineHeight: 1.5 }}>
                  Password field accepts input; characters are masked
                </span>
                <div
                  className={classNames('manual-launch__step-icon', {
                    'manual-launch__step-icon--visible': iconsVisible[2],
                  })}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="#E6FAF3" stroke="#00B884" strokeWidth="1.2" />
                    <path
                      d="M5 8.2L7.2 10.4L11 6"
                      stroke="#00B884"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="22"
                      style={{
                        strokeDashoffset: iconsVisible[2] ? 0 : 22,
                        transition: 'stroke-dashoffset .28s ease',
                      }}
                    />
                  </svg>
                </div>
              </div>

              {/* Step 4 — red ✗ */}
              <div
                className={classNames('manual-launch__step-row', {
                  'manual-launch__step-row--visible': stepsVisible[3],
                })}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#009DBB' }}>4</span>
                <span style={{ fontSize: '10.5px', color: '#2F3C5F', lineHeight: 1.5 }}>
                  Click the &ldquo;Sign In&rdquo; button
                </span>
                <span style={{ fontSize: '10.5px', color: '#5F7A8A', lineHeight: 1.5 }}>
                  User is redirected to the dashboard; session is established
                </span>
                <div
                  className={classNames('manual-launch__step-icon', {
                    'manual-launch__step-icon--visible': iconsVisible[3],
                  })}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="#FEF0F0" stroke="#C8373A" strokeWidth="1.2" />
                    <path
                      d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5"
                      stroke="#C8373A"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── BTS section ──────────────────────────────────────────── */}
            <div
              className={classNames('manual-launch__section', 'manual-launch__bts-section', {
                'manual-launch__bts-section--visible': btsVisible,
              })}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 14px',
                  borderBottom: '0.5px solid #EEF3F8',
                  background: '#FAFCFE',
                }}
              >
                <span style={{ fontSize: '8px', color: '#009DBB' }}>▼</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#2F3C5F' }}>
                  Linked to BTS
                </span>
              </div>
              <div
                style={{
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#2F3C5F' }}>Issues:</span>
                <span
                  className={classNames('manual-launch__bts-tag', {
                    'manual-launch__bts-tag--visible': btag1,
                  })}
                >
                  EPMR-113454
                  <div
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      background: 'rgba(0,129,167,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true">
                      <path
                        d="M1 1L6 6M6 1L1 6"
                        stroke="#0081A7"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </span>
                <span
                  className={classNames('manual-launch__bts-tag', {
                    'manual-launch__bts-tag--visible': btag2,
                  })}
                >
                  SECUR-1584
                  <div
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      background: 'rgba(0,129,167,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true">
                      <path
                        d="M1 1L6 6M6 1L1 6"
                        stroke="#0081A7"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </span>
                <div
                  className={classNames('manual-launch__bts-add', {
                    'manual-launch__bts-add--visible': btsAdd,
                  })}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="#009DBB" strokeWidth="1.1" />
                    <path
                      d="M6.5 4v5M4 6.5h5"
                      stroke="#009DBB"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                  Post or link Issue
                </div>
              </div>
            </div>

            {/* ── Comment section ──────────────────────────────────────── */}
            <div
              className={classNames('manual-launch__section', 'manual-launch__comment-section', {
                'manual-launch__comment-section--visible': commentVisible,
              })}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 14px',
                  borderBottom: '0.5px solid #EEF3F8',
                  background: '#FAFCFE',
                }}
              >
                <span style={{ fontSize: '8px', color: '#009DBB' }}>▼</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#2F3C5F' }}>
                  Execution Comment
                </span>
              </div>
              <div style={{ padding: '10px 14px' }}>
                <div
                  style={{
                    fontSize: '9px',
                    color: '#8791AB',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '6px',
                  }}
                >
                  Comment
                </div>
                <div
                  style={{
                    background: '#F4F8FA',
                    border: '0.5px solid #D0E4EE',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    fontSize: '10.5px',
                    color: '#3D5268',
                    lineHeight: 1.6,
                  }}
                >
                  Login redirects to a blank page instead of the dashboard. Session token is not
                  being set after authentication.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
