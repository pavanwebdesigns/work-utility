import {
  BarChart2,
  Braces,
  Building,
  Calculator,
  Clock,
  Coins,
  Crop,
  DollarSign,
  FileImage,
  FileText,
  FileType,
  Globe,
  Image,
  Key,
  Lock,
  LockOpen,
  Maximize,
  Minimize,
  Minimize2,
  Palette,
  PenTool,
  Percent,
  PiggyBank,
  QrCode,
  Scissors,
  Server,
  Shield,
  Terminal,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { HeroCenterContent } from "@/components/HeroCenterContent";

type WaterfallTool = {
  icon: string;
  label: string;
  color: string;
};

const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Scissors,
  LockOpen,
  FileType,
  Minimize2,
  Image,
  Shield,
  Maximize,
  FileImage,
  Minimize,
  PenTool,
  QrCode,
  Crop,
  Calculator,
  Building,
  Percent,
  TrendingUp,
  BarChart2,
  DollarSign,
  PiggyBank,
  Coins,
  Braces,
  Key,
  Terminal,
  Clock,
  Palette,
  Server,
  Lock,
  Globe,
};

const PDF_TOOLS: WaterfallTool[] = [
  { icon: "FileText", label: "PDF Merge", color: "rgba(251,146,60,0.8)" },
  { icon: "Scissors", label: "PDF Split", color: "rgba(251,146,60,0.65)" },
  { icon: "LockOpen", label: "PDF Unlock", color: "rgba(251,146,60,0.75)" },
  { icon: "FileType", label: "PDF to Word", color: "rgba(251,146,60,0.55)" },
  { icon: "Minimize2", label: "Compress", color: "rgba(251,146,60,0.8)" },
  { icon: "Image", label: "PDF to JPG", color: "rgba(251,146,60,0.6)" },
  { icon: "Shield", label: "PDF Protect", color: "rgba(251,146,60,0.7)" },
  { icon: "FileText", label: "Word to PDF", color: "rgba(251,146,60,0.5)" },
];

const IMAGE_TOOLS: WaterfallTool[] = [
  { icon: "Image", label: "BG Remove", color: "rgba(79,142,247,0.85)" },
  { icon: "Maximize", label: "Resize Image", color: "rgba(79,142,247,0.65)" },
  { icon: "FileImage", label: "PNG to JPG", color: "rgba(167,139,250,0.8)" },
  { icon: "Minimize", label: "Compress", color: "rgba(79,142,247,0.6)" },
  { icon: "PenTool", label: "Signature", color: "rgba(167,139,250,0.75)" },
  { icon: "QrCode", label: "QR Code", color: "rgba(79,142,247,0.7)" },
  { icon: "FileImage", label: "HEIC to JPG", color: "rgba(167,139,250,0.6)" },
  { icon: "Crop", label: "Photo Size", color: "rgba(79,142,247,0.75)" },
];

const FINANCE_TOOLS: WaterfallTool[] = [
  { icon: "Calculator", label: "SIP Calc", color: "rgba(52,211,153,0.85)" },
  { icon: "Building", label: "EMI Calc", color: "rgba(52,211,153,0.65)" },
  { icon: "Percent", label: "GST Calc", color: "rgba(34,211,238,0.8)" },
  { icon: "TrendingUp", label: "NPS Calc", color: "rgba(52,211,153,0.6)" },
  { icon: "BarChart2", label: "CAGR Calc", color: "rgba(34,211,238,0.75)" },
  { icon: "DollarSign", label: "Tax Regime", color: "rgba(52,211,153,0.7)" },
  { icon: "PiggyBank", label: "PPF Calc", color: "rgba(34,211,238,0.6)" },
  { icon: "Coins", label: "Capital Gains", color: "rgba(52,211,153,0.75)" },
];

const DEV_TOOLS: WaterfallTool[] = [
  { icon: "Braces", label: "JSON Format", color: "rgba(167,139,250,0.85)" },
  { icon: "Key", label: "JWT Decode", color: "rgba(244,114,182,0.7)" },
  { icon: "Terminal", label: "Regex Tester", color: "rgba(167,139,250,0.65)" },
  { icon: "Clock", label: "Unix Time", color: "rgba(244,114,182,0.6)" },
  { icon: "Palette", label: "CSS Gradient", color: "rgba(167,139,250,0.8)" },
  { icon: "Server", label: "DNS Lookup", color: "rgba(244,114,182,0.65)" },
  { icon: "Lock", label: "Password Gen", color: "rgba(167,139,250,0.75)" },
  { icon: "Globe", label: "HTTP Codes", color: "rgba(244,114,182,0.7)" },
];

function WaterfallItem({ tool }: { tool: WaterfallTool }) {
  const Icon = ICON_MAP[tool.icon] ?? FileText;
  return (
    <div className="wf-item">
      <Icon
        className="h-[15px] w-[15px] shrink-0"
        style={{ color: tool.color }}
        strokeWidth={1.75}
      />
      <span style={{ color: tool.color }}>{tool.label}</span>
    </div>
  );
}

function WaterfallColumn({
  tools,
  className,
}: {
  tools: WaterfallTool[];
  className: string;
}) {
  const items = [...tools, ...tools];
  return (
    <div className={`wf-col ${className}`}>
      <div className="wf-inner">
        {items.map((tool, index) => (
          <WaterfallItem key={`${tool.label}-${index}`} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export default function HeroWaterfall() {
  return (
    <div className="hero-waterfall">
      <div className="hero-waterfall-cols" aria-hidden="true">
        <WaterfallColumn tools={PDF_TOOLS} className="wf-col-1" />
        <WaterfallColumn tools={IMAGE_TOOLS} className="wf-col-2" />
        <WaterfallColumn tools={FINANCE_TOOLS} className="wf-col-3" />
        <WaterfallColumn tools={DEV_TOOLS} className="wf-col-4" />
      </div>
      <HeroCenterContent glass />
    </div>
  );
}
