"use client";

import { motion } from "framer-motion";
import { Brain, Network, Code2, Phone, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { skillGroups } from "@/lib/data";

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Network,
  Code2,
  Phone,
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-[#141414]/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Skills"
          subtitle="Technical Expertise"
          centered
        />

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, groupIndex) => {
            const Icon = iconMap[group.icon];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6 hover:border-[#00d4ff]/20 transition-colors"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
                    {Icon && <Icon size={18} className="text-[#00d4ff]" />}
                  </div>
                  <h3 className="font-heading font-semibold text-[#f5f5f5]">
                    {group.category}
                  </h3>
                </div>

                {/* Skills grid */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: groupIndex * 0.1 + skillIndex * 0.03,
                      }}
                    >
                      <Badge>{skill}</Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
