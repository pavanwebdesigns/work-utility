import { ToolShell } from "@/components/tool-shell/ToolShell";
import ToolClient from "./ToolClient";

export default function Page() {
  return (
    <ToolShell slug="cagr-calculator" subtitle={"Calculate CAGR, future investment value, or required growth rate. Compare absolute vs annualised returns, Rule of 72, and inflation-adjusted real CAGR."}>
      <ToolClient />
    </ToolShell>
  );
}
