import Link from "next/link";
import { Package, Shield, Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomePageTools } from "@/components/HomePageTools";
import {
  getBlogPostsForListing,
  getCategoryBadgeClass,
} from "@/app/blog/posts";
import { ALL_TOOLS } from "@/lib/tools-data";

function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-4 py-1.5 text-xs text-content-secondary">
      <span className="text-[8px] text-emerald-400">●</span>
      {children}
    </span>
  );
}

function WhyWorkUtilities() {
  const reasons = [
    {
      icon: Shield,
      title: "Most tools process data locally",
      description:
        "Most tools process data locally. Some tools (PDF Compress, PDF to Word, PDF to JPG, PDF Unlock) use secure server processing.",
    },
    {
      icon: Package,
      title: `${ALL_TOOLS.length}+ tools, one tab`,
      description:
        "PDF editing, image tools, finance calculators, developer utilities — stop switching between Smallpdf, WordCounter, Calculator.net, and 15 other sites.",
    },
    {
      icon: Zap,
      title: "Free, forever, no catch",
      description:
        'No signup. No fake "Download" buttons. No premium tier hiding basic features. Just tools that work.',
    },
  ];

  return (
    <section className="border-b border-surface-border bg-surface-base px-4 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-center text-lg font-semibold text-content-primary sm:text-xl">
          Why WorkUtilities?
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-surface-border bg-surface-card p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10">
                <reason.icon
                  className="h-5 w-5 text-brand-blue"
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="font-semibold text-content-primary">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: `${ALL_TOOLS.length}+ Tools`, label: "Available now" },
    { value: "Instant", label: "Most tools need no upload — runs in your browser" },
    { value: "Free Forever", label: "No hidden fees" },
  ];

  return (
    <section className="border-y border-surface-border bg-surface-card">
      <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-surface-border">
        {stats.map((stat) => (
          <div key={stat.value} className="px-2 py-7 text-center sm:py-7">
            <p className="text-xl font-extrabold text-content-primary sm:text-[28px]">
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] text-content-muted sm:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const featuredPosts = getBlogPostsForListing().slice(0, 3);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />

      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <section className="relative bg-surface-base px-4 pb-[60px] pt-12 text-center sm:px-10">
          <div className="relative mx-auto max-w-4xl">
            <h1 className="wu-gradient-text text-balance text-3xl md:text-5xl">
              Free tools that
              <br />
              just work.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-content-secondary sm:text-lg">
              One site for all your tools — instead of bookmarking 20 different
              websites. Everything free, most tools run in your browser.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <TrustBadge>🔒 Most tools run privately in your browser</TrustBadge>
              <TrustBadge>✅ Always Free</TrustBadge>
            </div>
            <div className="mt-6">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
              >
                Try all tools free →
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
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
          <div className="mx-auto mt-16 max-w-3xl hero-gradient-line" />
        </section>

        <WhyWorkUtilities />

        <HomePageTools />

        <StatsBar />

        <section className="border-t border-surface-border bg-surface-base px-4 py-12 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-content-primary sm:text-2xl">
                From the Blog
              </h2>
              <Link
                href="/blog"
                className="cursor-pointer text-sm text-brand-blue transition-colors hover:underline"
              >
                View all guides →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block cursor-pointer rounded-xl border border-surface-border bg-surface-card p-5 transition-colors hover:border-brand-blue"
                >
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryBadgeClass(post.category)}`}
                  >
                    {post.category}
                  </span>
                  <h3 className="mt-3 font-semibold text-content-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-content-muted">
                    {post.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-surface-border bg-surface-card py-8 text-center">
          <p className="text-content-secondary">
            Can&apos;t find the tool you need?
          </p>
          <p className="mt-2 text-content-secondary">
            <Link
              href="/contact"
              className="cursor-pointer text-brand-blue transition-colors hover:underline"
            >
              Tell us what to build next →
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
