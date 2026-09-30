import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FavoriteButton } from "@/components/FavoriteButton";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { getToolGuideLink } from "@/lib/tool-guide-links";
import {
  getMenuCategoryForSlug,
  MENU_CATEGORY_META,
} from "@/lib/menu-categories";
import { getToolBySlug, getToolProcessing, TOOL_ICONS } from "@/lib/tools-data";
import type { ToolSeoSlug } from "@/lib/tool-seo-content";

const SITE = "https://workutilities.com";

type ToolShellProps = {
  slug: string;
  subtitle: string;
  /** Visible H1. Defaults to the registry name; pass the page's keyword heading. */
  h1?: string;
  children: ReactNode;
  /** Desktop right column. See U7. */
  aside?: ReactNode;
  /** Optional result / next-steps slot, rendered after the tool. */
  result?: ReactNode;
};

export function ToolShell({
  slug,
  subtitle,
  h1,
  children,
  aside,
  result,
}: ToolShellProps) {
  const tool = getToolBySlug(slug);
  if (!tool) {
    throw new Error(`ToolShell: unknown tool slug "${slug}"`);
  }

  const categoryId = getMenuCategoryForSlug(slug);
  const category = categoryId ? MENU_CATEGORY_META[categoryId] : null;
  const categoryHref = categoryId ? `/tools#${categoryId}` : "/tools";
  const Icon = TOOL_ICONS[tool.icon];
  const privacy =
    getToolProcessing(slug) === "server"
      ? "Processed on our server, deleted after"
      : "Runs in your browser";
  const guide = getToolGuideLink(slug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    ...(category ? [{ name: category.title, href: categoryHref }] : []),
    { name: tool.name, href: `/tools/${slug}` },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE}${crumb.href}`,
    })),
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
          />
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-content-secondary">
              {crumbs.map((crumb, index) => {
                const isCurrent = index === crumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <span aria-hidden="true" className="text-content-muted">
                        ›
                      </span>
                    )}
                    {isCurrent ? (
                      <span aria-current="page" className="text-content-primary">
                        {crumb.name}
                      </span>
                    ) : (
                      <a href={crumb.href} className="hover:text-content-primary">
                        {crumb.name}
                      </a>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="mt-4 flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tool.bgClass}`}
            >
              {Icon && (
                <Icon className={`h-5 w-5 ${tool.textClass}`} strokeWidth={1.75} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold leading-tight text-content-primary sm:text-2xl">
                {h1 ?? tool.name}
              </h1>
              <p className="mt-1 text-sm leading-snug text-content-secondary">
                {subtitle}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-surface-border bg-surface-card px-2.5 py-1 text-xs text-content-secondary">
                  {privacy}
                </span>
                <span className="rounded-full border border-surface-border bg-surface-card px-2.5 py-1 text-xs text-content-secondary">
                  Free · No signup
                </span>
                <FavoriteButton slug={slug} variant="icon" />
              </div>
            </div>
          </div>

          <div
            className={
              aside
                ? "mt-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8"
                : "mt-6"
            }
          >
            <div
              className={
                aside ? "min-w-0 lg:col-span-7" : "mx-auto min-w-0 max-w-3xl"
              }
            >
              {children}
              {result}
            </div>
            {aside ? (
              <aside className="mt-8 min-w-0 lg:col-span-5 lg:mt-0 lg:sticky lg:top-6">
                {aside}
              </aside>
            ) : null}
          </div>

          <RelatedTools currentSlug={slug} layout="scroll" guide={guide} />
          <ToolSeoContent slug={slug as ToolSeoSlug} />
          <ToolFeedback toolName={tool.name} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
