"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, KeyRound, Lock, Shield, XCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  decodeJWT,
  formatClaimValue,
  getAlgorithmFamily,
  JWT_CLAIM_LABELS,
  JWT_COLORS,
  SAMPLE_JWT_SECRET,
  SAMPLE_JWT_TOKEN,
  splitJwtToken,
  verifyJwtSignature,
  type DecodedJWT,
  type VerificationResult,
} from "@/lib/jwt-decoder";

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
      className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-surface-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-content-primary transition-colors hover:border-brand-blue/40"
    >
      <Copy className="h-3 w-3" />
      {copied ? "Copied!" : label}
    </button>
  );
}

function HighlightedTokenInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const parts = splitJwtToken(value);

  const highlighted = parts ? (
    <>
      <span style={{ color: JWT_COLORS.header }}>{parts.header}</span>
      <span className="text-content-muted">.</span>
      <span style={{ color: JWT_COLORS.payload }}>{parts.payload}</span>
      <span className="text-content-muted">.</span>
      <span style={{ color: JWT_COLORS.signature }}>{parts.signature}</span>
    </>
  ) : (
    <span className="text-content-primary">{value}</span>
  );

  return (
    <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-surface-border bg-surface-card">
      <pre
        aria-hidden
        className="pointer-events-none absolute inset-0 m-0 overflow-auto whitespace-pre-wrap break-all p-4 font-mono text-xs leading-relaxed sm:text-sm"
      >
        {highlighted}
      </pre>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        aria-label="Encoded JWT token"
        className="relative z-10 min-h-[220px] w-full resize-y bg-transparent p-4 font-mono text-xs leading-relaxed text-transparent caret-white outline-none sm:min-h-[280px] sm:text-sm"
      />
    </div>
  );
}

