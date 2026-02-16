import { useState, useCallback } from 'react';

import {
  RECAPTCHA_SITE_KEY,
  RECAPTCHA_SCRIPT_ID,
  RECAPTCHA_SRC,
  RECAPTCHA_ACTION,
} from '../utils/constants';

declare global {
  interface Window {
    grecaptcha?: {
      enterprise: {
        ready(callback: () => void): void;
        execute(siteKey: string, options: { action: string }): Promise<string>;
      };
    };
  }
}

const removeRecaptchaScript = (): void => {
  const script = document.getElementById(RECAPTCHA_SCRIPT_ID);
  if (script) {
    script.remove();
  }

  const recaptchaBadges = document.querySelectorAll('.grecaptcha-badge');
  recaptchaBadges.forEach(badge => badge.remove());

  if (window.grecaptcha) {
    delete window.grecaptcha;
  }
};

const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = RECAPTCHA_SRC;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const checkReady = (attempts = 0) => {
        if (window.grecaptcha?.enterprise) {
          resolve();
        } else if (attempts < 20) {
          setTimeout(() => checkReady(attempts + 1), 250);
        } else {
          reject(new Error('reCAPTCHA failed to initialize'));
        }
      };
      checkReady();
    };

    script.onerror = () => {
      reject(new Error('Failed to load reCAPTCHA script'));
    };

    document.head.appendChild(script);
  });
};

interface UseRecaptchaReturn {
  executeRecaptcha: () => Promise<string | null>;
  recaptchaError: string | null;
  clearError: () => void;
}

export const useRecaptcha = (): UseRecaptchaReturn => {
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  const executeRecaptcha = useCallback(async (): Promise<string | null> => {
    setRecaptchaError(null);
    console.log('[useRecaptcha] executeRecaptcha called');

    try {
      removeRecaptchaScript();
      await loadRecaptchaScript();
      console.log('[useRecaptcha] Script loaded, executing...');

      const startTime = Date.now();
      return await new Promise((resolve, reject) => {
        if (!window.grecaptcha?.enterprise) {
          console.error('[useRecaptcha] grecaptcha.enterprise not found');
          reject(new Error('reCAPTCHA not loaded'));
          return;
        }

        window.grecaptcha.enterprise.ready(() => {
          console.log('[useRecaptcha] grecaptcha ready, calling execute...');
          window.grecaptcha?.enterprise
            .execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION })
            .then(token => {
              const duration = Date.now() - startTime;
              console.log(`[useRecaptcha] Execution completed in ${duration}ms.`);
              console.log(
                '[useRecaptcha] Challenge flow completed (if any). Token received:',
                token,
              );
              resolve(token);
            })
            .catch(err => {
              console.error('[useRecaptcha] Execute failed:', err);
              reject(err);
            });
        });
      });
    } catch (error) {
      setRecaptchaError('Security verification failed. Please try again.');
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    setRecaptchaError(null);
  }, []);

  return {
    executeRecaptcha,
    recaptchaError,
    clearError,
  };
};
