# Ant Design v5 styles in Gatsby — current setup and rationale

## TL;DR

We extract antd v5 styles per page during SSR using `@ant-design/cssinjs`'s
`createCache` + `extractStyle`, and inline the result into each page's
`<head>`. There is no `static/antd.min.css`, no `prestart`/`prebuild` script,
and no separate antd CSS request at runtime.

Cold first paint is ~43 % smaller (gzip) than the previous full-theme dump
approach, with one fewer render-blocking CSS request per page.

## How it works

### Production (`gatsby build`)

`gatsby-ssr.tsx` exports `replaceRenderer`, which:

1. Creates a fresh `createCache()` per page.
2. Wraps the body in `<StyleProvider cache={cache}><ConfigProvider
theme={{ hashed: false }}>` and calls `renderToString`. As antd
   components render they write their serialized rules into that cache.
3. Calls `extractStyle(cache, true)` to get a CSS string containing **only**
   the rules used by components actually rendered on this page.
4. Injects that CSS into `<head>` via `setHeadComponents` as
   `<style data-antd-cssinjs>...</style>`.

Because the cache is created fresh on every page render, every page's
inlined CSS is exactly its own working set — no cross-page leakage.

### Why default `hashPriority` (not `"high"`)

Project SCSS overrides antd via descendant selectors such as
`.faq .ant-collapse-item` (specificity 0,2,0). Default cssinjs keeps antd
rules at single-class specificity (`.ant-collapse-item`, 0,1,0), so SCSS
overrides win deterministically. `hashPriority="high"` would double antd
selectors to `.ant-collapse-item.ant-collapse-item` (0,2,0), tying the
SCSS and letting antd defaults bleed through (e.g. Collapse panel borders
on the FAQ, Steps wait-state dots filling grey instead of staying hollow).

### Why `theme.hashed: false`

Antd v5 normally wraps every selector in `:where(.css-XXX)` so multiple
antd versions or themes can coexist on one page without clobbering each
other. We ship one antd version, and the only nested `<ConfigProvider>`
(in `SupportedFrameworks > Tabs`) targets a disjoint set of component
classes from the outer default theme — verified zero overlap. The
wrappers therefore add no value; turning them off shaves ~20 % raw / ~1 KB
gz per page off the inlined CSS and removes the `class="… css-XXX"`
noise from rendered DOM. Selector specificity is unchanged because
`:where()` contributes zero specificity.

### Why we override antd's link reset in global SCSS

`extractStyle` includes antd's bare-element link reset — wired in
`node_modules/antd/lib/theme/util/genStyleUtils.js` as
`getResetStyles: token => [{ '&': genLinkStyle(token) }]` — so every
page that mounts any antd component ships a top-level
`a { color: var(--ant-color-link); … }` (plus `:hover` / `:active` /
`:focus` / `[disabled]` variants). Without intervention this would
turn every `<a>` inside any antd subtree (Layout, FAQ Collapse,
SupportedFrameworks Tabs, HowItWorks Steps, etc.) antd-blue and add
underlines on hover.

We neutralize it from project SCSS rather than post-processing the
extracted CSS. The existing `a {…}` rule in
`src/styles/global.scss` is extended to cover the same property
family antd touches (`text-decoration` on `:hover` / `:active` /
`:focus`, `outline` on `:focus`, `color` / `cursor` on `[disabled]`).
Antd's link reset and our project rule have equal specificity (both
target a bare `a`), so source order is the tie-breaker — and that
only works because `onPreRenderHTML` (see below) injects the inlined
antd `<style data-antd-cssinjs>` _before_ the app stylesheet `<link>`.
This replaced an earlier `stripCssinjsGlobalResets` regex pass that
walked the extracted CSS and dropped any rule whose selectors were
all bare-element / universal / element-with-pseudo / element-with-attr —
the regex was fragile (it also misclassified keyframe step rules like
`100%`, `from`, `to` as resets and stripped them, breaking antd's
fade / zoom motion).

We rely on no other top-level bare-element rule from antd cssinjs
today. `useResetIconStyle` emits `.anticon { … }` (class-based) and
`genCommonStyle` uses `[class^="ant-"]` (attribute-based), neither of
which collide with project styling. Antd's bundled `reset.css` is
never imported by Gatsby, so the broader `html` / `body` / `*` resets
are not in our bundle.

### `onPreRenderHTML` head adjustments

Two passes:

1. Swap Gatsby's inlined global `<style data-identity="gatsby-global-css">`
   for a `<link rel="stylesheet">` to the same `/styles.<hash>.css` file
   Gatsby already emits to `/public/` (carried over from commit
   `c3b6070d`). Reduces HTML size and lets the browser cache the file.
