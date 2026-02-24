import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks, siteMetadata } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="font-heading font-bold text-lg text-[#f5f5f5]">
              Williams Reyes<span className="text-[#00d4ff]">.</span>
            </p>
            <p className="text-[#a0a0a0] text-sm mt-1">
              AI &amp; Network Automation Engineer
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["About", "Skills", "Experience", "Projects", "Blog", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#a0a0a0] text-sm hover:text-[#00d4ff] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <Link
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#a0a0a0] hover:text-[#00d4ff] transition-colors"
            >
              <Github size={18} />
            </Link>
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#a0a0a0] hover:text-[#00d4ff] transition-colors"
            >
              <Linkedin size={18} />
            </Link>
            <a
              href={`mailto:${socialLinks.email}`}
              aria-label="Email"
              className="text-[#a0a0a0] hover:text-[#00d4ff] transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1e1e1e] text-center">
          <p className="text-[#a0a0a0] text-xs">
            © {year} {siteMetadata.name}. Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
