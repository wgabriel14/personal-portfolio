"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import TimelineItem from "@/components/ui/TimelineItem";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Experience"
          subtitle="Work History"
        />

        <div className="mt-16 max-w-3xl">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              title={exp.title}
              company={exp.company}
              location={exp.location}
              period={exp.period}
              description={exp.description}
              technologies={exp.technologies}
              isLast={index === experiences.length - 1}
              current={exp.current}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
