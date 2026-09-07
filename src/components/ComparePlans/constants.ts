import { DOCUMENTATION_URL } from '@app/utils';
import { BadgeVariant } from '@app/components/Badge';

/**
 * Which rows carry a NEW or PREMIUM badge.
 *
 * One badge per row on purpose — several of these are both new and paid, and
 * two chips beside a feature name compete for the same glance. PREMIUM wins,
 * because it answers the question the table exists to answer: what do I get for
 * my money. "New" is a fact about the roadmap, not about the plan.
 *
 * This lives in code because Contentful cannot express it: the `plans` field is
 * validated down to strings, numbers and booleans, and a dedicated field on
 * `comparePlanItem` needs content-model rights the team does not have yet.
 *
 * The key is the row's `name` exactly as an editor sees it. That coupling is the
 * cost of keeping this out of the CMS — rename a row in Contentful and its badge
 * quietly disappears. ComparePlans logs a warning in development when a key here
 * matches no row, so a rename surfaces the first time anyone opens the page
 * locally instead of after it ships. Once the content model gains a field for
 * this, delete the file and read the value from the entry.
 */
export const ROW_BADGES: Record<string, BadgeVariant> = {
  Organizations: 'premium',
  'Test executions': 'premium',
  'Microsoft Teams notifications': 'premium',
  'Quality Gates': 'premium',
  'Single sign-on (SSO)': 'premium',
  LDAP: 'premium',
  'SCIM provisioning': 'premium',
  'Test management': 'new',
  'MCP Server': 'new',
};

/**
 * Legend under the table. A badge with no key is a puzzle — this says what
 * PREMIUM means and, just as importantly, that it does not cost extra on a paid
 * plan. Lives here next to ROW_BADGES so the badges and their explanation move
 * together.
 */
export const PREMIUM_LEGEND = {
  text: '— these features are not part of the open source version. No extra charge on paid plans.',
  linkTitle: 'See all Premium features',
  linkUrl: `${DOCUMENTATION_URL}/premium-features/`,
};

/**
 * Cell values that mean "yes — once it is switched on for you". They render as a
 * tick with the text underneath, which is the `{ value, note }` shape Columns
 * already handles; this list is how a plain string reaches it.
 *
 * Needed because the Contentful `plans` field is validated down to strings,
 * numbers and booleans and rejects the object form. Drop this once the field
 * accepts objects and let editors write `{ "value": true, "note": "..." }`.
 */
export const CELL_VALUES_WITH_TICK = ['Upon request'];
