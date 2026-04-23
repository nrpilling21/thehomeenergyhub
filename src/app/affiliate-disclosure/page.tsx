import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | The Home Energy Hub",
  description:
    "The Home Energy Hub uses affiliate links from the Amazon Associates programme and Awin partners. Full disclosure of how we earn from product recommendations.",
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
    <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12">
      <h1>Affiliate Disclosure</h1>

      <p>
        The Home Energy Hub is an independent publisher that exists to help UK homeowners
        make better decisions about energy, insulation, heating and home improvements. To
        keep the site running and the guides free to read, some of the links on this site
        are affiliate links.
      </p>

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

      <p className="text-sm text-slate-500">Last updated: 23 April 2026.</p>
    </article>
  );
}
