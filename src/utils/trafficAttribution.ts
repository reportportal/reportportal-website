import { TRAFFIC_ATTRIBUTION_STORAGE_KEY } from './constants';

// 'C0004' is OneTrust's Targeting/Advertising category — verify against the
// domain script config (77055ecd-ec2c-461a-bf1c-3e84d715e668, gatsby-ssr.tsx)
// if consent gating ever looks wrong.
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

// document.referrer doesn't update on Gatsby client-side route changes, so it
// goes stale after the first internal navigation (see markInternalNavigation).
let isReferrerFresh = true;

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

const getExternalReferrerUrl = (): URL | null => {
  if (typeof document === 'undefined' || !document.referrer || !isReferrerFresh) return null;
  try {
    const url = new URL(document.referrer);
    return isInternalHostname(url.hostname) ? null : url;
  } catch {
    return null;
  }
};

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
    // best-effort — private mode / quota / disabled storage must not break the page
  }
};

const clearStoredAttribution = (): void => {
  try {
    window.localStorage.removeItem(TRAFFIC_ATTRIBUTION_STORAGE_KEY);
  } catch {
    // see writeStoredAttribution
  }
};

export const captureTrafficAttribution = (): void => {
  if (typeof window === 'undefined') return;

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

    // Same campaign as already stored — skip, so a referrer-less repeat visit
    // can't clobber the first-touch Page Referrer.
    if (readStoredAttribution()?.trafficSource === trafficSource) return;

    writeStoredAttribution({ trafficSource, pageReferrer });
    return;
  }

  // Internal nav, direct visit, or empty referrer — leave existing attribution as-is.
  if (!externalReferrer) return;

  const searchEngine = getSearchEngineName(externalReferrer.hostname);
  const trafficSource = searchEngine
    ? `${searchEngine} | organic | (not set)`
    : `${stripWww(externalReferrer.hostname)} | referral | (not set)`;

  writeStoredAttribution({ trafficSource, pageReferrer });
};

export const getTrafficAttribution = (): TrafficAttribution =>
  hasAttributionConsent() ? readStoredAttribution() ?? DIRECT_ATTRIBUTION : DIRECT_ATTRIBUTION;
