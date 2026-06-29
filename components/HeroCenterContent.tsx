import Link from "next/link";
import { ALL_TOOLS } from "@/lib/tools-data";

function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-4 py-1.5 text-xs text-content-secondary">
      <span className="text-[8px] text-emerald-400">●</span>
      {children}
    </span>
  );
}

export function HeroCenterContent({ glass = false }: { glass?: boolean }) {
  return (
    <div className={glass ? "wf-panel" : "hero-center-content"}>
      <div className="hero-badge">⚡ {ALL_TOOLS.length} free tools</div>
      <h1 className="wu-gradient-text text-balance text-3xl md:text-5xl">
        Free tools that
        <br />
        just work.
      </h1>
      <p className="hero-subtitle mx-auto mt-5 max-w-2xl text-base text-content-secondary sm:text-lg">
        One site for all your tools — instead of bookmarking 20 different
        websites. Everything free, everything in your browser.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <TrustBadge>🔒 100% Private</TrustBadge>
        <TrustBadge>⚡ Browser-only</TrustBadge>
        <TrustBadge>✅ Always Free</TrustBadge>
      </div>
      <div className="mt-6">
        <Link
          href="/tools"
          className="hero-cta inline-flex items-center justify-center rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
        >
          Browse all tools →
        </Link>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2 pb-2">
        <span className="mr-1 text-xs text-content-muted">Popular:</span>
        {[
          { label: "Compress PDF", href: "/tools/pdf-compress" },
          { label: "Aadhaar Photo Resize", href: "/tools/photo-resizer" },
          { label: "Image Compress", href: "/tools/image-compress" },
          { label: "PDF to Word", href: "/tools/pdf-to-word" },
          { label: "Word to PDF", href: "/tools/word-to-pdf" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="cursor-pointer rounded-full border border-surface-border bg-surface-card px-3 py-1.5 text-xs text-content-secondary transition-all hover:border-brand-blue hover:text-brand-blue"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
