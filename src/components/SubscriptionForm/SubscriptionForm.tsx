import React, { useState, useEffect, FC } from 'react';
import Icon from '@ant-design/icons';
import { Input, Form } from 'antd';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder, EMAIL_VALIDATION_REGEX } from '@app/utils';
import { useRecaptcha } from '@app/hooks/useRecaptcha';

import { EnvelopeIcon } from './icons';
import { SubscriptionFormCard } from './SubscriptionFormCard';
import { subscribeUser } from './utils';

import './SubscriptionForm.scss';

const getBlocksWith = createBemBlockBuilder(['subscription-form']);

enum SubscriptionStatus {
  success,
  alreadySubscribed,
  error,
  checkEmail,
}

export const SubscriptionForm: FC = () => {
  const [form] = Form.useForm();
  const [validation, setValidation] = useState<{
    isValid: boolean;
    status?: SubscriptionStatus;
    message?: string;
  }>({
    isValid: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const email = Form.useWatch('email', form);
  const { executeRecaptcha, recaptchaError, clearError } = useRecaptcha({
    timeout: 10000,
    retryCount: 2,
    retryDelay: 1000,
  });

  const handleSubscribeUser = async (emailToSubscribe: string, recaptchaToken: string | null) => {
    subscribeUser(emailToSubscribe, recaptchaToken)
      .then(response => {
        setIsLoading(false);
        setValidation({
          isValid: true,
          status:
            response.data.status === 'pending'
              ? SubscriptionStatus.checkEmail
              : SubscriptionStatus.success,
        });
      })
      .catch(error => {
        const shouldCheckEmail = error.response.data.error === 'email address already pending';
        const isAlreadySubscribed =
          error.response.data.error === 'email address already subscribed';

        if (shouldCheckEmail || isAlreadySubscribed) {
          setIsLoading(false);
          setValidation({
            isValid: true,
            status: shouldCheckEmail
              ? SubscriptionStatus.checkEmail
              : SubscriptionStatus.alreadySubscribed,
          });
        } else {
          setIsLoading(false);
          setValidation({
            isValid: false,
            status: SubscriptionStatus.error,
            message:
              'This email cannot be added to the list. Please enter a different email address.',
          });
        }
      });
  };

  const handleFinish = async () => {
    const isLengthValid = email?.length <= 128;
    const isFormatValid = EMAIL_VALIDATION_REGEX.test(email);

    if (!email || !isFormatValid || !isLengthValid) {
      setValidation({
        isValid: false,
        message: 'Please use a valid email format',
      });
      return;
    }

    try {
      setIsLoading(true);
      clearError();

      const recaptchaToken = await executeRecaptcha('subscribe');

      if (recaptchaError) {
        setValidation({
          isValid: false,
          message: 'Security verification failed. Please try again.',
        });
        return;
      }

      await handleSubscribeUser(email, recaptchaToken);
    } catch (error) {
      setValidation({
        isValid: false,
        message: 'Subscription failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValidation(prevState => ({
      ...prevState,
      isValid: true,
    }));
  }, [email]);

  if (validation.status === SubscriptionStatus.success) {
    return (
      <SubscriptionFormCard
        title="Thank you for subscribing!"
        subtitle="Check your email and if our confirmation letter landed in your spam folder, please mark it as “Not spam” to continue receiving our updates."
      />
    );
  }

  if (validation.status === SubscriptionStatus.alreadySubscribed) {
    return (
      <SubscriptionFormCard
        title="Already subscribed!"
        subtitle="You already have a subscription linked to this email address."
      />
    );
  }

  if (validation.status === SubscriptionStatus.checkEmail) {
    return (
      <SubscriptionFormCard
        title="Almost there! Confirm your subsciption."
        subtitle="Confirmation email sent. Please check your inbox and click the link to complete your subscription. If absent, check your spam or junk folder."
      />
    );
  }

  return (
    <Form form={form} onFinish={handleFinish} className={getBlocksWith('__form', '__form--error')}>
      <div className={getBlocksWith('__form-group')}>
        <Form.Item
          validateTrigger="onSubmit"
          className={getBlocksWith('__form-input')}
          name="email"
          {...(!validation.isValid && {
            validateStatus: 'error',
            help: validation.message,
          })}
        >
          <Input
            placeholder="Email address"
            prefix={
              <Icon component={(props: object) => <Icon component={EnvelopeIcon} {...props} />} />
            }
          />
        </Form.Item>
      </div>
      <Form.Item>
        <button
          type="submit"
          className="btn btn--primary"
          disabled={(form.isFieldsTouched(true) && !validation.isValid) || isLoading}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </Form.Item>
      {recaptchaError && <div className={getBlocksWith('__recaptcha-error')}>{recaptchaError}</div>}
      <span className={getBlocksWith('__form-info')}>
        By subscribing, you agree to receive marketing emails from ReportPortal team and associated
        partners and accept our{' '}
        <Link to="https://privacy.epam.com/core/interaction/showpolicy?type=PrivacyPolicy">
          Privacy Policy
        </Link>
      </span>
    </Form>
  );
};
