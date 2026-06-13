"use client";

import Link from "next/link";
import { Download, FileText, RefreshCw, Upload } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolComingSoon } from "@/components/ToolComingSoon";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your PDF file",
  },
  {
    step: "02",
    icon: RefreshCw,
    title: "Convert",
    description: "We extract text and structure",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your editable .docx file",
  },
];

export default function PdfToWordPage() {
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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
                <FileText
                  className="h-6 w-6 text-brand-blue"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                PDF to Word
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Convert your PDF to an editable Word document. Text and
                structure preserved. Runs in your browser.
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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon className="h-5 w-5 text-brand-blue" />
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

          <RelatedTools currentSlug="pdf-to-word" />
          <ToolFeedback toolName="PDF to Word" />
          <ToolSeoContent slug="pdf-to-word" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
