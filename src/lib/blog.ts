import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: 'heat-pumps' | 'ev-chargers' | 'energy-tariffs' | 'guides';
  tags: string[];
  content: string;
  faq?: { q: string; a: string }[];
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
function parseDate(dateStr: string): Date {
  // Handle DD.MM.YYYY format
  const dotMatch = dateStr.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (dotMatch) {
    return new Date(`${dotMatch[3]}-${dotMatch[2]}-${dotMatch[1]}`);
  }
  return new Date(dateStr);
}

function parseFrontmatter(fileContent: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  if (!match) return { data: {}, content: fileContent };

  const frontmatterLines = match[1].split('\n');
  const data: Record<string, unknown> = {};

  frontmatterLines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    }
    data[key] = value;
  });

  return { data, content: match[2] };
}

/* Strip inline markdown so answers are clean plain text for JSON-LD. */
function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/* Derive FAQPage entries from the post body.

   Posts carry their FAQ as a visible markdown section rather than frontmatter
   (the frontmatter parser is line-based and cannot hold nested YAML), so the
   Q&A pairs are read straight out of the rendered content. Both authoring
   styles used across the blog are supported:
     ## FAQ / ## Frequently asked questions / ## ... questions answered
       ### Question?          -> answer paragraph(s)
       **Question?**          -> answer on the same or following line(s)
   Returns undefined when the post has no FAQ section, so no empty schema
   is emitted. */
export function extractFaq(content: string): { q: string; a: string }[] | undefined {
  const heading = /^##\s+.*?(?:\bfaqs?\b|frequently asked questions|questions answered|common questions|common concerns answered|your questions).*$/im;
  const match = content.match(heading);
  if (!match || match.index === undefined) return undefined;

  const after = content.slice(match.index + match[0].length);
  const nextH2 = after.search(/^##\s+/m);
  const section = nextH2 === -1 ? after : after.slice(0, nextH2);

  const faq: { q: string; a: string }[] = [];

  // Style A: ### Question
  const h3 = /^###\s+(.+?)\s*$/gm;
  let m: RegExpExecArray | null;
  const h3Marks: { q: string; start: number }[] = [];
  while ((m = h3.exec(section)) !== null) {
    h3Marks.push({ q: m[1].trim(), start: m.index + m[0].length });
  }
  if (h3Marks.length > 0) {
    h3Marks.forEach((mark, i) => {
      const end = i + 1 < h3Marks.length ? section.lastIndexOf('###', h3Marks[i + 1].start) : section.length;
      const answer = stripMarkdown(section.slice(mark.start, end));
      if (mark.q && answer) faq.push({ q: stripMarkdown(mark.q), a: answer });
    });
  } else {
    // Style B: **Question?** on its own line, answer on the lines below
    const blocks = section.split(/\n\s*\n/);
    for (const block of blocks) {
      const b = block.trim();
      const bm = b.match(/^\*\*(.+\?)\*\*\s*([\s\S]+)$/);
      if (bm) {
        const q = stripMarkdown(bm[1]);
        const a = stripMarkdown(bm[2]);
        if (q && a) faq.push({ q, a });
      }
    }
  }

  return faq.length > 0 ? faq : undefined;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

  const posts = files.map(filename => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(fileContent);

    return {
      slug: filename.replace('.md', ''),
      title: data.title as string || '',
      description: data.description as string || '',
      date: data.date as string || '',
      author: data.author as string || '',
      category: (data.category as BlogPost['category']) || 'guides',
      tags: (data.tags as string[]) || [],
      content,
      faq: extractFaq(content),
    };
  });

  return posts.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = parseFrontmatter(fileContent);

  return {
    slug,
    title: data.title as string || '',
    description: data.description as string || '',
    date: data.date as string || '',
    author: data.author as string || '',
    category: (data.category as BlogPost['category']) || 'guides',
    tags: (data.tags as string[]) || [],
    content,
    faq: extractFaq(content),
  };
}
