"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, MonitorSmartphone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  formatDeviceReport,
  getDeviceInfo,
  type DeviceInfoReport,
} from "@/lib/device-info";

const ROWS: { key: keyof DeviceInfoReport; label: string }[] = [
  { key: "browser", label: "Browser" },
  { key: "browserVersion", label: "Browser version" },
  { key: "os", label: "Operating system" },
  { key: "platform", label: "Platform" },
  { key: "language", label: "Language" },
  { key: "languages", label: "Languages" },
  { key: "screenResolution", label: "Screen resolution" },
  { key: "viewportSize", label: "Viewport size" },
  { key: "devicePixelRatio", label: "Device pixel ratio" },
  { key: "colorDepth", label: "Color depth" },
  { key: "timezone", label: "Timezone" },
  { key: "online", label: "Online" },
  { key: "touchSupport", label: "Touch support" },
  { key: "cookiesEnabled", label: "Cookies enabled" },
  { key: "hardwareConcurrency", label: "CPU cores" },
];

export default function DeviceInfoPage() {
  const [info, setInfo] = useState<DeviceInfoReport | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setInfo(getDeviceInfo());
    const onResize = () => setInfo(getDeviceInfo());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const formatValue = (key: keyof DeviceInfoReport, value: DeviceInfoReport[keyof DeviceInfoReport]) => {
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (key === "browser") return `${info?.browser} ${info?.browserVersion}`;
    if (key === "browserVersion") return null;
    if (key === "colorDepth") return `${value}-bit`;
    return String(value);
  };

  const handleCopy = async () => {
    if (!info) return;
    await navigator.clipboard.writeText(formatDeviceReport(info));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <MonitorSmartphone className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Device & Browser Info Checker Online Free</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">View your browser, OS, screen, and viewport details. Copy the full report for bug reports.</p>
            <div className="mt-4 flex justify-center"><FavoriteButton slug="device-info" /></div>
          </div>

          {info && (
            <div className="mt-10 space-y-4">
              <div className="rounded-xl border border-surface-border bg-surface-card divide-y divide-surface-border">
                {ROWS.map(({ key, label }) => {
                  if (key === "browserVersion") return null;
                  const value = formatValue(key, info[key]);
                  if (value === null) return null;
                  return (
                    <div key={key} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                      <span className="text-sm text-content-muted">{label}</span>
                      <span className="text-sm font-medium text-content-primary sm:text-right break-all">{value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                <p className="mb-2 text-sm font-medium text-content-primary">User agent</p>
                <p className="break-all font-mono text-xs text-content-secondary">{info.userAgent}</p>
              </div>

              <button type="button" onClick={handleCopy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue/90">
                {copied ? <><Check className="h-4 w-4" /> Copied report</> : <><Copy className="h-4 w-4" /> Copy full report</>}
              </button>
            </div>
          )}

          <RelatedTools currentSlug="device-info" />
          <ToolFeedback toolName="Device Info" />
          <ToolSeoContent slug="device-info" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
