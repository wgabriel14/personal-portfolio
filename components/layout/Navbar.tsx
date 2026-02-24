"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/lib/data";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-[#1e1e1e]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-bold text-lg text-[#f5f5f5] hover:text-[#00d4ff] transition-colors"
        >
          WR<span className="text-[#00d4ff]">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#00d4ff]",
                  activeSection === link.href.slice(1)
                    ? "text-[#00d4ff]"
                    : "text-[#a0a0a0]"
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a0a0a0] hover:text-[#00d4ff] transition-colors text-sm"
          >
            GitHub
          </Link>
          <a
            href={`mailto:${socialLinks.email}`}
            className="px-4 py-1.5 rounded-full border border-[#00d4ff] text-[#00d4ff] text-sm font-medium hover:bg-[#00d4ff]/10 transition-colors"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-b border-[#1e1e1e] px-6 pb-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#00d4ff] block w-full text-left",
                    activeSection === link.href.slice(1)
                      ? "text-[#00d4ff]"
                      : "text-[#a0a0a0]"
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${socialLinks.email}`}
                className="inline-block mt-2 px-4 py-2 rounded-full border border-[#00d4ff] text-[#00d4ff] text-sm font-medium hover:bg-[#00d4ff]/10 transition-colors"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
