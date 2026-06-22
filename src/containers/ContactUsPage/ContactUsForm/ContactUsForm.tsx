import React, { useEffect, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useBoolean } from 'ahooks';
import { isEmpty } from 'lodash';
import { Select } from 'antd';
import { useLocation } from '@gatsbyjs/reach-router';
import { Link } from '@app/components/Link';
import { subscribeUser } from '@app/components/SubscriptionForm/utils';
import { createBemBlockBuilder, CONTACT_US_URL } from '@app/utils';
import axios from 'axios';

import { validate, getBaseSalesForceValues } from './utils';
import { FormFieldWrapper } from './FormFieldWrapper';
import { FeedbackForm } from './FeedbackForm';
import { FormInput } from './FormInput';
import { CustomCheckbox } from './CustomCheckbox';
import { MAX_LENGTH, REASON_OPTIONS, ReasonValue } from './constants';
import ArrowIcon from '../../../svg/arrow.inline.svg';

import '../ContactUsPage.scss';

const getBlocksWith = createBemBlockBuilder(['contact-us-form']);

export const ContactUsForm = ({ title, options, isDiscussFieldShown }) => {
  const [isFeedbackFormVisible, { setTrue: showFeedbackForm }] = useBoolean(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      company: '',
      reason: '' as ReasonValue | '',
      reason_other: '',
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
        setCustomError(null);

        const baseSalesForceValues = getBaseSalesForceValues(options);
        // `reason` / `reason_other` are captured in the UI only. The Salesforce
        // field mapping (real field name + endpoint validation) is still pending,
        // so they are intentionally NOT sent yet — to be wired with the backend.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { reason, reason_other, ...formValues } = values;
        const postData = {
          ...formValues,
          ...baseSalesForceValues,
        };

        if (values.wouldLikeToReceiveAds) {
          subscribeUser(values.email).catch(console.error);
        }

        const headers = {
          'Content-Type': 'application/json',
        };

        await axios.post(CONTACT_US_URL, postData, { headers });

        showFeedbackForm();
      } catch (error) {
        setCustomError('Request failed. Please try again.');
        setIsLoading(false);
      }
    },
  });
  const { getFieldProps, validateForm, setFieldValue, values } = formik;
  const { pathname } = useLocation();
  // The inquiry-reason dropdown is shown only on the general contact page.
  const isGeneralContact = pathname.includes('/contact-us/general');

  // Pre-fill the inquiry reason from a URL param, e.g. /contact-us/general/?reason=free_trial
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlReason = new URLSearchParams(window.location.search).get('reason') as ReasonValue | null;
    if (urlReason && REASON_OPTIONS.some(o => o.value === urlReason)) {
      setFieldValue('reason', urlReason);
    }
  }, [setFieldValue]);

  if (isFeedbackFormVisible) {
    return <FeedbackForm title={title} />;
  }

  return (
    <FormikProvider value={formik}>
      <div className={getBlocksWith('-container')}>
        <form noValidate className={getBlocksWith()} onSubmit={formik.handleSubmit}>
          {isGeneralContact && (
            <div className={getBlocksWith('__select-field')}>
              <label className={getBlocksWith('__select-label')} htmlFor="reason-select">
                I&apos;m interested in
              </label>
              <Select
                id="reason-select"
                className={getBlocksWith('__select')}
                value={values.reason || undefined}
                placeholder="Choose your inquiry type"
                suffixIcon={
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6.5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                onChange={(value: ReasonValue) => setFieldValue('reason', value)}
                options={REASON_OPTIONS.map(({ label, value }) => ({ label, value }))}
              />
            </div>
          )}
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
          {isGeneralContact && (
            <FormInput
              name="reason_other"
              label="Tell us more"
              placeholder="Provide a brief summary of your request"
              InputElement="textarea"
              maxLength={MAX_LENGTH}
            />
          )}
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
          {customError && <div className="recaptcha-error">{customError}</div>}
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
