"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { socialLinks } from "@/lib/data";

const contacts = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Williams Reyes",
    href: socialLinks.linkedin,
  },
  {
    icon: Mail,
    label: "Email",
    value: socialLinks.email,
    href: `mailto:${socialLinks.email}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@wgabriel14",
    href: socialLinks.github,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-[#141414]/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Contact" subtitle="Get In Touch" centered />

        <div className="mt-16 max-w-xl mx-auto flex flex-col items-center gap-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#a0a0a0] text-sm leading-relaxed text-center"
          >
            Open to full-time and contract roles in AI automation and networking.
            Based in Venezuela, available for remote positions worldwide or relocation.
          </motion.p>

          <div className="w-full flex flex-col gap-4">
            {contacts.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-[#141414] border border-[#1e1e1e] rounded-xl hover:border-[#00d4ff]/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-colors">
                    <item.icon size={18} className="text-[#00d4ff]" />
                  </div>
                  <div>
                    <p className="text-[#a0a0a0] text-xs">{item.label}</p>
                    <p className="text-[#f5f5f5] text-sm font-medium">{item.value}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
