import React, { FC, useEffect, useRef } from 'react';
import { useIllustrationStatic } from '@app/components/AnimatedList/IllustrationStaticContext';

import './QualityGatesIllustration.scss';

// Natural canvas width — must match .quality-gates-illus .scene intrinsic width
const NATURAL_W = 670;
const NATURAL_H = 472;

export const QualityGatesIllustration: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isStatic = useIllustrationStatic();

  // Scale canvas to fit the parent container width
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    function applyScale() {
      if (!container || !canvas) return;
      // Pure scale — fills the parent container width regardless of natural
      // size. Uniform visual width across all illustrations on the landing
      // page (AnimatedList __illustration-panel = 650 px) is the goal here.
      const scale = container.offsetWidth / NATURAL_W;
      canvas.style.transform = `scale(${scale})`;
      container.style.height = `${NATURAL_H * scale}px`;
    }

    applyScale();
    const ro = new ResizeObserver(applyScale);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = canvasRef.current;
    if (!root) return undefined;

    const $ = (id: string): HTMLElement | null => root.querySelector(`#${id}`);
    const timers: ReturnType<typeof setTimeout>[] = [];
    // In static mode all actions fire immediately (delay = 0)
    const t = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, isStatic ? 0 : ms));
    };

    // Phase 1 — rows appear staggered
    [1, 2, 3, 4, 5].forEach((n, i) => {
      t(() => {
        const row = $(`r${n}`);
        if (row) row.style.animation = 'qg-rowIn .3s ease forwards';
      }, 380 + i * 160);
    });

    const cs = 380 + 5 * 160 + 200; // 1380ms — checks start

    // Rule 1 — pass
    t(() => {
      $('l1')?.classList.add('pass');
      $('rv1')?.classList.add('pass');
    }, cs);

    // Rule 2 — pass
    t(() => {
      $('l2')?.classList.add('pass');
      $('rv2')?.classList.add('pass');
    }, cs + 200);

    // Rule 3 — briefly looks like pass, then flips to warn (flaky tests)
    t(() => {
      const l3 = $('l3') as HTMLElement | null;
      if (!l3) return;
      l3.style.boxShadow = 'inset 0 0 0 1.5px #009DBB';
      l3.style.background = '#F0FBFD';
      l3.style.transition = 'background .18s, box-shadow .18s';

      t(() => {
        l3.style.transition = '';
        l3.classList.add('warn');
        $('rv3')?.classList.add('warn');
        $('r3')?.classList.add('warn-bg');
        const nbLabel = $('nb-label');
        if (nbLabel) nbLabel.style.color = '#D48A00';
      }, 320);
    }, cs + 400);

    // Rule 4 — pass
    t(() => {
      $('l4')?.classList.add('pass');
      $('rv4')?.classList.add('pass');
    }, cs + 800);

    // Rule 5 — pass
    t(() => {
      $('l5')?.classList.add('pass');
      $('rv5')?.classList.add('pass');
    }, cs + 1000);

    // Phase 3 — AI strip
    const as = cs + 1000 + 280; // 2660ms
    t(() => {
      const aiRow = $('aiRow');
      if (aiRow) aiRow.style.animation = 'qg-aiIn .38s ease forwards';
    }, as);

    // Phase 4 — footer + mini lights
    t(() => {
      $('goFooter')?.classList.add('show');
      [1, 2, 4, 5].forEach((n, i) => {
        t(() => $(`ml${n}`)?.classList.add('on'), i * 90);
      });
    }, as + 460);

    // Phase 5 — ready badge
    t(() => {
      $('readyBadge')?.classList.add('show');
    }, as + 460 + 500);

    return () => timers.forEach(clearTimeout);
  }, [isStatic]);

  return (
    <div className="quality-gates-illus-wrap">
      <div className="quality-gates-illus" ref={containerRef}>
        <div className="qg-canvas" ref={canvasRef}>
          <div className="scene">
            {/* Header */}
            <div className="hdr">
              <span className="hdr-title">Quality Gates</span>
              <span className="release-tag">Release 12.4</span>
            </div>

            {/* Coverage bar */}
            <div className="bar-wrap">
              <div className="bar-top-row">
                <span className="cov-title">Coverage</span>
              </div>
              <div className="stacked">
                <div className="seg sp" />
                <div className="seg sf" />
                <div className="seg ss" />
                <div className="su" />
              </div>
              <div className="leg-row">
                <div className="leg-item">
                  <div className="leg-dot" style={{ background: '#00916A' }} />
                  <span style={{ color: '#5F7A8A' }}>Passed 58%</span>
                </div>
                <div className="leg-item">
                  <div className="leg-dot" style={{ background: '#C8373A' }} />
                  <span style={{ color: '#C8373A' }}>Failed 10%</span>
                </div>
                <div className="leg-item">
                  <div className="leg-dot" style={{ background: '#C8D4DC' }} />
                  <span style={{ color: '#8791AB' }}>Skipped 12%</span>
                </div>
                <div className="leg-uncov">
                  <div className="leg-hatch" />
                  Not executed 20%
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="rules">
              <div className="rule-row" id="r1">
                <div className="light" id="l1">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      className="ck"
                      d="M2.5 5.5L4.5 7.5L8.5 3.5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="rule-body">
                  <div className="rule-name">Manual Test Coverage</div>
                  <div className="rule-meta">Threshold ≥ 70%</div>
                </div>
                <div className="rule-val" id="rv1">
                  73%
                </div>
              </div>

              <div className="rule-row" id="r2">
                <div className="light" id="l2">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      className="ck"
                      d="M2.5 5.5L4.5 7.5L8.5 3.5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="rule-body">
                  <div className="rule-name">Automated Pass Rate</div>
                  <div className="rule-meta">Threshold ≥ 90%</div>
                </div>
                <div className="rule-val" id="rv2">
                  94%
                </div>
              </div>

              <div className="rule-row" id="r3">
                <div className="light" id="l3">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      className="ck"
                      id="ck3"
                      d="M2.5 5.5L4.5 7.5L8.5 3.5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className="dk"
                      id="dk3"
                      d="M3 5.5h5"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="rule-body">
                  <div className="rule-name">Flaky Test Rate</div>
                  <div className="rule-meta">
                    {'Threshold ≤ 5% · '}
                    <span id="nb-label" style={{ fontWeight: 600 }}>
                      Non-blocking
                    </span>
                  </div>
                </div>
                <div className="rule-val" id="rv3">
                  8%
                </div>
              </div>

              <div className="rule-row" id="r4">
                <div className="light" id="l4">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      className="ck"
                      d="M2.5 5.5L4.5 7.5L8.5 3.5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="rule-body">
                  <div className="rule-name">Milestone Readiness</div>
                  <div className="rule-meta">Threshold ≥ 80%</div>
                </div>
                <div className="rule-val" id="rv4">
                  85%
                </div>
              </div>

              <div className="rule-row" id="r5">
                <div className="light" id="l5">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      className="ck"
                      d="M2.5 5.5L4.5 7.5L8.5 3.5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="rule-body">
                  <div className="rule-name">Critical Test Failures</div>
                  <div className="rule-meta">Threshold = 0</div>
                </div>
                <div className="rule-val" id="rv5">
                  0
                </div>
              </div>
            </div>

            {/* AI strip */}
            <div className="ai-row" id="aiRow">
              <div className="ai-badge">✦ AI</div>
              <div className="ai-text">
                Flaky test rate above threshold but non-blocking. 4 of 5 gates passed — no blockers,
                release window is clear.
              </div>
            </div>

            {/* Footer */}
            <div className="go-footer" id="goFooter">
              <div className="mini-lights">
                <div className="ml" id="ml1" />
                <div className="ml" id="ml2" />
                <div className="ml amber" id="ml3" />
                <div className="ml" id="ml4" />
                <div className="ml" id="ml5" />
              </div>
              <div className="go-text">
                <div className="go-label">Release Readiness</div>
                <div className="go-sub">4 / 5 gates passed · 1 non-blocking skipped</div>
              </div>
              <div className="ready-badge" id="readyBadge">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                  <rect
                    x="5.5"
                    y="5.5"
                    width="29"
                    height="29"
                    rx="7"
                    transform="rotate(45 20 20)"
                    fill="#00C878"
                  />
                  <rect
                    x="7"
                    y="7"
                    width="26"
                    height="26"
                    rx="6.5"
                    transform="rotate(45 20 20)"
                    fill="url(#qg-dg)"
                    opacity=".3"
                  />
                  <path
                    d="M13 20.5L17.5 25L27 15"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="qg-dg"
                      x1="20"
                      y1="2"
                      x2="20"
                      y2="38"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <div className="ready-badge-label">Ready</div>
                  <div className="ready-badge-sub">Auto-approved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="quality-gates-illus-wrap__disclaimer">
        <span>Quality Gates currently evaluate automated test results only.</span>
        <span>Milestones and manual testing — in upcoming releases.</span>
      </span>
    </div>
  );
};
