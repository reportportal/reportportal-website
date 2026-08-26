# ReportPortal Landing — Claude Code Instructions

## Working state (local, not committed)

@HANDOFF.md

`HANDOFF.md` holds the current working state: active branch, in-progress task,
recent decisions, known pitfalls. It is gitignored and local-only.

**Keep it current.** After finishing any meaningful unit of work — a fix that
took more than one step, a deploy, a branch switch, a decision about approach,
a newly discovered pitfall — update `HANDOFF.md` without being asked. Update the
`Останнє оновлення` date at the same time. Keep it short: replace stale entries
rather than appending. If the file is missing, the instruction simply does not apply.

---

## Project Overview
- **Site:** reportportal.github.io
- **Stack:** Gatsby + React + TypeScript + SCSS
- **UI Library:** Ant Design
- **CMS:** Contentful

---

## Critical Rules (never break these)

- NO CSS Modules — global SCSS only
- NO hardcoded colors — always use CSS variables
- NO `<a>` tags — always use `<Link>` from `@app/components/Link`
- NO `@import` in SCSS — only `@use`
- NO breakpoints other than 768px and 1239px
- NO inline styles unless absolutely unavoidable

---

## CSS Variables — Strict Rules (no exceptions)

### Never create local CSS variables
Do NOT define CSS custom properties inside component `.scss` files.
Do NOT define `:root` blocks anywhere except `src/styles/css-variables.scss`.
Do NOT create scoped variables like:

```scss
// ❌ WRONG — never do this
.my-section {
  --my-section-title-color: #2f3c5f;
  --my-subtitle: #5f6578;
}
```

### Always use existing globals
Before using any color, spacing, or typography value —
search `src/styles/` for an existing variable first.

```scss
// ✅ CORRECT
.my-section {
  &__title { color: var(--text-primary); }
  &__subtitle { color: var(--text-grey); }
}
```

### Color lookup table (use this before hardcoding anything)
```
#2f3c5f → var(--text-primary)
#5f6578 → var(--text-grey)
#8791ab → var(--text-service)
#c3c8d5 → var(--text-light-grey)
#fff    → var(--white)
#f4f5fa → var(--bg-grey2)
#fbfcfd → var(--bg-light-grey)
#edeff6 → var(--purple-grey)
#0081a7 → var(--color-primary-700)
#009dbb → var(--color-primary-600)
#00b4d5 → var(--color-primary-500)
#ccf0f7 → var(--color-primary-200)
#ebfbff → var(--color-primary-100)
```

### If a color has no global equivalent
Add it to `src/styles/css-variables.scss` in the `:root` block
with a semantic name — NOT tied to a component.

```scss
// ✅ Add to src/styles/css-variables.scss
:root {
  --color-enterprise-badge: #1a2b4c; /* semantic name, not .enterprise__badge */
}
```

### Typography — never hardcode
```scss
// ❌ WRONG
font-size: 32px;
line-height: 48px;
font-family: Poppins, sans-serif;
font-weight: 700;

// ✅ CORRECT
@include m.font-poppins(v.$fw-bold);
@include m.font-scale('large');
```

### Self-check before finishing any task
Before completing, run this mental checklist:
- [ ] No hardcoded hex colors anywhere in new `.scss` files
- [ ] No locally defined CSS custom properties in components
- [ ] No hardcoded `font-size`, `line-height`, `font-family` values
- [ ] All new colors either use existing globals or are added to `:root` in `css-variables.scss`

---

## SCSS Structure

Every SCSS file must follow this order:
```scss
@use 'src/styles/mixins' as m;
@use 'src/styles/variables' as v;

// empty line here

.block {
  // styles
}
```

### Breakpoints (only these three)
```scss
// mobile: 360px — base, no media query needed
// tablet:
@include m.breakpoint(v.$tablet-sm-exact); // 768px
// desktop:
@include m.breakpoint(v.$desktop-sm);      // 1239px
```

### Font mixins
```scss
@include m.font-noto-sans();                    // body text
@include m.font-noto-sans(v.$fw-semi-bold);     // semi-bold body
@include m.font-poppins(v.$fw-bold);            // headings
@include m.roboto-mono();                       // code/mono
```

### Font scale
```scss
@include m.font-scale('base');      // 16px
@include m.font-scale('medium');    // 20px
@include m.font-scale('large');     // 32px
@include m.font-scale('x3-large'); // 48px
// Full scale: s-small, x-small, small, base, medium,
// x2-medium, x3-medium, x4-medium, large, x2-large, x3-large, x4-large
```

---

