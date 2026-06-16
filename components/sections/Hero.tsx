"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Play, Pause, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { socialLinks } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  // useCallback with [] keeps this ref stable across re-renders. Without it, React
  // recreates the function every render, re-runs the ref callback, and resets muted=true
  // after every state change (undoing any unmute the user just clicked).
  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    if (el) {
      el.muted = false;
      videoRef.current = el;
      el.addEventListener("ended", () => setPlaying(false));
      el.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00d4ff]/5 blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0080ff]/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text content */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Pre-headline */}
            <motion.div variants={item} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-medium font-heading tracking-widest uppercase">
                Available for opportunities
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={item}
              className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-[#f5f5f5] leading-tight mb-4"
            >
              Williams
              <br />
              <span className="gradient-text">Reyes</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-[#a0a0a0] font-medium mb-4"
            >
              AI &amp; Network Automation Engineer
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="text-base md:text-lg text-[#a0a0a0] max-w-xl leading-relaxed mb-10"
            >
              Building intelligent systems at the intersection of AI and enterprise
              networking. Electronics Engineer (BSc) specializing in conversational
              AI agents, LLM integration, and network automation.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" onClick={handleScrollToProjects}>
                View Projects
              </Button>
              <Button size="lg" variant="outline" onClick={handleScrollToContact}>
                Contact Me
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-6">
              <Link
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#a0a0a0] hover:text-[#00d4ff] transition-colors text-sm"
                aria-label="GitHub"
              >
                <Github size={18} />
                <span className="hidden sm:inline">GitHub</span>
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#a0a0a0] hover:text-[#00d4ff] transition-colors text-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
                <span className="hidden sm:inline">LinkedIn</span>
              </Link>
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-2 text-[#a0a0a0] hover:text-[#00d4ff] transition-colors text-sm"
                aria-label="Email"
              >
                <Mail size={18} />
                <span className="hidden sm:inline">Email</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: video */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/10"
          >
            <video
              ref={setVideoRef}
              className="w-full h-full object-cover"
              src="/videos/WilliamsReyes-Portfolio-Video.mp4"
              playsInline
            />

            {/* Video controls */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 transition-colors"
                aria-label={muted ? "Unmute video" : "Mute video"}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 transition-colors"
                aria-label={playing ? "Pause video" : "Play video"}
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#a0a0a0]"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
