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
