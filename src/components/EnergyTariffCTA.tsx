import { getPartner, partnerLinkAttrs } from '@/lib/partners';

/*
  Tariff CTA for the smart-meter cluster (BL-119).

  Placed on the five pages carrying ~88% of site clicks. Renders a commercial
  destination once an energy programme is live (see src/lib/partners.ts) and an
  honest internal one until then — never a placeholder.
*/
export function EnergyTariffCTA() {
  const partner = getPartner('energySwitch');
  const attrs = partnerLinkAttrs(partner);

  return (
    <aside className="bg-cream-dark rounded-2xl p-6 my-10 border border-ink/10">
      <p className="font-display font-semibold text-base text-ink mb-2">
        A smart meter shows you what you spend. Your tariff decides what it costs.
      </p>
      <p className="text-sm text-ink/70 mb-4 leading-relaxed">
        Most households who check their in-home display are reacting to a bill that went
        up. The display itself cannot lower it — the unit rate does. It is worth checking
        what you are paying per kWh against what is currently available.
      </p>
      <a
        href={partner.href}
        {...attrs}
        className="inline-block px-5 py-3 rounded-full bg-ink text-cream-dark text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        {partner.cta}
      </a>
      {partner.enabled && partner.disclosure && (
        <p className="text-xs text-ink/55 mt-3">{partner.disclosure}</p>
      )}
    </aside>
  );
}