## CSS Variables
```css
/* Primary colors */
--color-primary-800: #005a6e
--color-primary-700: #0081a7  ← main blue
--color-primary-600: #009dbb
--color-primary-500: #00b4d5
--color-primary-200: #ccf0f7
--color-primary-100: #ebfbff

/* Text */
--text-primary: #2f3c5f
--text-grey: #5f6578
--text-service: #8791ab
--text-light-grey: #c3c8d5

/* Backgrounds */
--white: #fff
--bg-grey2: #f4f5fa
--bg-light-grey: #fbfcfd
--purple-grey: #edeff6

/* Gradients */
--gradient-primary         ← 55deg, primary-700 → primary-600
--gradient-primary-2       ← dark, for hero sections
--gradient-light           ← transparent, for sections

/* Sizes */
--size-max-width: 1200px
--header-height: 76px
--base-spacing: 8px
--basic-transition: all 0.3s ease-in-out
```

---

## Component Patterns

### BEM via createBemBlockBuilder
```tsx
const getBlocksWith = createBemBlockBuilder(['my-section']);

<div className={getBlocksWith()}>
  <div className={getBlocksWith('__title')}>
  <div className={getBlocksWith('__item--active')}>
```

### Page container (max-width 1200px)
```tsx
<div className="container">...</div>
```

### Links
```tsx
import { Link } from '@app/components/Link';
<Link to="/some-path">text</Link>
```

### SVG icons
```tsx
import ArrowIcon from './arrow.inline.svg';
<ArrowIcon />
```

### Component type
```tsx
export const MySection: FC = () => { ... };
```

---

## Import Order (TypeScript)
```tsx
// 1. React + external libraries
import React, { FC, useState } from 'react';
import classNames from 'classnames';

// 2. Internal utilities
import { createBemBlockBuilder } from '@app/utils';

// 3. Internal components
import { Link } from '@app/components/Link';

// 4. Local components
import { MySubComponent } from './components/MySubComponent';

// 5. SCSS last
import './MySection.scss';
```

---

## File Structure for New Pages
```
src/containers/NewPage/
  index.tsx           ← main component
  NewPage.scss        ← page-level styles
  constants.ts        ← data, lists, constants
  components/         ← local sub-components
    HeroSection/
      index.tsx
      HeroSection.scss
```

---

## Existing Reusable Components
Before creating anything new, check if these exist:
- `@app/components/Link` — all links
- `@app/components/ArrowLink` — arrow CTA links
- `@app/components/Banner` — CTA banners
- `@app/components/AnimatedHeader` — animated h1/h2
- `@app/components/Faq` — accordion FAQ
- `@app/components/SupportedFrameworks` — frameworks grid
- `@app/components/ProcessIntegration` — integration section
- `@app/components/StartTestingWithReportPortal` — bottom CTA

---

## Illustration System — FeaturesPage

Illustrations are inline React components. NO iframes. NO external pages.

Reason: iframes pointing to Gatsby pages break the router
and cause infinite loading indicators on navigation.

### Component location

```
src/containers/FeaturesPage/components/FeatureIllustration/
  index.tsx            ← FeatureIllustration component
  FeatureIllustration.scss
```

### Pattern

Renders a browser-window chrome mockup using only BEM classes and CSS variables.
The `name` prop (equals the feature `id`) is passed as `data-illustration` so
per-illustration styles can be added via CSS attribute selectors if needed.

```tsx
import { FeatureIllustration } from './components/FeatureIllustration';

<FeatureIllustration name={id} />
```

### To add a real illustration

1. Edit `FeatureIllustration/index.tsx`
2. Add conditional rendering based on `name` prop
3. Style in `FeatureIllustration.scss` using global CSS variables only

NEVER use `<iframe>` for illustrations in this project.

---

## Performance Rules (important for future merges)

These rules emerged from a performance audit of the home page. Breaking them
brings back the old problems: slow LCP, heavy initial network, bloated antd CSS.

### Hero / above-the-fold elements — NO `motion.*` wrappers

The LCP element (usually the `<h1>` on the first fold) must NOT go through
`opacity: 0 → 1` or `scale`. While framer-motion holds `opacity: 0`, the browser
does not count the element as painted, and LCP "hangs" for 2–3 seconds.

```tsx
// ❌ WRONG — costs a second of LCP with no UX value
<motion.h1 {...getAnimation({ isInView })}>AI-powered…</motion.h1>

// ✅ CORRECT — Hero is always in the viewport, animation is not needed
<h1 className={getBlocksWith('__title')}>AI-powered…</h1>
```

