"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Download, FileDown, SlidersHorizontal, Upload } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolComingSoon } from "@/components/ToolComingSoon";
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";

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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

            <ToolComingSoon />
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
