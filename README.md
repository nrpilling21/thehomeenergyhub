# The Home Energy Hub

Next.js (App Router) site for thehomeenergyhub.co.uk. Static pages live in
`src/app/<route>/page.tsx`; blog posts are markdown in `content/blog/` rendered
by `src/app/blog/[slug]/page.tsx`.

## Conventions worth knowing

### Energy unit rates — one source of truth
All electricity and gas unit rates come from `src/lib/energy-rates.ts`
(currently the Ofgem cap for 1 Oct – 31 Dec 2026: 26.32p electricity,
7.97p gas). Calculators and components import from it rather than hard-coding
a rate. When the cap changes, edit that file and then grep the repo for the
previous pence figure to catch prose in pillar pages and blog posts, whose
derived tables have to be recalculated by hand.

### FAQ schema is derived from the post body, not frontmatter
`BlogPost.faq` in `src/lib/blog.ts` is **not** a frontmatter field. No post has
a `faq:` key. The FAQPage JSON-LD emitted by `src/app/blog/[slug]/page.tsx` is
built by `extractFaq(content)`, which finds the post's H2 FAQ heading (matching
`/faqs?|frequently asked questions|questions answered|common questions|common
concerns answered|your questions/i`) and reads the Q&A pairs beneath it. Two
authoring styles are supported: `### Question` headings, and `**Question?**`
bold leads.

Consequences:
- To extend a post's FAQ schema, just add another question to its visible FAQ
  section. Nothing else is needed.
- Renaming the FAQ H2 to something outside that regex silently removes the
  schema from the page with no build error.
- A post with no FAQ section correctly emits no FAQPage block.

Note that Google retired FAQ rich results for most sites in 2023, so this
schema is unlikely to produce visible rich results; it is kept as valid
structured data rather than as a traffic lever.

### Affiliate links
Amazon links must carry `tag=thehomeenergyhub-21`. Awin links use the
`awin1.com/cread.php?awinmid=…&awinaffid=…` form. Every post containing an
affiliate link must also carry a disclosure; `src/app/blog/[slug]/page.tsx`
adds `rel="sponsored nofollow noopener"` to any link whose host is in
`AFFILIATE_HOSTS`.

### Authorship
Posts are published under the site byline from each post's `author`
frontmatter ("The Home Energy Hub"). Do not introduce invented personal author
names or stock-photo headshots — the blog index previously did this and it
contradicted both the article pages and the JSON-LD `author` value.

### Images: generated, not sourced
The site publishes no photography. Two generated systems cover what images are
needed:

- **Open Graph cards.** `src/lib/og.tsx` renders a branded 1200x630 card from
  the page title via `next/og`; `opengraph-image.tsx` at the site root and
  under `blog/[slug]` wire it up. This gives every page an `og:image` and
  `twitter:image`, and supplies the `image` field on the BlogPosting schema
  (Google's Rich Results Test reports a missing-image warning without it).
  No image files exist in the repo and none need maintaining.
- **Data charts.** `src/lib/charts.ts` renders inline SVG bar charts whose
  figures are **computed from the constants in `energy-rates.ts`**, never typed
  in, so a chart cannot drift from the prose beside it and the quarterly cap
  change updates every chart automatically. Drop `[chart:<id>]` on its own line
  in a post; the markdown renderer swaps it for the SVG, and an unknown id
  renders nothing rather than breaking the page. Match the decimal places to
  the table the chart sits next to.

- **Hero bands.** `src/lib/hero.ts` renders a flat geometric band at the top of
  each post, built from primitives in the brand palette. The motif is selected
  by keyword from the post's slug and tags, so no one has to assign artwork.
  To add a motif, write a glyph function and add a `MOTIFS` entry with its
  keywords; unknown topics fall back to `bars`. Keep glyphs geometric — a row
  of well-spaced shapes reads as deliberate design, a hand-drawn appliance
  does not.

**Do not use stock photography.** The same stock image appears on every
competitor's page, Google gives decorative stock little credit, and each one is
a file somebody has to source, licence and maintain. Generate instead. If a
genuinely original photograph is ever taken, point `BlogPosting.image` at it
instead of the OG card.

### End-of-post CTA
`src/lib/postCta.ts` picks the call to action at the foot of each blog post by
matching keywords against the slug (falling back to tags). It was previously
hardcoded to the heat pump and EV calculators on every post, so a reader
finishing a laundry running-cost guide was offered a heat pump calculator and
the smart meter savings calculator never appeared at all.

Notes if you edit it:
- Cluster order matters. Heat pumps are tested before appliance running costs
  so `heat-pump-running-costs-2026` gets the heat pump calculator.
- Matching is slug-first, because tags collide — the tumble dryer post carries
  the tag "heat pump tumble dryer".
- Keywords match on word boundaries so short ones ("ev") do not fire inside
  "every" or "level".
- `withoutSelfLinks` drops a secondary link that points at the current post.
- Where no calculator genuinely fits a cluster, the closest pillar guide leads
  instead. Sending an insulation reader to a heat pump calculator is the
  problem this file exists to solve, so do not reintroduce it for the sake of
  keeping a calculator in every CTA.
