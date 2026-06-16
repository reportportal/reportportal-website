import React, { FC, useEffect, useId, useRef } from 'react';
import { useIllustrationStatic } from '@app/components/AnimatedList/IllustrationStaticContext';

import './SecurityIllustration.scss';

// Natural size of the scene — must match .security-illus .scene CSS width/height.
// JS ResizeObserver scales the .scene canvas via transform: scale() to fit the
// parent container (same pattern as QualityGates / AiAgents illustrations).
// Without this, fixed inner widths (e.g. .content 588 px, .dep-back-* 168 px)
// overflow on mobile/tablet where the panel is narrower than 640 px.
const NATURAL_W = 640;
const NATURAL_H = 504;

export const SecurityIllustration: FC = () => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const sceneRef      = useRef<HTMLDivElement>(null);
  const borderPathRef = useRef<SVGPathElement>(null);
  const isStatic = useIllustrationStatic();
  const uid = useId().replace(/:/g, '');

  // Scale the .scene canvas to fit the parent container width
  useEffect(() => {
    const container = containerRef.current;
    const scene     = sceneRef.current;
    if (!container || !scene) return undefined;

    function applyScale() {
      if (!container || !scene) return;
      const scale = container.offsetWidth / NATURAL_W;
      scene.style.transform = `scale(${scale})`;
      container.style.height = `${NATURAL_H * scale}px`;
    }

    applyScale();
    const ro = new ResizeObserver(applyScale);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const $ = (id: string): HTMLElement | null => root.querySelector(`#${id}`);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, isStatic ? 0 : ms));
    };

    // Phase 1 — back deployment cards
    t(() => {
      $('dl')?.classList.add('on');
      $('dr')?.classList.add('on');
    }, 300);

    // Phase 2 — front cloud card
    t(() => $('df')?.classList.add('on'), 450);

    // Phase 3 — history title
    t(() => $('htitle')?.classList.add('on'), 820);

    // Phase 4 — user rows staggered
    ['ur1', 'ur2', 'ur3', 'ur4'].forEach((id, i) => {
      t(() => $(id)?.classList.add('on'), 860 + i * 130);
    });

    // Phase 5 — wide security event card
    t(() => $('wc')?.classList.add('on'), 1400);

    // Phase 6 — SOC2 badge + shield border draw
    t(() => {
      $('soc')?.classList.add('on');

      const path = borderPathRef.current;
      if (!path) return;

      const perim = Math.ceil(path.getTotalLength());
      path.style.setProperty('--perim', String(perim));
      path.style.strokeDasharray  = String(perim);
      path.style.strokeDashoffset = String(perim);

      // force reflow so dashoffset is applied before animation starts
      path.getBoundingClientRect();
      path.classList.add('draw');
    }, 2080);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`security-illus${isStatic ? ' security-illus--static' : ''}`}
      ref={containerRef}
    >
      <div className="scene" ref={sceneRef}>

        {/* Shield fill */}
        <svg className="shield-svg" viewBox="0 0 640 504" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${uid}sf`} x1="320" y1="24" x2="320" y2="492" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#C4DFF0" stopOpacity=".08"/>
              <stop offset="60%"  stopColor="#B2D2E8" stopOpacity=".28"/>
              <stop offset="100%" stopColor="#9ABEDE" stopOpacity=".28"/>
            </linearGradient>
            <linearGradient id={`${uid}sf2`} x1="320" y1="50" x2="320" y2="472" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#D4ECFA" stopOpacity=".46"/>
              <stop offset="100%" stopColor="#A8CCE4" stopOpacity=".12"/>
            </linearGradient>
            <linearGradient id={`${uid}sbord`} x1="320" y1="24" x2="320" y2="492" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#88C0DC" stopOpacity=".38"/>
              <stop offset="100%" stopColor="#70AACE" stopOpacity=".12"/>
            </linearGradient>
          </defs>
          <path d="M88,86 L320,26 L552,86 L552,286 C552,396 438,466 320,496 C202,466 88,396 88,286 Z" fill={`url(#${uid}sf)`}/>
          <path d="M110,92 L320,50 L530,92 L530,284 C530,378 426,442 320,472 C214,442 110,378 110,284 Z" fill={`url(#${uid}sf2)`} opacity=".5"/>
          <path d="M88,86 L320,26 L552,86 L552,286 C552,396 438,466 320,496 C202,466 88,396 88,286 Z" fill="none" stroke={`url(#${uid}sbord)`} strokeWidth="1"/>
          <path d="M110,92 L320,50 L530,92 L530,284 C530,378 426,442 320,472 C214,442 110,378 110,284 Z" fill="none" stroke="#88B8D0" strokeWidth=".6" strokeOpacity=".2"/>
        </svg>

        {/* Shield animated border */}
        <svg className="shield-border-svg" viewBox="0 0 640 504" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${uid}bg`} x1="320" y1="26" x2="320" y2="496" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#00E4FF" stopOpacity="1"/>
              <stop offset="30%"  stopColor="#00C8E0" stopOpacity=".95"/>
              <stop offset="70%"  stopColor="#009DBB" stopOpacity=".85"/>
              <stop offset="100%" stopColor="#006888" stopOpacity=".55"/>
            </linearGradient>
          </defs>
          <path
            ref={borderPathRef}
            className="shield-outer-border"
            d="M320,26 L552,86 L552,286 C552,396 438,466 320,496 C202,466 88,396 88,286 L88,86 Z"
            stroke={`url(#${uid}bg)`}
          />
        </svg>

        {/* SOC2 badge */}
        <div className="soc" id="soc">
          <div className="soc-a">AICPA</div>
          <div className="soc-line" />
          <div className="soc-s">SOC 2</div>
        </div>

        {/* Content */}
        <div className="content">

          {/* Deployment cards */}
          <div className="dep-stage">
            <div className="dep-back dep-back-l" id="dl">
              <div className="dep-ico di-n">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="5" width="12" height="8" rx="1.8" stroke="#A8B8C8" strokeWidth=".95"/>
                  <path d="M4 5V3.5a3 3 0 016 0V5" stroke="#A8B8C8" strokeWidth=".95" strokeLinecap="round"/>
                  <circle cx="7" cy="9" r="1" fill="#A8B8C8"/>
                </svg>
              </div>
              <div className="dep-nm">On-Premise</div>
              <div className="dep-desc">Your infra, full control.</div>
            </div>

            <div className="dep-back dep-back-r" id="dr">
              <div className="dep-ico di-n">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2.5" width="12" height="9" rx="1.8" stroke="#A8B8C8" strokeWidth=".95"/>
                  <line x1="1" y1="6.5" x2="13" y2="6.5" stroke="#A8B8C8" strokeWidth=".95"/>
                  <circle cx="3.2" cy="4.7" r=".7" fill="#A8B8C8"/>
                  <circle cx="5.4" cy="4.7" r=".7" fill="#A8B8C8"/>
                </svg>
              </div>
              <div className="dep-nm">Dedicated Instance</div>
              <div className="dep-desc">Isolated resources.</div>
            </div>

            <div className="dep-front" id="df">
              <div className="dep-ico di-a">
                <svg width="18" height="18" viewBox="1 -2 20 20" fill="none">
                  <path d="M4.5 13A4.5 4.5 0 015.8 5a5.5 5.5 0 0110.7 2.2A3.5 3.5 0 0115 14.5" stroke="#009DBB" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M9 15v-5.5M7 11.5l2-2 2 2" stroke="#009DBB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="dep-nm-a">Cloud SaaS</div>
              <div className="dep-desc-a">Managed hosting, always on.</div>
              <div className="dep-active">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" fill="#009DBB"/>
                  <path d="M3.5 6.2L5.2 7.9L8.5 4.2" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Active
              </div>
            </div>
          </div>

          {/* History title */}
          <div className="hist-title" id="htitle">History of Actions</div>

          {/* User rows */}
          <div className="rows-wrap">
            <div className="urow" id="ur1">
              <div className="uav av-ad">SM</div>
              <span className="u-name">Sarah Martin</span>
              <span className="u-pill rp-ad">Admin</span>
              <span className="u-action">Exported test report — <strong>Release 12.4</strong></span>
              <span className="u-time">2 min ago</span>
            </div>

            <div className="urow" id="ur2">
              <div className="uav av-mg">DC</div>
              <span className="u-name">David Cooper</span>
              <span className="u-pill rp-mg">Manager</span>
              <span className="u-action">Changed role: <strong>Viewer → Editor</strong> for Anna L.</span>
              <span className="u-time">14 min ago</span>
            </div>

            <div className="urow" id="ur3">
              <div className="uav av-ed">AL</div>
              <span className="u-name">Anna Lysenko</span>
              <span className="u-pill rp-ed">Editor</span>
              <span className="u-action">Ran manual launch — <strong>Auth &amp; Permissions</strong></span>
              <span className="u-time">42 min ago</span>
            </div>

            <div className="urow" id="ur4">
              <div className="uav av-vw">TD</div>
              <span className="u-name">Tom Davidson</span>
              <span className="u-pill rp-vw">Viewer</span>
              <span className="u-action">Logged in successfully</span>
              <span className="u-time">2 hr ago</span>
            </div>
          </div>

          {/* Security event */}
          <div className="wide-card" id="wc">
            <div className="w-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#C8373A" strokeWidth="1"/>
                <path d="M7 4.5V7.5" stroke="#C8373A" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="7" cy="9.5" r=".7" fill="#C8373A"/>
              </svg>
            </div>
            <span className="w-txt">Login attempt <strong>blocked</strong> — unrecognized IP address</span>
            <span className="w-time">1 hr ago</span>
          </div>

        </div>
      </div>
    </div>
  );
};
