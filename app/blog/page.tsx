import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogCard from "@/components/ui/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on AI automation, enterprise networking, and VoIP engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-sm font-medium font-heading uppercase tracking-wider">
              Blog
            </span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#f5f5f5] mb-4">
            Technical Writing
          </h1>
          <p className="text-[#a0a0a0] text-lg max-w-2xl">
            Deep dives on AI automation, enterprise networking, VoIP engineering,
            and the tools I use daily.
          </p>
        </div>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-[#a0a0a0] text-lg">No posts yet. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
