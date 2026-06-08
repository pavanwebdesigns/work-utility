import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogPostBySlug, blogPosts, getCategoryBadgeClass } from "../posts";
import AadhaarCardPhotoSizeContent from "../content/aadhaar-card-photo-size";
import HowToCompressPdfOnlineFreeContent from "../content/how-to-compress-pdf-online-free";
import ReduceImageSizeWithoutLosingQualityContent from "../content/reduce-image-size-without-losing-quality";
import ConvertPdfToWordFreeContent from "../content/convert-pdf-to-word-free";
import PassportSizePhotoDimensionsIndiaContent from "../content/passport-size-photo-dimensions-india";

const contentBySlug: Record<string, () => JSX.Element> = {
  "aadhaar-card-photo-size": AadhaarCardPhotoSizeContent,
  "how-to-compress-pdf-online-free": HowToCompressPdfOnlineFreeContent,
  "reduce-image-size-without-losing-quality":
    ReduceImageSizeWithoutLosingQualityContent,
  "convert-pdf-to-word-free": ConvertPdfToWordFreeContent,
  "passport-size-photo-dimensions-india":
    PassportSizePhotoDimensionsIndiaContent,
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Props = {
  params: { slug: string };
};

export default function BlogPostPage({ params }: Props) {
  const post = blogPostBySlug[params.slug];
  const Content = contentBySlug[params.slug];

  if (!post || !Content) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Guides
          </Link>

          <span
            className={`mt-8 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryBadgeClass(post.category)}`}
          >
            {post.category}
          </span>

          <h1 className="mb-4 mt-4 text-3xl font-bold leading-tight text-content-primary">
            {post.title}
          </h1>

          <p className="text-sm text-content-muted">
            {post.author} · {post.readTime} · Last updated {post.lastUpdated}
          </p>

          <hr className="my-8 border-surface-border" />

          <Content />

          <div className="mt-12 rounded-2xl border border-surface-border bg-surface-card p-6">
            <p className="mb-3 text-sm text-content-secondary">
              Ready to try it yourself?
            </p>
            <h3 className="mb-2 text-lg font-semibold text-content-primary">
              {post.cta.toolName} — Free & Private
            </h3>
            <p className="mb-4 text-sm text-content-secondary">
              No signup. No upload to server. Runs in your browser.
            </p>
            <Link
              href={post.cta.toolHref}
              className="inline-block rounded-xl bg-brand-blue px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
            >
              Try {post.cta.toolName} →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
