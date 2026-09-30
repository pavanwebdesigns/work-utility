import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="color-palette-generator" h1={"Color Palette Generator — Tailwind Scale from Any Hex"} subtitle={"Generate a complete Tailwind 50–950 color scale from your brand hex. Copy tailwind.config.js or CSS variables with WCAG contrast badges."}>
      <ToolClient />
    </ToolShell>
  );
}
