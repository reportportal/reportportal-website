import { TRAFFIC_ATTRIBUTION_STORAGE_KEY } from './constants';

// OneTrust (CookiePro) consent category gating first-party attribution storage.
// 'C0004' is OneTrust's default "Targeting/Advertising Cookies" category id —
// verify it matches the actual category configured for domain script
// 77055ecd-ec2c-461a-bf1c-3e84d715e668 (gatsby-ssr.tsx) in the OneTrust admin
// console, or by inspecting `window.OnetrustActiveGroups` in the browser after
// accepting/rejecting each category on the live cookie banner.
const CONSENT_CATEGORY_ID = 'C0004';

const SEARCH_ENGINE_HOSTNAMES: Record<string, string> = {
  'google.com': 'google',
  'bing.com': 'bing',
  'search.yahoo.com': 'yahoo',
  'yahoo.com': 'yahoo',
  'duckduckgo.com': 'duckduckgo',
  'yandex.com': 'yandex',
  'yandex.ru': 'yandex',
};

const INTERNAL_HOSTNAME = 'reportportal.io';

export interface TrafficAttribution {
  trafficSource: string;
  pageReferrer: string;
}

const DIRECT_ATTRIBUTION: TrafficAttribution = {
  trafficSource: 'direct | (none) | (not set)',
  pageReferrer: 'No',
};

// `document.referrer` only reflects the real HTTP navigation that loaded the
// current document — Gatsby's client-side route changes never update it. So
// once any internal client-side navigation has happened, the browser-level
// referrer is stale and must no longer be treated as a new external signal.
let isReferrerFresh = true;

/** Call from onRouteUpdate whenever prevLocation is set (i.e. not the initial load). */
export const markInternalNavigation = (): void => {
  isReferrerFresh = false;
};

const stripWww = (hostname: string) => hostname.replace(/^www\./i, '').toLowerCase();

const isInternalHostname = (hostname: string): boolean => {
  const host = stripWww(hostname);
  return host === INTERNAL_HOSTNAME || host.endsWith(`.${INTERNAL_HOSTNAME}`);
};

const getSearchEngineName = (hostname: string): string | null => {
  const host = stripWww(hostname);
  const match = Object.keys(SEARCH_ENGINE_HOSTNAMES).find(
    domain => host === domain || host.endsWith(`.${domain}`),
  );
  return match ? SEARCH_ENGINE_HOSTNAMES[match] : null;
};

/** `document.referrer` as a parsed external URL, or `null` for internal/empty/invalid/stale referrers. */
const getExternalReferrerUrl = (): URL | null => {
  if (typeof document === 'undefined' || !document.referrer || !isReferrerFresh) return null;
  try {
    const url = new URL(document.referrer);
    return isInternalHostname(url.hostname) ? null : url;
  } catch {
    return null;
  }
};

/** protocol + hostname (no www.) + pathname — no query params or fragments. */
const sanitizePageReferrer = (url: URL): string =>
  `${url.protocol}//${stripWww(url.hostname)}${url.pathname}`;

const hasAttributionConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  const activeGroups = window.OnetrustActiveGroups;
  return typeof activeGroups === 'string' && activeGroups.includes(CONSENT_CATEGORY_ID);
};

const readStoredAttribution = (): TrafficAttribution | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(TRAFFIC_ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.trafficSource === 'string' && typeof parsed?.pageReferrer === 'string') {
      return parsed as TrafficAttribution;
    }
    return null;
  } catch {
    return null;
  }
};

const writeStoredAttribution = (attribution: TrafficAttribution): void => {
  try {
    window.localStorage.setItem(TRAFFIC_ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // localStorage may be unavailable (private mode, quota, disabled) —
    // attribution is best-effort and must never break page load or form submission.
  }
};

const clearStoredAttribution = (): void => {
  try {
    window.localStorage.removeItem(TRAFFIC_ATTRIBUTION_STORAGE_KEY);
  } catch {
    // see writeStoredAttribution
  }
};

/**
 * Runs on every page load / client-side navigation (see gatsby-browser.ts).
 * Only a genuine new signal (a UTM-tagged link, or an external referrer) may
 * write a new attribution. Internal navigation, direct visits, and empty
 * referrers leave any already-stored attribution untouched.
 */
export const captureTrafficAttribution = (): void => {
  if (typeof window === 'undefined') return;

  // Consent withdrawn (or never granted): drop anything already captured so
  // a later form submission can never send attribution gathered without —
  // or after losing — consent.
  if (!hasAttributionConsent()) {
    clearStoredAttribution();
    return;
  }

  const currentUrl = new URL(window.location.href);
  const utmSource = currentUrl.searchParams.get('utm_source');
  const externalReferrer = getExternalReferrerUrl();
  const pageReferrer = externalReferrer ? sanitizePageReferrer(externalReferrer) : 'No';

  if (utmSource) {
    const utmMedium = currentUrl.searchParams.get('utm_medium') || '(not set)';
    const utmCampaign = currentUrl.searchParams.get('utm_campaign') || '(not set)';
    const trafficSource = `${utmSource} | ${utmMedium} | ${utmCampaign}`;

    // A repeat visit from the identical campaign must not clobber the
    // first-touch Page Referrer (e.g. a later click that arrives with no
    // referrer at all, such as from an email client).
    if (readStoredAttribution()?.trafficSource === trafficSource) return;

    writeStoredAttribution({ trafficSource, pageReferrer });
    return;
  }

  // No UTM and no external referrer: internal navigation, direct visit, or
  // empty referrer — never overwrites existing non-direct attribution.
  if (!externalReferrer) return;

  const searchEngine = getSearchEngineName(externalReferrer.hostname);
  const trafficSource = searchEngine
    ? `${searchEngine} | organic | (not set)`
    : `${stripWww(externalReferrer.hostname)} | referral | (not set)`;

  writeStoredAttribution({ trafficSource, pageReferrer });
};

/**
 * Stored attribution for use in form payloads, falling back to "direct" when
 * nothing was ever captured — or when consent is currently withdrawn, so a
 * form submitted right after revoking consent can never leak prior tracking.
 */
export const getTrafficAttribution = (): TrafficAttribution =>
  hasAttributionConsent() ? readStoredAttribution() ?? DIRECT_ATTRIBUTION : DIRECT_ATTRIBUTION;
