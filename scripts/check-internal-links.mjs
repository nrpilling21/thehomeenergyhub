#!/usr/bin/env node
/*
  Internal-link check (BL-129).

  Two failure modes have recurred often enough to be worth catching at
  authoring time rather than in a quarterly audit:

    1. A link points at a route that does not exist (a typo'd or renamed
       slug). These 404 for readers and burn crawl budget.
    2. A newly published post ships with too few *inbound* links, so Google
       has no internal path to it and it sits in "Discovered - currently not
       indexed" for months. BL-074, BL-107, BL-110, BL-115 and BL-130 are all
       the same bug found late.

  Run with `npm run check:links`. Exits non-zero on a broken link (hard
  error) and on an under-linked route (the thing this check exists for).
  `--warn-only` downgrades everything to a warning for local use.
*/

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const MIN_INBOUND = 3;
const warnOnly = process.argv.includes('--warn-only');

/* ---------- 1. Enumerate the routes the site actually publishes ---------- */

const appDir = join(ROOT, 'src/app');
const routes = new Set(['/']);

function walkRoutes(dir, prefix) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    // Route groups, private folders, dynamic segments and api routes are not
    // static destinations we can link-check by name.
    if (entry.name.startsWith('_') || entry.name.startsWith('[') || entry.name === 'api') continue;
    const child = join(dir, entry.name);
    const route = `${prefix}/${entry.name}`;
    if (existsSync(join(child, 'page.tsx')) || existsSync(join(child, 'page.ts'))) routes.add(route);
    walkRoutes(child, route);
  }
}
walkRoutes(appDir, '');

const blogDir = join(ROOT, 'content/blog');
const slugs = readdirSync(blogDir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
for (const slug of slugs) routes.add(`/blog/${slug}`);

/* Routes that exist only as redirects in next.config.mjs still resolve, so a
   link to one is not broken -- but it is a needless hop, so we note it. */
const redirectSources = new Set();
const nextConfig = readFileSync(join(ROOT, 'next.config.mjs'), 'utf8');
for (const m of nextConfig.matchAll(/source:\s*'([^']+)'/g)) redirectSources.add(m[1]);

/* ---------- 2. Collect every internal link in the source ---------- */

const sourceFiles = [];
function walkFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next') continue;
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(p);
    else if (/\.(md|tsx|ts)$/.test(entry.name)) sourceFiles.push(p);
  }
}
walkFiles(join(ROOT, 'src'));
walkFiles(blogDir);

/** Which route does this source file publish? (so we can ignore self-links) */
function routeOf(file) {
  const rel = relative(ROOT, file);
  if (rel.startsWith('content/blog/')) return `/blog/${rel.slice('content/blog/'.length).replace(/\.md$/, '')}`;
  const m = rel.match(/^src\/app\/(.*)\/page\.tsx$/);
  if (!m) return null;
  if (m[1].includes('[')) return null;
  return `/${m[1]}`;
}

const inbound = new Map();          // route -> Set of linking routes
const broken = [];                  // { file, href }
const viaRedirect = [];             // { file, href }
for (const route of routes) inbound.set(route, new Set());

