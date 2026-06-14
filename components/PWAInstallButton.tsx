"use client";

import { usePWAInstall } from "@/hooks/usePWAInstall";

type PWAInstallButtonProps = {
  className?: string;
};

export default function PWAInstallButton({ className = "" }: PWAInstallButtonProps) {
  const { canInstall, promptInstall } = usePWAInstall();

  if (!canInstall) return null;

  return (
    <button
      type="button"
      onClick={promptInstall}
      className={`flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-blue-light ${className}`}
    >
      📲 Install App
    </button>
  );
}
