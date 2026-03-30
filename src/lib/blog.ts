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

function parseFrontmatter(fileContent: string): { metadata: Record<string, any>; content: string } {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { metadata: {}, content: fileContent };

  const metadata: Record<string, any> = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(': ');
    if (key && rest.length) {
      let value: any = rest.join(': ').trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map((s: string) => s.trim().replace(/^["']|["']$/g, ''));
      }
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      metadata[key.trim()] = value;
    }
  });

  return { metadata, content: match[2].trim() };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { metadata, content } = parseFrontmatter(raw);

    return {
      slug: file.replace('.md', ''),
      title: metadata.title || 'Untitled',
      description: metadata.description || '',
      date: metadata.date || new Date().toISOString().split('T')[0],
      author: metadata.author || 'The Home Energy Hub',
      category: metadata.category || 'guides',
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      content,
      faq: metadata.faq,
    } as BlogPost;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug) || null;
}
