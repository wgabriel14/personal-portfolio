import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-[#1e1e1e] text-[#a0a0a0] hover:text-[#f5f5f5] hover:bg-[#2a2a2a]",
    accent: "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20",
    outline: "border border-[#1e1e1e] text-[#a0a0a0]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
