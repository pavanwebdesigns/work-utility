"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

const DISMISS_KEY = "pwa-install-banner-dismissed";

export default function PWAInstallBanner() {
  const { canInstall, promptInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "true");
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setDismissed(true);
  };

  const handleInstall = async () => {
    await promptInstall();
    handleDismiss();
  };

  if (!canInstall || dismissed) return null;

  return (
    <div
      className="animate-slide-up fixed bottom-0 left-0 right-0 z-[60] border-t border-surface-border bg-surface-elevated p-4 shadow-lg md:hidden"
      role="region"
      aria-label="Install WorkUtilities app"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <p className="flex-1 text-sm text-content-primary">
          📲 Install WorkUtilities for quick access
        </p>
        <button
          type="button"
          onClick={handleInstall}
          className="shrink-0 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-blue-light"
        >
          Install
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 rounded-lg p-2 text-content-muted transition hover:bg-surface-card hover:text-content-primary"
          aria-label="Dismiss install banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
