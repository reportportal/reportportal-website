import { useEffect, useState, useCallback } from 'react';

import {
  RECAPTCHA_SITE_KEY,
  RECAPTCHA_SCRIPT_ID,
  RECAPTCHA_SRC,
  RECAPTCHA_ENABLED,
  RECAPTCHA_ACTION,
} from '../utils/constants';

const recaptchaPromiseMap = new Map();

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

const loadRecaptchaScript = () => {
  const existingPromise = recaptchaPromiseMap.get(RECAPTCHA_SITE_KEY);

  if (existingPromise) {
    return existingPromise;
  }

  const loadingPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha?.enterprise) {
      window.grecaptcha.enterprise.ready(() => {
        if (window.grecaptcha?.enterprise) {
          resolve('');
        } else {
          reject(new Error('reCAPTCHA enterprise became unavailable after ready.'));
        }
      });
      return;
    }

    let script = document.getElementById(RECAPTCHA_SCRIPT_ID) as HTMLScriptElement | null;

    const handleLoad = () => {
      const checkReady = (attempts = 0) => {
        if (window.grecaptcha?.enterprise) {
          window.grecaptcha.enterprise.ready(() => {
            if (window.grecaptcha?.enterprise) {
              resolve('');
            } else {
              reject(new Error('reCAPTCHA enterprise not available after initialization.'));
            }
          });
        } else if (attempts < 10) {
          setTimeout(() => checkReady(attempts + 1), 100);
        } else {
          recaptchaPromiseMap.delete(RECAPTCHA_SITE_KEY);
          reject(new Error('reCAPTCHA failed to initialize after loading.'));
        }
      };
      checkReady();
    };

    const handleError = () => {
      recaptchaPromiseMap.delete(RECAPTCHA_SITE_KEY);
      if (script) {
        script.remove();
        script = null;
      }
      reject(new Error('Failed to load reCAPTCHA script.'));
    };

    if (!script) {
      script = document.createElement('script');
      script.id = RECAPTCHA_SCRIPT_ID;
      script.src = RECAPTCHA_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        script?.setAttribute('data-loaded', 'true');
        handleLoad();
      };
      script.onerror = handleError;
      document.head.appendChild(script);
    } else if (script.getAttribute('data-loaded') === 'true') {
      handleLoad();
    } else {
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
    }
  });

  recaptchaPromiseMap.set(RECAPTCHA_SITE_KEY, loadingPromise);

  return loadingPromise.catch(error => {
    recaptchaPromiseMap.delete(RECAPTCHA_SITE_KEY);
    throw error;
  });
};

interface UseRecaptchaOptions {
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
}

interface UseRecaptchaReturn {
  executeRecaptcha: () => Promise<string | null>;
  recaptchaError: string | null;
  clearError: () => void;
  isRecaptchaEnabled: boolean;
}

export const useRecaptcha = ({
  timeout = 10000,
  retryCount = 2,
  retryDelay = 1000,
}: UseRecaptchaOptions = {}): UseRecaptchaReturn => {
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  useEffect(() => {
    if (RECAPTCHA_ENABLED) {
      loadRecaptchaScript().catch(() => {
        setRecaptchaError('Security verification failed to load. Please refresh the page.');
      });
    }
  }, []);

  const executeRecaptchaBase = useCallback(async (): Promise<string> => {
    await loadRecaptchaScript();

    if (!window.grecaptcha?.enterprise) {
      throw new Error('reCAPTCHA enterprise is not available.');
    }

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('reCAPTCHA verification timeout')), timeout);
    });

    try {
      const executePromise = window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
        action: RECAPTCHA_ACTION,
      });
      return await Promise.race([executePromise, timeoutPromise]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('No reCAPTCHA clients exist')) {
        throw new Error('reCAPTCHA client not properly initialized. Please refresh the page.');
      }
      throw error;
    }
  }, [timeout]);

  const executeRecaptcha = useCallback(async (): Promise<string | null> => {
    if (!RECAPTCHA_ENABLED) {
      return null;
    }

    setRecaptchaError(null);
    let token: string | null = null;
    let retries = retryCount;

    /* eslint-disable no-await-in-loop */
    while (retries >= 0 && !token) {
      try {
        token = await executeRecaptchaBase();
      } catch (error) {
        if (retries === 0) {
          setRecaptchaError('Security verification failed. Please try again.');
          break;
        }
        retries -= 1;
        if (retryDelay > 0) {
          await new Promise(resolve => {
            setTimeout(resolve, retryDelay);
          });
        }
      }
    }
    /* eslint-enable no-await-in-loop */

    return token;
  }, [executeRecaptchaBase, retryCount, retryDelay]);

  const clearError = useCallback(() => {
    setRecaptchaError(null);
  }, []);

  return {
    executeRecaptcha,
    recaptchaError,
    clearError,
    isRecaptchaEnabled: RECAPTCHA_ENABLED,
  };
};
