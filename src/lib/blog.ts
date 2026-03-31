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
  };
}
