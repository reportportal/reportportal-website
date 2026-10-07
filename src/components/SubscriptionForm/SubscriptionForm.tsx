import React, { useState, useEffect, FC } from 'react';
import Icon from '@ant-design/icons';
import { Input, Form } from 'antd';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder, EMAIL_VALIDATION_REGEX } from '@app/utils';

import { EnvelopeIcon } from './icons';
import { SubscriptionFormCard } from './SubscriptionFormCard';
import { subscribeUser } from './utils';

import './SubscriptionForm.scss';
import '../../containers/ContactUsPage/ContactUsPage.scss';

const getBlocksWith = createBemBlockBuilder(['subscription-form']);

enum SubscriptionStatus {
  success,
  error,
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

  const handleFinish = async () => {
    const trimmedEmail = email?.trim() ?? '';
    const isLengthValid = trimmedEmail.length > 0 && trimmedEmail.length <= 128;
    const isFormatValid = EMAIL_VALIDATION_REGEX.test(trimmedEmail);

    if (!isFormatValid || !isLengthValid) {
      setValidation({
        isValid: false,
        message: 'Please use a valid email format',
      });
      return;
    }

    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      await subscribeUser(trimmedEmail);
      setValidation({
        isValid: true,
        status: SubscriptionStatus.success,
      });
    } catch {
      setValidation({
        isValid: false,
        status: SubscriptionStatus.error,
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
      status: prevState.status === SubscriptionStatus.error ? undefined : prevState.status,
      message: undefined,
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
