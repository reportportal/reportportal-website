export const MAX_LENGTH = 255;
export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;

if (!RECAPTCHA_SITE_KEY) {
  throw new Error('RECAPTCHA_SITE_KEY environment variable is not set');
}
