"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

type CopyValueButtonProps = {
  value: string;
  label?: string;
  className?: string;
};

export function CopyValueButton({
  value,
  label = "Copy",
  className = "",
}: CopyValueButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className={`inline-flex items-center gap-1 rounded-lg border border-surface-border bg-surface-card px-2 py-1 text-xs text-content-secondary transition-colors hover:border-brand-blue/40 hover:text-brand-blue ${className}`}
    >
      <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
      {copied ? "Copied!" : label}
    </button>
  );
}
