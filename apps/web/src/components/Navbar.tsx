import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        transparent
          ? "bg-transparent border-transparent"
          : "glass border-white/5"
      )}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
            <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Plai<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/upload"
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Upload
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="relative px-4 py-2 text-sm font-semibold text-white rounded-md bg-accent hover:bg-accent-light transition-colors overflow-hidden group"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