This rule applies to **all** first-fold elements: title, subtitle,
CTA buttons, hero image. Scroll-triggered animations (`AnimatedList`,
`AnimatedHeader`) are only for sections that are NOT visible on load.

### All `<img>` below the first fold — `loading="lazy"`

If an `<img>` (or `<motion.img>`) renders in a section that requires scrolling
to reach — always add `loading="lazy"`. Without it, the browser
loads the image immediately, even if it is not visible.

```tsx
// ❌ WRONG — eagerly loads a 100+ KB SVG
<img src={image} alt="" />

// ✅ CORRECT
<img src={image} alt="" loading="lazy" />
```

Exception: the LCP element (usually the Hero image). It should use `loading="eager"`
or no attribute at all (eager is the default), and ideally have a `<link rel="preload">`.

### antd: new component → add to whitelist

`static/antd.min.css` is generated by `bin/gen-antd-css.js` with a
**whitelist** of used antd components. Not from all of antd
(otherwise 1 MB of CSS comes back).

If you import a new antd component in any file under src/ —
add it to `USED_COMPONENTS` in `bin/gen-antd-css.js` and re-run
`npm run prestart` or `npm run prebuild`. Otherwise the component will have no styles
until the runtime cssinjs applies them → visible FOUC.

Exceptions (already in the package's internal blackList, runtime-only):
`Drawer`, `Modal`, `Tooltip`, `ConfigProvider`, `Popconfirm`, `Popover`,
`Tour`, `Grid` — these do not need to be added to the whitelist.

### antd Modal — `styles.mask`, NOT `maskStyle`

`maskStyle` is deprecated in antd v5 and will be removed in v6.

```tsx
// ❌ WRONG
<Modal maskStyle={{ ... }} />

// ✅ CORRECT
<Modal styles={{ mask: { ... } }} />
```

Same applies to `bodyStyle` → `styles.body`, `wrapClassName` → remains OK.

### SVG: outline-only icons → `.inline.svg` (React component)

Decorative illustrations weighing 50+ KB (e.g. featuresListItem*.svg) —
without `.inline.svg`, they are imported as a URL and the browser loads them as a
separate request + caches them. This is better than embedding them in the JS bundle.

Small icons (≤5 KB) that need to be recolored via `currentColor` —
keep as `*.inline.svg` (React component) so they can be controlled with styles.

Large illustrations (100+ KB) — worth compressing via SVGO or converting
to PNG/WebP, as parsing large SVGs in the browser is not free.

### `iconsCommon` (from `src/utils/imageSource.ts`) — use with caution

`iconsCommon` pulls in `dashboard.svg` (1.9 MB). Webpack code-splitting
normally prevents it from ending up in other chunks, but importing from this barrel
in a component that renders on the home page will put 1.9 MB into the main chunk.

If you only need one icon from it — import directly from `src/svg/`, not
via `imageSource.ts`.

### Pixel-perfect illustrations — required pattern

This applies to all illustrations like `MilestonesIllustration`, `AiAgentsIllustration`,
`TestPlanningIllustration`, `ReleaseDecisionIllustration` — pixel-perfect product
page mockups rendered as inline React components.

**File structure:**

```
src/components/Illustrations/MyIllustration/    ← shared, for reuse across pages
  index.tsx
  MyIllustration.scss
```

Or (for a one-off illustration used on a single page):

```
src/containers/MyPage/components/MyIllustration/
  index.tsx
  MyIllustration.scss
```

Do NOT mix styles from different illustrations into one shared SCSS file (as was done with
`FeatureIllustration.scss` for 5+ illustrations). This pulls unnecessary CSS into pages
where the illustration is not used.

**Class names — BEM with a prefix, never short generic names:**

```tsx
// ❌ WRONG — short generic classes collide with other components
<div className="hd">…</div>
<div className="pr">…</div>
<div className="bf1" />

// ✅ CORRECT — BEM with block prefix
<div className="mi__hd">…</div>
<div className="mi__pr-row">…</div>
<div className="mi__bar-fill mi__bar-fill--1" />
```

The prefix = block name (e.g. `mi` for Milestones, `rdi` for
ReleaseDecisionIllustration). It must be short but **unique** — so it does not
collide with any other component on the site.

**Animations — paused-by-default via CSS, not a conditional class via JS:**

```scss
// ✅ CORRECT — CSS-only, no re-render
.mi {
  opacity: 0;

  &__row {
    animation: mi-sU .4s ease both .3s;
    animation-play-state: paused;
  }

  &--visible {
    animation: mi-fI .5s ease forwards;

    .mi__row {
      animation-play-state: running;
    }
  }
}
```

```tsx
// JSX only adds the class — no useState/useEffect per element
<div className={classNames('mi', { 'mi--visible': isVisible })}>…</div>
```

This is cheaper than `useState(isAnimating)` + conditional modifier on canvas,
because it avoids an extra re-render of the component on reveal.

**Infinite-loop animations (`pulseDot`, `iconPulse`) — always pause:**

If an illustration has an infinite keyframe — add a Page Visibility hook + the
`--paused` class that sets `animation-play-state: paused !important` on all children.
Reference: `ReleaseDecisionIllustration` / `AiAgentsIllustration`.

```scss
.my-illu {
  &--paused,
  &--paused * {
    animation-play-state: paused !important;
  }
}
```

```tsx
const [isTabVisible, setIsTabVisible] = useState(
  typeof document !== 'undefined' ? !document.hidden : true,
);

useEffect(() => {
  if (typeof document === 'undefined') return undefined;
  const onChange = () => setIsTabVisible(!document.hidden);
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
}, []);

return (
  <div className={classNames('my-illu', { 'my-illu--paused': !isTabVisible })}>
    …
  </div>
);
```

**Responsive — two valid patterns:**

1. **CSS-only via `max-width`** — when the layout is vertical without floating
   elements (example: `MilestonesIllustration`).
   ```scss
   .mi {
     width: 100%;
     max-width: 760px;
   }
   ```

2. **JS scale via ResizeObserver + `transform: scale`** — when precise
   pixel-perfect positioning with floating/bleed cards is needed (examples:
   `ReleaseDecisionIllustration`, `AiAgentsIllustration`).
   ```tsx
   useEffect(() => {
     function applyScale() {
       const scale = Math.min(1, container.offsetWidth / NATURAL_W);
       canvas.style.transform = `scale(${scale})`;
       container.style.height = `${NATURAL_H * scale}px`;
     }
     applyScale();
     const ro = new ResizeObserver(applyScale);
     ro.observe(container);
     return () => ro.disconnect();
   }, []);
   ```

Do not combine both.

**Hide on mobile if element density makes the illustration unreadable:**

```scss
&__dashboard {
  display: none;

  @include m.breakpoint(v.$tablet-sm-exact) {
    display: block;
  }
}
```

Pixel-perfect illustrations on a 360 px viewport scale down to ~0.35, making 8–10 px
fonts effectively 3–4 px — unreadable. Either hide completely on mobile, or create
a separate compact version.

**Inline `style={{...}}` — only for dynamic values via CSS custom props:**

```tsx
// ❌ WRONG — static values in JSX instead of SCSS
<div style={{ fontSize: '12px', fontWeight: 700, color: '#1A2740' }}>…</div>

// ✅ CORRECT — static values in SCSS, only dynamic values in JSX
<div className="mi__bar-fill" style={{ '--w': '78%' } as React.CSSProperties} />
```

```scss
.mi__bar-fill {
  width: 0;
  animation: mi-bF .6s ease both;
}

// or via modifiers
&--1 {
  --w: 78%;
}
```

**Accessibility:**

The illustration container should have `role="img"` + a detailed `aria-label` describing
the actual content (not "decoration"):

```tsx
<div
  role="img"
  aria-label="ReportPortal release decision dashboard: 1,847 tests, 28 AI-triaged failures, quality gates passed"
>
  …
</div>
```

### Infinite animations (RAF / setInterval loops) — always pause off-screen + on hidden tab

If an illustration has an infinite loop (`requestAnimationFrame` that restarts
itself, or `setInterval`/`addTimer(go, ...)` that loops indefinitely) — it
must stop in two cases:

1. The user has scrolled away from the illustration (`useInView({ once: false })`).
2. The tab is in the background (`document.hidden === true`, listen to `visibilitychange`).

Without these pauses, the fan spins while the page is open, even when
the user is not looking at it. Reference implementation — `AiAgentsIllustration`.

If you have an entrance animation + an infinite loop, move the entrance into a `useRef` flag
(`entrancePlayedRef`) so it does not replay every time the illustration returns
to the viewport.

### Any change in hero/landing/main chunk → verify LCP

After a PR that touches `NewLandingPage`, `Layout`, `Navigation`, `Footer`,
`bin/gen-antd-css.js`, `static/antd.min.css` — always:

1. `npm run build && npm run serve`
2. Open the home page in Incognito (no extensions — to avoid noise from
   "message channel closed" and similar)
3. DevTools → Performance → Live metrics → check LCP

Target: LCP &lt; 2.5 s (good zone in Web Vitals).
