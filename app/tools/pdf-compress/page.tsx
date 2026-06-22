"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Download,
  FileDown,
  Loader2,
  SlidersHorizontal,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { SoftwareApplicationJsonLd } from "@/components/SoftwareApplicationJsonLd";
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  calcSavingsPercent,
  compressPDF,
  formatFileSize,
} from "@/lib/pdf-api";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const PRESETS = {
  low: { label: "Low", desc: "Smaller size", quality: 80 },
  medium: { label: "Medium", desc: "Balanced", quality: 50 },
  high: { label: "High", desc: "Best quality", quality: 25 },
} as const;

type PresetKey = keyof typeof PRESETS;

const whenToUseItems = [
  {
    title: "Email attachment too large",
    description:
      "Gmail allows up to 25MB, but many corporate mail servers cap attachments at 10MB or less.",
  },
  {
    title: "College or university portal limits",
    description:
      "Admission and assignment portals often reject PDFs above 1MB or 2MB.",
  },
  {
    title: "Government portal rejections",
    description:
      "UPSC, SSC, and state PSC portals frequently block oversized PDF uploads.",
  },
  {
    title: "WhatsApp PDF sharing",
    description:
      "Compress before sharing to stay well under WhatsApp’s 100MB document limit.",
  },
  {
    title: "Job portal uploads",
    description:
      "Naukri, LinkedIn, and Internshala work best with lightweight resume PDFs.",
  },
];

