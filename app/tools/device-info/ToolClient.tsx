"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
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
    <>
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
    </>
  );
}

