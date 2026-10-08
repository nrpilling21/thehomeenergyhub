import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | The Home Energy Hub",
  description:
    "How The Home Energy Hub earns: Amazon Associates and Awin affiliate links, and links to our sister businesses eChargers UK and eFans.",
  alternates: {
    canonical: "https://www.thehomeenergyhub.co.uk/affiliate-disclosure",
  },
  openGraph: {
    title: "Affiliate Disclosure | The Home Energy Hub",
    description:
      "How The Home Energy Hub uses affiliate links from Amazon Associates and Awin partners.",
    url: "https://www.thehomeenergyhub.co.uk/affiliate-disclosure",
    type: "article",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <PageHero eyebrow="About" title="Affiliate disclosure.">
        The Home Energy Hub is a publisher that exists to help UK homeowners
        make better decisions about energy, insulation, heating and home improvements. To
        keep the site running and the guides free to read, some of the links on this site
        are affiliate links.
      </PageHero>
      <article className="article-body max-w-2xl mx-auto px-5 pt-14 pb-20 text-ink">

      <h2>What does that mean?</h2>
      <p>
        If you click an affiliate link and buy a product or sign up for a service, we may
        earn a small commission from the retailer or supplier. You pay exactly the same
        price as you would if you went directly to the retailer - the commission is paid
        by the retailer, not by you.
      </p>

      <h2>Which programmes do we use?</h2>
      <p>
        <strong>Amazon Associates.</strong> The Home Energy Hub is a participant in the
        Amazon EU Associates Programme, an affiliate advertising programme designed to
        provide a means for sites to earn advertising fees by advertising and linking to
        Amazon.co.uk. Our Associates tag is <code>thehomeenergyhub-21</code>.
      </p>
      <p>
        <strong>Awin.</strong> Where approved, we also use affiliate links through the
        Awin network to connect readers with UK energy and home-improvement providers -
        for example boiler, heat pump, solar and EV-charger installers, and some energy
        suppliers.
      </p>

      <p>
        <strong>eChargers UK (sister business).</strong> Some EV charger guides link to
        eChargers UK, an online EV charger retailer run by the same director as The Home
        Energy Hub. We benefit when you buy there. Those links are tagged so we can see
        which guides send visitors, and we say so on the pages that use them. Our
        recommendations include chargers eChargers UK does not sell.
      </p>
      <p>
        <strong>eFans (sister business).</strong> Some ventilation, damp and condensation
        guides link to eFans, a UK ventilation supplier run by the same director. We benefit
        when you buy there, those links are tagged in the same way, and the pages that use
        them say so.
      </p>

      <h2>How we choose what to link to</h2>
      <p>
        We only add affiliate links to products, services and retailers we genuinely think
        are relevant to the guide. The content and the recommendations come first - the
        links follow. Guides are never written around a commercial brief, and we never
        accept payment to change our conclusions or ratings.
      </p>

      <h2>Not financial, tax or legal advice</h2>
      <p>
        The articles on this site are intended as general information for UK consumers.
        They are not financial, tax or legal advice. Always get a professional quote for
        major work (heat pumps, insulation, solar PV, EV chargers) and check eligibility
        for any grants directly with the scheme administrator before committing.
      </p>

      <h2>Questions</h2>
      <p>
        If anything on this page is unclear, or you think one of our affiliate links is
        broken or mis-signposted, please let us know via the{" "}
        <Link href="/">contact options on the home page</Link>.
      </p>

      <p className="text-sm text-slate-500">Last updated: 5 October 2026.</p>
    </article>
      </>
  );
}
