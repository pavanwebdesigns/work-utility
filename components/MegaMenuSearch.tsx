"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { ALL_TOOLS } from "@/lib/tools-data";

type MegaMenuSearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onClear: () => void;
  autoFocus?: boolean;
};

export function MegaMenuSearchBar({
  query,
  onQueryChange,
  onClear,
  autoFocus = false,
}: MegaMenuSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [autoFocus]);

  return (
    <div className="flex items-center gap-2 border-b border-surface-border px-4 py-3">
      <Search className="h-4 w-4 shrink-0 text-content-muted" aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={`Search ${ALL_TOOLS.length} tools...`}
        aria-label="Search tools in menu"
        className="min-w-0 flex-1 bg-transparent text-sm text-content-primary outline-none placeholder:text-content-muted"
      />
      {query.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="rounded-md p-1 text-content-muted transition-colors hover:bg-surface-elevated hover:text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
