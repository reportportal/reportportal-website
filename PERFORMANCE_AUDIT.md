# Performance Audit — Home Page (NewLandingPage)

Date: 2026-05-18
Local: `gatsby develop -p 8080`, memory ~720 MB, LCP 2.62 s
Prod: https://reportportal.io/

---

## TL;DR

Most of the issues you see in DevTools **are not real production problems**:

- **720 MB memory** — almost entirely `gatsby develop` (Webpack + HMR + source maps + Babel cache). With `gatsby build` + `gatsby serve` it will be 5–10× less.
- **1377 "preloaded but not used" warnings** — a side effect of Gatsby's default preload+prefetch strategy combined with **a large navigation menu with many links**. Present in production too, but it's a warning, not an error.
- **404 for `page-data/.../page-data.json`** — a `develop`-mode artifact. Does not happen in production.
- **socket.io / HMR / ERR_NETWORK_IO_SUSPENDED** — develop mode only.
- **"message channel closed"** — 99% caused by a Chrome extension (Google Translate, AdBlock, etc.), not the site code.
- **antd Modal `maskStyle` deprecated** — real, but cosmetic. One line fix.

Actual issues worth fixing:

1. The Hero section animates the heading and buttons via `framer-motion` with a delay — the LCP element does not appear on the first frame.
2. `static/antd.min.css` weighs **1 MB** and blocks the first render — it includes styles for ALL antd components, not just the ones used.
3. The home page uses **too many `motion.*` wrappers and `useInView` hooks** — each creates an IntersectionObserver. Not critical, but affects memory and first paint.
4. The `iconsCommon` barrel from `imageSource.ts` pulls in `dashboard.svg` (1.9 MB) — used in `StartTestingWithReportPortal`, which is not on the new home page, but may end up in a shared chunk via the barrel.
5. No `loading="lazy"` or placeholder on the main dashboard mockup (`__dashboard-placeholder` — currently just CSS).

---

## 1. Memory 720 MB — where it comes from

| Source | Estimated contribution |
|---|---|
| Webpack dev compilation + module cache | ~250–400 MB |
| HMR client + source maps in memory | ~80–150 MB |
| React DevTools (if installed) | ~50–100 MB |
| StyleProvider + @ant-design/cssinjs runtime | ~20–40 MB |
| `framer-motion` + Intersection Observers (12+ on the page) | ~10–20 MB |
| `react-fast-marquee` × 2 (TrustedBy + ProcessIntegration) — RAF loop | ~10 MB |
| Images / SVGs in DOM | depends on render |

**How to measure accurately:**
```
npm run build && npm run serve
```
Open that build in the same tab — you will see memory drop to ~80–150 MB.
If it is still 700+ MB there — then there is a real leak. Current data points to a `develop`-mode artifact.

---

## 2. LCP 2.62 s — how to save a second

The LCP element on the home page is most likely **`<motion.h1>` "AI-powered test management & analytics"**.

`HeroSection/index.tsx` currently does this:

```tsx
<motion.h1 {...getAnimation({ isInView: isContentInView })}>
  AI-powered test management & analytics
</motion.h1>
```

`getAnimation` from `useMotionEnterAnimation` adds `opacity: 0 → 1` + `scale`. Until `useInView` fires and the first animation frame renders, the h1 is invisible → the browser does not count it as LCP.

**What helps (without major architectural changes):**

- For **hero elements** (h1, subtitle, CTA) only animate on scroll, show immediately on mount (`initial="visible"` when `isFirstScreen`).
- Or remove the fade-in for the Hero h1 and buttons entirely — it adds no UX value but costs LCP.
- Or reduce `delay` for the first fold to 0 and `duration` to ≤ 0.15 s.

Also blocking first render:
- `static/antd.min.css` — 1 MB (see section 3).
- `framer-motion` bundle — ~50 KB gz, not critical but contributes.
- Cookiebot/OneTrust + VWO (`gatsby-ssr.tsx`) — already `defer`, OK.

---

## 3. `antd.min.css` — 1 MB on every page

`bin/gen-antd-css.js` calls `extractStyle()` without filtering:

```js
const css = extractStyle();
```

This extracts styles **for all 50+ antd components**, even though the home page only uses `Drawer`, `Collapse`, `Modal`.

**Practical fix without a rewrite:**

`@ant-design/static-style-extract` supports selective extraction — you can pass only the components actually used in the project. Based on grep, there are ~10:
`Button, Carousel, Collapse, Divider, Drawer, Form, Input, Modal, Steps, Tabs, ConfigProvider, Tag, Tooltip, Typography`.

This should cut the CSS size roughly in half.

---

## 4. 1377 preload warnings — explanation