2. Reorder the antd `<style data-antd-cssinjs>` (which Gatsby appends to
   the end of `<head>` because we add it via `setHeadComponents`) to come
   **before** the app SCSS link from step 1. This guarantees that when
   antd component selectors and SCSS overrides have _equal_ specificity
   (e.g. `.ant-steps .ant-steps-item-wait … .ant-steps-icon-dot` (5
   classes) vs `.how-it-works … .ant-steps-icon-dot` (5 classes)), the
   SCSS overrides win by source order rather than antd's defaults.

### Development (`gatsby develop`)

Dev does not run SSR. `gatsby-browser.ts` exports `wrapRootElement` that
wraps the app in `<StyleProvider><ConfigProvider theme={{ hashed: false }}>`
so the runtime cssinjs path used in dev matches what the SSR pipeline
emits (default `hashPriority`, no `:where()` wrappers). Antd injects
`<style>` tags at runtime as components mount — same dev experience as
before, minus the static dump.

### Where StyleProvider lives

Only at the **root**:

- `gatsby-ssr.tsx` → in `replaceRenderer` (with the per-page cache).
- `gatsby-browser.ts` → in `wrapRootElement` (default cache for runtime).

The previous nested `<StyleProvider>` inside `Layout.tsx` was removed —
nesting providers creates an inner cache that bypasses the outer one we
extract from, so the inlined CSS would have been incomplete.

## Files involved

| File                                                          | Role                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gatsby-ssr.tsx`                                              | `replaceRenderer` (per-page extraction + `ConfigProvider hashed:false`), `onPreRenderHTML` (Gatsby global `<style>` → `<link>` + antd-before-SCSS reorder so equal-specificity SCSS rules in `global.scss` win), `onRenderBody` (third-party scripts only — no antd link anymore) |
| `gatsby-browser.ts`                                           | `wrapRootElement` providing client-side `StyleProvider` + `ConfigProvider hashed:false`                                                                                                                                                                                           |
| `src/components/Layout/Layout.tsx`                            | No longer wraps with `StyleProvider`                                                                                                                                                                                                                                              |
| `src/styles/global.scss`                                      | Global `a {…}` rule that neutralizes antd cssinjs's bare-element link reset by overriding the same property family on `:hover` / `:active` / `:focus` / `[disabled]` — wins by source order against the inlined antd `<style>`                                                    |
| `src/components/SupportedFrameworks/SupportedFrameworks.scss` | Dropped legacy `:where(.css-dev-only-do-not-override-…)` prefixes around `.ant-tabs` selectors — obsolete now that `theme.hashed: false` is on                                                                                                                                    |
| `package.json`                                                | No `prestart` / `prebuild`, no `@ant-design/static-style-extract`                                                                                                                                                                                                                 |

## What we removed

- `bin/gen-antd-css.js` — generator script (deleted).
- `static/antd.min.css` — pre-built ~1 MB full-theme dump (deleted, removed
  from `.gitignore`).
- `prestart` / `prebuild` npm scripts — no longer needed.
- `@ant-design/static-style-extract` dev dependency — no longer needed.
- The antd link in `gatsby-ssr.tsx#onRenderBody`
  (`<link href="/antd.min.css">`).
- The pre-built-`<link>`-targeting variant of the "antd-before-app-CSS"
  reorder branch in `onPreRenderHTML`. The reorder logic itself is
  **not** gone: it now targets the inlined `<style data-antd-cssinjs>`
  rather than the deleted antd `<link>`, because ordering is still
  load-bearing for any rule pair where antd and the app SCSS land at
  equal specificity (notably the bare-element `a {…}` link reset
  neutralized in `global.scss`, and Steps wait-state dot overrides
  where both sides are 5 classes deep). See "onPreRenderHTML head
  adjustments" above.

Reference commit: `perf: extract antd v5 styles per page via cssinjs SSR`.

## Measured impact

Both versions built with the same content via `gatsby build`. 127 pages.
8 representative pages sampled.

### Per-page bytes

| Asset                                       | OLD raw | OLD gz | NEW raw |                    NEW gz |
| ------------------------------------------- | ------: | -----: | ------: | ------------------------: |
| `antd.min.css` (separate request)           |  839 KB |  75 KB |       — |                         — |
| `styles.<hash>.css` (Gatsby app)            |  195 KB |  30 KB |  195 KB |                     30 KB |
| Avg HTML across 8 pages                     |  140 KB |  32 KB |  298 KB |                     48 KB |
| Inline `<style data-antd-cssinjs>` per page |       — |      — | ~155 KB | ~16 KB (delta in HTML gz) |

