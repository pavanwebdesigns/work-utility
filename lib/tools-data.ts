import {
  FileBadge,
  FileDown,
  FileText,
  ImageDown,
  Images,
  ScanLine,
  type LucideIcon,
} from "lucide-react";
import type { ToolAccent } from "@/components/ToolCard";

export type ToolFilterCategory = "pdf" | "images" | "convert";

export const ALL_TOOLS = [
  {
    slug: "pdf-compress",
    name: "PDF Compress",
    description: "Reduce PDF file size instantly",
    href: "/tools/pdf-compress",
    icon: "FileDown",
    color: "#EF4444",
    bgClass: "bg-tool-pdf/10",
    textClass: "text-tool-pdf",
    borderClass: "border-tool-pdf",
    category: "PDF",
  },
  {
    slug: "image-compress",
    name: "Image Compress",
    description: "Compress images without quality loss",
    href: "/tools/image-compress",
    icon: "ImageDown",
    color: "#8B5CF6",
    bgClass: "bg-tool-image/10",
    textClass: "text-tool-image",
    borderClass: "border-tool-image",
    category: "Images",
  },
  {
    slug: "photo-resizer",
    name: "Photo Resizer",
    description: "Resize to Aadhaar, PAN, Passport size",
    href: "/tools/photo-resizer",
    icon: "ScanLine",
    color: "#F59E0B",
    bgClass: "bg-tool-photo/10",
    textClass: "text-tool-photo",
    borderClass: "border-tool-photo",
    category: "Images",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    description: "Convert PDF to editable Word document",
    href: "/tools/pdf-to-word",
    icon: "FileText",
    color: "#3B82F6",
    bgClass: "bg-brand-blue/10",
    textClass: "text-brand-blue",
    borderClass: "border-brand-blue",
    category: "PDF",
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    description: "Convert Word document to PDF",
    href: "/tools/word-to-pdf",
    icon: "FileBadge",
    color: "#10B981",
    bgClass: "bg-tool-convert/10",
    textClass: "text-tool-convert",
    borderClass: "border-tool-convert",
    category: "PDF",
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    description: "Combine images into a single PDF",
    href: "/tools/image-to-pdf",
    icon: "Images",
    color: "#EC4899",
    bgClass: "bg-tool-img2pdf/10",
    textClass: "text-tool-img2pdf",
    borderClass: "border-tool-img2pdf",
    category: "Images",
  },
] as const;

export const RELATED_TOOLS: Record<string, string[]> = {
  "pdf-compress": ["image-compress", "pdf-to-word", "word-to-pdf"],
  "image-compress": ["photo-resizer", "image-to-pdf", "pdf-compress"],
  "photo-resizer": ["image-compress", "image-to-pdf", "pdf-compress"],
  "pdf-to-word": ["word-to-pdf", "pdf-compress", "image-compress"],
  "word-to-pdf": ["pdf-to-word", "pdf-compress", "image-to-pdf"],
  "image-to-pdf": ["image-compress", "photo-resizer", "word-to-pdf"],
};

export const TOOL_ICONS: Record<string, LucideIcon> = {
  FileDown,
  ImageDown,
  ScanLine,
  FileText,
  FileBadge,
  Images,
};

export const TOOL_UI_META: Record<
  string,
  { accent: ToolAccent; filterCategory: ToolFilterCategory; popular?: boolean }
> = {
  "pdf-compress": { accent: "pdf", filterCategory: "pdf", popular: true },
  "image-compress": { accent: "image", filterCategory: "images" },
  "photo-resizer": { accent: "photo", filterCategory: "images" },
  "pdf-to-word": { accent: "blue", filterCategory: "convert" },
  "word-to-pdf": { accent: "convert", filterCategory: "convert" },
  "image-to-pdf": { accent: "pink", filterCategory: "convert" },
};

export function getToolBySlug(slug: string) {
  return ALL_TOOLS.find((tool) => tool.slug === slug);
}
