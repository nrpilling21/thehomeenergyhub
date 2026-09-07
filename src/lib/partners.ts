/*
  Central commercial-partner configuration (BL-119).

  Every partner destination on the site is defined here so that activating a
  newly-approved affiliate programme is a one-line change rather than a hunt
  through components and markdown.

  Why this exists: the site's traffic is ~88% smart-meter cluster — readers who
  are, by definition, engaged energy bill-payers. Energy switching is worth
  £28 (single fuel) to £56 (dual fuel) per conversion via Awin, against roughly
  1-2% of £40 for an Amazon gadget sale, so it is the highest-value action we
  can offer that audience. See the 2026-09-07 monetisation review.

  ACTIVATION: once an energy programme is approved in the existing Awin
  account, set `energySwitch.href` to the Awin deeplink and `enabled` to true.
  Nothing else needs to change — the CTA is already placed across the
  smart-meter cluster and the pillar page.

  Until then `enabled` stays false and the CTA renders an honest internal
  destination instead of a dead or placeholder outbound link. The interim
  destination is the savings calculator, which also feeds the site's weakest
  tracked asset (BL-060: 63 impressions, 0 clicks).

  NOTE when activating: also add <EnergyTariffCTA /> back to
  src/app/smart-meter-guide-uk/page.tsx. It is deliberately absent while the
  partner is disabled, because that page already has a prominent CTA to the
  same interim destination and two identical CTAs would be redundant.
*/

export type Partner = {
  enabled: boolean;
  href: string;
  /** Shown on the button. */
  cta: string;
  /** Required by the ASA/CAP code when the link is commercial. */
  disclosure?: string;
};

export const partners: Record<string, Partner> = {
  energySwitch: {
    enabled: false,
    href: '/smart-meter-savings-calculator',
    cta: 'Estimate what a better tariff could save you',
  },
};

export function getPartner(key: keyof typeof partners): Partner {
  return partners[key];
}

/** Outbound partner links must be marked sponsored; internal ones must not. */
export function partnerLinkAttrs(partner: Partner) {
  if (!partner.enabled) return {};
  return {
    target: '_blank',
    rel: 'sponsored nofollow noopener noreferrer',
  } as const;
}
