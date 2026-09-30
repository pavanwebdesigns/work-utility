import Link from "next/link";
import { Download, ScanLine, SlidersHorizontal, Upload } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { resolvePresetFromUrlParam } from "@/lib/photo-resize";
import { PhotoResizerClient } from "./PhotoResizerClient";

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your photo (JPG, PNG, WebP)",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Choose Size",
    description: "Pick from Indian document presets",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get perfectly sized photo instantly",
  },
];

type PhotoResizerPageProps = {
  searchParams: { preset?: string | string[] };
};

export default function PhotoResizerPage({
  searchParams,
}: PhotoResizerPageProps) {
  const presetParam = Array.isArray(searchParams.preset)
    ? searchParams.preset[0]
    : searchParams.preset;
  const preset = resolvePresetFromUrlParam(presetParam);
  const initialPresetId = preset?.id ?? "passport";

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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
                <ScanLine
                  className="h-6 w-6 text-tool-photo"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Photo Resizer
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Resize your photo to exact Aadhaar, PAN, Passport, or Visa
                dimensions. Perfect for Indian government documents.
              </p>
              <div className="mt-4 flex justify-center">
                <FavoriteButton slug="photo-resizer" />
              </div>
            </div>

            <PhotoResizerClient
              key={initialPresetId}
              initialPresetId={initialPresetId}
            />
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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-photo/10">
                    <step.icon className="h-5 w-5 text-tool-photo" />
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

          <RelatedTools currentSlug="photo-resizer" />
          <ToolFeedback toolName="Photo Resizer" />
          <ToolSeoContent slug="photo-resizer" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
