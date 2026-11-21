import type { Metadata } from "next";
import { buildOpenGraph, withRobots } from "@/lib/seo";
import { ToolCard } from "@/components/ToolCard";
import { ToolsPageClient } from "@/components/ToolsPageClient";
import { ALL_TOOLS } from "@/lib/tools-data";
import { CORE_TOOLS } from "@/lib/index-policy";
import {
  MENU_CATEGORY_META,
  MENU_CATEGORY_ORDER,
  type MenuCategoryId,
} from "@/lib/menu-categories";
import {
  buildToolListing,
  getToolPageCategoryLabel,
  type ToolListingItem,
} from "@/lib/tool-categories";

const TOOLS_TITLE = "Free Online Tools — PDF, Image & Finance | WorkUtilities";
const TOOLS_DESCRIPTION = `Browse ${ALL_TOOLS.length} free online tools for PDF, images, documents, finance, students, and everyday utilities. No signup required.`;

export const metadata: Metadata = withRobots("https://workutilities.com/tools", {
  title: { absolute: TOOLS_TITLE },
  description: TOOLS_DESCRIPTION,
  alternates: { canonical: "https://workutilities.com/tools" },
  openGraph: buildOpenGraph({
    title: TOOLS_TITLE,
    description: TOOLS_DESCRIPTION,
    url: "https://workutilities.com/tools",
    type: "website",
  }),
});

function ToolGrid({ tools }: { tools: ToolListingItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <div
          key={tool.href}
          className="w-full min-w-0"
          data-tool-card
          data-category={tool.pageCategory ?? ""}
          data-search={`${tool.title} ${tool.description} ${getToolPageCategoryLabel(tool.slug)} ${
            ALL_TOOLS.find((item) => item.slug === tool.slug)?.category ?? ""
          }`.toLowerCase()}
        >
          <ToolCard
            title={tool.title}
            description={tool.description}
            href={tool.href}
            icon={tool.icon}
            accent={tool.accent}
            popular={tool.popular}
            comingSoon={tool.comingSoon}
          />
        </div>
      ))}
    </div>
  );
}

function CategorySection({
  id,
  label,
  tools,
}: {
  id: string;
  label: string;
  tools: ToolListingItem[];
}) {
  if (tools.length === 0) return null;

  return (
    <section
      id={id}
      className="mb-10 scroll-mt-20"
      data-tool-section
      data-section-id={id}
    >
      <h2 className="mb-4 text-left text-[11px] font-semibold tracking-[2px] text-content-muted">
        {label}
      </h2>
      <ToolGrid tools={tools} />
    </section>
  );
}

function MoreUtilities({ tools }: { tools: ToolListingItem[] }) {
  if (tools.length === 0) return null;

  return (
    <section
      id="more"
      className="mb-10 scroll-mt-20"
      data-tool-section
      data-section-id="more"
    >
      <details className="rounded-2xl border border-dashed border-surface-border bg-surface-base/50 p-4 sm:p-5">
        <summary className="cursor-pointer text-[11px] font-semibold tracking-[2px] text-content-muted">
          MORE UTILITIES ({tools.length})
        </summary>
        <ul className="mt-4 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
          {tools.map((tool) => (
            <li
              key={tool.href}
              className="mb-2 break-inside-avoid"
              data-tool-card
              data-category={tool.pageCategory ?? ""}
              data-search={`${tool.title} ${tool.description} ${getToolPageCategoryLabel(tool.slug)} ${
                ALL_TOOLS.find((item) => item.slug === tool.slug)?.category ?? ""
              }`.toLowerCase()}
            >
              <a
                href={tool.href}
                className="text-sm text-content-secondary transition-colors hover:text-brand-blue hover:underline"
              >
                {tool.title}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

function ToolDirectory() {
  const listing = buildToolListing();
  const core = listing.filter((tool) => CORE_TOOLS.has(tool.slug));
  const moreUtilities = listing.filter((tool) => !CORE_TOOLS.has(tool.slug));
  const grouped = new Map<MenuCategoryId, ToolListingItem[]>();

  for (const id of MENU_CATEGORY_ORDER) {
    grouped.set(id, []);
  }

  const uncategorized: ToolListingItem[] = [];
  for (const tool of core) {
    if (tool.pageCategory && grouped.has(tool.pageCategory)) {
      grouped.get(tool.pageCategory)!.push(tool);
    } else {
      uncategorized.push(tool);
    }
  }

  return (
    <>
      {MENU_CATEGORY_ORDER.map((id) => (
        <CategorySection
          key={id}
          id={id}
          label={MENU_CATEGORY_META[id].title.toUpperCase()}
          tools={grouped.get(id) ?? []}
        />
      ))}
      <CategorySection id="other" label="OTHER TOOLS" tools={uncategorized} />
      <MoreUtilities tools={moreUtilities} />
    </>
  );
}

export default function ToolsPage() {
  return (
    <ToolsPageClient>
      <ToolDirectory />
    </ToolsPageClient>
  );
}