const pdfCompressFaqs = [
  {
    question: "How do I compress a PDF file size?",
    answer:
      "Upload your PDF to our free tool, choose compression level, and download the compressed file instantly. No signup required.",
  },
  {
    question: "Will compressing a PDF reduce its quality?",
    answer:
      "Text quality is preserved. Images may compress slightly but remain readable for most documents.",
  },
  {
    question: "Is there a file size limit for PDF compression?",
    answer:
      "No strict limit. Works best for PDFs under 100MB for fastest processing.",
  },
  {
    question: "Is my PDF safe when I compress it online?",
    answer:
      "Yes. Our tool works entirely in your browser. Your file is never uploaded to any server.",
  },
  {
    question: "How to compress PDF under 1MB for email?",
    answer:
      "Move the compression slider toward 10–25% for smaller files. Most scanned PDFs compress well under 1MB at higher reduction levels.",
  },
  {
    question: "How to compress PDF for government portals in India?",
    answer:
      "Use the Portal Upload preset (15%) or slide toward max reduction. Most government portals accept PDFs under 1MB or 2MB.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pdfCompressFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select or drop your PDF file",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Choose Compression",
    description: "Pick Low, Medium, or High quality",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your compressed file instantly",
  },
];

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export default function PdfCompressPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<PresetKey>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<{
    originalSize: number;
    compressedSize: number;
  } | null>(null);

  const handleFile = useCallback((selected: File) => {
    if (!isPdfFile(selected)) {
      setError("Please select a valid PDF file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("PDF must be 50MB or smaller.");
      return;
    }

    setFile(selected);
    setResult(null);
    setError(null);
  }, []);

  const handleClear = () => {
    setFile(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    setResult(null);
    setError(null);

    try {
      const stats = await compressPDF(file, PRESETS[preset].quality);
      setResult(stats);
    } catch (err) {
      console.error("PDF compression failed:", err);
      setError("Compression failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const savingsPercent = result
    ? calcSavingsPercent(result.originalSize, result.compressedSize)
    : 0;

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />

      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="pt-10 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pdf/10">
                <FileDown className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                PDF Compress
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Reduce your PDF file size while maintaining quality. Fast
                compression powered by our secure PDF service.
              </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="pdf-compress" />
            </div>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                aria-label="Upload PDF file"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) handleFile(selected);
                  e.target.value = "";
                }}
              />

              {!file && (
                <button
                  type="button"
                  aria-label="File upload area"
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const dropped = e.dataTransfer.files?.[0];
                    if (dropped) handleFile(dropped);
                  }}
                  className={`flex min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors sm:min-h-[200px] ${
                    isDragging
                      ? "border-tool-pdf"
                      : "border-tool-pdf/30 hover:border-tool-pdf"
                  }`}
                >
                  <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                  <p className="font-medium text-content-primary">Drop your PDF here</p>
                  <p className="mt-1 text-sm text-content-secondary">
                    or click to browse — max 50MB
                  </p>
                </button>
              )}

              {file && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tool-pdf/10">
                      <FileDown className="h-5 w-5 text-tool-pdf" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-content-primary">
                        {file.name}
                      </p>
                      <p className="text-xs text-content-secondary">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-pdf transition-colors hover:bg-tool-pdf/10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-medium text-content-primary">
                      Compression level
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {(Object.keys(PRESETS) as PresetKey[]).map((key) => {
                        const option = PRESETS[key];
                        const isSelected = preset === key;

                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setPreset(key)}
                            className={`rounded-xl border px-3 py-3 text-center transition-colors ${
                              isSelected
                                ? "border-tool-pdf bg-tool-pdf/10 text-tool-pdf"
                                : "border-surface-border bg-surface-card text-content-secondary hover:border-tool-pdf/40"
                            }`}
                          >
                            <span className="block text-sm font-semibold">
                              {option.label}
                              {isSelected ? " ✓" : ""}
                            </span>
                            <span className="mt-1 block text-xs opacity-80">
                              {option.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCompress}
                    disabled={isProcessing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-tool-pdf px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#DC2626] disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Compressing... please wait
                      </>
                    ) : (
                      "Compress PDF"
                    )}
                  </button>
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 p-4">
                    <p className="text-center text-sm font-medium text-tool-convert">
                      ✅ Compression complete!
                    </p>
                    <div className="mt-3 space-y-1 text-center text-sm text-content-secondary">
                      <p>
                        Original:{" "}
                        <span className="font-medium text-content-primary">
                          {formatFileSize(result.originalSize)}
                        </span>
                      </p>
                      <p>
                        Compressed:{" "}
                        <span className="font-medium text-content-primary">
                          {formatFileSize(result.compressedSize)}
                        </span>
                      </p>
                      <p>
                        You saved:{" "}
                        <span className="font-medium text-tool-convert">
                          {savingsPercent}%
                        </span>
                      </p>
                    </div>
                  </div>

                  {savingsPercent > 85 && preset === "low" && (
                    <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm leading-relaxed text-content-secondary">
                      <p className="font-medium text-brand-blue">
                        💡 This is a scanned document.
                      </p>
                      <p className="mt-2">
                        Scanned PDFs compress more aggressively than text PDFs.
                        The compressed file is readable but may have reduced
                        image quality. For official use, we recommend 10–30%
                        compression setting.
                      </p>
                    </div>
                  )}

                  {result.compressedSize < 100 * 1024 && (
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm leading-relaxed text-content-secondary">
                      <p className="font-medium text-amber-400">
                        ⚠️ High compression applied.
                      </p>
                      <p className="mt-2">
                        Please open the downloaded file to verify readability
                        before using for official submissions.
                      </p>
                    </div>
                  )}

                  {savingsPercent >= 20 && savingsPercent <= 60 && (
                    <div className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-3 text-center text-sm text-tool-convert">
                      ✅ Good compression achieved while maintaining quality.
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">
                  {error}
                </div>
              )}
            </div>
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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-pdf/10">
                    <step.icon className="h-5 w-5 text-tool-pdf" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">
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

          <RelatedTools currentSlug="pdf-compress" />
          <SoftwareApplicationJsonLd slug="pdf-compress" />
          <ToolFeedback toolName="PDF Compress" />

          <div className="mt-12 border-t border-surface-border pt-12">
            <section>
              <h2 className="text-lg font-semibold text-content-primary sm:text-xl">
                About PDF Compress Tool
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-content-secondary sm:text-base">
                <p>
                  Our free PDF Compress tool reduces file size while keeping
                  documents readable and professional. Whether you need a
                  lighter attachment for email or a PDF that meets a strict
                  upload limit, you can shrink your file in seconds without
                  installing software.
                </p>
                <p>
                  Everything runs entirely in your browser — your PDF is never
                  uploaded to a server. Compression happens on your device using
                  client-side processing, which means your files stay 100%
                  private. No account, no waiting in a queue, and no risk of
                  sensitive documents being stored on third-party servers.
                </p>
                <p>
                  This tool is built for everyday Indian users: students
                  submitting assignments, employees emailing reports, job
                  seekers sending resumes, and anyone filling government forms
                  with tight size limits. It works especially well for NSDL and
                  UTI PAN applications, college admission portals, UPSC and SSC
                  form uploads, and email attachments that must stay under 1MB
                  or 2MB. Because your files never leave your browser, you can
                  safely compress confidential documents at home, at work, or on
                  the go.
                </p>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-lg font-semibold text-content-primary sm:text-xl">
                When Should You Compress a PDF?
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {whenToUseItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-surface-border bg-surface-card p-4 sm:p-5"
                  >
                    <h3 className="font-medium text-content-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
              />
              <h2 className="text-lg font-semibold text-content-primary sm:text-xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-4 space-y-3">
                {pdfCompressFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-xl border border-surface-border bg-surface-card"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex(isOpen ? null : index)
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                      >
                        <span className="font-medium text-content-primary">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-content-muted transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-surface-border px-4 pb-4 pt-3 sm:px-5">
                          <p className="text-sm leading-relaxed text-content-secondary">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
