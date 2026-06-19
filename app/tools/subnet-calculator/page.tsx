"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Network } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  calculateSubnet,
  getSubnetReferenceRows,
  parseCidrInput,
  subnetMaskToCidr,
} from "@/lib/subnet-calculator";

const DEFAULT_INPUT = "192.168.1.0/24";

export default function SubnetCalculatorPage() {
  const [cidrInput, setCidrInput] = useState(DEFAULT_INPUT);
  const [maskInput, setMaskInput] = useState("255.255.255.0");

  const result = useMemo(() => {
    const parsed = parseCidrInput(cidrInput);
    if (!parsed) {
      return { data: null, error: "Enter a valid CIDR like 192.168.1.0/24." };
    }
    const data = calculateSubnet(parsed.ip, parsed.cidr);
    if (!data) {
      return { data: null, error: "Invalid IP address or CIDR prefix (0–32)." };
    }
    return { data, error: null };
  }, [cidrInput]);

  const maskCidr = useMemo(() => {
    const cidr = subnetMaskToCidr(maskInput);
    if (cidr === null) {
      return { cidr: null, error: "Enter a valid contiguous subnet mask." };
    }
    return { cidr, error: null };
  }, [maskInput]);

  const referenceRows = useMemo(() => getSubnetReferenceRows(), []);

  const resultRows = result.data
    ? [
        { label: "Network address", value: result.data.networkAddress },
        { label: "Broadcast address", value: result.data.broadcastAddress },
        { label: "Subnet mask", value: result.data.subnetMask },
        { label: "Wildcard mask", value: result.data.wildcardMask },
        { label: "Total hosts", value: result.data.totalHosts.toLocaleString() },
        { label: "Usable hosts", value: result.data.usableHosts.toLocaleString() },
        { label: "First usable", value: result.data.firstUsable },
        { label: "Last usable", value: result.data.lastUsable },
        { label: "Network (binary)", value: result.data.networkBinary },
        { label: "Mask (binary)", value: result.data.maskBinary },
      ]
    : [];

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Network className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Subnet Calculator Online Free — CIDR IP Range Tool
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Enter a CIDR block to see network details, usable host range, and
              binary representations.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="subnet-calculator" />
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <label className="block rounded-xl border border-surface-border bg-surface-card p-4">
              <span className="mb-2 block text-sm font-medium text-content-primary">
                CIDR notation
              </span>
              <input
                type="text"
                value={cidrInput}
                onChange={(e) => setCidrInput(e.target.value)}
                placeholder="192.168.1.0/24"
                className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 font-mono text-sm text-content-primary outline-none focus:border-brand-blue"
              />
            </label>

            {result.error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {result.error}
              </p>
            )}

            {result.data && !result.error && (
              <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-card">
                <table className="w-full text-sm">
                  <tbody>
                    {resultRows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-surface-border last:border-b-0"
                      >
                        <th className="w-2/5 bg-surface-base px-4 py-3 text-left font-medium text-content-secondary">
                          {row.label}
                        </th>
                        <td className="px-4 py-3 font-mono text-content-primary">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="rounded-xl border border-surface-border bg-surface-card p-4">
              <p className="mb-3 text-sm font-medium text-content-primary">
                Mask to CIDR
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={maskInput}
                  onChange={(e) => setMaskInput(e.target.value)}
                  placeholder="255.255.255.0"
                  className="flex-1 rounded-lg border border-surface-border bg-surface-base px-3 py-2 font-mono text-sm text-content-primary outline-none focus:border-brand-blue"
                />
                {maskCidr.cidr !== null && !maskCidr.error && (
                  <p className="text-sm font-semibold text-brand-blue">
                    /{maskCidr.cidr}
                  </p>
                )}
              </div>
              {maskCidr.error && (
                <p className="mt-2 text-sm text-red-600">{maskCidr.error}</p>
              )}
            </div>

            <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-card">
              <p className="border-b border-surface-border px-4 py-3 text-sm font-medium text-content-primary">
                Quick reference
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-surface-border bg-surface-base text-left">
                      <th className="px-4 py-2 font-medium text-content-secondary">
                        Prefix
                      </th>
                      <th className="px-4 py-2 font-medium text-content-secondary">
                        Subnet mask
                      </th>
                      <th className="px-4 py-2 font-medium text-content-secondary">
                        Total hosts
                      </th>
                      <th className="px-4 py-2 font-medium text-content-secondary">
                        Usable hosts
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceRows.map((row) => (
                      <tr
                        key={row.prefix}
                        className="border-b border-surface-border last:border-b-0"
                      >
                        <td className="px-4 py-2 font-mono text-content-primary">
                          /{row.prefix}
                        </td>
                        <td className="px-4 py-2 font-mono text-content-primary">
                          {row.subnetMask}
                        </td>
                        <td className="px-4 py-2 text-content-secondary">
                          {row.totalHosts.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-content-secondary">
                          {row.usableHosts.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <RelatedTools currentSlug="subnet-calculator" />
          <ToolFeedback toolName="Subnet Calculator" />
          <ToolSeoContent slug="subnet-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
