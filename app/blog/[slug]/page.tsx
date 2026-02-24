import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#00d4ff] transition-colors text-sm mb-10"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="accent">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#f5f5f5] leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-6 text-[#a0a0a0] text-sm mb-12 pb-8 border-b border-[#1e1e1e]">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readingTime}
          </span>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-base max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-[#00d4ff] prose-a:no-underline hover:prose-a:underline prose-code:text-[#00d4ff] prose-pre:bg-[#141414] prose-pre:border prose-pre:border-[#1e1e1e] prose-hr:border-[#1e1e1e] prose-strong:text-[#f5f5f5] prose-blockquote:border-l-[#00d4ff] prose-th:text-[#f5f5f5]">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-[#1e1e1e]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#00d4ff] transition-colors text-sm"
            >
              <ArrowLeft size={14} />
              All posts
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#00d4ff] hover:underline"
            >
              Have questions? Get in touch →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
