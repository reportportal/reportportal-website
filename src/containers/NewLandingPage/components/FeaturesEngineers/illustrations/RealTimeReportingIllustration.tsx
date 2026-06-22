import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useInView } from '@app/hooks/useInView';
import { useIllustrationStatic } from '@app/components/AnimatedList/IllustrationStaticContext';

import './RealTimeReportingIllustration.scss';

// Natural canvas width/height — must match .rt-illus .window intrinsic size
const NATURAL_W = 650;
const NATURAL_H = 504;

export const RealTimeReportingIllustration: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLDivElement>(null);
  const counterRef   = useRef<HTMLSpanElement>(null);
  const isStatic = useIllustrationStatic();

  // Pause the infinite loading spinners when the illustration is off-screen
  // or the tab is hidden — they otherwise keep spinning (even after fading
  // out) and steal frames during scroll. Entrance choreography is untouched.
  const [inViewRef, isInView] = useInView({ once: false });

  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true,
  );

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const onVisibilityChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  const spinnersPaused = !isInView || !isTabVisible;

  // Scale canvas to fit the parent container width
  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return undefined;

    function applyScale() {
      if (!container || !canvas) return;
      // Pure scale — fills the parent container width regardless of natural
      // size. Uniform visual width across all illustrations on the landing
      // page (AnimatedList __illustration-panel = 650 px) is the goal here.
      // Minor blur on upscale (max ≤1.13x) is accepted in exchange.
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
    const el = counterRef.current;
    if (!el) return;

    const resolves = [1200, 1300, 1600, 1800, 2800, 3000, 3000];
    let done = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    resolves.forEach(ms => {
      timers.push(setTimeout(() => {
        done++;
        el.textContent = `${done} / 7 tests`;
        if (done === 7) {
          el.style.color = '#1A2740';
          el.style.fontWeight = '800';
        }
      }, isStatic ? 0 : ms));
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rt-illus" ref={containerRef}>
      <div className="rt-canvas" ref={canvasRef}>
      <div className={classNames('window', { 'window--paused': spinnersPaused })} ref={inViewRef}>

        {/* Title bar */}
        <div className="titlebar">
          <div style={{ width: 28, height: 28, borderRadius: 7, background: '#EAF6FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '0.5px solid rgba(0,157,187,.2)' }}>
            <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
              <path d="M3.69 23.39v5.08c0 .38.21.73.55.92l15.21 8.47c.34.19.76.19 1.1 0l15.21-8.47c.34-.19.55-.54.55-.92v-6.82L20 30.76l-9.66-5.38v-5.69L3.69 23.39Z" fill="#009DBB"/>
              <path d="M20 9.24l9.66 5.38v5.77l6.65-3.7v-5.16c0-.38-.21-.73-.55-.92L20.55 2.14a1.1 1.1 0 00-1.1 0L4.24 10.61c-.34.19-.55.54-.55.92v6.94L20 9.24Z" fill="#009DBB" opacity=".55"/>
            </svg>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#1A2740', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 10, marginRight: 64 }}>
            API Regression Suite
          </div>
          <div className="gp-track"><div className="gp-fill" /></div>
          <span ref={counterRef} style={{ fontSize: 10, fontWeight: 600, color: '#8791AB', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 12, minWidth: 56, textAlign: 'right' }}>
            0 / 7 tests
          </span>
        </div>

        {/* Column headers */}
        <div className="col-hdr">
          <div style={{ width: 20, flexShrink: 0 }} />
          <span className="cl" style={{ flex: 1 }}>Test</span>
          <span className="cl" style={{ width: 80, flexShrink: 0, textAlign: 'left' }}>Progress</span>
          <span className="cl" style={{ width: 28, flexShrink: 0, textAlign: 'right' }}>Time</span>
        </div>

        {/* Test rows */}
        <div className="content">

          {/* Row 1 — loginTest — passed */}
          <div className="t-row" style={{ animationDelay: '.40s' }}>
            <div className="sc">
              <div className="spinner" style={{ animation: 'rt-spin .5s linear .40s infinite, rt-fadeOut .18s ease 1.20s forwards' }} />
              <div className="si p" style={{ animation: 'rt-popIn .26s cubic-bezier(.34,1.56,.64,1) 1.20s both' }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.8 7L9 1" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}><span className="tname">loginTest</span><span className="tmeta">AuthService · Security Suite</span></div>
            <div className="rbar-track"><div className="rbar-fill" style={{ animation: 'rt-barPassed .80s ease .40s both' }} /></div>
            <span className="dur">0.8s</span>
          </div>

          {/* Row 2 — createUser — failed */}
          <div className="t-row" style={{ animationDelay: '.60s' }}>
            <div className="sc">
              <div className="spinner" style={{ animation: 'rt-spin .5s linear .60s infinite, rt-fadeOut .18s ease 1.80s forwards' }} />
              <div className="si f" style={{ animation: 'rt-popIn .26s cubic-bezier(.34,1.56,.64,1) 1.80s both' }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.8 1.8L7.2 7.2M7.2 1.8L1.8 7.2" stroke="white" strokeWidth="1.7" strokeLinecap="round"/></svg>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}><span className="tname">createUser</span><span className="tmeta">UserAPI · Core Integration</span></div>
            <div className="rbar-track"><div className="rbar-fill" style={{ animation: 'rt-barFailed 1.20s ease .60s both' }} /></div>
            <span className="dur">1.2s</span>
          </div>

          {/* Row 3 — tokenRefresh — passed */}
          <div className="t-row" style={{ animationDelay: '.80s' }}>
            <div className="sc">
              <div className="spinner" style={{ animation: 'rt-spin .5s linear .80s infinite, rt-fadeOut .18s ease 1.30s forwards' }} />
              <div className="si p" style={{ animation: 'rt-popIn .26s cubic-bezier(.34,1.56,.64,1) 1.30s both' }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.8 7L9 1" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}><span className="tname">tokenRefresh</span><span className="tmeta">SessionManager · Auth</span></div>
            <div className="rbar-track"><div className="rbar-fill" style={{ animation: 'rt-barPassed .50s ease .80s both' }} /></div>
            <span className="dur">0.5s</span>
          </div>

          {/* Row 4 — queryOptimizer — passed */}
          <div className="t-row" style={{ animationDelay: '1.00s' }}>
            <div className="sc">
              <div className="spinner" style={{ animation: 'rt-spin .5s linear 1.00s infinite, rt-fadeOut .18s ease 3.00s forwards' }} />
              <div className="si p" style={{ animation: 'rt-popIn .26s cubic-bezier(.34,1.56,.64,1) 3.00s both' }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.8 7L9 1" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}><span className="tname">queryOptimizer</span><span className="tmeta">DataLayer · Database</span></div>
            <div className="rbar-track"><div className="rbar-fill" style={{ animation: 'rt-barPassed 2.00s ease 1.00s both' }} /></div>
            <span className="dur">2.0s</span>
          </div>

          {/* Row 5 — processTransaction — passed */}
          <div className="t-row" style={{ animationDelay: '1.20s' }}>
            <div className="sc">
              <div className="spinner" style={{ animation: 'rt-spin .5s linear 1.20s infinite, rt-fadeOut .18s ease 2.80s forwards' }} />
              <div className="si p" style={{ animation: 'rt-popIn .26s cubic-bezier(.34,1.56,.64,1) 2.80s both' }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.8 7L9 1" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}><span className="tname">processTransaction</span><span className="tmeta">PaymentGateway · Billing</span></div>
            <div className="rbar-track"><div className="rbar-fill" style={{ animation: 'rt-barPassed 1.60s ease 1.20s both' }} /></div>
            <span className="dur">1.6s</span>
          </div>

          {/* Row 6 — sendNotification — skipped */}
          <div className="t-row" style={{ animationDelay: '1.40s' }}>
            <div className="sc">
              <div className="spinner" style={{ animation: 'rt-spin .5s linear 1.40s infinite, rt-fadeOut .18s ease 1.60s forwards' }} />
              <div className="si s" style={{ animation: 'rt-popIn .26s cubic-bezier(.34,1.56,.64,1) 1.60s both' }}>
                <svg width="10" height="4" viewBox="0 0 10 4" fill="none"><path d="M1.5 2H8.5" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}><span className="tname">sendNotification</span><span className="tmeta">EmailService · Communications</span></div>
            <div className="rbar-track"><div className="rbar-fill" style={{ animation: 'rt-barSkipped .20s ease 1.40s both' }} /></div>
            <span className="dur" style={{ color: '#C8DDE6' }}>—</span>
          </div>

          {/* Row 7 — generatePDF — failed */}
          <div className="t-row" style={{ animationDelay: '1.60s' }}>
            <div className="sc">
              <div className="spinner" style={{ animation: 'rt-spin .5s linear 1.60s infinite, rt-fadeOut .18s ease 3.00s forwards' }} />
              <div className="si f" style={{ animation: 'rt-popIn .26s cubic-bezier(.34,1.56,.64,1) 3.00s both' }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.8 1.8L7.2 7.2M7.2 1.8L1.8 7.2" stroke="white" strokeWidth="1.7" strokeLinecap="round"/></svg>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}><span className="tname">generatePDF</span><span className="tmeta">ReportEngine · Output</span></div>
            <div className="rbar-track"><div className="rbar-fill" style={{ animation: 'rt-barFailed 1.40s ease 1.60s both' }} /></div>
            <span className="dur">1.4s</span>
          </div>

        </div>

        {/* Summary footer */}
        <div className="summary">

          {/* Running indicator — fades at 3.10s */}
          <div style={{ position: 'absolute', left: 16, display: 'flex', alignItems: 'center', gap: 8, animation: 'rt-fadeOut .25s ease forwards 3.10s' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#009DBB', flexShrink: 0, display: 'block', animation: 'rt-pulse 1s ease 2 .4s' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#8791AB' }}>Running…</span>
          </div>

          {/* Launch finished — appears at 3.25s */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', opacity: 0, animation: 'rt-fadeIn .35s ease forwards 3.25s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#00B884', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.8 7L9 1" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#1A2740' }}>Launch Finished</div>
                <div style={{ fontSize: 9, color: '#8791AB', marginTop: 1 }}>3.0s total</div>
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div className="ss p">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.8 7L9 1" stroke="#006E50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                4 Passed
              </div>
              <div className="ss f">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.8 1.8L7.2 7.2M7.2 1.8L1.8 7.2" stroke="#AD1030" strokeWidth="1.7" strokeLinecap="round"/></svg>
                2 Failed
              </div>
              <div className="ss s">
                <svg width="10" height="4" viewBox="0 0 10 4" fill="none"><path d="M1.5 2H8.5" stroke="#784F00" strokeWidth="2" strokeLinecap="round"/></svg>
                1 Skipped
              </div>
            </div>
          </div>

        </div>

      </div>
      </div>
    </div>
  );
};
