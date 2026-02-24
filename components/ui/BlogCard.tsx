"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Badge from "./Badge";
import type { BlogPostMeta } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPostMeta;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4ff]/5 flex flex-col"
    >
      {/* Meta */}
      <div className="flex items-center gap-4 mb-3 text-[#a0a0a0] text-xs">
        <span className="flex items-center gap-1.5">
          <Calendar size={12} />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={12} />
          {post.readingTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-lg text-[#f5f5f5] mb-2 group-hover:text-[#00d4ff] transition-colors leading-snug">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-[#a0a0a0] text-sm leading-relaxed mb-4 flex-1">
        {post.excerpt}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={`/blog/${post.slug}`}
        className="flex items-center gap-1 text-[#00d4ff] text-sm font-medium hover:gap-2 transition-all"
      >
        Read more <ArrowRight size={14} />
      </Link>
    </motion.article>
  );
}
