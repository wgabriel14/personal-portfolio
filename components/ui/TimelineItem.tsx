"use client";

import { motion } from "framer-motion";
import Badge from "./Badge";

interface TimelineItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  isLast?: boolean;
  current?: boolean;
}

export default function TimelineItem({
  title,
  company,
  location,
  period,
  description,
  technologies,
  isLast = false,
  current = false,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex gap-6"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ring-2 ${
            current
              ? "bg-[#00d4ff] ring-[#00d4ff]/30"
              : "bg-[#1e1e1e] ring-[#1e1e1e]"
          }`}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-[#1e1e1e] to-transparent mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-heading font-semibold text-lg text-[#f5f5f5]">
              {title}
            </h3>
            <p className="text-[#00d4ff] text-sm font-medium">
              {company}
              <span className="text-[#a0a0a0] font-normal"> · {location}</span>
            </p>
          </div>
          <span className="text-[#a0a0a0] text-sm whitespace-nowrap bg-[#141414] border border-[#1e1e1e] px-3 py-1 rounded-full">
            {period}
          </span>
        </div>

        <ul className="space-y-2 mb-4">
          {description.map((item, i) => (
            <li key={i} className="text-[#a0a0a0] text-sm leading-relaxed flex gap-2">
              <span className="text-[#00d4ff] mt-1.5 flex-shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
