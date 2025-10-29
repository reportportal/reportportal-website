const siteKey = process.env.RECAPTCHA_SITE_KEY;

if (!siteKey) {
  throw new Error('RECAPTCHA_SITE_KEY environment variable is not set');
}

export const MAX_LENGTH = 255;
export const RECAPTCHA_SITE_KEY = String(siteKey);
