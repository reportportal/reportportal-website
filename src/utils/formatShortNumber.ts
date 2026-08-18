/**
 * Formats a large integer into a compact human-readable string.
 *
 * Rules:
 *  - Truncates to 1 decimal place (floors, never rounds up)
 *  - Appends "+" when the number is not an exact multiple of the unit (1M or 1K)
 *
 * Examples:
 *   6_000_000  → "6M"      (exact million)
 *   2_650_000  → "2.6M+"   (truncated, has remainder)
 *   8_705      → "8.7K+"   (truncated, has remainder)
 *   2_000      → "2K"      (exact thousand)
 *   2_016      → "2K+"     (truncated)
 */
export const formatShortNumber = (num: number): string => {
  if (num >= 1_000_000) {
    const value = Math.round(num / 100_000) / 10;
    const roundedNumber = value * 1_000_000;
    const suffix = num > roundedNumber ? 'M+' : 'M';

    return `${value}${suffix}`;
  }

  if (num >= 1_000) {
    const value = Math.round(num / 100) / 10;
    const roundedNumber = value * 1_000;
    const suffix = num > roundedNumber ? 'K+' : 'K';

    return `${value}${suffix}`;
  }

  return `${num}`;
};

/**
 * Same logic as formatShortNumber, but returns digits and suffix separately.
 * Used by components (e.g. TrustedBy) that style the numeric part and the
 * unit suffix independently.
 *
 * Examples:
 *   2_650_000  → { digits: "2.6", suffix: "M+" }
 *   6_000_000  → { digits: "6",   suffix: "M"  }
 *   8_705      → { digits: "8.7", suffix: "K+" }
 */
export const formatShortNumberParts = (num: number): { digits: string; suffix: string } => {
  if (num >= 1_000_000) {
    const value = Math.round(num / 100_000) / 10;
    const roundedNumber = value * 1_000_000;
    const suffix = num > roundedNumber ? 'M+' : 'M';

    return { digits: `${value}`, suffix };
  }

  if (num >= 1_000) {
    const value = Math.round(num / 100) / 10;
    const roundedNumber = value * 1_000;
    const suffix = num > roundedNumber ? 'K+' : 'K';

    return { digits: `${value}`, suffix };
  }

  return { digits: `${num}`, suffix: '' };
};
