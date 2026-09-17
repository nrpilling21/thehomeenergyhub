import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/*
  Case-normalising redirect (BL-136).

  Every route on this site is lower-case. Next.js, however, treats the two
  kinds of route differently when the case does not match:

    /Blog                                   -> 404
    /Blog/electric-blanket-running-costs-uk -> 200, full duplicate of the
                                               lower-case page

  Both are harmful and they are the same bug. The 404 was found in the wild:
  Ahrefs credited `/Blog` with 5 estimated organic visits and three ranked
  keywords -- including "smets1 vs smets2" at position 23 -- while the URL
  itself served an error page. The 200 is worse in principle, because it is a
  crawlable duplicate of every post on the site at a second URL.

  A `redirects()` entry in next.config.mjs is the obvious fix and the wrong
  one: Next matches redirect sources case-insensitively, so a source of
  '/Blog' also matches '/blog' and the site redirects to itself forever. Doing
  it here lets us compare the path to its own lower-case form, which
  terminates by construction -- after one hop the two are equal and the
  middleware falls through.

  Handled generally rather than as a literal '/Blog' rule, because this class
  of bad inbound link recurs and a general rule costs nothing extra.
*/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lowercased = pathname.toLowerCase();

  if (lowercased !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lowercased;
    // 308 rather than 307: permanent, and preserves the method.
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  /* Skip Next internals, the API routes, and anything with a file extension
     (favicon.ico, sitemap.xml, robots.txt, the generated OG images). Those are
     served by name and must not be rewritten. */
  matcher: ['/((?!_next/|api/|.*\\.).*)'],
};
