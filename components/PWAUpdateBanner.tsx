"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useServiceWorkerUpdate } from "@/hooks/useServiceWorkerUpdate";

export default function PWAUpdateBanner() {
  const { updateAvailable, applyUpdate } = useServiceWorkerUpdate();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const onControllerChange = () => {
      if (refreshing) return;
      setRefreshing(true);
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      onControllerChange,
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange,
      );
    };
  }, [refreshing]);

  if (!updateAvailable) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[70] border-b border-surface-border bg-surface-elevated px-4 py-3 shadow-lg"
      role="region"
      aria-label="App update available"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <p className="flex-1 text-sm text-content-primary">
          New version available — tap to refresh
        </p>
        <button
          type="button"
          onClick={applyUpdate}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-blue-light"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          Refresh
        </button>
      </div>
    </div>
  );
}
