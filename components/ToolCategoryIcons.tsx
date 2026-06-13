import {
  Calculator,
  FileEdit,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  LayoutGrid,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ToolPageCategoryId } from "@/lib/tool-categories";

export const TOOL_CATEGORY_ICONS: Record<ToolPageCategoryId, LucideIcon> = {
  all: LayoutGrid,
  pdf: FileText,
  image: ImageIcon,
  document: FileEdit,
  finance: Calculator,
  student: GraduationCap,
  utility: Wrench,
};
