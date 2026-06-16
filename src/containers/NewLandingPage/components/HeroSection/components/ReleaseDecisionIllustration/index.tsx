import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import './ReleaseDecisionIllustration.scss';

// ── Natural canvas dimensions (must match SCSS __canvas width/height) ──────
// We render at exact 960×450 then scale down via ResizeObserver to fit the
// parent container. Same pattern as AiAgentsIllustration on Features page.
const NATURAL_W = 960;
const NATURAL_H = 450;

export const ReleaseDecisionIllustration: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Pause all CSS animations when tab is hidden (Teams share, switched tab).
  // Two infinite keyframe animations live in this illustration (header dot
  // pulse + ring icon pulse) — pausing them when the tab is in background
  // avoids the small but real CPU/GPU cost of off-screen compositing.
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true,
  );

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const onVisibilityChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // Scale canvas to fit the parent container width.
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    function applyScale() {
      if (!container || !canvas) return;
      const scale = Math.min(1, container.offsetWidth / NATURAL_W);
      canvas.style.transform = `scale(${scale})`;
      container.style.height = `${NATURAL_H * scale}px`;
    }

    applyScale();
    const ro = new ResizeObserver(applyScale);
    ro.observe(container);

    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={classNames('release-decision-illustration', {
        'release-decision-illustration--paused': !isTabVisible,
      })}
      role="img"
      aria-label="ReportPortal release decision dashboard: 1,847 tests executed, AI-triaged 28 failures, quality gates passed for v2.14.1"
    >
      <div ref={canvasRef} className="release-decision-illustration__canvas">
        <div className="release-decision-illustration__scene">

          {/* ── Bleeding card top-left: 7-Day Pass Rate ─────────────────── */}
          <div className="release-decision-illustration__bl release-decision-illustration__bl--tl">
            <div className="release-decision-illustration__b-lbl">7-Day Pass Rate</div>
            <div className="release-decision-illustration__spk">
              <div className="release-decision-illustration__spk-b" style={{ height: '55%', background: '#B8D4E4' }} />
              <div className="release-decision-illustration__spk-b" style={{ height: '68%', background: '#B8D4E4' }} />
              <div className="release-decision-illustration__spk-b" style={{ height: '60%', background: '#B8D4E4' }} />
              <div className="release-decision-illustration__spk-b" style={{ height: '76%', background: '#8DC8DC' }} />
              <div className="release-decision-illustration__spk-b" style={{ height: '72%', background: '#8DC8DC' }} />
              <div className="release-decision-illustration__spk-b" style={{ height: '88%', background: '#48B890' }} />
              <div className="release-decision-illustration__spk-b" style={{ height: '100%', background: '#00B884' }} />
            </div>
            <div className="release-decision-illustration__spk-row">
              <span className="release-decision-illustration__spk-row-l">7 days ago</span>
              <span className="release-decision-illustration__spk-row-r">97.5% today</span>
            </div>
          </div>

          {/* ── MAIN CARD ──────────────────────────────────────────────── */}
          <div className="release-decision-illustration__card">

            {/* Header */}
            <div className="release-decision-illustration__hdr">
              <div className="release-decision-illustration__h-dot" />
              <span className="release-decision-illustration__h-title">Release Build</span>
              <span className="release-decision-illustration__h-sep">·</span>
              <span className="release-decision-illustration__h-sub">v2.14.1</span>
              <span className="release-decision-illustration__h-sep">·</span>
              <span className="release-decision-illustration__h-sub">Production</span>
              <div className="release-decision-illustration__h-sp" />
              <span className="release-decision-illustration__h-time">May 26, 2026 · 14:32</span>
            </div>

            {/* Body */}
            <div className="release-decision-illustration__body">

              {/* LEFT: Test Executions */}
              <div className="release-decision-illustration__cl">
                <div className="release-decision-illustration__sec-lbl">Test Executions</div>
                <div>
                  <div className="release-decision-illustration__big-num">1,847</div>
                  <div className="release-decision-illustration__big-sub">total in launches</div>
                </div>
                <div className="release-decision-illustration__sbar">
                  <div className="release-decision-illustration__sb release-decision-illustration__sb--p" />
                  <div className="release-decision-illustration__sb release-decision-illustration__sb--f" />
                  <div className="release-decision-illustration__sb release-decision-illustration__sb--s" />
                </div>
                <div className="release-decision-illustration__srows">
                  <div className="release-decision-illustration__srow release-decision-illustration__srow--passed">
                    <div className="release-decision-illustration__sd release-decision-illustration__sd--passed" />
                    <span className="release-decision-illustration__sl">Passed</span>
                    <span className="release-decision-illustration__sv">1,801</span>
                    <span className="release-decision-illustration__spct">97.5%</span>
                  </div>
                  <div className="release-decision-illustration__srow release-decision-illustration__srow--failed">
                    <div className="release-decision-illustration__sd release-decision-illustration__sd--failed" />
                    <span className="release-decision-illustration__sl">Failed</span>
                    <span className="release-decision-illustration__sv">28</span>
                    <span className="release-decision-illustration__spct">1.5%</span>
                  </div>
                  <div className="release-decision-illustration__srow release-decision-illustration__srow--skipped">
                    <div className="release-decision-illustration__sd release-decision-illustration__sd--skipped" />
                    <span className="release-decision-illustration__sl">Skipped</span>
                    <span className="release-decision-illustration__sv">18</span>
                    <span className="release-decision-illustration__spct">1.0%</span>
                  </div>
                </div>
                <div className="release-decision-illustration__dur">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="#8791AB" strokeWidth="1.2" />
                    <path d="M6.5 3.5V6.8L8.8 8.2" stroke="#8791AB" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="release-decision-illustration__dur-lbl">Total Duration</span>
                  <span className="release-decision-illustration__dur-val">12m 34s</span>
                </div>
              </div>

              {/* CENTER: Quality Gate Decision */}
              <div className="release-decision-illustration__cc">
                <div className="release-decision-illustration__qg-lbl">Quality Gates</div>
                <div className="release-decision-illustration__ring">
                  <svg width="100" height="100" viewBox="0 0 116 116" fill="none" aria-hidden="true">
                    <path
                      d="M40.1404 7.3977C50.004 -2.4659 65.996 -2.4659 75.8596 7.3977L108.602 40.1404C118.466 50.004 118.466 65.996 108.602 75.8596L75.8596 108.602C65.996 118.466 50.004 118.466 40.1404 108.602L7.3977 75.8596C-2.4659 65.996 -2.4659 50.004 7.3977 40.1404L40.1404 7.3977Z"
                      fill="#3AA76D"
                    />
                    <path
                      d="M104.591 36.1388L61.7888 78.6281C60.805 79.6115 59.4688 80.1611 58.0778 80.1518C56.6863 80.1422 55.3575 79.5712 54.387 78.5739L33.0904 57.2047C31.0873 55.1461 31.1266 51.8467 33.1852 49.8436C35.243 47.8415 38.5363 47.8892 40.5396 49.9451L58.1658 67.5423L97.237 28.7844L104.591 36.1388Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="release-decision-illustration__pass-stack">
                  <div className="release-decision-illustration__pass-word">PASSED</div>
                  <div className="release-decision-illustration__pass-ver">v2.14.1 · Ready to Release</div>
                </div>
                <div className="release-decision-illustration__chips">
                  <div className="release-decision-illustration__chip">
                    <span className="release-decision-illustration__ck">Pass Rate</span>
                    <span className="release-decision-illustration__cvg">97.5%</span>
                  </div>
                  <div className="release-decision-illustration__chip">
                    <span className="release-decision-illustration__ck">Triaged</span>
                    <span className="release-decision-illustration__cv">28</span>
                  </div>
                  <div className="release-decision-illustration__chip">
                    <span className="release-decision-illustration__ck">AI Analysis</span>
                    <span className="release-decision-illustration__cv">4m 12s</span>
                  </div>
                </div>
                <div className="release-decision-illustration__gates-title">
                  <span className="release-decision-illustration__gates-line" />
                  <span className="release-decision-illustration__gates-lbl">Quality gate rules</span>
                  <span className="release-decision-illustration__gates-line" />
                </div>
                <div className="release-decision-illustration__gates">
                  <div className="release-decision-illustration__gate release-decision-illustration__gate--pass">✓ Coverage</div>
                  <div className="release-decision-illustration__gate release-decision-illustration__gate--pass">✓ Stability</div>
                  <div className="release-decision-illustration__gate release-decision-illustration__gate--warn">⚠ Performance</div>
                  <div className="release-decision-illustration__gate release-decision-illustration__gate--pass">✓ Security</div>
                </div>
              </div>

              {/* RIGHT: AI Triage */}
              <div className="release-decision-illustration__cr">
                <div className="release-decision-illustration__sec-lbl">AI Triage</div>

                <div className="release-decision-illustration__cr-big">
                  <div className="release-decision-illustration__big-num">28</div>
                  <div className="release-decision-illustration__big-sub">tests analyzed</div>
                </div>

                <div className="release-decision-illustration__cr-divider" />

                <div className="release-decision-illustration__tlist-wrap">
                  <div className="release-decision-illustration__tlist">
                    <div className="release-decision-illustration__trow release-decision-illustration__trow--1">
                      <span className="release-decision-illustration__trow-n">LoginFlow_AuthTest</span>
                      <span className="release-decision-illustration__trow-t release-decision-illustration__trow-t--pb">Product Bug</span>
                    </div>
                    <div className="release-decision-illustration__trow release-decision-illustration__trow--2">
                      <span className="release-decision-illustration__trow-n">API_Timeout_Regression</span>
                      <span className="release-decision-illustration__trow-t release-decision-illustration__trow-t--si">System Issue</span>
                    </div>
                    <div className="release-decision-illustration__trow release-decision-illustration__trow--3">
                      <span className="release-decision-illustration__trow-n">PaymentFlow_E2E_Test</span>
                      <span className="release-decision-illustration__trow-t release-decision-illustration__trow-t--ab">Automation Bug</span>
                    </div>
                  </div>
                  <div className="release-decision-illustration__tlist-fade" />
                </div>

                <div className="release-decision-illustration__ai-dur">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path
                      d="M6.5 1L7.8 4.7L11.5 6.5L7.8 8.3L6.5 12L5.2 8.3L1.5 6.5L5.2 4.7L6.5 1Z"
                      fill="#7B5CC8"
                      opacity=".9"
                    />
                  </svg>
                  <span className="release-decision-illustration__ai-dur-lbl">Auto-resolved</span>
                  <span className="release-decision-illustration__ai-dur-val">26</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── Bleeding card top-right: Failure Types ──────────────────── */}
          <div className="release-decision-illustration__bl release-decision-illustration__bl--tr">
            <div className="release-decision-illustration__b-lbl">Failure Types</div>
            <div className="release-decision-illustration__df-row">
              <span className="release-decision-illustration__df-lbl">Product Bug</span>
              <div className="release-decision-illustration__df-track">
                <div className="release-decision-illustration__df-fill release-decision-illustration__df-fill--pb" />
              </div>
              <span className="release-decision-illustration__df-cnt">12</span>
              <span className="release-decision-illustration__df-pct">43%</span>
            </div>
            <div className="release-decision-illustration__df-row">
              <span className="release-decision-illustration__df-lbl">System Issue</span>
              <div className="release-decision-illustration__df-track">
                <div className="release-decision-illustration__df-fill release-decision-illustration__df-fill--si" />
              </div>
              <span className="release-decision-illustration__df-cnt">8</span>
              <span className="release-decision-illustration__df-pct">29%</span>
            </div>
            <div className="release-decision-illustration__df-row">
              <span className="release-decision-illustration__df-lbl">Automation Bug</span>
              <div className="release-decision-illustration__df-track">
                <div className="release-decision-illustration__df-fill release-decision-illustration__df-fill--ab" />
              </div>
              <span className="release-decision-illustration__df-cnt">6</span>
              <span className="release-decision-illustration__df-pct">21%</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
