import axios, { AxiosPromise } from 'axios';

import { SUBSCRIPTION_URL } from './constants';

export const subscribeUser = (email: string, recaptchaToken: string | null): AxiosPromise => {
  const headers = {
    'Content-Type': 'application/json',
    'RP-Recaptcha-Action': 'subscribe',
    ...(recaptchaToken && { 'RP-Recaptcha-Token': recaptchaToken }),
  };

  return axios.post(SUBSCRIPTION_URL, { email_address: email }, { headers });
};
