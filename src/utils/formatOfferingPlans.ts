import { ComparePlanCell, OfferingPlansQuery } from '@app/utils/types';

export type FormattedComparePlansDto = ReturnType<typeof formatOfferingPlans>['comparePlans'];
export type FormattedComparePlansItemDto = FormattedComparePlansDto['sections'][0]['items'][0];

/**
 * `plans` and `columns` are text fields in Contentful holding JSON. A stray
 * smart quote from a copy-paste used to take the whole build down, so parsing
 * failures degrade to an empty row instead of throwing.
 */
const parseJsonField = <T>(raw: string, field: string, fallback: T): T => {
  try {
    return JSON.parse(raw) as T;
  } catch {
    // eslint-disable-next-line no-console
    console.error(
      `[ComparePlans] "${field}" is not valid JSON and was skipped. Check the entry in Contentful:\n${raw}`,
    );

    return fallback;
  }
};

const parsePlans = (raw: string) => parseJsonField<ComparePlanCell[]>(raw, 'plans', []);

export const formatOfferingPlans = (dto: OfferingPlansQuery) => {
  const [plans] = dto.allContentfulSection.nodes;
  const [comparePlans] = dto.allContentfulComparePlan?.nodes || [];

  return {
    plans,
    ...(comparePlans && {
      comparePlans: {
        ...comparePlans,
        columns: parseJsonField<string[]>(comparePlans.columns, 'columns', []),
        sections: comparePlans.sections.map(section => ({
          ...section,
          items: section.items.map(item => ({
            ...item,
            plans: parsePlans(item.plans),
          })),
        })),
      },
    }),
  };
};
