import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-[#00d4ff] font-heading font-bold text-8xl mb-4">404</p>
        <h1 className="font-heading font-bold text-3xl text-[#f5f5f5] mb-4">
          Page Not Found
        </h1>
        <p className="text-[#a0a0a0] mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#00d4ff] text-[#0a0a0a] font-medium text-sm hover:bg-[#00d4ff]/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
