import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="color-contrast" h1={"Color Contrast Checker — WCAG"} subtitle={"Check color contrast ratios for WCAG accessibility compliance."}>
      <ToolClient />
    </ToolShell>
  );
}
