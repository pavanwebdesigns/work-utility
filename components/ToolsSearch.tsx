"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchTools } from "@/lib/tool-categories";
import { SoonBadge } from "@/components/SoonBadge";

type ToolsSearchProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ToolsSearch({ isOpen, onClose }: ToolsSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchTools(query);
  const trimmedQuery = query.trim();

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
      onClick={onClose}
    >
      <div
        className="mx-auto flex h-full max-w-5xl flex-col px-4 pb-8 pt-6 sm:px-6 sm:pt-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="rounded-2xl border border-surface-border bg-surface-card shadow-2xl shadow-black/40">
          <div className="flex items-center gap-3 border-b border-surface-border px-4 py-4 sm:px-5">
            <Search className="h-5 w-5 shrink-0 text-content-muted" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search 29 tools..."
              aria-label="Search tools"
              className="flex-1 bg-transparent text-base text-content-primary outline-none placeholder:text-content-muted"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="rounded-lg p-1 text-content-muted transition-colors hover:bg-surface-elevated hover:text-content-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[min(70vh,640px)] overflow-y-auto p-4 sm:p-5">
            {trimmedQuery.length === 0 ? (
              <p className="py-8 text-center text-sm text-content-muted">
                Start typing to search tools by name, description, or category
              </p>
            ) : results.length === 0 ? (
              <p className="py-8 text-center text-sm text-content-secondary">
                No tools found for &apos;{trimmedQuery}&apos;
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      onClick={onClose}
                      className={`group flex gap-3 rounded-xl border border-surface-border bg-surface-base/50 p-3 transition-all hover:border-brand-blue hover:bg-surface-elevated ${
                        tool.comingSoon ? "opacity-70 hover:opacity-100" : ""
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-elevated`}
                      >
                        <Icon
                          className="h-5 w-5 text-content-primary"
                          strokeWidth={1.75}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-content-primary group-hover:text-white">
                            {tool.title}
                          </span>
                          {tool.comingSoon && <SoonBadge />}
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-xs text-content-muted">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
