/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    /* Three blog slugs are also live at the site root without the /blog
       prefix. Nothing on the site links to them any more (the internal links
       were corrected in May 2026), but Ahrefs still records all three as 404s
       in its crawl and any external link or bookmark from that period lands on
       an error page. Permanent redirects to the real posts. */
    return [
      {
        source: '/heat-pump-grants-uk-bus-grant-2026',
        destination: '/blog/heat-pump-grants-uk-bus-grant-2026',
        permanent: true,
      },
      {
        source: '/cavity-wall-insulation-cost-uk',
        destination: '/blog/cavity-wall-insulation-cost-uk',
        permanent: true,
      },
      {
        source: '/loft-insulation-cost-uk',
        destination: '/blog/loft-insulation-cost-uk',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
