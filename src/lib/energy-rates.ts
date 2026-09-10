/* Single source of truth for the energy unit rates quoted across the site.

   Every calculator default and every "at Xp per kWh" figure should come from
   here rather than being hard-coded, so that a quarterly Ofgem cap change is
   one edit in one file instead of fifteen edits scattered through pages and
   posts.

   Figures below are the Ofgem default tariff cap for 1 October - 31 December
   2026, verified against ofgem.gov.uk on 2026-09-08. Note there is no VAT on
   electricity from 1 October 2026 to 31 March 2027, so the electricity rate
   below is the all-in rate a customer actually pays in that window.

   When the cap changes: update the four numbers and CAP_PERIOD, then grep the
   repo for the previous pence figure to catch any prose that still quotes it. */

/** Electricity unit rate, pence per kWh, Ofgem cap. */
export const ELECTRICITY_PENCE_PER_KWH = 26.32;

/** Gas unit rate, pence per kWh, Ofgem cap. */
export const GAS_PENCE_PER_KWH = 7.97;

/** Electricity standing charge, pence per day, Ofgem cap. */
export const ELECTRICITY_STANDING_CHARGE_PENCE_PER_DAY = 54.83;

/** Gas standing charge, pence per day, Ofgem cap. */
export const GAS_STANDING_CHARGE_PENCE_PER_DAY = 29.68;

/** Human-readable label for the cap period the rates above belong to. */
export const CAP_PERIOD = "1 October to 31 December 2026";

/** Same rates in pounds per kWh, for calculators that work in pounds. */
export const ELECTRICITY_PER_KWH = ELECTRICITY_PENCE_PER_KWH / 100;
export const GAS_PER_KWH = GAS_PENCE_PER_KWH / 100;
