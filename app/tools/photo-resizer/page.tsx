import { ToolShell } from "@/components/tool-shell/ToolShell";
import { Download, SlidersHorizontal, Upload } from "lucide-react";
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

export default function PhotoResizerPage() {
  return (
    <ToolShell
      slug="photo-resizer"
      h1={"Photo Resizer"}
      subtitle={"Resize your photo to exact Aadhaar, PAN, Passport, or Visa dimensions. Perfect for Indian government documents."}
    >
    <>
<div className="mx-auto max-w-2xl">
            

            <PhotoResizerClient />
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
    </>
    </ToolShell>
  );
}

