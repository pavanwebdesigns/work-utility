import {
  BookOpen,
  Calculator,
  Code2,
  FileEdit,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  LayoutGrid,
  Timer,
  type LucideIcon,
} from "lucide-react";
import type { BlogPageCategoryId } from "@/lib/blog-categories";

export const BLOG_CATEGORY_ICONS: Record<BlogPageCategoryId, LucideIcon> = {
  all: LayoutGrid,
  pillar: BookOpen,
  pdf: FileText,
  "image-photo": ImageIcon,
  finance: Calculator,
  developer: Code2,
  productivity: Timer,
  students: GraduationCap,
  documents: FileEdit,
};
