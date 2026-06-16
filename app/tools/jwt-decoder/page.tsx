"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, KeyRound, Lock, Shield } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { decodeJWT, type DecodedJWT } from "@/lib/jwt-decoder";

const howItWorksSteps = [
  {
    step: "01",
    icon: KeyRound,
    title: "Paste Token",
    description: "Paste your JWT token into the input",
  },
  {
    step: "02",
    icon: Lock,
    title: "Decode",
    description: "Decode header, payload, and signature",
  },
  {
    step: "03",
    icon: Shield,
    title: "Inspect",
    description: "Review claims and expiry status",
  },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex cursor-pointer items-center gap-1 rounded-lg border border-surface-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-content-primary transition-colors hover:border-brand-blue/40"
    >
      <Copy className="h-3 w-3" />
      {copied ? "Copied!" : label}
    </button>
  );
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setDecoded(null);
      setError(null);
      return;
    }
    try {
      setDecoded(decodeJWT(trimmed));
      setError(null);
    } catch (e) {
      setDecoded(null);
      setError((e as Error).message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => handleDecode(token), 300);
    return () => clearTimeout(timer);
  }, [token]);

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

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <KeyRound
                className="h-6 w-6 text-brand-blue"
                strokeWidth={1.75}
              />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              JWT Decoder — JSON Web Token Inspector
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Decode and inspect JWT tokens entirely in your browser. Private
              and secure.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="jwt-decoder" />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your JWT token here (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
              className="min-h-32 w-full resize-y rounded-xl border border-surface-border bg-surface-card px-4 py-4 font-mono text-xs leading-relaxed text-content-primary outline-none focus:border-brand-blue sm:text-sm"
            />

            <button
              type="button"
              onClick={() => handleDecode(token)}
              className="w-full cursor-pointer rounded-xl bg-brand-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90 sm:w-auto sm:px-8"
            >
              Decode
            </button>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            {decoded && (
              <div className="space-y-4">
                {decoded.expiresAt ? (
                  <span
                    className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                      decoded.isExpired
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {decoded.isExpired
                      ? "Expired"
                      : `Expires ${decoded.expiresAt}`}
                  </span>
                ) : (
                  <span className="inline-block rounded-full bg-surface-elevated px-4 py-1 text-sm font-medium text-content-secondary">
                    No expiry
                  </span>
                )}

                {[
                  {
                    title: "Header",
                    content: JSON.stringify(decoded.header, null, 2),
                  },
                  {
                    title: "Payload",
                    content: JSON.stringify(decoded.payload, null, 2),
                  },
                  {
                    title: "Signature",
                    content: decoded.signature,
                  },
                ].map((section) => (
                  <div
                    key={section.title}
                    className="rounded-xl border border-surface-border bg-surface-card p-5"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-semibold text-content-primary">
                        {section.title}
                      </p>
                      <CopyButton text={section.content} label="Copy" />
                    </div>
                    <pre className="overflow-x-auto rounded-lg bg-surface-elevated p-4 font-mono text-xs text-content-primary sm:text-sm">
                      {section.content}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            <p className="text-center text-xs text-content-muted">
              This tool only decodes — it does not verify the signature. Token
              processing happens entirely in your browser.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon
                      className="h-5 w-5 text-brand-blue"
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-xs font-semibold text-brand-blue">
                    {step.step}
                  </p>
                  <p className="mt-1 font-semibold text-content-primary">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="jwt-decoder" />
          <ToolFeedback toolName="JWT Decoder" />
          <ToolSeoContent slug="jwt-decoder" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
