"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Clock } from "lucide-react";
import Badge from "./Badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4ff]/5 flex flex-col"
    >
      {/* Status badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {project.status === "coming-soon" ? (
            <span className="flex items-center gap-1.5 text-xs text-[#a0a0a0] bg-[#1e1e1e] px-2.5 py-1 rounded-full">
              <Clock size={12} />
              Coming Soon
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a0a0a0] hover:text-[#00d4ff] transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a0a0a0] hover:text-[#00d4ff] transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-xl text-[#f5f5f5] mb-3 group-hover:text-[#00d4ff] transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-[#a0a0a0] text-sm leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </motion.div>
  );
}