function ClaimsTable({
  data,
  accentColor,
}: {
  data: Record<string, unknown>;
  accentColor: string;
}) {
  const entries = Object.entries(data);

  return (
    <div className="overflow-x-auto rounded-lg bg-surface-elevated">
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="border-b border-surface-border last:border-b-0">
              <td className="px-3 py-2 align-top font-mono text-xs text-content-primary">
                <span style={{ color: accentColor }}>{key}</span>
                {JWT_CLAIM_LABELS[key] && (
                  <span className="mt-0.5 block text-[11px] font-sans text-content-muted">
                    {JWT_CLAIM_LABELS[key]}
                  </span>
                )}
              </td>
              <td className="px-3 py-2 font-mono text-xs text-content-secondary">
                {formatClaimValue(key, value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DecodedPanel({
  title,
  accentColor,
  copyText,
  children,
}: {
  title: string;
  accentColor: string;
  copyText: string;
  children: ReactNode;
}) {
  return (
    <div
      className="rounded-xl border bg-surface-card p-4"
      style={{ borderColor: `${accentColor}55` }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-semibold" style={{ color: accentColor }}>
          {title}
        </p>
        <CopyButton text={copyText} label="Copy" />
      </div>
      {children}
    </div>
  );
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState(SAMPLE_JWT_TOKEN);
  const [secret, setSecret] = useState(SAMPLE_JWT_SECRET);
  const [publicKey, setPublicKey] = useState("");
  const [base64Secret, setBase64Secret] = useState(false);
  const [verification, setVerification] = useState<VerificationResult>({
    valid: false,
    pending: true,
  });

  const decoded = useMemo<DecodedJWT | null>(() => {
    const trimmed = token.trim();
    if (!trimmed) return null;
    try {
      return decodeJWT(trimmed);
    } catch {
      return null;
    }
  }, [token]);

  const decodeError = useMemo(() => {
    const trimmed = token.trim();
    if (!trimmed) return null;
    try {
      decodeJWT(trimmed);
      return null;
    } catch (e) {
      return (e as Error).message;
    }
  }, [token]);

  const algorithmFamily = getAlgorithmFamily(decoded?.algorithm ?? null);
  const keyInput = algorithmFamily === "hmac" ? secret : publicKey;

  useEffect(() => {
    if (!decoded || !keyInput.trim()) {
      setVerification({ valid: false, pending: true });
      return;
    }

    let cancelled = false;
    void verifyJwtSignature(token, keyInput, { base64Secret }).then((result) => {
      if (!cancelled) setVerification(result);
    });

    return () => {
      cancelled = true;
    };
  }, [token, keyInput, base64Secret, decoded]);

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

        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <KeyRound className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              JWT Decoder — JSON Web Token Inspector
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-content-secondary">
              Decode, inspect, and verify JWT tokens entirely in your browser —
              color-coded like jwt.io with signature verification built in.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="jwt-decoder" />
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="text-sm font-medium text-content-primary">
                    Encoded JWT
                  </label>
                  <CopyButton text={token} label="Copy token" />
                </div>
                <HighlightedTokenInput value={token} onChange={setToken} />
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  <span style={{ color: JWT_COLORS.header }}>Header</span>
                  <span style={{ color: JWT_COLORS.payload }}>Payload</span>
                  <span style={{ color: JWT_COLORS.signature }}>Signature</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {decodeError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                  {decodeError}
                </div>
              )}

              {decoded && (
                <>
                  <DecodedPanel
                    title="HEADER"
                    accentColor={JWT_COLORS.header}
                    copyText={JSON.stringify(decoded.header, null, 2)}
                  >
                    <ClaimsTable data={decoded.header} accentColor={JWT_COLORS.header} />
                  </DecodedPanel>

                  <DecodedPanel
                    title="PAYLOAD"
                    accentColor={JWT_COLORS.payload}
                    copyText={JSON.stringify(decoded.payload, null, 2)}
                  >
                    <div className="mb-3">
                      {decoded.expiry.badgeType === "expired" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
                          ⚠️ Token Expired — {decoded.expiry.expiresAtFormatted}
                        </span>
                      )}
                      {decoded.expiry.badgeType === "valid" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                          ✅ {decoded.expiry.statusMessage}
                        </span>
                      )}
                      {decoded.expiry.badgeType === "none" && (
                        <span className="inline-flex rounded-full bg-surface-elevated px-3 py-1 text-xs font-medium text-content-secondary">
                          No expiration set
                        </span>
                      )}
                    </div>
                    {decoded.expiry.hasExp && (
                      <p className="mb-3 text-xs text-content-secondary">
                        Expires: {decoded.expiry.expiresAtFormatted}
                      </p>
                    )}
                    <ClaimsTable data={decoded.payload} accentColor={JWT_COLORS.payload} />
                  </DecodedPanel>

                  <DecodedPanel
                    title="SIGNATURE"
                    accentColor={JWT_COLORS.signature}
                    copyText={decoded.signature}
                  >
                    <p className="mb-4 break-all font-mono text-xs text-content-secondary">
                      {decoded.signature}
                    </p>

                    <div className="rounded-lg border border-surface-border bg-surface-elevated p-4">
                      <p className="text-sm font-semibold text-content-primary">
                        Verify Signature
                        {decoded.algorithm ? ` (${decoded.algorithm})` : ""}
                      </p>

                      {algorithmFamily === "hmac" && (
                        <div className="mt-3 space-y-3">
                          <label className="flex items-center gap-2 text-xs text-content-secondary">
                            <input
                              type="checkbox"
                              checked={base64Secret}
                              onChange={(e) => setBase64Secret(e.target.checked)}
                            />
                            Secret (base64 encoded)
                          </label>
                          <input
                            type="text"
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                            placeholder="Enter your HMAC secret"
                            className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 font-mono text-xs text-content-primary outline-none focus:border-brand-blue"
                          />
                        </div>
                      )}

                      {(algorithmFamily === "rsa" || algorithmFamily === "ec") && (
                        <textarea
                          value={publicKey}
                          onChange={(e) => setPublicKey(e.target.value)}
                          rows={5}
                          placeholder="-----BEGIN PUBLIC KEY-----&#10;...&#10;-----END PUBLIC KEY-----"
                          className="mt-3 w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 font-mono text-xs text-content-primary outline-none focus:border-brand-blue"
                        />
                      )}

                      {algorithmFamily === "unknown" && decoded.algorithm && (
                        <p className="mt-3 text-xs text-amber-400">
                          Verification is not supported for {decoded.algorithm}.
                        </p>
                      )}

                      <div className="mt-4">
                        {verification.pending || !keyInput.trim() ? (
                          <p className="text-sm text-content-secondary">
                            ⚠️ Add a secret or public key to verify the signature
                          </p>
                        ) : verification.valid ? (
                          <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" />
                            Signature Verified
                          </p>
                        ) : (
                          <p className="inline-flex items-center gap-2 text-sm font-semibold text-red-400">
                            <XCircle className="h-4 w-4" />
                            Invalid Signature
                            {verification.error ? ` — ${verification.error}` : ""}
                          </p>
                        )}
                      </div>

                      <p className="mt-4 text-xs text-content-muted">
                        🔒 Verification is done in your browser — your secret never
                        leaves this page
                      </p>
                    </div>
                  </DecodedPanel>
                </>
              )}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: KeyRound,
                  title: "Paste Token",
                  description: "Paste your JWT — header, payload, and signature are color-coded",
                },
                {
                  step: "02",
                  icon: Lock,
                  title: "Inspect Claims",
                  description: "Review decoded claims, expiry status, and claim labels",
                },
                {
                  step: "03",
                  icon: Shield,
                  title: "Verify",
                  description: "Add your secret or public key to verify the signature locally",
                },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
                  </div>
                  <p className="text-xs font-semibold text-brand-blue">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
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