const MD_LINK = /\[[^\]]*\]\((\/[^)\s"]*)\)/g;         // [text](/route)
const JSX_HREF = /href=["'](\/[^"'\s]*)["']/g;          // href="/route"

for (const file of sourceFiles) {
  const text = readFileSync(file, 'utf8');
  const from = routeOf(file);
  for (const re of [MD_LINK, JSX_HREF]) {
    re.lastIndex = 0;
    for (const m of text.matchAll(re)) {
      const href = m[1].split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
      if (href.startsWith('/_next') || /\.(png|jpg|svg|ico|xml|txt|webp)$/.test(href)) continue;
      if (routes.has(href)) {
        if (from && from !== href) inbound.get(href).add(from);
        continue;
      }
      if (redirectSources.has(href)) { viaRedirect.push({ file: relative(ROOT, file), href }); continue; }
      broken.push({ file: relative(ROOT, file), href });
    }
  }
}

/* ---------- 3. Report ---------- */

let failures = 0;

if (broken.length) {
  console.error(`\nBROKEN INTERNAL LINKS (${broken.length}) - link target is not a published route:`);
  for (const b of broken) console.error(`  ${b.file}  ->  ${b.href}`);
  failures += broken.length;
} else {
  console.log('\nBroken internal links: none');
}

if (viaRedirect.length) {
  console.warn(`\nLinks pointing at a redirect (${viaRedirect.length}) - works, but costs a hop:`);
  for (const b of viaRedirect) console.warn(`  ${b.file}  ->  ${b.href}`);
}

/* Only content routes need inbound links. The disclosure page is linked from
   every post's disclosure line and the homepage links itself nowhere. */
const EXEMPT = new Set(['/', '/blog']);
const under = [...inbound.entries()]
  .filter(([route, set]) => !EXEMPT.has(route) && set.size < MIN_INBOUND)
  .sort((a, b) => a[1].size - b[1].size);

if (under.length) {
  console.error(`\nUNDER-LINKED ROUTES (${under.length}) - fewer than ${MIN_INBOUND} inbound internal links:`);
  for (const [route, set] of under) {
    console.error(`  ${String(set.size).padStart(2)} inbound  ${route}${set.size ? `  (from ${[...set].join(', ')})` : ''}`);
  }
  failures += under.length;
} else {
  console.log(`Under-linked routes: none (every route has >= ${MIN_INBOUND} inbound links)`);
}


/* ---------- 3b. Blog metadata length + stale-rate guard (BL-151, BL-132) ---------- */

const MAX_TITLE = 62;
const MAX_DESC = 160;
/* Previous Ofgem cap rates that must no longer be quoted as the current rate.
   Add the outgoing rate here whenever energy-rates.ts changes. */
const STALE_RATES = ['24.5p/kWh', '24.5p per kWh', '24.50p/kWh', '24.50p per kWh'];

const metaProblems = [];
const staleProblems = [];
for (const slug of slugs) {
  const raw = readFileSync(join(blogDir, `${slug}.md`), 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  const get = k => { const m = fm && fm[1].match(new RegExp(`^${k}:\\s*["']?(.*?)["']?\\s*$`, 'm')); return m ? m[1] : null; };
  const title = get('title'), desc = get('description');
  if (!title) metaProblems.push(`${slug}: missing title`);
  else if (title.length > MAX_TITLE) metaProblems.push(`${slug}: title is ${title.length} chars (max ${MAX_TITLE})`);
  if (!desc) metaProblems.push(`${slug}: missing description`);
  else if (desc.length > MAX_DESC) metaProblems.push(`${slug}: description is ${desc.length} chars (max ${MAX_DESC})`);
  for (const stale of STALE_RATES) if (raw.includes(stale)) staleProblems.push(`${slug}: quotes stale rate "${stale}"`);
}
if (metaProblems.length) {
  console.error(`\nBLOG METADATA PROBLEMS (${metaProblems.length}):`);
  for (const m of metaProblems) console.error(`  ${m}`);
  failures += metaProblems.length;
} else {
  console.log(`Blog metadata: all ${slugs.length} posts have a title <= ${MAX_TITLE} and description <= ${MAX_DESC}`);
}
if (staleProblems.length) {
  console.error(`\nSTALE ENERGY RATES (${staleProblems.length}) - update to the value in src/lib/energy-rates.ts:`);
  for (const m of staleProblems) console.error(`  ${m}`);
  failures += staleProblems.length;
} else {
  console.log('Stale rates: none quoted');
}

console.log(`\nChecked ${routes.size} routes across ${sourceFiles.length} source files.`);

if (failures && !warnOnly) {
  console.error(`\n${failures} problem(s) found. Fix them, or run with --warn-only to downgrade to a warning.`);
  process.exit(1);
}
