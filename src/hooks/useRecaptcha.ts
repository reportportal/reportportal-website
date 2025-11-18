import { useState, useCallback } from 'react';

import {
  RECAPTCHA_SITE_KEY,
  RECAPTCHA_SCRIPT_ID,
  RECAPTCHA_SRC,
  RECAPTCHA_ENABLED,
  RECAPTCHA_ACTION,
} from '../utils/constants';

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        ready(callback: () => void): void;
        execute(siteKey: string, options: { action: string }): Promise<string>;
      };
    };
  }
}

const removeRecaptchaScript = (): void => {
  console.log('[useRecaptcha] Removing reCAPTCHA script and badges');
  const script = document.getElementById(RECAPTCHA_SCRIPT_ID);
  if (script) {
    script.remove();
    console.log('[useRecaptcha] reCAPTCHA script removed');
  }

  const recaptchaBadges = document.querySelectorAll('.grecaptcha-badge');
  const badgeCount = recaptchaBadges.length;
  recaptchaBadges.forEach(badge => badge.remove());
  if (badgeCount > 0) {
    console.log(`[useRecaptcha] Removed ${badgeCount} reCAPTCHA badge(s)`);
  }

  if (window.grecaptcha) {
    delete window.grecaptcha;
    console.log('[useRecaptcha] window.grecaptcha cleared');
  }
};

const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('[useRecaptcha] Loading reCAPTCHA script:', RECAPTCHA_SRC);
    const script = document.createElement('script');
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = RECAPTCHA_SRC;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('[useRecaptcha] reCAPTCHA script loaded, waiting for initialization');
      const checkReady = (attempts = 0) => {
        if (window.grecaptcha?.enterprise) {
          console.log('[useRecaptcha] reCAPTCHA initialized successfully');
          resolve();
        } else if (attempts < 20) {
          setTimeout(() => checkReady(attempts + 1), 100);
        } else {
          console.error('[useRecaptcha] reCAPTCHA failed to initialize after 20 attempts');
          reject(new Error('reCAPTCHA failed to initialize'));
        }
      };
      checkReady();
    };

    script.onerror = () => {
      console.error('[useRecaptcha] Failed to load reCAPTCHA script');
      reject(new Error('Failed to load reCAPTCHA script'));
    };

    document.head.appendChild(script);
  });
};

interface UseRecaptchaReturn {
  executeRecaptcha: () => Promise<string | null>;
  recaptchaError: string | null;
  clearError: () => void;
  isRecaptchaEnabled: boolean;
}

export const useRecaptcha = (): UseRecaptchaReturn => {
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  const executeRecaptcha = useCallback(async (): Promise<string | null> => {
    if (!RECAPTCHA_ENABLED) {
      console.log('[useRecaptcha] reCAPTCHA is disabled, skipping execution');
      return null;
    }

    console.log('[useRecaptcha] Starting reCAPTCHA execution');
    setRecaptchaError(null);

    try {
      removeRecaptchaScript();
      await loadRecaptchaScript();

      return await new Promise((resolve, reject) => {
        if (!window.grecaptcha?.enterprise) {
          console.error('[useRecaptcha] reCAPTCHA not loaded, cannot execute');
          reject(new Error('reCAPTCHA not loaded'));
          return;
        }

        console.log('[useRecaptcha] Executing reCAPTCHA with action:', RECAPTCHA_ACTION);
        window.grecaptcha.enterprise.ready(() => {
          window.grecaptcha?.enterprise
            ?.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION })
            .then(token => {
              console.log('[useRecaptcha] reCAPTCHA executed successfully, token received');
              resolve(token);
            })
            .catch(error => {
              console.error('[useRecaptcha] reCAPTCHA execution failed:', error);
              reject(error);
            });
        });
      });
    } catch (error) {
      console.error('[useRecaptcha] Error during reCAPTCHA execution:', error);
      setRecaptchaError('Security verification failed. Please try again.');
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    console.log('[useRecaptcha] Clearing reCAPTCHA error');
    setRecaptchaError(null);
  }, []);

  return {
    executeRecaptcha,
    recaptchaError,
    clearError,
    isRecaptchaEnabled: RECAPTCHA_ENABLED,
  };
};