Sampled HTML pages (raw / gzip):

| Page                             | OLD raw / gz   | NEW raw / gz   |   Δ raw |   Δ gz |
| -------------------------------- | -------------- | -------------- | ------: | -----: |
| `/`                              | 141 KB / 34 KB | 318 KB / 52 KB | +177 KB | +18 KB |
| `/blog/`                         | 131 KB / 31 KB | 282 KB / 46 KB | +151 KB | +15 KB |
| `/pricing/saas/`                 | 186 KB / 36 KB | 338 KB / 50 KB | +152 KB | +14 KB |
| `/community/`                    | 130 KB / 30 KB | 281 KB / 46 KB | +151 KB | +16 KB |
| `/features/`                     | 132 KB / 31 KB | 305 KB / 49 KB | +173 KB | +18 KB |
| `/installation/`                 | 137 KB / 32 KB | 323 KB / 51 KB | +186 KB | +19 KB |
| `/case-studies/`                 | 113 KB / 27 KB | 253 KB / 41 KB | +140 KB | +14 KB |
| `/test-automation-as-a-service/` | 147 KB / 37 KB | 286 KB / 50 KB | +139 KB | +13 KB |

### What this means at the network

**Cold first visit (typical SEO landing — the dominant case):**

| Approach |                                           Critical-path bytes (gz) | Render-blocking CSS requests |
| -------- | -----------------------------------------------------------------: | ---------------------------: |
| OLD      | ~32 KB HTML + 75 KB `antd.min.css` + 30 KB app styles ≈ **137 KB** |                            2 |
| NEW      |                         ~48 KB HTML + 30 KB app styles ≈ **78 KB** |                            1 |

**~43 % smaller first-paint payload (-59 KB gz) and one fewer render-blocking
CSS request.**

**SPA navigation inside the site:** Gatsby fetches `page-data.json`, not
HTML, so the inlined `<style>` is irrelevant. Antd cssinjs injects
incremental rules at runtime as new components mount — no regression.

**Warm-cache deep visit to a different page (e.g. opening a new tab):**
+16 KB gz HTML per page vs OLD's cached antd request. In wall-clock terms
this is a wash — one HTTP request vs ~16 KB more in an existing one.

### Build artifacts on disk

|                              |    OLD |    NEW |       Δ |
| ---------------------------- | -----: | -----: | ------: |
| `public/` total              |  57 MB |  73 MB |  +16 MB |
| Total CSS files in `public/` | 1.0 MB | 196 KB | -835 KB |

The +16 MB on disk is just 127 pages × ~150 KB of inlined CSS. It costs
storage on the build host but is offset on the wire by removing the 819 KB
`antd.min.css` and never downloading it as a separate file.

## Adding/removing antd components

Nothing to do. The set of styles inlined into a given page is determined by
what gets rendered on that page during SSR — adding a new antd component to
a page automatically grows that page's inlined CSS by exactly its rules,
and removing one shrinks it.

## Theming and tokens

Theme overrides via `<ConfigProvider theme={...}>` work as normal. The
extracted CSS reflects the active theme tokens at render time, so themed
components ship themed styles. This was awkward with the previous
build-time extract (the dump was theme-locked at build).

## Things to know if you change SSR

- `replaceRenderer` is a low-level Gatsby SSR API. If a future Gatsby plugin
  also defines `replaceRenderer`, the last one wins — only one such hook
  can be active. Today we are the only consumer; verify before adding
  plugins like `gatsby-plugin-emotion` or others that ship their own
  `replaceRenderer`.
- The SSR `bodyComponent` is rendered with our `StyleProvider` wrapper. If
  you ever add another `StyleProvider` somewhere inside the React tree,
  make sure it does **not** create a new cache (i.e. don't pass a `cache`
  prop), otherwise its rules won't be captured by `extractStyle`.
- `onPreRenderHTML` runs after `replaceRenderer`; it must not rewrite or
  drop the `<style data-antd-cssinjs>` tag.

## Potential future tweaks

- If HTML size on warm-cache navigation ever becomes a measurable problem,
  we can move the inlined `<style data-antd-cssinjs>` to an external
  per-page `.css` file emitted alongside each HTML — same per-page
  granularity, cacheable across visits to the same page, but adds a
  request on first paint. We did **not** do this because the cold-paint
  win is the bigger lever for an SEO-driven marketing site.
- If we ever migrate off antd v5, the entire `replaceRenderer` block can
  be removed without affecting anything else.
