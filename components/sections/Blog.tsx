import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/ui/BlogCard";
import { getAllPosts } from "@/lib/mdx";

export default function BlogSection() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <SectionHeading
            title="Blog"
            subtitle="Technical Writing"
          />
          <Link
            href="/blog"
            className="flex items-center gap-1 text-[#00d4ff] text-sm font-medium hover:gap-2 transition-all self-start md:self-auto"
          >
            View all posts <ArrowRight size={14} />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#a0a0a0]">Blog posts coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}
