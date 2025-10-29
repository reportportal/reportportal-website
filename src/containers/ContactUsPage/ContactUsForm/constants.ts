export const MAX_LENGTH = 255;
export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY || '';

if (typeof window !== 'undefined' && !RECAPTCHA_SITE_KEY) {
  console.error('RECAPTCHA_SITE_KEY environment variable is not set');
}
