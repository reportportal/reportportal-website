import React, { useState, useRef } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useBoolean } from 'ahooks';
import isEmpty from 'lodash/isEmpty';
import { Link } from '@app/components/Link';
import { subscribeUser } from '@app/components/SubscriptionForm/utils';
import { createBemBlockBuilder, CONTACT_US_URL, RECAPTCHA_ACTION } from '@app/utils';
import { useRecaptcha } from '@app/hooks/useRecaptcha';
import axios from 'axios';

import { validate, getBaseSalesForceValues } from './utils';
import { FormFieldWrapper } from './FormFieldWrapper';
import { FeedbackForm } from './FeedbackForm';
import { FormInput } from './FormInput';
import { CustomCheckbox } from './CustomCheckbox';
import { MAX_LENGTH } from './constants';
import ArrowIcon from '../../../svg/arrow.inline.svg';

import '../ContactUsPage.scss';

const getBlocksWith = createBemBlockBuilder(['contact-us-form']);

export const ContactUsForm = ({ title, options, isDiscussFieldShown }) => {
  const [isFeedbackFormVisible, { setTrue: showFeedbackForm }] = useBoolean(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);
  const contactRecaptchaTokenRef = useRef<string | null>(null);
  const {
    executeRecaptcha: executeContactRecaptcha,
    recaptchaError: contactRecaptchaError,
    clearError: clearContactError,
    isRecaptchaEnabled: isContactRecaptchaEnabled,
  } = useRecaptcha({
    action: RECAPTCHA_ACTION,
    timeout: 10000,
    retryCount: 2,
    retryDelay: 1000,
  });
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      company: '',
      termsAgree: false,
      wouldLikeToReceiveAds: false,
      ...(isDiscussFieldShown && { discuss: '' }),
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate,
    onSubmit: async values => {
      if (isLoading) {
        return;
      }

      const errors = await validateForm();

      if (!isEmpty(errors)) {
        return;
      }

      try {
        setIsLoading(true);
        clearContactError();
        setCustomError(null);

        if (!contactRecaptchaTokenRef.current) {
          contactRecaptchaTokenRef.current = await executeContactRecaptcha();
        }

        const contactRecaptchaToken = contactRecaptchaTokenRef.current;

        if ((isContactRecaptchaEnabled && !contactRecaptchaToken) || contactRecaptchaError) {
          return;
        }

        const baseSalesForceValues = getBaseSalesForceValues(options);
        const postData = {
          ...values,
          ...baseSalesForceValues,
        };

        if (values.wouldLikeToReceiveAds && isContactRecaptchaEnabled && contactRecaptchaToken) {
          subscribeUser(values.email, contactRecaptchaToken).catch(console.error);
        }

        const headers = {
          'Content-Type': 'application/json',
          'RP-Recaptcha-Action': RECAPTCHA_ACTION,
          ...(contactRecaptchaToken && { 'RP-Recaptcha-Token': contactRecaptchaToken }),
        };

        const response = await axios.post(CONTACT_US_URL, postData, { headers });

        let responseData = response.data;
        if (typeof responseData === 'string') {
          responseData = JSON.parse(responseData);
        }

        if (responseData.success) {
          showFeedbackForm();
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setCustomError('Request failed. Please try again.');
        setIsLoading(false);
      }
    },
  });
  const { getFieldProps, validateForm } = formik;

  if (isFeedbackFormVisible) {
    return <FeedbackForm title={title} />;
  }

  return (
    <FormikProvider value={formik}>
      <div className={getBlocksWith('-container')}>
        <form noValidate className={getBlocksWith()} onSubmit={formik.handleSubmit}>
          <FormInput name="first_name" label="First name" placeholder="John" maxLength={40} />
          <FormInput name="last_name" label="Last name" placeholder="Smith" maxLength={80} />
          <FormInput
            name="email"
            label="Email"
            placeholder="name@company.com"
            type="email"
            maxLength={80}
          />
          <FormInput name="company" label="Company name" placeholder="ABC" maxLength={MAX_LENGTH} />
          {isDiscussFieldShown && (
            <FormInput
              name="discuss"
              label="What would you like to discuss?"
              placeholder="Please, share more details"
              InputElement="textarea"
              maxLength={MAX_LENGTH}
            />
          )}
          <FormFieldWrapper name="wouldLikeToReceiveAds">
            <CustomCheckbox label="Subscribe to ReportPortal newsletter" />
          </FormFieldWrapper>
          <FormFieldWrapper name="termsAgree">
            <CustomCheckbox
              label={
                <>
                  I consent to EPAM Systems, Inc. (&quot;EPAM&quot;) processing my personal
                  information as set out in the{' '}
                  <Link to="https://privacy.epam.com/core/interaction/showpolicy?type=PrivacyPolicy">
                    Privacy Policy <ArrowIcon />
                  </Link>
                </>
              }
            />
          </FormFieldWrapper>
          {(contactRecaptchaError || customError) && (
            <div className={getBlocksWith('__recaptcha-error')}>
              {contactRecaptchaError || customError}
            </div>
          )}
          <button
            className="btn btn--primary btn--large"
            type="submit"
            data-gtm="send_request"
            disabled={!getFieldProps('termsAgree').value || isLoading}
          >
            {isLoading ? 'Sending...' : 'Send request'}
          </button>
        </form>
      </div>
    </FormikProvider>
  );
};
