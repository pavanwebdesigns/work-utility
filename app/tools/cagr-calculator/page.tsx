import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="cagr-calculator" h1={"CAGR Calculator India — Compound Annual Growth Rate"} subtitle={"Calculate CAGR, future investment value, or required growth rate. Compare absolute vs annualised returns, Rule of 72, and inflation-adjusted real CAGR."}>
      <ToolClient />
    </ToolShell>
  );
}
