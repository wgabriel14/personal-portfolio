"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-[#141414]/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="What I've Built"
        />

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
