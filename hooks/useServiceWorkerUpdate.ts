"use client";

import { useCallback, useEffect, useState } from "react";

export function useServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );

  const markWaitingWorker = useCallback(
    (registration: ServiceWorkerRegistration) => {
      if (!navigator.serviceWorker.controller || !registration.waiting) {
        return;
      }
      setWaitingWorker(registration.waiting);
      setUpdateAvailable(true);
    },
    [],
  );

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let registration: ServiceWorkerRegistration | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;

    const onUpdateFound = () => {
      const installing = registration?.installing;
      if (!installing) return;

      installing.addEventListener("statechange", () => {
        if (
          installing.state === "installed" &&
          navigator.serviceWorker.controller &&
          registration
        ) {
          markWaitingWorker(registration);
        }
      });
    };

    const checkForUpdates = () => {
      registration?.update().catch(() => undefined);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkForUpdates();
      }
    };

    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .then((reg) => {
        registration = reg;
        markWaitingWorker(reg);
        reg.addEventListener("updatefound", onUpdateFound);

        document.addEventListener("visibilitychange", onVisibilityChange);
        window.addEventListener("focus", checkForUpdates);
        interval = setInterval(checkForUpdates, 60 * 60 * 1000);
      })
      .catch((err) => {
        console.warn("Service worker registration failed:", err);
      });

    return () => {
      registration?.removeEventListener("updatefound", onUpdateFound);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", checkForUpdates);
      if (interval) clearInterval(interval);
    };
  }, [markWaitingWorker]);

  const applyUpdate = useCallback(() => {
    if (!waitingWorker) return;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  }, [waitingWorker]);

  return { updateAvailable, applyUpdate };
}
