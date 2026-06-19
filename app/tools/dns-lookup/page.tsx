"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardCopy, Network, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  DNS_RECORD_TYPES,
  fetchDnsLookup,
  type DnsRecord,
} from "@/lib/railway-api";

const DOMAIN_PATTERN =
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 rounded-lg border border-surface-border px-2 py-1 text-xs text-content-secondary hover:border-brand-blue"
    >
      <ClipboardCopy className="h-3 w-3" />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function DnsLookupPage() {
  const [domain, setDomain] = useState("google.com");
  const [recordType, setRecordType] = useState<(typeof DNS_RECORD_TYPES)[number]>("A");
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedDomain, setSearchedDomain] = useState<string | null>(null);

  const handleLookup = async () => {
    const normalized = domain.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0].replace(/\.$/, "");
    if (!DOMAIN_PATTERN.test(normalized)) {
      setError("Enter a valid domain name (e.g. example.com)");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await fetchDnsLookup(normalized, recordType);
      setRecords(data.records);
      setSearchedDomain(normalized);
      if (data.records.length === 0) {
        setError("No records found for this query.");
      }
    } catch (err) {
      setRecords([]);
      setError(err instanceof Error ? err.message : "DNS lookup failed");
    } finally {
      setLoading(false);
    }
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

        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-blue/10">
              <Network className="h-6 w-6 text-tool-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              DNS Lookup Tool Online Free
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Query A, AAAA, CNAME, MX, TXT, NS, and SOA records via Cloudflare DNS.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="dns-lookup" />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <label htmlFor="domain" className="mb-2 block text-sm font-medium text-content-primary">
                Domain name
              </label>
              <input
                id="domain"
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label htmlFor="record-type" className="mb-2 block text-sm font-medium text-content-primary">
                Record type
              </label>
              <select
                id="record-type"
                value={recordType}
                onChange={(e) =>
                  setRecordType(e.target.value as (typeof DNS_RECORD_TYPES)[number])
                }
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none focus:border-brand-blue"
              >
                {DNS_RECORD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type === "ALL" ? "Show all common types" : type}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => void handleLookup()}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue/90 disabled:opacity-70"
            >
              <Search className="h-4 w-4" />
              {loading ? "Looking up..." : "Look up DNS"}
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{error}</p>
          )}

          {records.length > 0 && searchedDomain && (
            <div className="mt-6 overflow-x-auto rounded-xl border border-surface-border">
              <p className="border-b border-surface-border bg-surface-card px-4 py-3 text-sm text-content-secondary">
                Results for <strong className="text-content-primary">{searchedDomain}</strong>
              </p>
              <table className="w-full min-w-[640px] text-sm">
                <thead className="bg-surface-card text-left text-content-secondary">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">TTL</th>
                    <th className="px-4 py-3 font-medium">Value</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={`${record.type}-${record.data}-${index}`} className="border-t border-surface-border">
                      <td className="px-4 py-3 font-mono text-xs text-content-primary">{record.name}</td>
                      <td className="px-4 py-3 text-content-primary">{record.type}</td>
                      <td className="px-4 py-3 text-content-secondary">{record.ttl ?? "—"}</td>
                      <td className="max-w-xs break-all px-4 py-3 font-mono text-xs text-content-primary">
                        {record.data}
                      </td>
                      <td className="px-4 py-3">
                        <CopyButton value={record.data} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <RelatedTools currentSlug="dns-lookup" />
          <ToolFeedback toolName="DNS Lookup Tool" />
          <ToolSeoContent slug="dns-lookup" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
