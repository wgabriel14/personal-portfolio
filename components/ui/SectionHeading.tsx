"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={centered ? "text-center" : ""}
    >
      <div className={`flex items-center gap-3 mb-3 ${centered ? "justify-center" : ""}`}>
        <div className="h-px w-8 bg-[#00d4ff]" />
        <span className="text-[#00d4ff] text-sm font-medium font-heading uppercase tracking-wider">
          {title}
        </span>
        <div className="h-px w-8 bg-[#00d4ff]" />
      </div>
      {subtitle && (
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#f5f5f5] leading-tight">
          {subtitle}
        </h2>
      )}
    </motion.div>
  );
}
