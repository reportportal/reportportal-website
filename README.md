# ReportPortal Landing page. Dev guide

## Prerequisites

- Node.js v18 and above (\* Must Have)

## Installation

To install all project dependencies use the next command:

```bash
npm install
```

## Setup App

### Option 1:

If you already have Space_ID and Content Delivery API access token and do not have access to the Contentful profile that's enough for basic setup.

1. Create file `.env.development` (do not commit it to the VCS)
2. Fill in it with:

```bash
CONTENTFUL_SPACE_ID={SPACE_ID}
CONTENTFUL_ACCESS_TOKEN={ACCESS_TOKEN}
```

### Option 2:

Run the next command to start setup:

```bash
npm run setup
```

Use next information for prompts during setup:

1. Open Contentful and grab Space_ID from URL - https://app.contentful.com/spaces/{SPACE_ID}/home (requires [Contentful account](#ask-admin-to-give-you-credentials-to-contentful))
2. Content Management API access token (see [Get API Keys](#get-api-keys))
3. Content Delivery API access token (see [Get API Keys](#get-api-keys))

### Ask admin to give you credentials to Contentful

- https://www.contentful.com

### Get API Keys

- Get logged in to [contentful](https://www.contentful.com)
- Go to Contentful -> Settings -> API Keys -> Content Delivery/Preview Tokens
- Open one of the items and copy Content Delivery API access token and Content Preview API access token
- Go to Contentful -> Settings -> API Keys -> Content management tokens
- Generate your personal token

## Start App

1. To run the application in development mode use the following command:

```bash
npm run start
```

2. Open `http://localhost:8080/`

## Deployment

Each changes pushing (direct pushing or via merging a Pull Request) to the:

- `develop` branch will trigger the deployment to the dev environment to AWS S3 bucket.
- `master` branch will trigger the deployment to the prod environment to GitHub Pages (https://reportportal.io).

### To deploy your Git branch to dev environment (AWS S3), please follow these steps:

1. Navigate to the "Deploy to Dev (AWS S3)" action in your repository.
2. Choose "Run Workflow" from the dropdown menu.
3. Enter the name of your branch and click on the "Run workflow" button.
4. Wait for the deployment process to complete. You can check the progress in the "Actions" tab of your repository.
5. Once the deployment is finished, verify that your changes have been deployed by checking the website at the following URL: https://landing.epmrpp.reportportal.io/.

That's it! Your changes should now be live on the website. If you encounter any issues during the deployment process, please consult the documentation or reach out to the project maintainers for assistance.

## Libraries

- [Gatsby](https://www.gatsbyjs.com/). Project is built on top of Gatsby to leverage its Static Site Generation feature. Make sure that you check that app works and looks correctly both in dev mode (`npm run dev`) and in production mode `npm run build && npm run serve`. You should pay attention whether elements are not shifting/jumping on the initial load in the production mode.
- [And Design](https://ant.design/components/overview/). Project uses components from Ant Design. Use them when you can to avoid creating things from scratch, but make sure to style them according [to our design](https://www.figma.com/file/JDa2JNX88qMJbdWeFpBfNz/%F0%9F%8C%90-RP-Landing-2.0). As an example check out how `Steps` component is used and styled in the [HowItWorks](./src/containers/LandingPage/HowItWorks) component

## Fonts

The site ships three families as `woff2` files under `static/fonts/` — Poppins, Noto Sans, and Roboto Mono — each as a latin-only subset. Every family is declared in `src/styles/font/*.scss`, and Poppins / Noto Sans each come with a matched Arial-backed fallback `@font-face` (using `ascent-override`, `descent-override`, `line-gap-override`, `size-adjust`) so the fallback-to-real swap doesn't reflow text on slow networks.

Apply a family via the mixins in [`src/styles/mixins/font.scss`](./src/styles/mixins/font.scss) — e.g. `@include m.font-poppins($fw-semi-bold);` — never by writing `font-family: Poppins, ...` directly. The mixin is what injects the matched fallback into the stack.

Rules:

- Always ship `.woff2`. Never commit `.ttf` or `.otf` — modern browser support for `woff2` is 97%+, and `.ttf` is ~4× larger.
- Keep the license file (`OFL.txt` / `LICENSE.txt`) next to each font family in `static/fonts/<family>/` — required by SIL OFL and Apache‑2.0 redistribution terms.
- Use the `latin` subset unless you have a concrete need for `cyrillic`, `greek`, etc. Every extra subset doubles the download.

**Non‑Latin input (e.g. Ukrainian/Russian) and Chrome on macOS:** Poppins and Noto are Latin‑only files, and the stack includes synthetic Arial fallbacks (`Poppins Fallback`, `Noto Sans Fallback`) with metric overrides for CLS. On some Chrome + macOS combinations, Cyrillic routed through those synthetic `@font-face` rules can render as invisible in inputs while the control value still updates; disabling the fallback in DevTools forces plain Arial and “fixes” it. Safari often does not hit this path. The project scopes every webfont and synthetic fallback with the same Latin `unicode-range` as the subset so non‑Latin text skips those faces and uses real **Arial** from the stack.

### Adding a new weight to an existing family

1. Download the `.woff2` from [google-webfonts-helper](https://gwfh.mranftl.com/fonts):
   - Select the exact family already in use.
   - Check **only** the new weight (e.g. `300 light`).
   - Check **only** the `latin` charset.
   - "Copy CSS" → **Best support for modern browsers**.
   - Download files.
2. Drop the `.woff2` into the matching subfolder under `static/fonts/`.
3. Add an `@font-face` block in the corresponding file under `src/styles/font/` — copy an existing block and change only the `font-weight` and the `src` URL.
4. (Optional) If this weight renders above the fold on most pages, also add its path to `PRELOADED_FONTS` in [`gatsby-ssr.tsx`](./gatsby-ssr.tsx) so the browser starts fetching it before CSS is parsed. Preload sparingly — each entry costs a high-priority request on every page load.

### Adding a new font family

1. Download the `.woff2`s from [google-webfonts-helper](https://gwfh.mranftl.com/fonts) for every weight you actually use (no italics unless referenced). `latin` subset only.
2. Create `static/fonts/<Family_Name>/` and drop the `.woff2` files plus the family's license file there.
3. Create `src/styles/font/<family-name>.scss` with one `@font-face` block per weight, using `font-display: swap` and `format('woff2')`. Mirror the structure of `poppins.scss`.
4. Add a matched fallback `@font-face` block in the same file. Use a tool like [Fontaine](https://github.com/unjs/fontaine) or [Capsize](https://seek-oss.github.io/capsize/) to generate the `ascent-override` / `descent-override` / `line-gap-override` / `size-adjust` values against Arial — don't eyeball them, mismatched metrics cause CLS.
5. Import the new file from [`src/styles/font/index.scss`](./src/styles/font/index.scss).
6. Add a mixin in [`src/styles/mixins/font.scss`](./src/styles/mixins/font.scss) that sets `font-family: 'Family Name', 'Family Name Fallback', Arial, sans-serif;`.
7. (Optional) Preload the most‑used weight in `gatsby-ssr.tsx`.

After any font change, run `npm run build && npm run serve`, open the site with DevTools → Network → Disable cache + Fast 4G throttling, and check that text doesn't visibly reflow when the custom font swaps in.

## SCSS/CSS

- To set the font use mixins from [font](./src/styles/mixins/font.scss) folder
- To set the font size and line height use [font-scale](./src/styles/mixins/font-scale.scss) mixin
- To work with different screens use [breakpoint](./src/styles/mixins/breakpoint.scss) mixin. Check styles for mobile on 360px width. To write styles for tablet use _breakpoint_ mixin with `$tablet-sm-exact: 768px` variable. To write styles for desktop use _breakpoint_ mixin with `$desktop-sm: 1239px` variable. Don't use other [screen variables](./src/styles/variables/screen.scss) unless it is really needed.
- [Don't use modular CSS](https://github.com/reportportal/reportportal.github.io/pull/380#discussion_r1298267799)
- [Follow import ordering](https://github.com/reportportal/reportportal.github.io/pull/380#discussion_r1298270084)

  ```
    import { GatsbyImage, getImage } from 'gatsby-plugin-image';
    import { renderRichText } from 'gatsby-source-contentful/rich-text';

    import { ArticleAuthor } from '../ArticleAuthor';

    import from './ArticlePreview.scss';
  ```

- [Use @use instead of @import to import mixins and variables](https://github.com/reportportal/reportportal.github.io/pull/377#discussion_r1295708603)
  ```
    @use 'src/styles/mixins' as m;
    @use 'src/styles/variables' as v;
  ```
- [Include mixins first and add empty line after them](https://github.com/reportportal/reportportal.github.io/pull/377#discussion_r1295710195)

## JS

- For links use [Link](src/components/Link) component

## SVG

- Store icons as svg with '.inline.svg' ending and then reference as it as component. Example - 'arrow.inline.svg'
