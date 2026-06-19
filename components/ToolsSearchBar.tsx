import { Search, X } from "lucide-react";

type ToolsSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  className?: string;
};

export function ToolsSearchBar({
  value,
  onChange,
  onClear,
  className = "",
}: ToolsSearchBarProps) {
  const isSearching = value.trim().length > 0;

  return (
    <div
      className={`mx-auto mb-8 flex max-w-2xl items-center gap-3 rounded-xl border border-surface-border bg-surface-card px-4 py-3 ${className}`}
    >
      <Search
        className="h-[18px] w-[18px] shrink-0 text-content-muted"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tools..."
        aria-label="Search tools"
        className="flex-1 bg-transparent text-sm text-content-primary outline-none placeholder:text-content-muted"
      />
      {isSearching && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="cursor-pointer text-content-muted transition-colors hover:text-content-primary"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
