/* eslint-disable react/no-multi-comp */
import React, { Children } from 'react';
import { BLOCKS } from '@contentful/rich-text-types';
import { compact } from 'lodash';
import { createBemBlockBuilder } from '@app/utils';

const getBlocksWith = createBemBlockBuilder(['case-page']);

export const OPTIONS = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      const childrenArray = Children.toArray(children);

      if (!compact(childrenArray).length) {
        return null;
      }

      return <p className={getBlocksWith('__column--description')}>{children}</p>;
    },
    [BLOCKS.LIST_ITEM]: (node, children) =>
      children.map((item, index) => (
        <li className={getBlocksWith('__column--list--item')} key={index}>
          {item}
        </li>
      )),
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const { url, description } = node.data.target;

      return <img className={getBlocksWith('__column--image')} src={url} alt={description} />;
    },
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className={getBlocksWith('__column--title')}>{children}</h4>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className={getBlocksWith('__column--intro')}>{children}</h6>
    ),
    [BLOCKS.TABLE]: (node, children) => (
      <table className={getBlocksWith('__column--table')}>
        <tbody>{children}</tbody>
      </table>
    ),
  },
};
