import React, { useState, useRef, useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useBoolean } from 'ahooks';
import isEmpty from 'lodash/isEmpty';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from '@app/components/Link';
// import { subscribeUser } from '@app/components/SubscriptionForm/utils';
import { createBemBlockBuilder } from '@app/utils';
import axios from 'axios';

import { validate, getBaseSalesForceValues } from './utils';
import { FormFieldWrapper } from './FormFieldWrapper';
import { FeedbackForm } from './FeedbackForm';
import { FormInput } from './FormInput';
import { CustomCheckbox } from './CustomCheckbox';
import { MAX_LENGTH, RECAPTCHA_SITE_KEY } from './constants';
import ArrowIcon from '../../../svg/arrow.inline.svg';

import '../ContactUsPage.scss';

const getBlocksWith = createBemBlockBuilder(['contact-us-form']);

const MIN_FORM_INTERACTION_TIME = 3000;

export const ContactUsForm = ({ title, options, isDiscussFieldShown }) => {
  const [isFeedbackFormVisible, { setTrue: showFeedbackForm }] = useBoolean(false);
  const [isLoading, setIsLoading] = useState(false);
  const formMountTimeRef = useRef<number | null>(null);

  useEffect(() => {
    formMountTimeRef.current = Date.now();
  }, []);
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      company: '',
      termsAgree: false,
      wouldLikeToReceiveAds: false,
      website: '', // Honeypot field - should remain empty
      recaptchaToken: '',
      ...(isDiscussFieldShown && { discuss: '' }),
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate,
    onSubmit: async values => {
      // Bot detection: Check honeypot field
      if (values.website) {
        console.warn('Bot detected: honeypot field filled');
        return;
      }

      // Bot detection: Check if form was submitted too quickly
      if (formMountTimeRef.current !== null) {
        const timeSinceMount = Date.now() - formMountTimeRef.current;
        if (timeSinceMount < MIN_FORM_INTERACTION_TIME) {
          console.warn('Bot detected: form submitted too quickly');
          return;
        }
      }

      validateForm().then(errors => {
        if (isEmpty(errors)) {
          setIsLoading(true);

          const baseSalesForceValues = getBaseSalesForceValues(options);
          // Remove honeypot field before submitting
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { website, recaptchaToken, ...cleanValues } = values;
          const postData = {
            ...cleanValues,
            ...baseSalesForceValues,
            recaptchaToken: values.recaptchaToken,
          };

          // if (values.wouldLikeToReceiveAds) {
          //   subscribeUser(values.email).catch(console.error);
          // }

          axios
            .post(`${process.env.CONTACT_US_URL}`, postData)
            .catch(console.error)
            .finally(() => {
              showFeedbackForm();
              setIsLoading(false);
            });
        }
      });
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
          {/* Honeypot field - hidden from users but visible to bots */}
          <div
            style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
            aria-hidden="true"
          >
            <FormInput
              name="website"
              label="Website"
              placeholder="https://example.com"
              maxLength={MAX_LENGTH}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
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
          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={value => {
                formik.setFieldValue('recaptchaToken', value);
              }}
            />
            {formik.errors.recaptchaToken && (
              <div className="error">{formik.errors.recaptchaToken as string}</div>
            )}
          </div>
          <button
            className="btn btn--primary btn--large"
            type="submit"
            data-gtm="send_request"
            disabled={
              !getFieldProps('termsAgree').value ||
              !getFieldProps('recaptchaToken').value ||
              isLoading
            }
          >
            Send request
          </button>
        </form>
      </div>
    </FormikProvider>
  );
};
