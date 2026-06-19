"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardCopy, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  dateInputToTimestamps,
  formatTimestampDates,
  getCurrentTimestamps,
  getLocalDatetimeInputValue,
  parseTimestampInput,
} from "@/lib/timestamp-converter";

function CopyButton({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-lg border border-surface-border px-3 py-1.5 text-xs font-medium text-content-primary hover:border-brand-blue"
      aria-label={`Copy ${label}`}
    >
      <ClipboardCopy className="h-3.5 w-3.5" />
      {copied ? "Copied!" : label}
    </button>
  );
}

export default function TimestampConverterPage() {
  const [now, setNow] = useState(getCurrentTimestamps);
  const [timestampInput, setTimestampInput] = useState("");
  const [dateInput, setDateInput] = useState(getLocalDatetimeInputValue());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(getCurrentTimestamps());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const parsedTimestamp = useMemo(
    () => (timestampInput.trim() ? parseTimestampInput(timestampInput) : null),
    [timestampInput]
  );

  const timestampDates = useMemo(() => {
    if (!parsedTimestamp) return null;
    return formatTimestampDates(parsedTimestamp.milliseconds);
  }, [parsedTimestamp]);

  const dateTimestamps = useMemo(
    () => dateInputToTimestamps(dateInput),
    [dateInput]
  );

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-blue/10">
              <Clock className="h-6 w-6 text-tool-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Unix Timestamp Converter — Epoch to Date
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Live current epoch time plus instant timestamp ↔ date conversion.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="timestamp-converter" />
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-5">
            <p className="text-sm font-medium text-content-primary">
              Current Unix timestamp
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-content-muted">Seconds</p>
                  <p className="font-mono text-2xl font-bold text-content-primary">
                    {now.seconds}
                  </p>
                </div>
                <CopyButton value={String(now.seconds)} label="Copy seconds" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-content-muted">Milliseconds</p>
                  <p className="font-mono text-2xl font-bold text-content-primary">
                    {now.milliseconds}
                  </p>
                </div>
                <CopyButton
                  value={String(now.milliseconds)}
                  label="Copy milliseconds"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <section className="rounded-xl border border-surface-border bg-surface-card p-5">
              <h2 className="text-lg font-semibold text-content-primary">
                Timestamp → Date
              </h2>
              <p className="mt-1 text-sm text-content-secondary">
                Auto-detects 10-digit seconds or 13-digit milliseconds.
              </p>
              <input
                type="text"
                inputMode="numeric"
                value={timestampInput}
                onChange={(e) => setTimestampInput(e.target.value)}
                placeholder="e.g. 1717881600 or 1717881600000"
                className="mt-4 w-full rounded-xl border border-surface-border bg-surface-base px-4 py-3 font-mono text-sm text-content-primary outline-none focus:border-brand-blue"
              />
              {parsedTimestamp && timestampDates && (
                <div className="mt-4 space-y-3 text-sm">
                  <p className="text-content-muted">
                    Detected as{" "}
                    <strong className="text-content-primary">
                      {parsedTimestamp.unit}
                    </strong>
                  </p>
                  <div className="rounded-lg bg-surface-base p-3">
                    <p className="text-xs text-content-muted">UTC</p>
                    <p className="font-medium text-content-primary">
                      {timestampDates.utc}
                    </p>
                    <div className="mt-2">
                      <CopyButton
                        value={timestampDates.utc}
                        label="Copy UTC"
                      />
                    </div>
                  </div>
                  <div className="rounded-lg bg-surface-base p-3">
                    <p className="text-xs text-content-muted">
                      Local ({timestampDates.timezone})
                    </p>
                    <p className="font-medium text-content-primary">
                      {timestampDates.local}
                    </p>
                    <div className="mt-2">
                      <CopyButton
                        value={timestampDates.local}
                        label="Copy local"
                      />
                    </div>
                  </div>
                </div>
              )}
              {timestampInput.trim() && !parsedTimestamp && (
                <p className="mt-3 text-sm text-red-600">
                  Enter a valid numeric Unix timestamp.
                </p>
              )}
            </section>

            <section className="rounded-xl border border-surface-border bg-surface-card p-5">
              <h2 className="text-lg font-semibold text-content-primary">
                Date → Timestamp
              </h2>
              <input
                type="datetime-local"
                step="1"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="mt-4 w-full rounded-xl border border-surface-border bg-surface-base px-4 py-3 text-sm text-content-primary outline-none focus:border-brand-blue"
              />
              {dateTimestamps && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-surface-base p-3">
                    <p className="text-xs text-content-muted">Seconds</p>
                    <p className="font-mono text-lg font-semibold text-content-primary">
                      {dateTimestamps.seconds}
                    </p>
                    <div className="mt-2">
                      <CopyButton
                        value={String(dateTimestamps.seconds)}
                        label="Copy seconds"
                      />
                    </div>
                  </div>
                  <div className="rounded-lg bg-surface-base p-3">
                    <p className="text-xs text-content-muted">Milliseconds</p>
                    <p className="font-mono text-lg font-semibold text-content-primary">
                      {dateTimestamps.milliseconds}
                    </p>
                    <div className="mt-2">
                      <CopyButton
                        value={String(dateTimestamps.milliseconds)}
                        label="Copy milliseconds"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          <RelatedTools currentSlug="timestamp-converter" />
          <ToolFeedback toolName="Unix Timestamp Converter" />
          <ToolSeoContent slug="timestamp-converter" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
