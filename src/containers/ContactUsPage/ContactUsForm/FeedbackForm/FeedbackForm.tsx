import React, { useState } from 'react';
import { Tag } from 'antd';
import { isEmpty, xor } from 'lodash';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';

import { TAGS_DATA } from './constants';

import '../../ContactUsPage.scss';

const getBlocksWith = createBemBlockBuilder(['contact-us-form', 'how-did-you-hear']);

export const FeedbackForm = ({ title }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (tag: string) => setSelectedTags(xor(selectedTags, [tag]));

  const handleSubmit = () => {
    setIsSubmitted(true);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ga_event',
      custom_dimensions: {
        place: title,
        type: selectedTags.join('#'),
        button: 'Submit feedback',
        category: 'Thank You Modal',
      },
      event_name: 'click',
      timestamp: Date.now().valueOf(),
    });
  };

  return (
    <div className={getBlocksWith('-container')}>
      <div className={classNames(getBlocksWith(), { 'is-submitted': isSubmitted })}>
        <h2 className={getBlocksWith('__title')}>Thank you!</h2>
        <div className={getBlocksWith('__subtitle')}>
          {!isSubmitted
            ? "Your message is received. We'll be in touch shortly. We've also sent a confirmation email — if you don't see it, please check your spam folder."
            : 'Your feedback has been received'}
        </div>
        {!isSubmitted && (
          <div className={getBlocksWith('__tags')}>
            <div className={getBlocksWith('__tags-title')}>How did you hear about us?</div>
            <div className={getBlocksWith('__tags-container')}>
              {TAGS_DATA.map(tag => (
                <Tag.CheckableTag
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleChange(tag)}
                >
                  {tag}
                </Tag.CheckableTag>
              ))}
            </div>
            <button
              className="btn btn--primary btn--large"
              disabled={isEmpty(selectedTags)}
              onClick={handleSubmit}
            >
              Submit feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
