import axios, { AxiosPromise } from 'axios';

import { SUBSCRIPTION_URL } from './constants';

export const subscribeUser = (email: string): AxiosPromise => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return axios.post(SUBSCRIPTION_URL, { email_address: email }, { headers });
};
