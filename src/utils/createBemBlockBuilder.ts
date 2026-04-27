import classNames from 'classnames';
import { isEmpty } from 'lodash';

export const createBemBlockBuilder = (blocks: string[]) => {
  const cleanedBlocks = blocks.reduce(
    (reviewedBlocks, block) =>
      block
        ? reviewedBlocks.concat(block.trim().split(' ') as unknown as ConcatArray<never>)
        : reviewedBlocks,
    [],
  );

  return (...selectors: string[]) =>
    cleanedBlocks.reduce(
      (classList, block) =>
        classNames(
          classList,
          ...(!isEmpty(selectors) ? selectors : ['']).map(
            (elementOrModifier = '') => `${block}${elementOrModifier}`,
          ),
        ),
      '',
    );
};
