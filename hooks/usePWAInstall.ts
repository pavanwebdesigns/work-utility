"use client";

import { useCallback, useSyncExternalStore } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let listeners = new Set<() => void>();
let listenersInitialized = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getCanInstall() {
  return deferredPrompt !== null;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function initListeners() {
  if (listenersInitialized || typeof window === "undefined") return;
  listenersInitialized = true;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    notifyListeners();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    notifyListeners();
  });
}

initListeners();

export function usePWAInstall() {
  const canInstall = useSyncExternalStore(
    subscribe,
    getCanInstall,
    () => false,
  );

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    deferredPrompt = null;
    notifyListeners();

    if (outcome === "accepted") {
      notifyListeners();
    }
  }, []);

  return { canInstall, promptInstall };
}
