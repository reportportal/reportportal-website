import React, { FC } from 'react';
import classNames from 'classnames';
import { useInView } from '@app/hooks/useInView';

import './TestCaseLibrary.scss';

export const TestCaseLibrary: FC = () => {
  const [ref, isVisible] = useInView({ once: true });

  return (
    <div
      ref={ref}
      className={classNames('tcl', { 'tcl--visible': isVisible })}
      role="img"
      aria-label="Test Case Library interface showing folder navigation, test case list, and case detail panel"
    >
      <div className="tcl__shell">
        {/* Left nav strip */}
        <div className="np tcl__nav">
          <div className="tcl__nav-logo">
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path
                d="M3.6875 23.3938L3.6875 28.4657C3.6875 28.8475 3.89868 29.2002 4.2415 29.3911L19.446 37.8568C19.7888 38.0477 20.2112 38.0477 20.554 37.8568L35.7585 29.3911C36.1013 29.2002 36.3125 28.8475 36.3125 28.4657V21.6471L20 30.7622L10.3355 25.3811L10.3355 19.6923L3.6875 23.3938Z"
                fill="white"
              />
              <path
                d="M20 9.23781L29.6645 14.6189V20.3933L36.3125 16.6918V11.5343C36.3125 11.1525 36.1013 10.7998 35.7585 10.6089L20.554 2.14316C20.2112 1.95228 19.7888 1.95228 19.446 2.14316L4.2415 10.6089C3.89869 10.7998 3.6875 11.1525 3.6875 11.5343L3.6875 18.4711L20 9.23781Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="tcl__nav-avatar" />
          <div className="tcl__nav-divider" />

          <div className="ni">
            <div className="tcl__nav-bar" />
          </div>
          <div className="ni">
            <div className="tcl__nav-bar" />
          </div>

          <div className="ni on">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect
                x="1.5"
                y="1.5"
                width="11"
                height="11"
                rx="2"
                stroke="#00D4F0"
                strokeWidth="1.2"
              />
              <path
                d="M4 7L6 9L10 5"
                stroke="#00D4F0"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="ni">
            <div className="tcl__nav-bar" />
          </div>
          <div className="ni">
            <div className="tcl__nav-bar" />
          </div>

          <div className="tcl__nav-spacer" />
          <div className="tcl__nav-avatar tcl__nav-avatar--bottom" />
        </div>

        {/* Main content column */}
        <div className="tcl__main">
          {/* Header */}
          <div className="tcl__header">
            <span className="tcl__header-title">Test Case Library</span>
          </div>

          {/* Inner row: folders + list */}
          <div className="tcl__row">
            {/* Folder tree */}
            <div className="fp tcl__folders">
              <div className="tcl__folders-hd">
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Folders
                </span>
              </div>
              <div className="tcl__folders-body">
                <div className="fo fr">
                  <span className="tcl__arrow">▶</span>
                  <span className="tcl__folder-name">UI Login Flow</span>
                </div>
                <div className="fo fr">
                  <span className="tcl__arrow">▼</span>
                  <span className="tcl__folder-name">API Regression</span>
                </div>
                <div className="fo fr tcl__folder--l1">
                  <span className="tcl__arrow">▼</span>
                  <span className="tcl__folder-name">Auth Service</span>
                </div>
                <div className="fo fr tcl__folder--l2">
                  <span className="tcl__folder-name">Login Tests</span>
                </div>
                <div className="fo fr tcl__folder--l2">
                  <span className="tcl__arrow">▶</span>
                  <span className="tcl__folder-name">Token Refresh</span>
                </div>
                <div className="fo fr tcl__folder--l1">
                  <span className="tcl__arrow">▶</span>
                  <span className="tcl__folder-name">User Profile</span>
                </div>
                <div className="fo fr">
                  <span className="tcl__arrow">▼</span>
                  <span className="tcl__folder-name">Cart Feature</span>
                </div>
                <div className="fo fr tcl__folder--l1">
                  <span className="tcl__folder-name">Add to Cart</span>
                </div>
                <div className="fo fr tcl__folder--l1">
                  <span className="tcl__folder-name">Checkout Flow</span>
                </div>
                <div className="fo fr">
                  <span className="tcl__arrow">▶</span>
                  <span className="tcl__folder-name">Performance Tests</span>
                </div>
                <div className="fo fr">
                  <span className="tcl__arrow">▶</span>
                  <span className="tcl__folder-name">Security Checks</span>
                </div>
                <div className="fo fr">
                  <span className="tcl__arrow">▶</span>
                  <span className="tcl__folder-name">Legacy V1</span>
                </div>
              </div>
            </div>

            {/* Test case list */}
            <div className="lp tcl__list">
              <div className="tcl__list-hd">
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  All test cases
                </span>
              </div>
              <div className="tcl__list-body">
                {/* Card 1 — critical */}
                <div className="card tr">
                  <div className="tcl__case-row">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="tcl__case-icon"
                      aria-hidden="true"
                    >
                      <path d="M7 2L11 7H3L7 2Z" fill="#FF5A5F" />
                      <path d="M7 6L11 11H3L7 6Z" fill="#FF5A5F" opacity=".35" />
                    </svg>
                    <div className="tcl__case-info">
                      <div className="tn">Password Reset — Invalid Email</div>
                      <div className="ts">regression · critical</div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="card tr">
                  <div className="tcl__case-row">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="tcl__case-icon"
                      aria-hidden="true"
                    >
                      <path d="M7 3L11 9H3L7 3Z" fill="#FF9900" />
                    </svg>
                    <div className="tcl__case-info">
                      <div className="tn">Login — Empty Fields</div>
                      <div className="ts">ui · validation</div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="card tr">
                  <div className="tcl__case-row">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="tcl__case-icon"
                      aria-hidden="true"
                    >
                      <path d="M7 3L11 9H3L7 3Z" fill="#FF9900" />
                    </svg>
                    <div className="tcl__case-info">
                      <div className="tn">OAuth Login — Google SSO</div>
                      <div className="ts">api · auth</div>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="card tr">
                  <div className="tcl__case-row">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="tcl__case-icon"
                      aria-hidden="true"
                    >
                      <path d="M7 11L3 5H11L7 11Z" fill="#00B884" />
                    </svg>
                    <div className="tcl__case-info">
                      <div className="tn">API Auth Token — Expired</div>
                      <div className="ts">api · critical</div>
                    </div>
                  </div>
                </div>

                {/* Card 5 — active (highlighted) */}
                <div className="card act tr">
                  <div className="ab" />
                  <div className="tcl__case-row tcl__case-row--active">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="tcl__case-icon"
                      aria-hidden="true"
                    >
                      <path d="M7 2L11 7H3L7 2Z" fill="#FF5A5F" />
                      <path d="M7 6L11 11H3L7 6Z" fill="#FF5A5F" opacity=".35" />
                    </svg>
                    <div className="tcl__case-info">
                      <div className="tn hi">User Login — Successful</div>
                      <div className="ts hi">smoke · regression · ui · critical · login</div>
                    </div>
                  </div>
                </div>

                {/* Card 6 */}
                <div className="card tr">
                  <div className="tcl__case-row">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="tcl__case-icon"
                      aria-hidden="true"
                    >
                      <path d="M7 3L11 9H3L7 3Z" fill="#FF9900" />
                    </svg>
                    <div className="tcl__case-info">
                      <div className="tn">Remember Me — Checkbox</div>
                      <div className="ts">ui · regression</div>
                    </div>
                  </div>
                </div>

                {/* Card 7 */}
                <div className="card tr">
                  <div className="tcl__case-row">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="tcl__case-icon"
                      aria-hidden="true"
                    >
                      <path d="M7 2L11 7H3L7 2Z" fill="#FF5A5F" />
                      <path d="M7 6L11 11H3L7 6Z" fill="#FF5A5F" opacity=".35" />
                    </svg>
                    <div className="tcl__case-info">
                      <div className="tn">Login — SQL Injection Check</div>
                      <div className="ts">security · critical</div>
                    </div>
                  </div>
                </div>

                {/* Card 8 */}
                <div className="card tr">
                  <div className="tcl__case-row">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="tcl__case-icon"
                      aria-hidden="true"
                    >
                      <path d="M7 11L3 5H11L7 11Z" fill="#00B884" />
                    </svg>
                    <div className="tcl__case-info">
                      <div className="tn">Multi-factor Auth Flow</div>
                      <div className="ts">api · auth</div>
                    </div>
                  </div>
                </div>

                {/* Card 9 */}
                <div className="card tr">
                  <div className="tcl__case-row">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="tcl__case-icon"
                      aria-hidden="true"
                    >
                      <path d="M7 3L11 9H3L7 3Z" fill="#FF9900" />
                    </svg>
                    <div className="tcl__case-info">
                      <div className="tn">Brute Force — Lock Account</div>
                      <div className="ts">security · smoke</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail panel (absolute overlay, slides in) */}
        <div className="dp tcl__detail">
          {/* Detail header */}
          <div className="d1 tcl__detail-hd">
            <div className="tcl__detail-hd-row">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="tcl__case-icon"
                aria-hidden="true"
              >
                <path d="M7 2L11 7H3L7 2Z" fill="#FF5A5F" />
                <path d="M7 6L11 11H3L7 6Z" fill="#FF5A5F" opacity=".35" />
              </svg>
              <div className="tcl__detail-title">User Login — Successful</div>
              <div className="tcl__detail-close" aria-hidden="true">
                ×
              </div>
            </div>
          </div>

          {/* Detail body */}
          <div className="tcl__detail-body">
            {/* Tags */}
            <div className="d2">
              <div className="sl">Tags</div>
              <div className="tcl__tags">
                <span className="tp">smoke</span>
                <span className="tp">regression</span>
                <span className="tp">ui</span>
                <span className="tp">critical</span>
                <span className="tp">login</span>
                <span className="tcl__tag-add">+ Add</span>
              </div>
            </div>

            {/* Scenario */}
            <div className="d3">
              <div className="sl">Scenario</div>
              <div className="tcl__scenario">
                <div className="tcl__scenario-label">Precondition</div>
                <div className="tcl__scenario-text">
                  User is logged out. Browser cache is cleared. Valid credentials exist in the
                  system.
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="d4">
              <div className="sl">
                Attachments <span className="tcl__attach-count">2</span>
              </div>
              <div className="tcl__attachments">
                <div className="ac">
                  <div className="tcl__attach-icon tcl__attach-icon--blue">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden="true">
                      <rect
                        x=".5"
                        y=".5"
                        width="11"
                        height="12"
                        rx="2"
                        stroke="#5577FF"
                        strokeWidth=".9"
                      />
                      <path
                        d="M2.5 4.5h7M2.5 7h5"
                        stroke="#5577FF"
                        strokeWidth=".8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="tcl__attach-name">LoginScreen.png</div>
                    <div className="tcl__attach-size">PNG · 1.2 MB</div>
                  </div>
                </div>
                <div className="ac">
                  <div className="tcl__attach-icon tcl__attach-icon--green">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden="true">
                      <rect
                        x=".5"
                        y=".5"
                        width="11"
                        height="12"
                        rx="2"
                        stroke="#00B884"
                        strokeWidth=".9"
                      />
                      <path
                        d="M2.5 4.5h7M2.5 7h5M2.5 9.5h3.5"
                        stroke="#00B884"
                        strokeWidth=".8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="tcl__attach-name">TestData.csv</div>
                    <div className="tcl__attach-size">CSV · 48 KB</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="d5">
              <div className="sl">Steps</div>
              <div className="tcl__steps">
                <div className="tcl__step">
                  <div className="sn">1</div>
                  <div className="sc">
                    <div className="tcl__step-action">Go to login page.</div>
                    <div className="tcl__step-expected">
                      Expected: Login page renders with form fields visible.
                    </div>
                  </div>
                </div>
                <div className="tcl__step">
                  <div className="sn">2</div>
                  <div className="sc">
                    <div className="tcl__step-action">Enter valid email and password.</div>
                    <div className="tcl__step-expected">
                      Expected: Fields accept input without errors.
                    </div>
                  </div>
                </div>
                <div className="tcl__step">
                  <div className="sn">3</div>
                  <div className="sc">
                    <div className="tcl__step-action">Click &ldquo;Sign In&rdquo;.</div>
                    <div className="tcl__step-expected">
                      Expected: User is redirected to dashboard.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detail footer */}
          <div className="d6 tcl__detail-ft">
            <div className="tcl__btn-outline">Add to Launch</div>
            <div className="tcl__btn-solid">Add to Test Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
};
