import axios, { AxiosPromise } from 'axios';
import { CONTACT_US_URL, FORM_TYPE_NEWSLETTER } from '@app/utils';

export const subscribeUser = (email: string): AxiosPromise => {
  const headers = {
    'Content-Type': 'text/plain',
  };

  return axios.post(
    CONTACT_US_URL,
    {
      form_type: FORM_TYPE_NEWSLETTER,
      email: email.trim(),
      wouldLikeToReceiveAds: true,
      termsAgree: true,
    },
    { headers },
  );
};
