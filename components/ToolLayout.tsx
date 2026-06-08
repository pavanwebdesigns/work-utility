import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface ToolLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, children }: ToolLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1 text-sm text-brand-blue transition-colors hover:text-brand-blue-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Link>
          <h2 className="mb-6">{title}</h2>
          <div className="mb-8 rounded-2xl border border-dashed border-surface-border bg-surface-card px-4 py-3 text-center text-xs text-content-muted">
            Ad space
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
