"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { MegaMenuSearchBar } from "@/components/MegaMenuSearch";
import { MegaMenuSearchResults } from "@/components/MegaMenuSearchResults";
import { MegaMenuCategoryList } from "@/components/MegaMenuCategoryList";
import { MegaMenuToolGrid } from "@/components/MegaMenuToolGrid";
import { useFavorites } from "@/lib/favorites-context";
import {
  ALL_TOOLS,
  getMegaMenuCategories,
} from "@/lib/tools-data";
import {
  getStoredMenuCategory,
  setStoredMenuCategory,
} from "@/lib/mega-menu-utils";
import type { MenuCategoryId } from "@/lib/menu-categories";

const MENU_HEIGHT_PX = 480;

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

type MegaMenuProps = {
  onNavigate?: () => void;
  onOpenFavorites?: () => void;
  onRequestClose?: () => void;
  autoFocusSearch?: boolean;
};

export function MegaMenu({
  onNavigate,
  onOpenFavorites,
  onRequestClose,
  autoFocusSearch = true,
}: MegaMenuProps) {
  const categories = useMemo(() => getMegaMenuCategories(), []);
  const { favorites } = useFavorites();

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<MenuCategoryId>("pdf");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 150);
  const isSearching = debouncedQuery.trim().length > 0;

  useEffect(() => {
    setSelectedCategoryId(getStoredMenuCategory());
  }, []);

  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ??
    categories[0];

  const handleSelectCategory = (id: MenuCategoryId) => {
    setSelectedCategoryId(id);
    setStoredMenuCategory(id);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (searchQuery.trim().length > 0) {
        event.preventDefault();
        event.stopPropagation();
        handleClearSearch();
        return;
      }

      onRequestClose?.();
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [onRequestClose, searchQuery]);

  return (
    <nav
      aria-label="Tools navigation"
      className="overflow-hidden rounded-2xl border border-surface-border bg-surface-card shadow-2xl shadow-black/40 transition-all duration-200 ease-out"
    >
      <MegaMenuSearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClear={handleClearSearch}
        autoFocus={autoFocusSearch}
      />

      {isSearching ? (
        <MegaMenuSearchResults
          query={debouncedQuery}
          onNavigate={onNavigate}
          className="max-h-[480px]"
        />
      ) : (
        <div
          className="flex"
          style={{ height: MENU_HEIGHT_PX }}
          role="menu"
        >
          <MegaMenuCategoryList
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
          />
          {selectedCategory && (
            <MegaMenuToolGrid
              category={selectedCategory}
              onNavigate={onNavigate}
            />
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-surface-border px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs text-content-muted">
          {ALL_TOOLS.length} free tools — no signup required
        </span>
        <div className="flex flex-wrap items-center gap-4">
          {favorites.length > 0 && (
            <button
              type="button"
              role="menuitem"
              className="flex items-center gap-1 text-xs text-brand-blue transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              onClick={() => {
                onNavigate?.();
                onOpenFavorites?.();
              }}
            >
              <Star className="h-3 w-3 fill-brand-blue" aria-hidden="true" />
              Favorites
            </button>
          )}
          <Link
            href="/tools"
            role="menuitem"
            className="flex items-center gap-1 text-xs text-brand-blue transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            onClick={onNavigate}
          >
            View All Tools
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

/** @deprecated Use MegaMenu — kept for gradual migration */
export function MegaMenuDesktop(props: MegaMenuProps) {
  return <MegaMenu {...props} />;
}

export { MegaMenuCategoryList, MegaMenuToolGrid, MegaMenuSearchBar };
