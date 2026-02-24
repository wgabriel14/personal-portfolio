"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { socialLinks } from "@/lib/data";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message too long"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-[#1a1a1a] border border-[#1e1e1e] rounded-xl px-4 py-3 text-[#f5f5f5] text-sm placeholder:text-[#555] focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-colors";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <section id="contact" className="section-padding bg-[#141414]/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Contact"
          subtitle="Get In Touch"
          centered
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16 bg-[#141414] border border-[#1e1e1e] rounded-2xl"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} className="text-[#00d4ff]" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-[#f5f5f5] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[#a0a0a0] mb-6 max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-[#00d4ff] text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <div>
                    <input
                      {...register("name")}
                      placeholder="Your name"
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className={errorClass}>{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className={errorClass}>{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      {...register("message")}
                      placeholder="Your message..."
                      rows={6}
                      className={`${inputClass} resize-none`}
                    />
                    {errors.message && (
                      <p className={errorClass}>{errors.message.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-heading font-semibold text-xl text-[#f5f5f5] mb-2">
                Let&apos;s build something together
              </h3>
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                Open to senior AI automation and networking roles, consulting
                engagements, and interesting side projects. Based remotely —
                available worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              {[
                {
                  icon: Github,
                  label: "GitHub",
                  value: "@wreyes",
                  href: socialLinks.github,
                },
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
              ].map((item) => (
                <Link
                  key={item.label}
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
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
