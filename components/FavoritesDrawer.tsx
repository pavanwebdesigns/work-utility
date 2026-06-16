"use client";

import Link from "next/link";
import { Star, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFavorites } from "@/lib/favorites-context";
import { useFavoritesDrawer } from "@/lib/favorites-drawer-context";
import { buildToolListing } from "@/lib/tool-categories";
import { useMemo } from "react";

export function FavoritesDrawer() {
  const { open, setOpen } = useFavoritesDrawer();
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteTools = useMemo(() => {
    const listing = buildToolListing();
    return listing.filter((tool) => favorites.includes(tool.slug));
  }, [favorites]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-brand-blue text-brand-blue" />
            <SheetTitle>My Favorites</SheetTitle>
          </div>
          <SheetClose />
        </SheetHeader>

        <SheetBody>
          {favoriteTools.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Star className="mb-4 h-10 w-10 text-content-muted" />
              <p className="font-medium text-content-primary">
                No favorites yet
              </p>
              <p className="mt-2 max-w-xs text-sm text-content-secondary">
                Tap &quot;Add to Favorites&quot; on any tool page to save it
                here for quick access.
              </p>
              <Link
                href="/tools"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
              >
                Browse all tools
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {favoriteTools.map((tool) => {
                const Icon = tool.icon;

                return (
                  <li
                    key={tool.slug}
                    className="flex items-start gap-3 rounded-xl border border-surface-border bg-surface-base/50 p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-elevated">
                      <Icon
                        className="h-5 w-5 text-content-primary"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={tool.href}
                        onClick={() => setOpen(false)}
                        className="block font-medium text-content-primary hover:text-brand-blue"
                      >
                        {tool.title}
                      </Link>
                      <p className="mt-0.5 line-clamp-2 text-xs text-content-muted">
                        {tool.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(tool.slug)}
                      className="shrink-0 rounded-lg p-2 text-content-muted transition-colors hover:bg-surface-elevated hover:text-red-400"
                      aria-label={`Remove ${tool.title} from favorites`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
