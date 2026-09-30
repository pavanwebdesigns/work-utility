"use client";

import { Star } from "lucide-react";
import { useFavorites } from "@/lib/favorites-context";

export function FavoriteButton({
  slug,
  variant = "default",
}: {
  slug: string;
  variant?: "default" | "icon";
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(slug);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => toggleFavorite(slug)}
        aria-label={active ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={active}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
          active
            ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
            : "border-surface-border bg-surface-card text-content-secondary hover:border-brand-blue hover:text-brand-blue"
        }`}
      >
        <Star className={`h-4 w-4 ${active ? "fill-brand-blue" : ""}`} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(slug)}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
          : "border-surface-border bg-surface-card text-content-secondary hover:border-brand-blue hover:text-brand-blue"
      }`}
    >
      <Star
        className={`h-3.5 w-3.5 ${active ? "fill-brand-blue" : ""}`}
      />
      {active ? "Favorited" : "Add to Favorites"}
    </button>
  );
}
