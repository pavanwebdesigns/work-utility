import Link from "next/link";
import { LucideIcon } from "lucide-react";

export type ToolAccent = "pdf" | "image" | "photo" | "blue" | "convert" | "pink";

const accentClasses: Record<
  ToolAccent,
  { iconBg: string; icon: string; link: string }
> = {
  pdf: {
    iconBg: "bg-tool-pdf/15",
    icon: "text-tool-pdf",
    link: "text-tool-pdf",
  },
  image: {
    iconBg: "bg-tool-image/15",
    icon: "text-tool-image",
    link: "text-tool-image",
  },
  photo: {
    iconBg: "bg-tool-photo/15",
    icon: "text-tool-photo",
    link: "text-tool-photo",
  },
  blue: {
    iconBg: "bg-tool-word/15",
    icon: "text-tool-word",
    link: "text-tool-word",
  },
  convert: {
    iconBg: "bg-tool-convert/15",
    icon: "text-tool-convert",
    link: "text-tool-convert",
  },
  pink: {
    iconBg: "bg-tool-img2pdf/15",
    icon: "text-tool-img2pdf",
    link: "text-tool-img2pdf",
  },
};

export interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: ToolAccent;
  popular?: boolean;
}

export function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  accent,
  popular,
}: ToolCardProps) {
  const colors = accentClasses[accent];

  return (
    <Link
      href={href}
      className="group relative block cursor-pointer rounded-2xl border border-surface-border bg-surface-card p-6 no-underline transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-brand-blue hover:bg-surface-elevated"
    >
      {popular && (
        <span className="absolute right-4 top-4 rounded bg-brand-blue/15 px-2 py-0.5 text-[10px] font-semibold text-brand-blue-light">
          POPULAR
        </span>
      )}

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${colors.iconBg}`}
      >
        <Icon className={`h-5 w-5 ${colors.icon}`} strokeWidth={1.75} />
      </div>

      <h3 className="mt-3.5 text-[15px] font-semibold text-content-primary">
        {title}
      </h3>
      <p className="mt-1 text-[13px] text-content-secondary">{description}</p>
      <span className={`mt-4 inline-block text-xs font-medium ${colors.link}`}>
        Use Tool →
      </span>
    </Link>
  );
}
