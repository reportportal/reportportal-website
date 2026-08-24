export interface StatCard {
  iconKey: 'star' | 'fork' | 'contributors';
  value: string;
  label: string;
}

export interface FeatureItem {
  iconKey: 'opensource' | 'community' | 'core';
  title: string;
  description: string;
}

export const FEATURE_LIST: FeatureItem[] = [
  {
    iconKey: 'opensource',
    title: 'Free open source core',
    description: 'Self-host for free — add premium features and plugins when you need them',
  },
  {
    iconKey: 'community',
    title: 'Community-backed',
    description: 'Get support, share best practices, and build with contributors worldwide',
  },
  {
    iconKey: 'core',
    title: 'Deploy on your terms',
    description: 'Run in your environment and integrate with your stack',
  },
];
