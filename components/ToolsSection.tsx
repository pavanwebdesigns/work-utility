"use client";

import { useState } from "react";
import {
  FileBadge,
  FileDown,
  FileText,
  ImageDown,
  Images,
  ScanLine,
} from "lucide-react";
import { ToolAccent, ToolCard, ToolCardProps } from "@/components/ToolCard";

type Category = "all" | "pdf" | "images" | "convert";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All Tools" },
  { id: "pdf", label: "PDF" },
  { id: "images", label: "Images" },
  { id: "convert", label: "Convert" },
];

const tools: (Omit<ToolCardProps, "accent"> & {
  accent: ToolAccent;
  category: Category;
})[] = [
  {
    title: "PDF Compress",
    description: "Reduce PDF file size instantly",
    href: "/tools/pdf-compress",
    icon: FileDown,
    accent: "pdf",
    popular: true,
    category: "pdf",
  },
  {
    title: "Image Compress",
    description: "Compress images without quality loss",
    href: "/tools/image-compress",
    icon: ImageDown,
    accent: "image",
    category: "images",
  },
  {
    title: "Photo Resizer",
    description: "Resize to Aadhaar, PAN, Passport size",
    href: "/tools/photo-resizer",
    icon: ScanLine,
    accent: "photo",
    category: "images",
  },
  {
    title: "PDF to Word",
    description: "Convert PDF to editable Word document",
    href: "/tools/pdf-to-word",
    icon: FileText,
    accent: "blue",
    category: "convert",
  },
  {
    title: "Word to PDF",
    description: "Convert Word document to PDF",
    href: "/tools/word-to-pdf",
    icon: FileBadge,
    accent: "convert",
    category: "convert",
  },
  {
    title: "Image to PDF",
    description: "Combine images into a single PDF",
    href: "/tools/image-to-pdf",
    icon: Images,
    accent: "pink",
    category: "convert",
  },
];

const sectionLabels: Record<Category, string> = {
  all: "ALL TOOLS",
  pdf: "PDF TOOLS",
  images: "IMAGE TOOLS",
  convert: "CONVERT TOOLS",
};

export function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  return (
    <>
      <div className="border-b border-surface-border bg-surface-card px-4 py-3.5 sm:px-10">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto whitespace-nowrap">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-brand-blue text-white"
                  : "text-content-secondary hover:text-content-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-surface-base px-4 py-12 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-[11px] font-semibold tracking-[2px] text-content-muted">
            {sectionLabels[activeCategory]}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
