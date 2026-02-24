"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { careerTimeline } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="About"
          subtitle="Who I Am"
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-16 items-start">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Photo frame */}
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden ring-2 ring-[#00d4ff]/30 shadow-2xl shadow-[#00d4ff]/10">
                <Image
                  src="/images/profile.jpg"
                  alt="Williams Reyes"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-[#1e1e1e] -z-10" />
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20" />
            </div>
          </motion.div>

          {/* Bio column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="space-y-4 text-[#a0a0a0] leading-relaxed">
              <p>
                I&apos;m an Electronics Engineer from Simón Bolívar University with over
                4 years of hands-on experience bridging enterprise networking and
                cutting-edge AI automation. My career started deep in network
                infrastructure — CCNA-certified, deploying Cisco Meraki, Fortinet,
                and VoIP systems for enterprise clients across Venezuela and the US.
              </p>
              <p>
                As AI transformed the industry, I pivoted toward what excited me most:
                building intelligent, automated systems. Today I design conversational
                AI agents, integrate LLMs into business workflows using Vapi and n8n,
                and automate network operations with Python and the Meraki API — all
                at IPFone, a leading US cloud communications provider.
              </p>
              <p>
                What sets me apart is the intersection: I understand both the
                technical depth of enterprise networks{" "}
                <em className="text-[#f5f5f5]">and</em> the practical applications of
                AI. I can talk protocols with a network engineer and tokens with an AI
                researcher — and build products that bridge both worlds.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { label: "CCNA Certified", value: "Cisco" },
                { label: "B.Sc. Electronics Eng.", value: "USB, Venezuela" },
                { label: "AI Automation", value: "LLMs · n8n · Vapi" },
                { label: "4+ Years Exp.", value: "Networking & AI" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-4"
                >
                  <p className="text-[#00d4ff] font-heading font-semibold text-sm">
                    {item.label}
                  </p>
                  <p className="text-[#a0a0a0] text-xs mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Career Timeline */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#a0a0a0] text-sm font-medium uppercase tracking-wider mb-10 text-center"
          >
            Career Evolution
          </motion.h3>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-[10%] right-[10%] h-px bg-gradient-to-r from-[#6366f1] via-[#0080ff] to-[#00d4ff] hidden md:block" />

            <div className="grid md:grid-cols-3 gap-8 md:gap-4">
              {careerTimeline.map((milestone, i) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Node */}
                  <div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-4 relative z-10"
                    style={{
                      borderColor: milestone.color,
                      backgroundColor: `${milestone.color}15`,
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: milestone.color }}
                    />
                  </div>
                  <p
                    className="font-heading font-semibold text-base"
                    style={{ color: milestone.color }}
                  >
                    {milestone.label}
                  </p>
                  <p className="text-[#a0a0a0] text-sm mt-1">{milestone.period}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
