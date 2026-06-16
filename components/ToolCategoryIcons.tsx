import {
  Calculator,
  Code2,
  FileEdit,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  LayoutGrid,
  PenLine,
  Timer,
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
  developer: Code2,
  text: PenLine,
  productivity: Timer,
  everyday: Wrench,
};
