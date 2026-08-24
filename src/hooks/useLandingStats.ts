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

export const useLandingStats = (): LandingStatsDto => {
  const {
    allContentfulLandingStats: {
      nodes: [landingStats],
    },
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

  return landingStats;
};
