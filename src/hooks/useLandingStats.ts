import { useStaticQuery, graphql } from 'gatsby';

interface LandingStatsDto {
  teamsWorldwideDigits: string;
  teamsWorldwideSuffix: string;
  launchesPerYearDigits: string;
  launchesPerYearSuffix: string;
  forksValue: string;
}

interface LandingStatsQueryDto {
  allContentfulLandingStats: { nodes: LandingStatsDto[] };
}

// Used if the "Landing Stats" entry is missing/unpublished in Contentful,
// so a build never crashes on a missing CMS entry.
const FALLBACK_LANDING_STATS: LandingStatsDto = {
  teamsWorldwideDigits: '1.7',
  teamsWorldwideSuffix: 'K+',
  launchesPerYearDigits: '85',
  launchesPerYearSuffix: 'M+',
  forksValue: '500+',
};

export const useLandingStats = (): LandingStatsDto => {
  const {
    allContentfulLandingStats: { nodes },
  } = useStaticQuery<LandingStatsQueryDto>(graphql`
    query ContentfulLandingStatsQuery {
      allContentfulLandingStats(limit: 1) {
        nodes {
          teamsWorldwideDigits
          teamsWorldwideSuffix
          launchesPerYearDigits
          launchesPerYearSuffix
          forksValue
        }
      }
    }
  `);

  return nodes[0] ?? FALLBACK_LANDING_STATS;
};
