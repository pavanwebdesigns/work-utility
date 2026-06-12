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
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";
import {
  compressPDF,
  CompressProgress,
  formatFileSize,
} from "@/lib/pdf-compress";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const DEFAULT_COMPRESSION = 50;

const compressionPresets = [
  { label: "Email", value: 70 },
  { label: "Portal Upload", value: 80 },
  { label: "WhatsApp", value: 60 },
  { label: "Archive", value: 50 },
] as const;

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
      "Move the compression slider toward 70–80% for smaller files. Most text-based PDFs compress well under 1MB at higher compression levels.",
  },
  {
    question: "How to compress PDF for government portals in India?",
    answer:
      "Use the Portal Upload preset (80%) or slide toward max reduction. Most government portals accept PDFs under 1MB or 2MB.",
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
    description: "Adjust the slider to your target size",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your compressed file instantly",
  },
];

export default function PdfCompressPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const compressionRef = useRef(DEFAULT_COMPRESSION);
  const [file, setFile] = useState<File | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressionPercent, setCompressionPercent] = useState(DEFAULT_COMPRESSION);
  compressionRef.current = compressionPercent;
  const [appliedCompression, setAppliedCompression] = useState(DEFAULT_COMPRESSION);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState<CompressProgress | null>(null);

  const resetResult = () => {
    setCompressedBlob(null);
    setCompressedSize(0);
    setError(null);
    setProgress(null);
  };

  const handleFile = useCallback((selected: File) => {
    if (selected.type !== "application/pdf" && !selected.name.endsWith(".pdf")) {
      setError("Please select a valid PDF file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("File exceeds the 50MB limit.");
      return;
    }

    setFile(selected);
    setOriginalSize(selected.size);
    resetResult();
  }, []);

  const handleRemoveFile = () => {
    setFile(null);
    setOriginalSize(0);
    resetResult();
    setCompressionPercent(DEFAULT_COMPRESSION);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) handleFile(selected);
    event.target.value = "";
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    resetResult();
    setProgress({
      currentPage: 0,
      totalPages: 0,
      percent: 0,
      message: "Preparing compression...",
    });

    try {
      const sliderValue = compressionRef.current;
      setAppliedCompression(sliderValue);
      const blob = await compressPDF(file, sliderValue, setProgress);
      setCompressedBlob(blob);
      setCompressedSize(blob.size);
    } catch {
      setError("Failed to compress PDF. Please try a different file.");
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob || !file) return;

    const url = URL.createObjectURL(compressedBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `compressed_${file.name}`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleCompressAnother = () => {
    handleRemoveFile();
    inputRef.current?.click();
  };

  const percentSaved =
    originalSize > 0 && compressedSize > 0
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;
  const hasMinimalSavings =
    compressedBlob !== null && percentSaved >= 0 && percentSaved < 10;
  const bytesSaved =
    originalSize > 0 && compressedSize > 0 ? originalSize - compressedSize : 0;
  const showQualityWarning =
    compressedBlob !== null &&
    compressedSize > 0 &&
    appliedCompression >= 70 &&
    compressedSize < 100 * 1024 &&
    originalSize > 1024 * 1024;

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
                Reduce your PDF file size while maintaining quality. Files never
                leave your browser.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                aria-label="Upload PDF file" className="hidden"
                onChange={handleInputChange}
              />

              <button
                type="button"
               aria-label="File upload area" onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex min-h-[160px] sm:min-h-[200px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors ${
                  isDragging
                    ? "border-tool-pdf"
                    : "border-brand-blue/30 hover:border-tool-pdf"
                }`}
              >
                <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                <p className="font-medium text-content-primary">
                  Drop your PDF here
                </p>
                <p className="mt-1 text-sm text-content-secondary">
                  or click to browse — max 50MB
                </p>
              </button>

              <p className="rounded-xl border border-surface-border bg-surface-card px-3 py-2.5 text-sm leading-relaxed text-content-secondary">
                💡 Works best on scanned documents, certificates, and
                image-heavy PDFs. Text-only PDFs like resumes have limited
                compression potential.
              </p>

              {file && (
                <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-content-primary">
                      {file.name}
                    </p>
                    <p className="mt-0.5 text-xs text-content-secondary">
                      Uploaded: {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    aria-label="Remove file"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-pdf transition-colors hover:bg-tool-pdf/10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {error && (
                <p className="text-center text-sm text-tool-pdf">{error}</p>
              )}

              {file && (
                <div className="space-y-3 rounded-xl border border-surface-border bg-surface-card p-4">
                  <div className="flex flex-wrap gap-2">
                    {compressionPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setCompressionPercent(preset.value);
                          resetResult();
                        }}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors sm:text-sm ${
                          compressionPercent === preset.value
                            ? "border-tool-pdf bg-tool-pdf/10 text-tool-pdf"
                            : "border-surface-border bg-surface-base text-content-secondary hover:border-tool-pdf/40 hover:text-content-primary"
                        }`}
                      >
                        {preset.label} ({preset.value}%)
                      </button>
                    ))}
                  </div>

                  <div className="text-center">
                    <p className="text-xl font-bold text-tool-pdf">
                      {compressionPercent}% Compression
                    </p>
                  </div>

                  <div>
                    <input
                      type="range"
                      min={10}
                      max={90}
                      step={5}
                      value={compressionPercent}
                      onChange={(event) => {
                        setCompressionPercent(Number(event.target.value));
                        resetResult();
                      }}
                      aria-label="Compression amount"
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-border accent-tool-pdf"
                    />
                    <div className="mt-2 flex justify-between text-xs text-content-muted">
                      <span>10%</span>
                      <span>90%</span>
                    </div>
                    <div className="mt-1.5 flex justify-between gap-3 text-xs text-content-secondary">
                      <span>
                        Low reduction
                        <br />
                        <span className="text-content-muted">Best quality</span>
                      </span>
                      <span className="text-right">
                        Max reduction
                        <br />
                        <span className="text-content-muted">Smaller file</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-surface-border pt-3">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-content-secondary">Original size</span>
                      <span className="font-semibold text-content-primary">
                        {formatFileSize(originalSize)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-content-secondary">Estimated output</span>
                      <span className="text-right text-content-muted">
                        varies by PDF content
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCompress}
                    disabled={isProcessing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-[#DC2626] bg-tool-pdf px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-tool-pdf/20 transition-colors hover:bg-[#DC2626] disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {progress?.message ?? "Compressing..."}
                      </>
                    ) : (
                      "Compress PDF"
                    )}
                  </button>

                  {isProcessing && progress && (
                    <div className="space-y-1.5">
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-border">
                        <div
                          className="h-full rounded-full bg-tool-pdf transition-all duration-300"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                      <p className="text-center text-xs text-content-muted">
                        {progress.percent}% complete
                      </p>
                    </div>
                  )}
                </div>
              )}

              {compressedBlob && compressedSize > 0 && (
                <div className="space-y-3">
                  {showQualityWarning && (
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm leading-relaxed text-amber-200">
                      ⚠️ High compression applied. Please check the downloaded
                      file for readability before using for official purposes.
                    </div>
                  )}

                  {hasMinimalSavings && (
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm leading-relaxed text-amber-200">
                      ⚠️ Minimal compression achieved ({percentSaved}%). This PDF
                      may already be optimized or contains compressed content.
                    </div>
                  )}

                  <div className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 p-4">
                    <p className="mb-3 text-base font-semibold text-content-primary">
                      ✅ Compression Complete!
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-content-secondary">
                          Original
                        </span>
                        <span className="font-semibold text-content-primary">
                          {formatFileSize(originalSize)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-content-secondary">
                          Compressed
                        </span>
                        <span className="font-semibold text-content-primary">
                          {formatFileSize(compressedSize)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-surface-border pt-3">
                        <span className="text-sm text-content-secondary">
                          You saved
                        </span>
                        <span className="font-semibold text-tool-convert">
                          {percentSaved > 0
                            ? `${percentSaved}% (${formatFileSize(bytesSaved)})`
                            : "0%"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-tool-convert px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#059669]"
                  >
                    Download Compressed PDF
                  </button>

                  <button
                    type="button"
                    onClick={handleCompressAnother}
                    className="w-full text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Compress Another
                  </button>
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