Gatsby **prefetches** everything needed for a page for every `<Link>` in the viewport: `page-data.json`, JS chunk, CSS chunk(s) with all rules from `ruleSet[1].rules[10].oneOf[*]`.

Your `Navigation` has 5 mega-menus (Product / Solutions / Pricing / Learn / Community) + footer — that is **dozens** of links. Each → preload `<link rel="preload" as="script">` + `as="style">`. If a chunk does not "fire" within ~3 s — the browser warns.

The preloads themselves do not kill performance, but they **pull traffic and memory for nothing**. Especially noticeable for users on slow connections.

**What you can do:**

- Switch menu links (header) to `<Link prefetch={false}>` for items the user rarely opens (Legal, Sponsorship, Accelerators).
- Keep prefetch only for the top-5 transitions: Features, Test Management, Contact Us, Blog, Demo.
- This is a component-level setting in `<Link>` at `@app/components/Link`. You can add a `prefetch` prop defaulting to `false`.

---

## 5. 404 `page-data/contact-us/general/page-data.json`

Develop mode only. Gatsby in dev mode compiles pages lazily — when the Hero has `<Link to="/contact-us/general/">`, Gatsby tries to prefetch that route before webpack-dev-server has compiled it → 404 that resolves on its own.

This will not happen in production as long as `gatsby build` successfully generates the page.
In `gatsby-node.ts` `/contact-us/general/` is created from `contactUsBaseConfigs` via Contentful — if locally Contentful does not return `internalTitle: "Contact us"`, the page will not be built and the 404 will appear in production too. Verify that Contentful has all `ContactUs` entries.

---

## 6. antd Modal `maskStyle` deprecated

File: `src/components/Layout/EmbedVideo/EmbedVideo.tsx:21`

```tsx
maskStyle={{ backgroundColor: 'rgba(47, 60, 95, 0.5)', backdropFilter: 'blur(8px)' }}
```

antd v5+ expects:

```tsx
styles={{ mask: { backgroundColor: 'rgba(47, 60, 95, 0.5)', backdropFilter: 'blur(8px)' } }}
```

Currently just a deprecation warning, but it will be removed in the next major version. One-line fix.

---

## 7. "message channel closed" — not our bug

Classic error from Chrome extensions (Google Translate, LastPass, Grammarly, AdBlock). `(index):1` in the trace = inline script injected into the tab. Check in Incognito without extensions — it will be gone.

---

## 8. socket.io / ERR_NETWORK_IO_SUSPENDED

Develop mode only:
- `socket.io` — webpack-dev-server hot reload channel.
- `ERR_NETWORK_IO_SUSPENDED` — browser suspended the network (tab was in background, system sleep, throttling).

Will disappear in a build.

---

## 9. Heavy assets (outside the home page, but affects the bundle)

| File | Size | Where used |
|---|---|---|
| `src/svg/dashboard.svg` | **1.9 MB** | `iconsCommon` → `StartTestingWithReportPortal` (not on new home page, but via barrel!) |
| `src/svg/community/product-images-desktop.png` | 5.9 MB | Community page |
| `src/svg/community/product-images-tablet.png` | 2.1 MB | Community page |
| `src/containers/LandingPage/CustomersStatistics/icons/world.svg` | 1.2 MB | Old LandingPage |
| `src/components/CertificationCard/Certificates/svg/iso27001.inline.svg` | 528 KB | Certificates |

`dashboard.svg` via the `imageSource.ts` barrel can end up in a shared chunk → loaded on the home page too. **Worth checking with `gatsby-plugin-webpack-bundle-analyser-v2`**:

```bash
ANALYSE_BUNDLE=true npm run build
```

The report opens automatically after the build — you can see exactly what is in the main chunk.

---

## 10. CLS and INP — all good

- CLS = 0.01 — `good`
- INP = 56 ms — `good`

Nothing to touch here.

---

## Recommended fix order

1. **Remove fade-in animation from first-fold elements** (h1, subtitle, Hero CTA buttons) — fastest LCP gain, no risk.
2. **Replace `dashboard-placeholder` with a real image via `gatsby-plugin-image`** with `loading="eager"` and preload — so the LCP element is a real image, not an empty block.
3. **Run the bundle analyser** and see what the home page pulls in:
   ```
   ANALYSE_BUNDLE=true npm run build
   ```
4. **Reduce antd.min.css** via selective `extractStyle([...])`.
5. **Add `prefetch={false}` as the default** in `<Link>` for menu items not in the top-5.
6. **Fix `maskStyle` → `styles.mask`** in `EmbedVideo.tsx`.
7. Verify in Contentful that the `internalTitle: "Contact us"` entry exists for all routes in `contactUsBaseConfigs`.

Memory 720 MB and socket.io errors can be ignored — they are `develop`-mode noise.
