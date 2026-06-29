import {
  BarChart3,
  Calculator,
  Clock,
  Code,
  FileText,
  Image,
  Lock,
  Table,
  type LucideIcon,
} from "lucide-react";

const INNER_ICONS = [
  { Icon: FileText, label: "PDF", className: "oi-i1" },
  { Icon: Image, label: "IMG", className: "oi-i2" },
  { Icon: Calculator, label: "CALC", className: "oi-i3" },
  { Icon: Code, label: "CODE", className: "oi-i4" },
] as const;

const OUTER_ICONS = [
  { Icon: Table, label: "CSV", className: "oi-o1" },
  { Icon: Clock, label: "TIME", className: "oi-o2" },
  { Icon: Lock, label: "LOCK", className: "oi-o3" },
  { Icon: BarChart3, label: "STATS", className: "oi-o4" },
] as const;

function OrbitIcon({
  Icon,
  label,
  className,
}: {
  Icon: LucideIcon;
  label: string;
  className: string;
}) {
  return (
    <div className={`orbit-icon ${className}`}>
      <Icon className="h-[26px] w-[26px] sm:h-[26px] sm:w-[26px]" strokeWidth={1.75} />
      <span>{label}</span>
    </div>
  );
}

export default function HeroOrbit() {
  return (
    <div className="hero-orbit">
      <div className="orbit-track orbit-inner-track" />
      <div className="orbit-track orbit-outer-track" />

      <div className="orbit-pivot">
        {INNER_ICONS.map((item) => (
          <OrbitIcon key={item.className} {...item} />
        ))}
      </div>

      <div className="orbit-pivot">
        {OUTER_ICONS.map((item) => (
          <OrbitIcon key={item.className} {...item} />
        ))}
      </div>
    </div>
  );
}
