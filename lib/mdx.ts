import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPostMeta, BlogPost } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

export function getAllPosts(): BlogPostMeta[] {
  ensurePostsDir();

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const filePath = path.join(POSTS_DIR, filename);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(source);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) || [],
        readingTime: readingTime(content).text,
        draft: (data.draft as boolean) || false,
      } satisfies BlogPostMeta;
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  ensurePostsDir();

  const extensions = [".mdx", ".md"];
  let filePath: string | null = null;

  for (const ext of extensions) {
    const candidate = path.join(POSTS_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) || [],
    readingTime: readingTime(content).text,
    draft: (data.draft as boolean) || false,
    content,
  };
}
