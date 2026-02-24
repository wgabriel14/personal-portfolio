import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  as: Tag = "button",
  href,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]";

  const variants = {
    primary:
      "bg-[#00d4ff] text-[#0a0a0a] hover:bg-[#00d4ff]/90 hover:shadow-lg hover:shadow-[#00d4ff]/20",
    outline:
      "border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (Tag === "a" && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
