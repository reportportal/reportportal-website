import { OfferingPlansQuery } from '@app/utils/types';

export type FormattedComparePlansDto = ReturnType<typeof formatOfferingPlans>['comparePlans'];
export type FormattedComparePlansItemDto = FormattedComparePlansDto['sections'][0]['items'][0];

export const formatOfferingPlans = (dto: OfferingPlansQuery) => {
  const [plans] = dto.allContentfulSection.nodes;
  const [comparePlans] = dto.allContentfulComparePlan?.nodes || [];

  return {
    plans,
    ...(comparePlans && {
      comparePlans: {
        ...comparePlans,
        columns: JSON.parse(comparePlans.columns) as string[],
        sections: comparePlans.sections.map(section => ({
          ...section,
          items: section.items.map(item => ({
            ...item,
            plans: JSON.parse(item.plans) as (string | number | boolean)[],
          })),
        })),
      },
    }),
  };
};
