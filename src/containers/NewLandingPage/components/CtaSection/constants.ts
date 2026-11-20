export interface CtaProofItem {
  value: string;
  label: string;
}

// 3 social-proof tiles for the final CTA on NewLandingPage.
// Mix of scale (1.7K teams, 85M launches) and trust (open source + certs)
// so each tile speaks to a different buyer concern:
//   - 1.7K+ teams       → peer adoption  (everyone is on it)
//   - 85M+ launches     → battle-tested at scale
//   - Open source + SOC → safe for both dev teams and enterprise security
export const CTA_PROOF: CtaProofItem[] = [
  { value: '1.7K+', label: 'Teams worldwide' },
  { value: '85M+', label: 'Launches per year' },
  { value: 'Open source', label: 'SOC 2 · ISO 27001 certified' },
];
