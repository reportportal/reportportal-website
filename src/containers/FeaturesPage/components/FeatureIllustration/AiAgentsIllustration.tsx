import React, { FC, useEffect, useRef, useState } from 'react';
import { useInView } from '@app/hooks/useInView';
import { useIllustrationStatic, useRegisterSelfScaling } from '@app/components/AnimatedList/IllustrationStaticContext';

export const AiAgentsIllustration: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isStatic = useIllustrationStatic();
  const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth < 1239;
  useRegisterSelfScaling();

  // once: false — we want to PAUSE animation when the illustration scrolls
  // out of view, not just trigger it once on first reveal. Combined with
  // Page Visibility below this kills the constant CPU/GPU drain that
  // happens when the page is open but the user isn't looking at it.
  const [inViewRef, isVisible] = useInView({ once: false });

  // Page Visibility — pause when the tab is in the background (second monitor,
  // Teams screen-share, just-switched-tab). Without this, RAF loops keep
  // running at ~60 fps even though nothing is painted to the screen.
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true,
  );

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const onVisibilityChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // Entrance animation (hub fade, spokes draw, chips pop) is one-shot —
  // we don't want it replaying every time the user scrolls past. After it
  // plays once, this ref flips to true and we skip straight to the loop.
  const entrancePlayedRef = useRef(false);

  // ── Scale canvas to fill container width (independent of animation gate) ─
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const NATURAL_W = 572;
    const NATURAL_H = 428;

    function applyScale() {
      if (!container || !canvas) return;
      // Pure scale — fills the parent container width regardless of natural
      // size. Uniform visual width across all illustrations on the landing
      // page (AnimatedList __illustration-panel = 650 px) is the goal here.
      // Minor blur on upscale (max ≤1.13x) is accepted in exchange.
      const scale = container.offsetWidth / NATURAL_W;
      canvas.style.transform = `scale(${scale})`;
      canvas.style.transformOrigin = 'top left';
      container.style.height = `${NATURAL_H * scale}px`;
    }

    applyScale();
    const ro = new ResizeObserver(applyScale);
    ro.observe(container);

    return () => ro.disconnect();
  }, []);

  // ── Static mode: show final entrance state immediately, no loops ──────────
  // Also applies to mobile/tablet (< 1239px) where animations are disabled.
  useEffect(() => {
    if (!isStatic && !isMobileOrTablet) return undefined;
    const container = containerRef.current;
    if (!container) return undefined;

    const getEl = (id: string) => container.querySelector<HTMLElement>(`#ai-illu-${id}`);
    const getSvgEl = (id: string) => container.querySelector<SVGElement>(`#ai-illu-${id}`);

    const hub = getEl('mcpHub');
    if (hub) hub.style.animation = 'aiAgentsHubIn .01s forwards';
    entrancePlayedRef.current = true;

    ['orbitRing', 'innerRing'].forEach(id => {
      const el = getSvgEl(id);
      if (el) el.style.opacity = '1';
    });

    [1, 2, 3, 4, 5].forEach(n => {
      const ln = getSvgEl(`ln${n}`);
      if (ln) ln.style.setProperty('stroke-dashoffset', '0');
      const sn = getEl(`sn${n}`);
      if (sn) sn.style.animation = 'aiAgentsNodeIn .01s forwards';
      const ac = getEl(`ac${n}`);
      if (ac) ac.style.animation = 'aiAgentsChipIn .01s forwards';
    });

    return undefined;
  }, [isStatic]);

  // ── Animation: entrance (once) + travel dots loop (while visible+focused) ─
  useEffect(() => {
    const shouldAnimate = isVisible && isTabVisible && !isStatic && !isMobileOrTablet;
    if (!shouldAnimate) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const getEl = (id: string) => container.querySelector<HTMLElement>(`#ai-illu-${id}`);
    const getSvgEl = (id: string) => container.querySelector<SVGElement>(`#ai-illu-${id}`);
    const addTimer = (fn: () => void, ms: number) => {
      const tid = setTimeout(() => { if (!cancelled) fn(); }, ms);
      timers.push(tid);
      return tid;
    };

    const CX = 286;
    const CY = 214;
    const stages = [
      { x: 286, y: 56 },
      { x: 452, y: 196 },
      { x: 388, y: 342 },
      { x: 182, y: 342 },
      { x: 120, y: 196 },
    ];

    // Run entrance only the first time the illustration becomes visible.
    // On subsequent scrolls into view we skip straight to the dot loop.
    if (!entrancePlayedRef.current) {
      // Hub entrance — mark as played HERE (inside timer) not synchronously.
      // If cleanup cancels this timer (e.g. page scrolls away within 220 ms),
      // the flag stays false so the entrance can replay on the next scroll-in.
      addTimer(() => {
        const hub = getEl('mcpHub');
        if (hub) hub.style.animation = 'aiAgentsHubIn .52s cubic-bezier(.34,1.56,.64,1) forwards';
        entrancePlayedRef.current = true;
      }, 220);

      // Rings fade-in
      addTimer(() => {
        ['orbitRing', 'innerRing'].forEach((id, i) => {
          const el = getSvgEl(id);
          if (el) {
            el.style.transition = `opacity .7s ease ${i * 0.15}s`;
            el.style.opacity = '1';
          }
        });
      }, 500);

      // Spokes draw + stage cards pop in
      [1, 2, 3, 4, 5].forEach((n, i) => {
        const delay = 620 + i * 140;
        addTimer(() => {
          const ln = getSvgEl(`ln${n}`);
          if (ln) {
            ln.style.setProperty('transition', 'stroke-dashoffset .44s cubic-bezier(.4,0,.2,1)');
            ln.style.setProperty('stroke-dashoffset', '0');
          }
        }, delay);
        addTimer(() => {
          const sn = getEl(`sn${n}`);
          if (sn) sn.style.animation = 'aiAgentsNodeIn .32s cubic-bezier(.34,1.56,.64,1) forwards';
        }, delay + 240);
      });

      // Agent chip badges
      [1, 2, 3, 4, 5].forEach((n, i) => {
        addTimer(() => {
          const ac = getEl(`ac${n}`);
          if (ac) ac.style.animation = 'aiAgentsChipIn .3s cubic-bezier(.34,1.56,.64,1) forwards';
        }, 1500 + i * 90);
      });
    }

    // Traveling dots — infinite loop, but cancelled cleanly on cleanup.
    function runTravelDot(
      dotId: string,
      target: { x: number; y: number },
      delayStart: number,
      period: number,
    ) {
      // container! — guarded by early return at top of effect
      const dotOrNull = container!.querySelector<SVGCircleElement>(`#ai-illu-${dotId}`);
      if (!dotOrNull) return;
      // Assign to typed non-null variable so TypeScript is happy inside closures
      const dotEl: SVGCircleElement = dotOrNull;

      const dx = target.x - CX;
      const dy = target.y - CY;
      const len = Math.hypot(dx, dy);
      const ux = dx / len;
      const uy = dy / len;

      function go() {
        if (cancelled) return;
        const dur = 720;
        let start: number | null = null;
        dotEl.setAttribute('opacity', '0');

        function step(ts: number) {
          if (cancelled) { dotEl.setAttribute('opacity', '0'); return; }
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const ep = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
          dotEl.setAttribute('cx', String(CX + ux * len * ep));
          dotEl.setAttribute('cy', String(CY + uy * len * ep));
          const fade = p < 0.1 ? p / 0.1 : p > 0.8 ? 1 - (p - 0.8) / 0.2 : 1;
          dotEl.setAttribute('opacity', (fade * 0.9).toFixed(2));
          if (p < 1) {
            requestAnimationFrame(step);
          } else {
            dotEl.setAttribute('opacity', '0');
            if (!cancelled) addTimer(go, period - dur);
          }
        }

        requestAnimationFrame(step);
      }

      // If entrance has already played we don't want a 1.6-2.4 s wait before
      // dots reappear when the illustration scrolls back into view. Start
      // dots almost immediately on re-entry; first-time entry keeps the
      // original delays so the choreography reads correctly.
      const startDelay = entrancePlayedRef.current && delayStart > 600 ? 200 : delayStart;
      addTimer(go, startDelay);
    }

    (
      [
        ['td1', stages[0], 1600, 2200],
        ['td2', stages[1], 2000, 2400],
        ['td3', stages[2], 2400, 2100],
        ['td4', stages[3], 1800, 2300],
        ['td5', stages[4], 2200, 2500],
      ] as [string, { x: number; y: number }, number, number][]
    ).forEach(([id, s, d, p]) => runTravelDot(id, s, d, p));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [isVisible, isTabVisible]);

  return (
    <div ref={inViewRef} className="ai-agents-illustration">
    <div ref={containerRef} className="ai-agents-illustration__inner">
      <div ref={canvasRef} className="ai-agents-illustration__canvas">

        {/* SVG: rings, spokes, traveling dots */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
          viewBox="0 0 572 428"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="ai-illu-bgGlow" cx="50%" cy="50%" r="45%">
              <stop offset="0%" stopColor="#C0A8EE" stopOpacity=".16" />
              <stop offset="100%" stopColor="#C0A8EE" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ai-illu-gl1" x1="286" y1="214" x2="286" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7A4ECC" stopOpacity=".65" />
              <stop offset="100%" stopColor="#AA88EE" stopOpacity=".12" />
            </linearGradient>
            <linearGradient id="ai-illu-gl2" x1="286" y1="214" x2="452" y2="196" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7A4ECC" stopOpacity=".65" />
              <stop offset="100%" stopColor="#AA88EE" stopOpacity=".12" />
            </linearGradient>
            <linearGradient id="ai-illu-gl3" x1="286" y1="214" x2="388" y2="342" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7A4ECC" stopOpacity=".65" />
              <stop offset="100%" stopColor="#AA88EE" stopOpacity=".12" />
            </linearGradient>
            <linearGradient id="ai-illu-gl4" x1="286" y1="214" x2="182" y2="342" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7A4ECC" stopOpacity=".65" />
              <stop offset="100%" stopColor="#AA88EE" stopOpacity=".12" />
            </linearGradient>
            <linearGradient id="ai-illu-gl5" x1="286" y1="214" x2="120" y2="196" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7A4ECC" stopOpacity=".65" />
              <stop offset="100%" stopColor="#AA88EE" stopOpacity=".12" />
            </linearGradient>
          </defs>

          {/* Background glow */}
          <circle cx="286" cy="214" r="188" fill="url(#ai-illu-bgGlow)" />

          {/* Rings (start hidden, fade in via JS) */}
          <circle id="ai-illu-orbitRing" cx="286" cy="214" r="152"
            fill="none" stroke="#B0A0DC" strokeWidth="1" strokeDasharray="5 10" opacity="0" />
          <circle id="ai-illu-innerRing" cx="286" cy="214" r="96"
            fill="none" stroke="#CEC0E8" strokeWidth=".8" opacity="0" />

          {/* Spokes (drawn via stroke-dashoffset animation) */}
          <line id="ai-illu-ln1" x1="286" y1="214" x2="286" y2="56"
            stroke="url(#ai-illu-gl1)" strokeWidth="1.6" strokeDasharray="200" strokeDashoffset="200" />
          <line id="ai-illu-ln2" x1="286" y1="214" x2="452" y2="196"
            stroke="url(#ai-illu-gl2)" strokeWidth="1.6" strokeDasharray="200" strokeDashoffset="200" />
          <line id="ai-illu-ln3" x1="286" y1="214" x2="388" y2="342"
            stroke="url(#ai-illu-gl3)" strokeWidth="1.6" strokeDasharray="200" strokeDashoffset="200" />
          <line id="ai-illu-ln4" x1="286" y1="214" x2="182" y2="342"
            stroke="url(#ai-illu-gl4)" strokeWidth="1.6" strokeDasharray="200" strokeDashoffset="200" />
          <line id="ai-illu-ln5" x1="286" y1="214" x2="120" y2="196"
            stroke="url(#ai-illu-gl5)" strokeWidth="1.6" strokeDasharray="200" strokeDashoffset="200" />

          {/* Traveling dots */}
          <circle id="ai-illu-td1" r="3.5" fill="#9966DD" opacity="0" />
          <circle id="ai-illu-td2" r="3.5" fill="#9966DD" opacity="0" />
          <circle id="ai-illu-td3" r="3.5" fill="#9966DD" opacity="0" />
          <circle id="ai-illu-td4" r="3.5" fill="#9966DD" opacity="0" />
          <circle id="ai-illu-td5" r="3.5" fill="#9966DD" opacity="0" />
        </svg>

        {/* MCP Hub */}
        <div className="ai-agents-illustration__mcp-hub" id="ai-illu-mcpHub">
          <svg className="ai-agents-illustration__hub-icon" width="30" height="30" viewBox="10 18 150 175" fill="none" aria-hidden="true">
            <path d="M25 97.8528L92.8823 29.9706C102.255 20.598 117.451 20.598 126.823 29.9706C136.196 39.3431 136.196 54.5391 126.823 63.9117L75.5581 115.177"
              stroke="rgba(255,255,255,.92)" strokeWidth="12" strokeLinecap="round" />
            <path d="M76.2653 114.47L126.823 63.9117C136.196 54.5391 151.392 54.5391 160.765 63.9117L161.118 64.2652C170.491 73.6378 170.491 88.8338 161.118 98.2063L99.7248 159.6C96.6006 162.724 96.6006 167.789 99.7248 170.913L112.331 183.52"
              stroke="rgba(255,255,255,.92)" strokeWidth="12" strokeLinecap="round" />
            <path d="M109.853 46.9411L59.6482 97.1457C50.2757 106.518 50.2757 121.714 59.6482 131.087C69.0208 140.459 84.2168 140.459 93.5894 131.087L143.794 80.8822"
              stroke="rgba(255,255,255,.92)" strokeWidth="12" strokeLinecap="round" />
          </svg>
          <span className="ai-agents-illustration__hub-label">MCP</span>
          <span className="ai-agents-illustration__hub-sub">server</span>
        </div>

        {/* Stage card 1 · Design (spoke tip: 286, 56) */}
        <div className="ai-agents-illustration__stage-card" id="ai-illu-sn1" style={{ left: '286px', top: '72px' }}>
          <div className="ai-agents-illustration__card-head">
            <div className="ai-agents-illustration__card-icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M10.2 2L13 4.8L5.8 12H3V9.2L10.2 2Z" stroke="#6A7EAA" strokeWidth="1.15" strokeLinejoin="round" />
                <path d="M8.5 3.7L11.3 6.5" stroke="#6A7EAA" strokeWidth="1.15" strokeLinecap="round" />
              </svg>
            </div>
            <span className="ai-agents-illustration__card-name">Design</span>
            <div className="ai-agents-illustration__agent-chip" id="ai-illu-ac1">
              <span className="ai-agents-illustration__agent-dot" />
              <span className="ai-agents-illustration__agent-lbl">agent</span>
            </div>
          </div>
          <span className="ai-agents-illustration__card-hint">Suggests test cases from specs &amp; requirements</span>
        </div>

        {/* Stage card 2 · Plan (spoke tip: 452, 196) */}
        <div className="ai-agents-illustration__stage-card" id="ai-illu-sn2" style={{ left: '452px', top: '212px' }}>
          <div className="ai-agents-illustration__card-head">
            <div className="ai-agents-illustration__card-icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <rect x="1.8" y="1.8" width="11.4" height="11.4" rx="2.2" stroke="#6A7EAA" strokeWidth="1.15" />
                <path d="M4.2 5.2h6.6M4.2 7.6h4.4M4.2 10h5.5" stroke="#6A7EAA" strokeWidth="1.15" strokeLinecap="round" />
              </svg>
            </div>
            <span className="ai-agents-illustration__card-name">Plan</span>
            <div className="ai-agents-illustration__agent-chip" id="ai-illu-ac2">
              <span className="ai-agents-illustration__agent-dot" />
              <span className="ai-agents-illustration__agent-lbl">agent</span>
            </div>
          </div>
          <span className="ai-agents-illustration__card-hint">Prioritizes tests by risk &amp; coverage gaps</span>
        </div>

        {/* Stage card 3 · Execute (spoke tip: 388, 342) */}
        <div className="ai-agents-illustration__stage-card" id="ai-illu-sn3" style={{ left: '404px', top: '356px' }}>
          <div className="ai-agents-illustration__card-head">
            <div className="ai-agents-illustration__card-icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="5.7" stroke="#6A7EAA" strokeWidth="1.15" />
                <path d="M6 5.3l4.2 2.2L6 9.7V5.3z" stroke="#6A7EAA" strokeWidth="1.1" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="ai-agents-illustration__card-name">Execute</span>
            <div className="ai-agents-illustration__agent-chip" id="ai-illu-ac3">
              <span className="ai-agents-illustration__agent-dot" />
              <span className="ai-agents-illustration__agent-lbl">agent</span>
            </div>
          </div>
          <span className="ai-agents-illustration__card-hint">Detects flaky tests &amp; monitors runs in real time</span>
        </div>

        {/* Stage card 4 · Analyze (spoke tip: 182, 342) */}
        <div className="ai-agents-illustration__stage-card" id="ai-illu-sn4" style={{ left: '164px', top: '356px' }}>
          <div className="ai-agents-illustration__card-head">
            <div className="ai-agents-illustration__card-icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M2 11l3.2-3.8 2.6 2.1 3.2-4.4L13.5 3" stroke="#6A7EAA" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 13.2h11" stroke="#6A7EAA" strokeWidth="1.15" strokeLinecap="round" />
              </svg>
            </div>
            <span className="ai-agents-illustration__card-name">Analyze</span>
            <div className="ai-agents-illustration__agent-chip" id="ai-illu-ac4">
              <span className="ai-agents-illustration__agent-dot" />
              <span className="ai-agents-illustration__agent-lbl">agent</span>
            </div>
          </div>
          <span className="ai-agents-illustration__card-hint">Classifies failures &amp; surfaces root causes</span>
        </div>

        {/* Stage card 5 · Release (spoke tip: 120, 196) */}
        <div className="ai-agents-illustration__stage-card" id="ai-illu-sn5" style={{ left: '120px', top: '212px' }}>
          <div className="ai-agents-illustration__card-head">
            <div className="ai-agents-illustration__card-icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M7.5 11C7.5 11 4 8.8 4 6C4 3.5 5.5 2 7.5 2C9.5 2 11 3.5 11 6C11 8.8 7.5 11 7.5 11Z"
                  stroke="#6A7EAA" strokeWidth="1.15" strokeLinejoin="round" />
                <circle cx="7.5" cy="5.8" r="1.4" stroke="#6A7EAA" strokeWidth="1.1" />
                <path d="M5.5 10L4.6 13M9.5 10L10.4 13" stroke="#6A7EAA" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </div>
            <span className="ai-agents-illustration__card-name">Release</span>
            <div className="ai-agents-illustration__agent-chip" id="ai-illu-ac5">
              <span className="ai-agents-illustration__agent-dot" />
              <span className="ai-agents-illustration__agent-lbl">agent</span>
            </div>
          </div>
          <span className="ai-agents-illustration__card-hint">Makes go / no-go decision automatically</span>
        </div>

      </div>
    </div>
    </div>
  );
};
