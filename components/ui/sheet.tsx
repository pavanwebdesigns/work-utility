"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SheetContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("Sheet components must be used within Sheet");
  return ctx;
}

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetContent({
  side = "right",
  className,
  children,
}: {
  side?: "right" | "left";
  className?: string;
  children: React.ReactNode;
}) {
  const { open, onOpenChange } = useSheetContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onOpenChange]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute top-0 flex h-full w-full flex-col border-surface-border bg-surface-card shadow-2xl sm:max-w-md",
          side === "right" ? "right-0 border-l" : "left-0 border-r",
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function SheetHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-surface-border px-5 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SheetTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className={cn("text-lg font-semibold text-content-primary", className)}>
      {children}
    </h2>
  );
}

export function SheetClose({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const { onOpenChange } = useSheetContext();
  return (
    <button
      type="button"
      onClick={() => {
        onOpenChange(false);
        onClick?.();
      }}
      className={cn(
        "rounded-lg p-1.5 text-content-muted transition-colors hover:bg-surface-elevated hover:text-content-primary",
        className,
      )}
      aria-label="Close"
    >
      <X className="h-5 w-5" />
    </button>
  );
}

export function SheetBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex-1 overflow-y-auto px-5 py-4", className)}>
      {children}
    </div>
  );
}
