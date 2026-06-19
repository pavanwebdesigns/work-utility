"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardCopy, Globe, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  fetchClientPublicIp,
  fetchIpLookup,
  type IpLookupResponse,
} from "@/lib/railway-api";

const IPV4_PATTERN =
  /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)$/;

function InfoRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="flex flex-wrap justify-between gap-2 border-t border-surface-border py-3 text-sm">
      <span className="text-content-secondary">{label}</span>
      <span className="font-medium text-content-primary">{value}</span>
    </div>
  );
}

export default function IpLookupPage() {
  const [mode, setMode] = useState<"my-ip" | "lookup">("my-ip");
  const [lookupIp, setLookupIp] = useState("");
  const [result, setResult] = useState<IpLookupResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const runLookup = useCallback(async (ip: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIpLookup(ip);
      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "IP lookup failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMyIp = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const clientIp = await fetchClientPublicIp();
      await runLookup(clientIp);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not detect your IP");
      setLoading(false);
    }
  }, [runLookup]);

  useEffect(() => {
    if (mode === "my-ip") {
      void loadMyIp();
    }
  }, [mode, loadMyIp]);

  const handleLookup = () => {
    const ip = lookupIp.trim();
    if (!IPV4_PATTERN.test(ip)) {
      setError("Enter a valid IPv4 address (e.g. 8.8.8.8)");
      return;
    }
    void runLookup(ip);
  };

  const copyIp = async () => {
    if (!result?.ip) return;
    await navigator.clipboard.writeText(result.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-blue/10">
              <Globe className="h-6 w-6 text-tool-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              IP Address Lookup — Find Location &amp; ISP
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              See your public IP or look up any IPv4 address — country, city, ISP, timezone.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="ip-lookup" />
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("my-ip")}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium ${
                mode === "my-ip"
                  ? "bg-brand-blue text-white"
                  : "border border-surface-border text-content-primary"
              }`}
            >
              My IP
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("lookup");
                setResult(null);
                setError(null);
                setLoading(false);
              }}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium ${
                mode === "lookup"
                  ? "bg-brand-blue text-white"
                  : "border border-surface-border text-content-primary"
              }`}
            >
              Lookup any IP
            </button>
          </div>

          {mode === "lookup" && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={lookupIp}
                onChange={(e) => setLookupIp(e.target.value)}
                placeholder="8.8.8.8"
                className="min-w-0 flex-1 rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm outline-none focus:border-brand-blue"
              />
              <button
                type="button"
                onClick={handleLookup}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue/90 disabled:opacity-70"
              >
                <Search className="h-4 w-4" />
                Look up
              </button>
            </div>
          )}

          {loading && (
            <p className="mt-6 text-center text-sm text-content-secondary">Looking up...</p>
          )}

          {error && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
          )}

          {result && !loading && (
            <div className="mt-6 rounded-xl border border-surface-border bg-surface-card p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-content-muted">IP address</p>
                  <p className="font-mono text-xl font-bold text-content-primary">{result.ip}</p>
                </div>
                <button
                  type="button"
                  onClick={() => void copyIp()}
                  className="inline-flex items-center gap-1 rounded-lg border border-surface-border px-3 py-1.5 text-xs font-medium text-content-primary hover:border-brand-blue"
                >
                  <ClipboardCopy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy IP"}
                </button>
              </div>
              <InfoRow label="Country" value={result.country} />
              <InfoRow label="Region / State" value={result.region} />
              <InfoRow label="City" value={result.city} />
              <InfoRow label="ISP" value={result.isp} />
              <InfoRow label="Organization" value={result.organization} />
              <InfoRow label="Timezone" value={result.timezone} />
              <InfoRow
                label="Coordinates"
                value={
                  result.latitude !== null && result.longitude !== null
                    ? `${result.latitude}, ${result.longitude}`
                    : null
                }
              />
            </div>
          )}

          <p className="mt-6 rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-secondary">
            IP geolocation is approximate and based on ISP registration data, not your precise location.
          </p>

          {mode === "my-ip" && (
            <p className="mt-3 text-xs text-content-muted text-center">
              Your IP is detected via ipify in your browser, then geolocated through our server — not Railway&apos;s server IP.
            </p>
          )}

          <RelatedTools currentSlug="ip-lookup" />
          <ToolFeedback toolName="IP Address Lookup" />
          <ToolSeoContent slug="ip-lookup" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
