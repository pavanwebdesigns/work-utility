"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  FileDown,
  Menu,
  Wrench,
  X,
} from "lucide-react";
import { ALL_TOOLS, getHeaderMenuCategories, TOOL_ICONS } from "@/lib/tools-data";

const headerMenuCategories = getHeaderMenuCategories();
const [pdfMenuCategory, imageMenuCategory, utilityMenuCategory] =
  headerMenuCategories;

type Tool = (typeof ALL_TOOLS)[number];

type HeaderMenuTool = {
  tool: Tool;
  displayName?: string;
};

function ToolMenuLink({
  tool,
  displayName,
  onNavigate,
  compact = false,
}: {
  tool: Tool;
  displayName?: string;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const Icon = TOOL_ICONS[tool.icon];

  return (
    <Link
      href={tool.href}
      role="menuitem"
      onClick={onNavigate}
      className={`group flex items-center rounded-xl transition-colors hover:bg-surface-elevated ${
        compact
          ? "gap-2 px-2 py-2 lg:shrink-0 xl:gap-3 xl:px-3 xl:py-2.5"
          : "gap-2 px-2 py-2 md:gap-3 md:px-3 md:py-2.5"
      }`}
    >
      <div
        className={`flex flex-shrink-0 items-center justify-center rounded-lg ${tool.bgClass} ${
          compact ? "h-7 w-7 xl:h-8 xl:w-8" : "h-7 w-7 md:h-8 md:w-8"
        }`}
      >
        <Icon
          className={`h-3.5 w-3.5 md:h-4 md:w-4 ${tool.textClass} ${
            compact ? "xl:h-4 xl:w-4" : ""
          }`}
          strokeWidth={1.75}
        />
      </div>
      <div className="min-w-0">
        <div
          className={`font-medium text-content-primary transition-colors group-hover:text-white ${
            compact ? "text-xs xl:text-sm" : "text-xs md:text-sm"
          }`}
        >
          {displayName ?? tool.name}
        </div>
        <div className="hidden text-xs text-content-muted min-[1200px]:block">
          {tool.description}
        </div>
      </div>
    </Link>
  );
}

function ToolCategorySection({
  title,
  icon: CategoryIcon,
  iconClassName,
  tools,
  onNavigate,
  horizontal = false,
  className = "",
}: {
  title: string;
  icon: typeof FileDown | typeof Wrench;
  iconClassName: string;
  tools: HeaderMenuTool[];
  onNavigate?: () => void;
  horizontal?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center gap-2 border-b border-surface-border pb-2 md:mb-3">
        <CategoryIcon className={`h-4 w-4 ${iconClassName}`} strokeWidth={1.75} />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-content-muted md:text-xs">
          {title}
        </span>
      </div>
      <div
        className={
          horizontal
            ? "flex flex-wrap gap-1 lg:gap-2 xl:block xl:space-y-0.5"
            : "space-y-0.5"
        }
      >
        {tools.map(({ tool, displayName }) => (
          <ToolMenuLink
            key={tool.slug}
            tool={tool}
            displayName={displayName}
            onNavigate={onNavigate}
            compact={horizontal}
          />
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    closeMenus();
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflowX = document.body.style.overflowX;
    document.body.style.overflowX = "hidden";

    const handleMouseDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.body.style.overflowX = previousOverflowX;
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-surface-border bg-surface-base/85 backdrop-blur-md md:h-16">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="cursor-pointer"
              aria-label="WorkUtilities home"
            >
              <Image
                src="/logo-light.svg"
                alt="WorkUtilities"
                width={120}
                height={32}
                className="max-h-8 w-auto"
                priority
              />
            </Link>
            <span
              className="hidden text-[13px] md:inline"
              style={{ color: "#1F2D45" }}
            >
              |
            </span>
            <span className="hidden text-sm text-content-secondary md:block">
              Your everyday productivity workspace
            </span>
          </div>

          <nav
            className="hidden items-center gap-6 md:flex"
            role="navigation"
            aria-label="Main navigation"
          >
            <div
              ref={menuRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
                aria-label="Browse tools"
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                Tools
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMenuOpen && (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="fixed left-0 right-0 top-14 z-50 max-w-[100vw] overflow-x-hidden px-4 pt-2 sm:px-6 md:top-16 lg:px-8 xl:px-10"
                >
                  <div className="mx-auto w-full max-w-[920px] overflow-hidden">
                    <div
                      role="menu"
                      aria-label="Tools menu"
                      className="rounded-2xl border border-surface-border bg-surface-card p-4 shadow-2xl shadow-black/40 md:p-5 xl:p-6"
                    >
                      <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-3 xl:gap-6">
                        {[pdfMenuCategory, imageMenuCategory].map((category) => {
                          const CategoryIcon =
                            category.icon === "Wrench"
                              ? Wrench
                              : TOOL_ICONS[category.icon];

                          return (
                            <ToolCategorySection
                              key={category.title}
                              title={category.title}
                              icon={CategoryIcon}
                              iconClassName={category.iconClassName}
                              tools={category.tools}
                              onNavigate={() => setIsMenuOpen(false)}
                              className="min-w-0"
                            />
                          );
                        })}

                        {utilityMenuCategory && (() => {
                          const UtilityIcon =
                            utilityMenuCategory.icon === "Wrench"
                              ? Wrench
                              : TOOL_ICONS[utilityMenuCategory.icon];

                          return (
                            <ToolCategorySection
                              title={utilityMenuCategory.title}
                              icon={UtilityIcon}
                              iconClassName={utilityMenuCategory.iconClassName}
                              tools={utilityMenuCategory.tools}
                              onNavigate={() => setIsMenuOpen(false)}
                              horizontal
                              className="col-span-2 min-w-0 xl:col-span-1"
                            />
                          );
                        })()}
                      </div>

                      <div className="mt-3 flex flex-col gap-3 border-t border-surface-border pt-3 md:mt-4 md:flex-row md:items-center md:justify-between md:pt-4">
                        <span className="text-[11px] text-content-muted md:text-xs">
                          {ALL_TOOLS.length} free tools — no signup required
                        </span>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                          <Link
                            href="/"
                            role="menuitem"
                            className="flex cursor-pointer items-center gap-1 text-[11px] text-brand-blue hover:underline md:text-xs"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            View All Tools
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                          <Link
                            href="/contact"
                            role="menuitem"
                            className="flex cursor-pointer items-center gap-1 text-[11px] text-content-secondary transition-colors hover:text-content-primary md:text-xs"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Suggest a Tool
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="cursor-pointer text-sm text-content-secondary transition-colors hover:text-content-primary"
              aria-label="Guides and blog"
            >
              Guides
            </Link>
          </nav>

          <button
            type="button"
            className="cursor-pointer md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <Menu className="h-6 w-6 text-content-primary" />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-surface-base md:hidden">
          <div className="flex items-center justify-between border-b border-surface-border p-4">
            <Link
              href="/"
              aria-label="WorkUtilities home"
              onClick={closeMenus}
            >
              <Image
                src="/logo-light.svg"
                alt="WorkUtilities"
                width={120}
                height={32}
                className="max-h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              className="cursor-pointer"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6 text-content-primary" />
            </button>
          </div>

          <div className="p-6">
            {headerMenuCategories.map((category, index) => {
              const CategoryIcon =
                category.icon === "Wrench"
                  ? Wrench
                  : TOOL_ICONS[category.icon];

              return (
                <div key={category.title} className={index > 0 ? "mt-8" : undefined}>
                  <ToolCategorySection
                    title={category.title}
                    icon={CategoryIcon}
                    iconClassName={category.iconClassName}
                    tools={category.tools}
                    onNavigate={closeMenus}
                  />
                </div>
              );
            })}

            <div className="mt-8 space-y-3 border-t border-surface-border pt-6">
              <Link
                href="/blog"
                className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-content-primary transition-colors hover:bg-surface-elevated"
                onClick={closeMenus}
              >
                Guides
                <ArrowRight className="h-4 w-4 text-content-muted" />
              </Link>
              <Link
                href="/"
                className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-brand-blue transition-colors hover:bg-surface-elevated"
                onClick={closeMenus}
              >
                All Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-content-secondary transition-colors hover:bg-surface-elevated hover:text-content-primary"
                onClick={closeMenus}
              >
                Suggest a Tool
                <ArrowRight className="h-4 w-4 text-content-muted" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
