"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import dynamic from "next/dynamic";

const ChatDemo = dynamic(() => import("@/components/ui/ChatDemo"), { ssr: false });
const VoiceDemo = dynamic(() => import("@/components/ui/VoiceDemo"), { ssr: false });

type Tab = "chat" | "voice";

export default function AIDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("voice");

  return (
    <section id="ai-demo" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="AI Demo" subtitle="Try the AI" centered />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-[#a0a0a0] text-sm mt-4 mb-12"
        >
          Powered by Retell AI — same tech I use in production automations
        </motion.p>

        <div className="max-w-2xl mx-auto">
          {/* Tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex gap-2 p-1 bg-[#141414] border border-[#1e1e1e] rounded-xl mb-6"
          >
            {(
              [
                { id: "voice" as Tab, label: "Voice Call", Icon: Phone },
                { id: "chat" as Tab, label: "Chat", Icon: MessageSquare },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === id
                    ? "bg-[#00d4ff] text-[#0a0a0a]"
                    : "text-[#a0a0a0] hover:text-[#f5f5f5]"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </motion.div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "chat" ? <ChatDemo /> : <VoiceDemo />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
