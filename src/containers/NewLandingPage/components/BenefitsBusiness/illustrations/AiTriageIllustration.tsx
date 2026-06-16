import React, { FC, useEffect, useRef } from 'react';
import { useIllustrationStatic } from '@app/components/AnimatedList/IllustrationStaticContext';

import './AiTriageIllustration.scss';

export const AiTriageIllustration: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isStatic = useIllustrationStatic();

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const $ = (id: string): HTMLElement | null => root.querySelector(`#${id}`);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, isStatic ? 0 : ms));
    };

    // Phase 1 — rows appear staggered
    const rowCells: Record<number, string[]> = {
      1: ['n1', 'nm1', 'lc1', 'bc1'],
      2: ['n2', 'nm2', 'lc2', 'bc2'],
      3: ['n3', 'nm3', 'lc3', 'bc3'],
      4: ['n4', 'nm4', 'lc4', 'bc4'],
      5: ['n5', 'nm5', 'lc5', 'bc5'],
      6: ['n6', 'nm6', 'lc6', 'bc6'],
    };

    [1, 2, 3, 4, 5, 6].forEach((n, i) => {
      t(() => {
        rowCells[n].forEach(id => {
          const el = $(id);
          if (el) {
            el.style.animation = 'at-rowIn .26s ease forwards';
            el.style.animationFillMode = 'forwards';
          }
        });
      }, 260 + i * 80);
    });

    const as = 260 + 6 * 80 + 280; // 1020ms — AI section appears

    // Phase 2 — AI inner appears
    t(() => {
      const inner = $('aiInner');
      if (inner) {
        inner.style.animation = 'at-contentIn .32s ease forwards';
        inner.style.animationFillMode = 'forwards';
      }
    }, as);

    // Phase 3 — flip badges
    const flip = (n: number, ndId: string, skId: string, delay: number) => {
      t(() => {
        const ti  = $('ti' + n);
        const nd  = $(ndId);
        const sk  = $(skId);
        const row = $('r'  + n);

        if (!ti || !nd || !sk || !row) return;

        row.style.transition = 'background .1s ease';
        row.style.background = 'rgba(0,157,187,.06)';
        t(() => { row.style.transition = 'background .5s ease'; row.style.background = ''; }, 80);

        ti.style.animation = 'at-tiOut .15s ease forwards';
        ti.style.animationFillMode = 'forwards';

        t(() => {
          sk.style.animation = 'at-starIn .28s cubic-bezier(.34,1.56,.64,1) forwards';
          sk.style.animationFillMode = 'forwards';
        }, 45);

        t(() => {
          nd.style.animation = 'at-bdgIn .22s cubic-bezier(.34,1.56,.64,1) forwards';
          nd.style.animationFillMode = 'forwards';
        }, 120);
      }, as + delay);
    };

    flip(1, 'nd1', 'sk1', 130);
    flip(2, 'nd2', 'sk2', 290);
    flip(4, 'nd4', 'sk4', 460);
    flip(5, 'nd5', 'sk5', 630);

    // Phase 4 — AA done: update summary text
    const aaDone = as + 820; // 1840ms
    t(() => {
      const aiDot   = $('aiDot');
      const aiTitle = $('aiTitle');
      const aiSub   = $('aiSub');

      if (aiDot)   aiDot.remove();
      if (aiTitle) aiTitle.innerHTML =
        '<b style="font-weight:600;color:#2F3C5F">4 of 6</b>' +
        '<span style="font-weight:400;color:#2F3C5F"> failures auto-classified. 2 require manual review.</span>';
      if (aiSub) {
        aiSub.innerHTML =
          '<span style="font-weight:400">System Issue (SI) — 2 &nbsp;·&nbsp; Product Bug (PB) — 1 &nbsp;·&nbsp; Automation Bug (AB) — 1</span>';
        aiSub.style.animation = 'at-contentIn .3s ease forwards';
        aiSub.style.animationFillMode = 'forwards';
      }
    }, aaDone);

    // Phase 5 — time stats
    const ts = aaDone + 280; // 2120ms

    t(() => {
      const lbl1 = $('lbl1');
      const lbl2 = $('lbl2');
      const tDiv = $('tDiv');
      if (lbl1) lbl1.style.animation = 'at-numIn .26s ease forwards';
      if (lbl2) lbl2.style.animation = 'at-numIn .26s ease forwards';
      if (tDiv) tDiv.style.background = '#C8D4DE';
    }, ts);

    t(() => {
      const tMan = $('tMan');
      const uMan = $('uMan');
      if (tMan) tMan.style.animation = 'at-numIn .28s ease forwards';
      t(() => { const u = $('uMan'); if (u || uMan) (u || uMan)!.style.animation = 'at-numIn .24s ease forwards'; }, 60);
    }, ts + 120);

    t(() => {
      const tAI = $('tAI');
      if (tAI) tAI.style.animation = 'at-numIn .28s ease forwards';
      t(() => { const u = $('uAI'); if (u) u.style.animation = 'at-numIn .24s ease forwards'; }, 60);
    }, ts + 280);

    t(() => {
      $('saveChip')?.classList.add('vis');
    }, ts + 460);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ai-triage-illus" ref={containerRef}>
      <div className="scene">

        {/* Header */}
        <div className="hdr">
          <span className="hdr-title">Launch: Regression Suite</span>
          <div className="stat-chips">
            <span className="sc sc-f">6 failed</span>
            <span className="sc sc-p">39 passed</span>
            <span className="sc sc-s">3 skipped</span>
          </div>
        </div>

        {/* Table */}
        <div className="tbl-wrap">
          <div className="tbl-hdr">
            <span className="th">№</span>
            <span className="th">Test name</span>
            <span className="th">Error log</span>
            <span className="th" style={{ textAlign: 'right' }}>Defect type</span>
          </div>

          {/* Row 1 → SI */}
          <div className="t-row" id="r1">
            <span className="t-num" id="n1">1</span>
            <span className="t-name" id="nm1">Login — Session Error</span>
            <div className="log-cell" id="lc1"><span className="log-chip">Connection refused</span></div>
            <div className="badge-cell" id="bc1">
              <span className="ai-star" id="sk1">✦</span>
              <div className="badge-wrap">
                <div className="dbadge dt-ti" id="ti1">TI</div>
                <div className="dbadge dt-si" id="nd1" style={{ opacity: 0 }}>SI</div>
              </div>
            </div>
          </div>

          {/* Row 2 → PB */}
          <div className="t-row" id="r2">
            <span className="t-num" id="n2">2</span>
            <span className="t-name" id="nm2">API Auth — Token Check</span>
            <div className="log-cell" id="lc2"><span className="log-chip">401 Unauthorized</span></div>
            <div className="badge-cell" id="bc2">
              <span className="ai-star" id="sk2">✦</span>
              <div className="badge-wrap">
                <div className="dbadge dt-ti" id="ti2">TI</div>
                <div className="dbadge dt-pb" id="nd2" style={{ opacity: 0 }}>PB</div>
              </div>
            </div>
          </div>

          {/* Row 3 — TI stays */}
          <div className="t-row" id="r3">
            <span className="t-num" id="n3">3</span>
            <span className="t-name" id="nm3">Password Reset — Email Send</span>
            <div className="log-cell" id="lc3"><span className="log-none">no match</span></div>
            <div className="badge-cell" id="bc3">
              <div className="badge-wrap"><div className="dbadge dt-ti">TI</div></div>
            </div>
          </div>

          {/* Row 4 → AB */}
          <div className="t-row" id="r4">
            <span className="t-num" id="n4">4</span>
            <span className="t-name" id="nm4">Test Suite — Init Step</span>
            <div className="log-cell" id="lc4"><span className="log-chip">NullPointerException</span></div>
            <div className="badge-cell" id="bc4">
              <span className="ai-star" id="sk4">✦</span>
              <div className="badge-wrap">
                <div className="dbadge dt-ti" id="ti4">TI</div>
                <div className="dbadge dt-ab" id="nd4" style={{ opacity: 0 }}>AB</div>
              </div>
            </div>
          </div>

          {/* Row 5 → SI */}
          <div className="t-row" id="r5">
            <span className="t-num" id="n5">5</span>
            <span className="t-name" id="nm5">Endpoint Load Test</span>
            <div className="log-cell" id="lc5"><span className="log-chip">Connection refused</span></div>
            <div className="badge-cell" id="bc5">
              <span className="ai-star" id="sk5">✦</span>
              <div className="badge-wrap">
                <div className="dbadge dt-ti" id="ti5">TI</div>
                <div className="dbadge dt-si" id="nd5" style={{ opacity: 0 }}>SI</div>
              </div>
            </div>
          </div>

          {/* Row 6 — TI stays */}
          <div className="t-row" id="r6">
            <span className="t-num" id="n6">6</span>
            <span className="t-name" id="nm6">Checkout — Payment Step</span>
            <div className="log-cell" id="lc6"><span className="log-none">no match</span></div>
            <div className="badge-cell" id="bc6">
              <div className="badge-wrap"><div className="dbadge dt-ti">TI</div></div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="bottom">
          <div className="ai-row">
            <div className="ai-inner" id="aiInner">
              <span className="ai-badge">✦ Auto-Analyzer</span>
              <div className="ai-summary">
                <span className="ai-title" id="aiTitle">
                  <span className="ai-dot pulse" id="aiDot" />
                  Scanning failure logs…
                </span>
                <span className="ai-sub" id="aiSub" />
              </div>
            </div>
          </div>

          <div className="time-area">
            <div className="t-side">
              <span className="t-side-lbl" id="lbl1">Without AI</span>
              <span className="t-big muted"  id="tMan">6h 20m</span>
              <span className="t-unit"        id="uMan">per launch</span>
            </div>
            <div className="t-div" id="tDiv">
              <div className="save-chip" id="saveChip">
                <span className="save-pct">73%</span>
                <span className="save-lbl">time saved</span>
                <span className="save-div" />
                <span className="save-tok">0 tokens spent</span>
              </div>
            </div>
            <div className="t-side">
              <span className="t-side-lbl" id="lbl2">With AI</span>
              <span className="t-big vivid"  id="tAI">1h 42m</span>
              <span className="t-unit"        id="uAI">per launch</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
